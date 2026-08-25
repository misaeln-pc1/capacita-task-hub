#!/usr/bin/env python3
"""Atlas Mail Ops V1: revisión Zoho Mail READ-only, privada e incremental."""
from __future__ import annotations

import argparse
import hashlib
import html
import json
import os
import re
import sqlite3
import sys
import unicodedata
from datetime import date, datetime, timedelta, timezone
from html.parser import HTMLParser
from pathlib import Path
from typing import Any, Iterable, Mapping, Sequence
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

DEFAULT_RULES: dict[str, Any] = {
    "urgent_terms": ["urgente", "hoy", "inmediato", "acción requerida", "respuesta requerida", "vence", "vencimiento", "último día", "bloqueo"],
    "financial_terms": ["factura", "pago", "cobranza", "transferencia", "banco", "orden de compra", "cotización", "presupuesto", "proveedor"],
    "compliance_terms": ["sence", "auditoría", "nch 2728", "otic", "licitación", "mercado público", "compra ágil", "sofofa", "cchc"],
    "operations_terms": ["curso", "alumno", "participante", "moodle", "acceso", "bienvenida", "coordinación", "reunión", "confirmar fecha", "clase", "inicio"],
    "task_terms": ["por favor", "necesito", "solicito", "favor enviar", "favor confirmar", "pendiente", "recordatorio", "confirmar", "enviar", "revisar", "pagar", "comprar", "coordinar", "agendar", "completar"],
    "automated_sender_terms": ["no-reply", "noreply", "do-not-reply", "notification", "mailer-daemon", "marketing", "newsletter"],
    "automated_content_terms": ["unsubscribe", "darse de baja", "cancelar suscripción", "correo automático", "mensaje automático"],
    "excluded_folder_names": ["R1-RELATORES"],
}
SYSTEM_ROLES = {"spam", "trash", "drafts"}


