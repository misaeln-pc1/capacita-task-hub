# Dashboard Planificador Atlas V1

## Estado

**Operativo y validado visualmente por Misael el 2026-07-14.**

URL principal:

```text
https://misaeln-pc1.github.io/capacita-task-hub/dashboard/
```

GitHub Issues de `misaeln-pc1/capacita-task-hub` es la fuente oficial. El dashboard es una capa de lectura y no modifica tareas.

## Arquitectura vigente

```text
GitHub Issues abiertos
        ↓ API pública de GitHub
Dashboard HTML/CSS/JavaScript
        ↓
GitHub Pages
```

Características técnicas:

- consulta directa de issues abiertos mediante la API pública de GitHub;
- sin token, secreto, Worker, backend o snapshot;
- repositorio e issues públicos;
- actualización al abrir, mediante `Actualizar ahora` y cada cinco minutos mientras la pestaña está visible;
- recursos CSS y JavaScript versionados para evitar caché obsoleta;
- GitHub Pages publicado desde `main` y carpeta raíz;
- dashboard de solo lectura.

## Navegación

```text
Portada
├── Hitos por semana
│   └── Week → listado semanal → detalle interno
└── Carga de tareas por semana
    └── Week → listado semanal → detalle interno
```

Las tarjetas y fichas no abren GitHub. Toda la revisión ocurre dentro del dashboard.

## Ventana semanal

Se usa ISO 8601:

- semana de lunes a domingo;
- identificador interno `YYYY-Www`;
- título visible `Week N`;
- se muestran siempre cinco Weeks: la actual y las cuatro siguientes;
- las Weeks vacías permanecen visibles en ambos bloques.

## Hitos

Una issue se considera hito cuando su tipo o título contiene `Hito`.

El bloque `Hitos por semana`:

- muestra los hitos dentro de su Week;
- conserva una Week aunque no tenga hitos;
- permite abrir el listado semanal;
- identifica el hito dentro de la lista y de su ficha interna.

El lector admite fechas canónicas y variantes históricas como:

- `Fecha inicio`;
- `Fecha término`;
- `Fecha objetivo`;
- `Fecha límite`;
- `Fecha de auditoría`;
- `Fecha de preauditoría`;
- fechas `YYYY-MM-DD`, `DD/MM/YYYY` y texto en español.

## Carga de tareas

El bloque `Carga de tareas por semana` excluye hitos para no duplicarlos.

Semáforo:

- vacío: sin tareas;
- verde: carga baja;
- naranja: carga media;
- rojo: concentración alta o existencia de tareas vencidas.

Una tarea con intervalo aparece en cada Week que atraviesa. Una tarea con una sola fecha se considera de un día.

## Regla de tareas vencidas

Toda issue abierta cuya fecha de término sea anterior al día actual:

- conserva su fecha original;
- se agrega visualmente a la Week actual;
- no rellena las semanas intermedias;
- aparece primero en el listado;
- muestra badge `Vencida`;
- usa tarjeta roja;
- vuelve roja la carga de la Week actual;
- deja de arrastrarse al cerrarse o reprogramarse a una fecha vigente o futura.

La misma regla aplica a hitos vencidos.

Caso validado:

```text
Issue #5
Fecha original: 2026-07-05
Semana histórica: 2026-W27
Semana visible adicional: 2026-W29
Semana intermedia W28: no agregada
Estado: abierta
```

## Tareas sin fecha

Las issues sin fecha reconocible permanecen en `Tareas sin fecha` y no aumentan la carga semanal.

Formato recomendado para nuevas tareas:

```text
Fecha inicio: YYYY-MM-DD
Fecha término: YYYY-MM-DD
```

## Campos de la ficha interna

La ficha puede mostrar:

- título y número;
- proyecto y tipo;
- prioridad, riesgo y estado;
- responsable;
- fecha de inicio y término;
- siguiente acción;
- objetivo;
- estimación;
- Weeks relacionadas;
- contexto, alcance, evidencia y Definition of Done disponibles.

## Seguridad y privacidad

- El repo es público.
- Los títulos, cuerpos, comentarios y metadatos de las issues pueden ser públicos.
- No deben registrarse credenciales, secretos, tokens ni datos personales críticos.
- El dashboard no escribe en GitHub ni almacena datos del usuario.

## Límites operativos

- La API pública está sujeta al límite de solicitudes no autenticadas.
- GitHub Pages puede tardar en publicar después de un merge.
- Cada cambio en CSS o JavaScript debe actualizar la versión de recursos en `dashboard/index.html` para evitar caché antigua.
- GitHub Projects v2 sigue siendo una capa visual; el conector actual no edita sus campos internos.
- El estado real `open/closed` y la clasificación del cuerpo de la issue tienen precedencia.

## Evidencia principal

- #41: lectura en vivo desde GitHub Issues.
- #42: entrada raíz de GitHub Pages.
- #43: detalle interno de tareas.
- #45–#47: vista ISO, navegación semanal y parser de hitos.
- #58: cinco Weeks fijas y portada compacta.
- #60: arrastre de tareas vencidas.
- #61: invalidación de caché de recursos.
- #44: diseño semanal cerrado.
- #59: regla de vencidas cerrada tras validación visual.

## Pruebas controladas

Las issues #48–#57 permitieron validar:

- tareas normales en distintas Weeks;
- hitos en distintas Weeks;
- concentración de carga;
- Weeks vacías;
- navegación interna.

Fueron cerradas como completadas al finalizar la validación para retirar datos de prueba del backlog real.

## Operación diaria

1. Dictar o crear la tarea en Task Hub con clasificación y fechas.
2. Abrir el dashboard o pulsar `Actualizar ahora`.
3. Revisar hitos y carga de la Week actual.
4. Abrir la Week y consultar el detalle interno.
5. Reprogramar tareas vencidas o cerrarlas con evidencia.

## Cierre V1

- [x] Lectura en vivo.
- [x] GitHub Pages operativo.
- [x] Semanas ISO.
- [x] Cinco Weeks visibles.
- [x] Hitos y carga separados.
- [x] Weeks vacías visibles.
- [x] Navegación interna.
- [x] Tareas sin fecha separadas.
- [x] Tareas vencidas arrastradas a la Week actual.
- [x] Señalización roja.
- [x] Caché de recursos controlada.
- [x] Revisión visual humana aprobada.
