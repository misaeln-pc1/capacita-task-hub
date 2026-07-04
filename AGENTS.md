# AGENTS

## Propósito

Reglas para Atlas, Codex, Copilot, Jules, Gemini/Antigravity u otros agentes que trabajen con `capacita-task-hub` y el **Planificador Atlas**.

## Rol del repo

`capacita-task-hub` es un repo liviano para tareas personales, administrativas, transversales e inbox operativo.

No es PMO global, no reemplaza `capacita-global-control` y no ejecuta producción.

## Lectura obligatoria antes de cambios estructurales

Antes de modificar documentación estructural, prompts, reglas, campos, protocolos o criterios, leer:

1. `PROJECT_CONTEXT.md`.
2. `PROTOCOLO_TAREAS_ATLAS.md`.
3. `TASK_STATUS.md`.
4. `DECISIONES.md`.
5. `RIESGOS.md`.
6. `REPO_MAP.md`.
7. Ruta obligatoria global en `misaeln-pc1/capacita-global-control/docs/LECTURA_OBLIGATORIA_GLOBAL.md` si el cambio afecta estándar, estructura, routing, proyectos o decisiones.

## Permitido sin aprobación humana

Solo si se trabaja en rama distinta de `main`:

- Crear o actualizar Markdown.
- Crear issues simples.
- Clasificar tareas.
- Preparar prompts.
- Documentar riesgos, decisiones y campos.
- Proponer configuración del Planificador Atlas.

## Prohibido sin aprobación humana

- Trabajar directo en `main`.
- Mergear PR.
- Borrar o renombrar archivos.
- Crear GitHub Actions, workflows, scripts o automatizaciones ejecutables.
- Instalar dependencias.
- Usar servicios pagos.
- Tocar producción, Moodle real, Zoho real, Cloudflare, n8n, WhatsApp o SENCE.
- Manipular credenciales, secretos, `.env`, datos personales o binarios.
- Crear tareas duplicadas en Task Hub cuando ya existe repo dueño.

## Regla de tareas

```text
Si la tarea tiene repo dueño -> issue en repo dueño + Planificador Atlas.
Si no tiene repo dueño -> issue en capacita-task-hub + Planificador Atlas.
```

Crear issue no requiere rama ni PR. Rama/PR aplica solo para cambios documentales, código, estructura, decisiones o riesgo.

## Criterio de riesgo

| Riesgo | Acción |
|---|---|
| Verde | Avanzar con issue/documentación reversible. |
| Amarillo | Avanzar con límites, evidencia y posible validación humana. |
| Rojo | Detener y pedir aprobación humana. |

## Evidencia mínima al cerrar

Reportar:

- archivos leídos;
- archivos creados/modificados;
- rama;
- commit SHA;
- PR o issue;
- qué no se tocó;
- riesgos;
- pendientes;
- siguiente paso exacto.

## Estilo

- Contenido explicativo en español.
- Nombres técnicos de archivos, ramas, issues y PR pueden ir en inglés.
- Mantener mínimo trazable viable.
- No crear documentos si no habilitan acción, continuidad, revisión, auditoría o reducción de riesgo.
