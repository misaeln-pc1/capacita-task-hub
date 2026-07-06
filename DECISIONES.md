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
| Repo de tareas | `capacita-task-hub` |
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

**Estado:** superada por una regla más precisa que separa problemas de tareas ejecutables.

---

## 2026-07-04 — Centralizar todos los issues de gestión en Task Hub — descartada

**Decisión intermedia descartada:** todo issue de gestión se crea en `capacita-task-hub`.

**Motivo del descarte:** aunque resolvía el límite de workflows Auto-add, dejaba fuera del radar de cada repo los problemas, riesgos, ideas, investigaciones y decisiones. Eso hacía incompleto cualquier análisis local del repo operativo.

**Ejemplo de riesgo:** un problema grave de autenticación en Moodle no debe quedar solo en Task Hub, porque al revisar el repo Moodle parecería que no existe.

---

## 2026-07-04 — Regla vigente: problema en repo, tarea en Task Hub

**Decisión vigente:** separar issue padre y tarea ejecutable.

```text
El problema vive en el repo.
La tarea ejecutable vive en Task Hub.
La evidencia técnica vive en el repo.
```

**Resultado operativo:**

| Elemento | Dónde vive |
|---|---|
| Idea a evaluar | Repo operativo |
| Investigación | Repo operativo |
| Decisión pendiente | Repo operativo o Global |
| Riesgo / bloqueo | Repo operativo; Global si es transversal |
| Épica / iniciativa | Repo operativo |
| Incidente grave | Repo operativo; Global si afecta varios proyectos |
| Tarea ejecutiva | `capacita-task-hub` |
| Personal / administrativa / seguimiento accionable | `capacita-task-hub` |

**Motivo:** conservar el radar del proyecto en su repo natural y usar Task Hub como cola de ejecución centralizada.

---

## 2026-07-04 — Auto-add único solo para tareas ejecutables

**Decisión:** mantener un solo workflow Auto-add desde `capacita-task-hub` hacia **Planificador Atlas**.

```text
Repository: misaeln-pc1/capacita-task-hub
Filter: is:issue is:open
```

**Alcance:** captura tareas ejecutables, personales, administrativas y seguimientos accionables creados en Task Hub.

**No captura:** ideas, investigaciones, decisiones, riesgos, bloqueos y épicas de repos operativos. Esos se revisan en el repo correspondiente.

**Motivo:** resolver el límite de workflows sin ocultar problemas de los repos operativos.

---

## 2026-07-04 — Vínculo padre/hija entre repo operativo y Task Hub

**Decisión:** cuando un issue del repo operativo genere acciones concretas, esas acciones se crean como tareas en Task Hub y quedan vinculadas.

**Regla:**

```text
Repo operativo #XX = issue padre.
Task Hub #YY = tarea ejecutiva derivada.
```

**El issue padre debe listar tareas derivadas:**

```markdown
## Tareas derivadas en Task Hub

- [ ] capacita-task-hub#YY — Descripción breve
```

**Cada tarea Task Hub debe declarar:**

```text
Issue padre:
Repo dueño:
Evidencia esperada:
```

---

## 2026-07-04 — Las tareas no generan rama/PR por defecto

**Decisión:** crear tarea no requiere rama, PR ni merge.

**Motivo:** una tarea es una acción pendiente, no necesariamente una decisión ni una modificación documental.

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

1. **Visibilidad:** capturar pendientes ejecutables y urgencias.
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

**Siguiente paso:** probar vínculo issue padre -> tareas Task Hub antes de cargar backlog completo.
