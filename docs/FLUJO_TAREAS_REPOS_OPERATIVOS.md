# FLUJO_TAREAS_REPOS_OPERATIVOS

## Propósito

Definir cómo se crean tareas cuando nacen desde repos/proyectos operativos como Moodle, Edge, Zoho, licitaciones, Diseño de Cursos u otros, y cómo se ven en el **Planificador Atlas** sin duplicarse.

## Regla base

> La tarea vive en el repo operativo si ese repo es dueño de la ejecución.

El `capacita-task-hub` no debe absorber tareas técnicas de otros repos. Solo recibe tareas personales, administrativas, transversales o sin repo dueño claro.

## Flujo general

```text
Tarea nace en un proyecto
        |
        v
¿Tiene repo dueño?
        |
  Sí ---+---> Crear issue en repo dueño
        |     Agregar al Planificador Atlas
        |     Referenciar decisión/PR si aplica
        |
  No ---+---> Crear issue en capacita-task-hub
              Agregar al Planificador Atlas
```

## Ejemplo: Moodle

### Caso técnico

```text
[Moodle] Insertar videos Bunny M1–M7 en curso Access sandbox
```

Debe vivir en:

```text
misaeln-pc1/capacita-learnops-moodle
```

Debe verse en:

```text
Planificador Atlas
```

No debe copiarse a `capacita-task-hub`.

### Caso derivado de decisión validada

```text
[Moodle] Comprar tema Moodle definido en PR/documento X
```

Debe vivir en Moodle, pero con referencia al PR/documento que validó la decisión.

### Caso pendiente de decisión

```text
[Moodle] Evaluar compra vs desarrollo de tema Moodle
```

Puede requerir rama/PR documental si la evaluación modifica criterio o decisión oficial.

## Ejemplo: Edge

```text
[Edge] Revisar canonical y sitemap de landings nuevas
```

Debe vivir en:

```text
misaeln-pc1/capacita-edge
```

Debe verse en:

```text
Planificador Atlas
```

Si implica cambiar rutas, canonical, Worker, Cloudflare o SEO productivo, marcar riesgo amarillo y exigir evidencia.

## Ejemplo: Zoho

```text
[Zoho] Confirmar API names y picklists de Deals
```

Debe vivir en:

```text
misaeln-pc1/Capacita-Zoho-Deluge-Core
```

Debe verse en:

```text
Planificador Atlas
```

Si implica ejecutar Deluge, tocar CRM, credenciales, datos reales o workflows, marcar amarillo/rojo y pedir aprobación humana antes de ejecutar.

## Ejemplo: Licitaciones / Mercado Público

```text
[Licitaciones] Revisar bases OTIC y detectar requisitos críticos
```

Debe vivir en el repo de licitaciones correspondiente si existe caso activo. Si es solo recordatorio inicial sin repo/caso dueño, puede vivir temporalmente en `capacita-task-hub` como inbox.

## Ejemplo: tarea personal

```text
[Personal] Ir al banco
```

Debe vivir en:

```text
misaeln-pc1/capacita-task-hub
```

Debe verse en:

```text
Planificador Atlas
```

No requiere rama, PR, decisión ni documentación adicional.

## Quién registra la tarea

La regla operativa es:

```text
La registra el proyecto donde nace.
```

Ejemplos:

| Dónde nace | Quién crea el issue | Dónde vive | Dónde se ve |
|---|---|---|---|
| Moodle | Asistente/proyecto Moodle | Repo Moodle | Planificador Atlas |
| Edge | Asistente/proyecto Edge | Repo Edge | Planificador Atlas |
| Zoho | Asistente/proyecto Zoho | Repo Zoho | Planificador Atlas |
| Personal | Atlas / Task Hub | `capacita-task-hub` | Planificador Atlas |
| Transversal sin dueño | Atlas / Task Hub | `capacita-task-hub` | Planificador Atlas |

## Qué hacer si hay duda

Si no está claro el repo dueño:

1. Crear tarea en `capacita-task-hub` como `Inbox`.
2. Marcar `Origen / Validación = Idea a evaluar` o `Pendiente de decisión`.
3. Definir como siguiente acción: `Determinar repo dueño`.
4. No ejecutar hasta clasificar si hay riesgo amarillo/rojo.

## Regla contra duplicación

Nunca crear dos issues equivalentes para la misma tarea.

Incorrecto:

```text
Issue en Moodle: Insertar videos Bunny
Issue en Task Hub: Insertar videos Bunny
```

Correcto:

```text
Issue único en Moodle.
Visible en Planificador Atlas.
```

## Cuándo usar `capacita-task-hub` aunque exista proyecto

Solo si la tarea no pertenece realmente al ciclo operativo del repo.

Ejemplos:

```text
[Admin] Pagar renovación hosting Moodle
[Personal] Llamar al proveedor para cotización general
[Seguimiento] Esperar respuesta externa sin acción técnica aún
```

Si luego se transforma en ejecución técnica, se crea issue específico en el repo dueño y se cierra o vincula la tarea original.
