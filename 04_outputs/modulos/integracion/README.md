# Integración — recorrido entre sistemas

**Estado de este espacio:** sistema construido y descrito el 2026-10-12 en el
[documento de arquitectura del sistema v1](2026-10-12_arquitectura_sistema_v1.md)
(monolito, OpenEMR con sus dos módulos, Odoo, Stripe, modelo de datos y vistas).
El ADR del 3 oct queda como historia de la decisión D2. La versión anterior, con
Healthie como portal, está en la [arquitectura v0](2026-10-12_arquitectura_sistema_v0_healthie.md),
con una comparación v0 ↔ v1 por dimensión.

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

- 2026-10-12 · **Acción:** documento de arquitectura del sistema v1 escrito a
  partir del código (`epi10-orquestador` 65bb925, `epi10-oe-module` b013569) y
  de la instancia de hermes-node en solo lectura (SKI2-238).
  **Resultado:** [2026-10-12_arquitectura_sistema_v1.md](2026-10-12_arquitectura_sistema_v1.md),
  con 10 diagramas Mermaid validados con el parser oficial.
  **Pendiente:** decisiones abiertas A1–A10 y deuda D1–D16 de su §9.

- 2026-10-12 · **Acción:** documento de arquitectura v0, la versión con Healthie,
  escrito a partir de `epi10-orquestador` en bab87af (4 oct, último commit antes
  de la crisis) y de los documentos de Healthie (SKI2-247).
  **Resultado:** [2026-10-12_arquitectura_sistema_v0_healthie.md](2026-10-12_arquitectura_sistema_v0_healthie.md),
  con 6 diagramas Mermaid renderizados con mermaid-cli y una tabla de
  comparación con la v1. **Evidencia:** el documento. Nada de la v0 se probó
  contra la API real de Healthie, solo contra su simulador.

**Próximo paso:** después de la demo del 13 oct, el orquestador decide qué
decisiones abiertas y deuda del §9 del documento de arquitectura pasan a issues
(contrato v1.1, purga de `jobs`, retirada de Healthie, compose de OpenEMR).

[Journey v2](../journey/2026-10-03_customer_journey_mvp_v2.md) ·
[Índice y documentación continua](../README.md)
