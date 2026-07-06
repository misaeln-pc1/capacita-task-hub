# WORKFLOW_AUTO_ADD_TASK_HUB

## Propósito

Documentar la configuración del workflow Auto-add único para que **Planificador Atlas** capture todos los issues abiertos desde `capacita-task-hub`.

## Decisión

Usar un solo workflow Auto-add:

```text
Repository: misaeln-pc1/capacita-task-hub
Filter: is:issue is:open
```

## Por qué no usar un workflow por repo

GitHub Projects limita la cantidad de workflows Auto-add según el plan. Como Capacita tiene más repos activos que slots disponibles, no conviene gastar un workflow por Moodle, Edge, Zoho, Licitaciones, Diseño Cursos, etc.

## Arquitectura resultante

```text
Issue maestro: capacita-task-hub
        |
        | Auto-add único
        v
Planificador Atlas
        |
        v
Repo dueño declarado dentro del issue
```

## Qué entra al Planificador Atlas

Todos los issues abiertos de `capacita-task-hub`, incluyendo:

- tareas ejecutivas;
- ideas a evaluar;
- decisiones pendientes;
- investigaciones;
- bloqueos/incidentes;
- épicas/iniciativas;
- tareas personales;
- seguimientos administrativos.

## Qué no resuelve el workflow

El workflow Auto-add solo agrega el issue al Project. No garantiza completar automáticamente todos los campos personalizados.

Por eso cada issue debe incluir en título, cuerpo y labels la información mínima:

```text
[Proyecto][Tipo] Título claro
Proyecto operativo:
Repo dueño:
Tipo:
Prioridad:
Riesgo:
Siguiente acción:
```

## Dashboard de tareas

Como entran todos los tipos de issue, el dashboard diario debe filtrar:

```text
Tipo = Tarea ejecutiva
```

Las ideas, decisiones, investigaciones y bloqueos deben vivir en vistas separadas.

## Labels recomendadas

```text
tipo:tarea-ejecutiva
tipo:idea
tipo:decision
tipo:investigacion
tipo:bloqueo
tipo:epica
tipo:personal
tipo:seguimiento

proyecto:moodle
proyecto:edge
proyecto:zoho
proyecto:licitaciones
proyecto:diseno-cursos
proyecto:global
proyecto:personal

riesgo:verde
riesgo:amarillo
riesgo:rojo

prioridad:p1
prioridad:p2
prioridad:p3
```

## Excepción: issue operativo espejo

No crear issues en repos operativos por defecto.

Crear issue operativo espejo solo si:

- Copilot/Codex/PR Factory lo necesita;
- el repo requiere trazabilidad local;
- el riesgo técnico lo exige;
- Misael lo pide explícitamente.

Vinculación requerida:

```text
Task Hub #XX -> issue maestro
Repo operativo #YY -> issue espejo
PR #ZZ -> evidencia
```

## Validación mínima

Para validar el workflow:

1. Crear un issue nuevo en `capacita-task-hub`.
2. Confirmar que aparece en **Planificador Atlas**.
3. Confirmar que no se filtra por tipo.
4. Completar o ajustar campos del Project manualmente si el Auto-add no los llena.
5. Probar al menos:
   - un issue `Tipo = Tarea ejecutiva`;
   - un issue `Tipo = Idea a evaluar`.

## Riesgo

Verde/amarillo operativo.

- Verde: el workflow solo agrega issues al Project.
- Amarillo: si se confunde issue con tarea ejecutiva y se ejecuta una idea inmadura.

## Mitigación

Usar siempre `Tipo` y vistas separadas.
