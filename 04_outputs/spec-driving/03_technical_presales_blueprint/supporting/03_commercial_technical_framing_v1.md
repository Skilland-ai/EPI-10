# 03 - Commercial Technical Framing v1

## Purpose

Este documento traduce la decision CTO de Stage 03 v2 a lenguaje comercial
usable por Stage 04. No es la propuesta comercial final; es el marco tecnico de
venta que evita que la propuesta parezca una simple configuracion SaaS.
[CTO-001]

## Core Narrative for Stage 04

La Fase 1 no consiste unicamente en configurar herramientas SaaS. Incluye el
desarrollo de una primera capa propia de software para EPI10 Salud, alojada en
AWS España, que orquesta la web, el portal cliente Healthie y Odoo, automatiza
estados y tareas, reduce carga operativa y habilita la entrega trazable del
informe final. [CTO-001]

Esta capa queda disenada como una base ampliable para futuras fases. A
diferencia de una simple conexion puntual entre herramientas, permite ir
incorporando progresivamente nuevas capacidades: mas automatizaciones,
integracion genetica si TellmeGen habilita API, evolucion del portal cliente,
automatizacion avanzada del informe, reporting, modulos de analisis y, a largo
plazo, capacidades propias relacionadas con el gemelo digital de EPI10.
[CTO-001]

La idea es usar herramientas existentes para acelerar el MVP, pero construir
desde el inicio una base software propia que pueda ir absorbiendo capacidades
criticas del negocio conforme EPI10 crezca. [CTO-001]

## Terms to Use

- EPI10 Salud MVP 1.0.
- Software propio de EPI10.
- Primera capa de orquestacion.
- Logica de negocio propia.
- Activo tecnologico propio.
- Base ampliable.
- Automatizacion operativa trazable.
- EPI10 Informe Final Copilot.
- Revisión humana obligatoria.
- AWS España.

## Terms to Avoid

- "Un n8n".
- "Una automatizacion low-code".
- "Un cable entre Healthie y Odoo".
- "Setup sencillo".
- "Integracion puntual".
- "Generacion automatica de informe genetico".
- "Diagnostico automatico".
- "Gemelo digital en Fase 1".
- "TellmeGen integrado en Fase 1".

## Buyer Framing

| Buyer/Actor | How Stage 04 Should Frame Value |
| --- | --- |
| Carmen | Control, seguridad, experiencia cliente, propuesta ejecutable y base propia sin sobredimensionar una plataforma completa. |
| Aitor/equipo operativo | Menos carga manual, menos doble entrada, estados claros, tareas, trazabilidad y proceso asistido del informe final. |
| Tomas | Coste/valor, ROI operativo, reduccion de errores y capacidad de escalar sin rehacer todo; no debe dominar el diseno funcional. |
| Cliente final | Portal, onboarding, documentos, comunicacion y entrega del informe de forma mas ordenada y profesional. |

## Value Pillars

1. **Operacion trazable**: web/pago, portal, Odoo, documentos, estados, tareas,
   informe y seguimiento quedan orquestados por una base tecnica comun.
2. **Reduccion de manualidad**: Aitor/equipo dejan de actuar como middleware
   humano para pasos repetibles.
3. **Activo propio**: el código especifico queda como base mantenible y
   ampliable de EPI10.
4. **MVP acelerado con herramientas existentes**: Healthie/Odoo reducen tiempo y
   riesgo sin perder base propia.
5. **Futuro controlado**: TellmeGen, reporting avanzado, Copilot avanzado y
   capacidades de gemelo digital quedan en roadmap, no en promesa de Fase 1.

## Pricing and Cost Framing for Stage 04

Stage 04 debe separar:

- implantacion/desarrollo propio;
- licencias Healthie o alternativa;
- Healthie API/add-on y usuarios adicionales;
- Odoo hosting/licencias/mantenimiento si aplica;
- AWS España;
- LLM/API para EPI10 Informe Final Copilot si aplica;
- soporte incluido hasta final de año / aproximadamente 6 meses;
- mantenimiento posterior como conversacion futura, no como compromiso cerrado;
- revision legal/DPO si EPI10 la requiere.

No se deben cerrar precios definitivos sin cotizacion vigente. Los costes
publicos de Healthie y cualquier coste AWS/LLM deben presentarse como baseline,
rango o pendiente de cotizacion segun corresponda.

## Proposal Guardrails

Stage 04 no debe:

- vender integracion TellmeGen en Fase 1;
- vender generacion automatica del informe genetico;
- prometer cumplimiento legal absoluto;
- decir que Healthie esta cerrado al 100% sin validar plan/coste/API/DPA;
- decir que API/add-on Healthie esta incluido sin cotizacion;
- presentar n8n/Make/Zapier como core;
- presentar Codex/Claude Code como runtime transaccional de negocio;
- convertir la propuesta en backlog o plan Stage 06.

## Handoff to Next Stage

Stage 04 debe construir la propuesta alrededor de esta frase:

> EPI10 compra una primera base software propia, desplegada en AWS España, que
> orquesta Healthie, Odoo y web/pago para operar el MVP con trazabilidad,
> reducir carga manual y entregar el informe final de forma asistida, revisada y
> segura.
