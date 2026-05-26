# PRD MVP Operativo v1 - EPI10 Salud

Fecha: 2026-05-26

## Objetivo

Implantar una primera solucion operativa para EPI10 Salud que permita gestionar clientes, consentimientos, cuestionarios, resultados geneticos, documentacion, comunicacion y seguimiento con herramientas existentes y desarrollo minimo.

El MVP debe permitir operar de forma ordenada y segura sin construir todavia el gemelo digital ni una plataforma sanitaria completa.

## Usuarios Y Roles

- Cliente: completa onboarding, acepta consentimientos, responde cuestionarios, consulta documentos y recibe seguimiento.
- Equipo EPI10: revisa datos, gestiona estados, asocia resultados, prepara informes y atiende seguimiento.
- Administrador: configura formularios, permisos, automatizaciones, plantillas y usuarios.
- Odoo: sistema de backoffice para contactos, pipeline, estados, tareas, documentos y reporting operativo.
- Portal/formularios: capa de experiencia cliente para datos, consentimientos, cuestionarios, documentos y comunicacion.
- TellmeGen: proveedor externo de resultados geneticos.
- Middleware: automatizaciones entre web, portal y Odoo.

## Requisitos Funcionales

| ID | Requisito | Prioridad |
| --- | --- | --- |
| F1 | Crear o actualizar contacto en Odoo desde entrada web/formulario | Must |
| F2 | Mantener pipeline de servicio por cliente en Odoo | Must |
| F3 | Recoger consentimiento antes de tratar datos sensibles | Must |
| F4 | Recoger cuestionarios iniciales de salud/habitos/objetivos | Must |
| F5 | Registrar estado operativo del test genetico | Must |
| F6 | Asociar informe, enlace o documento de resultados TellmeGen al cliente | Must |
| F7 | Crear tareas internas para revision, entrega y seguimiento | Must |
| F8 | Entregar documentacion/informes al cliente por canal seguro | Must |
| F9 | Mantener comunicacion trazable o registro de comunicaciones | Should |
| F10 | Automatizar cambios de estado basicos entre portal y Odoo | Should |
| F11 | Generar reporting operativo basico por estado y volumen | Should |
| F12 | Soportar integracion API de TellmeGen si existe y esta disponible | Could |

## Requisitos No Funcionales

- Seguridad: acceso por roles, MFA cuando sea posible, minimo privilegio, logs de acceso y cambios relevantes.
- Privacidad: minimizacion de datos, separacion entre datos operativos y datos geneticos, consentimiento explicito y retencion definida.
- Infraestructura: preferencia por alojamiento en Espana/UE; si se usa SaaS externo, exigir garantias contractuales antes de almacenar datos sensibles.
- Trazabilidad: cada cliente debe tener estado, responsable, fechas clave y proximas acciones visibles.
- Mantenibilidad: evitar personalizaciones profundas de Odoo y automatizaciones opacas.
- Escalabilidad: soportar aumento gradual de clientes sin redisenar el flujo.

## Datos Tratados

| Categoria | Ejemplos | Sistema preferente | Sensibilidad |
| --- | --- | --- | --- |
| Identificacion | nombre, email, telefono, pais, idioma | Odoo | Media |
| Operacion | estado, responsable, tareas, fechas | Odoo | Media |
| Consentimiento | version, fecha, aceptacion, revocacion | Portal/Odoo | Alta |
| Cuestionarios | salud, habitos, objetivos | Portal, resumen en Odoo | Alta |
| Genetica | informe, raw data, resultado, identificador | TellmeGen/portal seguro | Muy alta |
| Documentos | informes, recomendaciones, adjuntos | Portal/Odoo Documents segun seguridad | Alta |
| Comunicacion | mensajes, notas, trazas | Portal/Odoo | Alta si contiene salud/genetica |

## Integraciones

- Web -> Odoo: alta de lead/contacto o solicitud.
- Portal/formularios -> Odoo: estado, resumen y documentos necesarios.
- Portal/formularios -> n8n: disparadores de onboarding, tareas y recordatorios.
- n8n -> Odoo: contactos, notas, oportunidades, tareas o recursos personalizados.
- TellmeGen -> EPI10: semimanual en MVP; API solo si hay documentacion y contrato suficientes.

## Criterios De Aceptacion Del MVP

- Un cliente puede entrar desde web y quedar registrado en Odoo con estado inicial.
- El equipo puede enviar onboarding y ver si consentimiento/cuestionarios estan completos.
- El cliente puede completar consentimiento y cuestionarios por canal seguro.
- Odoo muestra el estado del servicio y las tareas pendientes por cliente.
- El equipo puede asociar resultados TellmeGen aunque sea manualmente.
- El equipo puede entregar un informe/documento y registrar la entrega.
- El flujo funciona con pasos manuales declarados, sin prometer automatizacion total.
- No se almacenan datos geneticos en sistemas no validados para datos sensibles.

## Fuera De Alcance

- Gemelo digital.
- App movil propia.
- Motor automatico de recomendaciones geneticas.
- Diagnostico medico automatizado.
- Integracion profunda con TellmeGen sin API disponible.
- Sustituir asesoria legal, sanitaria o de proteccion de datos.
- Plataforma multi-tenant propia para terceros.
