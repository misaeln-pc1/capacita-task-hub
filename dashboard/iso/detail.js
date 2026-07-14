"use strict";
function renderWeek(key){
  const info=weekInfo(key);
  if(!info){renderNotFound("Semana no válida.");return}
  const all=tasksInWeek(key);
  const milestones=all.filter((task)=>task.isMilestone);
  const work=all.filter((task)=>!task.isMilestone);
  $("#view").innerHTML=`
    <div class="breadcrumb"><button type="button" data-home>Planificador</button><span>/</span><span>${key}</span></div>
    <section class="panel page-head">
      <div class="page-kicker">Semana ISO</div>
      <h2 class="page-title">${key}</h2>
      <div class="page-subtitle">${esc(info.range)} · ${work.length} tarea${work.length===1?"":"s"} · ${milestones.length} hito${milestones.length===1?"":"s"}</div>
    </section>
    <section class="panel section">
      <div class="section-head"><div><h2>Hitos</h2><p>Fechas críticas dentro de la semana.</p></div></div>
      <div class="task-list">${milestones.length?milestones.map(taskCard).join(""):'<div class="empty">No hay hitos en esta semana.</div>'}</div>
    </section>
    <section class="panel section">
      <div class="section-head"><div><h2>Tareas activas</h2><p>Incluye tareas cuya fecha o intervalo toca esta semana.</p></div></div>
      <div class="task-list">${work.length?work.map(taskCard).join(""):'<div class="empty">No hay tareas activas en esta semana.</div>'}</div>
    </section>`;
}
function renderUndated(){
  const items=tasks.filter((task)=>!task.start&&!task.end);
  $("#view").innerHTML=`
    <div class="breadcrumb"><button type="button" data-home>Planificador</button><span>/</span><span>Sin fecha</span></div>
    <section class="panel page-head">
      <div class="page-kicker">Brecha de planificación</div>
      <h2 class="page-title">Tareas sin fecha</h2>
      <div class="page-subtitle">${items.length} tarea${items.length===1?"":"s"} todavía fuera del calendario semanal.</div>
    </section>
    <section class="panel section"><div class="task-list">${items.length?items.map(taskCard).join(""):'<div class="empty">Todas las tareas tienen fecha.</div>'}</div></section>`;
}
function renderTask(id){
  const task=tasks.find((item)=>item.id===Number(id));
  if(!task){renderNotFound("La tarea no está abierta o no existe.");return}
  const weeks=weeksForTask(task);
  const detailHtml=task.details.map((item)=>`<section class="detail-section"><h3>${esc(item.name)}</h3><p class="text-block">${esc(clean(item.text))}</p></section>`).join("");
  $("#view").innerHTML=`
    <div class="breadcrumb"><button type="button" data-home>Planificador</button><span>/</span><span>Tarea #${task.id}</span></div>
    <section class="panel page-head">
      <div class="page-kicker">${task.isMilestone?"Hito":"Tarea"} #${task.id}</div>
      <h2 class="page-title">${esc(task.title)}</h2>
      <div class="page-subtitle">${esc(projectName(task.project))} · Actualizada ${esc(new Intl.DateTimeFormat("es-CL",{timeZone:TIME_ZONE,dateStyle:"medium",timeStyle:"short"}).format(new Date(task.updatedAt)))}</div>
    </section>
    <section class="detail-layout">
      <article class="panel detail-main">
        ${badges(task)}
        <div class="detail-grid" style="margin-top:16px">
          <div class="detail-cell"><small>Fecha de inicio</small><strong>${esc(dateLabel(task.start))}</strong></div>
          <div class="detail-cell"><small>Fecha de término</small><strong>${esc(dateLabel(task.end))}</strong></div>
          <div class="detail-cell"><small>Estado</small><strong>${esc(task.status)}</strong></div>
          <div class="detail-cell"><small>Responsable</small><strong>${esc(task.responsible)}</strong></div>
          <div class="detail-cell wide"><small>Siguiente acción</small><span>${esc(task.next)}</span></div>
        </div>
        ${task.objective?`<section class="detail-section"><h3>Objetivo</h3><p class="text-block">${esc(task.objective)}</p></section>`:""}
        ${detailHtml}
      </article>
      <aside class="panel detail-side">
        <div class="side-stack">
          <div class="side-item"><small>Proyecto</small><strong>${esc(projectName(task.project))}</strong></div>
          <div class="side-item"><small>Tipo</small><strong>${esc(task.type)}</strong></div>
          <div class="side-item"><small>Prioridad / riesgo</small><strong>${esc(task.priority)} · ${esc(task.risk)}</strong></div>
          <div class="side-item"><small>Estimación</small><strong>${esc(task.estimate)}</strong></div>
          <div class="side-item"><small>Semanas ISO</small><strong>${weeks.length?weeks.join(", "):"Sin fecha"}</strong></div>
        </div>
      </aside>
    </section>`;
}
function renderNotFound(message){
  $("#view").innerHTML=`<section class="panel empty"><h2>Vista no disponible</h2><p>${esc(message)}</p><button class="back-button" type="button" data-home>Volver al Planificador</button></section>`;
}
function renderRoute(){
  if(!tasks.length)return;
  const parts=routeParts();
  if(!parts.length){renderMain();return}
  if(parts[0]==="week"&&parts[1]){renderWeek(parts[1]);return}
  if(parts[0]==="task"&&parts[1]){renderTask(parts[1]);return}
  if(parts[0]==="undated"){renderUndated();return}
  renderNotFound("La dirección interna no corresponde a una vista del dashboard.");
}