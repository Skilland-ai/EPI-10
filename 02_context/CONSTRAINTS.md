# CONSTRAINTS

- Budget: Not stated. Any future proposal must separate external costs (licenses, hosting, support, integrations, maintenance) from our own work.
- Time: Exact deadline not stated. The stated directional constraint is to help EPI10 start operating cuanto antes, with Fase 0 completed before selling or budgeting Fase 1.
- Tooling limits:
  - Prefer existing tools over a full greenfield build at this stage.
  - Keep custom development to the minimum necessary.
  - Validate Healthie, Continuous Care, Odoo, TellmeGen and possible alternatives before assuming they fit.
  - Accept manual or semiautomatic steps in the MVP when needed.
- Non-negotiables:
  - Fase 0 is internal/pre-sales work and should not be positioned as a client-billed research phase.
  - Do not build the full product, app or digital twin now.
  - Do not depend on a tool that fails serious GDPR/European-use scrutiny.
  - Do not assume HIPAA compliance is equivalent to GDPR compliance.
  - Do not put sensitive genetic data into insecure systems.
  - Do not budget integrations before validating API availability and limits.
  - Keep the MVP acotado and explicit about what remains manual or semiautomatic.
  - Target secure infrastructure in Spain or the European Union.
- Tone/brand constraints:
  - Working language: Spanish.
  - Tone: clear, executive, practical, without verbiage.

## V2 Corrections

- Healthie, ContinuousCare or an equivalent healthcare client platform must be evaluated as the primary client-facing operational layer, not as a secondary forms layer.
- Genetic-results integration cannot rely on manual handling, file download/upload, copying, document attachment or assisted backoffice operation. It requires a real documented accessible authorized API.
- If the lab/TellmeGen API is unavailable, genetic-results integration is excluded from Fase 1 or an alternative API-capable provider is required.
