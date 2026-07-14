"use strict";
function showError(message){const banner=$("#error-banner");banner.textContent=message;banner.classList.add("show")}
function clearError(){$("#error-banner").classList.remove("show")}
async function refresh(){
  if(refreshing)return;
  refreshing=true;
  const button=$("#refresh");
  button.disabled=true;button.textContent="Actualizando…";clearError();
  try{
    const issues=await fetchOpenIssues();
    tasks=issues.map(normalizeIssue).sort((a,b)=>a.id-b.id);
    renderRoute();
    const now=new Date();
    $("#updated-at").textContent="Actualizado "+new Intl.DateTimeFormat("es-CL",{timeZone:TIME_ZONE,dateStyle:"medium",timeStyle:"short"}).format(now);
    $("#rate-limit").textContent=rateRemaining?`Consultas públicas restantes: ${rateRemaining}`:"";
  }catch(error){
    if(!tasks.length)$("#view").innerHTML='<div class="panel loading">No fue posible cargar tareas.</div>';
    showError(error.message+" No se mostró información antigua.");
  }finally{
    refreshing=false;button.disabled=false;button.textContent="Actualizar ahora";
  }
}

document.addEventListener("click",(event)=>{
  const task=event.target.closest("[data-task-id]");
  if(task){routeTo(`task/${task.dataset.taskId}`);return}
  const week=event.target.closest("[data-week]");
  if(week){routeTo(`week/${week.dataset.week}`);return}
  if(event.target.closest("[data-undated]")){routeTo("undated");return}
  if(event.target.closest("[data-home]")){routeTo("");return}
});
window.addEventListener("hashchange",renderRoute);
$("#refresh").addEventListener("click",refresh);
refresh();
setInterval(()=>{if(!document.hidden)refresh()},5*60*1000);
