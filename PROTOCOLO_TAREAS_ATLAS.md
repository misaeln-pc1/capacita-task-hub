# PROTOCOLO_TAREAS_ATLAS

## Propósito

Definir cómo se crean, clasifican, estiman y enlazan tareas e issues dentro del **Sistema de Tareas Atlas**, usando:

- Repo de tareas ejecutables: `capacita-task-hub`.
- GitHub Project / panel central: **Planificador Atlas**.
- Repos operativos: Moodle, Edge, Zoho, licitaciones, Diseño de Cursos y otros.

## Regla principal vigente

> El problema vive en el repo. La tarea ejecutable vive en Task Hub. La evidencia técnica vive en el repo.

Esta regla reemplaza la versión intermedia que centralizaba todos los issues en `capacita-task-hub`.

## Arquitectura

```text
Repo operativo = radar del proyecto
  - ideas
  - investigaciones
  - decisiones
  - riesgos
  - bloqueos
  - épicas / iniciativas
        |
        | genera tareas ejecutables
        v
capacita-task-hub = cola maestra de ejecución
  - tareas ejecutables
  - personales
  - administrativas
  - seguimientos accionables
        |
        | Auto-add único: is:issue is:open
        v
Planificador Atlas = dashboard de ejecución
```

## Regla por tipo de issue

| Tipo de issue | Dónde vive por defecto | Motivo |
|---|---|---|
| Tarea ejecutiva | `capacita-task-hub` | Debe entrar al Planificador Atlas y ser gestionable como acción. |
| Personal | `capacita-task-hub` | Dictado simple / gestión personal. |
| Administrativa accionable | `capacita-task-hub` | Acción concreta, sin repo técnico. |
| Seguimiento accionable | `capacita-task-hub` | Revisar, esperar o confirmar algo. |
| Idea a evaluar | Repo operativo | Debe quedar en el radar natural del proyecto. |
| Investigación | Repo operativo | El análisis futuro del repo debe verla. |
| Decisión pendiente | Repo operativo o Global | Condiciona el proyecto o más de un proyecto. |
| Riesgo / bloqueo | Repo operativo; Global si es transversal | No puede quedar oculto fuera del repo afectado. |
| Épica / iniciativa | Repo operativo | Tema grande que puede generar múltiples tareas. |
| Incidente grave | Repo operativo; Global si afecta varios proyectos | Requiere trazabilidad local y revisión posterior. |

## Regla de workflow

El workflow Auto-add del **Planificador Atlas** se mantiene simple y apunta solo a `capacita-task-hub`:

```text
Repository: misaeln-pc1/capacita-task-hub
Filter: is:issue is:open
```

Esto significa que el Planificador Atlas captura tareas ejecutables y seguimientos accionables, no todo el radar de problemas de cada repo.

## Cómo se conectan repo operativo y Task Hub

Cuando un issue del repo operativo genera tareas ejecutables:

1. El issue padre permanece abierto en el repo operativo.
2. Se crean tareas hijas en `capacita-task-hub`.
3. Cada tarea hija referencia el issue padre.
4. El issue padre mantiene una lista de tareas derivadas.
5. El estado global del problema se reconstruye revisando el issue padre y sus tareas hijas.

```text
Repo Moodle #25 = [Auth][Investigación] Analizar cambio de autenticación
        |
        +--> Task Hub #80 = [Moodle][Tarea] Levantar requisitos de autenticación
        +--> Task Hub #81 = [Moodle][Tarea] Validar impacto SENCE/CUS
        +--> Task Hub #82 = [Moodle][Tarea] Revisar flujo de recuperación de clave
```

## Estados del issue padre en repo operativo

El issue padre puede mantenerse abierto mientras existan tareas hijas pendientes.

Estados sugeridos mediante labels o texto:

```text
estado:analisis
estado:en-descomposicion
estado:con-tareas-activas
estado:bloqueado
estado:resuelto
```

En el cuerpo o comentarios del issue padre debe existir una sección:

```markdown
## Tareas derivadas en Task Hub

- [ ] capacita-task-hub#80 — Levantar requisitos de autenticación
- [ ] capacita-task-hub#81 — Validar impacto SENCE/CUS
- [ ] capacita-task-hub#82 — Revisar flujo de recuperación de clave
```

## Tareas ejecutivas

