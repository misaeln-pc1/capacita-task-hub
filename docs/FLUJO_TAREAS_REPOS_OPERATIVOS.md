# FLUJO_TAREAS_REPOS_OPERATIVOS

## Propósito

Definir cómo se crean issues cuando nacen desde proyectos operativos como Moodle, Edge, Zoho, licitaciones, Diseño de Cursos u otros, y cómo se ven en el **Planificador Atlas** sin gastar workflows Auto-add por cada repo.

## Regla base vigente

> El issue maestro de gestión vive siempre en `capacita-task-hub`. El repo operativo se declara en el campo `Repo dueño`.

El repo operativo sigue siendo el lugar de ejecución técnica, PR, commit o documentación propia cuando aplique, pero no es el lugar por defecto para crear el issue de gestión.

## Motivo

GitHub Projects tiene límite de workflows Auto-add por plan. Para evitar tener un workflow por cada repo, el **Planificador Atlas** usa un solo Auto-add:

```text
Repository: misaeln-pc1/capacita-task-hub
Filter: is:issue is:open
```

## Flujo general

```text
Issue nace en cualquier proyecto o chat
        |
        v
Crear issue maestro en capacita-task-hub
        |
        v
Indicar Proyecto operativo y Repo dueño si aplica
        |
        v
Auto-add lo agrega al Planificador Atlas
        |
        v
Si madura a ejecución técnica, trabajar en repo dueño con rama/PR/evidencia
```

## Tipos principales

| Tipo | Ejemplo | Acción |
|---|---|---|
| Tarea ejecutiva | `[Moodle][Tarea] Subir cinco videos al módulo Access M3` | Se puede ejecutar si está clara. |
| Idea a evaluar | `[Moodle][Idea] Evaluar autenticación diferenciada por módulo` | No se ejecuta; primero se analiza. |
| Decisión pendiente | `[Edge][Decisión] Definir criterio canonical para landings nuevas` | Requiere decisión antes de tareas. |
| Investigación | `[Zoho][Investigación] Revisar API names de Deals` | Busca información. |
| Bloqueo/Incidente | `[Licitaciones][Bloqueo] Falta documento OTIC` | Resolver dependencia. |
| Épica/Iniciativa | `[Moodle][Iniciativa] Course Factory Access` | Dividir en issues menores. |

## Ejemplo: Moodle — tarea ejecutiva

```text
[Moodle][Tarea] Subir cinco videos al módulo Access M3
```

Issue vive en:

```text
misaeln-pc1/capacita-task-hub
```

Campos esperados:

```text
Tipo: Tarea ejecutiva
Proyecto operativo: Moodle
Repo dueño: misaeln-pc1/capacita-learnops-moodle
Riesgo: Amarillo
Siguiente acción: preparar ejecución controlada
Evidencia esperada: PR, commit, validación visual o checklist
```

Ejecución ocurre en:

```text
misaeln-pc1/capacita-learnops-moodle
```

si requiere rama, PR, commit o validación técnica.

## Ejemplo: Moodle — idea

```text
[Moodle][Idea] Evaluar autenticación diferenciada por módulo
```

Issue vive en:

```text
misaeln-pc1/capacita-task-hub
```

Campos esperados:

```text
Tipo: Idea a evaluar
Proyecto operativo: Moodle
Repo dueño: misaeln-pc1/capacita-learnops-moodle
Estado: Inbox / Pendiente de decisión
Riesgo: Amarillo
Siguiente acción: definir problema, alternativas e impacto
```

No se ejecuta directo. Puede madurar a investigación, decisión o tareas ejecutivas.

## Ejemplo: Edge

```text
[Edge][Tarea] Revisar canonical y sitemap de landings nuevas
```

Issue vive en `capacita-task-hub`.

Repo dueño:

```text
misaeln-pc1/capacita-edge
```

Si implica cambiar rutas, canonical, Worker, Cloudflare o SEO productivo, marcar riesgo amarillo y exigir evidencia.

## Ejemplo: Zoho

```text
[Zoho][Investigación] Confirmar API names y picklists de Deals
```

Issue vive en `capacita-task-hub`.

Repo dueño:

```text
misaeln-pc1/Capacita-Zoho-Deluge-Core
```

Si implica ejecutar Deluge, tocar CRM, credenciales, datos reales o workflows, marcar amarillo/rojo y pedir aprobación humana antes de ejecutar.

## Ejemplo: Licitaciones / Mercado Público

```text
[Licitaciones][Tarea] Revisar bases OTIC y detectar requisitos críticos
```

Issue vive en `capacita-task-hub`.

Repo dueño esperado: repo de licitaciones correspondiente si existe caso activo. Si no está claro, usar:

```text
Repo dueño: pendiente de definir
Tipo: Investigación o Decisión pendiente
Siguiente acción: determinar repo dueño y alcance
```

## Ejemplo: tarea personal

```text
[Personal][Tarea] Ir al banco
```

Issue vive en:

```text
misaeln-pc1/capacita-task-hub
```

No requiere rama, PR, decisión ni documentación adicional.

## Quién registra el issue

La regla operativa es:

```text
El proyecto o chat donde nace la necesidad crea issue maestro en capacita-task-hub.
```

Ejemplos:

| Dónde nace | Dónde se crea issue maestro | Repo dueño declarado | Dónde se ejecuta si aplica |
|---|---|---|---|
| Moodle | `capacita-task-hub` | `capacita-learnops-moodle` | Repo Moodle |
| Edge | `capacita-task-hub` | `capacita-edge` | Repo Edge |
| Zoho | `capacita-task-hub` | `Capacita-Zoho-Deluge-Core` | Repo Zoho |
| Personal | `capacita-task-hub` | No aplica | Misael |
| Transversal sin dueño | `capacita-task-hub` | Pendiente de definir | Según decisión posterior |

## Qué hacer si hay duda

Si no está claro el repo dueño o si todavía es una idea:

1. Crear issue en `capacita-task-hub`.
2. Marcar `Tipo = Idea a evaluar`, `Investigación` o `Decisión pendiente`.
3. Definir como siguiente acción: `Determinar repo dueño / problema / alcance`.
4. No ejecutar hasta clasificar si hay riesgo amarillo/rojo.

## Regla contra duplicación

Nunca crear dos issues maestros equivalentes para la misma necesidad.

Incorrecto por defecto:

```text
Issue maestro en Task Hub: Subir videos Bunny
Issue maestro en Moodle: Subir videos Bunny
```

Correcto:

```text
Issue maestro único en Task Hub.
Repo dueño declarado: Moodle.
PR/commit en Moodle si se ejecuta.
```

## Issue operativo espejo

Se puede crear issue operativo espejo en el repo dueño solo como excepción:

- si Copilot/Codex/PR Factory lo requiere;
- si el repo necesita trazabilidad local;
- si el riesgo técnico exige control interno del repo;
- si Misael lo pide explícitamente.

Debe quedar vinculado:

```text
Task Hub #XX -> issue maestro
Repo operativo #YY -> issue espejo
PR #ZZ -> evidencia
```

## Cierre de ejecución

Al cerrar un issue ejecutivo, completar o comentar:

```text
Repo dueño:
Rama:
PR:
Commit SHA:
Validación:
Tiempo real observado:
Riesgos pendientes:
```

Si era idea/decisión/investigación, cerrar solo cuando se haya descartado, transformado o derivado a issues ejecutivos.
