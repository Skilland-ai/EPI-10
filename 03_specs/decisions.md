# Decisions

- 2026-06-24: Migrated the `epi10-salud-20260609` spec-driving package into phase-based project folders.
- 2026-06-24: Preserved Stage 06 as pending run state only; no Stage 06 artifact was generated.
- 2026-06-24: Accepted and closed the document migration spec after QA validation.
- 2026-06-24: Planned a follow-up spec to align the repo harness with the migrated spec-driving structure.
- 2026-06-24: Created active spec `002_now.md` to build a reusable `founder-cto` skill as repo source plus exportable package, without installing it globally yet.
- 2026-06-24: Created active spec `003_now.md` to build a reusable `founder-cto-advisor` subagent that uses the `founder-cto` skill plus spec and QA skills, with repo source and export copy.
- 2026-06-24: Created active spec `004_now.md` for an interactive `founder-cto-advisor` diagnosis of `04_outputs/spec-driving/`, focused on architecture, system design, solo-developer feasibility, and execution readiness before any Stage 06 work.
- 2026-06-24: Accepted and closed `004_now.md` after user review of the CTO diagnosis; planned `005_now.md` as a weekly Fer CTO preparation umbrella with two `/goal` sub-specs for context/problem mapping and architecture/system design.
- 2026-06-24: Accepted and closed `009_now.md` after README QA validation; root `README.md` is now the CTO-ready entrypoint for understanding the repo, harness, EPI10 Salud MVP 1.0 architecture snapshot, weekly/workshop artifacts, gates and Stage 06 status.
- 2026-07-12: Opened `010_now.md` for the EPI10 Healthie UI Discovery Sprint and documented the ten externally maintained tasks as an evidence-led roadmap; duration, account access and plan/add-on availability remain `Unknown`, and Stage 06 stays disabled.
- 2026-09-15: Raúl autoriza ejecutar el mockup Stripe y documentar cada avance. `011_now.md` pasa a ser la spec activa; `010_now.md` conserva pendientes históricos. La planificación actual se incorpora desde Linear a `04_outputs/planificacion/linear/` y los módulos se organizan en `04_outputs/modulos/`. Se autorizan dos subagentes para planificación y documentación en paralelo. Raúl prefiere registrar la cuenta Stripe desde su navegador; se descarta crear un sandbox anónimo. Producto provisional de demo: servicio inicial, pago único ficticio de 100 EUR.
- 2026-09-15: Meta de demo con imagen/información EPI10 para Carmen el 16 de septiembre; no reprograma Linear. Se propone representar NutriWell (nombre provisional de los documentos de marca) a 100 EUR ficticios. Raúl aporta seis logos actualizados en `02_context/EPI10-branding/Nuevos-logos-de-EPI10/`; son los activos vigentes de la demo, con 01 azul para claro y 02 blanco para oscuro como aplicación propuesta.
- 2026-09-15: Por petición posterior explícita, remodelado el bloque Stripe remoto: nueve tareas de demo en OL3 (15 de septiembre), feedback con Carmen el 16 y réplica/entrega en OL4; SKI-81 queda como subtarea comercial de SKI-77. Nueve tareas genéricas canceladas con sustitución trazable; dependencias externas preservadas. El snapshot local se actualiza y la línea base anterior se archiva.
- 2026-09-15: CLI Stripe 1.50.11 autorizado mediante navegador para el sandbox registrado por Raúl; cuatro lecturas API correctas y cuenta identificada. Acceso documentado sin secretos y SKI-28 cerrada con evidencia. Continuar implementación desde terminal; catálogo todavía vacío.
- 2026-09-15: Creado catálogo Stripe de demo con producto NutriWell, precio único de 100 EUR ficticios y nuevo logo azul. Relecturas y comparación de imagen correctas; SKI-48 Done. Cantidad fija 1 y preferencias de impuestos/facturación se aplicarán al checkout en SKI-49. Subida del logo resuelta por multipart con la autorización existente del CLI en memoria.

- 2026-09-15: Checkout de demo mediante Payment Link reutilizable: cantidad 1, tarjeta, marca EPI10 y confirmación nativa. Configuración verificada por API y DOM; sin pago ejecutado. Correlación entre intentos, recuperación y deduplicación permanecen en SKI-50/51. Procedimiento y evidencia en el módulo Stripe.

- 2026-09-15: Raúl acota SKI-37 a una pantalla de entrada al mockup de la pasarela; la web definitiva pertenece al otro proveedor. Exige una presentación visual cuidada. Vista editorial implementada y publicada en privado para Raúl con Sites; checkout de pruebas enlazado. Pruebas del recorrido y validación de Carmen pendientes.

