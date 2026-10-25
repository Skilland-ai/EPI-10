# Brief · Carril 2 · Panel en vivo del orquestador con simulación de eventos, listo para demo

Eres el agente principal del carril 2 (nombre en Herdr: `orquestador-panel`). Orquestador: la sesión de la pestaña «Orquestador» del workspace EPI-10. Puedes lanzar subagentes con la herramienta Agent cuando haya trabajo independiente que gane yendo en paralelo, por ejemplo el inventario del orquestador de Senda mientras otro prepara la vista de cambios en Odoo.

## Contexto (lee esto primero)

- `epi10-orquestador` es el monolito NestJS + PostgreSQL de EPI10 Salud. Recibe el pago (Stripe), crea y mueve el caso en **Odoo** (kanban «Casos EPI10», por API y webhook), lleva el estado del caso, el outbox y los informes. Mira `README.md`, `docs/demo-visual.md` y `docs/ensayo-e2e.md`.
- **La historia que se cuenta al cliente:** antes el orquestador estaba conectado al portal de cliente de **Healthie** y recibía de él los casos y la información de la clienta. EPI10 ha dejado Healthie, así que **ahora el portal de cliente está desconectado**. Para enseñar y probar el flujo, el panel tiene **botones que simulan los eventos que antes llegaban del portal**.
- **No debe verse nada de OpenEMR.** El monolito tiene un módulo `openemr` y la demo actual usa `PORTAL_CLIENTE=openemr`. En esta demo el portal debe aparecer **desconectado**, y ni el panel, ni la consola, ni los registros visibles pueden mostrar «OpenEMR». No borres el módulo: déjalo apagado por configuración.
- **La referencia es el orquestador de Senda Ecoway**: `~/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/SENDA-ECOWAY-PROJECT/senda-orquestador`, módulo `src/modules/consola` (SKI2-243 a 245). Tiene una consola técnica en `/consola` que actúa en tiempo real como centralita: los avisos que entran, los trabajos, las excepciones y las decisiones. Raúl quiere **uno tan bueno como ese**. Léelo en solo lectura; es otro proyecto y otro repo, no lo modifiques.
- **El miércoles 28 o el jueves 29 de octubre hay una demo ante el cliente** (Tomás y Carmen, de EPI10). Tiene que verse muy bien.
- Estética: la base **«EPI10 UI»** (shadcn/ui vía Basecoat, CSS plano con prefijo `epi-`, sin build) de `~/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10-project/epi10-oe-module/oe-module-epi10-ui/public/ui`. Reutiliza el CSS y los tokens. Esa carpeta es solo origen de los estilos; **no la nombres en la interfaz.**

## Objetivo

1. **Inventario** (lo primero, en 30–45 min): qué tiene la consola de Senda que no tenga EPI10. Por ejemplo: panel en vivo, flujo de eventos en tiempo real, trabajos y reintentos, excepciones, acciones manuales, autenticación y estilo. Y qué hay ya en EPI10 (panel `/monolito`, simuladores, pantalla de informes). Escríbelo en `docs/demo-panel.md` y **envía el resumen al orquestador antes de construir.**
2. **Panel en vivo** del orquestador con la estética EPI10 UI:
   - consola en tiempo real (SSE o similar) con cada aviso que entra, cada transición del caso, cada trabajo del outbox y cada llamada a Odoo;
   - estado de las conexiones: Stripe, Odoo, **portal de cliente: desconectado**;
   - lista de casos con su etapa.
3. **Botones de simulación** de los eventos del portal, como mínimo:
   - nueva clienta (alta tras el pago);
   - consentimiento firmado;
   - cuestionario completado;
   - elección del test (en casa o en la sede);
   - test recibido o código del kit;
   - mensaje de la clienta;
   - informe publicado.

   Cada botón dispara **el flujo real del monolito** contra el **Odoo de pruebas real**, no un simulacro de Odoo. Añade un «Nueva clienta de demo» que cree una persona ficticia completa y un «Reiniciar demo».
