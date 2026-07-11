# CHANGELOG_AGENT

## 2026-07-11 — Dashboard Visual Planificador Atlas V0

**Agente:** Atlas / ChatGPT.

**Issue:** `capacita-task-hub#23`.

**Rama:** `feature/task-hub-visual-dashboard-v0`.

**Tipo de cambio:** feature visual interna + documentación, reversible, riesgo amarillo bajo.

### Objetivo

Crear una vista ejecutiva, portable y visual del Planificador Atlas en GitHub, preparada para publicación posterior en ChatGPT Sites sin reemplazar GitHub Issues ni el Project.

### Archivos creados

- `dashboard/index.html`.
- `docs/DASHBOARD_PLANIFICADOR_ATLAS_V0.md`.

### Archivos actualizados

- `README.md`.
- `REPO_MAP.md`.
- `TASK_STATUS.md`.
- `DECISIONES.md`.
- `REVIEW_REQUEST.md`.
- `CHANGELOG_AGENT.md`.

### Funcionalidad

- cinco indicadores reconciliados;
- foco inmediato de máximo tres tareas;
- ruta crítica SOFOFA;
- filtros por texto, prioridad, riesgo, estado y proyecto;
- enlaces directos a issues;
- panel de brechas de planificación;
- diseño responsive;
- snapshot fechado de 13 issues abiertos.

### Decisiones

- GitHub Issues y Planificador Atlas permanecen como fuente oficial.
- V0 usa snapshot embebido; no usa API GitHub.
- ChatGPT Sites queda como fase posterior separada.
- Work puede ayudar a mantener el entregable, pero no reemplaza GitHub.
- No se crea sincronización automática hasta validar el valor del dashboard.

### Validación

- HTML parseado con BeautifulSoup.
- JavaScript embebido validado con `node --check`.
- Conteos reconciliados:
  - 13 tareas abiertas;
  - 7 P1;
  - 2 bloqueadas o vencidas;
  - 11 sin fecha absoluta;
  - 1 riesgo rojo.
- Sin librerías, fuentes o recursos externos.
- Sin solicitudes de red automáticas.
- Intento de screenshot headless no concluyente por restricciones del contenedor Chromium; no se usa como evidencia visual.

### Lectura obligatoria realizada

Global:

- `docs/LECTURA_OBLIGATORIA_GLOBAL.md`.
- `docs/DICCIONARIO_OPERATIVO_CAPACITA.md`.
- `docs/ESTANDAR_GLOBAL_PROYECTOS.md`.
- `docs/ISSUE_TASK_ROUTING_STANDARD.md`.
- `docs/CONTROL_OPERATING_MODEL.md`.
- `docs/ESTANDAR_SDD_LIVIANO_CAPACITA.md`.
- `capacita-ai-operating-system/PLATFORM_CAPABILITIES_REGISTRY.md`.

Task Hub:

- `README.md`.
- `PROJECT_CONTEXT.md`.
- `PROTOCOLO_TAREAS_ATLAS.md`.
- `TASK_STATUS.md`.
- `DECISIONES.md`.
- `RIESGOS.md`.
- `REPO_MAP.md`.
- `AGENTS.md`.
- `REVIEW_REQUEST.md`.
- `CHANGELOG_AGENT.md`.

### Feedback scan

Feedback scan realizado: sin hallazgos relevantes.

- `REVIEW_REQUEST.md`: existía desactualizado para PR #9 y fue reemplazado por la solicitud de revisión del dashboard.
- `CHANGELOG_AGENT.md`: actualizado.
- `TASK_STATUS.md`: actualizado.
- `AGENT_FEEDBACK.md`: no existe.
- `GEMINI.md`: no existe.

### No se tocó

- `main`.
- GitHub Project y sus campos internos.
- GitHub Actions, workflows o scripts.
- APIs, credenciales o secretos.
- Cloudflare, Sites, Zoho, Moodle, n8n, WhatsApp, SENCE o producción.
- Datos personales o binarios.
- Merge.

### Pendientes

- Abrir PR draft.
- Revisión visual humana.
- Corregir clasificaciones o fechas si el snapshot no representa el estado real.
- Merge solo por Misael.
- Publicación Sites en fase separada.

---

## 2026-07-04 — Corrección PR #9: problema en repo, tarea en Task Hub

**Agente:** Atlas / ChatGPT.

**Rama:** `docs/task-hub-centralized-issue-types-v01`.

**Tipo de cambio:** documental, reversible, riesgo verde/amarillo operativo.

