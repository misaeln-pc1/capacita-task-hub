# PROTOCOLO_TAREAS_ATLAS_CLASIFICACION_ESTRUCTURADA

Estado: protocolo complementario vigente para creación de issues en Task Hub.  
Fecha: 2026-07-20.  
Repo: `misaeln-pc1/capacita-task-hub`.

## Propósito

Evitar que tareas creadas desde dictado o lenguaje natural aparezcan como `Sin fecha` en el Planificador Atlas por falta de campos estructurados en el cuerpo del issue.

El dashboard no debe depender del título para inferir fechas, estados ni clasificación. La fuente oficial para tareas ejecutables y seguimientos accionables es el cuerpo del issue de GitHub.

## Regla obligatoria

Toda tarea ejecutable, personal, administrativa accionable o seguimiento accionable creada en `capacita-task-hub` debe iniciar con la sección `## Clasificación`.

La sección no es opcional. Si un dato no existe, debe escribirse explícitamente como `Sin fecha`, `Sin responsable`, `Sin estimación` o equivalente controlado. No se deben omitir campos.

## Formato mínimo obligatorio

```markdown
## Clasificación

- **Estado:** Inbox | Hoy | Próxima | En curso | Bloqueada | Cerrada
- **Proyecto:** <proyecto>
- **Tipo:** <tarea ejecutiva | hito | seguimiento | administrativa | personal>
- **Prioridad:** P1 | P2 | P3
- **Riesgo:** Verde | Amarillo | Rojo
- **Responsable:** Misael | Johanna | otro
- **Fecha objetivo:** YYYY-MM-DD | Sin fecha
- **Fecha de inicio:** YYYY-MM-DD | Sin fecha
- **Fecha de término:** YYYY-MM-DD | Sin fecha
- **Tiempo estimado:** 10 min | 30 min | 1 h | 2 h | medio día | día completo | más de un día | Sin estimación
- **Origen / validación:** Dictado simple | Derivado de issue padre | Derivado de PR | Derivado de decisión validada | Pendiente de decisión | Incidente / bloqueo
```

## Reglas de fecha

1. Si Misael dice `hoy`, usar la fecha local actual de `America/Santiago` en formato ISO `YYYY-MM-DD`.
2. Si dice `mañana`, calcular la fecha local siguiente.
3. Si dice `viernes`, `próximo viernes`, `viernes de la próxima semana` u otro día relativo, calcular fecha absoluta.
4. Si dice `para el 24 de agosto`, usar el año operativo actual salvo ambigüedad real.
5. Si no existe fecha, escribir:
   - `- **Fecha objetivo:** Sin fecha`
   - `- **Fecha de inicio:** Sin fecha`
   - `- **Fecha de término:** Sin fecha`
6. No dejar fechas sólo en el título, descripción o comentario.
7. No usar lenguaje natural como valor final de fecha cuando el dashboard debe clasificar por semana.

## Regla crítica para el dashboard

El Planificador Atlas sólo debe clasificar semanalmente tareas con fecha estructurada en formato ISO. Por eso, las issues deben contener `Fecha objetivo`, `Fecha de inicio` y `Fecha de término` dentro de `## Clasificación`.

El título puede contener contexto humano, pero no es fuente oficial de fecha.

## Procedimiento para agentes

Antes de crear una tarea en Task Hub:

1. Identificar si es tarea ejecutable, seguimiento, hito, administrativa o personal.
2. Resolver lenguaje natural de fecha a ISO cuando exista.
3. Crear el issue con `## Clasificación` al inicio del cuerpo.
4. Agregar repo dueño, issue padre, PR o evidencia si corresponde.
5. Incluir siguiente acción y Definition of Done.
6. Reportar el link del issue.

Si el usuario pide actualizar una tarea existente:

1. Leer el issue.
2. Mantener contenido y evidencia actual.
3. Agregar o normalizar `## Clasificación` al inicio.
4. No borrar PR, rama, commit, evidencia ni contexto.
5. Confirmar que la issue sigue abierta o cerrarla sólo si Misael lo pidió.

## Ejemplo

```markdown
## Clasificación

- **Estado:** Hoy
- **Proyecto:** Moodle
- **Tipo:** Tarea ejecutiva
- **Prioridad:** P2
- **Riesgo:** Verde
- **Responsable:** Misael
- **Fecha objetivo:** 2026-07-20
- **Fecha de inicio:** 2026-07-20
- **Fecha de término:** 2026-07-20
- **Tiempo estimado:** 30 min
- **Origen / validación:** Derivado de PR Global draft
```

## Relación con `PROTOCOLO_TAREAS_ATLAS.md`

Este documento complementa el protocolo principal. La regla debe integrarse o referenciarse desde `PROTOCOLO_TAREAS_ATLAS.md` en la próxima normalización documental.

Hasta que se fusione, este archivo es la referencia operativa para la ficha estructurada mínima de Task Hub.

## Aprendizaje origen

La tarea `capacita-task-hub#74` apareció como `Sin fecha` porque el issue tenía buen contexto humano, pero no contenía campos estructurados de fecha. Al agregar `## Clasificación` con fechas ISO, el dashboard pudo ubicarla en la semana correspondiente.
