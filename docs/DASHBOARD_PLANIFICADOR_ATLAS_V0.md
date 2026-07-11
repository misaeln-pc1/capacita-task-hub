# Dashboard Visual Planificador Atlas V0

## Objetivo

Crear una capa visual de lectura para el **Sistema de Tareas Atlas** sin sustituir GitHub Issues ni el GitHub Project **Planificador Atlas**.

La V0 permite revisar rápidamente:

- tareas abiertas;
- prioridades P1/P2;
- riesgos;
- bloqueos y vencimientos;
- tareas sin fecha absoluta;
- foco inmediato;
- ruta crítica SOFOFA;
- enlaces directos a los issues.

## Ubicación

```text
dashboard/index.html
```

## Fuente de verdad

```text
GitHub Issues / capacita-task-hub
```

El dashboard es una **vista snapshot**, no una base de datos ni un gestor alternativo.

Regla vigente:

```text
El problema vive en el repo.
La tarea ejecutable vive en Task Hub.
La evidencia técnica vive en el repo.
```

## Fuente del snapshot V0

- Repositorio: `misaeln-pc1/capacita-task-hub`.
- Consulta conceptual: issues abiertos.
- Fecha del snapshot: 2026-07-11 05:14 America/Santiago.
- Total incluido: 13 issues abiertos, incluido el issue de construcción del dashboard.
- Datos incluidos: título, proyecto, tipo, prioridad, riesgo, responsable, estado, fecha visible, siguiente acción y URL.

## Diseño V0

### Indicadores

- Tareas abiertas.
- Prioridad P1.
- Bloqueadas o vencidas.
- Sin fecha absoluta.
- Hitos de riesgo rojo.

### Componentes

1. Hero ejecutivo.
2. Foco inmediato de máximo tres tareas.
3. Timeline de la ruta crítica SOFOFA.
4. Filtros por texto, prioridad, riesgo, estado y proyecto.
5. Lista de tareas con enlace directo a GitHub.
6. Panel de brechas de planificación.
7. Fuente, fecha de snapshot y limitaciones visibles.

## Arquitectura técnica

- HTML, CSS y JavaScript nativos.
- Un solo archivo portable.
- Sin librerías externas.
- Sin fuentes externas.
- Sin API GitHub en runtime.
- Sin almacenamiento local.
- Sin formularios ni escritura.
- Sin credenciales.
- Los únicos accesos de red ocurren cuando el usuario pulsa un enlace explícito a GitHub.

## Decisiones

### Snapshot antes que integración

La V0 usa un snapshot embebido para validar utilidad, diseño y criterio de priorización antes de crear sincronización.

Motivo:

- evita credenciales y scopes;
- evita GitHub Actions o APIs prematuras;
- facilita importar o reconstruir posteriormente en Sites;
- mantiene un fallback portable en GitHub.

### Sites como fase posterior

ChatGPT Sites queda como capacidad candidata/piloto para publicar la vista después de revisar la V0.

La publicación será una fase separada porque una URL desplegada debe tratarse como producción y requiere revisar acceso, datos y actualización del snapshot.

### Work no es la superficie principal

Work puede ayudar a crear o mantener el entregable, pero no es la fuente de verdad ni el alojamiento operativo. GitHub conserva código, versión, diff, rollback y PR.

## Ruta crítica SOFOFA incluida

Las fechas internas son una propuesta de trabajo y no reemplazan el hito oficial:

| Fecha | Entregable |
|---|---|
| 2026-07-12 | Cursos definitivos y Go/No-Go. |
| 2026-07-14 | PF, metodología y requisitos técnicos. |
| 2026-07-16 | Costos, utilidad y anexos económicos. |
| 2026-07-17 | Documentos administrativos completos. |
| 2026-07-20 | Correcciones cerradas y versión congelada. |
| 2026-07-21 | Validación humana, firma y prueba de carga. |
| 2026-07-22 10:00 | Objetivo interno de envío. |
| 2026-07-22 14:00 | Límite oficial SOFOFA. |

## Actualización del snapshot

En V0 la actualización es manual y controlada:

1. revisar issues abiertos;
2. actualizar el arreglo `TASKS` dentro de `dashboard/index.html`;
3. actualizar fecha y conteos del snapshot;
4. validar que tarjetas, filtros y lista reconcilien;
5. revisar diff y publicar mediante PR.

No se crea script de actualización en esta fase.

## Validación mínima

- HTML parseable.
- JavaScript validado sintácticamente con `node --check` sobre el bloque embebido.
- 13 tareas en el snapshot.
- 7 tareas P1.
- 2 tareas bloqueadas o vencidas.
- 11 tareas sin fecha absoluta.
- 1 hito rojo.
- Sin dependencias o solicitudes de red automáticas.
- Diseño responsive mediante CSS.

## Riesgos

| Riesgo | Semáforo | Mitigación |
|---|---|---|
| Snapshot desactualizado | Amarillo | Mostrar fecha de corte y GitHub como fuente oficial. |
| Duplicar gestión | Amarillo | Dashboard solo lectura; cambios se hacen en issues. |
| Fechas internas confundidas con plazos oficiales | Amarillo | Etiquetarlas como propuestas internas. |
| Publicar información privada | Amarillo/Rojo | Revisar contenido y acceso antes de Sites. |
| Integración prematura | Amarillo | No usar API, Actions ni credenciales en V0. |

## Rollback

El dashboard no altera tareas ni configuración. Para revertir:

- no mergear el PR; o
- retirar `dashboard/index.html` y esta documentación mediante PR posterior autorizado.

## Definition of Done V0

- [x] HTML portable creado.
- [x] Datos snapshot identificados y fechados.
- [x] Indicadores reconciliados.
- [x] Filtros y enlaces implementados.
- [x] Ruta crítica SOFOFA visible.
- [x] Sin API, credenciales, workflows o producción.
- [ ] Revisión humana del PR.
- [ ] Merge autorizado por Misael.
- [ ] Publicación posterior en Sites como piloto separado.
