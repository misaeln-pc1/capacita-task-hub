"use strict";
function renderWeek(key){
  const info=weekInfo(key);
  if(!info){renderNotFound("Semana no válida.");return}
  const ordered=[...tasksInWeek(key)].sort((a,b)=>{
    const overdueOrder=Number(isOverdue(b))-Number(isOverdue(a));
    if(overdueOrder)return overdueOrder;
    const aDate=a.start||a.end||"9999-12-31";
    const bDate=b.start||b.end||"9999-12-31";
    return aDate.localeCompare(bDate)||Number(b.isMilestone)-Number(a.isMilestone)||a.id-b.id;
  });
  const milestoneCount=ordered.filter((task)=>task.isMilestone).length;
  $("#view").innerHTML=`
    <div class="breadcrumb"><button type="button" data-home>Planificador</button><span>/</span><span>${weekTitle(key)}</span></div>
    <section class="panel page-head">
      <div class="page-kicker">Semana ISO · ${key}</div>
      <h2 class="page-title">${weekTitle(key)}</h2>
      <div class="page-subtitle">${esc(info.range)} · ${ordered.length} elemento${ordered.length===1?"":"s"} · ${milestoneCount} hito${milestoneCount===1?"":"s"}</div>
    </section>
    <section class="panel section">
      <div class="section-head"><div><h2>Tareas e hitos de la semana</h2><p>Secuencia cronológica única. Los hitos aparecen identificados dentro del mismo listado.</p></div></div>
      <div class="task-list">${ordered.length?ordered.map(taskCard).join(""):'<div class="empty">No hay tareas ni hitos en esta semana.</div>'}</div>
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
    <div class="breadcrumb"><button type="button" data-home>Planificador</button><span>/</span><span>${task.isMilestone?"Hito":"Tarea"} #${task.id}</span></div>
    <section class="panel page-head">
      <div class="page-kicker">${task.isMilestone?"Hito":"Tarea"} #${task.id}</div>
      <h2 class="page-title">${esc(task.title)}</h2>
      <div class="page-subtitle">${esc(projectName(task.project))} · Actualizada ${esc(new Intl.DateTimeFormat("es-CL",{timeZone:TIME_ZONE,dateStyle:"medium",timeStyle:"short"}).format(new Date(task.updatedAt)))}</div>
    </section>
    <section class="detail-layout">
      <article class="panel detail-main ${isOverdue(task)?"detail-overdue":""}">
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
          ${isOverdue(task)?'<div class="side-item overdue-note"><small>Situación</small><strong>Vencida y arrastrada a la Week actual</strong></div>':""}
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
