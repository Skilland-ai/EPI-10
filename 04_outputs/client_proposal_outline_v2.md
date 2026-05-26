# Client Proposal Outline v2 - EPI10 Salud

Fecha: 2026-05-26

## 1. Diagnostico

EPI10 necesita una primera capa operativa real para gestionar la relacion con cliente: portal, onboarding, formularios, consentimientos, cuestionarios, comunicacion, documentacion, seguimiento y estados del servicio.

La recomendacion no es empezar por una plataforma propia ni por formularios aislados. La recomendacion es apoyarse en una plataforma sanitaria ya existente como Healthie, ContinuousCare o equivalente, conectada con Odoo como backoffice.

## 2. Arquitectura Propuesta

```text
Web actual / web en desarrollo
  -> Healthie / ContinuousCare / herramienta equivalente
  -> Odoo open source
  <- API laboratorio / TellmeGen, solo si existe y esta autorizada
```

## 3. Alcance Fase 1

- Seleccion y configuracion de la plataforma cliente.
- Portal cliente, formularios, consentimientos, cuestionarios, documentos, comunicacion y seguimiento.
- Configuracion/adaptacion de Odoo como backoffice interno.
- Sincronizacion entre plataforma cliente y Odoo.
- Automatizaciones iniciales basadas en APIs reales.
- Integracion de resultados geneticos solo si el laboratorio/TellmeGen ofrece API valida.
- Documentacion interna, formacion y soporte inicial.

## 4. Decision Sobre Healthie / ContinuousCare

Ambas herramientas se analizan como candidatas centrales, no como complementos. La decision debe apoyarse en:

- Cobertura funcional del flujo cliente.
- API y webhooks.
- Residencia UE/GDPR y contrato.
- Tratamiento de datos de salud/geneticos.
- Costes de licencia, API, soporte y marca blanca.
- Facilidad de sincronizacion con Odoo.

## 5. Decision Sobre TellmeGen / Laboratorio

La integracion de resultados geneticos solo entra en Fase 1 si existe API real, documentada, accesible y autorizada contractualmente.

Si no existe API, hay dos opciones comerciales:

- Fase 1 sin integracion genetica, dejando esa parte fuera de alcance.
- Buscar proveedor/laboratorio alternativo con API si la integracion genetica es imprescindible desde el inicio.

## 6. Qué Queda Fuera

- Gemelo digital.
- Plataforma propia completa.
- App propia si la herramienta cliente ya cubre web/app.
- Interpretacion genetica automatizada.
- Integracion de resultados sin API.
- Garantia legal/GDPR sin revision profesional.

## 7. Costes A Presentar

- Licencias plataforma cliente.
- Costes Odoo.
- Costes API/integracion.
- Hosting/middleware/monitorizacion.
- Trabajo de implantacion.
- Soporte y mantenimiento.
- Revision legal/DPO si aplica.

## 8. Roadmap

- Fase 1A: sistema operativo cliente + Odoo, sin integracion genetica si no hay API.
- Fase 1B: integracion genetica por API si existe y esta autorizada.
- Fase 2: optimizacion, dashboards, reporting y automatizaciones avanzadas.
- Fase 3: producto digital/gemelo digital solo tras validar operacion real.

## 9. Mensaje Comercial

La propuesta debe transmitir que EPI10 puede empezar a operar con una capa cliente profesional y conectada a su backoffice, manteniendo control del alcance y sin prometer integraciones geneticas que no esten soportadas por API real.
