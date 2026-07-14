# Capacita Task Hub

Repositorio público de tareas ejecutables, personales, administrativas y seguimientos accionables del **Sistema de Tareas Atlas**.

## Nombres oficiales

| Elemento | Nombre | Qué es |
|---|---|---|
| Repo | `capacita-task-hub` | Cola maestra de tareas ejecutables. |
| GitHub Project | **Planificador Atlas** | Panel central de organización visual. |
| Dashboard | **Planificador Atlas V1** | Vista cronológica de solo lectura publicada en GitHub Pages. |
| Sistema completo | **Sistema de Tareas Atlas** | Reglas, repos, panel y flujos. |
| Protocolo principal | `PROTOCOLO_TAREAS_ATLAS.md` | Regla oficial para ubicar y gestionar tareas. |

## Regla principal

```text
El problema vive en el repo operativo.
La tarea ejecutable vive en Task Hub.
La evidencia técnica vive en el repo dueño.
```

- Ideas, investigaciones, decisiones, riesgos, bloqueos, épicas e incidentes viven en el repo operativo.
- Tareas ejecutables, personales, administrativas y seguimientos accionables viven en `capacita-task-hub`.
- Crear una tarea no requiere rama ni PR.
- Rama/PR se usa cuando cambia código, documentación oficial, estructura, decisiones o criterios.

## Dashboard operativo

URL:

```text
https://misaeln-pc1.github.io/capacita-task-hub/dashboard/
```

Características vigentes:

- consulta issues abiertos directamente desde la API pública de GitHub;
- sin token, secreto, Worker, backend o snapshot;
- semanas ISO 8601, lunes a domingo;
- cinco Weeks visibles: actual y cuatro siguientes;
- bloque de hitos y bloque de carga de tareas;
- Weeks vacías visibles;
- navegación interna Week → tarea → detalle;
- tareas sin fecha separadas;
- tareas abiertas vencidas arrastradas a la Week actual y marcadas en rojo;
- actualización al abrir, manual y cada cinco minutos;
- solo lectura.

Documentación completa:

```text
docs/DASHBOARD_PLANIFICADOR_ATLAS_V1.md
```

La documentación V0 se conserva únicamente como historial de la etapa snapshot inicial.

## Fuente oficial y privacidad

GitHub Issues es la fuente oficial del estado operativo. El Project y el dashboard son capas visuales.

El repo y sus issues son públicos. No registrar credenciales, secretos, tokens ni datos personales críticos.

## Capas del Planificador Atlas

1. **Visibilidad:** pendientes, prioridad, riesgo, responsable, bloqueo y siguiente acción.
2. **Tiempo:** estimación, tiempo real, confianza y desviación.
3. **Automatización:** delegación controlada, validación humana y fallback.

## Documentos clave

| Archivo | Uso |
|---|---|
| `PROTOCOLO_TAREAS_ATLAS.md` | Reglas operativas principales. |
| `PROJECT_CONTEXT.md` | Contexto estable del sistema. |
| `TASK_STATUS.md` | Estado vigente y pendientes. |
| `DECISIONES.md` | Decisiones oficiales. |
| `docs/DASHBOARD_PLANIFICADOR_ATLAS_V1.md` | Arquitectura y operación del dashboard vivo. |
| `docs/DASHBOARD_PLANIFICADOR_ATLAS_V0.md` | Historial de la etapa snapshot. |
| `docs/CAMPOS_PLANIFICADOR_ATLAS.md` | Campos sugeridos del Project. |
| `docs/FLUJO_TAREAS_REPOS_OPERATIVOS.md` | Enrutamiento padre/hija. |
| `docs/CRITERIOS_TIEMPO_AUTOMATIZACION.md` | Esfuerzo y automatización. |
| `RIESGOS.md` | Riesgos y mitigaciones. |
| `PROMPTS_BASE.md` | Prompts operativos. |

## Estado actual

- Sistema de Tareas Atlas operativo.
- GitHub Issues como fuente oficial.
- Planificador Atlas V1 publicado y validado visualmente el 2026-07-14.
- Issues de implementación #44 y #59 cerradas.
- Issues de prueba #48–#57 cerradas después de la validación.
- Futuras mejoras deben abrir issue y realizarse mediante rama/PR.
