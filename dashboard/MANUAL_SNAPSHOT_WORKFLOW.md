# Workflow manual de actualización del snapshot — retirado

## Estado

**Retirado del flujo operativo el 2026-07-13.**

El workflow `Refresh dashboard snapshot` fue validado técnicamente, pero se descartó como mecanismo principal porque el dashboard publicado en ChatGPT Sites requería además un despliegue separado. El resultado era un ciclo demasiado manual para un tablero operativo.

## Decisión vigente

```text
GitHub Issues = fuente oficial de tareas
Planificador Atlas / GitHub Projects = dashboard operativo visual
ChatGPT Sites = no recomendado para operación diaria
```

El archivo ejecutable:

```text
.github/workflows/refresh-dashboard-snapshot.yml
```

queda eliminado mediante PR y, después del merge, ya no podrá ejecutarse desde GitHub Actions.

También se retira su prueba contractual específica:

```text
dashboard/tests/workflow-contract.test.mjs
```

## Evidencia histórica

El piloto demostró que:

- GitHub Actions podía regenerar y validar el snapshot;
- podía crear una rama y un PR draft sin escribir directamente en `main`;
- el snapshot actualizado no actualizaba automáticamente el Site publicado;
- la operación completa exigía workflow, PR, merge y nuevo despliegue del Site.

## Ruta operativa actual

Usar directamente el GitHub Project **Planificador Atlas**:

`https://github.com/users/misaeln-pc1/projects/4`

Las issues abiertas de `capacita-task-hub` ingresan mediante el Auto-add nativo del Project. Las vistas, filtros y agrupaciones se gestionan en GitHub Projects, sin snapshot ni despliegue adicional.

## Conservado

No se eliminan el HTML, `snapshot.json`, `snapshot.js` ni `predeploy.mjs`. Permanecen como evidencia histórica y posible base reutilizable para una futura solución dinámica distinta de ChatGPT Sites.
