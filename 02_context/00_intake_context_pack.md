# 00 - Intake Context Pack

## Project Summary

EPI10 Salud necesita una primera fase operativa, práctica y acotada para poner en marcha su servicio apoyándose en herramientas existentes, no en una plataforma propia completa desde cero. La necesidad inicial se formula alrededor de web en desarrollo, Odoo open source como backoffice, una herramienta tipo Healthie o ContinuousCare como portal/capa cliente, y la plataforma de resultados genéticos de TellmeGen/laboratorio proveedor. [SRC-001]

El descubrimiento posterior cambia una pieza crítica: TellmeGen no dispone actualmente de API operativa para partners, por lo que la integración automática con TellmeGen no puede tratarse como alcance cerrado de Fase 1. Esto no invalida el MVP, pero desplaza el foco hacia portal cliente, backoffice, automatizaciones operativas, entrega del informe final, trazabilidad y seguimiento, dejando TellmeGen como sistema externo no integrado en Fase 1. [SRC-002]

Stage 00 no decide todavía el MVP ni redacta propuesta comercial. Solo normaliza el contexto, fuentes, hechos, tensiones, preguntas y candidatos de scope para que Stage 01 pueda auditar problemas reales.

## Actors and Stakeholders

| Actor | Rol detectado | Relevancia | Fuente |
| --- | --- | --- | --- |
| Carmen | Buyer/persona funcional o estratégica principal | Define el enfoque inicial: Fase 1 práctica, acotada, con herramientas existentes y propuesta ejecutable | SRC-001, SRC-002 |
| Aitor | Responsable de Calidad y usuario operativo clave | Conoce el flujo real, TellmeGen y Odoo; aparece como principal pain owner operativo por carga manual | SRC-002 |
| Tomás | Posible comprador económico o figura de decisión/pago | Relevante para coste, valor y ROI, pero no debe dominar el diseño funcional | SRC-002 |
| Equipo EPI10 | Futuro equipo operador | Necesita estados, tareas, responsables, trazabilidad, documentación y formación | SRC-002 |
| Cliente final / paciente / usuario EPI10 | Usuario del servicio | Compra/contrata, completa formularios y consentimientos, aporta documentos/analíticas, recibe informe y seguimiento | SRC-002 |
| TellmeGen / laboratorio proveedor | Proveedor externo de test genéticos | Plataforma B2B/profesional usada para tests, usuarios, barcodes y resultados; sin API operativa actual confirmada | SRC-001, SRC-002 |
| Reboot / Skilland / Raúl / Romina | Equipo de preventa/arquitectura/implementación | Debe entender problema, definir scope, preparar blueprint/propuesta y eventualmente ejecutar si se vende | SRC-001, SRC-002 |

## Source Map

| Source ID | Path or Origin | Type | Notes |
| --- | --- | --- | --- |
| SRC-001 | `raw/fuente-primaria-carmen-brief-inicial.md` | Fuente primaria comercial/estratégica | Brief ordenado atribuido a Carmen. Define expectativas iniciales, enfoque práctico, herramientas candidatas, costes e infraestructura segura. |
| SRC-002 | `raw/insights-preventa-epi10-salud.md` | Fuente consolidada de preventa | Reconstrucción de conversaciones, reuniones, emails y entregables v1/v2. Incluye hallazgos con Aitor, respuesta TellmeGen, problemas, riesgos, candidatos de scope y decisiones internas. |

## Raw Facts

