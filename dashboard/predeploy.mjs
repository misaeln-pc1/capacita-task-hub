#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const here=dirname(fileURLToPath(import.meta.url));
for(const script of ["generate-snapshot.mjs","validate-snapshot.mjs"]){
  const result=spawnSync(process.execPath,[join(here,script)],{stdio:"inherit",env:process.env});
  if(result.status!==0)process.exit(result.status??1);
}
