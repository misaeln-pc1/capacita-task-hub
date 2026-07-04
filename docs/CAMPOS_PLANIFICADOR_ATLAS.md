# CAMPOS_PLANIFICADOR_ATLAS

## Propósito

Definir los campos recomendados para el GitHub Project **Planificador Atlas**.

Este documento describe el estándar. La configuración visual del Project puede hacerse manualmente en GitHub o por CLI/API cuando esté disponible.

## Campos iniciales obligatorios — Capa 1

| Campo | Tipo sugerido | Valores sugeridos | Uso |
|---|---|---|---|
| Estado | Single select | Inbox, Hoy, Próxima, En curso, Bloqueada, Cerrada | Flujo básico de trabajo. |
| Proyecto | Single select | Task Hub, Moodle, Edge, Zoho, Licitaciones, Diseño Cursos, Global, Personal, Otro | Agrupar por frente. |
| Tipo | Single select | Personal, Administrativa, Seguimiento, Técnico, Documental, Decisión, Riesgo/Bloqueo | Separar tarea simple de decisión. |
| Prioridad | Single select | P1, P2, P3 | Orden de atención. |
| Riesgo | Single select | Verde, Amarillo, Rojo | Semáforo operativo. |
| Responsable | Single select o text | Misael, Atlas, Codex, Copilot, Jules, Proveedor, Cliente, Otro | Quién debe mover la tarea. |
| Fecha objetivo | Date | Fecha | Cuándo revisarla o completarla. |
| Siguiente acción | Text | Acción concreta | Qué se hace ahora. |
| Origen / Validación | Single select | Dictado simple, Derivado de decisión validada, Derivado de PR, Pendiente de decisión, Idea a evaluar, Incidente/Bloqueo | Evita ejecutar ideas no validadas. |

## Campos de planificación — Capa 2

| Campo | Tipo sugerido | Valores sugeridos | Uso |
|---|---|---|---|
| Tamaño estimado | Single select | XS, S, M, L, XL, XXL | Tamaño práctico. |
| Tiempo activo Misael | Single select | 10 min, 30 min, 1 h, 2 h, medio día, día completo | Carga humana real. |
| Tiempo IA/agente | Single select | Inmediato, 30 min, 1 h, varias iteraciones | Carga de ejecución asistida. |
| Confianza estimación | Single select | Alta, Media, Baja | Calidad de la estimación. |
| Causa incertidumbre | Single select o text | Definición, acceso, datos, API, proveedor, SENCE, revisión humana, otra | Por qué podría demorar más. |

## Campos de automatización — Capa 3

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
| Repo dueño | Útil si el Project mezcla muchos repos. |
| PR / Decisión origen | Link al PR, documento o decisión que generó la tarea. |
| Bloqueo | Texto breve del bloqueo. |
| Dependencia | Persona, proveedor, repo o decisión de la que depende. |
| Fecha revisión | Fecha para revisar si sigue vigente. |

## Vistas iniciales recomendadas

| Vista | Filtro/agrupación |
|---|---|
| Hoy | Estado = Hoy. |
| Semana | Estado en Hoy/Próxima y Fecha objetivo cercana. |
| Bloqueadas | Estado = Bloqueada. |
| Por proyecto | Agrupar por Proyecto. |
| Personales | Proyecto = Personal o repo = Task Hub. |
| Riesgo | Riesgo = Amarillo/Rojo. |
| Automatizables | Automatizable = Sí/Parcial. |
| Pendiente de decisión | Origen / Validación = Pendiente de decisión. |

## Regla anti-sobrecarga

No llenar todos los campos para cada tarea desde el día 1.

Mínimo para tareas simples:

```text
Título
Estado
Proyecto/Tipo
Prioridad
Siguiente acción
```

Mínimo para tareas P1/P2:

```text
Título
Estado
Proyecto
Tipo
Prioridad
Riesgo
Responsable
Siguiente acción
Tiempo activo Misael
Confianza estimación
```

Mínimo para tareas con riesgo amarillo/rojo:

```text
Título
Repo dueño
Riesgo
Origen / Validación
Dependencia
Siguiente acción
Aprobación humana requerida
Referencia a PR/decisión si existe
```
