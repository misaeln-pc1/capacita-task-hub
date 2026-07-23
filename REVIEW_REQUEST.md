# REVIEW_REQUEST

## Alcance

Revisión documental de cierre del **Planificador Atlas V1**, asociada a la issue `capacita-task-hub#62`.

La implementación funcional ya fue aprobada visualmente por Misael. Este cambio no modifica la lógica del dashboard.

## Objetivo

Confirmar que la documentación oficial:

- describe la arquitectura viva basada en GitHub Issues;
- elimina referencias vigentes al snapshot y a ChatGPT Sites;
- registra la URL operativa de GitHub Pages;
- documenta Weeks ISO, hitos, carga, tareas sin fecha y vencidas;
- conserva GitHub Issues como fuente oficial;
- registra el cierre de pruebas e incidencias.

## Rama

```text
docs/dashboard-live-v1-closure
```

## Archivos de revisión

| Archivo | Revisión esperada |
|---|---|
| `docs/DASHBOARD_PLANIFICADOR_ATLAS_V1.md` | Arquitectura, reglas y operación diaria. |
| `README.md` | Entrada vigente, URL y privacidad. |
| `TASK_STATUS.md` | Estado operativo y ausencia de pendientes de implementación. |
| `REPO_MAP.md` | Mapa de módulos y pruebas. |
| `DECISIONES.md` | Decisiones vigentes del dashboard V1. |
| `CHANGELOG_AGENT.md` | Registro de cierre. |
| `docs/DASHBOARD_PLANIFICADOR_ATLAS_V0.md` | Marcado como documento histórico superado. |

## Evidencia funcional ya validada

- PR #41: consulta en vivo.
- PR #42: GitHub Pages.
- PR #43: detalle interno.
- PR #45–#47: Weeks ISO y parser.
- PR #58: cinco Weeks y compactación.
- PR #60: arrastre de vencidas.
- PR #61: control de caché.
- Issue #44: cerrada.
- Issue #59: cerrada después de aprobación visual.
- Issues #48–#57: pruebas cerradas.
- Merge funcional final: `95ea416f57489e32d1c675c6c65c9c90c2092277`.

## No se modifica

- código del dashboard;
- GitHub Pages;
- issues operativas reales;
- credenciales o secretos;
- Actions, workflows o integraciones;
- Projects v2.

## Riesgo

**Verde:** actualización documental reversible.

## Definition of Done

- [x] Documentación V1 creada.
- [x] README actualizado.
- [x] TASK_STATUS actualizado.
- [x] REPO_MAP actualizado.
- [x] Revisión funcional humana ya aprobada.
- [ ] Revisión del diff documental.
- [ ] Merge por Misael.
- [ ] Issue #62 cerrada después del merge.
