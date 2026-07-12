const MONTHS = { enero:1, febrero:2, marzo:3, abril:4, mayo:5, junio:6, julio:7, agosto:8, septiembre:9, octubre:10, noviembre:11, diciembre:12 };
export const TIME_ZONE = "America/Santiago";
export const OPEN_OPERATIONAL_STATES = ["Inbox","Hoy","Próxima","En curso","Bloqueada"];

export function zonedParts(date = new Date(), timeZone = TIME_ZONE) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone, year:"numeric", month:"2-digit", day:"2-digit",
    hour:"2-digit", minute:"2-digit", second:"2-digit", hourCycle:"h23",
  }).formatToParts(date);
  return Object.fromEntries(parts.filter((p) => p.type !== "literal").map((p) => [p.type, p.value]));
}
export function zonedIso(date = new Date(), timeZone = TIME_ZONE) {
  const p = zonedParts(date, timeZone);
  return p.year+"-"+p.month+"-"+p.day+"T"+p.hour+":"+p.minute+":"+p.second;
}
export function zonedDay(date = new Date(), timeZone = TIME_ZONE) {
  const p = zonedParts(date, timeZone);
  return p.year+"-"+p.month+"-"+p.day;
}
function section(body, heading) {
  const pattern = new RegExp("##\\s+"+heading+"\\s*\\n([\\s\\S]*?)(?=\\n##\\s|$)", "i");
  return body.match(pattern)?.[1]?.trim() ?? "";
}
function firstMatch(text, patterns) {
  for (const pattern of patterns) {
    const value = text.match(pattern)?.[1]?.trim();
    if (value) return value;
  }
  return null;
}
export function parseDue(body = "") {
  const focused = [section(body,"Fecha objetivo"),section(body,"Fecha límite"),section(body,"Fecha"),section(body,"Fechas")].filter(Boolean).join("\n") || body;
  const iso = focused.match(/\b(20\d{2})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/);
  if (iso) return iso[1]+"-"+iso[2]+"-"+iso[3]+(iso[4] ? "T"+iso[4]+":"+iso[5]+":00-04:00" : "T12:00:00-04:00");
  const slash = focused.match(/\b(\d{1,2})[/-](\d{1,2})[/-](20\d{2})(?:[^\d]+(\d{1,2}):(\d{2}))?/);
  if (slash) return slash[3]+"-"+String(slash[2]).padStart(2,"0")+"-"+String(slash[1]).padStart(2,"0")+(slash[4] ? "T"+String(slash[4]).padStart(2,"0")+":"+slash[5]+":00-04:00" : "T12:00:00-04:00");
  const words = focused.toLowerCase().match(/\b(\d{1,2})\s+de\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+de\s+(20\d{2})/);
  if (words) return words[3]+"-"+String(MONTHS[words[2]]).padStart(2,"0")+"-"+String(words[1]).padStart(2,"0")+"T12:00:00-04:00";
  return null;
}
export function projectId(issue) {
  const text = (issue.title+"\n"+(issue.body ?? "")).toLowerCase();
  const declared = (section(issue.body ?? "","Proyecto operativo") || firstMatch(issue.body ?? "", [
    /\*\*Proyecto operativo:\*\*\s*([^\n]+)/i,
    /\*\*Proyecto:\*\*\s*([^\n]+)/i,
    /Proyecto operativo\s*:\s*([^\n]+)/i,
    /Proyecto\s*:\s*([^\n]+)/i,
  ]) || "").toLowerCase();
  if (/nch\s*2728|gestión de calidad/.test(declared)) return "quality";
  if (/licitación|otic|sofofa/.test(declared)) return "otic";
  if (/moodle/.test(declared)) return "moodle";
  if (/whatsapp|zoho/.test(declared)) return "whatsapp";
  if (/edge|gtm|landing/.test(declared)) return "edge";
  if (/global|comercial/.test(declared)) return "global";
  if (/operación de cursos|curso/.test(declared)) return "courses";
  if (/task hub/.test(declared)) return /dashboard|planificador/.test(issue.title.toLowerCase()) ? "atlas" : "admin";
  if (/nch\s*2728|gestión de calidad/.test(text)) return "quality";
  if (/sofofa|licitaciones?-otic|licitación otic/.test(text)) return "otic";
  if (/moodle/.test(text)) return "moodle";
  if (/whatsapp|zoho/.test(text)) return "whatsapp";
  if (/edge|gtm|landing/.test(text)) return "edge";
  if (/\[global\]|proyecto operativo:\s*global|ritual diario de priorización comercial/.test(text)) return "global";
  if (/curso excel|operación de cursos|inicio del curso/.test(text)) return "courses";
  if (/dashboard|task hub|planificador atlas/.test(text)) return "atlas";
  return "admin";
}
export function normalizeIssue(issue) {
  const body = issue.body ?? "";
  const priority = firstMatch(body,[/\*\*Prioridad[^*]*:\*\*\s*(P[123])/i,/Prioridad\s*:\s*(P[123])/i]) ?? "P2";
  const riskRaw = firstMatch(body,[/\*\*Riesgo[^*]*:\*\*\s*(Rojo|Amarillo|Verde)/i,/Riesgo\s*:\s*(Rojo|Amarillo|Verde)/i,/Semáforo[\s\S]{0,80}\b(Rojo|Amarillo|Verde)\b/i]) ?? "Amarillo";
  const risk = riskRaw.charAt(0).toUpperCase()+riskRaw.slice(1).toLowerCase();
  const statusRaw = firstMatch(body,[/\*\*Estado[^*]*:\*\*\s*([^\n—-]+)/i,/Estado\s*:\s*([^\n—-]+)/i]) ?? "Inbox";
  const statusKey=statusRaw.replace(/[.*_]/g,"").trim().toLowerCase();
  const statusMap=new Map(OPEN_OPERATIONAL_STATES.map((value)=>[value.toLowerCase(),value]));
  const status=statusMap.get(statusKey) ?? statusRaw.trim();
  const next = section(body,"Siguiente acción") || section(body,"Acción siguiente") || section(body,"Siguiente paso") || "Revisar la issue y definir la siguiente acción.";
  const due = parseDue(body);
  return {
    id:issue.number, p:projectId(issue), title:issue.title.replace(/^(?:\[[^\]]+\]\s*)+/,"").trim(),
    priority, risk, status, operational_state_valid:OPEN_OPERATIONAL_STATES.includes(status), due,
    label:due ? new Intl.DateTimeFormat("es-CL",{timeZone:TIME_ZONE,day:"2-digit",month:"short",year:"numeric"}).format(new Date(due)) : "Sin fecha",
    next:next.replace(/\s+/g," ").trim(), url:issue.html_url,
  };
}
export function buildSnapshot(issues,{now=new Date(),source="github-api"}={}) {
  const openIssues = issues.filter((issue) => issue.state === "open" && !issue.pull_request);
  return {
    schema_version:1,status:"current",source,repository:"misaeln-pc1/capacita-task-hub",
    timezone:TIME_ZONE,generated_at:zonedIso(now),today:zonedDay(now),
    tasks:openIssues.map(normalizeIssue).sort((a,b)=>a.id-b.id),
  };
}
