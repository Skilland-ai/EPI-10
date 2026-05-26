# Research Tools Comparison v1 - EPI10 Salud

Fecha: 2026-05-26

## Resumen Ejecutivo

La solucion mas defendible para Fase 1 no es comprar una plataforma sanitaria completa ni desarrollar todo desde cero. La opcion recomendada es un MVP operativo con Odoo como backoffice, una capa de portal/formularios segura y controlada, n8n como middleware limitado, y TellmeGen en modo semimanual inicialmente.

Healthie y Continuous Care son utiles como referencias y posibles aceleradores, pero no deben ser seleccionados como pieza central sin cerrar por contrato datos de residencia, API, exportabilidad y tratamiento de datos geneticos. Como no se pedira nada mas a EPI10 en Fase 0, esas incertidumbres quedan como condiciones de implantacion, no como bloqueo de preventa.

## Criterios De Evaluacion

- Cobertura funcional: portal, formularios, consentimientos, cuestionarios, mensajeria, documentos, seguimiento.
- Integracion: API, webhooks, exportacion, compatibilidad con Odoo/n8n.
- Seguridad y privacidad: GDPR, datos de salud/geneticos, auditoria, roles, cifrado, residencia de datos.
- Viabilidad comercial: coste visible, dependencia del proveedor, tiempo de puesta en marcha.
- Encaje EPI10: salud/genetica/nutraceuticos, operativa semiautomatizada, Espana/UE, MVP acotado.

## Comparativa

| Herramienta | Encaje funcional | Integracion | GDPR/UE | Coste visible | Veredicto Fase 1 |
| --- | --- | --- | --- | --- | --- |
| Healthie | Alto para portal, EHR, formularios, cliente, telehealth, mensajeria y documentos | Alto tecnicamente: GraphQL API, webhooks, sandbox/API en planes superiores | Declara GDPR, HIPAA, SOC 2; hosting indicado en Aptible/AWS, sin residencia UE claramente suficiente en fuentes publicas | Planes publicos desde Core/Essentials/Plus; API como add-on de Group/Enterprise | Viable con reservas; no usar como default si no se garantiza residencia/tratamiento UE |
| Continuous Care | Alto para portal, telemedicina, PHR, citas, pagos, seguimiento y consultas | Medio: se observan capacidades, pero no API publica clara en fuentes encontradas | Declara GDPR y cloud regional; algunas paginas indican nubes regionales UE/US/India/Singapur | Pricing publico poco transparente por region; hay prueba/demo | Viable con reservas; candidato si se confirma API/exportacion y residencia UE en contrato |
| Odoo open source | Alto como CRM/backoffice, pipeline, contactos, estados, tareas, documentos basicos, facturacion | Alto si se self-hosta o se usa plan con API; n8n tiene nodo Odoo | Controlable en hosting UE si se despliega en infraestructura propia/UE | Licencia Community sin coste; coste real en hosting, configuracion y mantenimiento | Recomendado como nucleo/backoffice del MVP |
| TellmeGen | Alto como proveedor de resultados geneticos, no como sistema operativo EPI10 | Bajo/unknown: no se localizaron docs publicas de API usable; si hay API, debe tratarse como condicion futura | Declara GDPR, privacidad, cifrado y control de datos; resultados son sensibles | Coste de kits/producto fuera del alcance Fase 0 | Usar semimanual inicialmente; API solo si aparece documentacion contractual/publica |
| n8n self-hosted | Alto como middleware ligero, webhooks, sincronizaciones y automatizaciones | Alto: nodo Odoo oficial, webhooks, HTTP APIs | Controlable si se self-hosta en UE; n8n no es controlador/procesador en self-hosted segun docs | Software + hosting + mantenimiento | Recomendado para automatizaciones acotadas, sin convertirse en sistema clinico |
| Plataforma europea alternativa | Variable; algunas cubren portal, intake, telemedicina, apps y EU hosting | Variable; API no siempre visible | Mejor punto de partida si ofrecen EU data residency y DPA | Normalmente demo/contact sales | Mantener como opcion si Healthie/Continuous Care fallan en residencia/API |
| Portal propio minimo | Justo para formularios, consentimiento, documentos y seguimiento basico | Alto si se disena para Odoo/n8n desde el inicio | Alto control si se aloja en UE y minimiza datos | Mayor trabajo inicial que SaaS, menor lock-in | Fallback recomendado si no hay SaaS europeo claro |

## Notas Por Herramienta

### Healthie

Healthie cubre muy bien el flujo operativo: portal cliente, formularios, telehealth, mensajeria, documentos, engagement y gestion sanitaria. Su API es una ventaja clara: la documentacion oficial indica GraphQL, acceso amplio a la plataforma, webhooks y API keys. La propia ayuda de Healthie indica que la API es add-on para Group/Enterprise y que la plataforma declara HIPAA, SOC 2, PIPEDA, GDPR y PCI, alojada en Aptible y AWS.

El riesgo principal para EPI10 no es funcional, sino de encaje europeo: la informacion publica no basta para afirmar residencia de datos en Espana/UE ni para tratar datos geneticos con bajo riesgo contractual. Veredicto: buena opcion si se acepta SaaS sanitario estadounidense con garantias contractuales; no recomendada como default de propuesta.

### Continuous Care

Continuous Care encaja funcionalmente con portal paciente, PHR, citas, video consultas, preguntas, monitorizacion remota, pagos, informes y soporte multilenguaje. Sus paginas publicas declaran GDPR y seguridad, y algunas versiones regionales mencionan cloud regional en UE, US, India y Singapur.

