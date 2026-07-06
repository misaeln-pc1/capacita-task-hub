# FLUJO_TAREAS_REPOS_OPERATIVOS

## Propósito

Definir cómo se conectan los issues de repos/proyectos operativos con las tareas ejecutables de `capacita-task-hub` y el **Planificador Atlas**.

## Regla base vigente

> El problema vive en el repo. La tarea ejecutable vive en Task Hub. La evidencia técnica vive en el repo.

Esto evita que riesgos, ideas, decisiones o incidentes graves queden ocultos en un repo central que no se revisa cuando se analiza el proyecto afectado.

## Separación de responsabilidades

| Lugar | Qué contiene | Qué no debe absorber |
|---|---|---|
| Repo operativo | Ideas, investigaciones, decisiones, riesgos, bloqueos, épicas, incidentes, PRs y evidencia técnica | Cola diaria de tareas ejecutables. |
| `capacita-task-hub` | Tareas ejecutables, personales, administrativas y seguimientos accionables | Problemas estructurales que deben verse en el repo. |
| Planificador Atlas | Vista de ejecución de Task Hub | Radar completo de todos los problemas de todos los repos. |

## Flujo general

```text
Aparece idea / problema / riesgo en un proyecto
        |
        v
Crear issue padre en repo operativo
        |
        v
Analizar, debatir, clasificar riesgo y decidir
        |
        v
Descomponer en tareas ejecutables
        |
        v
Crear tareas hijas en capacita-task-hub
        |
        v
Auto-add las lleva al Planificador Atlas
        |
        v
Ejecutar con evidencia en repo operativo si aplica
        |
        v
Actualizar issue padre con estado de tareas derivadas
```

## Tabla de enrutamiento

| Caso | Dónde crear issue | Dónde se ve ejecución |
|---|---|---|
| Subir cinco videos ya decidido | `capacita-task-hub` | Planificador Atlas |
| Comprar algo ya decidido | `capacita-task-hub` | Planificador Atlas |
| Llamar/probar/validar algo concreto | `capacita-task-hub` | Planificador Atlas |
| Analizar autenticación | Repo operativo | Repo operativo |
| Debatir idea de arquitectura | Repo operativo | Repo operativo |
| Riesgo SENCE/CUS | Repo operativo + Global si transversal | Repo operativo / Global |
| Bloqueo grave de proyecto | Repo operativo | Repo operativo |
| Épica Course Factory | Repo operativo | Repo operativo |
| Tarea personal | `capacita-task-hub` | Planificador Atlas |

## Ejemplo: Moodle — problema padre

Situación:

```text
Hay que analizar cambio de clave/autenticación. Puede ser grave.
```

No es tarea ejecutable. Debe vivir en repo Moodle:

```text
[Moodle][Investigación] Analizar cambio de clave y autenticación
```

Repo:

```text
misaeln-pc1/capacita-learnops-moodle
```

Contenido mínimo:

```markdown
## Problema

Analizar cambio de clave/autenticación y su impacto en Moodle, usuarios, seguridad y posibles restricciones SENCE/CUS.

## Riesgo

Amarillo/Rojo según impacto.

## Siguiente acción

Definir alcance, alternativas y tareas ejecutables derivadas.

## Tareas derivadas en Task Hub

- Pendiente.
```

## Ejemplo: tareas derivadas en Task Hub

Desde el issue padre de autenticación pueden nacer:

```text
[Moodle][Tarea] Levantar flujo actual de recuperación de clave
[Moodle][Tarea] Revisar impacto SENCE/CUS del cambio de autenticación
[Moodle][Tarea] Preparar alternativas de autenticación
[Moodle][Tarea] Validar permisos y roles afectados
```

Estas viven en:

```text
misaeln-pc1/capacita-task-hub
```

Cada tarea debe indicar:

```text
Repo dueño: misaeln-pc1/capacita-learnops-moodle
Issue padre: misaeln-pc1/capacita-learnops-moodle#XX
Evidencia esperada: comentario, documento, PR o validación según aplique
```

## Estado del issue padre

