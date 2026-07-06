# PROTOCOLO_TAREAS_ATLAS

## Propósito

Definir cómo se crean, clasifican, estiman y enrutan issues dentro del **Sistema de Tareas Atlas**, usando:

- Repo maestro de gestión: `capacita-task-hub`.
- GitHub Project / panel central: **Planificador Atlas**.
- Repos operativos: Moodle, Edge, Zoho, licitaciones, Diseño de Cursos y otros.

## Regla principal vigente

> Todo issue de gestión se crea en `capacita-task-hub`. El repo operativo se declara dentro del issue. El **Planificador Atlas** muestra y ordena esos issues.

Esta regla reemplaza la versión inicial “la tarea vive donde se ejecuta” para resolver el límite de workflows Auto-add de GitHub Projects.

## Arquitectura

```text
Misael / proyecto GPT / Atlas
        |
        v
capacita-task-hub = issue maestro de gestión
        |
        | Auto-add único: is:issue is:open
        v
Planificador Atlas = tablero central
        |
        v
Repo operativo = lugar de ejecución técnica si aplica
```

## Issue no significa tarea ejecutiva

```text
Issue = unidad de gestión
Tipo = naturaleza del issue
Vista = forma de trabajo
```

Por lo tanto, el Planificador Atlas debe recibir todos los issues abiertos de `capacita-task-hub`, pero el dashboard de trabajo diario debe mostrar solo los issues cuyo `Tipo` corresponda a ejecución.

## Tipos de issue

| Tipo | Qué significa | Se ejecuta directo | Vista principal |
|---|---|---:|---|
| Tarea ejecutiva | Acción clara, ya decidida | Sí | Hoy / Ejecución |
| Idea a evaluar | Posible mejora o intuición no validada | No | Ideas |
| Decisión pendiente | Hay que elegir ruta antes de ejecutar | No | Decisiones |
| Investigación | Falta información para decidir | No | Investigación |
| Bloqueo / incidente | Algo impide avanzar o requiere atención | Depende | Bloqueadas |
| Épica / iniciativa | Tema grande que generará varias tareas | No directo | Iniciativas |
| Personal | Acción personal o administrativa simple | Sí, si está clara | Personales |
| Seguimiento | Esperar, revisar o confirmar algo | Depende | Seguimiento |

## Regla de workflow

El workflow Auto-add del **Planificador Atlas** debe ser amplio:

```text
Repository: misaeln-pc1/capacita-task-hub
Filter: is:issue is:open
```

No filtrar por `tipo:tarea-ejecutiva`, porque también deben entrar ideas, decisiones, investigaciones, bloqueos e iniciativas.

## Dashboard de tareas

El tablero puede contener todos los tipos, pero la vista de trabajo diario debe filtrar:

```text
Tipo = Tarea ejecutiva
Estado = Hoy / En curso / Próxima
```

Las ideas, decisiones e investigaciones deben quedar visibles en vistas separadas, no mezcladas con ejecución diaria.

## Campos obligatorios para issues operativos

Todo issue que se refiera a un proyecto operativo debe incluir:

```text
Proyecto operativo:
Repo dueño:
Tipo:
Prioridad:
Riesgo:
Responsable:
Estado:
Siguiente acción:
Origen / Validación:
Tiempo estimado inicial:
Evidencia esperada:
```

`Repo dueño` no significa que el issue viva en ese repo. Significa que la ejecución, PR, commit o documentación técnica ocurrirá allí si el issue madura a ejecución.

## Regla sobre ramas y PR

Crear un issue en `capacita-task-hub` **no** requiere rama, PR ni merge.

Rama/PR aplica solo cuando:

- se modifica documentación oficial;
- se modifica código;
- se modifica estructura de un repo;
- se registra una decisión relevante;
- se cambia una regla operativa;
- hay riesgo SENCE, producción, datos, dinero, credenciales o irreversibilidad;
- se necesita evidencia formal para continuidad o auditoría.

## Issues personales

Los issues personales funcionan como dictado simple.

Ejemplos:

```text
[Personal][Tarea] Comprar polera
[Personal][Tarea] Ir al banco a revisar cuenta corriente
[Personal][Tarea] Viajar hoy en la tarde
```

Acción esperada:

```text
Issue directo en capacita-task-hub.
Auto-add lo lleva al Planificador Atlas.
Sin rama.
Sin PR.
Sin merge.
Sin validación documental.
```

## Tareas ejecutivas

Una tarea ejecutiva es una acción clara y ya decidida.

Ejemplo:

```text
[Moodle][Tarea] Subir cinco videos al módulo Access M3
```

