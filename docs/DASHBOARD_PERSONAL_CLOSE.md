# Cierre personal de tareas desde Planificador Atlas

## Objetivo

Permitir que Misael cierre como completada la GitHub Issue que está viendo en el dashboard, desde computador o celular, sin Worker, backend, GitHub App ni workflow.

## Arquitectura

```text
Ficha interna de la tarea
→ botón Cerrar como completada
→ confirmación humana
→ PATCH a la misma issue visualizada
→ GitHub registra closed_at y state_reason=completed
→ actualización inmediata del dashboard
```

La fuente oficial sigue siendo la GitHub Issue. Al quedar cerrada, deja de aparecer entre las tareas abiertas.

## Alcance exacto del botón

El dashboard envía exclusivamente:

```json
{
  "state": "closed",
  "state_reason": "completed"
}
```

Endpoint fijo:

```text
PATCH https://api.github.com/repos/misaeln-pc1/capacita-task-hub/issues/<issue_visualizada>
```

El número se toma de la ruta y de la ficha abierta. Si no coinciden, el cierre se bloquea.

El botón no:

- elimina issues, comentarios ni archivos;
- cambia título, cuerpo, labels, responsable o milestone;
- agrega comentarios;
- modifica Projects v2;
- reabre tareas;
- permite elegir otro repositorio o escribir manualmente otro número.

## Token requerido

Usar un **fine-grained personal access token** distinto por dispositivo cuando convenga.

Configuración mínima:

- **Resource owner:** `misaeln-pc1`.
- **Repository access:** `Only select repositories`.
- **Repositorio:** `capacita-task-hub`.
- **Repository permissions / Issues:** `Read and write`.
- Todos los demás permisos: `No access`, salvo `Metadata: Read`, que GitHub incorpora como permiso base.

El permiso GitHub se concede a nivel del repositorio, no a una issue individual. El dashboard, sin embargo, está programado para utilizarlo sólo contra la issue abierta en pantalla.

## Configuración por dispositivo

1. Crear el token dentro de GitHub.
2. No copiarlo en chats, issues, archivos, commits ni capturas.
3. Abrir Planificador Atlas en el dispositivo.
4. Entrar en una tarea o hito.
5. Pegar el token en el campo enmascarado.
6. Pulsar **Guardar acceso en este dispositivo**.

El valor queda en `localStorage` del navegador actual. Computador y celular requieren configuración independiente.

## Uso diario

1. Abrir una tarea o hito.
2. Pulsar **Cerrar como completada**.
3. Confirmar el número de issue.
4. Esperar la respuesta de GitHub.
5. El dashboard vuelve a cargar las issues abiertas.

GitHub genera automáticamente la fecha y hora `closed_at` cuando acepta el cierre.

## Retirar acceso

En la misma ficha, pulsar:

```text
Eliminar acceso de este dispositivo
```

También se puede revocar el token desde GitHub. Al revocarlo, el navegador conservará una cadena local inutilizable hasta eliminarla o reemplazarla.

## Riesgo aceptado

El token queda almacenado en el navegador. Una persona o script con acceso efectivo a ese navegador podría extraerlo. Como `Issues: Read and write` es un permiso de repositorio, un tercero que use el token fuera del dashboard podría modificar otras issues de `capacita-task-hub`.

El token no debe tener permisos para:

- Contents;
- Actions;
- Administration;
- Secrets;
- otros repositorios.

## Validación implementada

- Repo fijado en código.
- Issue obtenida desde la ficha abierta.
- Coincidencia obligatoria entre ruta, tarea cargada e ID solicitado.
- Confirmación humana antes de cerrar.
- Método único `PATCH`.
- Payload fijo de cierre.
- Verificación de respuesta: mismo número y estado `closed`.
- Refresco posterior.
- Sin token embebido.
- Sin DELETE, POST ni PUT.
