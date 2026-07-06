# TASK_STATUS

## Estado actual

Sistema de Tareas Atlas con bootstrap documental mergeado y ajuste de arquitectura en curso.

## Decisión vigente

El modelo operativo queda así:

```text
Task Hub = registro maestro de issues.
Planificador Atlas = tablero central.
Repo operativo = lugar de ejecución técnica si aplica.
```

Todos los issues de gestión se crean en:

```text
misaeln-pc1/capacita-task-hub
```

El **Planificador Atlas** los captura mediante un único Auto-add:

```text
Repository: misaeln-pc1/capacita-task-hub
Filter: is:issue is:open
```

## Objetivo inmediato

Actualizar la documentación para reflejar que:

- todos los issues abiertos de Task Hub entran al Planificador Atlas;
- no todos los issues son tareas ejecutivas;
- el campo `Tipo` separa tarea ejecutiva, idea, decisión, investigación, bloqueo e iniciativa;
- el dashboard diario filtra solo `Tipo = Tarea ejecutiva`;
- los proyectos operativos se declaran mediante `Proyecto operativo` y `Repo dueño`.

## Avances

- Repo `misaeln-pc1/capacita-task-hub` creado por Misael.
- GitHub Project **Planificador Atlas** creado manualmente por Misael.
- PR #1 mergeado.
- Issues iniciales #2, #3 y #4 creados.
- Auto-add único desde `capacita-task-hub` validado conceptualmente como ruta preferente.

## Pendientes inmediatos

| Pendiente | Responsable | Prioridad | Riesgo | Nota |
|---|---|---:|---|---|
| Revisar y mergear PR de ajuste de arquitectura centralizada | Misael | P1 | Verde | Actualiza protocolo, campos, flujo y decisiones. |
| Confirmar workflow Auto-add único | Misael | P1 | Verde | `is:issue is:open` desde `capacita-task-hub`. |
| Configurar campos de Capa 1 | Misael / Atlas guía | P1 | Verde | Incluye `Tipo`, `Repo dueño` y tiempo histórico mínimo. |
| Configurar vistas iniciales | Misael / Atlas guía | P1 | Verde | Dashboard tareas, Ideas, Decisiones, Bloqueadas, Por proyecto. |
| Registrar URL/número del Project | Misael | P1 | Verde | Para futura sincronización. |
| Crear primera carga controlada de issues reales | Atlas + Misael | P1 | Verde/Amarillo | Partir con pocos issues de distintos tipos. |
| Definir si se actualizará Global con nuevo repo/sistema | Atlas + Misael | P2 | Verde | Probable actualización posterior en `capacita-global-control`. |

## Próximo paso recomendado

1. Revisar y mergear el PR de ajuste centralizado.
2. Configurar Auto-add único desde Task Hub si no está confirmado.
3. Configurar campos y vistas.
4. Probar con un issue ejecutivo y un issue idea.
5. Ajustar antes de cargar backlog.

## Bloqueos

Ninguno documental. La limitación de workflows Auto-add se resuelve centralizando issues en Task Hub.

## No tocar todavía

- No crear automatizaciones por GitHub Actions.
- No ejecutar scripts.
- No conectar APIs.
- No modificar repos operativos masivamente.
- No crear issues espejo salvo necesidad técnica explícita.
