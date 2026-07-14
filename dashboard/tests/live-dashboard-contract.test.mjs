import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const core = await readFile(new URL("../iso/core.js", import.meta.url), "utf8");
const calendar = await readFile(new URL("../iso/calendar.js", import.meta.url), "utf8");
const data = await readFile(new URL("../iso/data.js", import.meta.url), "utf8");
const home = await readFile(new URL("../iso/home.js", import.meta.url), "utf8");
const detail = await readFile(new URL("../iso/detail.js", import.meta.url), "utf8");
const app = await readFile(new URL("../iso/app.js", import.meta.url), "utf8");
const views = home + "\n" + detail;
const script = [core, calendar, data, home, detail, app].join("\n");
const cssBase = await readFile(new URL("../iso-week-base.css", import.meta.url), "utf8");
const cssViews = await readFile(new URL("../iso-week-views.css", import.meta.url), "utf8");
const css = cssBase + "\n" + cssViews;

test("consulta GitHub Issues en vivo sin snapshot ni credenciales", () => {
  assert.match(script, /api\.github\.com\/repos\/misaeln-pc1\/capacita-task-hub\/issues/);
  assert.match(script, /state=open&per_page=100/);
  assert.match(script, /cache:\s*"no-store"/);
  assert.doesNotMatch(html + script, /snapshot\.js|__ATLAS_SNAPSHOT__|GITHUB_TOKEN|Authorization/);
});

test("carga recursos locales del dashboard semanal", () => {
  assert.match(html, /iso-week-base\.css/);
  assert.match(html, /iso-week-views\.css/);
  for (const file of ["core.js", "calendar.js", "data.js", "home.js", "detail.js", "app.js"]) {
    assert.match(html, new RegExp(file.replace(".", "\\.")));
  }
  assert.ok(css.length > 5000);
  assert.ok(script.length > 15000);
});

test("usa navegación interna y nunca envía una tarjeta a GitHub", () => {
  assert.match(app, /routeTo\(`task\/\$\{task\.dataset\.taskId\}`\)/);
  assert.match(app, /routeTo\(`week\/\$\{week\.dataset\.week\}`\)/);
  assert.match(views, /function renderTask\(id\)/);
  assert.match(views, /function renderWeek\(key\)/);
  assert.doesNotMatch(html + script, /Abrir issue en GitHub|html_url|target="_blank"/);
});

test("el bloque de hitos navega primero por semana", () => {
  assert.match(home, /Hitos por semana/);
  assert.match(home, /milestoneWeeks=weeks\.filter/);
  assert.match(home, /class="milestone-week[^\n]+data-week="\$\{key\}"/);
  assert.doesNotMatch(home, /class="milestone"[^\n]+data-task-id/);
  assert.match(home, /Abrir semana/);
});

test("el bloque de carga omite semanas vacías y usa semáforo", () => {
  assert.match(home, /loadWeeks=weeks\.filter\(\(key\)=>workTasksInWeek\(key\)\.length>0\)/);
  assert.match(home, /if\(count<=2\)return "load-green"/);
  for (const tone of ["load-green", "load-orange", "load-red"]) {
    assert.match(home + cssViews, new RegExp(tone));
  }
  assert.match(home, /Verde: 1–2 tareas/);
});

test("la vista semanal presenta una lista cronológica única", () => {
  assert.match(detail, /Tareas e hitos de la semana/);
  assert.match(detail, /ordered\.map\(taskCard\)/);
  assert.match(detail, /Number\(b\.isMilestone\)-Number\(a\.isMilestone\)/);
  assert.doesNotMatch(detail, /<h2>Hitos<\/h2>[\s\S]*<h2>Tareas activas<\/h2>/);
});

test("la vista de tarea contiene campos operativos", () => {
  for (const label of [
    "Fecha de inicio","Fecha de término","Estado","Responsable",
    "Siguiente acción","Proyecto","Tipo","Prioridad / riesgo","Estimación","Semanas ISO"
  ]) assert.match(views, new RegExp(label));
});

test("mantiene actualización manual y periódica", () => {
  assert.match(html, /id="refresh"/);
  assert.match(app, /addEventListener\("click",refresh\)/);
  assert.match(app, /setInterval\(\(\)=>\{if\(!document\.hidden\)refresh\(\)\},5\*60\*1000\)/);
});

test("calcula semanas ISO 8601 y rangos lunes-domingo", () => {
  const start = calendar.indexOf("const dateUTC=");
  const end = calendar.indexOf("const isOverdue=");
  assert.ok(start >= 0 && end > start);
  const pure = calendar.slice(start, end) + "\nglobalThis.__atlasTest={isoWeekKey,weekInfo,weeksForTask};";
  const context = { Date, Intl };
  vm.createContext(context);
  vm.runInContext(pure, context);
  const { isoWeekKey, weekInfo, weeksForTask } = context.__atlasTest;

  assert.equal(isoWeekKey("2025-12-29"), "2026-W01");
  assert.equal(isoWeekKey("2026-07-13"), "2026-W29");
  assert.equal(isoWeekKey("2026-07-19"), "2026-W29");
  const info = JSON.parse(JSON.stringify(weekInfo("2026-W29")));
  assert.equal(info.key, "2026-W29");
  assert.equal(info.monday, "2026-07-13");
  assert.equal(info.sunday, "2026-07-19");
  assert.match(info.range, /13.*jul.*19.*jul.*2026/i);
  assert.deepEqual(
    Array.from(weeksForTask({start:"2026-07-13",end:"2026-07-27"})),
    ["2026-W29","2026-W30","2026-W31"]
  );
});

test("interpreta formatos legacy sin confundir fechas contextuales", () => {
  const start = core.indexOf("const MONTHS=");
  const end = core.indexOf("const projectId=");
  assert.ok(start >= 0 && end > start);
  const parser = core.slice(start, end) + "\nglobalThis.__parserTest={field,parseDate,dateFromBody};";
  const context = { Date, Intl, document:{querySelector(){return null}} };
  vm.createContext(context);
  vm.runInContext(parser, context);
  const { field, parseDate, dateFromBody } = context.__parserTest;
  const body = `## Clasificación\n- **Tipo:** Hito / tarea ejecutiva\n- **Fecha objetivo:** lunes 13 de julio de 2026.\n\n## Fechas\n- **Inicio del curso:** miércoles 15 de julio de 2026.`;
  assert.equal(field(body, ["Tipo"]), "Hito / tarea ejecutiva");
  assert.equal(parseDate(field(body, ["Fecha objetivo"])), "2026-07-13");
  assert.equal(dateFromBody(body, ["Fecha inicio","Fecha de inicio"], ["Fecha inicio"]), null);
});
