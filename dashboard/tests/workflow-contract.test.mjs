import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const workflow = await readFile(
  new URL("../../.github/workflows/refresh-dashboard-snapshot.yml", import.meta.url),
  "utf8",
);

test("workflow es exclusivamente manual", () => {
  assert.match(workflow, /workflow_dispatch:/);
  assert.doesNotMatch(workflow, /\n\s*(push|pull_request|schedule):/);
});

test("usa token automático con permisos mínimos declarados", () => {
  assert.match(workflow, /GITHUB_TOKEN:\s*\$\{\{ github\.token \}\}/);
  assert.match(workflow, /contents:\s*write/);
  assert.match(workflow, /issues:\s*read/);
  assert.match(workflow, /pull-requests:\s*write/);
  assert.doesNotMatch(workflow, /secrets\.[A-Z0-9_]+/);
});

test("regenera, valida y prueba antes de proponer cambios", () => {
  assert.match(workflow, /node dashboard\/predeploy\.mjs/);
  assert.match(workflow, /node --test dashboard\/tests\/\*\.test\.mjs/);
  assert.match(workflow, /git diff --check/);
});

test("crea rama y PR draft sin escribir directo en main", () => {
  assert.match(workflow, /automation\/dashboard-snapshot-\$\{GITHUB_RUN_ID\}/);
  assert.match(workflow, /git switch -c "\$branch"/);
  assert.match(workflow, /git push origin "\$branch"/);
  assert.match(workflow, /gh pr create/);
  assert.match(workflow, /--draft/);
  assert.doesNotMatch(workflow, /git push[^\n]*(HEAD:main|origin main)/);
});

test("no contiene comandos de despliegue de Sites", () => {
  assert.doesNotMatch(workflow, /chatgpt\.site|\bcheckpoint\s+(create|deploy)|\bsites?\s+deploy|npm\s+run\s+deploy/i);
});
