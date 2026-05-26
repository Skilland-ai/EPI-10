# MVP Operational Flow v1 - EPI10 Salud

Fecha: 2026-05-26

## Objetivo Del Flujo

Definir el sistema operativo minimo para que EPI10 pueda captar, onboardear, revisar, documentar y hacer seguimiento de clientes sin construir una plataforma completa desde cero.

## Flujo Principal

1. Captacion desde web

El usuario llega desde la web actual o nueva web de EPI10 y deja una solicitud, compra o prealta. El sistema crea o actualiza un contacto en Odoo y marca el origen.

2. Alta operativa en Odoo

El equipo EPI10 revisa el contacto, valida que aplica al servicio y activa un pipeline de servicio. Odoo mantiene el estado principal: nuevo, onboarding, pendiente de test, pendiente de revision, informe entregado, seguimiento activo, cerrado.

3. Onboarding cliente

El cliente recibe acceso a portal/formulario seguro para completar datos personales minimos, consentimientos, cuestionarios y preferencias de comunicacion. El MVP debe recoger solo los datos necesarios para operar.

4. Consentimientos y trazabilidad

El cliente acepta los consentimientos requeridos antes de tratar datos sensibles o subir documentos. El sistema guarda fecha, version de consentimiento, identidad del cliente y estado de aceptacion.

5. Cuestionarios y datos operativos

El cliente completa cuestionarios de salud, habitos, objetivos y suplementacion/nutraceuticos si aplica. Los resultados se registran en el portal/formularios y se sincronizan con Odoo como resumen, enlace seguro o documento, evitando duplicar datos sensibles innecesariamente.

6. Gestion del test genetico

Odoo registra el estado logistico/operativo del test: solicitado, kit enviado, muestra recibida, resultados disponibles, revisado. Si TellmeGen no tiene API usable, el resultado se gestiona con enlace/documento/manual upload autorizado.

7. Revision interna

El equipo EPI10 revisa cuestionarios, consentimientos, resultados disponibles y notas internas. Se generan tareas, incidencias o solicitudes internas en Odoo.

8. Entrega de documentacion

El cliente recibe informe, documentacion o recomendaciones a traves de portal seguro o canal documentado. Odoo registra fecha de entrega, version y estado.

9. Comunicacion y seguimiento

La comunicacion se mantiene en portal/mensajeria segura o canal aprobado. Se evitan WhatsApp/correo para datos sensibles salvo comunicaciones administrativas sin contenido clinico/genetico.

10. Cierre o continuidad

El servicio queda en seguimiento activo, renovacion, pausa o cierre. Odoo conserva el estado operativo y la trazabilidad minima.

## Responsabilidades Por Sistema

| Etapa | Web | Portal/Formularios | Odoo | n8n/Middleware | TellmeGen | Equipo EPI10 |
| --- | --- | --- | --- | --- | --- | --- |
| Captacion | Recoge lead/compra | No aplica | Crea contacto/oportunidad | Sincroniza entrada | No aplica | Revisa entrada |
| Onboarding | Enlaza al portal | Recoge datos y consentimiento | Estado onboarding | Crea tareas/avisos | No aplica | Supervisa |
| Cuestionarios | No aplica | Recoge respuestas | Guarda resumen/estado | Sincroniza resumen | No aplica | Revisa |
| Test genetico | No aplica | Puede mostrar estado | Estado operativo | Automatiza avisos | Resultado externo | Gestiona asociacion |
| Revision | No aplica | Documentos visibles | Tareas/notas/estado | Avisos internos | Fuente de resultado | Interpreta/valida |
| Entrega | No aplica | Entrega segura | Registra entrega | Notifica estado | No aplica | Genera entrega |
| Seguimiento | No aplica | Comunicacion/updates | Estado y tareas | Recordatorios | No aplica | Ejecuta seguimiento |

## Estados Minimos En Odoo

- Lead nuevo
- Contactado
- Onboarding enviado
- Consentimiento pendiente
- Cuestionario pendiente
- Datos completos
- Test solicitado
- Resultado pendiente
- Resultado disponible
- En revision interna
- Informe entregado
- Seguimiento activo
- Cerrado

## Datos Minimos

- Identidad y contacto: nombre, email, telefono, pais, idioma.
- Operacion: estado del servicio, responsable interno, fechas clave, origen del lead.
- Consentimiento: version, fecha, aceptacion, revocacion si aplica.
- Cuestionarios: respuestas o resumen operativo, segun sensibilidad.
- Genetica: identificador/logistica/estado del test; informe o enlace seguro solo si esta autorizado.
- Documentacion: informes, versiones, fechas de entrega.
- Comunicacion: historial o referencias suficientes para trazabilidad.

## Automatizaciones Iniciales

- Crear/actualizar contacto en Odoo desde web/formulario.
- Crear tareas internas al completarse onboarding.
- Avisar cuando falte consentimiento o cuestionario.
- Cambiar estado en Odoo cuando se complete un formulario.
- Notificar internamente que hay resultados/documentos pendientes de revision.
- Registrar entrega de informe y activar seguimiento.

## Pasos Manuales Aceptados En MVP

- Asociar resultados TellmeGen si no hay API.
- Revisar cuestionarios y resultados antes de entregar documentacion.
- Generar informe/recomendacion.
- Validar consentimiento legal y contenido sanitario.
- Corregir incidencias de sincronizacion.

## Exclusiones Del Flujo MVP

- Gemelo digital.
- App movil propia.
- Interpretacion genetica automatizada.
- Integracion profunda con TellmeGen sin API validada.
- Historia clinica completa.
- Automatizacion total de recomendaciones o tratamientos.
