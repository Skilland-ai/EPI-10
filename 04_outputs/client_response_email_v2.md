# Client Response Email v2 - EPI10 Salud

Asunto: Enfoque propuesto para la primera fase operativa de EPI10 Salud

Hola,

Hemos analizado el enfoque para la primera fase y creemos que la solucion debe apoyarse en una plataforma sanitaria ya existente para cubrir la relacion operativa con el cliente. Herramientas como Healthie, ContinuousCare o una alternativa equivalente pueden actuar como la capa principal para portal cliente, formularios, consentimientos, cuestionarios, comunicacion segura, documentacion y seguimiento.

La arquitectura que proponemos para Fase 1 seria:

Web actual o web en desarrollo -> Healthie / ContinuousCare / herramienta equivalente -> Odoo open source como backoffice.

Odoo quedaria como sistema interno de gestion: contactos, pipeline, estados del servicio, tareas, responsables, documentacion operativa y reporting. La plataforma cliente seria la que concentraria la experiencia del usuario y la operativa diaria con el cliente.

En cuanto a resultados geneticos, la integracion con TellmeGen o con el laboratorio proveedor solo deberia entrar en Fase 1 si existe una API real, documentada, accesible y autorizada contractualmente. Si esa API no existe, no conviene incluir esa integracion dentro del alcance inicial; en ese caso la alternativa seria dejarla fuera de Fase 1 o valorar un proveedor/laboratorio que si permita integracion por API.

El alcance inicial podria incluir:

- Evaluacion final y configuracion de Healthie, ContinuousCare o herramienta equivalente.
- Portal cliente, formularios, consentimientos y cuestionarios.
- Comunicacion segura, documentacion e informes dentro de la plataforma cliente.
- Configuracion de Odoo como backoffice.
- Sincronizacion entre plataforma cliente y Odoo.
- Automatizaciones iniciales basadas en APIs reales.
- Documentacion interna, formacion y soporte inicial.

Dejariamos fuera de esta primera fase el gemelo digital, una plataforma propia completa, una app propia si la herramienta elegida ya la cubre, la interpretacion genetica automatizada y cualquier integracion de resultados que no este soportada por API.

Con este enfoque se mantiene una Fase 1 practica, acotada y defendible, usando herramientas existentes sin construir desde cero ni prometer integraciones que dependan de capacidades no verificadas.

Un saludo,
