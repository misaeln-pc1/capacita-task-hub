# REVIEW_REQUEST

## Alcance

Revisión del PR #9 del repo `capacita-task-hub`, que ajusta el modelo **Planificador Atlas / Sistema de Tareas Atlas**.

## Objetivo

Validar que la documentación registre correctamente la decisión vigente:

```text
El problema vive en el repo.
La tarea ejecutable vive en Task Hub.
La evidencia técnica vive en el repo.
```

## Decisión a revisar

- `capacita-task-hub` no reemplaza los issues de repos operativos.
- `capacita-task-hub` concentra tareas ejecutables, personales, administrativas y seguimientos accionables.
- Ideas, investigaciones, decisiones, riesgos, bloqueos, épicas e incidentes viven en el repo operativo.
- Los issues de repo operativo pueden generar tareas derivadas en Task Hub.
- Cada tarea derivada debe linkear el `Issue padre`.
- El issue padre debe listar sus tareas derivadas y mantenerse abierto mientras el problema siga vivo.
- El **Planificador Atlas** usa un único Auto-add desde Task Hub con filtro `is:issue is:open`.

## Archivos a revisar

| Archivo | Revisión esperada |
|---|---|
| `PROTOCOLO_TAREAS_ATLAS.md` | Regla padre/hija, ubicación por tipo y flujo de maduración. |
| `docs/CAMPOS_PLANIFICADOR_ATLAS.md` | Campos orientados a tareas ejecutables e `Issue padre`. |
| `docs/CONFIGURACION_INICIAL_PLANIFICADOR_ATLAS.md` | Configuración manual del Project bajo el nuevo modelo. |
| `docs/FLUJO_TAREAS_REPOS_OPERATIVOS.md` | Flujo repo operativo -> tareas Task Hub. |
| `docs/WORKFLOW_AUTO_ADD_TASK_HUB.md` | Alcance real del Auto-add único. |
| `DECISIONES.md` | Decisiones superadas y decisión vigente. |
| `TASK_STATUS.md` | Próximos pasos y bloqueos. |
| `CHANGELOG_AGENT.md` | Evidencia de cambios y lectura obligatoria. |

## Preguntas de revisión

1. ¿Queda claro que el radar de problemas sigue viviendo en cada repo operativo?
2. ¿Queda claro que Task Hub es cola de tareas ejecutables y no reemplaza los issues de proyecto?
3. ¿Queda claro cómo se vincula un issue padre con tareas hijas de Task Hub?
4. ¿Queda claro que el Planificador Atlas no es el radar completo de problemas, sino dashboard de ejecución?
5. ¿Queda claro cuándo crear issue en repo operativo versus tarea en Task Hub?
6. ¿Hay riesgo de duplicación o pérdida de trazabilidad?
7. ¿Falta algún campo clave para el Planificador Atlas?

## Definition of Done

- Documentación coherente y sin contradicción con la decisión vigente.
- Riesgo verde/amarillo operativo controlado.
- Sin producción, sin credenciales, sin datos personales, sin scripts.
- PR documental actualizado para revisión.
- Pendientes claros para probar issue padre -> tareas hijas.