El issue padre no se cierra solo porque existan tareas en Task Hub. Se mantiene abierto mientras el problema siga vivo.

Estados sugeridos:

```text
estado:analisis
estado:en-descomposicion
estado:con-tareas-activas
estado:bloqueado
estado:resuelto
```

Ejemplo de actualización en el issue padre:

```markdown
## Estado tareas derivadas

- [x] capacita-task-hub#80 — Levantar flujo actual.
- [x] capacita-task-hub#81 — Revisar impacto SENCE/CUS.
- [ ] capacita-task-hub#82 — Preparar alternativas.
- [ ] capacita-task-hub#83 — Validar permisos y roles afectados.

## Lectura Atlas

El problema sigue abierto. La tarea #82 bloquea la decisión final.
```

## Ejemplo: Edge

Idea/riesgo en repo Edge:

```text
[Edge][Decisión] Definir criterio canonical para landings nuevas
```

Tareas derivadas en Task Hub:

```text
[Edge][Tarea] Auditar canonical de landing Access
[Edge][Tarea] Revisar sitemap de landings nuevas
```

## Ejemplo: Zoho

Investigación en repo Zoho:

```text
[Zoho][Investigación] Confirmar API names y picklists de Deals
```

Tareas derivadas en Task Hub:

```text
[Zoho][Tarea] Exportar campos actuales de Deals
[Zoho][Tarea] Validar picklist de etapa comercial
```

Si implica ejecutar Deluge, tocar CRM, credenciales, datos reales o workflows, marcar amarillo/rojo y pedir aprobación humana antes de ejecutar.

## Ejemplo: Licitaciones / Mercado Público

Issue padre en repo de licitaciones:

```text
[Licitaciones][Investigación] Revisar bases OTIC y detectar requisitos críticos
```

Tareas en Task Hub:

```text
[Licitaciones][Tarea] Descargar bases oficiales OTIC
[Licitaciones][Tarea] Armar matriz de requisitos críticos
```

## Ejemplo: tarea personal

```text
[Personal][Tarea] Ir al banco
```

Vive directamente en:

```text
misaeln-pc1/capacita-task-hub
```

No requiere issue padre, rama, PR, decisión ni documentación adicional.

## Quién registra qué

| Dónde nace | Si es problema/idea/riesgo | Si es tarea ejecutable |
|---|---|---|
| Moodle | Issue en repo Moodle | Tarea en Task Hub vinculada al issue padre si existe |
| Edge | Issue en repo Edge | Tarea en Task Hub vinculada al issue padre si existe |
| Zoho | Issue en repo Zoho | Tarea en Task Hub vinculada al issue padre si existe |
| Personal | No aplica | Tarea en Task Hub |
| Transversal | Global o repo principal según alcance | Tarea en Task Hub vinculada al issue padre |

## Qué hacer si hay duda

Si no está claro si es tarea o problema:

1. Preguntar: “¿esto ya se puede ejecutar o todavía hay que analizarlo?”
2. Si ya se puede ejecutar, crear tarea en Task Hub.
3. Si falta análisis, crear issue en repo operativo.
4. Si no existe repo dueño, crear en Task Hub como seguimiento accionable solo con siguiente acción: determinar repo dueño.
5. Si hay riesgo amarillo/rojo, preferir repo operativo o Global antes que ocultarlo en Task Hub.

## Regla contra duplicación

No crear dos issues equivalentes con el mismo rol.

Incorrecto:

```text
Issue padre en Moodle: Analizar autenticación
Issue padre en Task Hub: Analizar autenticación
```

Correcto:

```text
Issue padre en Moodle: Analizar autenticación
Tareas hijas en Task Hub: acciones concretas derivadas
```

## Cierre de ejecución

Al cerrar una tarea en Task Hub, completar o comentar:

```text
Issue padre:
Repo dueño:
Rama:
PR:
Commit SHA:
Validación:
Tiempo real observado:
Riesgos pendientes:
```

Al cerrar un issue padre en repo operativo, confirmar:

```text
Tareas derivadas cerradas o descartadas.
Riesgo resuelto o aceptado.
Decisión documentada si aplica.
Evidencia técnica vinculada.
```
