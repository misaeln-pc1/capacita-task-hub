# TASK_STATUS

## Estado actual

Sistema de Tareas Atlas con bootstrap documental mergeado y PR #9 mergeado.

## Decisión vigente

El modelo operativo queda así:

```text
Repo operativo = radar de problemas, ideas, riesgos, decisiones e investigaciones.
Task Hub = cola maestra de tareas ejecutables.
Planificador Atlas = dashboard central de ejecución.
```

Regla corta:

```text
El problema vive en el repo.
La tarea ejecutable vive en Task Hub.
La evidencia técnica vive en el repo.
```

## Avances confirmados

- Repo `misaeln-pc1/capacita-task-hub` creado por Misael.
- GitHub Project **Planificador Atlas** creado manualmente por Misael.
- PR #1 mergeado.
- PR #9 mergeado: separa problemas de repo y tareas ejecutables en Task Hub.
- Workflow Auto-add único validado desde `capacita-task-hub` hacia **Planificador Atlas**.
- URL del Project registrada: `https://github.com/users/misaeln-pc1/projects/4`.
- Issues iniciales #2 y #3 cerrados.
- Prueba padre/hijas iniciada con Moodle:
  - Issue padre: `misaeln-pc1/capacita-learnops-moodle#130`.
  - Tarea hija: `misaeln-pc1/capacita-task-hub#10`.
  - Tarea hija: `misaeln-pc1/capacita-task-hub#11`.
- Tarea transversal abierta para propagar regla Atlas a repos activos: `capacita-task-hub#12`.

## Pendientes inmediatos

| Pendiente | Responsable | Prioridad | Riesgo | Nota |
|---|---|---:|---|---|
| Ejecutar tarea `#10` | Misael / Atlas | P1 | Amarillo | Levantar flujo actual de recuperación de clave Moodle sin tocar configuración real. |
| Ejecutar tarea `#11` | Misael / Atlas | P1 | Amarillo | Validar impacto SENCE/CUS antes de cualquier cambio de autenticación. |
| Mantener actualizado issue padre Moodle `#130` | Atlas / Misael | P1 | Amarillo | Debe listar estado de tareas derivadas y evidencia. |
| Revisar tarea administrativa `#5` | Misael | P1 | Amarillo | Enviar factura a Banco Central; cerrar solo con evidencia. |
| Resolver propagación a repos activos `#12` | Misael / Atlas | P1 | Amarillo | Mergear PRs listos y revisar repos bloqueados. |
| Confirmar campo `Issue padre` en Planificador Atlas | Misael | P1 | Verde | Si falta, crearlo manualmente. |
| Ajustar vistas si hace falta | Misael / Atlas guía | P2 | Verde | Dashboard tareas, Hoy, Semana, Riesgo, Con issue padre. |
| Actualizar `capacita-global-control` si corresponde | Atlas + Misael | P2 | Verde | Solo mediante rama/PR si cambia documentación oficial global. |

## No pendiente / resuelto

| Elemento | Estado |
|---|---|
| Configurar campos y vistas iniciales del Project | Resuelto por Misael y cerrado en #2. |
| Registrar URL/número del Project | Resuelto y cerrado en #3. |
| Validar que Auto-add ingresa issues de Task Hub al Project | Resuelto con prueba #7. |
| Usar workflow Auto-add por cada repo operativo | Descartado por PR #9; se usa Auto-add único desde Task Hub. |
| Centralizar todos los issues en Task Hub | Descartado; problemas e investigaciones viven en repo operativo. |

## Próximo paso recomendado

1. Ejecutar `capacita-task-hub#10`.
2. Comentar evidencia en `capacita-learnops-moodle#130`.
3. Ejecutar `capacita-task-hub#11`.
4. Actualizar el issue padre Moodle con resultado y decisión de bloqueo/avance.
5. Revisar `capacita-task-hub#12` para ordenar PRs de propagación Atlas.

## Bloqueos

- El conector GitHub de ChatGPT no permite editar campos internos de GitHub Projects v2.
- La clasificación debe quedar en el cuerpo del issue y/o labels hasta que se use CLI/API local o automatización aprobada.

## No tocar todavía

- No crear automatizaciones por GitHub Actions.
- No ejecutar scripts.
- No conectar APIs.
- No modificar Moodle producción.
- No tocar SENCE/CUS real.
- No usar credenciales.
- No cargar backlog completo hasta cerrar la prueba padre/hijas de Moodle.