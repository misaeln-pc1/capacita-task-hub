"use strict";

const API_BASE="https://api.github.com/repos/misaeln-pc1/capacita-task-hub/issues";
const TIME_ZONE="America/Santiago";
const MONTHS={enero:1,febrero:2,marzo:3,abril:4,mayo:5,junio:6,julio:7,agosto:8,septiembre:9,octubre:10,noviembre:11,diciembre:12};
const OPEN_STATES=["Inbox","Hoy","Próxima","En curso","Bloqueada"];
const PROJECTS=[
  {id:"quality",name:"Gestión de Calidad NCh 2728"},
  {id:"courses",name:"Operación de cursos"},
  {id:"otic",name:"Licitaciones / OTIC"},
  {id:"admin",name:"Administración"},
  {id:"global",name:"Global y foco comercial"},
  {id:"moodle",name:"Moodle"},
  {id:"edge",name:"Edge / GTM"},
  {id:"whatsapp",name:"WhatsApp / Zoho"},
  {id:"atlas",name:"Task Hub / Dashboard"}
];

let tasks=[];
let rateRemaining=null;
let refreshing=false;

const $=(selector)=>document.querySelector(selector);
const esc=(value)=>String(value??"").replace(/[&<>"']/g,(c)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const clean=(value)=>String(value??"").replace(/[`*_>#]/g,"").replace(/\s+/g," ").trim();
const section=(body,heading)=>{
  const escaped=heading.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  return body.match(new RegExp("##\\s+"+escaped+"\\s*\\n([\\s\\S]*?)(?=\\n##\\s|$)","i"))?.[1]?.trim()??"";
};
const firstMatch=(text,patterns)=>{
  for(const pattern of patterns){
    const value=text.match(pattern)?.[1]?.trim();
    if(value)return clean(value);
  }
  return null;
};
const field=(body,labels)=>{
  for(const label of labels){
    const escaped=label.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    const patterns=[
      new RegExp("(?:^|\\n)\\s*[-*]?\\s*(?:\\*\\*)?"+escaped+"\\s*:(?:\\*\\*)?\\s*([^\\n]+)","i"),
      new RegExp("(?:^|\\n)\\s*"+escaped+"\\s*\\n+([^\\n]+)","i")
    ];
    const result=firstMatch(body,patterns);
    if(result)return result;
  }
  return null;
};
const parseDate=(value)=>{
  if(!value||/^hoy$/i.test(clean(value)))return null;
  const text=clean(value).toLowerCase();
  let match=text.match(/\b(20\d{2})-(\d{1,2})-(\d{1,2})\b/);
  if(match)return `${match[1]}-${String(match[2]).padStart(2,"0")}-${String(match[3]).padStart(2,"0")}`;
  match=text.match(/\b(\d{1,2})[\/-](\d{1,2})[\/-](20\d{2})\b/);
  if(match)return `${match[3]}-${String(match[2]).padStart(2,"0")}-${String(match[1]).padStart(2,"0")}`;
  match=text.match(/\b(\d{1,2})\s+(?:de\s+)?(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+(?:de\s+)?(20\d{2})\b/);
  if(match)return `${match[3]}-${String(MONTHS[match[2]]).padStart(2,"0")}-${String(match[1]).padStart(2,"0")}`;
  return null;
};
const dateFromBody=(body,labels,sectionNames=[])=>{
  const direct=field(body,labels);
  const parsedDirect=parseDate(direct);
  if(parsedDirect)return parsedDirect;
  for(const name of sectionNames){
    const parsed=parseDate(section(body,name));
    if(parsed)return parsed;
  }
  return null;
};
const milestoneDateFromBody=(body)=>dateFromBody(
  body,
  ["Fecha de entrega","Fecha de auditoría","Fecha auditoría","Fecha de preauditoría","Fecha preauditoría","Fecha"],
  ["Fecha","Fecha límite","Fecha objetivo","Fechas"]
);
const projectId=(issue)=>{
  const body=issue.body??"";
  const text=(issue.title+"\n"+body).toLowerCase();
  const declared=(field(body,["Proyecto operativo","Proyecto"])??"").toLowerCase();
  if(/nch\s*2728|gestión de calidad/.test(declared))return "quality";
  if(/licitación|otic|sofofa|mercado público/.test(declared))return "otic";
  if(/moodle/.test(declared))return "moodle";
  if(/whatsapp|zoho/.test(declared))return "whatsapp";
  if(/edge|gtm|landing/.test(declared))return "edge";
  if(/global|comercial/.test(declared))return "global";
  if(/operación de cursos|curso/.test(declared))return "courses";
  if(/task hub|atlas/.test(declared))return /dashboard|planificador/.test(issue.title.toLowerCase())?"atlas":"admin";
  if(/nch\s*2728|gestión de calidad/.test(text))return "quality";
  if(/sofofa|licitaciones?|otic|mercado público/.test(text))return "otic";
  if(/moodle/.test(text))return "moodle";
  if(/whatsapp|zoho/.test(text))return "whatsapp";
  if(/edge|gtm|landing/.test(text))return "edge";
  if(/\[global\]|priorización comercial/.test(text))return "global";
  if(/curso excel|operación de cursos|inicio del curso/.test(text))return "courses";
  if(/dashboard|task hub|planificador atlas/.test(text))return "atlas";
  return "admin";
};
const normalizeIssue=(issue)=>{
  const body=issue.body??"";
  const type=field(body,["Tipo"])??(/hito/i.test(issue.title)?"Hito":"Tarea ejecutiva");
  const isMilestone=/\bhito\b/i.test(type+" "+issue.title);
  const priority=field(body,["Prioridad","Prioridad inicial"])?.match(/\bP[123]\b/i)?.[0]?.toUpperCase()??"P2";
  const riskRaw=field(body,["Riesgo","Semáforo"])?.match(/\b(Rojo|Amarillo|Verde)\b/i)?.[0]??"Amarillo";
  const risk=riskRaw.charAt(0).toUpperCase()+riskRaw.slice(1).toLowerCase();
  const statusRaw=field(body,["Estado"])??"Inbox";
  const status=OPEN_STATES.find((item)=>item.toLowerCase()===statusRaw.toLowerCase())??statusRaw;
  const responsible=field(body,["Responsable","Responsable inicial"])??"Misael";
  const estimate=field(body,["Tiempo estimado inicial","Estimación"])??"No registrada";
  const next=clean(section(body,"Siguiente acción")||section(body,"Acción siguiente")||section(body,"Siguiente paso")||field(body,["Siguiente acción"])||"Revisar la tarea y definir la siguiente acción.");
  const objective=clean(section(body,"Objetivo")||section(body,"Problema / contexto")||section(body,"Tarea ejecutable")||"");
  let start=dateFromBody(body,["Fecha inicio","Fecha de inicio"],["Fecha inicio","Fecha de inicio"]);
  let end=dateFromBody(body,["Fecha término","Fecha de término","Fecha fin","Fecha límite","Fecha objetivo"],["Fecha término","Fecha de término","Fecha límite","Fecha objetivo","Fechas"]);
  if(!end&&isMilestone)end=milestoneDateFromBody(body);
  if(!end)end=parseDate(issue.title);
  if(!start&&end)start=end;
  if(start&&!end)end=start;
  if(start&&end&&start>end)start=end;
  const detailSections=["Fechas","Fecha","Contexto","Alcance","Alcance mínimo","Detalle","Qué hacer","Evidencia esperada","Definition of Done"];
  const details=detailSections.map((name)=>({name,text:section(body,name)})).filter((item)=>item.text);
  return {
    id:issue.number,title:issue.title.replace(/^(?:\[[^\]]+\]\s*)+/,"").trim(),
    project:projectId(issue),type,isMilestone,priority,risk,status,responsible,estimate,next,objective,
    start,end,body,details,updatedAt:issue.updated_at
  };
};
