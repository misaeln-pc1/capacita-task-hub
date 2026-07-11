# REPO_MAP

## Propósito

Mapa rápido del repo `capacita-task-hub` para humanos y agentes IA.

## Estructura

| Ruta | Uso |
|---|---|
| `README.md` | Entrada humana del repo. Explica nombres oficiales, regla principal y documentos clave. |
| `PROJECT_CONTEXT.md` | Contexto estable del Sistema de Tareas Atlas. |
| `PROTOCOLO_TAREAS_ATLAS.md` | Protocolo operativo principal para crear, ubicar y clasificar tareas. |
| `TASK_STATUS.md` | Estado operativo, pendientes y siguiente paso. |
| `DECISIONES.md` | Decisiones tomadas sobre nombres, capas, flujo y alcance. |
| `RIESGOS.md` | Riesgos y mitigaciones del sistema. |
| `AGENTS.md` | Reglas para agentes que trabajen en este repo. |
| `PROMPTS_BASE.md` | Prompts reutilizables para crear tareas y configurar el Planificador. |
| `SKILLS_USED.md` | Skills revisadas/usadas y límites. |
| `REVIEW_REQUEST.md` | Solicitud de revisión del cambio activo. |
| `CHANGELOG_AGENT.md` | Registro de cambios hechos por Atlas/agentes. |
| `dashboard/index.html` | Dashboard visual V0 portable, de solo lectura y basado en snapshot. |
| `docs/DASHBOARD_PLANIFICADOR_ATLAS_V0.md` | Arquitectura, fuente, límites, validación y handoff a Sites. |
| `docs/CAPAS_PLANIFICADOR_ATLAS.md` | Capa 1, 2 y 3. |
| `docs/CAMPOS_PLANIFICADOR_ATLAS.md` | Campos y vistas recomendadas del GitHub Project. |
| `docs/FLUJO_TAREAS_REPOS_OPERATIVOS.md` | Cómo se crean tareas desde repos operativos. |
| `docs/CRITERIOS_TIEMPO_AUTOMATIZACION.md` | Estimación de esfuerzo y automatización. |

## Entradas principales

1. Usuario dicta tarea personal o administrativa.
2. Proyecto operativo genera tarea técnica o documental.
3. Atlas identifica tarea transversal o pendiente sin repo dueño.
4. Decisión validada genera tarea ejecutiva posterior.
5. Revisión snapshot genera una vista visual sin modificar la fuente oficial.

## Salidas principales

1. Issue en `capacita-task-hub` para tareas sin repo dueño.
2. Issue en repo operativo para tareas con dueño.
3. Tarea visible en **Planificador Atlas**.
4. Referencia a PR/documento/decisión cuando aplique.
5. Dashboard visual portable para lectura ejecutiva y futura publicación en Sites.

## Qué no debe contener este repo

- Código productivo.
- Credenciales.
- Datos personales.
- Binarios.
- Automatizaciones ejecutables no aprobadas.
- Tareas técnicas que pertenecen a un repo operativo.
- Duplicados de issues de otros repos.

El HTML del dashboard es un prototipo interno de solo lectura. No es producción, no ejecuta integraciones y no reemplaza los issues.

## Convención de ramas

Ramas documentales:

```text
docs/task-hub-[objetivo]
```

Features visuales o funcionales controladas:

```text
feature/task-hub-[objetivo]
```

Ejemplos:

```text
docs/task-hub-bootstrap-v01
feature/task-hub-visual-dashboard-v0
```

Nunca trabajar directo en `main`.
