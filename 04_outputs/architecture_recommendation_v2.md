# Architecture Recommendation v2 - EPI10 Salud

Fecha: 2026-05-26

## Recomendacion

La arquitectura recomendada para Fase 1 es:

```text
Web EPI10
  -> Healthie / ContinuousCare / herramienta sanitaria equivalente
  -> Middleware/API sync
  -> Odoo open source backoffice

Laboratorio / TellmeGen API
  -> Healthie/ContinuousCare/equivalente y/o Odoo
  -> solo con API real, documentada, accesible y autorizada
```

Healthie/ContinuousCare/equivalente es la capa principal de relacion con cliente. Odoo es el backoffice. El laboratorio/TellmeGen no se integra si solo existe plataforma web B2B sin API de resultados.

## Componentes

| Componente | Rol |
| --- | --- |
| Web EPI10 | Captacion, landing, informacion y entrada al flujo |
| Healthie/ContinuousCare/equivalente | Nucleo de experiencia cliente: portal, formularios, consentimientos, cuestionarios, comunicacion, seguimiento, documentos |
| Odoo open source | Sistema interno: CRM, pipeline, tareas, estados, facturacion/pedidos, reporting |
| Middleware | Sincronizacion entre APIs reales; no sustituye APIs inexistentes |
| Laboratorio/TellmeGen API | Entrada automatizada de resultados geneticos solo si cumple condiciones |
| Infraestructura | Hosting/contratos/residencia de datos segun plataforma seleccionada |

## Decision De Plataforma Cliente

### Healthie

Seleccionable si cumple:

- API suficiente para sincronizar clientes, formularios, documentos, estados y eventos.
- Contrato/DPA aceptable para una empresa espanola con datos de salud/geneticos.
- Residencia y subprocesadores aceptables.
- Coste compatible con Fase 1.
- Posibilidad de operar en espanol o con UX adecuada para EPI10.

### ContinuousCare

Seleccionable si cumple:

- APIs reales para pacientes, citas/servicios, documentos, estados y sincronizacion con Odoo.
- Region UE contratada y DPA adecuado.
- Portal/app/white-label suficientes para experiencia cliente EPI10.
- Coste y soporte asumibles.

### Equivalente sanitario

Si Healthie/ContinuousCare fallan, buscar plataforma sanitaria equivalente. No bajar automaticamente a formularios genericos.

## Decision De Laboratorio / TellmeGen

Condiciones obligatorias para integrar resultados geneticos en Fase 1:

- API documentada.
- Acceso permitido para EPI10 o su integrador.
- Autorizacion contractual para uso, almacenamiento, transferencia y visualizacion de datos.
- Endpoints o eventos suficientes para resultados, estados, identificadores y metadatos.
- Seguridad, autenticacion, auditoria y manejo de errores.
- Claridad sobre que datos pueden vivir en la plataforma cliente y en Odoo.

Si estas condiciones no se cumplen, la integracion genetica queda fuera de Fase 1 o se propone laboratorio alternativo con API.

## Flujo De Alto Nivel

1. Cliente entra por web.
2. Cliente opera en Healthie/ContinuousCare/equivalente.
3. Plataforma cliente sincroniza contacto/estado/tareas con Odoo.
4. Odoo organiza trabajo interno y reporting.
5. Laboratorio envia resultados por API si existe.
6. Plataforma cliente entrega documentacion y seguimiento.

## Alternativas

| Alternativa | Decision |
| --- | --- |
| Healthie/ContinuousCare + Odoo + lab API | Recomendacion base |
| Plataforma sanitaria europea equivalente + Odoo + lab API | Alternativa si Healthie/ContinuousCare no encajan |
| Odoo + formularios seguros | Contingencia limitada, no recomendacion principal |
| Portal propio minimo | Solo si no hay plataforma sanitaria viable |
| Desarrollo completo | Fuera de Fase 1 |
| Integracion genetica sin API | Fuera de Fase 1 |

## Riesgos

- Healthie puede ser fuerte funcionalmente pero presentar friccion por orientacion US/HIPAA y residencia.
- ContinuousCare parece mas alineado con nubes regionales y white-label, pero su API publica requiere mas evidencia.
- tellmeGen B2B puede resolver gestion profesional, pero no demuestra API publica de resultados.
- Odoo API depende de modalidad/plan si se usa Odoo Online.
- Datos geneticos requieren criterio legal, DPA y minimizacion estricta.

## Recomendacion Comercial

Presentar una Fase 1 con decision pendiente entre Healthie, ContinuousCare o equivalente sanitario, pero con arquitectura clara:

- Capa cliente sanitaria como nucleo de la experiencia.
- Odoo como backoffice.
- Integracion genetica solo con API.
- Sin construccion desde cero salvo contingencia.
