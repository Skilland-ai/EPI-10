# Current Status - EPI10 Salud

Fecha: 2026-05-26

## Estado Actual

La iteracion V2 queda validada conceptualmente como base correcta del proyecto.

La arquitectura base aceptada es:

```text
Web actual / web en desarrollo
  -> Healthie / ContinuousCare / herramienta sanitaria equivalente
  -> Odoo open source como backoffice
  <- API laboratorio proveedor / TellmeGen, solo si existe y esta autorizada/documentada
```

## Decisiones Validadas

- Healthie, ContinuousCare o una herramienta sanitaria equivalente son la capa principal de relacion con cliente.
- Odoo queda como backoffice interno.
- El laboratorio proveedor / TellmeGen solo entra mediante API real, documentada, accesible y autorizada.
- No se acepta operativa semimanual de resultados geneticos como arquitectura.
- No se construye plataforma propia completa en esta fase.
- El flujo operativo detallado con el cliente no se cierra en preventa.
- El flujo operativo detallado se trabajara al inicio de Fase 1 de ejecucion, junto con el equipo de EPI10.

## Correo Enviado A Carmen

Se envio un correo a Carmen explicando que la arquitectura general ya esta bastante clara y solicitando solo los datos pendientes necesarios para aterrizar la propuesta.

El correo pide aclarar:

- Estado real de Odoo: si esta instalado, version/modalidad, modulos activos y nivel de configuracion.
- Laboratorio proveedor / TellmeGen: proveedor exacto, acceso como distribuidores, confirmacion sobre API, documentacion API y alcance del plan/acuerdo actual.
- Herramienta cliente: preferencia inicial entre Healthie, ContinuousCare u otra alternativa, o si debemos validar cual encaja mejor.

## Estado De Espera

Estamos esperando respuesta de Carmen.

Hasta recibir esa informacion, no conviene cerrar presupuesto definitivo.

## Nota Sobre Flujo Operativo

La pregunta sobre el flujo operativo detallado se elimino del correo porque ese trabajo se considera parte de la primera fase de ejecucion, no de la preventa.
