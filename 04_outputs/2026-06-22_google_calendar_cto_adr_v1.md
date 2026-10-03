# Google Calendar - Reunion CTO ADR EPI10

Fecha: 2026-06-22

## Titulo recomendado

Revision semanal CTO - EPI10: ADR y arquitectura Fase 1

## Texto listo para Google Calendar

Objetivo de la reunion: establecer una revision tecnica semanal de los proyectos de software que estoy desarrollando de forma autonoma, usando al CTO como sparring de arquitectura, riesgos y calidad tecnica antes de cerrar decisiones relevantes.

Para esta primera sesion quiero revisar el ADR y la arquitectura del proyecto EPI10 Salud. La idea es contrastar si las decisiones principales estan bien defendidas, si hay riesgos tecnicos o de cumplimiento que deberiamos elevar, y que criterios deberian quedar como no negociables antes de avanzar hacia una propuesta de Fase 1.

Repositorio:
https://github.com/Skilland-ai/EPI-10

Archivo principal ADR / decision log:
https://github.com/Skilland-ai/EPI-10/blob/master/03_specs/decisions.md

Arquitectura recomendada V2:
https://github.com/Skilland-ai/EPI-10/blob/master/04_outputs/architecture_recommendation_v2.md

Estado actual del proyecto:
https://github.com/Skilland-ai/EPI-10/blob/master/02_context/current_status.md

Documentos de apoyo si hay tiempo:
- PRD MVP operativo V2: https://github.com/Skilland-ai/EPI-10/blob/master/04_outputs/prd_mvp_operativo_v2.md
- Build vs Buy V2: https://github.com/Skilland-ai/EPI-10/blob/master/04_outputs/build_vs_buy_matrix_v2.md
- Comparativa de herramientas V2: https://github.com/Skilland-ai/EPI-10/blob/master/04_outputs/research_tools_comparison_v2.md

Decisiones a revisar:
- Plataforma sanitaria tipo Healthie / ContinuousCare / equivalente como capa principal de cliente.
- Odoo como backoffice interno, no como portal sanitario principal.
- Integracion genetica solo si existe API real, documentada, accesible y autorizada del laboratorio / TellmeGen.
- No construir plataforma propia completa en Fase 1.
- Separar claramente Fase 1A operativa de Fase 1B con integracion genetica.
- Mantener GDPR, residencia UE/Espana, DPA, minimizacion de datos y trazabilidad como criterios de corte.

Salida esperada:
- Validar o ajustar el ADR.
- Detectar riesgos tecnicos, de compliance o de dependencia externa.
- Acordar que decisiones quedan aceptadas, cuales quedan pendientes y que evidencias necesitamos antes de presupuestar.

## Enfoque recomendado para la relacion semanal

Plantear la reunion como governance tecnico ligero, no como aprobacion constante. El CTO deberia ayudarte a revisar decisiones de alto impacto, riesgos, deuda tecnica, seguridad, integraciones y criterios de escalabilidad, mientras tu mantienes la ejecucion autonoma y llevas cada semana decisiones preparadas, tradeoffs claros y preguntas concretas.