### Motivo

Misael detectó un problema en la propuesta anterior: si ideas, riesgos, investigaciones o decisiones quedan solo en Task Hub, el repo operativo pierde visibilidad local. Un análisis futuro del repo no vería problemas graves como autenticación, SENCE, seguridad o arquitectura.

### Decisión corregida

```text
El problema vive en el repo.
La tarea ejecutable vive en Task Hub.
La evidencia técnica vive en el repo.
```

### Reglas documentadas

- Task Hub no reemplaza los issues de los repos operativos.
- Task Hub centraliza solo tareas ejecutables, personales, administrativas y seguimientos accionables.
- Ideas, investigaciones, decisiones, riesgos, bloqueos, épicas e incidentes viven por defecto en el repo operativo.
- Cuando un issue del repo operativo genera acciones, esas acciones se crean como tareas en Task Hub.
- Las tareas Task Hub deben declarar `Issue padre` y `Repo dueño`.
- El issue padre debe listar tareas derivadas y mantenerse abierto mientras el problema siga vivo.
- El Planificador Atlas sigue usando un único Auto-add desde Task Hub.

### Archivos modificados en esta corrección

- `PROTOCOLO_TAREAS_ATLAS.md`.
- `docs/CAMPOS_PLANIFICADOR_ATLAS.md`.
- `docs/CONFIGURACION_INICIAL_PLANIFICADOR_ATLAS.md`.
- `docs/FLUJO_TAREAS_REPOS_OPERATIVOS.md`.
- `docs/WORKFLOW_AUTO_ADD_TASK_HUB.md`.
- `DECISIONES.md`.
- `TASK_STATUS.md`.
- `REVIEW_REQUEST.md`.
- `CHANGELOG_AGENT.md`.

### Lectura obligatoria realizada

- `capacita-global-control/docs/LECTURA_OBLIGATORIA_GLOBAL.md`.
- `capacita-global-control/docs/DICCIONARIO_OPERATIVO_CAPACITA.md`.
- `capacita-global-control/docs/ESTANDAR_GLOBAL_PROYECTOS.md`.
- `capacita-global-control/INDICE_PROYECTOS.md`.
- `capacita-global-control/docs/CONTROL_OPERATING_MODEL.md`.

### Feedback scan

Feedback scan realizado: sin hallazgos relevantes.

Archivos revisados o verificados:

- `REVIEW_REQUEST.md`: actualizado para PR #9 corregido.
- `CHANGELOG_AGENT.md`: actualizado.
- `TASK_STATUS.md`: actualizado.
- `AGENT_FEEDBACK.md`: no existe.
- `GEMINI.md`: no existe.

### No se tocó

- No se trabajó directo en `main`.
- No se creó ni ejecutó GitHub Actions.
- No se ejecutaron scripts.
- No se instalaron dependencias.
- No se tocaron producción, SENCE, Moodle, Zoho, Cloudflare, n8n ni WhatsApp.
- No se usaron credenciales, secretos ni datos personales.

### Pendientes

- Actualizar título/cuerpo del PR #9 para reflejar la corrección.
- Revisar y mergear PR si Misael aprueba.
- Probar un issue padre en repo operativo con tareas hijas en Task Hub.

---

## 2026-07-04 — Ajuste arquitectura centralizada de issues — superado

**Agente:** Atlas / ChatGPT.

**Rama:** `docs/task-hub-centralized-issue-types-v01`.

**Tipo de cambio:** documental, reversible, riesgo verde/amarillo operativo.

### Motivo

Se detectó que GitHub Projects tiene límite de workflows Auto-add por plan. Como Capacita tiene más repos activos que slots disponibles, se propuso no usar un workflow por repo operativo.

### Decisiones documentadas inicialmente en esta rama

- Todos los issues de gestión se crean en `capacita-task-hub`.
- El **Planificador Atlas** usa un único workflow Auto-add desde `capacita-task-hub` con filtro `is:issue is:open`.
- Todos los issues abiertos entran al Project, no solo tareas ejecutivas.
- El campo `Tipo` separa tareas ejecutivas, ideas, decisiones, investigaciones, bloqueos e iniciativas.
- El dashboard diario filtra solo `Tipo = Tarea ejecutiva`.
- El repo operativo se declara como `Repo dueño`, pero no recibe issue por defecto.

### Estado

Superado por la corrección posterior: problemas, ideas, riesgos, decisiones e investigaciones viven en el repo operativo; solo tareas ejecutables viven en Task Hub.

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
