# Informe · Carril 2 · Panel en vivo del orquestador (CON-460)

Agente `orquestador-panel` · 25 de octubre de 2026 · rama `demo-panel` (worktree `epi10-orquestador-wt/demo-panel`).

## Hecho

- **PR #32 contra `master`:** <https://github.com/Skilland-ai/epi10-orquestador/pull/32>. Título «CON-460: panel en vivo del orquestador con el portal de la clienta desconectado». Pendiente de que lo fusione el orquestador; yo no fusiono.
- **Inventario frente a Senda** en `docs/demo-panel.md` (§1). Se envió al orquestador antes de construir y él aprobó el plan con sus ajustes.
- **`PORTAL_CLIENTE=desconectado`:** el alta y los mensajes de hito quedan registrados en el caso y no salen a ningún portal. El módulo `openemr` se conserva, apagado por configuración.
- **Panel en vivo en `/panel`, con la estética EPI10 UI:**
  - consola en tiempo real por SSE: avisos, transiciones, trabajos del outbox y cada llamada a Odoo;
  - estado de las conexiones, con el portal de la clienta **desconectado**;
  - lista de casos con su etapa y su tramo;
  - tarjeta **«Cambios en Odoo»** con antes y después por evento y enlace a la ficha en Odoo (`http://localhost:4881`);
  - **Trabajos**, con «Reintentar» y «Ejecutar ahora»;
  - **ficha del caso** con su historial;
  - pantalla de acceso con la marca EPI10.
- **Los 7 botones de simulación, «Nueva clienta de demo» y «Reiniciar demo**», contra el flujo real del monolito y el Odoo de pruebas de hermes-node. Cada evento deja además una nota en el historial de la tarea.
- **«ID de OpenEMR» oculto** en la pestaña EPI10 del formulario de Odoo con el portal desconectado (`odoo:setup`). En el kanban, las notas, las actividades y el correo no aparece; no sale ningún correo.
- **Arreglo de la caída de `epi10-demo-app-1`** (hace 7 días): el pool de pg no tenía oyente de `error` y una conexión cerrada por PostgreSQL tumbaba la app.
- **Revisión independiente** con un subagente: 8 hallazgos, todos corregidos. Destacan dos posibles fugas de «OpenEMR» (Trabajos y la línea «Escalado»), la cookie sin `Secure`, el arranque que esperaba a Odoo, el doble clic y el reinicio a medias.
- **Evidencia en hermes-node** (en el PR):
  - lint, formato, typecheck y build limpios;
  - **714** pruebas unitarias y **383** de integración en verde;
  - ensayo **E2E** (`npm run demo:panel -- probar`) correcto en unos 38 s;
  - **0** apariciones de «OpenEMR» en 10 páginas y recursos y en 161 mensajes de la consola.
- **Guion de 3–5 minutos** y procedimiento en `docs/demo-panel.md` (§3 y §4). Comprobación «sin OpenEMR» en el §5.

## Segunda tarea: modelo real en la pila de demo

- **PR #34 contra `master`** (sin fusionar): <https://github.com/Skilland-ai/epi10-orquestador/pull/34>, «CON-460: la pila de demo usa el modelo real en los borradores, con plan B --llm falso». Rama `demo-panel-llm`, rebasada sobre `cfb553c` (carril 1 fusionado).
- `demo:panel` arranca con `anthropic`, `claude-opus-5-5` y esfuerzo `medium` si existe `~/.config/epi10-demo/anthropic.key`. Con `--llm falso` arranca el plan B, con 6 s por paso. La pila fija `INFORMES_PERMITIR_FALSOS=true`.
- **La clave nunca se escribe:** se monta el archivo como secret de solo lectura y la app la exporta en memoria. Comprobado: 0 apariciones en `docker inspect`, en los registros y en `panel.env`.
- **El E2E destapó un cambio de la API de informes** del carril 1: `recibirEntregable` con lista de archivos y `aceptaPendientes`. Está corregido, con tipos estrictos.
- **Evidencia:**
  - 802 pruebas unitarias y 386 de integración en verde;
  - E2E con el modelo real correcto en 73 s, con un borrador de unos 41 s;
  - plan B correcto, con el informe en unos 20 s.
- **Pendiente tras fusionar:** `limpiar` desde `master` y el ensayo completo pedido por el orquestador: borrador real del caso A (`test/fixtures/informes/casos-demo/caso-a-lucia/`) arrastrado en `/informes` con Playwright y la descarga del Word.

