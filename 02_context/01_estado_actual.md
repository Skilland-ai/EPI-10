# Estado actual — 3 de octubre de 2026

## Fuente de verdad

- **Estado y tareas:** Linear, proyecto [EPI10 Salud MVP](https://linear.app/skilland/project/epi10-salud-mvp-928812c268de). Documento 00 = roadmap vigente.
- **Repo canónico:** `~/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10` (GitHub `Skilland-ai/EPI-10`). Se movió aquí desde `~/Escritorio/EPI-10` el 3 oct; el clon antiguo de mayo se descartó.
- `04_outputs/planificacion/linear/` es un snapshot del 15 sep del plan por oleadas, **ya obsoleto**.

## Roadmap: 4 fases (aprobado por Raúl el 3 oct)

1. **Poner orden**: hecho (auditoría, repo consolidado, 75 issues del plan anterior canceladas y archivadas).
2. **Deberes externos y cierre Stripe** (10 oct)
   - SKI2-101: pedir a Carmen la API de Healthie (add-on del Group, sandbox y producción) y la cotización Enterprise con white label. Correo: [2026-10-03_correo_carmen_healthie_stripe_v1.md](../04_outputs/2026-10-03_correo_carmen_healthie_stripe_v1.md).
   - SKI2-103 → SKI2-104: correo a Carmen para reenviar al mantenedor de Odoo, y sesión técnica. Correo: [2026-10-03_correo_carmen_odoo_v1.md](../04_outputs/2026-10-03_correo_carmen_odoo_v1.md).
   - SKI2-20 → SKI2-21: replicar Stripe en la cuenta EPI10 y facturar.
3. **Customer journey** (17 oct): SKI2-106, un documento único en `04_outputs/modulos/journey/`. Base: `post_Fer_PENDING_INTEGRAR_BIEN_EN_REPO/epi10_journey_operativo_odoo_healthie_v1.md`.
4. **Implementación del journey** (13 nov): issues por tramo, creadas a partir del journey cerrado.

## Hechos confirmados (3 oct)

- Carmen vio la demo de Stripe (https://epi10-nutriwell-demo.vercel.app) y la aprobó sin cambios.
- Plan Group de Healthie contratado; tenemos las credenciales.
- La API de Healthie es un add-on de pago del plan Group. El white label (semi o full) solo existe como add-on del plan Enterprise.
- No sabemos quién mantiene el Odoo.

## Decisión D2 (3 oct, SKI2-159)

- El orquestador es un monolito propio (NestJS + PostgreSQL) en el servidor donde EPI10 tiene Odoo. Odoo solo por API. AWS descartado por el cliente. [ADR](../04_outputs/modulos/integracion/2026-10-03_adr_orquestador_v1.md).

## Unknown

- Coste de la API y del white label de Healthie.
- Si EPI10 tiene ya cuenta de Stripe, y el producto y precio definitivos.
- Versión, alojamiento y acceso del Odoo.
- Síntesis de la entrevista con Aitor (SKI2-14 está en Done, pero no hay síntesis registrada).

## Fase 4 · implementación (3 oct, noche)

Repo de código: `Skilland-ai/epi10-orquestador`, un monolito NestJS + PostgreSQL. Master: `c0ee3ca`, 17 PR integrados.

- **Hechas, 13 de 15:** SKI2-160 a 172.
  - core;
  - Stripe;
  - adaptador y webhook de Odoo, con Odoo simulado;
  - cliente, webhooks y alternativa manual de Healthie, con Healthie simulado;
  - seudonimizador, borrador, pantalla y publicación de informes;
  - fuente única de datos de la persona y prueba vertical pago → caso.
- **Método:** cada pieza ha pasado una revisión independiente hecha por otro agente de Claude y tiene el CI en verde. Hay unas 590 pruebas unitarias y 310 de integración.
- **Ensayo E2E de los 5 tramos (SKI2-178):** 39/39 pasos en hermes-node, contra los simuladores. Procedimiento en `docs/ensayo-e2e.md` del repo de código.
  - Defectos corregidos: el bucle de arranque, el ID de Healthie que no llegaba a Odoo, la publicación por API (SKI2-179) y el enlace de Odoo (SKI2-180).
  - Pendiente de decidir: SKI2-181, cierre de las actividades de Odoo (recomendado: A, que las cierre el monolito).
- **Bloqueado por terceros:**
  - SKI2-173, despliegue en el servidor de EPI10: depende del mantenedor de Odoo (SKI2-104).
  - SKI2-174, prueba de los 5 tramos real: depende de la API de Healthie (SKI2-101) y del acceso a Odoo.
- **Todo lo de Healthie y Odoo está probado solo contra simuladores.** No se ha llamado nunca a los sistemas reales.

## Siguiente paso

- Raúl:
  - enviar los correos a Carmen (SKI2-101, SKI2-103);
  - configurar Healthie por la interfaz: SKI2-175 y SKI2-176 hechas el 4 oct (ver abajo);
  - conseguir el material de Aitor (SKI2-177).
- Con la clave de API de Healthie: validación en el sandbox según el §4.1 del contrato y la documentación del módulo.
- Con el acceso a Odoo: `npm run odoo:setup` en staging, validación del adaptador y del antibucle, y después el despliegue (SKI2-173).

## Healthie configurado por la interfaz (4 oct, SKI2-175 y SKI2-176)

- Grupos en producción: nuevo cliente `92327`, test recibido `92328`, informe entregado `92329`.
- Onboarding: intake flow `Onboarding EPI10` `132408`, asociado a «nuevo cliente». Consentimiento `3273627` y datos básicos `3273666`, los dos provisionales.
- Marca aplicada. No hay ajuste de idioma. Las plantillas de correo no se pueden guardar («Your account cannot edit custom emails») aunque el plan es Group: el bug sale a Healthie el 5 oct a las 8:00, con Carmen en copia. Plan B: invitación propia del monolito con `set_password_link`.
- **Decisión de Raúl (4 oct):** el test es **mixto**. Por defecto en casa y una cita presencial opcional («Realización test EPI10 (presencial)», solo para «test recibido»). El ID de la cita se sacará por API. El paso 4.1 del journey y la D8 (código del kit) quedan pendientes en SKI2-185.
- Raúl, 5 oct: SKI2-184, pedir a Carmen y Aitor sus formularios y el texto del consentimiento.
- Detalle: nota del 4 oct en `04_outputs/modulos/healthie/2026-10-03_contrato_api_healthie_v1.md`.

## Comunicaciones del 5 oct (cerradas con Raúl el 4 oct por la noche)

Programadas por Raúl para el **5 oct a las 8:00**. Textos finales en `04_outputs/comunicaciones/` (fecha 2026-10-04):
- A Carmen: API de Healthie, cotización del white label y Stripe (SKI2-101, SKI2-20). `…healthie_stripe_v2.md`.
- A Carmen, para reenviar al mantenedor de Odoo: versión exacta, **backup completo y anonimizado** con el filestore, documentación y código de los módulos a medida (SKI2-103 → SKI2-104). `…odoo_v3.md`, redactado por Raúl. El despliegue en su servidor, los webhooks y el usuario de API quedan para la llamada técnica.
- A Healthie, con Carmen en copia: fallo «Your account cannot edit custom emails» (SKI2-175). `…healthie_bug_plantillas_v1.md`.
- A Carmen y Aitor: formularios, consentimiento, membrete y material de TellmeGen anonimizado (SKI2-184, SKI2-177). El material se comparte en una **carpeta del Google Drive de EPI10**, no por correo. `…formularios_material_v2.md`.

**Aplazado al martes 6 oct (decisión de Raúl):** el boletín del mes a Carmen (skill `skilland-boletin-proyecto`; configuración `proyectos/epi10-salud.toml` creada, sin activar, con el email de Carmen pendiente) y el dossier en PDF adjunto.

## 4 oct (noche) · servicios reales y test mixto

- Master del monolito en `bab87af`.
- **Odoo 17 Community real de pruebas** (SKI2-182, repo `Skilland-ai/epi10-odoo-pruebas`, en hermes-node, puerto 4881).
  - Destapó dos fallos graves del adaptador que el simulador no veía. Están corregidos (#19 y #20).
  - El ensayo da 40/40 contra el Odoo real y 43/43 contra los simuladores.
- **Demo visual** (#21 y #23, `docs/demo-visual.md`): Stripe en modo prueba desde la web de Vercel, el Odoo real, el portal simulado de Healthie y la pantalla de informes. La pila queda levantada en hermes-node para Raúl.
- **Test mixto** (SKI2-186, #22): la cita es opcional y el código de barras (D8) sigue siendo obligatorio.
- **Pendientes de Raúl:**
  - SKI2-181: cierre de las actividades de Odoo.
  - El texto del mensaje «Test recibido».
  - El nombre de la etapa «Test recibido · pendiente de cita».
  - SKI2-185: cómo se registra el código del kit con el test en casa.
- **Comunicaciones:** 4 correos programados para el 5 oct a las 8:00. El boletín y el dossier quedan para el 6 oct.

## 7 oct · crisis de Healthie (SKI2-204)

- Healthie cobra la API a 475 $/mes el primer año, 950 $/mes el segundo y 1.900 $/mes después. **EPI10 no la paga** (Raúl). Correos de Healthie restringidos y sin español. Detalle: `04_outputs/modulos/healthie/2026-10-07_noticias_healthie_v1.md`.
- Criterio de Raúl: Healthie a mano (A) solo como último recurso; Odoo vale como back office, no como portal del cliente (C descartada). Opciones vivas: **B, portal propio** (SKI2-205) y **D, otra plataforma** (SKI2-206).
- **SKI2-205 entregado:** `04_outputs/modulos/crisis-healthie/2026-10-07_arquitectura_boton_rojo_v1.md`. Recomendación: módulo `portal` del monolito, HTML servidor + HTMX, correo transaccional comprado en la UE, el resto construido. MVP 56–70 h + 8–12 h legales (EIPD casi segura). No cabe en lo que quede de las 110 h; horas consumidas: **Unknown**, las pone Raúl.
- **SKI2-206 entregado:** `04_outputs/modulos/crisis-healthie/2026-10-07_research_alternativas_healthie_v1.md`. 36 plataformas comparadas. Ninguna cumple a la vez español, API gratis, UE y venta. InsideTracker descartada. Mejores: Practice Better (automatiza hoy, inglés, API de pago tras la beta), Carepatron (español, sin API útil: puente manual) y OpenEMR autoalojado (gratis y UE, 35–65 h, estética antigua). Recomendación: portal propio (B) si se mantienen los requisitos; Carepatron como puente.
- Pendiente: decisión de Raúl (B, D o A como puente) y, después, journey v3, ADR v2 y replanificación de las issues de Healthie.
