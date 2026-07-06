# DECISIONES

## 2026-07-04 — Crear Sistema de Tareas Atlas

**Decisión:** crear un sistema centralizado de tareas usando GitHub, sin depender de Google Tasks, Keep, To Do u otras herramientas dispersas.

**Motivo:** las tareas nacen en múltiples proyectos y chats. Se requiere una vista única, trazable y ordenada.

**Resultado:**

- Repo: `misaeln-pc1/capacita-task-hub`.
- GitHub Project: **Planificador Atlas**.
- Sistema: **Sistema de Tareas Atlas**.

**Riesgo:** verde. Es organización documental y operativa, sin producción ni datos sensibles.

---

## 2026-07-04 — Separar repo y Project por nombres claros

**Decisión:** usar nombres diferenciados para evitar confusión semántica.

| Elemento | Nombre |
|---|---|
| Repo | `capacita-task-hub` |
| GitHub Project | **Planificador Atlas** |
| Sistema completo | **Sistema de Tareas Atlas** |

**Motivo:** nombres parecidos como “Task Hub” y “Atlas Task Hub” generaban confusión entre repo, panel y sistema.

---

## 2026-07-04 — No usar “Orquestador” para el Project

**Decisión:** descartar “Orquestador Atlas”.

**Motivo:** “orquestador” se usa mucho para APIs, n8n, WhatsApp, integraciones y automatizaciones; podría confundirse con arquitectura técnica.

**Nombre elegido:** **Planificador Atlas**.

---

## 2026-07-04 — Regla inicial de ubicación de tareas — superada

**Decisión inicial:** la tarea vive donde se ejecuta.

```text
Tarea con repo dueño -> issue en repo dueño + visible en Planificador Atlas.
Tarea sin repo dueño -> issue en capacita-task-hub + visible en Planificador Atlas.
```

**Estado:** superada por la decisión posterior de centralizar issues de gestión en `capacita-task-hub`.

**Motivo del cambio:** límite de workflows Auto-add de GitHub Projects. Cubrir muchos repos con un workflow por repo no escala en el plan actual.

---

## 2026-07-04 — Centralizar todos los issues de gestión en Task Hub

**Decisión vigente:** todo issue de gestión se crea en `misaeln-pc1/capacita-task-hub`.

**Regla:**

```text
Task Hub = registro maestro de issues.
Planificador Atlas = vista central.
Repo operativo = lugar de ejecución técnica si aplica.
```

**Motivo:** permite usar un solo workflow Auto-add desde `capacita-task-hub` hacia **Planificador Atlas**:

```text
Repository: misaeln-pc1/capacita-task-hub
Filter: is:issue is:open
```

**Efecto:** las tareas de Moodle, Edge, Zoho, Licitaciones, Diseño Cursos y otros proyectos también nacen como issues en Task Hub, pero indicando `Proyecto operativo` y `Repo dueño`.

**Riesgo:** amarillo operativo bajo. Se pierde parte de trazabilidad local en cada repo, mitigada con campos obligatorios y PR/commit de evidencia.

---

## 2026-07-04 — Todo issue abierto entra al Planificador Atlas

**Decisión:** el workflow Auto-add no debe filtrar solo tareas ejecutivas.

**Regla:**

```text
Todos los issues abiertos de Task Hub entran al Planificador Atlas.
El campo Tipo decide si se ejecutan, evalúan, investigan o quedan como decisión pendiente.
```

**Motivo:** ideas, decisiones, investigaciones, bloqueos e iniciativas también deben estar visibles para no perderlas.

**Vista clave:** el dashboard diario de trabajo filtra solo `Tipo = Tarea ejecutiva`.

---

## 2026-07-04 — Issue no significa tarea ejecutiva

**Decisión:** un issue es una unidad de gestión, no necesariamente una tarea ejecutable.

**Tipos oficiales iniciales:**

- Tarea ejecutiva.
- Idea a evaluar.
- Decisión pendiente.
- Investigación.
- Bloqueo/Incidente.
- Épica/Iniciativa.
- Personal.
- Seguimiento.
- Administrativa.

**Motivo:** evitar que una idea inmadura se transforme accidentalmente en trabajo técnico.

**Regla operativa:**

```text
Una tarea ejecuta.
Una idea se evalúa.
Una decisión se valida.
Una investigación busca información.
Una épica se divide.
Un bloqueo se destraba.
```

---

## 2026-07-04 — Las tareas no generan rama/PR por defecto

**Decisión:** crear tarea no requiere rama, PR ni merge.

**Motivo:** una tarea es una acción pendiente, no una decisión ni una modificación documental.

**Excepción:** usar rama/PR cuando la tarea implique modificar documentación oficial, código, estructura, decisión relevante o criterio operativo.

---

## 2026-07-04 — Tareas personales como dictado simple

**Decisión:** las tareas personales, administrativas simples o cotidianas viven en `capacita-task-hub` y no requieren validación documental.

**Ejemplo:**

```text
[Personal][Tarea] Comprar polera
[Personal][Tarea] Ir al banco
```

**Motivo:** no tiene sentido aplicar flujo de PR a tareas personales.

---

## 2026-07-04 — Tres capas del Planificador Atlas

**Decisión:** dividir el sistema en tres capas progresivas:

1. **Visibilidad:** capturar pendientes y urgencias.
2. **Tiempo:** estimar esfuerzo, carga humana, confianza e incertidumbre.
3. **Automatización:** identificar qué puede delegarse a IA/agentes/API.

**Motivo:** partir simple, pero permitir evolución hacia planificación y automatización sin rediseñar todo.

---

## 2026-07-04 — Registrar tiempo histórico desde Capa 1

**Decisión:** crear campos mínimos de tiempo desde el día 1, aunque la Capa 2 formal venga después.

**Campos:**

- Tiempo estimado inicial.
- Tiempo real observado.
- Confianza estimación.
- Causa desviación.

**Motivo:** generar historial para predicción futura sin sobrecargar la operación inicial.

---

## 2026-07-04 — No automatizar desde el inicio

**Decisión:** primero cargar tareas reales y configurar campos/vistas. La automatización queda como capa posterior.

**Motivo:** automatizar sin backlog real genera sobreingeniería.

**Siguiente paso:** cargar issues reales, observar uso y recién después proponer automatizaciones.
