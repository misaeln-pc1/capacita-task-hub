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

## 2026-07-04 — Regla de ubicación de tareas

**Decisión:** la tarea vive donde se ejecuta.

```text
Tarea con repo dueño -> issue en repo dueño + visible en Planificador Atlas.
Tarea sin repo dueño -> issue en capacita-task-hub + visible en Planificador Atlas.
```

**Motivo:** evitar duplicación entre repos, chats y panel central.

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
[Personal] Comprar polera
[Personal] Ir al banco
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

## 2026-07-04 — No automatizar desde el inicio

**Decisión:** primero cargar tareas reales y configurar campos/vistas. La automatización queda como capa posterior.

**Motivo:** automatizar sin backlog real genera sobreingeniería.

**Siguiente paso:** cargar 10–20 tareas reales, observar uso y recién después proponer automatizaciones.
