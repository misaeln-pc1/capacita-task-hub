# CHANGELOG_AGENT

## 2026-07-14 — Cierre operativo Dashboard Planificador Atlas V1

**Agente:** Atlas / ChatGPT.

**Issue:** `capacita-task-hub#62`.

**Rama:** `docs/dashboard-live-v1-closure`.

**Tipo:** cierre documental, reversible, riesgo verde.

### Estado validado

- Dashboard publicado en GitHub Pages.
- URL: `https://misaeln-pc1.github.io/capacita-task-hub/dashboard/`.
- Fuente: GitHub Issues abiertos mediante API pública.
- Sin snapshot, token, secreto, Worker o backend.
- Revisión visual aprobada por Misael el 2026-07-14.

### Funcionalidad cerrada

- cinco Weeks: actual y cuatro siguientes;
- ISO 8601, lunes a domingo;
- hitos y carga separados;
- Weeks vacías visibles;
- navegación interna Week → tarea → detalle;
- tareas sin fecha separadas;
- tareas vencidas abiertas arrastradas a la Week actual;
- badge y color rojo para vencidas;
- fecha histórica conservada;
- recursos versionados para evitar caché obsoleta;
- actualización al abrir, manual y periódica.

### Evidencia

- PR #41: lectura en vivo.
- PR #42: entrada GitHub Pages.
- PR #43: ficha interna.
- PR #45–#47: Weeks ISO, navegación y parser.
- PR #58: cinco Weeks y compactación.
- PR #60: regla de vencidas.
- PR #61: invalidación de caché.
- Merge funcional final: `95ea416f57489e32d1c675c6c65c9c90c2092277`.
- Issue #44 cerrada.
- Issue #59 cerrada tras validación visual.
- Issues de prueba #48–#57 cerradas.

### Documentación

- Creado `docs/DASHBOARD_PLANIFICADOR_ATLAS_V1.md`.
- Actualizados `README.md`, `TASK_STATUS.md`, `REPO_MAP.md`, `DECISIONES.md` y `REVIEW_REQUEST.md`.
- La documentación V0 queda marcada como histórica.

### No se tocó

- Código funcional del dashboard.
- GitHub Pages o su configuración.
- Actions, workflows o integraciones.
- Credenciales o secretos.
- Projects v2.
- Issue operativa #5, que continúa abierta.
- `main` directamente.

### Pendiente

- Revisión y merge humano del PR documental.
- Cierre de issue #62 después del merge.

---

## Historial anterior

### 2026-07-11 — Dashboard Visual Planificador Atlas V0

Se creó la primera versión portable basada en snapshot para validar diseño y utilidad. Esta arquitectura quedó superada por la V1 en vivo.

### 2026-07-04 — Corrección de enrutamiento

Se estableció la regla vigente:

```text
El problema vive en el repo.
La tarea ejecutable vive en Task Hub.
La evidencia técnica vive en el repo.
```

### 2026-07-04 — Bootstrap Sistema de Tareas Atlas

Se crearon la gobernanza, protocolo, mapa, decisiones, riesgos, prompts y documentos puente iniciales.

El detalle completo de cambios históricos permanece disponible en el historial Git de este archivo.
