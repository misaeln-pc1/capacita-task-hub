# CONFIGURACION_INICIAL_PLANIFICADOR_ATLAS

## Propósito

Checklist mínimo para configurar manualmente el GitHub Project **Planificador Atlas**.

Este documento existe porque el conector disponible no permite crear/configurar GitHub Projects directamente desde Atlas en este chat.

## Estado

- Project creado manualmente por Misael.
- Nombre: **Planificador Atlas**.
- Tipo inicial: Table.
- Import items from repository: desmarcado.

## Configuración mínima recomendada

### Campos Capa 1 — crear primero

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
   - Otro

3. `Tipo`
   - Personal
   - Administrativa
   - Seguimiento
   - Técnico
   - Documental
   - Decisión
   - Riesgo/Bloqueo

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

### Campos Capa 2 — crear después de probar Capa 1

- `Tamaño estimado`: XS, S, M, L, XL, XXL.
- `Tiempo activo Misael`: 10 min, 30 min, 1 h, 2 h, medio día, día completo.
- `Tiempo IA/agente`: Inmediato, 30 min, 1 h, varias iteraciones.
- `Confianza estimación`: Alta, Media, Baja.
- `Causa incertidumbre`: Definición, acceso, datos, API, proveedor, SENCE, revisión humana, otra.

### Campos Capa 3 — crear cuando existan tareas reales

- `Automatizable`: No, Parcial, Sí.
- `Ejecutor sugerido`: Misael, Atlas, Codex, Copilot, Jules, API, Proveedor.
- `Tipo de ejecución`: Prompt, PR, Script, Checklist, Revisión, Extracción, Manual.
- `Requiere validación humana`: Sí, No.
- `Riesgo automatización`: Verde, Amarillo, Rojo.

## Vistas iniciales

| Vista | Configuración sugerida |
|---|---|
| Hoy | Filtrar `Estado = Hoy`. |
| Semana | Filtrar `Estado = Hoy` o `Próxima`; ordenar por prioridad y fecha objetivo. |
| Bloqueadas | Filtrar `Estado = Bloqueada`. |
| Por proyecto | Agrupar por `Proyecto`. |
| Personales | Filtrar `Proyecto = Personal` o `Proyecto = Task Hub`. |
| Riesgo | Filtrar `Riesgo = Amarillo` o `Rojo`. |
| Automatizables | Filtrar `Automatizable = Sí` o `Parcial`. Crear después de Capa 3. |
| Pendiente de decisión | Filtrar `Origen / Validación = Pendiente de decisión`. |

## Orden recomendado

```text
1. Crear campos de Capa 1.
2. Crear vistas Hoy, Semana, Bloqueadas, Por proyecto y Personales.
3. Cargar 10–20 tareas reales.
4. Ajustar nombres/valores si algo confunde.
5. Crear campos de Capa 2 solo para tareas P1/P2.
6. Crear campos de Capa 3 cuando aparezcan patrones automatizables.
```

## Regla anti-manualidad

Si configurar campos/vistas manualmente toma más de lo razonable, evaluar ruta con GitHub CLI local. No activar workflows ni bots todavía.
