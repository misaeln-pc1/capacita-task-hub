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

test("consulta GitHub Issues en vivo sin snapshot ni credenciales embebidas", () => {
  assert.match(script, /api\.github\.com\/repos\/misaeln-pc1\/capacita-task-hub\/issues/);
  assert.match(script, /state=open&per_page=100/);
  assert.match(script, /cache:\s*"no-store"/);
  assert.doesNotMatch(html + script, /snapshot\.js|__ATLAS_SNAPSHOT__|GITHUB_TOKEN|github_pat_[A-Za-z0-9_]+|ghp_[A-Za-z0-9]+/);
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

test("elimina textos explicativos para compactar la portada", () => {
  for (const text of [
    "Cronología de hitos y carga de trabajo por semanas ISO",
    "Solo lectura. Las tareas se actualizan desde la fuente oficial",
    "Cronología de entregas y fechas críticas",
    "Solo se muestran semanas con trabajo"
  ]) assert.doesNotMatch(html + home, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")));
  assert.match(home, /<h2>Hitos por semana<\/h2>/);
  assert.match(home, /<h2>Carga de tareas por semana<\/h2>/);
});

test("usa navegación interna y nunca envía una tarjeta a GitHub", () => {
  assert.match(app, /routeTo\(`task\/\$\{task\.dataset\.taskId\}`\)/);
  assert.match(app, /routeTo\(`week\/\$\{week\.dataset\.week\}`\)/);
  assert.match(views, /function renderTask\(id\)/);
  assert.match(views, /function renderWeek\(key\)/);
  assert.doesNotMatch(html + script, /Abrir issue en GitHub|html_url|target="_blank"/);
});

test("cierra únicamente la issue visualizada con un payload fijo", () => {
  assert.match(detail + app, /Cerrar como completada/);
  assert.match(app, /WRITE_TOKEN_STORAGE_KEY="atlas\.github\.issue\.write\.token\.v1"/);
  assert.match(app, /localStorage\.setItem\(WRITE_TOKEN_STORAGE_KEY,token\)/);
  assert.match(app, /route\[0\]!=="task"\|\|Number\(route\[1\]\)!==id/);
  assert.match(app, /fetch\(`\$\{API_BASE\}\/\$\{id\}`/);
  assert.match(app, /method:"PATCH"/);
  assert.match(app, /state:"closed",state_reason:"completed"/);
  assert.match(app, /Number\(result\.number\)!==id\|\|result\.state!=="closed"/);
  assert.match(app, /routeTo\(""\);\s*await refresh\(\)/);
  assert.doesNotMatch(app, /method:"(?:DELETE|PUT|POST)"/);
  assert.doesNotMatch(app, /\/comments|\/labels|\/assignees|\/milestones/);
});

test("permite eliminar el token local sin exponerlo en la interfaz", () => {
  assert.match(app, /localStorage\.removeItem\(WRITE_TOKEN_STORAGE_KEY\)/);
  assert.match(detail + app, /Eliminar acceso de este dispositivo/);
  assert.match(app, /type="password"/);
  assert.doesNotMatch(detail + app, /console\.(?:log|info|debug)\([^)]*token/i);
});

test("muestra siempre la semana actual y las cuatro siguientes", () => {
  assert.match(home, /const visibleWeekKeys=\(\)=>/);
  assert.match(home, /Array\.from\(\{length:5\}/);
  assert.match(home, /const weeks=visibleWeekKeys\(\)/);
  assert.match(cssBase, /grid-template-columns:repeat\(5,minmax\(0,1fr\)\)/);
  assert.match(cssViews, /grid-template-columns:repeat\(5,minmax\(0,1fr\)\)/);
});

test("los dos bloques conservan también semanas vacías", () => {
  assert.match(home, /weeks\.map\(\(key\)=>/);
  assert.doesNotMatch(home, /milestoneWeeks=weeks\.filter/);
  assert.doesNotMatch(home, /loadWeeks=weeks\.filter/);
  assert.match(home, /week-empty-body/);
  assert.match(home + cssViews, /load-empty/);
});

test("el bloque de carga mantiene semáforo y prioriza vencidas en rojo", () => {
  assert.match(home, /if\(hasOverdue\)return "load-red"/);
  assert.match(home, /if\(count===0\)return "load-empty"/);
  assert.match(home, /if\(count<=2\)return "load-green"/);
  for (const tone of ["load-empty", "load-green", "load-orange", "load-red"]) {
    assert.match(home + cssViews, new RegExp(tone));
  }
});

test("marca tareas e hitos vencidos en rojo", () => {
  assert.match(home, /badge red">Vencida/);
  assert.match(home, /task-card \$\{overdue\?"overdue"/);
  assert.match(home, /has-overdue/);
  assert.match(home, /overdue-item/);
  assert.match(cssViews, /task-card\.overdue/);
  assert.match(cssViews, /milestone-week\.has-overdue/);
  assert.match(detail, /detail-overdue/);
  assert.match(detail, /Vencida y arrastrada a la Week actual/);
});

test("la vista semanal presenta una lista cronológica única y vencidas primero", () => {
  assert.match(detail, /Tareas e hitos de la semana/);
  assert.match(detail, /ordered\.map\(taskCard\)/);
  assert.match(detail, /Number\(isOverdue\(b\)\)-Number\(isOverdue\(a\)\)/);
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
  assert.doesNotMatch(app, /info-banner/);
});

test("calcula semanas ISO 8601 y rangos lunes-domingo", () => {
  const start = calendar.indexOf("const dateUTC=");
  const end = calendar.indexOf("const routeTo=");
  assert.ok(start >= 0 && end > start);
  const pure = calendar.slice(start, end) + "\nglobalThis.__atlasTest={isoWeekKey,weekInfo,scheduledWeeksForTask,weeksForTask,isOverdue,currentWeek};";
  const context = { Date, Intl };
  vm.createContext(context);
  vm.runInContext(pure, context);
  const { isoWeekKey, weekInfo, scheduledWeeksForTask, weeksForTask, isOverdue, currentWeek } = context.__atlasTest;

  assert.equal(isoWeekKey("2025-12-29"), "2026-W01");
  assert.equal(isoWeekKey("2026-07-13"), "2026-W29");
  assert.equal(isoWeekKey("2026-07-19"), "2026-W29");
  assert.equal(currentWeek("2026-07-14"), "2026-W29");
  const info = JSON.parse(JSON.stringify(weekInfo("2026-W29")));
  assert.equal(info.key, "2026-W29");
  assert.equal(info.monday, "2026-07-13");
  assert.equal(info.sunday, "2026-07-19");
  assert.match(info.range, /13.*jul.*19.*jul.*2026/i);
  assert.deepEqual(
    Array.from(weeksForTask({start:"2026-07-13",end:"2026-07-27"},"2026-07-14")),
    ["2026-W29","2026-W30","2026-W31"]
  );

  const overdue={start:"2026-07-05",end:"2026-07-05"};
  assert.equal(isOverdue(overdue,"2026-07-14"), true);
  assert.deepEqual(Array.from(scheduledWeeksForTask(overdue)), ["2026-W27"]);
  assert.deepEqual(Array.from(weeksForTask(overdue,"2026-07-14")), ["2026-W27","2026-W29"]);
  assert.equal(weeksForTask(overdue,"2026-07-14").includes("2026-W28"), false);

  const reprogrammed={start:"2026-07-21",end:"2026-07-21"};
  assert.equal(isOverdue(reprogrammed,"2026-07-14"), false);
  assert.deepEqual(Array.from(weeksForTask(reprogrammed,"2026-07-14")), ["2026-W30"]);
});

test("interpreta formatos legacy y fechas específicas de hitos", () => {
  const start = core.indexOf("const MONTHS=");
  const end = core.indexOf("const projectId=");
  assert.ok(start >= 0 && end > start);
  const parser = core.slice(start, end) + "\nglobalThis.__parserTest={field,parseDate,dateFromBody,milestoneDateFromBody};";
  const context = { Date, Intl, document:{querySelector(){return null}} };
  vm.createContext(context);
  vm.runInContext(parser, context);
  const { field, parseDate, dateFromBody, milestoneDateFromBody } = context.__parserTest;
  const body = `## Clasificación\n- **Tipo:** Hito / tarea ejecutiva\n- **Fecha objetivo:** lunes 13 de julio de 2026.\n\n## Fechas\n- **Inicio del curso:** miércoles 15 de julio de 2026.`;
  assert.equal(field(body, ["Tipo"]), "Hito / tarea ejecutiva");
  assert.equal(parseDate(field(body, ["Fecha objetivo"])), "2026-07-13");
  assert.equal(dateFromBody(body, ["Fecha inicio","Fecha de inicio"], ["Fecha inicio"]), null);

  const audit = `## Fecha\n\n- **Fecha de auditoría:** martes 11 de agosto de 2026\n- **Ciclo cubierto:** año 2025 hasta 2026`;
  const preaudit = `## Fecha\n\n- **Fecha de preauditoría:** viernes 24 de julio de 2026`;
  assert.equal(milestoneDateFromBody(audit), "2026-08-11");
  assert.equal(milestoneDateFromBody(preaudit), "2026-07-24");
});

test("ejecuta PATCH sólo sobre el id de la ruta abierta y luego refresca", async () => {
  const start = app.indexOf("const WRITE_TOKEN_STORAGE_KEY=");
  const end = app.indexOf("async function refresh()");
  assert.ok(start >= 0 && end > start);
  const fragment = app.slice(start, end) + "\nglobalThis.__closeTest={closeVisibleIssue};";
  const calls=[];
  let routed=null;
  let refreshed=0;
  const banner={textContent:"",classList:{add(){},remove(){}}};
  const context={
    API_BASE:"https://api.github.com/repos/misaeln-pc1/capacita-task-hub/issues",
    tasks:[{id:74}],
    routeParts:()=>["task","74"],
    localStorage:{getItem:()=>"token-local",setItem(){},removeItem(){}},
    confirm:()=>true,
    document:{querySelector:()=>null},
    $:()=>banner,
    fetch:async (url,options)=>{
      calls.push({url,options});
      return {ok:true,status:200,json:async()=>({number:74,state:"closed"})};
    },
    routeTo:(path)=>{routed=path},
    refresh:async()=>{refreshed+=1},
    console
  };
  vm.createContext(context);
  vm.runInContext(fragment,context);
  await context.__closeTest.closeVisibleIssue(74);
  assert.equal(calls.length,1);
  assert.equal(calls[0].url,"https://api.github.com/repos/misaeln-pc1/capacita-task-hub/issues/74");
  assert.equal(calls[0].options.method,"PATCH");
  assert.deepEqual(JSON.parse(calls[0].options.body),{state:"closed",state_reason:"completed"});
  assert.equal(routed,"");
  assert.equal(refreshed,1);
});

test("bloquea el cierre cuando el id solicitado no coincide con la ficha", async () => {
  const start = app.indexOf("const WRITE_TOKEN_STORAGE_KEY=");
  const end = app.indexOf("async function refresh()");
  const fragment = app.slice(start, end) + "\nglobalThis.__closeTest={closeVisibleIssue};";
  let fetches=0;
  const banner={textContent:"",classList:{add(){},remove(){}}};
  const context={
    API_BASE:"https://api.github.com/repos/misaeln-pc1/capacita-task-hub/issues",
    tasks:[{id:74}],
    routeParts:()=>["task","74"],
    localStorage:{getItem:()=>"token-local",setItem(){},removeItem(){}},
    confirm:()=>true,
    document:{querySelector:()=>null},
    $:()=>banner,
    fetch:async()=>{fetches+=1;return {ok:true,json:async()=>({})}},
    routeTo(){},
    refresh:async()=>{},
    console
  };
  vm.createContext(context);
  vm.runInContext(fragment,context);
  await context.__closeTest.closeVisibleIssue(75);
  assert.equal(fetches,0);
  assert.match(banner.textContent,/no coincide con la ficha abierta/);
});