| Fact | Source ID | Confidence |
| --- | --- | --- |
| Carmen pide una primera fase práctica, acotada y basada en herramientas existentes, no construir todo desde cero. | SRC-001 | high |
| EPI10 quiere apoyarse en la web actual/en desarrollo, Odoo open source, una herramienta tipo Healthie/ContinuousCare/equivalente y la plataforma TellmeGen/laboratorio. | SRC-001 | high |
| Carmen pide una propuesta sencilla y ejecutable para Fase 1. | SRC-001 | high |
| Carmen menciona Healthie y ContinuousCare como opciones para portal, formularios, consentimientos, cuestionarios, seguimiento, comunicación segura y entrega de documentación/informes. | SRC-001 | high |
| La web de EPI10 está en construcción y se espera que tenga formulario y posiblemente pago. | SRC-002 | medium |
| Odoo existe o está previsto como backoffice, pero su estado/configuración real no está completamente cerrado. | SRC-002 | medium |
| Healthie parece ganar peso como candidato principal, aunque ContinuousCare sigue como alternativa. | SRC-002 | medium |
| TellmeGen se usa como plataforma profesional/B2B para gestionar tests, usuarios, barcodes y resultados. | SRC-002 | high |
| TellmeGen ha indicado que por ahora solo dispone de plataforma profesional y no de API operativa actual para partners. | SRC-002 | high |
| TellmeGen quiere migrar interacciones a APIs en el futuro, pero no hay deadline claro. | SRC-002 | high |
| Existe un presupuesto/API antiguo de TellmeGen que debería revisar el nuevo director de IT. | SRC-002 | medium |
| Mucho del flujo operativo actual depende de acciones manuales de Aitor. | SRC-002 | high |
| El informe final EPI10 se construye con outputs de TellmeGen, criterio del equipo EPI10 e inputs opcionales como analíticas. | SRC-002 | high |
| Actualmente el informe final parece entregarse por correo. | SRC-002 | medium |
| EPI10 maneja datos personales, de salud, genéticos, analíticas e informes. | SRC-001, SRC-002 | high |
| Carmen pide contemplar infraestructura segura alojada en España o la Unión Europea. | SRC-001 | high |
| La Fase 0/preventa se entiende como interna y no vendible/cobrable al cliente. | SRC-002 | medium |
| Stage 06 debe permanecer deshabilitado salvo decisión explícita. | SRC-002 | high |

## Business Goals

- Operar EPI10 cuanto antes con una Fase 1 segura, ordenada, realista y ejecutable. [SRC-001]
- Evitar construir una plataforma sanitaria propia completa desde cero. [SRC-001, SRC-002]
- Profesionalizar la experiencia cliente mediante un portal o capa cliente centralizada. [SRC-001, SRC-002]
- Reducir carga manual y dependencia operativa de Aitor/equipo. [SRC-002]
- Crear trazabilidad del proceso: estados, tareas, responsables, documentos, informe y seguimiento. [SRC-002]
- Mantener control de costes: licencias, integración, soporte, mantenimiento, infraestructura y desarrollos mínimos. [SRC-001]
- Preparar evolución futura hacia integración genética si TellmeGen habilita API o se elige otro proveedor. [SRC-002]

## Operational Pains

- Aitor actúa como middleware humano entre web, pago, Odoo, TellmeGen, cliente, documentos, analíticas, informe final y seguimiento. [SRC-002]
- La interacción cliente parece fragmentada entre web, email, TellmeGen, formularios/documentos y comunicación manual. [SRC-002]
- Formularios, consentimientos y cuestionarios todavía no están centralizados/configurados. [SRC-001, SRC-002]
- Las analíticas opcionales del cliente se piden, reciben o procesan de forma manual. [SRC-002]
- La producción y entrega del informe final no está suficientemente sistematizada. [SRC-002]
- TellmeGen no ofrece API actual, por lo que usuarios, barcodes, estados, resultados y PDFs no se pueden automatizar en Fase 1. [SRC-002]
- Odoo no aparece todavía como sistema operativo robusto y cerrado para estados, tareas, responsables y reporting. [SRC-002]
- Falta una vista operativa central de clientes por estado, próximos pasos, documentos pendientes, informes pendientes y seguimiento. [SRC-002]
- Hay riesgo de datos sensibles circulando por canales poco adecuados, especialmente email o procesos manuales. [SRC-001, SRC-002]

## Technical Constraints

- No construir todo desde cero; priorizar herramientas existentes y desarrollos mínimos. [SRC-001]
- Healthie/ContinuousCare/equivalente deben evaluarse como capa cliente, no como simple formulario. [SRC-001, SRC-002]
- Odoo debe tratarse como backoffice interno, no como portal sanitario del cliente. [SRC-001, SRC-002]
- TellmeGen no debe presupuestarse como integración automatizada en Fase 1 sin API operativa disponible. [SRC-002]
- Cualquier integración futura con TellmeGen depende de API, documentación, permisos, coste y plazo del proveedor. [SRC-002]
- Se debe minimizar la duplicación de datos sensibles; Odoo debería guardar estados/referencias más que datos genéticos crudos. [SRC-002]
- La infraestructura y proveedores deben contemplar seguridad, protección de datos, DPA/GDPR y preferencia España/UE. [SRC-001, SRC-002]
- La web/pago está en construcción o pendiente de validación, por lo que su contrato de integración es Unknown. [SRC-002]
- El estado exacto de Odoo, versión, módulos, hosting y API disponible es Unknown. [SRC-002]
- El plan/coste/API/residencia/DPA de Healthie o ContinuousCare es Unknown. [SRC-002]

## Open Questions

### Healthie / ContinuousCare

