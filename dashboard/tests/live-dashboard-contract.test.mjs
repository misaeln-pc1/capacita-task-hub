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

test("todas las tarjetas abren el modal de detalle", () => {
  assert.match(html, /data-open-task="\$\{task\.id\}"/);
  assert.match(html, /function openTaskModal\(taskId\)/);
  assert.match(html, /closest\("\[data-open-task\]"\)/);
  assert.doesNotMatch(html, /class="task"[^>]+href=/);
  assert.doesNotMatch(html, /class="focus-card"[^>]+href=/);
});

test("el modal conserva acceso explícito a GitHub y cierre accesible", () => {
  assert.match(html, /id="task-modal"/);
  assert.match(html, /id="modal-github"/);
  assert.match(html, /Abrir issue en GitHub/);
  assert.match(html, /id="modal-close"/);
  assert.match(html, /event\.key==="Escape"/);
  assert.match(html, /event\.target\.id==="task-modal"/);
});
