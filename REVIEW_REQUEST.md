# REVIEW_REQUEST

## Alcance

Revisión del bootstrap documental inicial de `capacita-task-hub` y del modelo **Planificador Atlas**.

## Objetivo

Validar que la documentación registre correctamente lo definido en conversación:

- `capacita-task-hub` como repo de tareas personales, administrativas, transversales e inbox.
- **Planificador Atlas** como GitHub Project / panel central.
- Reglas para tareas de repos operativos.
- Capa 1: visibilidad.
- Capa 2: tiempo.
- Capa 3: automatización.
- Separación entre tarea, decisión, rama y PR.
- Tareas personales sin rama/PR.
- Tareas derivadas de decisiones ya validadas como acciones ejecutivas.

## Archivos a revisar

| Archivo | Revisión esperada |
|---|---|
| `README.md` | Claridad de nombres y regla principal. |
| `PROJECT_CONTEXT.md` | Contexto estable y límites del repo. |
| `PROTOCOLO_TAREAS_ATLAS.md` | Regla de ubicación, decisiones, tareas simples y semáforo. |
| `docs/CAPAS_PLANIFICADOR_ATLAS.md` | Capa 1, 2 y 3. |
| `docs/CAMPOS_PLANIFICADOR_ATLAS.md` | Campos y vistas del Project. |
| `docs/FLUJO_TAREAS_REPOS_OPERATIVOS.md` | Tareas nacidas desde Moodle, Edge, Zoho, etc. |
| `docs/CRITERIOS_TIEMPO_AUTOMATIZACION.md` | Estimación y automatización. |
| `DECISIONES.md` | Decisiones registradas. |
| `RIESGOS.md` | Riesgos y mitigaciones. |
| `PROMPTS_BASE.md` | Prompts operativos. |

## Preguntas de revisión

1. ¿Queda claro que `capacita-task-hub` es repo y **Planificador Atlas** es GitHub Project?
2. ¿Queda claro que las tareas técnicas viven en su repo dueño?
3. ¿Queda claro que las tareas personales no requieren rama/PR?
4. ¿Queda claro que una tarea no valida una decisión?
5. ¿Queda claro cuándo usar Capa 1, Capa 2 y Capa 3?
6. ¿Hay sobreingeniería o documentos sobrantes?
7. ¿Falta algún campo clave para el Planificador Atlas?

## Definition of Done

- Documentación coherente y sin nombres ambiguos.
- Riesgo verde: sin producción, sin credenciales, sin datos personales, sin scripts.
- PR documental abierto para revisión.
- Pendientes claros para configurar campos/vistas y cargar primeras tareas.
