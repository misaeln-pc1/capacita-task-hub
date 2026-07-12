#!/usr/bin/env node
import { writeFile, rename, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildSnapshot } from "./snapshot-lib.mjs";
const here=dirname(fileURLToPath(import.meta.url));
const token=process.env.GITHUB_TOKEN;
if(!token){console.error("ERROR: falta GITHUB_TOKEN; snapshot no modificado y despliegue bloqueado.");process.exit(1)}
async function fetchOpenIssues(){
  const items=[];
  for(let page=1;;page+=1){
    const response=await fetch("https://api.github.com/repos/misaeln-pc1/capacita-task-hub/issues?state=open&per_page=100&page="+page,{headers:{
      Accept:"application/vnd.github+json",Authorization:"Bearer "+token,
      "X-GitHub-Api-Version":"2022-11-28","User-Agent":"capacita-task-hub-dashboard-snapshot",
    }});
    if(!response.ok)throw new Error("GitHub respondió "+response.status+" "+response.statusText);
    const pageItems=await response.json();items.push(...pageItems);if(pageItems.length<100)return items;
  }
}
const jsonTmp=join(here,".snapshot.json.tmp"),jsTmp=join(here,".snapshot.js.tmp");
try{
  const snapshot=buildSnapshot(await fetchOpenIssues());
  await writeFile(jsonTmp,JSON.stringify(snapshot,null,2)+"\n",{mode:0o600});
  await writeFile(jsTmp,"window.__ATLAS_SNAPSHOT__ = "+JSON.stringify(snapshot)+";\n",{mode:0o600});
  await rename(jsonTmp,join(here,"snapshot.json"));await rename(jsTmp,join(here,"snapshot.js"));
  console.log("Snapshot vigente: "+snapshot.tasks.length+" tareas abiertas · "+snapshot.generated_at+" "+snapshot.timezone);
}catch(error){
  await Promise.allSettled([rm(jsonTmp,{force:true}),rm(jsTmp,{force:true})]);
  console.error("ERROR: no se actualizó el snapshot: "+error.message);process.exit(1);
}