class _HTMLText(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []

    def handle_data(self, data: str) -> None:
        if data.strip():
            self.parts.append(data)


def norm_space(value: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(value or "")).strip()


def norm(value: str) -> str:
    value = unicodedata.normalize("NFKD", norm_space(value).casefold())
    return "".join(ch for ch in value if not unicodedata.combining(ch))


def html_text(raw: str) -> str:
    if not raw:
        return ""
    parser = _HTMLText()
    try:
        parser.feed(raw)
        parser.close()
        return norm_space(" ".join(parser.parts))
    except Exception:
        return norm_space(re.sub(r"<[^>]+>", " ", raw))


def read_dotenv(path: Path) -> dict[str, str]:
    if not path.exists():
        raise RuntimeError(f"No existe el .env privado: {path}")
    values: dict[str, str] = {}
    for line in path.read_text(encoding="utf-8-sig").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        match = re.match(r"^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$", line)
        if not match:
            continue
        key, value = match.group(1), match.group(2).strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
            value = value[1:-1]
        values[key] = value
    return values


def required(values: Mapping[str, str], key: str) -> str:
    value = str(values.get(key) or "").strip()
    if not value:
        raise RuntimeError(f"Falta variable obligatoria: {key}")
    return value


def parse_time(raw: Any) -> datetime | None:
    if raw in (None, ""):
        return None
    text = str(raw).strip()
    if text.isdigit():
        number = int(text)
        if number > 10_000_000_000:
            number /= 1000
        try:
            return datetime.fromtimestamp(number, tz=timezone.utc)
        except (OSError, OverflowError, ValueError):
            return None
    try:
        parsed = datetime.fromisoformat(text.replace("Z", "+00:00"))
        return parsed if parsed.tzinfo else parsed.replace(tzinfo=timezone.utc)
    except ValueError:
        return None


def field(row: Mapping[str, Any], *keys: str) -> str:
    for key in keys:
        value = row.get(key)
        if value not in (None, ""):
            if isinstance(value, dict):
                for nested in ("email", "address", "name", "id"):
                    if value.get(nested) not in (None, ""):
                        return str(value[nested])
            return str(value)
    return ""


def rows(payload: Mapping[str, Any], keys: Sequence[str]) -> list[dict[str, Any]]:
    data: Any = payload.get("data", payload)
    if isinstance(data, list):
        return [item for item in data if isinstance(item, dict)]
    if isinstance(data, dict):
        for key in keys:
            if isinstance(data.get(key), list):
                return [item for item in data[key] if isinstance(item, dict)]
    return []


def request_json(request: Request, timeout: int = 60) -> dict[str, Any]:
    try:
        with urlopen(request, timeout=timeout) as response:  # noqa: S310
            raw = response.read().decode("utf-8", errors="replace")
    except HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")[:400]
        raise RuntimeError(f"HTTP {exc.code} en Zoho: {detail}") from exc
    except URLError as exc:
        raise RuntimeError(f"No se pudo conectar con Zoho: {exc.reason}") from exc
    try:
        payload = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise RuntimeError("Zoho devolvió JSON inválido") from exc
    if not isinstance(payload, dict):
        raise RuntimeError("Zoho devolvió una estructura inesperada")
    return payload


class Zoho:
    def __init__(self, env: Mapping[str, str]) -> None:
        self.accounts_url = required(env, "ZOHO_ACCOUNTS_BASE_URL").rstrip("/")
        self.mail_url = required(env, "ZOHO_MAIL_BASE_URL").rstrip("/")
        body = urlencode({
            "refresh_token": required(env, "ZOHO_REFRESH_TOKEN"),
            "client_id": required(env, "ZOHO_CLIENT_ID"),
            "client_secret": required(env, "ZOHO_CLIENT_SECRET"),
            "grant_type": "refresh_token",
        }).encode()
        payload = request_json(Request(f"{self.accounts_url}/oauth/v2/token", data=body, method="POST", headers={"Content-Type": "application/x-www-form-urlencoded"}), 30)
        self.token = str(payload.get("access_token") or "")
        if not self.token:
            raise RuntimeError("Zoho no devolvió access_token")

    def get(self, path: str, params: Mapping[str, Any] | None = None) -> dict[str, Any]:
        query = "?" + urlencode(params) if params else ""
        return request_json(Request(f"{self.mail_url}{path}{query}", method="GET", headers={"Accept": "application/json", "Authorization": f"Zoho-oauthtoken {self.token}"}))

    def accounts(self) -> list[dict[str, Any]]:
        return rows(self.get("/accounts"), ("accounts", "accountList"))

    def folders(self, account_id: str) -> list[dict[str, Any]]:
        return rows(self.get(f"/accounts/{account_id}/folders"), ("folders", "folderList"))

    def messages(self, account_id: str, folder_id: str, maximum: int) -> Iterable[dict[str, Any]]:
        start = 1
        seen = 0
        while seen < maximum:
            limit = min(200, maximum - seen)
            page = rows(self.get(f"/accounts/{account_id}/messages/view", {"folderId": folder_id, "start": start, "limit": limit, "threadedMails": "false", "includeto": "true"}), ("messages", "mailList"))
            if not page:
                return
            for item in page:
                yield item
                seen += 1
                if seen >= maximum:
                    return
            if len(page) < limit:
                return
            start += len(page)

    def content(self, account_id: str, folder_id: str, message_id: str) -> str:
        payload = self.get(f"/accounts/{account_id}/folders/{folder_id}/messages/{message_id}/content", {"includeBlockContent": "false"})
        data = payload.get("data")
        return html_text(str(data.get("content") or "")) if isinstance(data, dict) else ""


def folder_role(folder: Mapping[str, Any]) -> str:
    text = norm(f"{field(folder, 'folderName', 'name', 'displayName')} {field(folder, 'folderType', 'type')}")
    if "sent" in text or "enviado" in text:
        return "sent"
    if "inbox" in text or "bandeja de entrada" in text:
        return "inbox"
    if "draft" in text or "borrador" in text:
        return "drafts"
    if "trash" in text or "papelera" in text or "eliminado" in text:
        return "trash"
    if "spam" in text or "correo no deseado" in text:
        return "spam"
    if "archive" in text or "archivado" in text:
        return "archive"
    return "custom"


def should_scan_folder(folder: Mapping[str, Any], rules: Mapping[str, Any], include_system: bool) -> tuple[bool, str]:
    name = norm(field(folder, "folderName", "name", "displayName"))
    excluded = {norm(item) for item in rules.get("excluded_folder_names", [])}
    if any(name == item or name.startswith(item + "/") or name.startswith(item + " ") for item in excluded):
        return False, "EXCLUDED_PROJECT_FOLDER"
    role = folder_role(folder)
    if not include_system and role in SYSTEM_ROLES:
        return False, "EXCLUDED_SYSTEM_FOLDER"
    return True, role


def message_key(item: Mapping[str, Any]) -> str:
    return f"{item['account_id']}|{item['folder_id']}|{item['message_id']}"


def private_ref(item: Mapping[str, Any]) -> str:
    return "MAIL-" + hashlib.sha256(message_key(item).encode()).hexdigest()[:12].upper()


def normalize_subject(subject: str) -> str:
    value = norm(subject)
    previous = None
    while value != previous:
        previous = value
        value = re.sub(r"^(?:re|rv|fw|fwd)\s*:\s*", "", value).strip()
    return value


def hits(text: str, terms: Iterable[str]) -> list[str]:
    text = norm(text)
    return [str(term) for term in terms if norm(str(term)) and norm(str(term)) in text]


def detect_date(text: str, today: date) -> str:
    value = norm(text)
    if re.search(r"\bmanana\b", value):
        return (today + timedelta(days=1)).isoformat()
    if re.search(r"\bhoy\b", value):
        return today.isoformat()
    for pattern, order in ((r"\b(20\d{2})[-/.](\d{1,2})[-/.](\d{1,2})\b", "ymd"), (r"\b(\d{1,2})[-/.](\d{1,2})[-/.](20\d{2})\b", "dmy")):
        match = re.search(pattern, value)
        if not match:
            continue
        numbers = list(map(int, match.groups()))
        year, month, day = numbers if order == "ymd" else (numbers[2], numbers[1], numbers[0])
        try:
            return date(year, month, day).isoformat()
        except ValueError:
            return ""
    return ""


def response_states(items: Sequence[dict[str, Any]]) -> dict[str, str]:
    sent_threads: dict[str, list[datetime]] = {}
    sent = []
    for item in items:
        if item["role"] == "sent" and item["received_at"]:
            sent.append(item)
            if item["thread_id"]:
                sent_threads.setdefault(item["thread_id"], []).append(item["received_at"])
    result: dict[str, str] = {}
    for item in items:
        key = message_key(item)
        if item["role"] == "sent":
            result[key] = "OUTBOUND"
            continue
        if not item["received_at"]:
            result[key] = "REQUIRES_REVIEW"
            continue
        if item["thread_id"] and any(stamp > item["received_at"] for stamp in sent_threads.get(item["thread_id"], [])):
            result[key] = "PROBABLY_RESPONDED_THREAD"
            continue
        subject = normalize_subject(item["subject"])
        responded = any(other["received_at"] > item["received_at"] and normalize_subject(other["subject"]) == subject and norm(item["sender"]) in norm(f"{other['to']} {other['cc']}") for other in sent if subject and item["sender"])
        result[key] = "PROBABLY_RESPONDED_FALLBACK" if responded else "PROBABLY_PENDING"
    return result


def classify(item: Mapping[str, Any], state: str, rules: Mapping[str, Any], now: datetime) -> dict[str, Any]:
    text = f"{item['subject']}\n{item['summary']}\n{item['body']}"
    urgent = hits(text, rules.get("urgent_terms", []))
    financial = hits(text, rules.get("financial_terms", []))
    compliance = hits(text, rules.get("compliance_terms", []))
    operations = hits(text, rules.get("operations_terms", []))
    task = hits(text, rules.get("task_terms", []))
    automated = bool(hits(item["sender"], rules.get("automated_sender_terms", [])) or hits(text, rules.get("automated_content_terms", [])))
    due = detect_date(text, now.date())
    score, reasons, categories = 0, [], []
    for match, points, reason, category in ((urgent, 5, "señal de urgencia", "Urgencia"), (financial, 3, "pago/factura/proveedor", "Finanzas"), (compliance, 3, "SENCE/auditoría/licitación", "Cumplimiento"), (operations, 2, "operación de cursos o coordinación", "Operación"), (task, 2, "solicitud o acción explícita", "")):
        if match:
            score += points
            reasons.append(reason)
            if category:
                categories.append(category)
    if state == "PROBABLY_PENDING":
        score += 2
        reasons.append("sin respuesta enviada detectada")
        if item["received_at"] and now - item["received_at"] > timedelta(days=2):
            score += 2
            reasons.append("pendiente por más de 2 días")
    elif state.startswith("PROBABLY_RESPONDED"):
        score -= 4
        reasons.append("respuesta enviada detectada")
    if due:
        delta = (date.fromisoformat(due) - now.date()).days
        points = 5 if delta < 0 else 4 if delta == 0 else 3 if delta <= 3 else 1
        score += points
        reasons.append("fecha explícita detectada")
    if str(item["priority"]).casefold() in {"1", "high"}:
        score += 2
        reasons.append("prioridad alta en Zoho")
    if automated:
        score -= 5
        reasons.append("probable mensaje automático")
    score = max(0, score)
    level = "URGENT" if score >= 8 else "IMPORTANT" if score >= 5 else "REVIEW" if score >= 3 else "FYI"
    ref = private_ref(item)
    title = body = ""
    if level in {"URGENT", "IMPORTANT"} and (task or due or financial or compliance) and not automated:
        category = categories[0] if categories else "Correo"
        title = f"[Correo][Tarea] Atender pendiente de {category.lower()} ({ref})"
        body = f"Origen: correo privado revisado por Atlas.\nReferencia privada: {ref}.\nCategoría: {category}.\nFecha objetivo sugerida: {due or 'Definir tras revisión'}.\nSiguiente acción: revisar el mensaje privado y ejecutar o responder lo solicitado.\nEvidencia esperada: respuesta enviada, gestión completada o decisión registrada.\nNota: no incluir remitente, asunto, cuerpo ni datos personales en el issue."
    return {"classification": level, "score": score, "state": state, "categories": list(dict.fromkeys(categories)), "reasons": list(dict.fromkeys(reasons)), "due_date": due, "private_reference": ref, "task_title": title, "task_body": body}


def open_db(path: Path) -> sqlite3.Connection:
    path.parent.mkdir(parents=True, exist_ok=True)
    db = sqlite3.connect(path)
    db.row_factory = sqlite3.Row
    db.execute("PRAGMA journal_mode=WAL")
    db.executescript("""
    CREATE TABLE IF NOT EXISTS runs(id INTEGER PRIMARY KEY,started_at TEXT,finished_at TEXT,mode TEXT,lookback_days INTEGER,status TEXT,accounts_seen INTEGER DEFAULT 0,folders_seen INTEGER DEFAULT 0,folders_skipped INTEGER DEFAULT 0,messages_seen INTEGER DEFAULT 0,content_fetched INTEGER DEFAULT 0,urgent_count INTEGER DEFAULT 0,important_count INTEGER DEFAULT 0,pending_count INTEGER DEFAULT 0,task_candidates INTEGER DEFAULT 0,errors INTEGER DEFAULT 0);
    CREATE TABLE IF NOT EXISTS messages(account_id TEXT,folder_id TEXT,message_id TEXT,thread_id TEXT,folder_name TEXT,folder_role TEXT,account_email TEXT,received_at TEXT,sender_email TEXT,to_address TEXT,cc_address TEXT,subject TEXT,summary TEXT,body_text TEXT,body_sha256 TEXT,priority_raw TEXT,status_raw TEXT,first_seen_at TEXT,last_seen_at TEXT,last_run_id INTEGER,PRIMARY KEY(account_id,folder_id,message_id));
    CREATE TABLE IF NOT EXISTS reviews(account_id TEXT,folder_id TEXT,message_id TEXT,private_reference TEXT,classification TEXT,attention_score INTEGER,response_state TEXT,categories_json TEXT,reasons_json TEXT,due_date TEXT,task_candidate_title TEXT,task_candidate_body TEXT,decision_state TEXT DEFAULT 'PROPOSED',reviewed_at TEXT,PRIMARY KEY(account_id,folder_id,message_id));
    CREATE TABLE IF NOT EXISTS task_links(private_reference TEXT PRIMARY KEY,issue_url TEXT,created_at TEXT);
    """)
    return db


def latest_cutoff(db: sqlite3.Connection, days: int, incremental: bool, now: datetime) -> datetime:
    base = now - timedelta(days=days)
    if not incremental:
        return base
    row = db.execute("SELECT finished_at FROM runs WHERE status='PASS' ORDER BY id DESC LIMIT 1").fetchone()
    stamp = parse_time(row[0]) if row and row[0] else None
    return max(base, stamp - timedelta(minutes=5)) if stamp else base


def changed(db: sqlite3.Connection, item: Mapping[str, Any], review: Mapping[str, Any]) -> bool:
    row = db.execute("SELECT m.subject,m.summary,m.body_sha256,m.status_raw,r.classification,r.attention_score,r.response_state,r.due_date,r.task_candidate_title FROM messages m LEFT JOIN reviews r USING(account_id,folder_id,message_id) WHERE m.account_id=? AND m.folder_id=? AND m.message_id=?", (item["account_id"], item["folder_id"], item["message_id"])).fetchone()
    if not row:
        return True
    body_hash = hashlib.sha256(item["body"].encode()).hexdigest() if item["body"] else str(row["body_sha256"] or "")
    current = (item["subject"], item["summary"], body_hash, item["status"], review["classification"], review["score"], review["state"], review["due_date"], review["task_title"])
    previous = (str(row["subject"] or ""), str(row["summary"] or ""), str(row["body_sha256"] or ""), str(row["status_raw"] or ""), str(row["classification"] or ""), int(row["attention_score"] or 0), str(row["response_state"] or ""), str(row["due_date"] or ""), str(row["task_candidate_title"] or ""))
    return current != previous


def upsert(db: sqlite3.Connection, run_id: int, item: Mapping[str, Any], review: Mapping[str, Any], body_limit: int) -> None:
    now = datetime.now(timezone.utc).isoformat()
    body = item["body"][:body_limit]
    body_hash = hashlib.sha256(item["body"].encode()).hexdigest() if item["body"] else ""
    db.execute("""INSERT INTO messages VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(account_id,folder_id,message_id) DO UPDATE SET thread_id=excluded.thread_id,folder_name=excluded.folder_name,folder_role=excluded.folder_role,account_email=excluded.account_email,received_at=excluded.received_at,sender_email=excluded.sender_email,to_address=excluded.to_address,cc_address=excluded.cc_address,subject=excluded.subject,summary=excluded.summary,body_text=CASE WHEN excluded.body_text<>'' THEN excluded.body_text ELSE messages.body_text END,body_sha256=CASE WHEN excluded.body_sha256<>'' THEN excluded.body_sha256 ELSE messages.body_sha256 END,priority_raw=excluded.priority_raw,status_raw=excluded.status_raw,last_seen_at=excluded.last_seen_at,last_run_id=excluded.last_run_id""", (item["account_id"], item["folder_id"], item["message_id"], item["thread_id"], item["folder_name"], item["role"], item["account_email"], item["received_at"].isoformat() if item["received_at"] else "", item["sender"], item["to"], item["cc"], item["subject"], item["summary"], body, body_hash, item["priority"], item["status"], now, now, run_id))
    db.execute("""INSERT INTO reviews(account_id,folder_id,message_id,private_reference,classification,attention_score,response_state,categories_json,reasons_json,due_date,task_candidate_title,task_candidate_body,reviewed_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(account_id,folder_id,message_id) DO UPDATE SET private_reference=excluded.private_reference,classification=excluded.classification,attention_score=excluded.attention_score,response_state=excluded.response_state,categories_json=excluded.categories_json,reasons_json=excluded.reasons_json,due_date=excluded.due_date,task_candidate_title=excluded.task_candidate_title,task_candidate_body=excluded.task_candidate_body,reviewed_at=excluded.reviewed_at""", (item["account_id"], item["folder_id"], item["message_id"], review["private_reference"], review["classification"], review["score"], review["state"], json.dumps(review["categories"], ensure_ascii=False), json.dumps(review["reasons"], ensure_ascii=False), review["due_date"], review["task_title"], review["task_body"], now))


def load_rules(path: Path | None) -> dict[str, Any]:
    rules = json.loads(json.dumps(DEFAULT_RULES, ensure_ascii=False))
    if path:
        custom = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(custom, dict):
            raise RuntimeError("Reglas JSON inválidas")
        rules.update(custom)
    return rules


def make_item(account_id: str, account_email: str, folder: Mapping[str, Any], row: Mapping[str, Any], body: str = "") -> dict[str, Any]:
    return {"account_id": account_id, "account_email": account_email, "folder_id": field(row, "folderId", "folder_id") or field(folder, "folderId", "folder_id", "id"), "folder_name": field(folder, "folderName", "name", "displayName"), "role": folder_role(folder), "message_id": field(row, "messageId", "message_id", "id"), "thread_id": field(row, "threadId", "thread_id"), "received_at": parse_time(row.get("receivedTime") or row.get("receivedtime") or row.get("sentDateInGMT") or row.get("date")), "sender": field(row, "fromAddress", "senderEmail", "from").casefold(), "to": field(row, "toAddress", "to"), "cc": field(row, "ccAddress", "cc"), "subject": norm_space(field(row, "subject")), "summary": norm_space(field(row, "summary", "snippet")), "body": norm_space(body), "priority": field(row, "priority"), "status": field(row, "status", "status2")}


def content_candidate(item: Mapping[str, Any], rules: Mapping[str, Any]) -> bool:
    if item["role"] == "sent":
        return False
    terms = sum((list(rules.get(key, [])) for key in ("urgent_terms", "financial_terms", "compliance_terms", "operations_terms", "task_terms")), [])
    return bool(hits(f"{item['subject']} {item['summary']}", terms)) or not item["summary"]


def collect(zoho: Zoho, rules: Mapping[str, Any], cutoff: datetime, args: argparse.Namespace, counts: dict[str, int]) -> list[dict[str, Any]]:
    items: list[dict[str, Any]] = []
    content_calls = 0
    for account in zoho.accounts():
        account_id = field(account, "accountId", "account_id", "id")
        if not account_id:
            counts["errors"] += 1
            continue
        email = field(account, "primaryEmailAddress", "emailAddress", "accountName", "mailboxAddress", "email").casefold()
        counts["accounts"] += 1
        for folder in zoho.folders(account_id):
            scan, _ = should_scan_folder(folder, rules, args.include_system_folders)
            if not scan:
                counts["folders_skipped"] += 1
                continue
            folder_id = field(folder, "folderId", "folder_id", "id")
            if not folder_id:
                counts["errors"] += 1
                continue
            counts["folders"] += 1
            for row in zoho.messages(account_id, folder_id, args.max_messages_per_folder):
                item = make_item(account_id, email, folder, row)
                if not item["message_id"]:
                    counts["errors"] += 1
                    continue
                if item["received_at"] and item["received_at"] < cutoff:
                    break
                if content_calls < args.max_content_fetches and content_candidate(item, rules):
                    try:
                        item = make_item(account_id, email, folder, row, zoho.content(account_id, item["folder_id"], item["message_id"]))
                        content_calls += 1
                    except RuntimeError:
                        counts["errors"] += 1
                items.append(item)
                counts["messages"] += 1
    counts["content"] = content_calls
    return items


def export(private_dir: Path, run_id: int, items: Sequence[dict[str, Any]], reviews: Mapping[str, dict[str, Any]], changed_keys: set[str], incremental: bool, counts: Mapping[str, int], days: int) -> tuple[Path, Path]:
    output = []
    for item in items:
        key = message_key(item)
        review = reviews[key]
        if review["classification"] == "FYI" or (incremental and key not in changed_keys):
            continue
        output.append({"private_reference": review["private_reference"], "classification": review["classification"], "attention_score": review["score"], "response_state": review["state"], "categories": review["categories"], "reasons": review["reasons"], "due_date": review["due_date"], "received_at": item["received_at"].isoformat() if item["received_at"] else "", "folder_name": item["folder_name"], "sender_email": item["sender"], "subject": item["subject"], "summary": item["summary"], "body_excerpt": item["body"][:2000], "task_candidate": {"title": review["task_title"], "body": review["task_body"]} if review["task_title"] else None})
    output.sort(key=lambda row: (row["attention_score"], row["received_at"]), reverse=True)
    private_path = private_dir / "latest_review_private.json"
    private_path.write_text(json.dumps({"status": "PASS_ATLAS_MAIL_REVIEW", "run_id": run_id, "generated_at": datetime.now(timezone.utc).isoformat(), "contains_personal_data": True, "items": output}, ensure_ascii=False, indent=2), encoding="utf-8")
    summary = {"status": "PASS_ATLAS_MAIL_REVIEW", "run_id": run_id, "generated_at": datetime.now(timezone.utc).isoformat(), "contains_personal_data": False, "lookback_days": days, "accounts_seen": counts["accounts"], "folders_seen": counts["folders"], "folders_skipped": counts["folders_skipped"], "messages_seen": counts["messages"], "content_fetched": counts["content"], "urgent_count": counts["urgent"], "important_count": counts["important"], "pending_count": counts["pending"], "task_candidates": counts["task_candidates"], "new_or_changed_items": counts["changed"], "errors": counts["errors"], "writes_to_mail": 0, "writes_to_github": 0}
    summary_path = private_dir / "latest_summary_sanitized.json"
    summary_path.write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    return private_path, summary_path


def run_review(args: argparse.Namespace) -> int:
    private_dir = Path(args.private_dir).expanduser()
    private_dir.mkdir(parents=True, exist_ok=True)
    db = open_db(private_dir / "atlas_mail.sqlite3")
    now = datetime.now(timezone.utc)
    cutoff = latest_cutoff(db, args.lookback_days, args.incremental, now)
    run_id = db.execute("INSERT INTO runs(started_at,mode,lookback_days,status) VALUES(?,?,?,?)", (now.isoformat(), "INCREMENTAL" if args.incremental else "BACKFILL", args.lookback_days, "RUNNING")).lastrowid
    db.commit()
    counts = {key: 0 for key in ("accounts", "folders", "folders_skipped", "messages", "content", "urgent", "important", "pending", "task_candidates", "changed", "errors")}
    status = "HOLD"
    try:
        rules = load_rules(Path(args.rules) if args.rules else None)
        zoho = Zoho(read_dotenv(Path(args.credentials_env).expanduser()))
        items = collect(zoho, rules, cutoff, args, counts)
        states = response_states(items)
        reviews: dict[str, dict[str, Any]] = {}
        changed_keys: set[str] = set()
        for item in items:
            key = message_key(item)
            review = classify(item, states.get(key, "REQUIRES_REVIEW"), rules, now)
            if changed(db, item, review):
                changed_keys.add(key)
            upsert(db, int(run_id), item, review, args.store_body_chars)
            reviews[key] = review
            counts["urgent"] += review["classification"] == "URGENT"
            counts["important"] += review["classification"] == "IMPORTANT"
            counts["pending"] += review["state"] == "PROBABLY_PENDING"
            counts["task_candidates"] += bool(review["task_title"])
        counts["changed"] = len(changed_keys)
        db.commit()
        private_path, summary_path = export(private_dir, int(run_id), items, reviews, changed_keys, args.incremental, counts, args.lookback_days)
        status = "PASS"
        print("PASS_ATLAS_MAIL_REVIEW")
        print(f"Modo: {'INCREMENTAL' if args.incremental else 'BACKFILL'}")
        print(f"Cuentas: {counts['accounts']} | Carpetas: {counts['folders']} | Omitidas: {counts['folders_skipped']}")
        print(f"Mensajes: {counts['messages']} | Contenidos: {counts['content']} | Errores: {counts['errors']}")
        print(f"Urgentes: {counts['urgent']} | Importantes: {counts['important']} | Pendientes: {counts['pending']}")
        print(f"Candidatos a tarea: {counts['task_candidates']} | Nuevos/cambiados: {counts['changed']}")
        print(f"Reporte privado: {private_path}\nResumen sanitizado: {summary_path}")
        print("Writes Zoho Mail: 0\nWrites GitHub: 0")
        return 0
    except (RuntimeError, sqlite3.Error, OSError, ValueError) as exc:
        counts["errors"] += 1
        print(f"HOLD_ATLAS_MAIL_REVIEW: {exc}", file=sys.stderr)
        return 2
    finally:
        db.execute("UPDATE runs SET finished_at=?,status=?,accounts_seen=?,folders_seen=?,folders_skipped=?,messages_seen=?,content_fetched=?,urgent_count=?,important_count=?,pending_count=?,task_candidates=?,errors=? WHERE id=?", (datetime.now(timezone.utc).isoformat(), status, counts["accounts"], counts["folders"], counts["folders_skipped"], counts["messages"], counts["content"], counts["urgent"], counts["important"], counts["pending"], counts["task_candidates"], counts["errors"], run_id))
        db.commit()
        db.close()


def run_search(args: argparse.Namespace) -> int:
    private_dir = Path(args.private_dir).expanduser()
    db_path = private_dir / "atlas_mail.sqlite3"
    if not db_path.exists():
        print(f"HOLD_ATLAS_MAIL_SEARCH: no existe {db_path}", file=sys.stderr)
        return 2
    query = norm(args.query)
    db = sqlite3.connect(db_path)
    db.row_factory = sqlite3.Row
    matches = []
    for row in db.execute("SELECT m.received_at,m.folder_name,m.sender_email,m.subject,m.summary,m.body_text,r.private_reference,r.classification,r.response_state,r.due_date FROM messages m LEFT JOIN reviews r USING(account_id,folder_id,message_id) ORDER BY m.received_at DESC LIMIT 2000"):
        if query in norm(" ".join(str(row[key] or "") for key in ("sender_email", "subject", "summary", "body_text", "private_reference"))):
            matches.append(dict(row))
            if len(matches) >= args.limit:
                break
    db.close()
    output = private_dir / "latest_search_private.json"
    output.write_text(json.dumps({"status": "PASS_ATLAS_MAIL_SEARCH", "query": args.query, "contains_personal_data": True, "matches": matches}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"PASS_ATLAS_MAIL_SEARCH\nCoincidencias: {len(matches)}\nReporte privado: {output}")
    return 0


def default_path(*parts: str) -> str:
    return str(Path(os.getenv("USERPROFILE") or Path.home()) / "OneDrive" / "Documentos" / "Proyectos" / "0-Origen" / Path(*parts))


def parser() -> argparse.ArgumentParser:
    root = argparse.ArgumentParser(description="Atlas Mail Ops READ-only")
    commands = root.add_subparsers(dest="command", required=True)
    review = commands.add_parser("review")
    review.add_argument("--credentials-env", default=default_path("Zoho_Deluge", ".env"))
    review.add_argument("--private-dir", default=default_path("Atlas_Mail_Ops"))
    review.add_argument("--rules", default="config/atlas_mail_rules.example.json")
    review.add_argument("--lookback-days", type=int, default=30)
    review.add_argument("--max-messages-per-folder", type=int, default=1000)
    review.add_argument("--max-content-fetches", type=int, default=300)
    review.add_argument("--store-body-chars", type=int, default=20000)
    review.add_argument("--include-system-folders", action="store_true")
    review.add_argument("--incremental", action="store_true")
    review.set_defaults(func=run_review)
    search = commands.add_parser("search")
    search.add_argument("query")
    search.add_argument("--private-dir", default=default_path("Atlas_Mail_Ops"))
    search.add_argument("--limit", type=int, default=20)
    search.set_defaults(func=run_search)
    return root


def main() -> int:
    args = parser().parse_args()
    if getattr(args, "lookback_days", 1) < 1:
        raise SystemExit("lookback-days debe ser mayor que cero")
    return int(args.func(args))


if __name__ == "__main__":
    raise SystemExit(main())
