"use strict";

const WRITE_TOKEN_STORAGE_KEY="atlas.github.issue.write.token.v1";
const CLOSE_ISSUE_PAYLOAD=Object.freeze({state:"closed",state_reason:"completed"});
let closingIssueId=null;

function showError(message){const banner=$("#error-banner");banner.textContent=message;banner.classList.add("show")}
function clearError(){$("#error-banner").classList.remove("show")}

function getStoredWriteToken(){
  try{return localStorage.getItem(WRITE_TOKEN_STORAGE_KEY)?.trim()??""}
  catch{return ""}
}

function closeTaskControls(task){
  if(!getStoredWriteToken()){
    return `<section class="close-panel" aria-label="Configurar cierre personal">
      <h3>Cierre personal</h3>
      <p>Configura una vez el token de este dispositivo. Se guarda únicamente en este navegador.</p>
      <label class="token-field" for="github-write-token">
        <span>Token GitHub</span>
        <input id="github-write-token" type="password" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Pega aquí el token fine-grained">
      </label>
      <button class="token-save-button" type="button" data-save-close-token>Guardar acceso en este dispositivo</button>
    </section>`;
  }
  return `<section class="close-panel" aria-label="Cerrar tarea">
    <h3>Cierre personal</h3>
    <p>Cierra únicamente la issue #${task.id} que estás viendo. GitHub registrará la fecha y hora reales del cierre.</p>
    <div class="close-actions">
      <button class="close-task-button" type="button" data-close-task="${task.id}">Cerrar como completada</button>
      <button class="token-remove-button" type="button" data-remove-close-token>Eliminar acceso de este dispositivo</button>
    </div>
  </section>`;
}

function saveWriteTokenFromForm(){
  const input=$("#github-write-token");
  const token=input?.value.trim()??"";
  if(!token){
    showError("Pega un token GitHub válido antes de guardar el acceso.");
    input?.focus();
    return;
  }
  try{localStorage.setItem(WRITE_TOKEN_STORAGE_KEY,token)}
  catch{
    showError("Este navegador no permitió guardar el acceso local.");
    return;
  }
  clearError();
  renderRoute();
}

function removeStoredWriteToken(){
  if(!confirm("¿Eliminar el acceso de cierre guardado en este dispositivo?"))return;
  try{localStorage.removeItem(WRITE_TOKEN_STORAGE_KEY)}
  catch{
    showError("Este navegador no permitió eliminar el acceso local.");
    return;
  }
  clearError();
  renderRoute();
}

async function closeVisibleIssue(issueId){
  const id=Number(issueId);
  const route=routeParts();
  const task=tasks.find((item)=>item.id===id);
  if(!Number.isInteger(id)||id<=0||!task||route[0]!=="task"||Number(route[1])!==id){
    showError("El cierre fue bloqueado porque la issue ya no coincide con la ficha abierta.");
    return;
  }
  const token=getStoredWriteToken();
  if(!token){
    showError("Configura el acceso de cierre en este dispositivo.");
    renderRoute();
    return;
  }
  if(!confirm(`¿Cerrar la tarea #${id} como completada?`))return;
  if(closingIssueId!==null)return;

  closingIssueId=id;
  const button=document.querySelector(`[data-close-task="${id}"]`);
  if(button){button.disabled=true;button.textContent="Cerrando…"}
  clearError();

  try{
    const response=await fetch(`${API_BASE}/${id}`,{
      method:"PATCH",
      cache:"no-store",
      headers:{
        Accept:"application/vnd.github+json",
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json",
        "X-GitHub-Api-Version":"2022-11-28"
      },
      body:JSON.stringify(CLOSE_ISSUE_PAYLOAD)
    });
    let result={};
    try{result=await response.json()}catch{}
    if(!response.ok){
      const detail=result.message?` ${result.message}`:"";
      throw new Error(`GitHub no pudo cerrar la issue (${response.status}).${detail}`);
    }
    if(Number(result.number)!==id||result.state!=="closed"){
      throw new Error("GitHub respondió sin confirmar el cierre de la issue seleccionada.");
    }
    routeTo("");
    await refresh();
  }catch(error){
    showError(error.message);
    if(button){button.disabled=false;button.textContent="Cerrar como completada"}
  }finally{
    closingIssueId=null;
  }
}

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
  const closeTask=event.target.closest("[data-close-task]");
  if(closeTask){closeVisibleIssue(closeTask.dataset.closeTask);return}
  if(event.target.closest("[data-save-close-token]")){saveWriteTokenFromForm();return}
  if(event.target.closest("[data-remove-close-token]")){removeStoredWriteToken();return}
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
