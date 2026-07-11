# REVIEW_REQUEST

## Alcance

Revisión del Dashboard Visual V0 del **Planificador Atlas**, asociado al issue `capacita-task-hub#23`.

## Objetivo

Validar que la nueva capa visual:

- mejora la lectura de prioridades, fechas, riesgos y bloqueos;
- mantiene GitHub Issues como fuente oficial;
- no crea una segunda base de tareas;
- puede convertirse posteriormente en un piloto de ChatGPT Sites;
- no introduce API, credenciales, workflows, scripts ni producción.

## Rama

```text
feature/task-hub-visual-dashboard-v0
```

## Archivos principales

| Archivo | Revisión esperada |
|---|---|
| `dashboard/index.html` | Diseño visual, accesibilidad básica, filtros, enlaces, datos y ausencia de dependencias externas. |
| `docs/DASHBOARD_PLANIFICADOR_ATLAS_V0.md` | Fuente, arquitectura, riesgos, rollback y handoff a Sites. |
| `README.md` | Entrada al dashboard y aclaración de fuente oficial. |
| `REPO_MAP.md` | Registro de nuevas rutas. |
| `TASK_STATUS.md` | Estado, pendientes y límites. |
| `DECISIONES.md` | Decisión de snapshot GitHub primero y Sites después. |
| `CHANGELOG_AGENT.md` | Evidencia de lectura, cambios y validación. |

## Datos snapshot esperados

- Issues abiertos incluidos: 13.
- Prioridad P1: 7.
- Bloqueadas o vencidas: 2.
- Sin fecha absoluta: 11.
- Riesgo rojo: 1.
- Hito oficial SOFOFA: 22/07/2026 14:00 America/Santiago.

## Preguntas de revisión

1. ¿El dashboard permite entender el foco sin leer una tabla extensa?
2. ¿Queda inequívoco que GitHub es la fuente de verdad?
3. ¿Las fechas internas SOFOFA están claramente separadas del plazo oficial?
4. ¿Los conteos visibles reconcilian con el arreglo `TASKS`?
5. ¿Los filtros funcionan sin dependencia externa?
6. ¿Existe riesgo de exponer información privada al publicar posteriormente en Sites?
7. ¿La V0 aporta suficiente valor para justificar un piloto de publicación?

## Validación realizada

- HTML parseado correctamente.
- JavaScript embebido validado con `node --check`.
- Conteos reconciliados contra 13 objetos del snapshot.
- Sin librerías, fuentes o recursos externos.
- Sin API GitHub en runtime.
- Sin credenciales, formularios, almacenamiento o escritura.
- Prueba de screenshot headless intentada, pero Chromium del entorno quedó bloqueado por restricciones del contenedor; no se usa como evidencia de aprobación visual.

## Riesgo

**Amarillo bajo**:

- el dashboard puede quedar desactualizado;
- una publicación Sites sería una URL desplegada y requiere revisión separada;
- las clasificaciones inferidas deben corregirse en GitHub si no representan el estado real.

## Definition of Done de revisión

- [ ] Revisión visual humana.
- [ ] Revisión de conteos y clasificaciones.
- [ ] Confirmación de que el snapshot es aceptable como V0.
- [ ] Aprobación o solicitud de cambios.
- [ ] Merge únicamente por Misael.
- [ ] Después del merge, piloto Sites en tarea separada.
