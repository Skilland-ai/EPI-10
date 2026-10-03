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

## Siguiente paso

- Raúl: enviar los dos correos (Healthie/Stripe y Odoo, este último ampliado con el alojamiento del servicio) y comunicar a Carmen el cambio AWS → servidor de EPI10.
- Fase 4 creada en Linear: SKI2-160 a SKI2-174, con dependencias. La siguiente es **SKI2-160 (esqueleto del monolito)**, que no depende de terceros. Antes de empezar, decidir con Raúl dónde va el repositorio.
