# Client Response Email v1 - EPI10 Salud

Asunto: Propuesta de enfoque para la primera fase operativa de EPI10 Salud

Hola,

Hemos revisado el enfoque para esta primera etapa y nuestra recomendacion es no empezar desarrollando una plataforma completa desde cero. Para este momento tiene mas sentido implantar un MVP operativo apoyado en herramientas existentes, con Odoo como backoffice y una capa segura para portal cliente, formularios, consentimientos, cuestionarios, documentacion y seguimiento.

La idea seria que EPI10 pueda empezar a operar de forma ordenada cuanto antes: captacion desde la web, alta del cliente, onboarding, recogida de consentimientos y cuestionarios, gestion del estado del test genetico, revision interna, entrega de documentacion y seguimiento. La integracion con TellmeGen la planteariamos de forma progresiva: inicialmente con un flujo semimanual controlado y, si la API disponible lo permite, automatizando mas adelante.

Este enfoque evita sobredimensionar la primera fase y reduce el riesgo de invertir demasiado pronto en un producto digital completo. Tambien nos permite separar claramente los costes de implantacion de los costes externos de licencias, hosting, soporte y mantenimiento.

El alcance que proponemos para Fase 1 seria:

- Configuracion de Odoo como sistema interno de gestion.
- Definicion del flujo operativo y estados del cliente.
- Portal/formularios para onboarding, consentimientos y cuestionarios.
- Entrega segura de documentacion e informes.
- Automatizaciones iniciales entre web, portal y Odoo.
- Gestion operativa de resultados geneticos con TellmeGen.
- Documentacion interna, formacion y soporte inicial.

Dejariamos fuera de esta fase el gemelo digital, una app propia, la interpretacion genetica automatizada y cualquier desarrollo de plataforma completa. Esos puntos tendrian sentido en fases posteriores, cuando ya exista operacion real, datos y aprendizaje suficiente.

Con este enfoque, el siguiente paso seria preparar una propuesta cerrada de implantacion de Fase 1, con alcance, tiempos, costes externos previstos, esfuerzo de implantacion, riesgos y condiciones tecnicas.

Un saludo,
