"use strict";
async function fetchOpenIssues(){
  const all=[];
  for(let page=1;;page+=1){
    const response=await fetch(`${API_BASE}?state=open&per_page=100&page=${page}&_=${Date.now()}`,{
      cache:"no-store",headers:{Accept:"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28"}
    });
    rateRemaining=response.headers.get("x-ratelimit-remaining");
    if(!response.ok){
      let detail="";
      try{detail=(await response.json()).message??""}catch{}
      if(response.status===403)throw new Error("GitHub bloqueó temporalmente la consulta pública por límite de solicitudes.");
      throw new Error(`GitHub respondió ${response.status}. ${detail}`);
    }
    const items=await response.json();
    all.push(...items.filter((item)=>!item.pull_request));
    if(items.length<100)return all;
  }
}
const allWeekKeys=()=>{
  const dated=tasks.filter((task)=>task.start&&task.end);
  const keys=dated.flatMap(weeksForTask);
  const current=currentWeek();
  keys.push(current);
  if(!keys.length)return [current];
  let start=weekMonday([...keys].sort()[0]);
  let end=weekMonday([...keys].sort().at(-1));
  const minimumEnd=addDays(weekMonday(current),35);
  if(end<minimumEnd)end=minimumEnd;
  const result=[];
  while(start<=end&&result.length<60){
    result.push(isoWeekKey(isoDate(start)));
    start=addDays(start,7);
  }
  return result;
};
const tasksInWeek=(key)=>tasks.filter((task)=>weeksForTask(task).includes(key));
const workTasksInWeek=(key)=>tasksInWeek(key).filter((task)=>!task.isMilestone);
const milestonesInWeek=(key)=>tasksInWeek(key).filter((task)=>task.isMilestone);