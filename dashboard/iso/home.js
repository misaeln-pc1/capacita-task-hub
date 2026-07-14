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
const weekNumber=(key)=>Number(key.slice(-2));
const weekTitle=(key)=>`Week ${weekNumber(key)}`;
function loadTone(count,maxLoad,totalLoad){
  if(count<=2)return "load-green";
  const share=totalLoad?count/totalLoad:0;
  if(count===maxLoad&&(count>=5||share>=0.45))return "load-red";
  return "load-orange";
}
function renderMain(){
  const weeks=allWeekKeys();
  const milestoneWeeks=weeks.filter((key)=>milestonesInWeek(key).length>0);
  const loadWeeks=weeks.filter((key)=>workTasksInWeek(key).length>0);
  const counts=loadWeeks.map((key)=>workTasksInWeek(key).length);
  const maxLoad=Math.max(1,...counts);
  const totalLoad=counts.reduce((sum,count)=>sum+count,0);
  const undated=tasks.filter((task)=>!task.start&&!task.end);
  const milestoneCount=tasks.filter((task)=>task.isMilestone).length;
  $("#view").innerHTML=`
    <section class="panel section">
      <div class="section-head">
        <div><h2>Hitos por semana</h2><p>Cronología de entregas y fechas críticas. Pulsa una semana para abrir todas sus tareas y ver el hito marcado.</p></div>
        <div class="legend">Semana actual: <strong>${currentWeek()}</strong></div>
      </div>
      <div class="week-scroll">
        ${milestoneWeeks.length?`<div class="week-grid milestone-week-grid">${milestoneWeeks.map((key)=>{
          const info=weekInfo(key),items=milestonesInWeek(key);
          return `<button class="milestone-week ${key===currentWeek()?"current":""}" type="button" data-week="${key}">
            <div class="week-head"><span><strong class="week-title">${weekTitle(key)}</strong><small class="week-code">${key}</small></span><span class="week-range">${esc(info.range)}</span></div>
            <div class="milestone-count"><strong>${items.length}</strong> hito${items.length===1?"":"s"}</div>
            <div class="milestone-preview">${items.map((task)=>`<span><i></i>${esc(task.title)}</span>`).join("")}</div>
            <div class="week-open">Abrir semana →</div>
          </button>`;
        }).join("")}</div>`:'<div class="empty">No hay hitos con fecha.</div>'}
      </div>
    </section>

    <section class="panel section">
      <div class="section-head">
        <div><h2>Carga de tareas por semana</h2><p>Solo se muestran semanas con trabajo. Verde: 1–2 tareas; naranja: carga media; rojo: concentración alta.</p></div>
        <div class="legend"><span class="legend-chip green">1–2</span><span class="legend-chip orange">Media</span><span class="legend-chip red">Alta</span></div>
      </div>
      <div class="week-scroll">
        ${loadWeeks.length?`<div class="load-grid">${loadWeeks.map((key)=>{
          const info=weekInfo(key),count=workTasksInWeek(key).length,hitos=milestonesInWeek(key).length,tone=loadTone(count,maxLoad,totalLoad);
          return `<button class="load-week ${tone} ${key===currentWeek()?"current":""}" type="button" data-week="${key}">
            <div class="week-head"><span><strong class="week-title">${weekTitle(key)}</strong><small class="week-code">${key}</small></span><span class="load-level">${tone==="load-red"?"Alta":tone==="load-orange"?"Media":"Baja"}</span></div>
            <div><strong>${count}</strong> tarea${count===1?"":"s"}</div>
            <div class="load-sub"><span>${esc(info.range)}</span><span>${hitos} hito${hitos===1?"":"s"}</span></div>
          </button>`;
        }).join("")}</div>`:'<div class="empty">No hay tareas fechadas.</div>'}
      </div>
    </section>

    <section class="summary-grid">
      <article class="panel summary"><small>Tareas abiertas</small><strong>${tasks.length}</strong></article>
      <article class="panel summary"><small>Hitos</small><strong>${milestoneCount}</strong></article>
      <article class="panel summary"><small>Semanas con carga</small><strong>${loadWeeks.length}</strong></article>
      <article class="panel summary"><small>Sin fecha</small><strong>${undated.length}</strong></article>
    </section>

    <section class="panel section">
      <button class="undated" type="button" data-undated>
        <div><strong>${undated.length}</strong><div>Tareas sin fecha</div><small style="color:var(--muted)">Se mantienen fuera de la carga semanal hasta ser planificadas.</small></div>
        <span>Revisar →</span>
      </button>
    </section>`;
}
