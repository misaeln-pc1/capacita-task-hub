# CRITERIOS_TIEMPO_AUTOMATIZACION

## Propósito

Definir criterios prácticos para estimar tiempo y detectar automatización posible dentro del **Planificador Atlas**.

La estimación debe ayudar a decidir qué cabe hoy, qué debe dividirse y qué puede delegarse. No debe convertirse en trabajo administrativo excesivo.

---

# Estimación de tamaño

| Tamaño | Tiempo aproximado | Regla |
|---|---:|---|
| XS | < 15 min | Acción simple, casi inmediata. |
| S | 15–45 min | Tarea corta, definida. |
| M | 1–3 h | Requiere foco, revisión o varias acciones. |
| L | Medio día | Puede desplazar otras tareas. |
| XL | Día completo o más | No ejecutar como “tarea simple”; revisar alcance. |
| XXL | Indeterminado / varios días | Dividir antes de ejecutar. |

## Regla rápida

Si una tarea parece XL o XXL, crear subtareas o transformar en tarea de decisión/evaluación.

---

# Tiempo activo Misael

El tiempo activo Misael mide el tiempo humano real requerido, no el tiempo total del proceso.

Valores recomendados:

```text
10 min
30 min
1 h
2 h
medio día
día completo
```

Ejemplos:

| Tarea | Tiempo activo Misael |
|---|---:|
| Dictar una tarea personal | 1–2 min |
| Revisar PR documental simple | 10–30 min |
| Validar landing nueva | 30–60 min |
| Revisar Moodle visualmente | 1–2 h |
| Tomar decisión SENCE/producción | variable; no estimar sin insumos |

---

# Tiempo IA/agente

Mide el tiempo que podría consumir Atlas, Codex, Copilot, Jules, API o script.

Valores recomendados:

```text
Inmediato
30 min
1 h
varias iteraciones
```

No reemplaza validación humana si hay riesgo amarillo/rojo.

---

# Confianza de estimación

| Confianza | Cuándo usar |
|---|---|
| Alta | Tarea repetida, alcance claro, sin dependencias ocultas. |
| Media | Alcance claro, pero hay validación o integración. |
| Baja | Falta definición, acceso, datos, proveedor, SENCE, API o revisión humana. |

## Causas de incertidumbre

| Causa | Ejemplo |
|---|---|
| Definición | No está claro qué se debe decidir. |
| Acceso | Falta permiso, token o cuenta. |
| Datos | Falta archivo, base, API name o fuente. |
| API | Funciones limitadas, error o comportamiento no verificado. |
| Proveedor | Depende de hosting, soporte, cliente o tercero. |
| SENCE | Riesgo normativo o validación de cumplimiento. |
| Revisión humana | Requiere aprobación de Misael. |

---

# Automatización

## Clasificación

| Valor | Significado |
|---|---|
| No | Debe hacerla Misael o un humano. |
| Parcial | IA/agente prepara, humano revisa o ejecuta. |
| Sí | IA/agente puede ejecutar gran parte con evidencia. |

## Ejecutores sugeridos

| Ejecutor | Uso típico |
|---|---|
| Misael | Decisiones humanas, trámites físicos, aprobaciones. |
| Atlas | Criterio, documentación, revisión, prompts, clasificación. |
| Codex | Revisión técnica, PR, código controlado. |
| Copilot | Ejecución de issues copilot-ready en repo/rama. |
| Jules | Ejecución o apoyo técnico según contexto disponible. |
| API | Acciones repetibles con endpoints controlados. |
| Proveedor | Hosting, soporte, validaciones externas. |

## Tipos de ejecución

```text
Prompt
PR
Script
Checklist
Revisión
Extracción
Manual
```

---

# Reglas de automatización segura

Automatizar solo si:

- la tarea es repetible;
- el resultado es revisable;
- hay validación mínima clara;
- hay repo/rama/PR si corresponde;
- no se exponen credenciales ni datos personales;
- no toca producción sin aprobación humana;
- no implica SENCE, dinero, legal o irreversibilidad sin semáforo y control.

No automatizar si:

- falta definición;
- falta acceso;
- el costo o riesgo no está claro;
- involucra producción irreversible;
- puede generar daño comercial, legal, datos o SENCE;
- no hay forma simple de revisar/revertir.

---

# Ejemplos aplicados

## Moodle — Course Factory/API

```text
Tarea: Cargar curso Access completo vía API
Tamaño: L
Tiempo activo Misael: 1–2 h
Tiempo IA/API: varias iteraciones
Confianza: Media
Causa incertidumbre: API Moodle + validación visual
Automatizable: Parcial
Riesgo: Amarillo
```

## Edge — landing nueva

```text
Tarea: Crear landing SQL
Tamaño: M
Tiempo activo Misael: 30–60 min
Tiempo IA/agente: 1 h
Confianza: Media
Automatizable: Sí
Ejecutor sugerido: Copilot
Riesgo: Amarillo si afecta rutas/canonical/SEO productivo
```

## Personal — banco

```text
Tarea: Ir al banco
Tamaño: M
Tiempo activo Misael: 1–2 h
Automatizable: No
Riesgo: Verde
```

## Administrativo — pago hosting

```text
Tarea: Revisar pago hosting Moodle
Tamaño: S
Tiempo activo Misael: 15–30 min
Automatizable: No/Parcial
Riesgo: Amarillo si implica dinero o continuidad de servicio
```

---

# Regla de avance

Primero estimar solo:

- tareas P1;
- tareas P2 de la semana;
- tareas bloqueadas;
- tareas que Misael cree que son cortas pero podrían tener trampa;
- tareas automatizables.

No estimar todo el backlog inicial.
