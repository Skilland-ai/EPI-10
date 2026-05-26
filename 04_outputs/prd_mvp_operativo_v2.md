# PRD MVP Operativo v2 - EPI10 Salud

Fecha: 2026-05-26

## Objetivo

Implantar una primera solucion operativa para EPI10 Salud basada en una plataforma sanitaria de relacion con cliente, sincronizada con Odoo como backoffice interno, y con integracion de resultados geneticos solo si existe API real, documentada, accesible y autorizada.

## Cambio Frente A v1

El MVP no se define como Odoo + portal/formularios. Se define como:

- Plataforma cliente sanitaria: Healthie, ContinuousCare o equivalente.
- Backoffice: Odoo open source.
- Integracion genetica: solo API de laboratorio/TellmeGen.
- Middleware: solo para conectar sistemas con APIs reales.

## Roles

- Cliente/paciente: usa la plataforma sanitaria para onboarding, consentimientos, cuestionarios, comunicacion, documentos y seguimiento.
- Equipo EPI10: opera desde la plataforma sanitaria y Odoo, revisa estados, gestiona tareas y entrega seguimiento.
- Administrador EPI10: configura usuarios, permisos, plantillas, formularios, consentimientos y automatizaciones.
- Plataforma cliente: Healthie/ContinuousCare/equivalente; sistema principal de experiencia cliente.
- Odoo: CRM/backoffice, pipeline, tareas, estados, responsables, facturacion/pedidos si aplica.
- Laboratorio/TellmeGen: proveedor de resultados geneticos via API autorizada.
- Middleware: sincronizacion entre APIs.

## Requisitos Funcionales

| ID | Requisito | Prioridad |
| --- | --- | --- |
| F1 | Derivar clientes desde web a la plataforma cliente | Must |
| F2 | Crear perfil de cliente/paciente en Healthie/ContinuousCare/equivalente | Must |
| F3 | Recoger formularios iniciales dentro de la plataforma cliente | Must |
| F4 | Gestionar consentimientos con trazabilidad en la plataforma cliente | Must |
| F5 | Gestionar cuestionarios y seguimiento dentro de la plataforma cliente | Must |
| F6 | Habilitar comunicacion segura cliente-equipo | Must |
| F7 | Entregar documentacion o informes desde la plataforma cliente | Must |
| F8 | Sincronizar contacto, estado y tareas con Odoo | Must |
| F9 | Mantener pipeline interno en Odoo | Must |
| F10 | Integrar resultados geneticos via API laboratorio/TellmeGen, si existe | Conditional Must |
| F11 | Excluir integracion genetica si no hay API valida | Must |
| F12 | Generar reporting operativo basico desde Odoo/plataforma cliente | Should |
| F13 | Soportar proveedor alternativo con API si la integracion genetica es critica | Could |

## Requisitos No Funcionales

- Seguridad: autenticacion fuerte, roles, permisos, cifrado, auditoria y control de accesos.
- Privacidad: minimizacion de datos, datos sensibles en plataformas aptas, DPA/contrato y residencia aplicable.
- Integrabilidad: APIs documentadas, webhooks o mecanismos equivalentes para sincronizar eventos y estados.
- Trazabilidad: consentimientos, comunicaciones, documentos, estados y resultados deben quedar auditables.
- Operabilidad: el equipo debe poder trabajar sin duplicar datos ni operar varios sistemas sin sincronizacion.
- Comercial: Fase 1 debe poder presupuestarse sin prometer integraciones no validadas.

## Datos

| Categoria | Sistema principal | Sincronizacion a Odoo |
| --- | --- | --- |
| Identificacion cliente | Plataforma cliente | Contacto minimo y estado |
| Consentimientos | Plataforma cliente | Estado, fecha, version si procede |
| Formularios/cuestionarios | Plataforma cliente | Resumen operativo o flag de completado |
| Comunicacion | Plataforma cliente | Estado/tarea si procede |
| Documentos/informes | Plataforma cliente | Referencia/estado, no duplicacion por defecto |
| Estado operativo | Odoo | Bidireccional segun API |
| Resultados geneticos | Laboratorio/TellmeGen via API | Solo metadatos/estado necesario |

## Integraciones

- Web -> plataforma cliente: alta, solicitud o onboarding.
- Plataforma cliente -> Odoo: contacto, estado, tareas, hitos, referencias.
- Odoo -> plataforma cliente: estado interno o disparadores de seguimiento si la API lo permite.
- Laboratorio/TellmeGen API -> plataforma cliente/Odoo: resultados, estados y metadatos autorizados.
- Middleware: orquestacion de eventos cuando las APIs existen.

## Criterios De Aceptacion Del MVP

- El cliente puede iniciar el flujo desde la web y operar en una plataforma sanitaria cliente.
- La plataforma cliente cubre formularios, consentimientos, cuestionarios, comunicacion y documentos.
- Odoo refleja el estado interno y tareas sin sustituir la experiencia cliente.
- Las sincronizaciones se apoyan en API/webhooks documentados.
- La integracion genetica solo se activa si hay API de laboratorio/TellmeGen validada.
- Si no hay API genetica, el alcance de Fase 1 lo declara fuera o propone proveedor alternativo.
- El MVP no requiere construir plataforma propia desde cero.
- El MVP no incluye gemelo digital ni automatizacion genetica avanzada.

## Fuera De Alcance

- Gemelo digital.
- App movil propia si la plataforma cliente ya la ofrece.
- Portal propio como recomendacion inicial.
- Operacion no integrada de resultados geneticos.
- Interpretacion genetica automatizada.
- Historia clinica completa propia.
- Garantia legal/GDPR sin revision especializada.
