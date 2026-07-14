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
const visibleWeekKeys=()=>{
  const monday=weekMonday(currentWeek());
  return Array.from({length:5},(_,index)=>isoWeekKey(isoDate(addDays(monday,index*7))));
};
function loadTone(count,maxLoad,totalLoad){
  if(count===0)return "load-empty";
  if(count<=2)return "load-green";
  const share=totalLoad?count/totalLoad:0;
  if(count===maxLoad&&(count>=5||share>=0.45))return "load-red";
  return "load-orange";
}
function milestoneBody(items){
  if(!items.length)return '<div class="week-empty-body" aria-hidden="true"></div>';
  const preview=items.slice(0,3).map((task)=>`<span><i></i>${esc(task.title)}</span>`).join("");
  const remainder=items.length>3?`<span class="week-more">+${items.length-3} más</span>`:"";
  return `<div class="milestone-count"><strong>${items.length}</strong> hito${items.length===1?"":"s"}</div>
    <div class="milestone-preview">${preview}${remainder}</div>`;
}
function loadBody(count){
  if(!count)return '<div class="week-empty-body" aria-hidden="true"></div>';
  return `<div class="load-count"><strong>${count}</strong><span>tarea${count===1?"":"s"}</span></div>`;
}
function renderMain(){
  const weeks=visibleWeekKeys();
  const counts=weeks.map((key)=>workTasksInWeek(key).length);
  const maxLoad=Math.max(1,...counts);
  const totalLoad=counts.reduce((sum,count)=>sum+count,0);
  const weeksWithLoad=counts.filter((count)=>count>0).length;
  const undated=tasks.filter((task)=>!task.start&&!task.end);
  const milestoneCount=tasks.filter((task)=>task.isMilestone).length;
  $("#view").innerHTML=`
    <section class="panel section compact-week-section">
      <div class="section-head"><h2>Hitos por semana</h2></div>
      <div class="week-scroll">
        <div class="week-grid milestone-week-grid">${weeks.map((key)=>{
          const info=weekInfo(key),items=milestonesInWeek(key);
          return `<button class="milestone-week ${items.length?"":"week-empty"} ${key===currentWeek()?"current":""}" type="button" data-week="${key}">
            <div class="week-head"><strong class="week-title">${weekTitle(key)}</strong><span class="week-range">${esc(info.range)}</span></div>
            ${milestoneBody(items)}
          </button>`;
        }).join("")}</div>
      </div>
    </section>

    <section class="panel section compact-week-section">
      <div class="section-head"><h2>Carga de tareas por semana</h2></div>
      <div class="week-scroll">
        <div class="load-grid">${weeks.map((key)=>{
          const info=weekInfo(key),count=workTasksInWeek(key).length,tone=loadTone(count,maxLoad,totalLoad);
          return `<button class="load-week ${tone} ${key===currentWeek()?"current":""}" type="button" data-week="${key}">
            <div class="week-head"><strong class="week-title">${weekTitle(key)}</strong><span class="week-range">${esc(info.range)}</span></div>
            ${loadBody(count)}
          </button>`;
        }).join("")}</div>
      </div>
    </section>

    <section class="summary-grid">
      <article class="panel summary"><small>Tareas abiertas</small><strong>${tasks.length}</strong></article>
      <article class="panel summary"><small>Hitos</small><strong>${milestoneCount}</strong></article>
      <article class="panel summary"><small>Semanas con carga</small><strong>${weeksWithLoad}</strong></article>
      <article class="panel summary"><small>Sin fecha</small><strong>${undated.length}</strong></article>
    </section>

    <section class="panel section compact-undated-section">
      <button class="undated" type="button" data-undated>
        <div><strong>${undated.length}</strong><div>Tareas sin fecha</div></div>
        <span>Revisar →</span>
      </button>
    </section>`;
}
