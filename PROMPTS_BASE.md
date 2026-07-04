# PROMPTS_BASE

## Propósito

Prompts breves y reutilizables para trabajar con el **Sistema de Tareas Atlas**.

---

# Agregar tarea simple al Planificador

```text
Atlas, agrega esto al Planificador:
[TAREA]

Clasifícala como tarea personal/administrativa/transversal si no tiene repo dueño. Si tiene repo dueño, créala en el repo correcto. No crees rama ni PR salvo que implique decisión, documentación oficial, código, estructura, riesgo o validación pendiente.
```

---

# Agregar tareas desde un proyecto operativo

```text
Atlas, estamos en el proyecto [PROYECTO]. Agrega estas tareas al Planificador:

1. [TAREA 1]
2. [TAREA 2]
3. [TAREA 3]

Regla: si pertenecen al repo operativo, crea issues ahí y no las dupliques en Task Hub. Si alguna es personal/transversal o no tiene repo dueño claro, envíala a capacita-task-hub. Marca prioridad, riesgo, responsable, siguiente acción y origen/validación.
```

---

# Captura rápida de pendientes dispersos

```text
Atlas, convierte esta lista en tareas del Planificador. No sobreestructures. Para cada una decide si vive en repo operativo o en capacita-task-hub. Marca Capa 1 completa y estima tiempo solo si es P1/P2 o de esta semana.

[LISTA]
```

---

# Revisar tareas pendientes de hoy

```text
Atlas, revisa el Planificador Atlas y dime las tareas de hoy. Agrupa por: P1, bloqueadas, depende de mí, automatizables y personales. Recomienda una sola ruta principal para avanzar hoy.
```

---

# Planificación de tiempo semanal

```text
Atlas, revisa las tareas P1/P2 de esta semana y estima:
- tamaño estimado;
- tiempo activo Misael;
- tiempo IA/agente;
- confianza;
- causa de incertidumbre;
- qué dividirías antes de ejecutar.

No estimes tareas P3 salvo que bloqueen algo.
```

---

# Detectar automatizables

```text
Atlas, revisa las tareas abiertas y detecta cuáles son automatizables. Clasifica en No, Parcial o Sí. Para cada una indica ejecutor sugerido, riesgo de automatización, validación humana y siguiente paso mínimo.
```

---

# Crear prompt para agente ejecutor

```text
Atlas, toma esta tarea del Planificador y prepara un único prompt operativo para el agente ejecutor.

Incluye: ejecutor, repo, rama, carpeta, objetivo, permitidos, prohibidos, qué no tocar, validación mínima, evidencia esperada, commit/push/PR si aplica y Definition of Done.

No des pasos sueltos si un agente puede ejecutarlo.
```

---

# Revisión de tarea derivada de decisión

```text
Atlas, esta tarea deriva de una decisión ya validada. Regístrala como acción ejecutiva, referencia el PR/documento origen y no crees una nueva rama/PR salvo que haya nueva decisión o cambio documental.

Tarea: [TAREA]
Origen: [PR/DOCUMENTO/DECISIÓN]
```

---

# Tarea pendiente de decisión

```text
Atlas, esta no es una acción decidida todavía. Regístrala como Pendiente de decisión o Idea a evaluar. El siguiente paso debe ser evaluar/validar, no ejecutar.

Tema: [TEMA]
```

---

# Cierre de jornada

```text
Atlas, revisa el Planificador y dame cierre de jornada:
- qué se avanzó;
- qué queda bloqueado;
- qué depende de mí;
- qué conviene mover a mañana;
- qué no debería tocarse todavía por riesgo;
- una recomendación de próximo paso.
```
