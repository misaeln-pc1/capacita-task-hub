# Evidencia de regresión del snapshot

## Caso real

- La issue #26 está cerrada en GitHub y no aparece entre las issues abiertas consultadas.
- La V4 anterior la incluía dentro del arreglo estático de \`dashboard/index.html\`.
- El snapshot regenerado contiene 16 issues abiertas y excluye #26.

## Resultados automatizados

| Prueba | Resultado |
|---|---|
| Issue cerrada #26 excluida | Pasa |
| Issue abierta #21 incluida con título y enlace | Pasa |
| Fecha original de issue vencida #15 conservada | Pasa |
| Regla de arrastre V4 presente | Pasa |
| Corte generado en \`America/Santiago\` | Pasa |
| Generador sin token retorna error | Pasa |
| Aviso de snapshot desactualizado presente | Pasa |
| Controles principales presentes | Pasa |
| Frontend sin token ni llamada a GitHub | Pasa |

## Capturas

- **Antes:** el Site V4 publicado y la captura aportada por Misael muestran #26.
- **Después:** la validación visual automatizada no pudo ejecutarse porque el navegador de QA rechazó la URL local. No se agregó un binario al repo porque \`AGENTS.md\` prohíbe manipular binarios. La evidencia verificable equivalente queda en \`snapshot.json\`, donde #26 está ausente, y en los tests.

## QA de interfaz

El cambio conserva el HTML/CSS visual de V4 y modifica solo la fuente de datos, la fecha de corte y el aviso de obsolescencia. Se validó por contrato la presencia de:

- vista cronológica y Propuesta Atlas;
- semanas y carga semanal;
- búsqueda y filtro de proyectos;
- panel lateral y modal;
- enlaces a issues.

La revisión visual final en escritorio y móvil debe ejecutarse en la vista previa privada antes de autorizar un despliegue. Este PR no despliega.
