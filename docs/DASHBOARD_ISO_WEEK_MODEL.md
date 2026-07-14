# Modelo semanal ISO del Planificador Atlas

## Estado

Diseño aprobado por Misael para el issue `#44`.

## Objetivo

Transformar el dashboard vivo en una vista temporal de solo lectura, centrada en hitos y carga de tareas por semanas ISO 8601.

## Navegación

```text
Vista principal
├── Hitos por semana ISO
├── Carga de tareas por semana
└── Tareas sin fecha

Clic en semana → vista interna de semana
Clic en tarea o hito → vista interna de detalle
```

Rutas internas:

```text
#/
#/week/2026-W29
#/task/21
#/undated
```

Una sola aplicación HTML reconstruye las vistas desde las issues abiertas. No se generan archivos individuales por tarea.

## Semana estándar

Se usa ISO 8601:

- identificador `YYYY-Www`;
- lunes a domingo;
- la semana 1 es la semana que contiene el primer jueves del año;
- el año ISO puede diferir del año calendario al inicio o final del año.

Ejemplo:

```text
2026-W29 = lunes 13 de julio a domingo 19 de julio de 2026
```

## Identificación de hitos

Una issue se considera hito cuando:

- el campo `Tipo` contiene `Hito`; o
- el título contiene `[HITO]` o la palabra `Hito`.

## Contrato temporal

Campos canónicos recomendados:

```text
Fecha inicio: YYYY-MM-DD
Fecha término: YYYY-MM-DD
```

Reglas:

1. Con inicio y término, la tarea aparece en todas las semanas que atraviesa.
2. Con una sola fecha, inicio y término se consideran iguales.
3. Sin fecha, queda en `Sin fecha` y no se suma a la carga semanal.
4. Una fecha contextual como `Inicio del curso` no se interpreta automáticamente como inicio de ejecución de la tarea.

Compatibilidad con formatos existentes:

- `Fecha objetivo`;
- `Fecha límite`;
- `Fecha fin`;
- `YYYY-MM-DD`;
- `DD/MM/YYYY` o `DD-MM-YYYY`;
- fechas escritas en español.

## Carga semanal

La intensidad visual se calcula con tareas que no son hitos:

```text
cantidad de tareas de la semana / máxima cantidad del rango visible
```

Una tarea con intervalo se cuenta en cada semana que toca. Los hitos se informan aparte para evitar duplicar su peso.

## Vista interna de semana

Muestra el identificador ISO, rango lunes-domingo, hitos y tareas activas de la semana.

## Vista interna de tarea

Muestra número, título, proyecto, tipo, estado, prioridad, riesgo, responsable, fecha de inicio, fecha de término, siguiente acción, objetivo, estimación, semanas ISO y secciones contextuales disponibles.

No incluye navegación automática a GitHub. El dashboard es de lectura; Atlas modifica la issue oficial cuando Misael dicta cambios.

## Fuente y actualización

```text
GitHub Issues abiertas → API pública → normalización temporal → vistas internas
```

Se conserva la actualización al abrir, el botón `Actualizar ahora` y la actualización cada cinco minutos con la pestaña visible.

## Limitaciones

- la calidad cronológica depende de las fechas escritas en las issues;
- las tareas sin fecha requieren planificación posterior;
- el dashboard es solo lectura;
- el repositorio y sus issues deben permanecer públicos mientras se use la API pública directa.

## Validación

```text
node --check dashboard/iso/core.js
node --check dashboard/iso/calendar.js
node --check dashboard/iso/data.js
node --check dashboard/iso/home.js
node --check dashboard/iso/detail.js
node --check dashboard/iso/app.js
node --test dashboard/tests/live-dashboard-contract.test.mjs
```
