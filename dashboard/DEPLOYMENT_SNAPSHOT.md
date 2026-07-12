# Gate de snapshot antes de desplegar

## Causa raíz

La V4 incorporaba las tareas directamente en `dashboard/index.html`. Cerrar una issue en GitHub no modificaba ese HTML; por eso la issue cerrada #26 siguió visible en el Site.

## Arquitectura vigente

```text
GitHub Issues (state=open)
  -> generate-snapshot.mjs
  -> snapshot.json + snapshot.js
  -> validate-snapshot.mjs
  -> revisión humana
  -> checkpoint manual de Sites
```

El navegador consume únicamente `snapshot.js`; no consulta GitHub ni recibe credenciales.

## Precedencia del estado

El gate implementa la decisión mergeada en PR #34:

```text
Estado real open/closed de la issue
  -> Estado operativo escrito en el cuerpo
  -> Planificador Atlas / Projects v2 como espejo visual
  -> Dashboard generado desde las issues
```

- La consulta trae únicamente issues `open`; las cerradas no entran al snapshot.
- El campo `Estado:` del cuerpo clasifica la tarea abierta.
- Los estados abiertos admitidos son `Inbox`, `Hoy`, `Próxima`, `En curso` y `Bloqueada`.
- Una issue abierta con `Estado: Cerrada` u otro valor incompatible bloquea la validación.
- El dashboard no consulta ni usa Projects v2 como fuente de estado.

## Zona horaria

- `generated_at` se guarda como timestamp absoluto UTC ISO 8601 con `Z`.
- `generated_local` y `today` se calculan con `America/Santiago`.
- Cada fecha objetivo conserva un campo `due_date` de calendario local.
- El instante `due` se convierte dinámicamente desde `America/Santiago`; no existe un offset fijo `-04:00` o `-03:00`.
- Las pruebas cubren invierno UTC−4, verano UTC−3 y una hora local que cruza al día UTC siguiente.

## Ejecución del gate

El comando obligatorio es:

```bash
node dashboard/predeploy.mjs
```

El proceso necesita una variable `GITHUB_TOKEN` con acceso de lectura a Issues y metadata del repositorio privado.

## Decisión sobre autenticación

ChatGPT Sites no confirmó que sus secretos de ejecución estén disponibles durante el build. Por tanto, la automatización no dependerá únicamente de Sites y no se debe crear un PAT personal para esta ruta.

La alternativa autorizada se prepara por separado en `capacita-task-hub#35`:

- GitHub Action manual con `workflow_dispatch`;
- `GITHUB_TOKEN` automático de GitHub;
- permisos mínimos explícitos;
- regeneración y validación;
- rama automática y PR draft para revisar el snapshot;
- sin commit directo en `main`;
- sin despliegue automático de Sites.

## Fallo seguro

- Error GitHub, token ausente, estado operativo inválido o snapshot fuera de contrato: proceso termina con código distinto de cero.
- El generador usa archivos temporales y no reemplaza el último snapshot válido ante errores.
- El Site vigente no se modifica desde este PR.

## Límites vigentes

- Snapshot estático; no hay sincronización en vivo.
- GitHub continúa como fuente oficial.
- GitHub Project v2 no forma parte de la consulta.
- La clasificación depende de campos legibles en el cuerpo de cada issue; valores faltantes usan defaults conservadores.
- El workflow manual se revisa en rama y PR separados.
- No se despliega desde este PR.