- 2026-10-03: Auditoría y reestructuración aprobadas por Raúl. Linear es la fuente de verdad. El plan de 8 oleadas (95 issues) se sustituye por 4 fases: poner orden → deberes externos y cierre Stripe → customer journey → implementación por tramos. Se cancelan y archivan 75 issues. Repo canónico movido a `Skilland.ai-CONSULTING/EPI-10`. Confirmado: Carmen aprobó la demo de Stripe; plan Group de Healthie contratado con credenciales; mantenedor de Odoo desconocido. White label de Healthie solo con Enterprise; la API es un add-on del Group.

- 2026-10-03: D2 decidida por Raúl (SKI2-159). El orquestador es un monolito propio (TypeScript/NestJS + PostgreSQL) con módulos core, Stripe, Healthie, Odoo e informes, desplegado en el servidor de EPI10 donde está su Odoo. Odoo solo por API, sin módulos instalados; cambios por webhook. AWS descartado por el cliente. El entregable de TellmeGen se borra tras generar el borrador y el borrador se borra al publicar. ADR: `04_outputs/modulos/integracion/2026-10-03_adr_orquestador_v1.md`.
- 2026-10-03: Módulo de informes (SKI2-159, Raúl): pantalla propia dentro del monolito con enlace desde Odoo, en TypeScript, siguiendo el patrón de Fer (skills en Markdown + YAML, ejecutor propio, plantilla Word). Borrador autónomo; publicar exige validación de Aitor. Proveedor del modelo (API de Anthropic u OAuth por suscripción) se decide al construir. Orden: esqueleto + core + stripe → odoo e informes en paralelo → healthie → despliegue en el servidor de EPI10 → prueba completa.
- 2026-10-03: Odoo: el caso vive en `project.task`, en el proyecto «Casos EPI10» con 11 etapas (contrato de la API de Odoo, §2). Decisión técnica del orquestador, que Raúl puede revisar. Corrección: el commit c0767e2 decía «decisión de Raúl», pero era una sugerencia automática de Claude Code que se mostraba en un panel, no un mensaje suyo.

## 2026-10-04 · Integraciones contra servicios reales lo antes posible (Raúl)

- **Odoo, en tres niveles.**
  - El simulador sirve para el CI y para provocar fallos.
  - El **Odoo de pruebas EPI10** (SKI2-182) es un Odoo Community real en hermes-node, en el repo `Skilland-ai/epi10-odoo-pruebas`. Imita al de EPI10 y el monolito de desarrollo apunta a él por defecto.
  - La **réplica del Odoo de EPI10** se montará desde su backup, que debe llegar **anonimizado** (SKI2-104).
- **Healthie:** simulador en el CI y el sandbox real de la cuenta de EPI10 en cuanto haya clave de API (SKI2-101).
- **Pruebas de contrato** (SKI2-183): los mismos escenarios se ejecutan contra el simulador y contra el servicio real, para que el simulador no pueda divergir sin que lo veamos.
- **Principio:** cada integración se valida contra el servicio real en cuanto haya acceso, no al final. Lo que vaya llegando de Carmen la semana del 5 oct se integra al día siguiente.

## 2026-10-07 · Crisis de Healthie (SKI2-204)

- **Hecho:** Healthie cobra por la API del plan Group 475 $/mes el primer año, 950 $/mes el segundo y después 1.900 $/mes. Las claves de API y los webhooks solo vienen con ella. Detalle en `04_outputs/modulos/healthie/2026-10-07_noticias_healthie_v1.md`.
- **Decisión (Raúl):** EPI10 no va a pagar la API. El diseño que dependía de ella (alta, onboarding, mensajes, grupos, citas y publicación del informe en Healthie) queda en revisión.
- **También:** las plantillas de correo de Healthie siguen bloqueadas hasta que revisen la cuenta, y sus correos no se pueden poner en español.
- Lo que no depende de Healthie sigue vigente: Stripe, Odoo, el core, la pantalla de informes y el seudonimizador.
- **Siguiente:** analizar las opciones (Healthie manual, portal propio, portal de Odoo, otra plataforma, negociar) antes de decidir.

## 2026-10-07 · Dirección: OpenEMR con lavado de cara (Raúl)

- **Análisis previos:**
  - Botón rojo, SKI2-205: 56–70 h.
  - Research de alternativas, SKI2-206: ninguna plataforma externa encaja.
  - OpenEMR, SKI2-207: cubre los 7 pasos con un módulo propio y un tema EPI10, 52–76 h.
- **Dirección:** OpenEMR autoalojado como portal del cliente y back office clínico, con un lavado de cara a fondo y sin tocar el núcleo. Odoo sigue como back office de operaciones.
- **Demo a Carmen el martes 13 oct** para que lo apruebe. Hito «5 · Demo OpenEMR a Carmen», SKI2-208 a 212.
  - Primer paso: el feedback de Raúl vista por vista (SKI2-208).
  - Después: el arquitecto de OpenEMR y el roadmap del lavado de cara (SKI2-209).
- El plan basado en la API de Healthie queda aparcado en el hito «Cajón de sastre», en Backlog.
