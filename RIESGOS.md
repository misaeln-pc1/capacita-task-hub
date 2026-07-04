# RIESGOS

## Semáforo general

| Riesgo | Significado | Acción |
|---|---|---|
| Verde | Tareas personales, administrativas simples, documentación reversible | Crear issue y avanzar. |
| Amarillo | Proyectos, datos, SENCE, CRM, Moodle, Zoho, producción cercana, dinero, proveedor | Crear issue con contexto, origen y validación mínima. |
| Rojo | Credenciales, datos personales críticos, producción irreversible, legal, dinero relevante, merge/main | Detener y pedir aprobación humana. |

## Riesgos del Sistema de Tareas Atlas

| Riesgo | Semáforo | Impacto | Mitigación mínima |
|---|---|---|---|
| Duplicar tareas entre repo operativo y `capacita-task-hub` | Amarillo | Desorden y pérdida de trazabilidad | Una tarea = un issue. El Planificador Atlas solo muestra referencias. |
| Convertir una idea no decidida en tarea ejecutiva | Amarillo | Ejecutar una acción inmadura | Usar `Origen / Validación = Pendiente de decisión` y verbo `Evaluar`. |
| Sobrellenar campos desde el inicio | Verde/Amarillo | Burocracia y abandono del sistema | Capa 1 primero; Capa 2 solo P1/P2; Capa 3 después. |
| Confundir repo con GitHub Project | Verde | Errores de conversación y gestión | Usar nombres fijos: `capacita-task-hub` = repo; Planificador Atlas = panel. |
| Registrar tareas técnicas en Task Hub cuando tienen repo dueño | Amarillo | Pérdida de contexto operativo | Crear issue en repo dueño y agregar al Planificador. |
| Usar Planificador Atlas como validador de decisiones | Amarillo | Decisiones sin PR/evidencia | Las decisiones se validan en repos/documentos; el Planificador solo gestiona ejecución. |
| Automatizar prematuramente | Amarillo | Scripts, agentes o flujos sin control | Capturar tareas reales primero; automatizar solo patrones repetibles. |
| Tocar producción, SENCE, datos o dinero como tarea simple | Rojo | Riesgo legal, comercial o operativo | Detener; exigir aprobación humana y evidencia. |
| Perder contexto entre chats | Amarillo | Repetición y errores | Mantener `PROJECT_CONTEXT.md`, `PROTOCOLO_TAREAS_ATLAS.md` y `TASK_STATUS.md`. |

## Controles mínimos

1. Las tareas personales no requieren rama/PR.
2. Las tareas técnicas viven en su repo operativo.
3. Las tareas derivadas de decisión deben referenciar PR/documento origen si existe.
4. Las tareas pendientes de decisión no deben redactarse como acciones ejecutivas.
5. Riesgo amarillo/rojo requiere semáforo visible.
6. Automatización solo después de validar patrón y riesgo.

## Riesgos pendientes de revisión

- Confirmar si el **Planificador Atlas** debe tener protocolo de snapshot similar a `Capacita Control Tower`.
- Confirmar si se debe actualizar `capacita-global-control` para registrar `capacita-task-hub` como repo activo/transversal.
- Confirmar si se crearán labels estándar en cada repo operativo para conexión con Planificador Atlas.
