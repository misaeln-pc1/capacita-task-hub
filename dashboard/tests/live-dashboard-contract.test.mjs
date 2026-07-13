import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("consulta GitHub Issues en vivo", () => {
  assert.match(html, /api\.github\.com\/repos\/misaeln-pc1\/capacita-task-hub\/issues/);
  assert.match(html, /state=open&per_page=100/);
  assert.match(html, /cache:\s*"no-store"/);
});

test("no depende de snapshot ni credenciales", () => {
  assert.doesNotMatch(html, /snapshot\.js|__ATLAS_SNAPSHOT__/);
  assert.doesNotMatch(html, /Authorization|GITHUB_TOKEN|secrets\./);
});

test("permite actualización manual y periódica", () => {
  assert.match(html, /id="refresh"/);
  assert.match(html, /addEventListener\("click",refresh\)/);
  assert.match(html, /setInterval\(\(\)=>\{if\(!document\.hidden\)refresh\(\)\},5\*60\*1000\)/);
});

test("falla de forma visible sin mostrar datos antiguos", () => {
  assert.match(html, /No se mostró ningún snapshot antiguo/);
  assert.match(html, /response\.status===404/);
});

test("mantiene filtros operativos", () => {
  for (const id of ["search","project-filter","status-filter","risk-filter"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
});
