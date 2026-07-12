#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const here=dirname(fileURLToPath(import.meta.url));
const snapshot=JSON.parse(await readFile(join(here,"snapshot.json"),"utf8"));
const errors=[];
if(snapshot.schema_version!==2)errors.push("schema_version no es 2");
if(snapshot.status!=="current")errors.push("status no es current");
if(snapshot.timezone!=="America/Santiago")errors.push("timezone incorrecta");
if(!Array.isArray(snapshot.tasks))errors.push("tasks no es una lista");
if(snapshot.tasks?.some((task)=>task.id===26))errors.push("regresión: issue cerrada #26 presente");
if(snapshot.tasks?.some((task)=>task.operational_state_valid!==true))errors.push("issue abierta con Estado operativo inválido; corregir el cuerpo antes de desplegar");
if(snapshot.tasks?.some((task)=>!task.url?.startsWith("https://github.com/misaeln-pc1/capacita-task-hub/issues/")))errors.push("enlace de issue inválido");
if(snapshot.tasks?.some((task)=>Boolean(task.due)!==Boolean(task.due_date)))errors.push("due y due_date deben existir juntos");
if(snapshot.tasks?.some((task)=>task.due&&!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(task.due)))errors.push("due no es timestamp UTC ISO");
if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(snapshot.generated_at))errors.push("generated_at no es timestamp UTC ISO");
const generated=new Date(snapshot.generated_at);
const ageMinutes=(Date.now()-generated.getTime())/60000;
if(!Number.isFinite(ageMinutes)||ageMinutes < -5||ageMinutes>120)errors.push("snapshot fuera de ventana de frescura: "+ageMinutes.toFixed(1)+" min");
if(errors.length){console.error("ERROR: validación de snapshot falló:\n- "+errors.join("\n- "));process.exit(1)}
console.log("Snapshot validado: "+snapshot.tasks.length+" tareas · antigüedad "+ageMinutes.toFixed(1)+" min");