Debe indicar:

```text
Tipo: Tarea ejecutiva
Proyecto operativo: Moodle
Repo dueño: misaeln-pc1/capacita-learnops-moodle
Siguiente acción: preparar ejecución controlada
Evidencia esperada: PR, commit, validación visual o checklist según aplique
```

Puede pasar a ejecución técnica o manual.

## Ideas a evaluar

Una idea no se ejecuta directo.

Ejemplo:

```text
[Moodle][Idea] Evaluar autenticación diferenciada por módulo
```

Debe indicar:

```text
Tipo: Idea a evaluar
Estado: Inbox / Pendiente de decisión
Siguiente acción: definir problema, alternativas e impacto
Origen / Validación: Idea a evaluar
```

No se manda a Copilot/Codex ni se convierte en PR técnico hasta madurar.

## Decisiones pendientes

Si algo todavía no está decidido, no debe redactarse como acción cerrada.

Ejemplo incorrecto:

```text
[Moodle][Tarea] Comprar tema X
```

si aún no se validó compatibilidad, costo, licencia o SENCE.

Ejemplo correcto:

```text
[Moodle][Decisión] Evaluar compra vs desarrollo de tema Moodle
```

Luego de la decisión pueden nacer tareas ejecutivas:

```text
[Moodle][Tarea] Comprar tema elegido
[Moodle][Tarea] Instalar tema en entorno controlado
[Moodle][Tarea] Validar compatibilidad con bloque SENCE
```

## Flujo de maduración

```text
Idea
  -> Investigación / evaluación
  -> Decisión
  -> Tareas ejecutivas
  -> PR / commit / evidencia
```

## Issue operativo espejo

Por defecto, no se crea issue en el repo operativo.

Solo se permite crear un issue espejo en el repo operativo cuando:

- un agente técnico lo necesita explícitamente;
- PR Factory del repo trabaja desde issues locales;
- Copilot/Codex requiere el issue en el repo para operar;
- el repo necesita trazabilidad local por riesgo o auditoría.

Si se crea issue espejo, debe vincularse:

```text
Task Hub #XX = issue maestro
Repo operativo #YY = issue operativo espejo
PR #ZZ = evidencia de ejecución
```

## Verbos recomendados

| Verbo | Significado |
|---|---|
| Comprar | Acción ya decidida. |
| Evaluar | Decisión pendiente. |
| Validar | Comprobación requerida. |
| Investigar | Exploración. |
| Implementar | Ejecución técnica. |
| Revisar | Control o auditoría. |
| Preparar | Trabajo previo. |
| Esperar | Dependencia externa. |

## Campo clave: Origen / Validación

Valores recomendados:

```text
Dictado simple
Derivado de decisión validada
Derivado de PR
Pendiente de decisión
Idea a evaluar
Incidente / bloqueo
```

## Semáforo

| Semáforo | Uso | Acción |
|---|---|---|
| Verde | Personal, administrativo simple, documental reversible | Crear issue y avanzar. |
| Amarillo | Proyecto, datos, SENCE, CRM, Moodle, producción cercana, dinero menor | Crear issue con control y evidencia. |
| Rojo | Credenciales, producción irreversible, legal, dinero relevante, datos personales críticos, merge/main | Detener y pedir aprobación humana. |

## Flujo cuando Misael dice “agrégalo al Planificador”

1. Crear issue maestro en `capacita-task-hub`.
2. Definir `Tipo`: tarea ejecutiva, idea, decisión, investigación, bloqueo, épica, personal o seguimiento.
3. Si corresponde a un proyecto, indicar `Proyecto operativo` y `Repo dueño`.
4. Clasificar estado, prioridad, riesgo, responsable y siguiente acción.
5. Registrar tiempo estimado inicial si es P1/P2, repetitivo o útil para historial.
6. Si es idea/decisión/investigación, no redactar como ejecución directa.
7. Si es tarea ejecutiva, indicar evidencia esperada y repo de ejecución.
8. Reportar enlace del issue.
9. Si el Auto-add está activo, el issue entrará al **Planificador Atlas** automáticamente.

## Definition of Done de un issue bien creado

- Título claro con `[Proyecto][Tipo]`.
- Issue creado en `capacita-task-hub`.
- Tipo correcto.
- Proyecto operativo indicado si aplica.
- Repo dueño indicado si aplica.
- Siguiente acción explícita.
- Responsable inicial.
- Prioridad inicial.
- Riesgo inicial.
- Origen/validación indicado si aplica.
- Estimación inicial si es P1/P2, repetitivo o de esta semana.
- Evidencia esperada si es tarea ejecutiva.
