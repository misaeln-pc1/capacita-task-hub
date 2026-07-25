# WORK_XFER_ISSUE_QUEUE_MODEL

## Propósito

Definir cómo Task Hub debe operar, a futuro, una cola de issues maestros Work XFER sin convertir a Misael en router humano.

## Decisión

El prompt operativo de Work debe vivir en el issue maestro. Misael no debe copiar prompts largos desde el proyecto originario hacia Work.

Instrucción mínima aceptada para ejecución inmediata:

```text
Revisa el issue maestro #N del repo [REPO] y ejecuta el prompt incorporado según el estándar Work XFER Router.
```

## Cola

Un issue entra a la cola cuando tiene:

- `TASK-ID` o `GAME-ID` único;
- repo origen;
- proveedores requeridos;
- prompt operativo incorporado;
- semáforo;
- callback esperado;
- estado `WORK_XFER_READY` o etiqueta `work-xfer-ready`.

## Operación de Task Hub

Task Hub debe mantener o consultar una vista de cola con:

| Campo | Uso |
|---|---|
| `task_id` | Identificador único del ciclo |
| `origin_repo` | Repo que requiere coordinación |
| `master_issue` | Issue maestro con prompt incorporado |
| `providers` | Repos destino |
| `status` | Estado operativo |
| `risk` | Semáforo actual |
| `work_run` | Work ejecutor asociado, si existe |
| `outputs` | PRs, archivos o callbacks generados |
| `human_gate` | Decisión pendiente de Misael |

## Estados mínimos

```text
WORK_XFER_READY
WORK_IN_PROGRESS
WAITING_PROVIDER
READY_FOR_SYNTHESIS
NEEDS_MISAEL
BLOCKED
READY_FOR_REVIEW
DONE
CANCELLED
```

## Reglas anti-router humano

1. No pedir a Misael copiar prompts entre proyectos.
2. No pedir a Misael avisar manualmente a repos proveedores si se puede crear issue XFER.
3. No pedir a Misael transportar callbacks si Work puede comentar en GitHub.
4. No entregar instrucciones sueltas si puede quedar un issue maestro trazable.
5. Detenerse solo ante falta de acceso, riesgo amarillo/rojo, cambio de alcance o decisión humana real.

## Ejecución inmediata

Mientras no exista trigger/API, Misael puede abrir Work manualmente y dar solo la instrucción mínima:

```text
Procesa el issue maestro #N de [REPO]. Ejecuta el prompt incorporado.
```

Esto no se considera router humano pesado porque Misael no transporta contenido entre proyectos; solo activa el ejecutor.

## Ejecución recurrente futura

Cuando exista capacidad disponible, Task Hub deberá revisar periódicamente:

- issues con `work-xfer-ready`;
- issues `NEEDS_MISAEL`;
- ciclos `WAITING_PROVIDER` vencidos;
- callbacks `READY` no integrados;
- PRs draft sin síntesis de origen.

## Criterio de cierre

Un ciclo no puede quedar `DONE` si:

- no existe callback;
- no existe archivo/PR o bloqueo trazable;
- se tocó `main`;
- falta decisión de Misael;
- se omitió evidencia;
- se ejecutó fuera de alcance.

## Relación con Global

Global define el estándar. Task Hub opera la cola. Los proyectos originarios crean issues maestros. Work ejecuta ciclos. Codex en VS Code se usa para código y pruebas.