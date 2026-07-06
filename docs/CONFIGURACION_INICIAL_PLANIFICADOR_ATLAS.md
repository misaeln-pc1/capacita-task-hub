# CONFIGURACION_INICIAL_PLANIFICADOR_ATLAS

## Propósito

Checklist mínimo para configurar manualmente el GitHub Project **Planificador Atlas** con un único flujo Auto-add desde `capacita-task-hub`.

## Estado

- Project creado manualmente por Misael.
- Nombre: **Planificador Atlas**.
- Tipo inicial: Table.
- Import items from repository: desmarcado.
- Decisión vigente: todos los issues de gestión se crean en `capacita-task-hub`.

## Workflow Auto-add recomendado

Crear un solo workflow nativo del Project:

```text
Nombre: Auto-add Task Hub
Repository: misaeln-pc1/capacita-task-hub
Filter: is:issue is:open
```

No filtrar por `tipo:tarea-ejecutiva`. Deben entrar también ideas, decisiones, investigaciones, bloqueos e iniciativas.

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
   - Idea a evaluar
   - Decisión pendiente
   - Investigación
   - Bloqueo/Incidente
   - Épica/Iniciativa
   - Personal
   - Seguimiento
   - Administrativa

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
   - Derivado de decisión validada
   - Derivado de PR
   - Pendiente de decisión
   - Idea a evaluar
   - Incidente/Bloqueo

10. `Repo dueño`
   - Text
   - Formato sugerido: `misaeln-pc1/nombre-repo`

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
| Bloqueadas | Filtrar `Estado = Bloqueada` o `Tipo = Bloqueo/Incidente`. |
| Ideas | Filtrar `Tipo = Idea a evaluar`. |
| Decisiones | Filtrar `Tipo = Decisión pendiente`. |
| Investigación | Filtrar `Tipo = Investigación`. |
| Iniciativas | Filtrar `Tipo = Épica/Iniciativa`. |
| Por proyecto | Agrupar por `Proyecto`. |
| Personales | Filtrar `Tipo = Personal` o `Proyecto = Personal`. |
| Riesgo | Filtrar `Riesgo = Amarillo` o `Rojo`. |
| Pendiente de decisión | Filtrar `Tipo = Decisión pendiente` u `Origen / Validación = Pendiente de decisión`. |

## Orden recomendado

```text
1. Confirmar Auto-add único desde capacita-task-hub con filtro is:issue is:open.
2. Crear campos de Capa 1.
3. Crear campos de tiempo histórico mínimo.
4. Crear vistas Dashboard tareas, Ideas, Decisiones, Bloqueadas y Por proyecto.
5. Cargar pocos issues reales para validar clasificación.
6. Ajustar valores si algo confunde.
7. No activar Capa 3 ni automatización por scripts todavía.
```

## Regla anti-manualidad

Si configurar campos/vistas manualmente toma más de lo razonable, evaluar ruta con GitHub CLI local. No activar workflows de Actions, bots ni scripts todavía.
