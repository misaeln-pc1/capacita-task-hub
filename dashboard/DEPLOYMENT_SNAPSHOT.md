# Gate de snapshot antes de desplegar

## Causa raíz

La V4 incorporaba las tareas directamente en \`dashboard/index.html\`. Cerrar una issue en GitHub no modificaba ese HTML; por eso la issue cerrada #26 siguió visible en el Site.

## Arquitectura elegida

    GitHub Issues (state=open)
      -> generate-snapshot.mjs
      -> snapshot.json + snapshot.js
      -> validate-snapshot.mjs
      -> build/checkpoint de Sites

El navegador consume únicamente \`snapshot.js\`; no consulta GitHub ni recibe credenciales.

## Ejecución obligatoria

Antes de preparar cualquier checkpoint:

    GITHUB_TOKEN=<token efímero de solo lectura> node dashboard/predeploy.mjs

Si la consulta o validación falla, el comando retorna código distinto de cero y el despliegue debe detenerse. El generador usa archivos temporales y no reemplaza el último snapshot válido ante errores.

## Manejo de secretos

- \`GITHUB_TOKEN\` se lee solo desde el entorno del proceso.
- Alcance mínimo: lectura de Issues y metadata del repositorio privado.
- No se escribe en HTML, JavaScript generado, logs, archivos ni Git.
- No se creó ni configuró ningún secreto, workflow, Action o API.

## Activación pendiente

Para hacer el gate imposible de omitir se requiere una acción adicional sujeta a aprobación:

1. integrar \`node dashboard/predeploy.mjs\` al comando de checkpoint/build de Sites y configurar el token de solo lectura como secreto del entorno; o
2. crear un GitHub Actions manual de publicación con el mismo secreto.

Hasta autorizar una de ellas, Work debe ejecutar el comando antes de cada despliegue y detenerse si falla.

## Límites vigentes

- Snapshot estático; no hay sincronización en vivo.
- GitHub continúa como fuente oficial.
- GitHub Project v2 todavía no forma parte de la consulta.
- La clasificación depende de campos legibles en el cuerpo de cada issue; valores faltantes usan defaults conservadores.
- No se despliega desde este PR.
