# Evidencia de regresión del snapshot

## Caso real

- La issue #26 está cerrada en GitHub y no aparece entre las issues abiertas consultadas.
- La V4 anterior la incluía dentro del arreglo estático de `dashboard/index.html`.
- El snapshot revisado contiene 18 issues abiertas, incluye la tarea #35 y excluye #26.

## Resultados automatizados

Resultado local: **14/14 pruebas correctas**.

| Prueba | Resultado |
|---|---|
| Issue cerrada #26 excluida | Pasa |
| Issue abierta #21 incluida con título y enlace | Pasa |
| Fecha calendario local de issue vencida #15 conservada | Pasa |
| Regla de arrastre V4 presente | Pasa |
| `generated_at` absoluto UTC y corte local Santiago | Pasa |
| Conversión invierno UTC−4 | Pasa |
| Conversión verano UTC−3 | Pasa |
| Fecha local preservada al cruzar día UTC | Pasa |
| Estado `open/closed` prevalece | Pasa |
| Estado operativo incompatible queda marcado | Pasa |
| Generador sin token retorna error | Pasa |
| Aviso de snapshot desactualizado presente | Pasa |
| Controles principales presentes | Pasa |
| Frontend sin token, llamada a GitHub ni offset fijo | Pasa |

## Contrato temporal

- `generated_at`: timestamp UTC ISO 8601 con `Z`.
- `generated_local`: representación de corte en `America/Santiago`.
- `today`: fecha calendario local de Santiago.
- `due`: instante UTC.
- `due_date`: fecha calendario local que gobierna semana, arrastre y vencimiento.

## Capturas

- **Antes:** el Site V4 publicado y la captura aportada por Misael muestran #26.
- **Después:** no se ejecutó un checkpoint ni despliegue. La evidencia verificable queda en `snapshot.json`, `snapshot.js` y los tests.

## QA de interfaz

Se validó por contrato la presencia de:

- vista cronológica y Propuesta Atlas;
- semanas y carga semanal;
- búsqueda y filtro de proyectos;
- panel lateral y modal;
- enlaces a issues;
- aviso de obsolescencia;
- ausencia de offsets fijos `-04:00` y `-03:00`.

La revisión visual final en escritorio y móvil sigue pendiente antes de cualquier despliegue. Este PR no despliega.
