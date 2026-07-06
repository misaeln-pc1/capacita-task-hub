# CHANGELOG_AGENT

## 2026-07-04 — Ajuste arquitectura centralizada de issues

**Agente:** Atlas / ChatGPT.

**Rama:** `docs/task-hub-centralized-issue-types-v01`.

**Tipo de cambio:** documental, reversible, riesgo verde/amarillo operativo.

### Motivo

Se detectó que GitHub Projects tiene límite de workflows Auto-add por plan. Como Capacita tiene más repos activos que slots disponibles, se decide no usar un workflow por repo operativo.

### Decisiones documentadas

- Todos los issues de gestión se crean en `capacita-task-hub`.
- El **Planificador Atlas** usa un único workflow Auto-add desde `capacita-task-hub` con filtro `is:issue is:open`.
- Todos los issues abiertos entran al Project, no solo tareas ejecutivas.
- El campo `Tipo` separa tareas ejecutivas, ideas, decisiones, investigaciones, bloqueos e iniciativas.
- El dashboard diario filtra solo `Tipo = Tarea ejecutiva`.
- El repo operativo se declara como `Repo dueño`, pero no recibe issue por defecto.
- Se permite issue operativo espejo solo si Copilot/Codex/PR Factory o riesgo técnico lo exige.

### Archivos creados/modificados

- `PROTOCOLO_TAREAS_ATLAS.md` actualizado.
- `docs/CAMPOS_PLANIFICADOR_ATLAS.md` actualizado.
- `docs/CONFIGURACION_INICIAL_PLANIFICADOR_ATLAS.md` actualizado.
- `docs/FLUJO_TAREAS_REPOS_OPERATIVOS.md` actualizado.
- `DECISIONES.md` actualizado.
- `TASK_STATUS.md` actualizado.
- `docs/WORKFLOW_AUTO_ADD_TASK_HUB.md` creado.
- `CHANGELOG_AGENT.md` actualizado.

### No se tocó

- No se trabajó directo en `main`.
- No se creó ni ejecutó GitHub Actions.
- No se ejecutaron scripts.
- No se instalaron dependencias.
- No se tocaron producción, SENCE, Moodle, Zoho, Cloudflare, n8n ni WhatsApp.
- No se usaron credenciales, secretos ni datos personales.

### Pendientes

- Revisar y mergear PR documental.
- Confirmar Auto-add único en Planificador Atlas.
- Configurar/ajustar campos `Tipo`, `Repo dueño` y vistas.
- Probar con un issue ejecutivo y un issue idea.

---

## 2026-07-04 — Bootstrap documental Sistema de Tareas Atlas

**Agente:** Atlas / ChatGPT.

**Rama:** `docs/task-hub-bootstrap-v01`.

**Tipo de cambio:** documental, reversible, riesgo verde.

### Archivos creados/modificados

- `README.md` actualizado.
- `PROJECT_CONTEXT.md` creado.
- `PROTOCOLO_TAREAS_ATLAS.md` creado.
- `docs/CAPAS_PLANIFICADOR_ATLAS.md` creado.
- `docs/CAMPOS_PLANIFICADOR_ATLAS.md` creado.
- `docs/FLUJO_TAREAS_REPOS_OPERATIVOS.md` creado.
- `docs/CRITERIOS_TIEMPO_AUTOMATIZACION.md` creado.
- `TASK_STATUS.md` creado.
- `DECISIONES.md` creado.
- `RIESGOS.md` creado.
- `REPO_MAP.md` creado.
- `SKILLS_USED.md` creado.
- `AGENTS.md` creado.
- `PROMPTS_BASE.md` creado.
- `REVIEW_REQUEST.md` creado.
- `CHANGELOG_AGENT.md` creado.

### Decisiones documentadas inicialmente

- Repo oficial: `capacita-task-hub`.
- GitHub Project oficial: **Planificador Atlas**.
- Sistema completo: **Sistema de Tareas Atlas**.
- Regla inicial: la tarea vive donde se ejecuta.
- Las tareas personales no requieren rama/PR.
- Las tareas derivadas de decisiones validadas solo referencian el PR/documento origen.
- El Planificador Atlas tendrá tres capas: visibilidad, tiempo y automatización.

### Nota posterior

La regla inicial “la tarea vive donde se ejecuta” fue superada por la arquitectura centralizada de issues en `capacita-task-hub`, manteniendo el repo operativo como lugar de ejecución técnica.

### No se tocó

- No se trabajó directo en `main`.
- No se creó automatización ejecutable.
- No se ejecutaron scripts.
- No se instalaron dependencias.
- No se tocaron producción, SENCE, Moodle, Zoho, Cloudflare, n8n ni WhatsApp.
- No se usaron credenciales, secretos ni datos personales.

### Pendientes históricos

- Configurar campos y vistas del **Planificador Atlas**.
- Registrar URL/número del Project.
- Cargar primera tanda de issues reales.
- Evaluar si `capacita-global-control` debe registrar este repo/sistema en índice global.
