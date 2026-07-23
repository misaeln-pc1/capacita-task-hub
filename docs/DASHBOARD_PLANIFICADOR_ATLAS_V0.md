# Dashboard Visual Planificador Atlas V0 — Histórico

## Estado

Esta arquitectura quedó **superada el 2026-07-14** por el Dashboard Planificador Atlas V1.

Documentación vigente:

```text
docs/DASHBOARD_PLANIFICADOR_ATLAS_V1.md
```

URL operativa:

```text
https://misaeln-pc1.github.io/capacita-task-hub/dashboard/
```

## Qué fue la V0

La V0 fue una primera capa visual portable creada para validar diseño y utilidad antes de conectar el dashboard a GitHub Issues.

Características históricas:

- snapshot manual de issues abiertos;
- HTML autocontenido;
- indicadores, foco inmediato, filtros y enlaces a GitHub;
- sin API GitHub en runtime;
- actualización manual del arreglo de tareas;
- ChatGPT Sites considerado como publicación posterior.

## Por qué fue reemplazada

El snapshot requería mantenimiento manual y podía quedar desactualizado. La V1 resolvió ese problema mediante:

- lectura directa de la API pública de GitHub;
- publicación en GitHub Pages;
- actualización al abrir, manual y periódica;
- navegación interna;
- Weeks ISO;
- hitos y carga semanal;
- arrastre de tareas vencidas abiertas;
- control de caché de CSS y JavaScript.

## Fuente oficial

La regla nunca cambió:

```text
GitHub Issues = fuente oficial
Dashboard = capa de lectura
```

## Valor histórico

La V0 permitió validar:

- la utilidad de una capa visual;
- la necesidad de separar hitos y tareas;
- la importancia de fechas absolutas;
- la necesidad de no duplicar gestión;
- el requisito de mantener GitHub como fuente de verdad.

## Estado de los componentes V0

| Componente | Estado |
|---|---|
| Snapshot embebido | Retirado como arquitectura vigente |
| Actualización manual | Reemplazada por API pública |
| ChatGPT Sites | Descartado para esta solución |
| Enlaces directos a GitHub | Reemplazados por detalle interno |
| Hero, foco y filtros | Reemplazados por cronología semanal |
| HTML/CSS/JS nativos | Conservados y modularizados |
| Solo lectura | Conservado |

## Evidencia de transición

- PR #41 conectó el dashboard a GitHub Issues.
- PR #42 habilitó la entrada de GitHub Pages.
- PR #43 restauró el detalle interno.
- PR #45–#47 implementaron semanas ISO y parser.
- PR #58 fijó cinco Weeks y compactó la portada.
- PR #60 implementó vencidas.
- PR #61 controló la caché.

Este archivo se conserva únicamente para trazabilidad histórica. No debe usarse para definir la arquitectura vigente.
