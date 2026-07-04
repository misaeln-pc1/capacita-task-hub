# TASK_STATUS

## Estado actual

Bootstrap documental inicial del **Sistema de Tareas Atlas** en curso.

## Objetivo inmediato

Dejar documentado el modelo acordado para que no dependa de memoria conversacional:

- Repo: `capacita-task-hub`.
- GitHub Project: **Planificador Atlas**.
- Capa 1: visibilidad.
- Capa 2: tiempo.
- Capa 3: automatización.
- Flujo para tareas personales, administrativas, transversales y tareas de repos operativos.

## Avances

- Repo `misaeln-pc1/capacita-task-hub` creado por Misael.
- GitHub Project **Planificador Atlas** creado manualmente por Misael.
- Rama documental creada: `docs/task-hub-bootstrap-v01`.
- Documentos base iniciados.

## Pendientes inmediatos

| Pendiente | Responsable | Prioridad | Riesgo | Nota |
|---|---|---:|---|---|
| Configurar campos del Planificador Atlas | Misael / Atlas guía | P1 | Verde | Usar `docs/CAMPOS_PLANIFICADOR_ATLAS.md`. |
| Configurar vistas iniciales | Misael / Atlas guía | P1 | Verde | Hoy, Semana, Bloqueadas, Por proyecto, Personales, Riesgo, Automatizables. |
| Registrar URL/número del Project | Misael | P1 | Verde | Para futura sincronización. |
| Crear primera carga controlada de tareas reales | Atlas + Misael | P1 | Verde/Amarillo | Partir con tareas visibles, no automatización. |
| Definir si se actualizará Global con nuevo repo/sistema | Atlas + Misael | P2 | Verde | Probable actualización posterior en `capacita-global-control`. |

## Próximo paso recomendado

1. Revisar y mergear PR documental inicial.
2. Configurar campos mínimos del **Planificador Atlas**.
3. Cargar 10–20 tareas reales como prueba.
4. Ajustar campos antes de automatizar.

## Bloqueos

Ninguno para documentación inicial.

## No tocar todavía

- No crear automatizaciones por GitHub Actions.
- No ejecutar scripts.
- No conectar APIs.
- No modificar repos operativos masivamente.
- No sincronizar automáticamente con Project hasta validar campos.