- ¿Qué plan de Healthie sería necesario para API, formularios, documentos, comunicación y soporte? [SRC-002]
- ¿Cuál es el coste por usuario, cliente o paciente? [SRC-002]
- ¿Permite español, marca blanca, portal/app, subida de documentos, entrega de informes, webhooks/API y exportación? [SRC-002]
- ¿Qué DPA/GDPR/residencia ofrece y puede usarse con datos genéticos o informes derivados? [SRC-002]
- ¿ContinuousCare cubre mejor residencia, coste o requisitos sanitarios que Healthie? [SRC-001, SRC-002]

### Odoo

- ¿Qué versión/modalidad usa EPI10: Community, Enterprise, Online, Odoo.sh o self-hosted? [SRC-002]
- ¿Qué módulos están activos y cuál es el estado real de configuración? [SRC-002]
- ¿Tiene API disponible y quién lo mantiene? [SRC-002]
- ¿Debe gestionar facturación/pedidos, tareas, estados, reporting o solo backoffice operativo? [SRC-002]
- ¿Dónde está alojado y cómo se gestionan permisos? [SRC-002]

### Web / Pago

- ¿En qué tecnología está la web y quién la desarrolla? [SRC-002]
- ¿Qué pasarela de pago se usará y si el pago ya está implementado? [SRC-002]
- ¿El formulario web recoge datos sensibles? [SRC-002]
- ¿Puede disparar webhooks/API hacia Odoo o Healthie? [SRC-002]
- ¿Conviene mantener formulario web propio o mover onboarding a Healthie tras pago? [SRC-002]

### TellmeGen

- ¿Pueden compartir el presupuesto/API antiguo y su alcance técnico/económico? [SRC-002]
- ¿Qué endpoints contemplaba esa API antigua? [SRC-002]
- ¿Hay posibilidad real de API a corto/medio plazo? [SRC-002]
- ¿Existe exportación estructurada alternativa o partner premium con API? [SRC-002]

### Informe final y ROI

- ¿Cuál es la plantilla actual del informe final y en qué formato se produce? [SRC-002]
- ¿Quién genera el informe y cuánto tiempo tarda por cliente? [SRC-002]
- ¿Qué partes son fijas, cuáles dependen de TellmeGen y cuáles de criterio experto? [SRC-002]
- ¿Cuántos clientes esperan al mes y a seis meses? [SRC-002]
- ¿Cuántas horas dedica Aitor/equipo por cliente en coordinación, documentación, informe y seguimiento? [SRC-002]

## Assumptions

- Healthie podría ser la herramienta preferida para la capa cliente, pero la decisión no está cerrada. [SRC-002]
- Odoo será el backoffice operativo principal, pero su estado real aún debe validarse. [SRC-001, SRC-002]
- La web tendrá formulario y pago, pero su integración real con Odoo/Healthie es Unknown. [SRC-002]
- EPI10 aceptará dejar TellmeGen fuera de integración automatizada en Fase 1 si se explica bien el valor alternativo. [SRC-002]
- Aitor quiere reducir manualidad y mejorar trazabilidad, aunque el grado exacto de dolor/tiempo no está cuantificado. [SRC-002]
- El informe final es el entregable central del servicio EPI10. [SRC-002]
- El ROI podrá formularse inicialmente con supuestos explícitos, no con cifras cerradas, hasta disponer de volumen y horas actuales. [SRC-002]

## Contradictions

| Contradiction | Sources | Handling for Next Stages |
| --- | --- | --- |
| Carmen pide centrar propuesta en integración con API TellmeGen/laboratorio, pero TellmeGen indica que no hay API operativa actual. | SRC-001 vs SRC-002 | Stage 01 debe tratarlo como restricción/problema real; Stage 02 no debe incluir integración automática TellmeGen en Fase 1 salvo nueva evidencia. |
| Healthie/ContinuousCare aparecen como opciones abiertas, pero el material consolidado dice que Healthie parece preferida. | SRC-001 vs SRC-002 | Mantener Healthie como candidato fuerte, no como decisión cerrada, hasta validación de plan/coste/API/DPA. |
| Carmen quiere una propuesta sencilla y ejecutable, pero el inventario de sistemas, estados y riesgos es amplio. | SRC-001 vs SRC-002 | Stage 02 debe recortar scope de forma opinionada para evitar sobreingeniería. |
| La arquitectura ideal inicial presupone API-first, pero la realidad actual obliga a MVP sin TellmeGen API. | SRC-001 vs SRC-002 | Stage 03 debe diseñar arquitectura viable sin dependencia de API TellmeGen. |
| El cliente quiere seguridad/infraestructura España/UE, pero no están validados proveedores, hosting ni condiciones DPA. | SRC-001 vs SRC-002 | Stage 03/04 deben tratarlo como requisito y riesgo, no como garantía cerrada. |

