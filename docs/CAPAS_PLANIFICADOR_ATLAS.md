# CAPAS_PLANIFICADOR_ATLAS

## Propósito

Definir las tres capas de funcionamiento del **Planificador Atlas** para evitar dispersión, mala estimación de tiempo y trabajo manual innecesario.

## Resumen

| Capa | Nombre | Pregunta principal | Uso inicial |
|---|---|---|---|
| 1 | Visibilidad | ¿Qué está pendiente y qué es urgente? | Desde el día 1. |
| 2 | Tiempo | ¿Cuánto esfuerzo real requiere? | Aplicar primero a P1/P2 y tareas de la semana. |
| 3 | Automatización | ¿Qué puede delegarse a Atlas, Codex, Copilot, Jules, API o scripts? | Aplicar después de capturar tareas reales. |

---

# Capa 1 — Visibilidad

## Objetivo

Tener una vista rápida de tareas pendientes, urgentes, bloqueadas, graves o dependientes de Misael.

No busca planificación perfecta. Busca que nada importante se pierda.

## Campos mínimos

| Campo | Uso |
|---|---|
| Estado | Inbox, Hoy, Próxima, En curso, Bloqueada, Cerrada. |
| Proyecto | Moodle, Edge, Zoho, Licitaciones, Personal, Global, etc. |
| Tipo | Personal, Técnico, Documental, Decisión, Seguimiento. |
| Prioridad | P1, P2, P3. |
| Riesgo | Verde, Amarillo, Rojo. |
| Responsable | Misael, Atlas, Codex, Copilot, Jules, Proveedor, Cliente. |
| Fecha objetivo | Cuándo debería revisarse. |
| Siguiente acción | Qué hay que hacer exactamente ahora. |
| Origen / Validación | Dictado simple, derivado de PR, pendiente de decisión, etc. |

## Vista esperada

- Hoy.
- Semana.
- Bloqueadas.
- Por proyecto.
- Personales.
- Riesgo amarillo/rojo.

## Ejemplo

```text
Issue:
[Moodle] Insertar videos Bunny M1–M7 en curso Access sandbox

Vive en:
capacita-learnops-moodle

Se ve en:
Planificador Atlas

Campos:
Estado: Próxima
Proyecto: Moodle
Tipo: Técnico
Prioridad: P1
Riesgo: Amarillo
Responsable: Atlas / Misael
Siguiente acción: preparar ejecución controlada en sandbox
```

---

# Capa 2 — Tiempo

## Objetivo

Evitar que una tarea que parece corta consuma una mañana, un día completo o varias iteraciones.

La estimación no debe ser falsa precisión. Debe servir para decidir qué cabe hoy y qué hay que dividir.

## Campos de tiempo

| Campo | Valores sugeridos |
|---|---|
| Tamaño estimado | XS, S, M, L, XL, XXL. |
| Tiempo activo Misael | 10 min, 30 min, 1 h, 2 h, medio día, día completo. |
| Tiempo IA/agente | Inmediato, 30 min, 1 h, varias iteraciones. |
| Confianza estimación | Alta, Media, Baja. |
| Causa de incertidumbre | Definición, acceso, datos, API, proveedor, SENCE, revisión humana. |

## Escala simple

```text
XS  = menos de 15 min
S   = 15–45 min
M   = 1–3 h
L   = medio día
XL  = día completo o más
XXL = dividir antes de ejecutar
```

## Regla práctica

- Estimar primero tareas P1/P2 y tareas de esta semana.
- No estimar todo el backlog al inicio.
- Si una tarea es XL o XXL, dividirla.
- Si la confianza es baja, registrar la causa.

## Ejemplo

```text
[Moodle] Cargar curso Access completo vía API

Antes de API:
Tiempo real: varios días o una semana.

Con API:
Tiempo activo Misael: 1–2 h
Tiempo IA/API: 2–4 h
Confianza: Media
Riesgo: Amarillo
Causa incertidumbre: validación visual + límites API Moodle
```

---

# Capa 3 — Automatización

## Objetivo

Identificar qué puede hacer Atlas, Codex, Copilot, Jules, API o scripts, y qué debe seguir haciendo Misael.

No se activa todo desde el día 1. Primero se capturan tareas reales y luego se detectan patrones repetibles.

## Campos de automatización

| Campo | Valores sugeridos |
|---|---|
| Automatizable | No, Parcial, Sí. |
| Ejecutor sugerido | Misael, Atlas, Codex, Copilot, Jules, API, Proveedor. |
| Tipo de ejecución | Prompt, PR, script, checklist, revisión, extracción. |
| Requiere validación humana | Sí / No. |
| Riesgo automatización | Verde, Amarillo, Rojo. |

## Ejemplos

### Tarea automatizable

```text
[Edge] Crear landing SQL

Automatizable: Sí
Ejecutor sugerido: Copilot
Tipo: PR documental/técnico
Tiempo Misael: 15–30 min para revisar
Riesgo: Amarillo
Validación humana: Sí
```

### Tarea no automatizable

```text
[Personal] Ir al banco

Automatizable: No
Ejecutor sugerido: Misael
Tiempo Misael: 1–2 h
Riesgo: Verde
```

### Tarea parcialmente automatizable

```text
[Moodle] Insertar videos Bunny M1–M7

Automatizable: Parcial
Ejecutor sugerido: Atlas/API/Codex
Tiempo Misael: 30–60 min
Tiempo IA/API: 1–2 h
Confianza: Media
Riesgo: Amarillo
Causa incertidumbre: API Moodle + validación visual
```

## Regla de automatización

No automatizar por entusiasmo. Automatizar cuando:

- la tarea se repite;
- hay bajo riesgo;
- hay validación mínima clara;
- el resultado puede revisarse;
- no expone secretos, datos reales, producción, dinero o SENCE sin aprobación humana.
