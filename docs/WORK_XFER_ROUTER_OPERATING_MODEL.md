# WORK_XFER_ROUTER_OPERATING_MODEL

## Propósito

Definir cómo Task Hub debe asumir la operación permanente de ciclos XFER ejecutados con Work entre proyectos Capacita.

Global define el estándar. Task Hub opera la cola.

## Decisión operativa

- Work se usa como ejecutor/controlador de ciclos XFER.
- Task Hub mantiene vista operacional, estados, bloqueos, callbacks y seguimiento.
- GitHub issues/PRs son la fuente de verdad.
- Misael no debe actuar como router humano.
- Codex en VS Code se reserva para código, pruebas, comandos y debugging.

## Regla principal

```text
GitHub/Work primero. Misael no es router.
```

Si una tarea cruza proyectos, Task Hub debe preferir crear o actualizar issues XFER y callbacks antes de pedir a Misael copiar/pegar prompts.

## Flujo operativo

1. Proyecto origen crea issue maestro con `TASK-ID`.
2. Se crean issues XFER en proyectos destino.
3. Work controlador toma la cola.
4. Work lee contexto mínimo del repo destino.
5. Work ejecuta solo acciones verdes.
6. Work abre PR draft documental o documenta bloqueo.
7. Work publica callback en issue destino y maestro.
8. Task Hub actualiza estado.
9. Si todos los callbacks están READY, el origen pasa a síntesis.
10. Si hay riesgo o decisión, estado `NEEDS_MISAEL`.

## Estados Task Hub

```text
NEW
XFER_CREATED
WAITING_PROVIDER
PROVIDER_IN_PROGRESS
XFER_READY
READY_FOR_SYNTHESIS
SYNTHESIS_IN_PROGRESS
NEEDS_MISAEL
BLOCKED
READY_FOR_REVIEW
DONE
CANCELLED
```

## Campos mínimos de seguimiento

| Campo | Uso |
|---|---|
| `task_id` | ID único del ciclo |
| `origin_repo` | repo que solicita |
| `target_repo` | repo proveedor |
| `master_issue` | issue maestro |
| `xfer_issue` | issue destino |
| `status` | estado actual |
| `risk` | verde/amarillo/rojo |
| `output_file` | archivo generado |
| `branch` | rama no-main |
| `pr` | PR draft/revisión |
| `commit_sha` | evidencia |
| `callback_at` | fecha de callback |
| `needs_misael_reason` | decisión requerida |

## Acciones permitidas para Work vía Task Hub

Verde:

- leer issues/repos/PRs;
- crear issues XFER;
- crear/actualizar Markdown;
- crear ramas no-main;
- abrir PR draft;
- comentar callbacks;
- actualizar estado documental.

No permitido sin autorización:

- main;
- merge;
- código productivo;
- workflows;
- datos reales;
- secrets;
- Moodle/Zoho/Edge/Supabase/campañas reales;
- deploy;
- costos;
- acciones irreversibles.

## Concurrencia inicial

- máximo 2 Work paralelos;
- un Work por issue maestro;
- no ejecutar dos Work sobre el mismo `TASK-ID`;
- si detecta colisión, marcar `BLOCKED`.

## Callback estándar

```yaml
CALLBACK_XFER:
  source_repo:
  target_repo:
  task_id:
  status: READY | BLOCKED | NEEDS_MISAEL
  output_file:
  branch:
  commit_sha:
  pr:
  risks:
  pending:
  recommendation:
```

## Criterio para escalar a Misael

Escalar solo cuando se requiere:

- decisión de negocio;
- cambio de alcance;
- uso de datos reales;
- integración productiva;
- legal/normativa;
- costo;
- merge/main;
- conflicto entre proyectos;
- ambigüedad material.

No escalar para pedir que copie/pegue prompts entre proyectos.

## Relación con Global

Este documento implementa operativamente el estándar definido en:

- `misaeln-pc1/capacita-global-control/docs/WORK_XFER_ROUTER_STANDARD.md`
- `misaeln-pc1/capacita-global-control/docs/ANTI_ROUTER_HUMANO_STANDARD.md`

## Piloto de referencia

`GAME-EXCEL-BASICO-BLOCKS-001`:

- Learning Games creó issue maestro.
- Marketing generó brief comercial en PR draft.
- Diseño de Cursos generó brief curricular en PR draft.
- Work devolvió callbacks al issue maestro.
- Misael no actuó como router de copiar/pegar.

## Definition of Done del modelo

Task Hub podrá asumir control permanente cuando existan al menos 3 ciclos Work XFER con:

- reducción real de trabajo manual;
- callbacks completos;
- sin duplicados graves;
- sin colisión de ramas;
- sin tocar producción;
- PRs revisables;
- estados claros;
- baja corrección posterior.
