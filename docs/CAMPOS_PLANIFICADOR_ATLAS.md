# CAMPOS_PLANIFICADOR_ATLAS

## Propósito

Definir los campos recomendados para el GitHub Project **Planificador Atlas**.

El Project recibe automáticamente todos los issues abiertos de `capacita-task-hub` mediante un único workflow Auto-add. Los campos y vistas separan tareas ejecutivas, ideas, decisiones, investigaciones, bloqueos e iniciativas.

## Regla principal

```text
Todos los issues abiertos entran al Planificador Atlas.
No todos los issues son tareas ejecutivas.
El campo Tipo define cómo se tratan.
```

## Campos iniciales obligatorios — Capa 1

| Campo | Tipo sugerido | Valores sugeridos | Uso |
|---|---|---|---|
| Estado | Single select | Inbox, Hoy, Próxima, En curso, Bloqueada, Cerrada | Flujo básico de trabajo. |
| Proyecto | Single select | Task Hub, Personal, Global, Moodle, Edge, Zoho, Licitaciones, Diseño Cursos, Mercado Público, Otro | Frente operativo o área. |
| Tipo | Single select | Tarea ejecutiva, Idea a evaluar, Decisión pendiente, Investigación, Bloqueo/Incidente, Épica/Iniciativa, Personal, Seguimiento, Administrativa | Distingue ejecución de ideas o decisiones. |
| Prioridad | Single select | P1, P2, P3 | Orden de atención. |
| Riesgo | Single select | Verde, Amarillo, Rojo | Semáforo operativo. |
| Responsable | Single select o text | Misael, Atlas, Codex, Copilot, Jules, Proveedor, Cliente, Otro | Quién debe mover el issue. |
| Fecha objetivo | Date | Fecha | Cuándo revisarlo o completarlo. |
| Siguiente acción | Text | Acción concreta | Qué se hace ahora. |
| Origen / Validación | Single select | Dictado simple, Derivado de decisión validada, Derivado de PR, Pendiente de decisión, Idea a evaluar, Incidente/Bloqueo | Evita ejecutar ideas no validadas. |
| Repo dueño | Text | `owner/repo` | Repo donde ocurrirá ejecución/PR/commit si aplica. |

## Campos de tiempo histórico desde el día 1

Aunque la Capa 2 formal venga después, estos campos se crean desde el inicio para acumular historial útil.

| Campo | Tipo sugerido | Valores sugeridos | Uso |
|---|---|---|---|
| Tiempo estimado inicial | Single select | 10 min, 30 min, 1 h, 2 h, medio día, día completo, más de un día | Estimación rápida inicial. |
| Tiempo real observado | Single select o number/text | 10 min, 30 min, 1 h, 2 h, medio día, día completo, más de un día | Registro al cerrar o revisar. |
| Confianza estimación | Single select | Alta, Media, Baja | Calidad de la estimación. |
| Causa desviación | Single select o text | Definición, acceso, datos, API, proveedor, SENCE, revisión humana, otra | Por qué tomó más/menos. |

## Campos de planificación — Capa 2 futura

| Campo | Tipo sugerido | Valores sugeridos | Uso |
|---|---|---|---|
| Tamaño estimado | Single select | XS, S, M, L, XL, XXL | Tamaño práctico. |
| Tiempo IA/agente | Single select | Inmediato, 30 min, 1 h, varias iteraciones | Carga de ejecución asistida. |
| Causa incertidumbre | Single select o text | Definición, acceso, datos, API, proveedor, SENCE, revisión humana, otra | Por qué podría demorar más. |

## Campos de automatización — Capa 3 futura

| Campo | Tipo sugerido | Valores sugeridos | Uso |
|---|---|---|---|
| Automatizable | Single select | No, Parcial, Sí | Si puede delegarse. |
| Ejecutor sugerido | Single select | Misael, Atlas, Codex, Copilot, Jules, API, Proveedor | Quién debería ejecutar. |
| Tipo de ejecución | Single select | Prompt, PR, Script, Checklist, Revisión, Extracción, Manual | Forma de trabajo. |
| Requiere validación humana | Single select | Sí, No | Control antes de cierre. |
| Riesgo automatización | Single select | Verde, Amarillo, Rojo | Semáforo específico de delegación. |

## Campos opcionales útiles

| Campo | Uso |
|---|---|
| PR / Decisión origen | Link al PR, documento o decisión que generó el issue. |
| Issue operativo espejo | Link a issue en repo técnico si existe. |
| PR/commit resultado | Evidencia de ejecución. |
| Bloqueo | Texto breve del bloqueo. |
| Dependencia | Persona, proveedor, repo o decisión de la que depende. |
| Fecha revisión | Fecha para revisar si sigue vigente. |

## Vistas iniciales recomendadas

| Vista | Filtro/agrupación |
|---|---|
| Dashboard tareas | `Tipo = Tarea ejecutiva` y `Estado` en Hoy/En curso/Próxima. |
| Hoy | `Tipo = Tarea ejecutiva` + `Estado = Hoy`. |
| Semana | `Tipo = Tarea ejecutiva` + `Estado` en Hoy/Próxima + fecha cercana. |
| Bloqueadas | `Estado = Bloqueada` o `Tipo = Bloqueo/Incidente`. |
| Ideas | `Tipo = Idea a evaluar`. |
| Decisiones | `Tipo = Decisión pendiente`. |
| Investigación | `Tipo = Investigación`. |
| Iniciativas | `Tipo = Épica/Iniciativa`. |
| Por proyecto | Agrupar por `Proyecto`. |
| Personales | `Tipo = Personal` o `Proyecto = Personal`. |
| Riesgo | `Riesgo = Amarillo` o `Rojo`. |
| Pendiente de decisión | `Origen / Validación = Pendiente de decisión` o `Tipo = Decisión pendiente`. |

## Labels recomendadas en `capacita-task-hub`

Los labels ayudan a filtrar aunque los campos del Project no estén completos.

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

## Regla anti-sobrecarga

No llenar todos los campos para cada issue desde el día 1.

Mínimo para issues simples:

```text
Título
Tipo
Estado
Proyecto
Prioridad
Siguiente acción
```

Mínimo para tareas ejecutivas P1/P2:

```text
Título
Tipo = Tarea ejecutiva
Estado
Proyecto
Repo dueño si aplica
Prioridad
Riesgo
Responsable
Siguiente acción
Tiempo estimado inicial
Confianza estimación
Evidencia esperada
```

Mínimo para ideas/decisiones:

```text
Título
Tipo = Idea a evaluar / Decisión pendiente
Proyecto
Repo dueño si aplica
Riesgo
Origen / Validación
Problema o pregunta abierta
Siguiente acción de análisis
```

Mínimo para riesgo amarillo/rojo:

```text
Título
Tipo
Proyecto
Repo dueño si aplica
Riesgo
Origen / Validación
Dependencia
Siguiente acción
Aprobación humana requerida
Referencia a PR/decisión si existe
```