## Entrega final (PR #34 fusionado, `master` 6ac2695)

- **Pila desde un checkout limpio de `origin/master`:** `~/Projects/epi10-demo-master` en el HP, `limpiar` y modelo real.
- **`probar` por el panel:** correcto en 87 s.
- **Caso A con Playwright en `https://localhost:4893/informes`:**
  - 7 PDF y 81 datos seudonimizados;
  - borrador real en 95 s, sin errores de JavaScript;
  - Word comprobado con LibreOffice en modo headless: 33 páginas, 8 comentarios, todas las secciones y sin el nombre ni el código del kit.
- **Pila limpia y en marcha;** túneles 4894, 4893 y 4881 abiertos (los tres responden 200).
- **Guía para Raúl:** `guia_prueba_raul.md`, con las capturas `captura_panel.png`, `captura_borrador.png` y `captura_word_portada.png` y los PDF del caso A en `caso-a-lucia/`.

## Cómo arrancar la demo

La pila `epi10-demo` está en marcha en hermes-node con la rama `demo-panel`, recién reiniciada y vacía. Los túneles 4894 y 4881 están abiertos en el ASUS.

```bash
# Desde el ASUS (tras fusionar, con master)
hn push . epi10-demo-panel
hn sh 'cd ~/Projects/epi10-demo-panel && mise exec node@22 -- npm ci && mise exec node@22 -- npm run demo:panel -- up'
hn open 4894; hn open 4881; hn open 4893
# Antes de cada demo: deja el kanban y el core vacíos
hn sh 'cd ~/Projects/epi10-demo-master && mise exec node@22 -- npm run demo:panel -- limpiar --no-build'
```

| Pantalla             | URL                               | Usuario | Contraseña (solo en el HP)                                             |
| -------------------- | --------------------------------- | ------- | ---------------------------------------------------------------------- |
| Panel en vivo        | <http://localhost:4894/panel>     | `aitor` | `grep PANEL_CONTRASENA ~/.config/epi10-demo/credenciales-panel.txt`    |
| Odoo · «Casos EPI10» | <http://localhost:4881>           | `aitor` | `grep ODOO_AITOR_PASSWORD ~/Projects/epi10-odoo-pruebas/.env`          |
| Pantalla de informes | <https://localhost:4893/informes> | `aitor` | `grep INFORMES_CONTRASENA ~/.config/epi10-demo/credenciales-panel.txt` |

## Qué es real y qué es simulado

- **Real:**
  - el pago de «Nueva clienta de demo», en el sandbox de Stripe con la tarjeta de prueba, que entra por la Stripe CLI, Caddy y el webhook real;
  - el core, el outbox, el worker, los reintentos y los escalados;
  - Odoo 17 de pruebas: tarea, etapas, campos, actividades y notas por su API, y los movimientos de Aitor por su webhook;
  - la pantalla de informes, con la seudonimización y la publicación manual.
- **Simulado:**
  - los eventos del portal de la clienta, con los botones (el portal está desconectado);
  - el entregable del laboratorio, un PDF ficticio;
  - el borrador del informe, que redacta el modelo `falso`;
  - las personas, todas ficticias (`@correo-ficticio.test`, teléfonos `600 000 xxx`).

## Pendiente

- PR #32 y PR #33 (carril 1) ya están fusionados. Falta fusionar el PR #34 y levantar `master` con `demo:panel -- limpiar`.
- **El panel `/monolito` antiguo** (contenedor de simuladores de la demo visual) no se ha pasado a EPI10 UI: el panel nuevo lo sustituye y la pila del panel ya no arranca ese contenedor. La demo visual (`demo:visual`) usa el mismo proyecto `epi10-demo`, así que no pueden convivir.
- **Ensayar el guion en persona** antes del 28 o el 29. Lo he comprobado con el ensayo automático y con capturas a 1600 y 1366 px, no ante una persona.
- **Mejoras menores que dejó la revisión,** que no bloquean:
  - el sondeo de la consola no tiene índices en `recorded_at` ni en `updated_at`, algo que importaría si el panel se activa en producción;
  - la tarjeta de cambios enseña valores de la tarea (en la demo, ficticios): si se activa en producción, hay que decidir si se ocultan;
  - las respuestas 401 y 403 de los formularios POST se ven en JSON.
- Al reiniciar la app se pierden los nombres ficticios de los casos de la demo, que viven solo en memoria: la lista pasa a «Caso xxxxxxxx». No afecta al flujo.
