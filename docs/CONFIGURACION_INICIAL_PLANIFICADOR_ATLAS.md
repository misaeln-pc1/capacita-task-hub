# CONFIGURACION_INICIAL_PLANIFICADOR_ATLAS

## Propósito

Checklist mínimo para configurar manualmente el GitHub Project **Planificador Atlas** con un único flujo Auto-add desde `capacita-task-hub`.

## Estado

- Project creado manualmente por Misael.
- Nombre: **Planificador Atlas**.
- Tipo inicial: Table.
- Import items from repository: desmarcado.
- Decisión vigente: `capacita-task-hub` contiene tareas ejecutables, personales, administrativas y seguimientos accionables.
- Ideas, investigaciones, decisiones, riesgos, bloqueos y épicas viven por defecto en el repo operativo.

## Workflow Auto-add recomendado

Crear un solo workflow nativo del Project:

```text
Nombre: Auto-add Task Hub
Repository: misaeln-pc1/capacita-task-hub
Filter: is:issue is:open
```

Este workflow no intenta capturar todos los issues de todos los repos. Captura la cola de ejecución centralizada.

## Campos Capa 1 — crear primero

1. `Estado`
   - Inbox
   - Hoy
   - Próxima
   - En curso
   - Bloqueada
   - Cerrada

2. `Proyecto`
   - Task Hub
   - Personal
   - Global
   - Moodle
   - Edge
   - Zoho
   - Licitaciones
   - Diseño Cursos
   - Mercado Público
   - Otro

3. `Tipo`
   - Tarea ejecutiva
   - Personal
   - Administrativa
   - Seguimiento accionable

4. `Prioridad`
   - P1
   - P2
   - P3

5. `Riesgo`
   - Verde
   - Amarillo
   - Rojo

6. `Responsable`
   - Misael
   - Atlas
   - Codex
   - Copilot
   - Jules
   - Proveedor
   - Cliente
   - Otro

7. `Fecha objetivo`
   - Date

8. `Siguiente acción`
   - Text

9. `Origen / Validación`
   - Dictado simple
   - Derivado de issue padre
   - Derivado de decisión validada
   - Derivado de PR
   - Incidente/Bloqueo

10. `Repo dueño`
   - Text
   - Formato sugerido: `misaeln-pc1/nombre-repo`

11. `Issue padre`
   - Text o link
   - Formato sugerido: `misaeln-pc1/repo#123` o URL completa

## Campos de tiempo histórico — crear desde el día 1

Estos campos no activan Capa 2 pesada. Solo guardan historial.

- `Tiempo estimado inicial`
  - 10 min
  - 30 min
  - 1 h
  - 2 h
  - medio día
  - día completo
  - más de un día

- `Tiempo real observado`
  - 10 min
  - 30 min
  - 1 h
  - 2 h
  - medio día
  - día completo
  - más de un día

- `Confianza estimación`
  - Alta
  - Media
  - Baja

- `Causa desviación`
  - Definición
  - Acceso
  - Datos
  - API
  - Proveedor
  - SENCE
  - Revisión humana
  - Otra

## Vistas iniciales

| Vista | Configuración sugerida |
|---|---|
| Dashboard tareas | Filtrar `Tipo = Tarea ejecutiva`; ordenar por Estado, Prioridad y Fecha objetivo. |
| Hoy | Filtrar `Tipo = Tarea ejecutiva` y `Estado = Hoy`. |
| Semana | Filtrar `Tipo = Tarea ejecutiva`; `Estado = Hoy` o `Próxima`; ordenar por prioridad y fecha objetivo. |
| Bloqueadas | Filtrar `Estado = Bloqueada`. |
| Por proyecto | Agrupar por `Proyecto`. |
| Personales | Filtrar `Tipo = Personal` o `Proyecto = Personal`. |
| Seguimientos | Filtrar `Tipo = Seguimiento accionable`. |
| Riesgo | Filtrar `Riesgo = Amarillo` o `Rojo`. |
| Con issue padre | Filtrar `Issue padre` no vacío. |

## Qué se revisa fuera del Planificador Atlas

Para conocer problemas, riesgos, ideas y decisiones del proyecto, revisar los issues del repo operativo.

Ejemplos:

```text
[Moodle][Investigación] Analizar cambio de autenticación
[Edge][Decisión] Definir criterio canonical
[Zoho][Riesgo] Workflow CRM puede afectar datos reales
```

Si esos issues generan tareas, las tareas aparecen en Task Hub y en el Planificador Atlas.

## Orden recomendado

```text
1. Confirmar Auto-add único desde capacita-task-hub con filtro is:issue is:open.
2. Crear campos de Capa 1 para tareas ejecutables.
3. Crear campo Issue padre.
4. Crear campos de tiempo histórico mínimo.
5. Crear vistas Dashboard tareas, Hoy, Semana, Bloqueadas, Por proyecto y Con issue padre.
6. Probar con un issue padre en repo operativo y dos tareas hijas en Task Hub.
7. No cargar backlog completo hasta validar el flujo.
8. No activar Capa 3 ni automatización por scripts todavía.
```

## Regla anti-manualidad

Si configurar campos/vistas manualmente toma más de lo razonable, evaluar ruta con GitHub CLI local. No activar workflows de Actions, bots ni scripts todavía.
