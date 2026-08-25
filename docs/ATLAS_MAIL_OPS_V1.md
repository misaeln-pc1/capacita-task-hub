# Atlas Mail Ops V1 — Zoho Mail READ-only

## Objetivo

Habilitar a Atlas para apoyar la gestión diaria de correo de Misael sin intervenir el Banco de Relatores:

1. backfill inicial de 30 días;
2. revisión incremental posterior;
3. identificación de urgentes, vencimientos y mensajes probablemente pendientes de respuesta;
4. generación de candidatos a tarea sanitizados;
5. búsqueda privada bajo demanda.

## Frontera estricta

```text
Mercado Público / Banco de Relatores
- conserva su código, CV, SQLite, taxonomía y carpeta R1-RELATORES;
- no se modifica ni se usa como dependencia funcional.

Atlas Mail Ops / Task Hub
- reutiliza solo el contrato OAuth READ y el .env privado existente;
- usa cliente, reglas, SQLite y reportes propios;
- excluye R1-RELATORES antes de listar sus mensajes;
- no descarga adjuntos;
- no crea issues automáticamente durante el piloto.
```

## Configuración privada reutilizada

Ruta local existente:

```text
%USERPROFILE%\OneDrive\Documentos\Proyectos\0-Origen\Zoho_Deluge\.env
```

Variables leídas, nunca impresas ni versionadas:

- `ZOHO_ACCOUNTS_BASE_URL`
- `ZOHO_MAIL_BASE_URL`
- `ZOHO_CLIENT_ID`
- `ZOHO_CLIENT_SECRET`
- `ZOHO_REFRESH_TOKEN`

Scopes autorizados:

```text
ZohoMail.accounts.READ
ZohoMail.folders.READ
ZohoMail.messages.READ
```

El cliente solicita un `access_token` temporal mediante `POST /oauth/v2/token`. Todas las llamadas posteriores a Zoho Mail son `GET`.

## Endpoints READ usados

- `/accounts`
- `/accounts/{accountId}/folders`
- `/accounts/{accountId}/messages/view`
- `/accounts/{accountId}/folders/{folderId}/messages/{messageId}/content`

Zoho documenta que `messages/view` entrega `threadId`, asunto, resumen, remitente, destinatarios y fechas; el endpoint `content` permite recuperar el contenido con el mismo scope READ.

## Arquitectura privada

```text
Zoho Mail READ
  -> inventario de cuentas y carpetas operativas
  -> exclusión R1-RELATORES + spam/papelera/borradores por defecto
  -> backfill 30 días
  -> reconciliación Entrada vs Enviados por threadId
  -> fallback por asunto + destinatario + fecha
  -> clasificación local
  -> SQLite privado
  -> reporte privado con PII
  -> resumen sanitizado sin PII
  -> candidatos a tarea con referencia MAIL-XXXXXXXXXXXX
```

Ubicación privada por defecto:

```text
%USERPROFILE%\OneDrive\Documentos\Proyectos\0-Origen\Atlas_Mail_Ops
```

Archivos:

- `atlas_mail.sqlite3`: índice incremental privado;
- `latest_review_private.json`: correos relevantes, contiene datos personales;
- `latest_summary_sanitized.json`: solo conteos y evidencia técnica;
- `latest_search_private.json`: resultado de consultas bajo demanda.

Ninguno debe subirse a GitHub.

## Ejecución inicial

Desde la rama del piloto:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start_atlas_mail_review.ps1 -LookbackDays 30
```

La ejecución:

- no instala dependencias;
- no imprime secretos;
- no responde, mueve, borra, archiva ni marca correos;
- no crea tareas de GitHub;
- genera candidatos locales para revisión humana.

## Revisión incremental

Después de validar la muestra inicial:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start_atlas_mail_review.ps1 -Incremental
```

V1 conserva estado idempotente por `account_id + folder_id + message_id`. La programación diaria mediante Task Scheduler se habilita solo después de validar precisión, privacidad y ausencia de duplicados.

## Consulta bajo demanda

```powershell
py -3 .\scripts\atlas_mail_review.py search "texto, remitente o referencia privada"
```

La búsqueda trabaja únicamente sobre SQLite local y deja el resultado en `latest_search_private.json`.

## Clasificación

Estados de atención:

- `URGENT`
- `IMPORTANT`
- `REVIEW`
- `FYI`

Estados de respuesta:

- `PROBABLY_RESPONDED_THREAD`
- `PROBABLY_RESPONDED_FALLBACK`
- `PROBABLY_PENDING`
- `REQUIRES_REVIEW`
- `OUTBOUND`

La detección es heurística. No debe considerarse verdad definitiva hasta revisar una muestra humana.

## Creación de tareas

El script no escribe en GitHub. Cuando una acción sea clara, genera un candidato sanitizado:

```text
[Correo][Tarea] Atender pendiente de finanzas (MAIL-XXXXXXXXXXXX)
```

El issue público nunca debe contener:

- remitente o dirección;
- asunto literal;
- cuerpo;
- nombres de clientes o participantes;
- adjuntos;
- datos personales.

Atlas crea la tarea mediante el conector GitHub después de revisar el reporte privado y evitar duplicados. La referencia `MAIL-*` permite volver al correo privado.

## Semáforo

### Amarillo

- lectura de correo productivo;
- datos personales privados;
- clasificación imperfecta;
- almacenamiento local sincronizado con OneDrive;
- falsos positivos o negativos.

### Rojo

Detener ante:

- scopes de escritura;
- exposición de `.env`, tokens o cuerpos en GitHub;
- respuestas, movimientos, borrado, archivado o marcado automático;
- creación masiva de tareas sin calibración;
- inclusión de `R1-RELATORES`.

## Validación mínima

1. Tests offline pasan.
2. Dry-run real de 30 días informa `Writes Zoho Mail: 0` y `Writes GitHub: 0`.
3. `R1-RELATORES` aparece como carpeta omitida y no se consulta.
4. Revisar manualmente al menos 20 resultados: urgentes, importantes, respondidos y pendientes.
5. Corregir reglas si la precisión es insuficiente.
6. Reejecutar y confirmar idempotencia.
7. Solo después habilitar ejecución diaria y creación asistida de tareas.

## Rollback

- detener cualquier programación local;
- eliminar la carpeta privada `Atlas_Mail_Ops` si Misael autoriza perder el índice;
- revocar el refresh token únicamente si existe sospecha de exposición;
- cerrar la rama/PR sin merge si el piloto no aporta.