Una tarea ejecutiva es una acción clara y ya decidida.

Ejemplo:

```text
[Moodle][Tarea] Subir cinco videos al módulo Access M3
```

Vive en:

```text
misaeln-pc1/capacita-task-hub
```

Debe indicar:

```text
Tipo: Tarea ejecutiva
Proyecto operativo: Moodle
Repo dueño: misaeln-pc1/capacita-learnops-moodle
Issue padre: Moodle #XX, si existe
Siguiente acción: preparar ejecución controlada
Evidencia esperada: PR, commit, validación visual o checklist según aplique
```

## Ideas, investigaciones y decisiones

Una idea no se ejecuta directo y no vive en Task Hub por defecto.

Ejemplo:

```text
[Moodle][Investigación] Analizar cambio de autenticación y recuperación de clave
```

Vive en:

```text
misaeln-pc1/capacita-learnops-moodle
```

Debe indicar:

```text
Tipo: Investigación
Riesgo: Amarillo/Rojo, según impacto
Estado: análisis / bloqueado / con tareas activas
Siguiente acción: definir problema, alternativas, impacto y tareas derivadas
```

No se manda a Copilot/Codex ni se convierte en PR técnico hasta madurar o generar tareas ejecutivas.

## Decisiones pendientes

Si algo todavía no está decidido, no debe redactarse como acción cerrada.

Ejemplo incorrecto:

```text
[Moodle][Tarea] Comprar tema X
```

si aún no se validó compatibilidad, costo, licencia o SENCE.

Ejemplo correcto en repo Moodle:

```text
[Moodle][Decisión] Evaluar compra vs desarrollo de tema Moodle
```

Luego de la decisión pueden nacer tareas ejecutivas en Task Hub:

```text
[Moodle][Tarea] Comprar tema elegido
[Moodle][Tarea] Instalar tema en entorno controlado
[Moodle][Tarea] Validar compatibilidad con bloque SENCE
```

## Flujo de maduración

```text
Issue padre en repo operativo
  -> Idea / riesgo / investigación / decisión / épica
  -> Análisis y comentarios
  -> Tareas ejecutivas en Task Hub
  -> Ejecución en repo operativo si aplica
  -> PR / commit / evidencia
  -> Actualización del issue padre
```

## Issue espejo

Con este modelo, el issue del repo operativo no es espejo: es el issue padre cuando se trata de problema, idea, riesgo, decisión, investigación o épica.

No crear issue duplicado en el repo operativo para una tarea ejecutiva normal, salvo que:

- Copilot/Codex/PR Factory lo necesite explícitamente;
- el repo requiere trazabilidad local de ejecución;
- el riesgo técnico lo exige;
- Misael lo pide explícitamente.

Si se crea issue operativo para una tarea ejecutiva, debe vincularse:

```text
Repo operativo #XX = issue padre o issue técnico local
Task Hub #YY = tarea ejecutiva
PR #ZZ = evidencia de ejecución
```

## Verbos recomendados

| Verbo | Significado | Lugar habitual |
|---|---|---|
| Comprar | Acción ya decidida | Task Hub |
| Subir / crear / actualizar / ejecutar | Acción clara | Task Hub |
| Evaluar | Decisión pendiente | Repo operativo |
| Validar | Puede ser tarea o investigación, según claridad | Task Hub o repo operativo |
| Investigar | Exploración | Repo operativo |
| Implementar | Ejecución técnica decidida | Task Hub + repo operativo para PR |
| Revisar | Control o auditoría | Depende del alcance |
| Preparar | Trabajo previo accionable | Task Hub |
| Esperar | Dependencia externa accionable | Task Hub |

## Campo clave: Origen / Validación

Valores recomendados para tareas en Task Hub:

```text
Dictado simple
Derivado de issue padre
Derivado de decisión validada
Derivado de PR
Pendiente de decisión
Incidente / bloqueo
```

## Semáforo

| Semáforo | Uso | Acción |
|---|---|---|
| Verde | Personal, administrativo simple, documental reversible | Crear tarea en Task Hub o issue menor en repo según tipo. |
| Amarillo | Proyecto, datos, SENCE, CRM, Moodle, producción cercana, dinero menor | Mantener problema/riesgo en repo; crear tareas ejecutivas en Task Hub. |
| Rojo | Credenciales, producción irreversible, legal, dinero relevante, datos personales críticos, merge/main | Detener y pedir aprobación humana. |

