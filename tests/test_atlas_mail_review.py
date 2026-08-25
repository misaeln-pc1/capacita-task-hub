from __future__ import annotations

import importlib.util
import json
import sqlite3
import sys
import tempfile
import unittest
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "atlas_mail_review.py"
SPEC = importlib.util.spec_from_file_location("atlas_mail_review", SCRIPT)
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)


def item(**overrides):
    now = datetime.now(timezone.utc)
    base = {
        "account_id": "a",
        "account_email": "me@example.com",
        "folder_id": "in",
        "folder_name": "Inbox",
        "role": "inbox",
        "message_id": "m1",
        "thread_id": "t1",
        "received_at": now - timedelta(days=3),
        "sender": "client@example.com",
        "to": "me@example.com",
        "cc": "",
        "subject": "Revisar propuesta",
        "summary": "Por favor revisar",
        "body": "Contenido",
        "priority": "3",
        "status": "read",
    }
    base.update(overrides)
    return base


class AtlasMailReviewTests(unittest.TestCase):
    def test_dotenv_parser_does_not_require_dependency(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / ".env"
            path.write_text('# private\nZOHO_CLIENT_ID="abc"\nZOHO_CLIENT_SECRET=def\n', encoding="utf-8")
            values = MODULE.read_dotenv(path)
        self.assertEqual(values["ZOHO_CLIENT_ID"], "abc")
        self.assertEqual(values["ZOHO_CLIENT_SECRET"], "def")

    def test_r1_relatores_and_subfolders_are_excluded(self) -> None:
        rules = MODULE.load_rules(None)
        for name in ("R1-RELATORES", "R1-RELATORES / Procesados"):
            scan, reason = MODULE.should_scan_folder({"folderName": name, "folderType": "Custom"}, rules, False)
            self.assertFalse(scan)
            self.assertEqual(reason, "EXCLUDED_PROJECT_FOLDER")

    def test_subject_normalization_removes_reply_prefixes(self) -> None:
        self.assertEqual(MODULE.normalize_subject("RE: Fwd: Pago pendiente"), "pago pendiente")

    def test_thread_reply_marks_inbound_as_responded(self) -> None:
        now = datetime.now(timezone.utc)
        inbound = item(received_at=now - timedelta(days=2))
        outbound = item(folder_id="sent", folder_name="Sent", role="sent", message_id="m2", received_at=now - timedelta(days=1), sender="me@example.com", to="client@example.com", subject="Re: Revisar propuesta")
        states = MODULE.response_states([inbound, outbound])
        self.assertEqual(states[MODULE.message_key(inbound)], "PROBABLY_RESPONDED_THREAD")

    def test_unanswered_urgent_email_generates_sanitized_task_candidate(self) -> None:
        now = datetime.now(timezone.utc)
        mail = item(sender="persona@cliente.cl", subject="Urgente: factura vence hoy", summary="Por favor confirmar pago", priority="1")
        result = MODULE.classify(mail, "PROBABLY_PENDING", MODULE.load_rules(None), now)
        self.assertEqual(result["classification"], "URGENT")
        combined = result["task_title"] + result["task_body"]
        self.assertTrue(result["task_title"])
        self.assertNotIn("persona@cliente.cl", combined)
        self.assertNotIn("factura vence hoy", combined.casefold())
        self.assertIn(result["private_reference"], combined)

    def test_date_detection_supports_relative_and_absolute_dates(self) -> None:
        today = date(2026, 7, 19)
        self.assertEqual(MODULE.detect_date("Responder mañana", today), "2026-07-20")
        self.assertEqual(MODULE.detect_date("Plazo 30/07/2026", today), "2026-07-30")
        self.assertEqual(MODULE.detect_date("Plazo 2026-08-11", today), "2026-08-11")

    def test_automated_newsletter_is_downgraded(self) -> None:
        now = datetime.now(timezone.utc)
        mail = item(sender="newsletter@noreply.example", subject="Urgente: oferta termina hoy", summary="Unsubscribe", received_at=now)
        result = MODULE.classify(mail, "PROBABLY_PENDING", MODULE.load_rules(None), now)
        self.assertLess(result["score"], 8)
        self.assertFalse(result["task_title"])

    def test_sqlite_schema_and_upsert_are_idempotent(self) -> None:
        now = datetime.now(timezone.utc)
        mail = item(received_at=now)
        review = MODULE.classify(mail, "PROBABLY_PENDING", MODULE.load_rules(None), now)
        with tempfile.TemporaryDirectory() as directory:
            db = MODULE.open_db(Path(directory) / "atlas.sqlite3")
            run_id = db.execute("INSERT INTO runs(started_at,mode,lookback_days,status) VALUES(?,?,?,?)", (now.isoformat(), "BACKFILL", 30, "RUNNING")).lastrowid
            MODULE.upsert(db, int(run_id), mail, review, 20000)
            MODULE.upsert(db, int(run_id), mail, review, 20000)
            count = db.execute("SELECT COUNT(*) FROM messages").fetchone()[0]
            tables = {row[0] for row in db.execute("SELECT name FROM sqlite_master WHERE type='table'")}
            db.close()
        self.assertEqual(count, 1)
        self.assertTrue({"runs", "messages", "reviews", "task_links"} <= tables)

    def test_sanitized_summary_contract_has_zero_writes(self) -> None:
        counts = {"accounts": 1, "folders": 2, "folders_skipped": 1, "messages": 3, "content": 2, "urgent": 1, "important": 1, "pending": 1, "task_candidates": 1, "changed": 1, "errors": 0}
        with tempfile.TemporaryDirectory() as directory:
            _, summary_path = MODULE.export(Path(directory), 1, [], {}, set(), False, counts, 30)
            summary = json.loads(summary_path.read_text(encoding="utf-8"))
        self.assertEqual(summary["writes_to_mail"], 0)
        self.assertEqual(summary["writes_to_github"], 0)
        self.assertFalse(summary["contains_personal_data"])

    def test_incremental_cutoff_uses_last_successful_run_with_overlap(self) -> None:
        now = datetime(2026, 7, 19, 18, 0, tzinfo=timezone.utc)
        with tempfile.TemporaryDirectory() as directory:
            db = MODULE.open_db(Path(directory) / "atlas.sqlite3")
            db.execute("INSERT INTO runs(started_at,finished_at,mode,lookback_days,status) VALUES(?,?,?,?,?)", ((now - timedelta(hours=2)).isoformat(), (now - timedelta(hours=1)).isoformat(), "BACKFILL", 30, "PASS"))
            db.commit()
            cutoff = MODULE.latest_cutoff(db, 30, True, now)
            db.close()
        self.assertEqual(cutoff, now - timedelta(hours=1, minutes=5))

    def test_second_unchanged_review_is_not_reported_as_changed(self) -> None:
        now = datetime.now(timezone.utc)
        mail = item(received_at=now, subject="Urgente: revisar pago")
        review = MODULE.classify(mail, "PROBABLY_PENDING", MODULE.load_rules(None), now)
        with tempfile.TemporaryDirectory() as directory:
            db = MODULE.open_db(Path(directory) / "atlas.sqlite3")
            run_id = db.execute("INSERT INTO runs(started_at,mode,lookback_days,status) VALUES(?,?,?,?)", (now.isoformat(), "BACKFILL", 30, "RUNNING")).lastrowid
            self.assertTrue(MODULE.changed(db, mail, review))
            MODULE.upsert(db, int(run_id), mail, review, 20000)
            db.commit()
            self.assertFalse(MODULE.changed(db, mail, review))
            db.close()

    def test_source_contains_no_mail_write_endpoints(self) -> None:
        source = SCRIPT.read_text(encoding="utf-8")
        for forbidden in ("/updatemessage", "/updatethread", 'method="PUT"', 'method="DELETE"'):
            self.assertNotIn(forbidden, source)


if __name__ == "__main__":
    unittest.main()
