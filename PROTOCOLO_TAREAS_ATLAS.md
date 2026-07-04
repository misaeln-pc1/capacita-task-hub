# PROTOCOLO_TAREAS_ATLAS

## Propósito

Definir cómo se crean, clasifican, estiman y enrutan tareas dentro del **Sistema de Tareas Atlas**, usando:

- Repo: `capacita-task-hub`.
- GitHub Project: **Planificador Atlas**.
- Repos operativos: Moodle, Edge, Zoho, licitaciones, Diseño de Cursos y otros.

## Regla principal

> La tarea vive donde se ejecuta. El **Planificador Atlas** solo la organiza y la muestra.

## Decisión de ubicación

```text
¿La tarea tiene repo/proyecto dueño?
Sí -> crear issue en ese repo operativo + agregar al Planificador Atlas.
No -> crear issue en capacita-task-hub + agregar al Planificador Atlas.
```

## Tipos de tarea

| Tipo | Dónde vive | Rama/PR por defecto | Ejemplo |
|---|---|---:|---|
| Personal | `capacita-task-hub` | No | Comprar polera, ir al banco. |
| Administrativa | `capacita-task-hub` o repo asociado | No | Pagar hosting, llamar proveedor. |
| Seguimiento | Repo dueño o `capacita-task-hub` | No | Revisar respuesta proveedor. |
| Técnica | Repo operativo | Solo si modifica código/docs | Insertar videos Moodle. |
| Documental | Repo operativo o Global | Sí si cambia documentación oficial | Actualizar decisión o estándar. |
| Decisión | Repo dueño o Global | Sí si afecta criterio futuro | Comprar tema Moodle vs desarrollar. |
| Riesgo / bloqueo | Repo dueño o Global | Depende | SENCE, producción, datos, credenciales. |

## Regla sobre ramas y PR

Crear una tarea **no** requiere rama, PR ni merge.

Rama/PR aplica solo cuando:

- se modifica documentación oficial;
- se modifica código;
- se modifica estructura del repo;
- se registra una decisión relevante;
- se cambia una regla operativa;
- hay riesgo SENCE, producción, datos, dinero, credenciales o irreversibilidad;
- se necesita evidencia formal para continuidad o auditoría.

## Tareas personales

Las tareas personales funcionan como dictado simple.

Ejemplos:

```text
[Personal] Comprar polera
[Personal] Ir al banco a revisar cuenta corriente
[Personal] Viajar hoy en la tarde
```

Acción esperada:

```text
Issue directo en capacita-task-hub.
Visible en Planificador Atlas.
Sin rama.
Sin PR.
Sin merge.
Sin validación documental.
```

## Tareas derivadas de decisiones ya validadas

Si una decisión ya fue analizada, documentada y validada mediante PR o documento, la tarea posterior solo ejecuta la acción pendiente.

Ejemplo:

```text
Decisión validada:
No desarrollar tema Moodle propio; comprar tema compatible.

Tarea derivada:
[Moodle] Comprar tema Moodle definido en decisión X.
```

Acción esperada:

```text
Issue en repo Moodle.
Agregar al Planificador Atlas.
Referenciar PR/documento/decisión origen.
No crear nuevo PR solo para la tarea.
```

## Tareas que todavía son decisiones

Si algo todavía no está decidido, no debe registrarse como acción cerrada.

Ejemplo incorrecto:

```text
[Moodle] Comprar tema X
```

si aún no se validó compatibilidad, costo, licencia o SENCE.

Ejemplo correcto:

```text
[Moodle] Evaluar compra vs desarrollo de tema Moodle.
```

Luego de la decisión pueden nacer tareas ejecutivas:

```text
[Moodle] Comprar tema elegido.
[Moodle] Instalar tema en entorno controlado.
[Moodle] Validar compatibilidad con bloque SENCE.
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

Cada tarea relevante debería tener un origen claro.

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

1. Identificar si la tarea tiene repo dueño.
2. Si tiene repo dueño, crear issue en ese repo.
3. Si no tiene repo dueño, crear issue en `capacita-task-hub`.
4. Clasificar estado, prioridad, riesgo, responsable y siguiente acción.
5. Agregar o dejar lista para agregar al **Planificador Atlas**.
6. Si hay decisión previa, referenciar PR/documento/decisión origen.
7. Si falta decisión, registrar como `Pendiente de decisión` y no como acción cerrada.
8. Reportar enlace del issue y estado.

## Definition of Done de una tarea bien creada

- Título claro con proyecto o tipo.
- Repo correcto.
- Siguiente acción explícita.
- Responsable inicial.
- Prioridad inicial.
- Riesgo inicial.
- Origen/validación indicado si aplica.
- Estimación inicial si es P1/P2 o de esta semana.
- Visible o lista para agregar al **Planificador Atlas**.
