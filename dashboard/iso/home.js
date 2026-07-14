"use strict";
function badges(task){
  return `<div class="badges">
    <span class="badge">${esc(task.priority)}</span>
    <span class="badge ${riskClass(task.risk)}">${esc(task.risk)}</span>
    <span class="badge">${esc(task.status)}</span>
    ${task.isMilestone?'<span class="badge amber">Hito</span>':""}
  </div>`;
}
function taskCard(task){
  return `<button class="task-card" type="button" data-task-id="${task.id}">
    <div class="task-num">#${task.id}</div>
    <div>${badges(task)}<h3>${esc(task.title)}</h3><p>${esc(task.next)}</p></div>
    <div class="task-dates ${isOverdue(task)?"overdue":""}">${esc(periodLabel(task))}<br>${esc(projectName(task.project))}</div>
  </button>`;
}
function renderMain(){
  const weeks=allWeekKeys();
  const maxLoad=Math.max(1,...weeks.map((key)=>workTasksInWeek(key).length));
  const undated=tasks.filter((task)=>!task.start&&!task.end);
  const milestoneCount=tasks.filter((task)=>task.isMilestone).length;
  $("#view").innerHTML=`
    <section class="panel section">
      <div class="section-head">
        <div><h2>Hitos por semana ISO</h2><p>Fechas críticas y entregas oficiales. Cada marcador abre su ficha interna.</p></div>
        <div class="legend">Semana actual: <strong>${currentWeek()}</strong></div>
      </div>
      <div class="week-scroll">
        <div class="week-grid">${weeks.map((key)=>{
          const info=weekInfo(key),items=milestonesInWeek(key);
          return `<article class="week-column ${key===currentWeek()?"current":""}">
            <div class="week-head"><span class="week-code">${key}</span><span class="week-range">${esc(info.range)}</span></div>
            <div class="milestones">${items.length?items.map((task)=>`<button class="milestone" type="button" data-task-id="${task.id}">#${task.id} · ${esc(task.title)}</button>`).join(""):'<div class="no-items">Sin hitos</div>'}</div>
          </article>`;
        }).join("")}</div>
      </div>
    </section>

    <section class="panel section">
      <div class="section-head">
        <div><h2>Carga de tareas por semana</h2><p>La intensidad aumenta con la cantidad de tareas activas. Las tareas de varias semanas cuentan en cada semana que atraviesan.</p></div>
        <div class="legend"><span>Menor</span><span class="legend-scale"><i style="background:#263d50"></i><i style="background:#1b3448"></i><i style="background:#11263a"></i><i style="background:#0b1b2d"></i></span><span>Mayor</span></div>
      </div>
      <div class="week-scroll">
        <div class="load-grid">${weeks.map((key)=>{
          const info=weekInfo(key),count=workTasksInWeek(key).length,hitos=milestonesInWeek(key).length,ratio=count/maxLoad,lightness=(32-ratio*15).toFixed(1)+"%";
          return `<button class="load-week ${count===0?"low":""} ${key===currentWeek()?"current":""}" style="--ratio:${ratio.toFixed(3)};--lightness:${lightness}" type="button" data-week="${key}">
            <div><span class="week-code">${key}</span><div><strong>${count}</strong> tarea${count===1?"":"s"}</div></div>
            <div class="load-sub"><span>${esc(info.range)}</span><span>${hitos} hito${hitos===1?"":"s"}</span></div>
          </button>`;
        }).join("")}</div>
      </div>
    </section>

    <section class="summary-grid">
      <article class="panel summary"><small>Tareas abiertas</small><strong>${tasks.length}</strong></article>
      <article class="panel summary"><small>Hitos</small><strong>${milestoneCount}</strong></article>
      <article class="panel summary"><small>Semanas visibles</small><strong>${weeks.length}</strong></article>
      <article class="panel summary"><small>Sin fecha</small><strong>${undated.length}</strong></article>
    </section>

    <section class="panel section">
      <button class="undated" type="button" data-undated>
        <div><strong>${undated.length}</strong><div>Tareas sin fecha</div><small style="color:var(--muted)">Se mantienen fuera de la carga semanal hasta ser planificadas.</small></div>
        <span>Revisar →</span>
      </button>
    </section>`;
}