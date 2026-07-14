import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

const assets = [
  "iso-week-base.css",
  "iso-week-views.css",
  "iso/core.js",
  "iso/calendar.js",
  "iso/data.js",
  "iso/home.js",
  "iso/detail.js",
  "iso/app.js"
];

test("todos los recursos estáticos llevan una versión de caché", () => {
  for (const asset of assets) {
    const escaped = asset.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(html, new RegExp(`${escaped}\\?v=overdue-14a6fc61`));
  }
});

test("el documento solicita evitar una copia HTML antigua", () => {
  assert.match(html, /Cache-Control" content="no-cache, no-store, must-revalidate"/);
  assert.match(html, /Pragma" content="no-cache"/);
  assert.match(html, /Expires" content="0"/);
});
