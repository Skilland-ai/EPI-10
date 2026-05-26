# DECISIONS

Short decision log.

- 2026-03-01: Decision template initialized. Status: pending
- [inferred] 2026-05-26: Use the harness context model (`BRIEF.md`, `FACTS.md`, `CONSTRAINTS.md`, `LINKS.md`, `GLOSSARY.md`) as the canonical context layer, even though the inbox also suggests alternative `02_context/` filenames. Status: accepted
- [inferred] 2026-05-26: Treat the current repo phase as internal Fase 0/preventa; no client-billed discovery scope is assumed. Status: accepted
- [inferred] 2026-05-26: Optimize first for an MVP operativo built largely from existing tools rather than a full custom platform. Status: accepted
- [inferred] 2026-05-26: Do not select Healthie, Continuous Care, Odoo-centric or TellmeGen-dependent architecture without validating GDPR/UE-hosting/API constraints. Status: accepted
- [inferred] 2026-05-26: Keep Odoo as a candidate backoffice or core system pending research rather than assuming it is already the final architectural center. Status: accepted
- [inferred] 2026-05-26: V2 correction: Healthie/ContinuousCare/equivalent must be treated as the central client-facing operational layer, with Odoo as backoffice. Status: accepted
- [inferred] 2026-05-26: V2 correction: genetic-results integration requires a real documented accessible authorized lab/TellmeGen API; without it, integration is excluded from Fase 1 or an API-capable lab alternative is required. Status: accepted

## 2026-05-26 - V2 architecture validated and client clarification email sent

La arquitectura V2 queda validada como base de preventa:
Web EPI10 + Healthie/ContinuousCare/equivalente + Odoo backoffice + API laboratorio/TellmeGen solo si existe.

Se envio correo a Carmen solicitando estado real de Odoo, informacion concreta del laboratorio/API y preferencia sobre herramienta cliente.

El flujo operativo detallado se pospone a Fase 1 de ejecucion.
