# Research Tools Comparison v2 - EPI10 Salud

Fecha: 2026-05-26

## Cambio Conceptual Frente A v1

La v2 corrige dos puntos:

- Healthie, ContinuousCare o una herramienta equivalente no son un accesorio de formularios. Son candidatos centrales para la capa de relacion y operacion con cliente.
- La integracion de resultados geneticos no admite operativa manual como solucion arquitectonica. Si el laboratorio/TellmeGen no ofrece API real, documentada, accesible y autorizada, esa integracion queda fuera de Fase 1 o se requiere proveedor alternativo con API.

## Arquitectura Que Se Evalua

```text
Web actual / web en desarrollo
  -> Healthie / ContinuousCare / herramienta sanitaria equivalente
  -> Odoo open source como backoffice
  <- API laboratorio proveedor / TellmeGen, solo si existe y esta autorizada
```

## Matriz De Herramientas

| Herramienta | Rol correcto en v2 | Fortalezas | Riesgos | Veredicto |
| --- | --- | --- | --- | --- |
| Healthie | Capa principal de experiencia cliente y operacion cliente | Portal cliente, formularios, consentimientos, cuestionarios, mensajeria, documentos, telehealth, API GraphQL, webhooks | Orientacion fuerte a US/HIPAA; residencia UE y tratamiento de datos geneticos deben validarse contractualmente | Candidato central si supera GDPR/residencia/contrato/API |
| ContinuousCare | Capa principal de experiencia cliente y operacion cliente | Virtual Practice, portal paciente, app, EHR, onboarding con consentimiento, comunicacion, pagos, seguimiento, nubes regionales, APIs declaradas | API publica menos transparente; requiere validar alcance real de API/exportacion y condiciones UE | Candidato central, especialmente fuerte por enfoque internacional/regional clouds |
| Herramienta sanitaria equivalente | Capa principal si Healthie/ContinuousCare no encajan | Puede aportar mejor residencia UE, DPA, API o encaje regulatorio | Mercado fragmentado; muchas opciones requieren demo y contrato | Alternativa seria, no fallback generico |
| Odoo open source | Backoffice y gestion interna | CRM, contactos, pipeline, tareas, estados, documentos operativos, API externa | No debe convertirse en portal sanitario principal si eso degrada UX o seguridad | Recomendado como sistema interno conectado |
| TellmeGen/laboratorio | Fuente de resultados geneticos via API | B2B platform para pedidos/usuarios/resultados; posible encaje si existe API autorizada | No se encontro API publica de resultados documentada; plataforma web B2B no equivale a API | Dependencia bloqueante para integracion de resultados en Fase 1 |
| n8n/middleware | Orquestacion tecnica limitada | Webhooks, APIs, sincronizacion Healthie/ContinuousCare/Odoo si las APIs lo permiten | No debe custodiar datos geneticos ni suplir una API inexistente | Util si hay APIs reales en ambos lados |

## Healthie Como Capa Cliente

Healthie debe evaluarse como una plataforma operativa completa para el cliente, no como formulario. Sus fuentes publicas muestran:

- API GraphQL con acceso amplio a la plataforma y documentacion especifica.
- Webhooks para eventos e integraciones.
- Formularios electronicos, e-signature y portal cliente.
- Mensajeria y documentos clinicos/operativos.
- Declaraciones de privacidad/GDPR e infraestructura con proveedores como Aptible/AWS.

Decision v2: Healthie puede ser nucleo de experiencia cliente si se valida residencia/tratamiento UE, DPA, BAA/DPA aplicable, API necesaria, costes y uso de datos geneticos. Si no cumple esos criterios, no se degrada a simple formulario; se descarta como capa central y se busca equivalente.

## ContinuousCare Como Capa Cliente

ContinuousCare debe evaluarse como plataforma central de Virtual Practice. Sus fuentes publicas indican:

- Portal del paciente, app movil, EHR, onboarding con consentimiento, pagos, citas, seguimiento y comunicacion.
- Nubes regionales en US, UE, India y Singapur, con datos alojados segun pais de registro, segun su web.
- APIs para acceso seguro a datos y acciones nucleares como crear pacientes y reservar citas.
- Enfoque white-label y startup-ready para servicios digitales de salud.

Decision v2: ContinuousCare es probablemente el candidato mas alineado si la API real permite sincronizar con Odoo y si la region UE queda contractualmente cerrada. El punto debil es la falta de documentacion API publica detallada.

## Odoo

Odoo se mantiene como backoffice, no como capa principal de cliente. Debe gestionar:

- Contactos/clientes.
- Pipeline y estados del servicio.
- Tareas internas.
- Responsables y actividades.
- Documentacion operativa no genetica o referencias seguras.
- Facturacion/pedidos si aplica.
- Reporting interno.

La API externa de Odoo permite integraciones, pero en Odoo Online el acceso depende del plan. Ese punto debe presupuestarse como coste/condicion tecnica.

## TellmeGen / Laboratorio Proveedor

La web publica de tellmeGen muestra plataforma B2B para compra directa, registro de usuarios, gestion de cuentas y generacion de informes PDF en marca blanca. Eso no es suficiente para presupuestar una integracion automatica de resultados.

Decision v2:

- API real, documentada, accesible y autorizada: se puede incluir integracion en Fase 1.
- Sin API: no se integra en Fase 1.
- Alternativa: buscar laboratorio/proveedor con API si la integracion genetica es imprescindible para Fase 1.

No se propone operacion manual de resultados geneticos como arquitectura.

## Fuentes Consultadas

- Healthie API docs: https://docs.gethealthie.com/docs
- Healthie API update: https://www.gethealthie.com/blog/whats-new-in-healthies-api-docs
- Healthie Webhooks: https://help.gethealthie.com/article/1117-webhooks
- Healthie Electronic Forms: https://help.gethealthie.com/article/174-intake-forms-available-within-healthie
- Healthie Client Platform: https://clienthelp.gethealthie.com/article/213-about-the-healthie-platform
- Healthie Privacy: https://www.gethealthie.com/privacy
- ContinuousCare Virtual Practice: https://www.continuouscare.io/
- ContinuousCare ES Virtual Practice/API/regional clouds: https://www.continuouscare.io/es
- ContinuousCare Patient Administration: https://www.continuouscare.io/patient-administration
- ContinuousCare Platform Security: https://www.continuouscare.io/platform-security
- ContinuousCare Privacy: https://www.continuouscare.io/ro/privacy-policy
- Odoo External API: https://www.odoo.com/documentation/18.0/developer/reference/external_api.html
- Odoo CRM: https://www.odoo.com/documentation/17.0/applications/sales/crm.html
- Odoo Documents: https://www.odoo.com/documentation/19.0/applications/productivity/documents.html
- tellmeGen B2B Platform: https://www.tellmegen.com/en/b2b-platform
- tellmeGen Results: https://www.tellmegen.com/en/results/
- EDPB Sensitive Data FAQ: https://www.edpb.europa.eu/sme-data-protection-guide/faq-frequently-asked-questions/answer/what-sensitive-data_en
