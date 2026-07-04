# PROJECT_CONTEXT

## Propósito

`capacita-task-hub` es el repo de apoyo del **Sistema de Tareas Atlas**. Su función es recibir y mantener tareas personales, administrativas, transversales o sin repo dueño claro, y alimentar el GitHub Project central **Planificador Atlas**.

Este repo no reemplaza los repos operativos. Moodle, Edge, Zoho, licitaciones, Diseño de Cursos y otros proyectos siguen siendo dueños de sus tareas técnicas y decisiones propias.

## Problema que resuelve

Las tareas estaban dispersas entre chats, proyectos, notas y herramientas externas. El objetivo es evitar usar múltiples aplicaciones como Google Tasks, Keep o To Do cuando GitHub ya puede actuar como fuente trazable de trabajo.

## Modelo mental

```text
Repo = casa donde vive una tarea.
Planificador Atlas = panel donde se ven y gestionan todas.
Protocolo = reglas para saber dónde crearla.
```

## Nombres oficiales

| Nombre | Significado |
|---|---|
| `capacita-task-hub` | Repo para tareas personales, administrativas, transversales e inbox. |
| **Planificador Atlas** | GitHub Project central para ver todas las tareas. |
| **Sistema de Tareas Atlas** | Conjunto de reglas, repo, panel, campos y criterios. |
| **Repos operativos** | Repos de proyecto como Moodle, Edge, Zoho, licitaciones, Diseño de Cursos. |

## Principio rector

> Una tarea no valida una decisión. Una tarea ejecuta o recuerda algo que ya está claro, o marca algo pendiente de decidir.

Crear tarea no equivale a crear rama, PR ni decisión oficial.

## Alcance del repo

Hace:

- Registrar tareas personales simples.
- Registrar tareas administrativas.
- Registrar tareas transversales sin repo dueño claro.
- Servir como inbox operativo.
- Documentar el protocolo de tareas.
- Mantener prompts y criterios de clasificación.

No hace:

- No reemplaza `capacita-global-control`.
- No duplica decisiones de los proyectos.
- No almacena tareas técnicas que tienen repo dueño.
- No ejecuta producción, integraciones, workflows ni scripts.
- No guarda credenciales, datos personales, secretos ni binarios.

## Relación con `capacita-global-control`

`capacita-global-control` sigue siendo la PMO / control estratégico global. `capacita-task-hub` es un repo operativo liviano para tareas simples y transversales.

Global define criterio, prioridad y riesgos transversales. Task Hub registra acciones pendientes que no pertenecen a un repo operativo específico.

## Relación con Planificador Atlas

El **Planificador Atlas** muestra issues de:

- `capacita-task-hub`.
- Repos operativos.
- Issues derivados de decisiones validadas.
- Issues personales o administrativos.

El Planificador no debe duplicar contenido. Solo organiza y permite ver prioridades, tiempos, riesgos y automatización.

## Estado inicial

- Repo creado: `misaeln-pc1/capacita-task-hub`.
- GitHub Project creado manualmente por Misael: **Planificador Atlas**.
- Pendiente registrar URL/número del Project cuando esté disponible.
- Pendiente configurar campos y vistas.
- Pendiente primera carga controlada de tareas reales.
