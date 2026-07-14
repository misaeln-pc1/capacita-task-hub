"use strict";
const projectName=(id)=>PROJECTS.find((project)=>project.id===id)?.name??"Otro";
const riskClass=(risk)=>risk==="Rojo"?"red":risk==="Amarillo"?"amber":"green";
const dateUTC=(iso)=>new Date(iso+"T12:00:00Z");
const addDays=(date,days)=>new Date(date.getTime()+days*86400000);
const isoDate=(date)=>date.toISOString().slice(0,10);
const mondayOf=(iso)=>{
  const date=dateUTC(iso);
  const day=date.getUTCDay()||7;
  return isoDate(addDays(date,1-day));
};
const isoWeekKey=(iso)=>{
  const date=dateUTC(iso);
  const day=date.getUTCDay()||7;
  const thursday=addDays(date,4-day);
  const isoYear=thursday.getUTCFullYear();
  const yearStart=new Date(Date.UTC(isoYear,0,1,12));
  const week=Math.ceil((((thursday-yearStart)/86400000)+1)/7);
  return `${isoYear}-W${String(week).padStart(2,"0")}`;
};
const weekMonday=(key)=>{
  const match=key.match(/^(\d{4})-W(\d{2})$/);
  if(!match)return null;
  const year=Number(match[1]),week=Number(match[2]);
  const jan4=new Date(Date.UTC(year,0,4,12));
  const day=jan4.getUTCDay()||7;
  return addDays(jan4,1-day+(week-1)*7);
};
const weekInfo=(key)=>{
  const monday=weekMonday(key);
  if(!monday)return null;
  const sunday=addDays(monday,6);
  const range=new Intl.DateTimeFormat("es-CL",{timeZone:"UTC",day:"2-digit",month:"short"}).format(monday)+" – "+
    new Intl.DateTimeFormat("es-CL",{timeZone:"UTC",day:"2-digit",month:"short",year:"numeric"}).format(sunday);
  return {key,monday:isoDate(monday),sunday:isoDate(sunday),range};
};
const todayLocal=()=>{
  const parts=Object.fromEntries(new Intl.DateTimeFormat("en-CA",{timeZone:TIME_ZONE,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date()).filter((part)=>part.type!=="literal").map((part)=>[part.type,part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
};
const currentWeek=(today=todayLocal())=>isoWeekKey(today);
const scheduledWeeksForTask=(task)=>{
  if(!task.start||!task.end)return [];
  let cursor=weekMonday(isoWeekKey(task.start));
  const last=weekMonday(isoWeekKey(task.end));
  const keys=[];
  while(cursor<=last&&keys.length<104){
    keys.push(isoWeekKey(isoDate(cursor)));
    cursor=addDays(cursor,7);
  }
  return keys;
};
const isOverdue=(task,today=todayLocal())=>Boolean(task.end&&task.end<today);
const weeksForTask=(task,today=todayLocal())=>{
  const keys=scheduledWeeksForTask(task);
  if(isOverdue(task,today)){
    const carryWeek=currentWeek(today);
    if(!keys.includes(carryWeek))keys.push(carryWeek);
  }
  return keys.sort();
};
const dateLabel=(iso)=>iso?new Intl.DateTimeFormat("es-CL",{timeZone:"UTC",day:"2-digit",month:"short",year:"numeric"}).format(dateUTC(iso)):"Sin fecha";
const periodLabel=(task)=>{
  if(!task.start&&!task.end)return "Sin fecha";
  if(task.start===task.end)return dateLabel(task.start);
  return `${dateLabel(task.start)} → ${dateLabel(task.end)}`;
};
const routeTo=(path)=>{
  const target="#/"+path.replace(/^\/+/,"");
  if(location.hash===target)renderRoute();
  else location.hash=target;
};
const routeParts=()=>location.hash.replace(/^#\/?/,"").split("/").filter(Boolean);
