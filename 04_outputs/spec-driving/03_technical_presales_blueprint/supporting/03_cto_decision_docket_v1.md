# 03 - CTO Decision Docket v1

## Purpose

Este docket fija las decisiones CTO que deben gobernar Stage 03 v2 y preparar
Stage 04. No reabre el scope de Stage 02 v2; cambia la formulacion tecnica y
estrategica del blueprint para que Fase 1 se venda como software propio
ampliable, no como una automatizacion generica. [CTO-001]

## Decision Table

| ID | Decision | Result | Stage 03 Implication |
| --- | --- | --- | --- |
| D1 | Runtime operativo | Microservicio propio | EPI10 Salud MVP 1.0 sera una aplicacion/capa backend propia, no un cable SaaS. |
| D2 | n8n | Fuera del core; opcional futuro | n8n/Make/Zapier no son runtime transaccional ni eje de la propuesta. |
| D3 | Stack preferido | TypeScript / NestJS | Stack por defecto para el backend del MVP 1.0. |
| D4 | Base de datos tecnica | PostgreSQL minima | Persistencia tecnica para IDs, estados, trazabilidad, idempotencia y errores. |
| D5 | Infraestructura | AWS España | El despliegue base se plantea en AWS España como coste externo recurrente. |
| D6 | Portal cliente | Healthie como hipotesis principal | Healthie sigue como candidato principal; ContinuousCare/equivalente queda como alternativa. |
| D7 | Integracion portal | Healthie API/webhooks obligatorios | Si Healthie se elige, su API/webhooks no son opcionales para el alcance vendido. |
| D8 | Backoffice | Odoo via API | Odoo sera backoffice operativo mediante API y configuracion de modelos/campos/vistas. |
| D9 | Informe final | EPI10 Informe Final Copilot | El informe final asistido forma parte central de Fase 1. |
| D10 | Borrador LLM | Si, anonimizado/pseudonimizado y con revisión humana | El Copilot genera borrador interno, nunca diagnostico automatico ni version final sin aprobacion humana. |
| D11 | Ejecucion Copilot | Aitor/equipo EPI10 desde sus entornos corporativos | La ejecucion operativa queda en manos del equipo EPI10 y sus herramientas autorizadas. |
| D12 | Subida informe | Automatica a Healthie si API lo permite | La subida automatica se disena como objetivo condicionado a la API real del portal. |
| D13 | Código | Activo propio de EPI10 | Todo desarrollo especifico de EPI10 se entrega como activo propio. |
| D14 | Documentacion | Tecnica y operativa, para mantenimiento futuro | Entregar documentacion suficiente para operacion, soporte y futuro mantenimiento. |
| D15 | Soporte | Incluido hasta final de año / 6 meses | Incluir soporte inicial sobre MVP, Copilot, AWS e integraciones. |
| D16 | TellmeGen | Sistema externo no integrado en Fase 1 | Mantener TellmeGen fuera de integracion automatica por falta de API actual. |
| D17 | AWS coste | Coste externo recurrente a incluir | Stage 04 debe incluir AWS como coste externo, no solo Healthie/Odoo. |
| D18 | Healthie API/add-on | Coste externo pendiente de cotizacion | No inventar coste de API; pedir cotizacion o marcar pendiente. |
| D19 | LLM/API Copilot | Coste externo posible a estimar | Si se usa Claude/OpenAI u otra API, Stage 04 debe estimar consumo recurrente. |

## Locked Technical Defaults for Proposal

- Runtime: microservicio propio.
- Backend: TypeScript / NestJS.
- Technical database: PostgreSQL minima.
- Infrastructure: AWS España.
- Portal integration: Healthie API/Webhooks if Healthie is selected.
- Backoffice integration: Odoo API.
- Automation core: código propio, not n8n/Make/Zapier.
- Report support: EPI10 Informe Final Copilot with anonymization and mandatory
  human review.

## Conditional Validations

Estas decisiones son suficientes para preparar Stage 04, pero no eliminan
validaciones de proveedor ya abiertas en Stage 02 v2:

- Healthie debe validar plan, coste, API/webhooks, DPA/GDPR, residencia,
  idioma y limites de documentos/informes. [SRC-001, SRC-002]
- ContinuousCare/equivalente sigue como alternativa si Healthie falla por coste
  o condiciones. [SRC-001, SRC-002]
- Odoo debe validar modalidad, version, API, hosting, permisos y configuracion
  real. [SRC-002]
- Web/pago debe validar tecnologia, pasarela, eventos y contrato de integracion.
  [SRC-002]
- TellmeGen sigue fuera de Fase 1 salvo nueva evidencia de API real,
  documentada, autorizada y viable. [SRC-002]

## Commercial Meaning

Estas decisiones elevan el posicionamiento de Fase 1:

- de "integracion entre herramientas" a "primer activo software propio";
- de "automatizacion puntual" a "capa de orquestacion con logica de negocio";
- de "setup SaaS" a "base tecnica ampliable";
- de "promesa genetica imposible" a "MVP operativo vendible y trazable".

## Handoff to Next Stage

Stage 04 debe usar estas decisiones como base de propuesta, sin convertirlas en
presupuesto final ni en plan de ejecucion atomico. La narrativa comercial debe
explicar que EPI10 compra una primera base software propia que acelera el MVP
con Healthie/Odoo, pero no renuncia a construir capacidades criticas futuras.
