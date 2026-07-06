# WORKFLOW_AUTO_ADD_TASK_HUB

## Propósito

Documentar la configuración del workflow Auto-add único para que **Planificador Atlas** capture las tareas ejecutables y seguimientos accionables creados en `capacita-task-hub`.

## Decisión

Usar un solo workflow Auto-add:

```text
Repository: misaeln-pc1/capacita-task-hub
Filter: is:issue is:open
```

## Qué captura este workflow

Captura issues abiertos de `capacita-task-hub`, principalmente:

- tareas ejecutivas;
- tareas personales;
- tareas administrativas accionables;
- seguimientos accionables.

## Qué no captura por diseño

No captura automáticamente los issues de repos operativos.

Por defecto, estos viven en el repo operativo correspondiente:

- ideas a evaluar;
- investigaciones;
- decisiones pendientes;
- riesgos estructurales;
- bloqueos de proyecto;
- épicas/iniciativas;
- incidentes graves.

## Por qué no usar un workflow por repo

GitHub Projects limita la cantidad de workflows Auto-add según el plan. Como Capacita tiene más repos activos que slots disponibles, no conviene gastar un workflow por Moodle, Edge, Zoho, Licitaciones, Diseño Cursos, etc.

## Arquitectura resultante

```text
Repo operativo = radar del proyecto
        |
        | genera tareas concretas
        v
capacita-task-hub = cola de ejecución
        |
        | Auto-add único
        v
Planificador Atlas = dashboard de ejecución
```

## Relación padre/hija

Cuando un issue del repo operativo genera tareas:

```text
Repo operativo #XX = issue padre
Task Hub #YY = tarea ejecutiva derivada
```

La tarea de Task Hub debe incluir:

```text
Issue padre:
Repo dueño:
Evidencia esperada:
```

El issue padre debe mantener una sección:

```markdown
## Tareas derivadas en Task Hub

- [ ] capacita-task-hub#YY — Descripción breve
```

## Qué no resuelve el workflow

El workflow Auto-add solo agrega el issue al Project. No garantiza completar automáticamente todos los campos personalizados.

Por eso cada tarea debe incluir en título, cuerpo y labels la información mínima:

```text
[Proyecto][Tarea] Título claro
Tipo: Tarea ejecutiva
Repo dueño:
Issue padre, si existe:
Prioridad:
Riesgo:
Siguiente acción:
```

## Dashboard de tareas

El dashboard diario debe filtrar:

```text
Tipo = Tarea ejecutiva
```

No debe usarse como radar completo de problemas del ecosistema. Para eso se revisan los issues de cada repo operativo y, si afecta varios proyectos, Global.

## Labels recomendadas en Task Hub

```text
tipo:tarea-ejecutiva
tipo:personal
tipo:administrativa
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

## Validación mínima

Para validar el workflow:

1. Crear un issue padre de análisis en un repo operativo.
2. Crear dos tareas ejecutivas derivadas en `capacita-task-hub`.
3. Confirmar que las tareas aparecen en **Planificador Atlas**.
4. Confirmar que el issue padre no desaparece del radar del repo operativo.
5. Confirmar vínculo bidireccional:
   - issue padre lista tareas Task Hub;
   - tareas Task Hub apuntan al issue padre.

## Riesgo

Verde/amarillo operativo.

- Verde: el workflow solo agrega tareas al Project.
- Amarillo: si se olvida vincular tareas con el issue padre, se pierde trazabilidad.

## Mitigación

Usar siempre `Issue padre` en Task Hub cuando la tarea derive de un problema, investigación, decisión, riesgo o épica de repo operativo.
