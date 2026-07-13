# Dashboard Live mediante GitHub API pública

## Estado

Piloto preparado en `feature/dashboard-live-public-api`.

## Objetivo

Mantener el diseño visual del Planificador Atlas, pero eliminar el ciclo de snapshots, workflows, PR automáticos y republicaciones por cada cambio de tarea.

## Arquitectura

```text
Abrir dashboard / pulsar Actualizar
→ JavaScript del navegador consulta GitHub Issues
→ normaliza estado, prioridad, riesgo, fecha y proyecto
→ redibuja indicadores, foco, filtros y tarjetas
```

Fuente consultada:

```text
GET https://api.github.com/repos/misaeln-pc1/capacita-task-hub/issues?state=open&per_page=100
```

## Operación

- consulta al abrir la página;
- botón `Actualizar ahora`;
- actualización automática cada cinco minutos mientras la pestaña está visible;
- las issues cerradas dejan de aparecer en la siguiente consulta;
- no se usa `snapshot.js`;
- no se usa token, secreto, Worker ni backend;
- no se escribe en GitHub desde el dashboard.

## Requisito

El repositorio debe ser público. Si GitHub responde `404`, el dashboard muestra un error visible y no presenta un snapshot antiguo como vigente.

## Privacidad

Al adoptar esta ruta quedan públicos:

- archivos del repositorio;
- títulos y cuerpos de issues;
- comentarios y metadatos públicos de GitHub;
- historial de commits, PR y Actions visible en el repositorio.

No registrar credenciales, secretos, datos personales críticos ni información comercial que no deba exponerse.

## Límites

- solo lectura;
- depende de la disponibilidad y límite público de GitHub API;
- una modificación del diseño todavía requiere PR y despliegue;
- una modificación de tarea no requiere PR ni despliegue: basta recargar o pulsar `Actualizar ahora`.

## Fallback

Si la exposición pública resulta inaceptable, volver el repositorio a privado y reemplazar la consulta directa por un Worker de solo lectura con secreto protegido.

## Validación mínima

```text
node --test dashboard/tests/live-dashboard-contract.test.mjs
```

La prueba verifica consulta pública, ausencia de snapshots y credenciales, actualización manual/periódica, fallo visible y filtros.