## Candidate Scope Areas

Estas áreas son candidatas para análisis posterior. No son todavía decisión de MVP.

- Workshop inicial de flujo operativo EPI10 para cerrar proceso real y límites de Fase 1. [SRC-002]
- Selección final Healthie vs ContinuousCare/equivalente. [SRC-001, SRC-002]
- Configuración de Healthie como portal cliente: onboarding, formularios, consentimientos, cuestionarios, documentos, analíticas, comunicación, entrega de informe y seguimiento. [SRC-001, SRC-002]
- Configuración de Odoo como backoffice: contactos, pedidos/facturación si aplica, estados, tareas, responsables, pipeline y reporting operativo. [SRC-001, SRC-002]
- Integración web/pago -> Odoo/Healthie para alta de cliente, invitación, tareas y estado inicial. [SRC-002]
- Sincronización Healthie -> Odoo de estados, flags, tareas o referencias sin duplicar datos sensibles. [SRC-002]
- Automatizaciones de calidad de vida para reducir carga manual de Aitor/equipo. [SRC-002]
- Proceso sistematizado de informe final: checklist, plantilla, estados, revisión, entrega en Healthie y registro en Odoo. [SRC-002]
- Dashboard operativo básico en Odoo. [SRC-002]
- Documentación, formación y soporte inicial. [SRC-002]
- Fase 2 condicionada: API TellmeGen futura, proveedor alternativo con API, automatización avanzada de informe, dashboard genética o reporting avanzado. [SRC-002]

## Non-Goals

- No construir una plataforma sanitaria propia completa desde cero. [SRC-001, SRC-002]
- No vender integración TellmeGen por API en Fase 1 sin API real, documentada y autorizada. [SRC-002]
- No vender "semimanual" como si fuera integración automatizada TellmeGen. [SRC-002]
- No prometer creación automática de usuarios/tests/barcodes en TellmeGen. [SRC-002]
- No prometer consulta automática de estado, resultados o descarga de PDF TellmeGen. [SRC-002]
- No crear dashboard genética alimentada por TellmeGen en Fase 1. [SRC-002]
- No prometer interpretación genética automática, diagnóstico automatizado ni gemelo digital. [SRC-002]
- No crear app móvil propia si Healthie/equivalente cubre portal/app de forma suficiente. [SRC-002]
- No garantizar cumplimiento legal absoluto sin revisión legal/DPO especializada. [SRC-001, SRC-002]
- No ejecutar Stage 06 ni plan de implementación profundo salvo decisión explícita. [SRC-002]

## Missing Information

- Estado exacto de Odoo: versión, modalidad, módulos, hosting, API, permisos y mantenimiento. [SRC-002]
- Tecnología de la web, responsable de desarrollo, pasarela de pago y capacidad de webhooks/API. [SRC-002]
- Decisión final Healthie vs ContinuousCare y validación de plan, coste, API, residencia, DPA/GDPR, idioma y marca blanca. [SRC-001, SRC-002]
- Documentación técnica o presupuesto/API antiguo de TellmeGen. [SRC-002]
- Plantilla actual del informe final, formato, proceso, tiempos, responsables y partes automatizables. [SRC-002]
- Volumen esperado de clientes y horas actuales de Aitor/equipo por cliente. [SRC-002]
- Política legal/DPO concreta para datos de salud/genéticos, retención, roles, contratos y proveedores. [SRC-001, SRC-002]
- Campos actuales del formulario web y datos sensibles que recoge. [SRC-002]
- Mapa definitivo de estados operativos para Odoo/Healthie. [SRC-002]
- Pricing real de licencias, integración, soporte, mantenimiento e infraestructura. [SRC-001, SRC-002]

## Handoff to Next Stage

Stage 01 debe auditar problemas reales sin saltar directamente a solución. Problemas candidatos importantes:

- dependencia manual de Aitor/equipo como middleware operativo;
- ausencia de portal cliente único;
- formularios, consentimientos, cuestionarios y documentos no centralizados;
- informe final no suficientemente sistematizado;
- Odoo todavía no confirmado como sistema operativo robusto;
- web/pago en construcción y contrato de integración no cerrado;
- TellmeGen sin API actual;
- riesgos de datos sensibles y trazabilidad.

Stage 01 debe separar con cuidado:

- problemas reales vs deseos de arquitectura;
- restricciones verificadas vs supuestos;
- MVP resoluble ahora vs Fase 2 condicionada;
- valor operativo de Fase 1 vs promesas inviables de integración genética.
