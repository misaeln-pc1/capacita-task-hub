# DECISIONES

## 2026-07-14 — Dashboard V1 vivo en GitHub Pages

**Decisión:** usar el dashboard publicado en GitHub Pages como capa cronológica de lectura del Planificador Atlas.

```text
GitHub Issues abiertos = fuente oficial
API pública de GitHub = lectura
Dashboard V1 = presentación
GitHub Pages = alojamiento
```

**URL:**

```text
https://misaeln-pc1.github.io/capacita-task-hub/dashboard/
```

**Reglas:**

- no usa snapshot, token, secreto, Worker ni backend;
- muestra la Week actual y las cuatro siguientes;
- conserva Weeks vacías en hitos y carga;
- usa ISO 8601, lunes a domingo;
- navega internamente de Week a tarea y detalle;
- no abre GitHub desde las tarjetas;
- actualiza al abrir, manualmente y cada cinco minutos;
- el repo y sus issues son públicos.

**Estado:** validado visualmente por Misael.

---

## 2026-07-14 — Arrastrar vencidas abiertas a la Week actual

**Decisión:** una issue abierta con fecha anterior al día actual debe permanecer visible como pendiente vigente.

```text
Fecha histórica conservada
+ Week actual agregada visualmente
+ badge Vencida
+ color rojo
```

- no se rellenan las Weeks intermedias;
- la tarea vencida aparece primero en el listado;
- la Week actual queda roja si contiene vencidas;
- la regla aplica también a hitos;
- cerrar o reprogramar elimina el arrastre.

Caso validado: issue #5.

---

## 2026-07-14 — Versionar recursos del dashboard

**Decisión:** todo cambio en CSS o JavaScript debe actualizar la versión de los recursos cargados por `dashboard/index.html`.

**Motivo:** impedir que el navegador ejecute lógica anterior después de un despliegue de GitHub Pages.

---

## 2026-07-14 — La etapa snapshot/Sites queda superada

La decisión del 2026-07-11 de operar con snapshot y evaluar ChatGPT Sites se conserva como antecedente histórico, pero queda superada por la arquitectura V1 en vivo sobre GitHub Pages.

No se requiere ChatGPT Sites, predeploy, token ni sincronización manual.

---

## 2026-07-12 — La issue de Task Hub es la fuente oficial del estado operativo

**Decisión:** usar la GitHub Issue de `capacita-task-hub` como fuente oficial del estado de cada tarea ejecutable.

**Precedencia:**

```text
Estado real open/closed de la issue
→ Estado operativo escrito en el cuerpo de la issue
→ Planificador Atlas / Projects v2 como espejo visual
→ Dashboard generado desde las issues
```

**Regla operativa:**

- Mientras una issue esté abierta, el campo `Estado:` del cuerpo debe usar `Inbox`, `Hoy`, `Próxima`, `En curso` o `Bloqueada`.
- Al completar una tarea se debe registrar evidencia, actualizar `Estado: Cerrada` y cerrar la issue como `completed`.
- Al reabrir una tarea se debe abrir la issue y asignarle nuevamente un estado operativo abierto.
- Nunca se debe cambiar únicamente el campo del Project dejando desactualizada la issue.
- Si el conector no puede editar Projects v2, se informa `pendiente de clasificación manual en Planificador Atlas`; la issue sigue siendo válida.

**Motivo:** el dashboard operativo lee las issues de Task Hub. Mantener el estado en la issue evita discrepancias entre el cuerpo, el Project y la vista publicada.

---

## 2026-07-11 — Crear Dashboard Visual V0 en GitHub y publicar Sites después — superada

**Decisión histórica:** construir primero una V0 portable basada en snapshot y evaluar ChatGPT Sites posteriormente.

**Estado:** superada el 2026-07-14 por Dashboard V1 vivo en GitHub Pages.

La documentación V0 se conserva como historial, no como arquitectura vigente.

---

## 2026-07-04 — Crear Sistema de Tareas Atlas

**Decisión:** crear un sistema centralizado de tareas usando GitHub, sin depender de Google Tasks, Keep, To Do u otras herramientas dispersas.

**Resultado:**

- Repo: `misaeln-pc1/capacita-task-hub`.
- GitHub Project: **Planificador Atlas**.
- Sistema: **Sistema de Tareas Atlas**.

---

## 2026-07-04 — Separar repo y Project por nombres claros

| Elemento | Nombre |
|---|---|
| Repo de tareas | `capacita-task-hub` |
| GitHub Project | **Planificador Atlas** |
| Sistema completo | **Sistema de Tareas Atlas** |

---

## 2026-07-04 — No usar “Orquestador” para el Project

**Decisión:** descartar “Orquestador Atlas”.

**Nombre elegido:** **Planificador Atlas**.

---

## 2026-07-04 — Regla inicial de ubicación de tareas — superada

**Decisión inicial:** la tarea vive donde se ejecuta.

**Estado:** superada por la regla que separa problemas de tareas ejecutables.

---

## 2026-07-04 — Centralizar todos los issues de gestión en Task Hub — descartada

**Motivo del descarte:** ocultaba problemas, riesgos, ideas e investigaciones de los repos operativos.

---

## 2026-07-04 — Regla vigente: problema en repo, tarea en Task Hub

```text
El problema vive en el repo.
La tarea ejecutable vive en Task Hub.
La evidencia técnica vive en el repo.
```

| Elemento | Dónde vive |
|---|---|
| Idea, investigación, decisión, riesgo, bloqueo, épica o incidente | Repo operativo |
| Tarea ejecutiva | `capacita-task-hub` |
| Personal, administrativa o seguimiento accionable | `capacita-task-hub` |

---

## 2026-07-04 — Auto-add único solo para tareas ejecutables

**Decisión:** mantener un solo workflow Auto-add desde `capacita-task-hub` hacia **Planificador Atlas**.

```text
Repository: misaeln-pc1/capacita-task-hub
Filter: is:issue is:open
```

---

## 2026-07-04 — Vínculo padre/hija entre repo operativo y Task Hub

```text
Repo operativo #XX = issue padre.
Task Hub #YY = tarea ejecutiva derivada.
```

Cada tarea derivada debe declarar issue padre, repo dueño y evidencia esperada.

---

## 2026-07-04 — Las tareas no generan rama/PR por defecto

Crear una tarea no requiere rama, PR ni merge. Se usa rama/PR cuando cambia documentación oficial, código, estructura, decisión o criterio.

---

## 2026-07-04 — Tareas personales como dictado simple

Las tareas personales y administrativas simples viven en Task Hub y no requieren validación documental.

---

## 2026-07-04 — Tres capas del Planificador Atlas

1. **Visibilidad:** pendientes, prioridad, riesgo y siguiente acción.
2. **Tiempo:** estimación, tiempo real y confianza.
3. **Automatización:** delegación, validación humana y fallback.

---

## 2026-07-04 — Registrar tiempo histórico desde Capa 1

Campos mínimos:

- tiempo estimado inicial;
- tiempo real observado;
- confianza;
- causa de desviación.

---

## 2026-07-04 — No automatizar desde el inicio

Primero cargar tareas reales y validar el flujo. Automatizar solo cuando exista patrón repetible, ahorro material y control de errores.
