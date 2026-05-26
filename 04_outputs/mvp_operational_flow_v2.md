# MVP Operational Flow v2 - EPI10 Salud

Fecha: 2026-05-26

## Flujo Objetivo

```text
Web actual / web en desarrollo
  -> Healthie / ContinuousCare / herramienta equivalente
  -> Odoo open source
  <- API laboratorio proveedor / TellmeGen, solo si existe y esta autorizada
```

## Principio Operativo

La capa Healthie/ContinuousCare/equivalente gestiona la relacion con cliente. Odoo gestiona la operacion interna. La informacion genetica entra solo por API autorizada. Si no hay API, la parte de resultados geneticos queda fuera de Fase 1.

## Flujo Principal

1. Captacion web

El usuario entra desde la web actual o futura. La web dirige al cliente hacia la plataforma sanitaria seleccionada para prealta, solicitud, compra o onboarding.

2. Alta en plataforma cliente

Healthie/ContinuousCare/equivalente crea el perfil del cliente/paciente y concentra la experiencia cliente: portal, app si aplica, formularios, consentimientos, cuestionarios, documentacion y comunicacion.

3. Sincronizacion con Odoo

La plataforma cliente sincroniza con Odoo por API/webhook/middleware los datos operativos necesarios: contacto, estado, responsable, hitos, tareas y referencias. Odoo no necesita replicar todo el dato sensible.

4. Consentimientos y cuestionarios

El cliente completa consentimiento y cuestionarios dentro de la plataforma sanitaria. La plataforma guarda version, fecha, trazabilidad y estado. Odoo recibe estado/resumen operativo cuando sea necesario.

5. Seguimiento y comunicacion

La comunicacion segura, seguimiento, recordatorios, planes, mensajes y entrega de documentos viven en la plataforma cliente. Odoo mantiene tareas internas y estado global.

6. Resultados geneticos

Los resultados geneticos entran solo si el laboratorio/TellmeGen expone API real, documentada, accesible y autorizada contractualmente. La API debe permitir consultar o recibir resultados, estados y metadatos necesarios para el flujo.

7. Sin API de laboratorio

Si no hay API, la Fase 1 no incluye integracion de resultados geneticos. El MVP puede cubrir captacion, onboarding, consentimiento, cuestionarios, comunicacion, seguimiento y backoffice, dejando la integracion genetica como dependencia bloqueante o cambiando a proveedor con API.

8. Revision y entrega

El equipo EPI10 revisa informacion disponible dentro de la plataforma cliente y Odoo. La entrega de documentacion al cliente se realiza dentro de la plataforma sanitaria, con trazabilidad.

## Responsabilidades

| Sistema | Responsabilidad |
| --- | --- |
| Web EPI10 | Captacion y entrada al flujo |
| Healthie/ContinuousCare/equivalente | Portal, formularios, consentimientos, cuestionarios, comunicacion, seguimiento, documentos, experiencia cliente |
| Odoo | CRM/backoffice, pipeline, tareas internas, estados, responsables, facturacion/pedidos si aplica |
| Middleware | Sincronizacion entre plataforma cliente, Odoo y APIs disponibles |
| TellmeGen/laboratorio | Resultados geneticos via API autorizada, si existe |
| Equipo EPI10 | Revision interna, decisiones operativas, atencion y seguimiento |

## Estados Operativos En Odoo

- Lead recibido
- Cliente creado en plataforma cliente
- Onboarding iniciado
- Consentimiento completado
- Cuestionarios completados
- Pendiente de resultado API laboratorio
- Resultado recibido via API
- En revision EPI10
- Informe/documentacion entregada en plataforma cliente
- Seguimiento activo
- Cerrado

## Estados De Integracion Genetica

- API laboratorio pendiente de validacion
- API laboratorio disponible
- API laboratorio no disponible: integracion fuera de Fase 1
- Proveedor alternativo requerido

## Exclusiones Del Flujo v2

- No se descarga, copia, sube o asocia manualmente informacion genetica como parte de la arquitectura.
- No se usa Odoo como repositorio principal de datos geneticos.
- No se construye portal propio salvo que fallen las plataformas sanitarias centrales.
- No se incluye gemelo digital ni interpretacion genetica automatizada.