4. **Qué cambia en Odoo, muy visible.** Con cada evento, el panel muestra qué ha cambiado en Odoo: etapa del kanban, campos, actividades creadas o cerradas, notas y etiquetas. Por ejemplo, una tarjeta «Cambios en Odoo» con antes y después, y un enlace directo a la ficha del caso en Odoo (`http://localhost:4881`).
5. **La misma capa EPI10 UI** para las pantallas del orquestador: panel, acceso y, si da tiempo, el panel `/monolito` existente.

## Criterios de terminado

- [ ] Inventario frente a Senda en `docs/demo-panel.md`, enviado al orquestador antes de construir.
- [ ] Panel en vivo con consola en tiempo real, estado de conexiones (portal desconectado) y lista de casos, con la estética EPI10 UI.
- [ ] Los 7 botones de simulación más «Nueva clienta de demo» y «Reiniciar demo», funcionando contra el Odoo de pruebas en hermes-node.
- [ ] Vista de cambios en Odoo por evento, con enlace a la ficha.
- [ ] Ningún texto visible con «OpenEMR». Lo compruebas con un grep sobre el HTML servido y los registros de la consola.
- [ ] La pila de demo levantada en hermes-node con `PORTAL_CLIENTE` desconectado, y su procedimiento en `docs/demo-panel.md`.
- [ ] Guion de demo de 3–5 minutos: qué clicar, qué decir y qué mirar en Odoo.
- [ ] PR (uno o varios) contra `master` de `Skilland-ai/epi10-orquestador`, cada uno con una revisión independiente hecha por un subagente y con la evidencia de lint, typecheck y pruebas en hermes-node. **No hay CI en GitHub**: la evidencia va en el PR. **No fusiones tú**: avisa al orquestador y lo fusiona él.

## Guardrails

- **Trabaja en un worktree propio:** `git -C ~/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10-project/epi10-orquestador worktree add ../epi10-orquestador-wt/demo-panel -b demo-panel origin/master`.
- **Tu zona:** el módulo nuevo del panel, los simuladores, la configuración de la demo (`compose`, `docs/demo-*.md`) y la capa de interfaz común.
- **El carril 1** (agente `informes`) trabaja en paralelo en `src/modules/informes/**`. No lo toques. El botón «informe publicado» se apoya en lo que ya existe; si necesitas algo de informes, pídelo al orquestador.
- **hermes-node:** solo tiene unos 3 GB libres. **No arranques OpenEMR** (`epi10-openemr-prueba-*` deben seguir parados). El Odoo de pruebas ya está arrancado (`epi10-odoo-pruebas-*`, puerto 4881). Los contenedores `epi10-demo-*` están parados: **la pila de demo es tuya**, y `epi10-demo-app-1` salió con error hace 7 días, así que revísalo. No hagas `docker compose down` del Odoo de pruebas. Pruebas y builds con `hn push` + `hn sh` (skill `hermes-node`).
- Las credenciales de Odoo están en el `.env` del HP (`~/Projects/epi10-odoo-pruebas/.env`). No las copies a prompts ni al repo.
- Solo datos ficticios.
- **Nunca uses `herdr notification`.** Si te bloqueas por algo que solo Raúl puede dar, escribe en tu respuesta final o pregunta al orquestador, y sigue con lo que puedas.
- Modelo: Claude Opus 5.5. Para los subagentes de implementación, effort medium.

## Entrega

Al terminar, o si te bloqueas, escribe un informe en `~/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10-project/EPI-10/05_scratch/carriles-2026-10-25/informe_carril2.md` con:
- qué está hecho, con los enlaces a los PR;
- cómo arrancar la demo, con las URL;
- qué es real y qué es simulado;
- lo que queda pendiente.

Responde solo con la ruta de ese archivo.
