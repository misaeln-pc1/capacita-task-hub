# CAMPOS_PLANIFICADOR_ATLAS

## Propósito

Definir los campos recomendados para el GitHub Project **Planificador Atlas**.

El Project recibe automáticamente los issues abiertos de `capacita-task-hub` mediante un único workflow Auto-add. En este modelo, `capacita-task-hub` contiene principalmente tareas ejecutables, tareas personales, administrativas y seguimientos accionables.

Las ideas, investigaciones, decisiones, riesgos, bloqueos y épicas viven por defecto en el repo operativo correspondiente y pueden generar tareas ejecutables en Task Hub.

## Regla principal

```text
Planificador Atlas = dashboard de ejecución.
Task Hub = tareas ejecutables y seguimientos accionables.
Repo operativo = radar de ideas, problemas, riesgos y decisiones.
```

## Campos iniciales obligatorios — Capa 1

| Campo | Tipo sugerido | Valores sugeridos | Uso |
|---|---|---|---|
| Estado | Single select | Inbox, Hoy, Próxima, En curso, Bloqueada, Cerrada | Flujo básico de ejecución. |
| Proyecto | Single select | Task Hub, Personal, Global, Moodle, Edge, Zoho, Licitaciones, Diseño Cursos, Mercado Público, Otro | Frente operativo o área. |
| Tipo | Single select | Tarea ejecutiva, Personal, Administrativa, Seguimiento accionable | Naturaleza de lo que sí entra al dashboard de ejecución. |
| Prioridad | Single select | P1, P2, P3 | Orden de atención. |
| Riesgo | Single select | Verde, Amarillo, Rojo | Semáforo operativo. |
| Responsable | Single select o text | Misael, Atlas, Codex, Copilot, Jules, Proveedor, Cliente, Otro | Quién debe mover la tarea. |
| Fecha objetivo | Date | Fecha | Cuándo revisarla o completarla. |
| Siguiente acción | Text | Acción concreta | Qué se hace ahora. |
| Origen / Validación | Single select | Dictado simple, Derivado de issue padre, Derivado de decisión validada, Derivado de PR, Incidente/Bloqueo | Trazabilidad de por qué existe. |
| Repo dueño | Text | `owner/repo` | Repo donde ocurre la ejecución/PR/commit si aplica. |
| Issue padre | Text o link | URL o `repo#número` | Issue del repo operativo que originó la tarea. |

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
| PR / Decisión origen | Link al PR, documento o decisión que generó la tarea. |
| PR/commit resultado | Evidencia de ejecución. |
| Bloqueo | Texto breve del bloqueo operativo. |
| Dependencia | Persona, proveedor, repo o decisión de la que depende. |
| Fecha revisión | Fecha para revisar si sigue vigente. |

## Vistas iniciales recomendadas

| Vista | Filtro/agrupación |
|---|---|
| Dashboard tareas | `Tipo = Tarea ejecutiva` y `Estado` en Hoy/En curso/Próxima. |
| Hoy | `Tipo = Tarea ejecutiva` + `Estado = Hoy`. |
| Semana | `Tipo = Tarea ejecutiva` + `Estado` en Hoy/Próxima + fecha cercana. |
| Bloqueadas | `Estado = Bloqueada`. |
| Por proyecto | Agrupar por `Proyecto`. |
| Personales | `Tipo = Personal` o `Proyecto = Personal`. |
| Seguimientos | `Tipo = Seguimiento accionable`. |
| Riesgo | `Riesgo = Amarillo` o `Rojo`. |
| Con issue padre | `Issue padre` no vacío. |

## Qué no debe vivir en el Planificador por defecto

Estos elementos viven en el repo operativo, no en Task Hub:

```text
Idea a evaluar
Investigación
Decisión pendiente
Riesgo estructural
Bloqueo del proyecto
Épica / iniciativa
Incidente grave
```

Cuando cualquiera de esos elementos genere acciones concretas, esas acciones sí se crean en Task Hub como tareas ejecutivas y se vinculan al issue padre.

## Labels recomendadas en `capacita-task-hub`

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

## Labels recomendadas en repos operativos

```text
tipo:idea
tipo:investigacion
tipo:decision
tipo:riesgo
tipo:bloqueo
tipo:epica
tipo:incidente

estado:analisis
estado:en-descomposicion
estado:con-tareas-activas
estado:bloqueado
estado:resuelto

riesgo:verde
riesgo:amarillo
riesgo:rojo
```

## Regla anti-sobrecarga

No llenar todos los campos para cada tarea desde el día 1.

Mínimo para tareas simples:

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
Issue padre si existe
Prioridad
Riesgo
Responsable
Siguiente acción
Tiempo estimado inicial
Confianza estimación
Evidencia esperada
```

Mínimo para issue padre en repo operativo:

```text
Título
Tipo = Idea / Investigación / Decisión / Riesgo / Bloqueo / Épica
Problema o pregunta abierta
Riesgo
Siguiente acción de análisis
Tareas derivadas en Task Hub, si existen
```
