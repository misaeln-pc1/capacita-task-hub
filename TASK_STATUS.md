# TASK_STATUS

## Estado actual

El **Sistema de Tareas Atlas** está operativo.

El **Planificador Atlas V1** está publicado en GitHub Pages, consulta issues abiertos en vivo y fue validado visualmente por Misael el 2026-07-14.

URL:

```text
https://misaeln-pc1.github.io/capacita-task-hub/dashboard/
```

## Modelo operativo vigente

```text
Repo operativo = problemas, ideas, riesgos, decisiones, investigaciones e incidentes.
Task Hub = tareas ejecutables, personales, administrativas y seguimientos.
Planificador Atlas = GitHub Project central.
Dashboard V1 = capa cronológica de lectura publicada en GitHub Pages.
```

Regla crítica:

```text
El problema vive en el repo operativo.
La tarea ejecutable vive en Task Hub.
La evidencia técnica vive en el repo dueño.
```

## Dashboard Planificador Atlas V1

- Fuente oficial: issues abiertos de `misaeln-pc1/capacita-task-hub`.
- Lectura: API pública de GitHub.
- Escritura: ninguna.
- Autenticación: sin token ni secretos.
- Hosting: GitHub Pages desde `main` y raíz.
- Vista temporal: ISO 8601, lunes a domingo.
- Ventana: Week actual y cuatro siguientes.
- Bloques: hitos por semana y carga de tareas por semana.
- Weeks vacías: permanecen visibles.
- Navegación: Week → listado → detalle interno.
- Tareas sin fecha: bloque separado.
- Vencidas abiertas: se arrastran a la Week actual, conservan fecha original y se marcan en rojo.
- Actualización: al abrir, botón manual y cada cinco minutos.
- Caché: CSS y JavaScript versionados.

Documentación:

```text
docs/DASHBOARD_PLANIFICADOR_ATLAS_V1.md
```

## Evidencia de implementación

| Elemento | Estado |
|---|---|
| PR #41 — lectura en vivo | Mergeado |
| PR #42 — entrada raíz Pages | Mergeado |
| PR #43 — detalle interno | Mergeado |
| PR #45–#47 — Weeks ISO, navegación y parser | Mergeados |
| PR #58 — cinco Weeks y portada compacta | Mergeado |
| PR #60 — arrastre de vencidas | Mergeado |
| PR #61 — invalidación de caché | Mergeado |
| Issue #44 — diseño semanal | Cerrada |
| Issue #59 — tareas vencidas | Cerrada tras validación visual |
| Issues #48–#57 — pruebas controladas | Cerradas |

Último merge funcional validado:

```text
95ea416f57489e32d1c675c6c65c9c90c2092277
```

## Fuente de verdad y precedencia

```text
Estado open/closed de la issue
→ clasificación y fechas en el cuerpo
→ Planificador Atlas / Projects v2
→ dashboard de lectura
```

No declarar una tarea completada sin evidencia y cierre de la issue.

## Operación diaria

1. Crear o actualizar la issue con clasificación, siguiente acción y fechas.
2. Abrir el dashboard o pulsar `Actualizar ahora`.
3. Revisar Week actual, hitos, carga y vencidas.
4. Reprogramar tareas vencidas o cerrarlas con evidencia.
5. Dictar modificaciones a Atlas para que actualice la issue oficial.

## Pendientes de implementación del dashboard

Ninguno en esta etapa.

Las nuevas observaciones se tratarán como cambios posteriores mediante issue, rama y PR.

## Limitaciones conocidas

- El repo y sus issues son públicos.
- La API pública tiene límite de solicitudes no autenticadas.
- GitHub Pages puede tardar en publicar después de un merge.
- Los cambios de recursos deben actualizar su versión de caché.
- El conector actual no edita campos internos de GitHub Projects v2.
- Las tareas sin fecha no entran en una Week hasta ser planificadas.

## No tocar sin autorización

- No trabajar directo en `main`.
- No hacer merge automático.
- No crear Actions, workflows, scripts o integraciones.
- No agregar credenciales o secretos.
- No cambiar la arquitectura en vivo sin issue y validación.

## Próximo paso

Usar el dashboard durante la operación real. Registrar futuras mejoras solo cuando exista una necesidad observada durante el uso.
