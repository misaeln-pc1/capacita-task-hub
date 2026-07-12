import test from "node:test";
import assert from "node:assert/strict";
import { buildSnapshot } from "../snapshot-lib.mjs";
const now=new Date("2026-07-12T12:00:00-04:00");
const issues=[
 {number:26,state:"closed",title:"[NCh 2728][Tarea] Cerrada",body:"## Fecha objetivo\n12 de julio de 2026",html_url:"https://github.com/misaeln-pc1/capacita-task-hub/issues/26"},
 {number:21,state:"open",title:"[HITO] Entregar licitación SOFOFA",body:"## Fecha límite\n22/07/2026 14:00\n\n- **Prioridad:** P1\n- **Riesgo:** Rojo",html_url:"https://github.com/misaeln-pc1/capacita-task-hub/issues/21"},
 {number:15,state:"open",title:"Implementar piloto R2 SOFOFA",body:"## Fecha objetivo\n2026-07-10\n\n## Semáforo\nAmarillo.",html_url:"https://github.com/misaeln-pc1/capacita-task-hub/issues/15"},
];
test("excluye issues cerradas y conserva abiertas",()=>{const s=buildSnapshot(issues,{now});assert.equal(s.tasks.some((t)=>t.id===26),false);assert.equal(s.tasks.some((t)=>t.id===21),true)});
test("conserva fecha original para arrastre",()=>{const s=buildSnapshot(issues,{now});const t=s.tasks.find((x)=>x.id===15);assert.equal(t.due,"2026-07-10T12:00:00-04:00");assert.ok(t.due.slice(0,10)<s.today)});
test("genera corte en America/Santiago",()=>{const s=buildSnapshot(issues,{now});assert.equal(s.timezone,"America/Santiago");assert.equal(s.today,"2026-07-12");assert.match(s.generated_at,/^2026-07-12T/)});
test("fallo sin token bloquea el generador",async()=>{const {spawnSync}=await import("node:child_process");const {fileURLToPath}=await import("node:url");const script=fileURLToPath(new URL("../generate-snapshot.mjs",import.meta.url));const r=spawnSync(process.execPath,[script],{env:{}});assert.notEqual(r.status,0);assert.match(r.stderr.toString(),/falta GITHUB_TOKEN/)});
