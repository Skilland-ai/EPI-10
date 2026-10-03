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

Repo de código: `Skilland-ai/epi10-orquestador`, un monolito NestJS + PostgreSQL. Master: `e68bd3f`.

- **Hechas, 13 de 15:** SKI2-160 a 172.
  - core;
  - Stripe;
  - adaptador y webhook de Odoo, con Odoo simulado;
  - cliente, webhooks y alternativa manual de Healthie, con Healthie simulado;
  - seudonimizador, borrador, pantalla y publicación de informes;
  - fuente única de datos de la persona y prueba vertical pago → caso.
- **Método:** cada pieza ha pasado una revisión independiente hecha por otro agente de Claude y tiene el CI en verde. Hay unas 590 pruebas unitarias y 310 de integración.
- **En curso:** SKI2-178, ensayo de los 5 tramos contra los simuladores con el Docker Compose real en hermes-node.
- **Bloqueado por terceros:**
  - SKI2-173, despliegue en el servidor de EPI10: depende del mantenedor de Odoo (SKI2-104).
  - SKI2-174, prueba de los 5 tramos real: depende de la API de Healthie (SKI2-101) y del acceso a Odoo.
- **Todo lo de Healthie y Odoo está probado solo contra simuladores.** No se ha llamado nunca a los sistemas reales.

## Siguiente paso

- Raúl:
  - enviar los correos a Carmen (SKI2-101, SKI2-103);
  - configurar Healthie por la interfaz (SKI2-175, SKI2-176);
  - conseguir el material de Aitor (SKI2-177).
- Con la clave de API de Healthie: validación en el sandbox según el §4.1 del contrato y la documentación del módulo.
- Con el acceso a Odoo: `npm run odoo:setup` en staging, validación del adaptador y del antibucle, y después el despliegue (SKI2-173).
