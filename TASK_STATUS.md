# TASK_STATUS

## Estado actual

Sistema de Tareas Atlas con bootstrap documental mergeado y PR #9 en corrección conceptual.

## Decisión vigente

El modelo operativo queda así:

```text
Repo operativo = radar de problemas, ideas, riesgos, decisiones e investigaciones.
Task Hub = cola maestra de tareas ejecutables.
Planificador Atlas = dashboard central de ejecución.
```

## Objetivo inmediato

Corregir el PR #9 para reflejar que:

- Task Hub no reemplaza los issues de los repos operativos.
- Task Hub centraliza tareas ejecutables, personales, administrativas y seguimientos accionables.
- Ideas, investigaciones, decisiones, riesgos, bloqueos, épicas e incidentes viven en el repo operativo.
- Cuando un issue de repo genera acciones, se crean tareas derivadas en Task Hub.
- Las tareas de Task Hub deben linkear el issue padre.
- El issue padre debe listar y revisar el estado de sus tareas derivadas.

## Avances

- Repo `misaeln-pc1/capacita-task-hub` creado por Misael.
- GitHub Project **Planificador Atlas** creado manualmente por Misael.
- PR #1 mergeado.
- Issues iniciales #2, #3 y #4 creados.
- PR #9 abierto para ajustar el estándar.
- Decisión intermedia de centralizar todos los issues fue corregida antes del merge.

## Pendientes inmediatos

| Pendiente | Responsable | Prioridad | Riesgo | Nota |
|---|---|---:|---|---|
| Revisar y mergear PR #9 corregido | Misael | P1 | Verde | Debe reflejar problema en repo / tarea en Task Hub. |
| Confirmar workflow Auto-add único | Misael | P1 | Verde | `is:issue is:open` desde `capacita-task-hub`. |
| Configurar campo `Issue padre` en Planificador Atlas | Misael / Atlas guía | P1 | Verde | Necesario para vínculo repo -> Task Hub. |
| Configurar campos de Capa 1 | Misael / Atlas guía | P1 | Verde | Enfocados en tareas ejecutables. |
| Configurar vistas iniciales | Misael / Atlas guía | P1 | Verde | Dashboard tareas, Hoy, Semana, Bloqueadas, Por proyecto, Con issue padre. |
| Registrar URL/número del Project | Misael | P1 | Verde | Para futura sincronización. |
| Probar vínculo issue padre -> tareas hijas | Atlas + Misael | P1 | Verde/Amarillo | Usar un caso real pequeño. |
| Definir si se actualizará Global con nuevo repo/sistema | Atlas + Misael | P2 | Verde | Probable actualización posterior en `capacita-global-control`. |

## Próximo paso recomendado

1. Revisar y mergear PR #9 corregido.
2. Configurar Auto-add único desde Task Hub si no está confirmado.
3. Configurar campo `Issue padre`.
4. Probar con un issue padre de repo operativo y dos tareas hijas en Task Hub.
5. Ajustar antes de cargar backlog.

## Bloqueos

Ninguno documental.

## No tocar todavía

- No crear automatizaciones por GitHub Actions.
- No ejecutar scripts.
- No conectar APIs.
- No modificar repos operativos masivamente.
- No cargar backlog completo hasta validar el vínculo padre/hija.
