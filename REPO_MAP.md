# REPO_MAP

## Propósito

Mapa rápido del repo `capacita-task-hub` para humanos y agentes IA.

## Estructura principal

| Ruta | Uso |
|---|---|
| `README.md` | Entrada humana, reglas y estado vigente. |
| `PROJECT_CONTEXT.md` | Contexto estable del Sistema de Tareas Atlas. |
| `PROTOCOLO_TAREAS_ATLAS.md` | Protocolo para crear, ubicar y clasificar tareas. |
| `TASK_STATUS.md` | Estado operativo y siguiente paso. |
| `DECISIONES.md` | Decisiones oficiales. |
| `RIESGOS.md` | Riesgos y mitigaciones. |
| `AGENTS.md` | Reglas para agentes. |
| `PROMPTS_BASE.md` | Prompts operativos reutilizables. |
| `REVIEW_REQUEST.md` | Solicitud o cierre de revisión vigente. |
| `CHANGELOG_AGENT.md` | Registro histórico de cambios. |

## Dashboard Planificador Atlas

| Ruta | Uso |
|---|---|
| `index.html` | Entrada raíz de GitHub Pages y redirección al dashboard. |
| `dashboard/index.html` | Documento principal del dashboard V1. |
| `dashboard/iso/core.js` | Parser y normalización de GitHub Issues. |
| `dashboard/iso/calendar.js` | Fechas, Weeks ISO y regla de vencidas. |
| `dashboard/iso/data.js` | Consulta de issues y agrupación semanal. |
| `dashboard/iso/home.js` | Portada: hitos y carga de cinco Weeks. |
| `dashboard/iso/detail.js` | Vistas internas de Week, tarea y sin fecha. |
| `dashboard/iso/app.js` | Enrutamiento, actualización y eventos. |
| `dashboard/iso-week-base.css` | Estilos base. |
| `dashboard/iso-week-views.css` | Estilos de Weeks, carga, detalle y vencidas. |
| `dashboard/tests/` | Pruebas de contrato del dashboard y caché. |
| `docs/DASHBOARD_PLANIFICADOR_ATLAS_V1.md` | Arquitectura, reglas, operación y cierre vigente. |
| `docs/DASHBOARD_PLANIFICADOR_ATLAS_V0.md` | Registro histórico de la etapa snapshot. |

## Entradas principales

1. Dictado de tarea personal, administrativa o seguimiento.
2. Acción ejecutable derivada de un issue padre en repo operativo.
3. Actualización de estado, fechas o evidencia de una tarea existente.
4. Revisión del dashboard vivo mediante GitHub Pages.

## Salidas principales

1. Issue ejecutable en `capacita-task-hub`.
2. Vínculo con repo dueño e issue padre cuando corresponde.
3. Visualización en el GitHub Project **Planificador Atlas**.
4. Visualización cronológica en el dashboard V1.
5. Evidencia técnica en el repo dueño.

## Qué no debe contener este repo

- Credenciales, secretos o tokens.
- Datos personales críticos.
- Binarios innecesarios.
- Automatizaciones ejecutables no aprobadas.
- Problemas que deban vivir en un repo operativo.
- Duplicados maestros de issues de otros repos.

## Dashboard

El dashboard es una capa pública de solo lectura:

- consulta issues abiertos mediante la API pública;
- no escribe ni modifica tareas;
- no reemplaza GitHub Issues ni Projects v2;
- muestra cinco Weeks desde la actual;
- separa hitos, carga y tareas sin fecha;
- arrastra vencidas abiertas a la Week actual en rojo.

URL:

```text
https://misaeln-pc1.github.io/capacita-task-hub/dashboard/
```

## Convención de ramas

Documentación:

```text
docs/task-hub-[objetivo]
docs/dashboard-[objetivo]
```

Features y correcciones:

```text
feature/task-hub-[objetivo]
fix/dashboard-[objetivo]
```

Nunca trabajar directo en `main`.
