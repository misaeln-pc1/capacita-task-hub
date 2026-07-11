# TASK_STATUS

## Estado actual

Sistema de Tareas Atlas operativo con tareas reales, workflow Auto-add validado y Dashboard Visual V0 en desarrollo mediante issue #23.

## Decisión vigente

El modelo operativo queda así:

```text
Repo operativo = radar de problemas, ideas, riesgos, decisiones e investigaciones.
Task Hub = cola maestra de tareas ejecutables.
Planificador Atlas = dashboard central de ejecución.
Dashboard Visual V0 = capa portable de lectura basada en snapshot.
```

Regla corta:

```text
El problema vive en el repo.
La tarea ejecutable vive en Task Hub.
La evidencia técnica vive en el repo.
```

## Dashboard Visual V0

- Issue: `capacita-task-hub#23`.
- Rama: `feature/task-hub-visual-dashboard-v0`.
- Archivo principal: `dashboard/index.html`.
- Arquitectura: `docs/DASHBOARD_PLANIFICADOR_ATLAS_V0.md`.
- Estado: implementación terminada en rama; pendiente revisión mediante PR.
- Fuente: snapshot manual de issues abiertos al 2026-07-11.
- Publicación Sites: pendiente de merge y revisión separada.
- Sin API, credenciales, Actions, scripts ni producción.

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
- Dashboard Visual V0 creado en rama separada con filtros, indicadores, timeline y enlaces.

## Pendientes inmediatos

| Pendiente | Responsable | Prioridad | Riesgo | Nota |
|---|---|---:|---|---|
| Revisar y mergear Dashboard Visual V0 | Misael / Review | P1 | Amarillo bajo | Validar diseño, datos snapshot y alcance antes de Sites. |
| Normalizar fecha de tarea `#5` | Misael / Atlas | P1 | Amarillo | Sustituir “Hoy” por fecha absoluta. |
| Preparar ruta crítica SOFOFA | Misael / Atlas | P1 | Rojo | Hito oficial 22/07/2026 14:00. |
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

1. Revisar el PR del Dashboard Visual V0.
2. Corregir observaciones visuales o de clasificación.
3. Mergear solo con aprobación humana.
4. Publicar posteriormente en Sites como piloto separado.
5. Mantener GitHub Issues como fuente oficial y el HTML como snapshot.

## Bloqueos

- El conector GitHub de ChatGPT no permite editar campos internos de GitHub Projects v2.
- La clasificación debe quedar en el cuerpo del issue y/o labels hasta que se use CLI/API local o automatización aprobada.
- La V0 no se actualiza automáticamente; el snapshot requiere revisión manual.
- La publicación en Sites no se ejecuta desde este PR.

## No tocar todavía

- No crear automatizaciones por GitHub Actions.
- No ejecutar scripts de sincronización.
- No conectar APIs.
- No modificar Moodle producción.
- No tocar SENCE/CUS real.
- No usar credenciales.
- No publicar en Sites antes de revisar acceso y contenido.
