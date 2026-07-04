# Capacita Task Hub

Repositorio privado para tareas personales, administrativas, transversales e inbox operativo del **Sistema de Tareas Atlas**.

## Nombres oficiales

| Elemento | Nombre | Qué es |
|---|---|---|
| Repo | `capacita-task-hub` | Lugar donde viven tareas personales, administrativas, transversales o sin repo dueño claro. |
| GitHub Project | **Planificador Atlas** | Panel central donde se ven tareas de este repo y de los repos operativos. |
| Sistema completo | **Sistema de Tareas Atlas** | Reglas, campos, capas, flujos y criterios de uso. |
| Protocolo principal | `PROTOCOLO_TAREAS_ATLAS.md` | Regla oficial para decidir dónde crear, clasificar y gestionar tareas. |

## Regla principal

> La tarea vive en el repo dueño. El **Planificador Atlas** la organiza y la muestra.

- Si la tarea tiene repo dueño, se crea como issue en ese repo operativo y se agrega al **Planificador Atlas**.
- Si la tarea es personal, administrativa, transversal o no tiene repo dueño claro, se crea como issue en `capacita-task-hub` y se agrega al **Planificador Atlas**.
- Crear una tarea no implica crear rama, PR ni merge.
- Rama/PR aplica solo cuando se modifica documentación oficial, código, estructura, decisión relevante o criterio operativo.

## Capas del Planificador Atlas

1. **Capa 1 — Visibilidad:** qué está pendiente, prioridad, riesgo, responsable, bloqueo y siguiente acción.
2. **Capa 2 — Tiempo:** tamaño estimado, tiempo activo Misael, tiempo IA/agente, confianza e incertidumbre.
3. **Capa 3 — Automatización:** qué puede hacer Atlas, Codex, Copilot, Jules, API o scripts, y qué requiere validación humana.

## Documentos clave

| Archivo | Uso |
|---|---|
| `PROTOCOLO_TAREAS_ATLAS.md` | Reglas operativas principales. |
| `PROJECT_CONTEXT.md` | Contexto estable del sistema. |
| `docs/CAPAS_PLANIFICADOR_ATLAS.md` | Detalle de capa 1, 2 y 3. |
| `docs/CAMPOS_PLANIFICADOR_ATLAS.md` | Campos sugeridos del GitHub Project. |
| `docs/FLUJO_TAREAS_REPOS_OPERATIVOS.md` | Cómo nacen tareas desde Moodle, Edge, Zoho, licitaciones, etc. |
| `docs/CRITERIOS_TIEMPO_AUTOMATIZACION.md` | Escalas de esfuerzo, incertidumbre y automatización. |
| `DECISIONES.md` | Decisiones base del sistema. |
| `RIESGOS.md` | Riesgos y controles. |
| `PROMPTS_BASE.md` | Frases y prompts operativos reutilizables. |

## Estado inicial

Bootstrap documental inicial. Pendiente configurar campos y vistas del **Planificador Atlas** en GitHub Projects y comenzar la primera carga controlada de tareas reales.
