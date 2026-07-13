# Workflow manual de actualización del snapshot

## Objetivo

Regenerar y validar el snapshot del Planificador Atlas desde GitHub Issues mediante una ejecución manual, sin crear un token personal, sin escribir directo en `main` y sin desplegar ChatGPT Sites.

## Workflow

Ruta:

```text
.github/workflows/refresh-dashboard-snapshot.yml
```

Disparador:

```text
workflow_dispatch
```

El workflow solo puede ejecutarse desde la interfaz de GitHub Actions cuando el archivo existe en la rama por defecto.

## Autenticación

Usa el `GITHUB_TOKEN` automático y efímero de cada ejecución:

```text
GITHUB_TOKEN = github.token
```

No requiere PAT personal ni secreto adicional.

Permisos explícitos:

| Permiso | Nivel | Motivo |
|---|---|---|
| `issues` | `read` | Consultar issues abiertas del repositorio privado. |
| `contents` | `write` | Crear y publicar una rama con los snapshots regenerados. |
| `pull-requests` | `write` | Abrir un PR draft para revisión humana. |
| Otros | Sin permiso | No son necesarios. |

## Flujo

```text
Ejecución manual
→ checkout de la rama por defecto
→ node dashboard/predeploy.mjs
→ node --test dashboard/tests/*.test.mjs
→ git diff --check
→ rama automation/dashboard-snapshot-<run_id>-<run_attempt>
→ commit solo de snapshot.json y snapshot.js
→ PR draft contra la rama por defecto
→ revisión humana
```

El workflow no hace merge y no despliega Sites.

## Ramas únicas en reintentos

GitHub mantiene el mismo `GITHUB_RUN_ID` cuando se reejecuta un run. En cambio, `GITHUB_RUN_ATTEMPT` comienza en `1` y aumenta en cada reintento.

Por eso el nombre de rama combina ambos valores:

```text
automation/dashboard-snapshot-${GITHUB_RUN_ID}-${GITHUB_RUN_ATTEMPT}
```

Esto evita que un reintento intente publicar sobre la rama creada por un intento anterior.

## Fallo seguro

La ejecución se detiene si:

- GitHub no puede devolver las issues;
- el token automático no tiene los permisos requeridos;
- el snapshot no supera la validación;
- una issue abierta tiene un estado operativo incompatible;
- falla cualquier prueba;
- existe un error de formato en el diff;
- no se puede crear la rama o el PR.

Ningún fallo modifica `main` ni el Site publicado.

## Salida sin cambios

Si los archivos generados son idénticos a los versionados, la ejecución termina sin crear rama ni PR.

En la operación habitual `generated_at` cambia, por lo que normalmente existirá un PR nuevo para revisión.

## Configuración requerida del repositorio

La configuración del repositorio debe permitir que GitHub Actions cree pull requests. Si está deshabilitada, el paso `gh pr create` falla de forma segura después de publicar la rama.

Ruta de interfaz:

```text
Settings
→ Actions
→ General
→ Workflow permissions
→ Allow GitHub Actions to create and approve pull requests
→ Save
```

No modificar esta configuración sin autorización humana específica.

## Uso futuro

1. abrir la pestaña **Actions** del repositorio;
2. seleccionar **Refresh dashboard snapshot**;
3. pulsar **Run workflow** sobre `main`;
4. esperar que termine correctamente;
5. revisar el PR draft creado;
6. mergear el snapshot solo con autorización;
7. actualizar Sites en un paso posterior separado y autorizado.

## Rollback

- Cerrar el PR automático si el snapshot no es válido.
- Eliminar manualmente la rama automática solo después de revisar que no contiene evidencia necesaria.
- Mantener el último Site válido sin cambios.

## Límites

- No sincronización en vivo.
- No despliegue automático.
- No lectura de GitHub Projects v2.
- No PAT personal.
- No secretos personalizados.
