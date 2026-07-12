import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const html=await readFile(new URL("../index.html",import.meta.url),"utf8");
const snapshot=JSON.parse(await readFile(new URL("../snapshot.json",import.meta.url),"utf8"));

test("issue cerrada #26 no está en el snapshot vigente",()=>assert.equal(snapshot.tasks.some((t)=>t.id===26),false));
test("issue abierta #21 conserva título y enlace",()=>{const t=snapshot.tasks.find((x)=>x.id===21);assert.ok(t);assert.match(t.title,/SOFOFA/);assert.equal(t.url,"https://github.com/misaeln-pc1/capacita-task-hub/issues/21")});
test("contrato de arrastre V4 permanece",()=>{assert.match(html,/function isOverdue/);assert.match(html,/current&&isOverdue/);assert.match(html,/overdueLabel/);assert.match(html,/Arrastre pendiente/);assert.match(html,/atlasRoute/);});
test("fecha de corte y aviso de obsolescencia existen",()=>{assert.match(html,/id="snapshot-at"/);assert.match(html,/Datos no actualizados/);assert.match(html,/ageHours>6/)});
test("controles principales permanecen",()=>{for(const id of ["tab-chrono","tab-atlas","milestone-weeks","load-weeks","search","project-select","undated-open","drawer-wrap","overlay"])assert.match(html,new RegExp('id="'+id+'"'))});
test("frontend no contiene credenciales ni consulta GitHub",()=>{assert.doesNotMatch(html,/GITHUB_TOKEN|api\.github\.com|Authorization\s*:/i);assert.match(html,/src="\.\/snapshot\.js"/)});