## Flujo cuando Misael dice “agrégalo al Planificador”

1. Identificar si es una tarea ejecutable o no.
2. Si es tarea ejecutable, crear issue en `capacita-task-hub`.
3. Si es idea, investigación, decisión, riesgo, bloqueo o épica, crear issue en el repo operativo correspondiente.
4. Si el issue del repo genera tareas, crear tareas derivadas en `capacita-task-hub` y enlazarlas.
5. Clasificar estado, prioridad, riesgo, responsable y siguiente acción.
6. Registrar tiempo estimado inicial si es tarea P1/P2, repetitiva o útil para historial.
7. Reportar enlace del issue y, si aplica, vínculo padre/hija.

## Definition of Done de una tarea ejecutiva bien creada

- Título claro con `[Proyecto][Tarea]`.
- Issue creado en `capacita-task-hub`.
- Proyecto operativo indicado si aplica.
- Repo dueño indicado si aplica.
- Issue padre indicado si existe.
- Siguiente acción explícita.
- Responsable inicial.
- Prioridad inicial.
- Riesgo inicial.
- Origen/validación indicado.
- Estimación inicial si es P1/P2, repetitiva o de esta semana.
- Evidencia esperada indicada.

## Definition of Done de un issue padre bien creado

- Issue creado en el repo operativo correcto.
- Tipo correcto: idea, investigación, decisión, riesgo, bloqueo, épica o incidente.
- Problema o pregunta clara.
- Riesgo indicado.
- Siguiente acción de análisis indicada.
- Tareas derivadas listadas si existen.
- Estado actualizado cuando cambien las tareas hijas.

## Sincronización del estado operativo

La GitHub Issue de `capacita-task-hub` es la fuente oficial del estado de cada tarea ejecutable.

### Precedencia

1. El estado real de GitHub (`open` o `closed`) determina si la tarea sigue pendiente.
2. Mientras la issue esté abierta, el campo `Estado:` de su cuerpo determina el estado operativo.
3. Los campos de **Planificador Atlas / GitHub Projects v2** son un espejo visual.
4. El dashboard debe leer la issue y no inferir como vigente un valor distinto guardado solo en el Project.

### Estados operativos abiertos

Valores admitidos:

```text
Inbox
Hoy
Próxima
En curso
Bloqueada
```

Toda instrucción de Misael que cambie una tarea entre estos estados debe modificar primero el campo `Estado:` del cuerpo de la issue.

Ejemplo:

```markdown
## Clasificación Atlas

- Estado: En curso
- Proyecto: Gestión de Calidad NCh 2728
- Tipo: Hito / tarea ejecutiva
- Prioridad: P1
- Riesgo: Amarillo
- Responsable: Misael
```

### Cierre

Cuando Misael indique que una tarea está completada:

1. comprobar o registrar la evidencia disponible;
2. actualizar el cuerpo a `Estado: Cerrada`;
3. agregar un comentario de cierre cuando aporte trazabilidad;
4. cerrar la issue con `state_reason = completed`.

La issue cerrada deja de formar parte de los pendientes aunque un snapshot anterior todavía la muestre hasta el próximo despliegue.

### Reapertura

Cuando una tarea deba reabrirse:

1. reabrir la issue;
2. reemplazar `Estado: Cerrada` por un estado operativo abierto;
3. registrar el motivo de reapertura y la siguiente acción.

### Planificador Atlas / Projects v2

Nunca se debe cambiar únicamente el Project dejando desactualizada la issue.

- Si el conector permite actualizar Projects v2, el cambio puede reflejarse después de actualizar la issue.
- Si el conector no permite editar sus campos internos, la issue sigue siendo válida y se debe informar: `pendiente de clasificación manual en Planificador Atlas`.
- La imposibilidad de editar Projects v2 no bloquea el cambio de estado en Task Hub ni la actualización del dashboard basado en issues.

### Regla para agentes

```text
Instrucción de Misael
→ actualizar primero la issue de Task Hub
→ registrar evidencia si corresponde
→ reflejar después en Planificador Atlas cuando sea posible
→ dashboard lee la issue actualizada
```

No cerrar una tarea solo en el Project. No cambiar el estado solo en el texto sin aplicar también `open/closed` cuando corresponda.