El riesgo principal es la falta de una API publica claramente documentada en fuentes encontradas. Si no hay API/exportacion suficiente, puede resolver portal y comunicacion, pero complicar la sincronizacion con Odoo. Veredicto: candidato fuerte para portal si residencia UE y API/exportacion quedan cubiertas en contrato.

### Odoo

Odoo es el candidato mas claro para backoffice: CRM, contactos, oportunidades/estados, actividades, documentos, facturacion/pedidos y permisos. La documentacion oficial cubre CRM, Website/forms, Documents, access rights y APIs externas. Para Fase 1 conviene limitar Odoo a backoffice operativo, no forzarlo a ser portal clinico completo.

El riesgo principal esta en la adaptacion: Odoo puede centralizar demasiadas cosas si se intenta resolver con el todo el portal paciente, consentimiento sanitario y experiencia cliente. Veredicto: recomendado como nucleo interno, con portal/formularios fuera o en capa minima conectada.

### TellmeGen

La web publica de TellmeGen muestra resultados organizados por salud, farmacogenetica, hereditaria, rasgos, wellness, ancestria, DNA Connect y raw data. Tambien declara GDPR, confidencialidad y cifrado. No se encontro documentacion publica de API de resultados para partners que permita presupuestar una integracion automatica.

Veredicto: en Fase 1 no se debe prometer integracion profunda. El MVP debe operar con una asociacion semimanual: registrar en Odoo el estado del test, enlazar o subir informes/documentos autorizados, y solo automatizar si existe una API accesible durante implantacion.

### n8n

n8n es buen middleware para sincronizaciones simples: entrada de formularios, creacion/actualizacion de contactos, estados de servicio, avisos internos, webhooks y tareas. Su nodo oficial de Odoo soporta contactos, oportunidades, notas y recursos personalizados. En self-hosted, n8n no gestiona los datos como proveedor cloud, pero EPI10/implantador asumen seguridad, backups y retencion.

Veredicto: recomendado solo para automatizaciones acotadas y auditables. No debe almacenar genetic/health data mas de lo necesario ni convertirse en repositorio principal.

## Fuentes Consultadas

- Healthie API Docs: https://docs.gethealthie.com/docs
- Healthie API & SDKs: https://help.gethealthie.com/article/943-healthies-api
- Healthie Webhooks: https://help.gethealthie.com/article/1117-webhooks
- Healthie Pricing: https://www.gethealthie.com/healthie-pricing
- Healthie Privacy: https://www.gethealthie.com/privacy
- Continuous Care Patient Portal: https://www.continuouscare.io/patient-portal/
- Continuous Care Platform Security: https://www.continuouscare.io/platform-security
- Continuous Care Features ES: https://www.continuouscare.io/es/features
- Continuous Care Privacy: https://www.continuouscare.io/ro/privacy-policy
- Odoo External API: https://www.odoo.com/documentation/18.0/developer/reference/external_api.html
- Odoo CRM: https://www.odoo.com/documentation/18.0/applications/sales/crm.html
- Odoo Website: https://www.odoo.com/documentation/18.0/applications/websites/website.html
- Odoo Documents: https://www.odoo.com/documentation/18.0/applications/productivity/documents.html
- Odoo Access Rights: https://www.odoo.com/documentation/18.0/applications/general/users/access_rights.html
- n8n Odoo node: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.odoo/
- n8n Privacy: https://docs.n8n.io/privacy-security/privacy/
- tellmeGen Results: https://www.tellmegen.com/en/results/
- tellmeGen Privacy and Security: https://www.tellmegen.com/en/privacy-and-security
- tellmeGen Technology and Laboratory: https://www.tellmegen.com/en/technology-and-laboratory/
- EDPB sensitive data FAQ: https://www.edpb.europa.eu/sme-data-protection-guide/faq-frequently-asked-questions/answer/what-sensitive-data_en
- Scaleway Security and HDS: https://www.scaleway.com/en/security-and-resilience/
- OVHcloud Healthcare/HDS: https://www.ovhcloud.com/en-ie/solutions/industries/healthcare/
- Hetzner German Cloud: https://www.hetzner.com/de/cloud-made-in-germany

## Anexo - Alternativas Europeas Observadas

Estas opciones no sustituyen a la recomendacion base, pero sirven como mercado de referencia si Healthie o Continuous Care no encajan por residencia, API o tratamiento de datos sensibles.

| Alternativa | Encaje potencial | Observacion |
| --- | --- | --- |
| Curoflow | Telemedicina, portal paciente, workflows, comunicacion, seguimiento | Declara desarrollo y hosting dentro de la UE, CE marking y GDPR; parece mas clinica/sanitaria que wellness |
| Certific | Intake estructurado, comunicacion segura, gestion de solicitudes | Fuerte para preconsulta/intake y datos alojados en Europa; no parece cubrir backoffice completo |
| Medcycle | Portal paciente, documentos, comunicacion, integraciones HIS/HL7/API | Interesante si se prioriza portal/documentos e integracion sanitaria; requiere demo/validacion |
| BigDot | Apps paciente/doctor, telemedicina, automatizacion, lab data | Plataforma amplia con EU-hosted/GDPR-aligned; probablemente mas enterprise que MVP ligero |
| AltheraCare | Gestion clinica europea, portal, billing, VERI*FACTU, API enterprise | Puede ser relevante para clinica europea, pero parece orientada a terapeutas y con pricing elevado |

Fuentes adicionales:

- Curoflow: https://curoflow.se/en
- Certific: https://www.certific.co/
- Medcycle: https://medcycle.eu/index2.html
- BigDot: https://www.bigdotapp.com/en/platform
- AltheraCare: https://www.altheracare.com/
