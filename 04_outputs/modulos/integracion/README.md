# Integración — recorrido entre sistemas

**Estado de este espacio:** arquitectura decidida el 2026-10-03; sin código todavía.

El orquestador es un monolito propio (NestJS + PostgreSQL) desplegado en el
servidor donde EPI10 tiene Odoo, con módulos core, Stripe, Healthie, Odoo e
informes. Odoo se usa solo por API. Decisión, componentes, despliegue y flujo de
eventos: [ADR del orquestador](2026-10-03_adr_orquestador_v1.md).

## Bitácora

- 2026-10-03 · **Acción:** sesión de arquitectura D2 con Raúl (SKI2-159).
  **Resultado:** comparadas tres opciones (capa en AWS, módulos en Odoo, app de
  Vercel); Raúl descarta AWS y decide monolito en el servidor de Odoo.
  **Evidencia:** ADR, línea en `03_specs/decisions.md` y D2 en el journey v2.
  **Decisión:** confirmada por Raúl. **Pendiente de verificar:** alojamiento,
  versión y API de Odoo (SKI2-104); API de Healthie (SKI2-101).

**Próximo paso:** el orquestador trocea las issues a partir del ADR. Se puede
empezar por el esqueleto, `core` y `stripe`, que no dependen de terceros.

[Journey v2](../journey/2026-10-03_customer_journey_mvp_v2.md) ·
[Índice y documentación continua](../README.md)
