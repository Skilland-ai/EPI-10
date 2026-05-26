# Build vs Buy Matrix v2 - EPI10 Salud

Fecha: 2026-05-26

## Decision Principal

La Fase 1 debe partir de comprar/configurar una plataforma sanitaria de relacion con cliente, no de construir un portal propio ni de reducir Healthie/ContinuousCare a formularios. La decision build vs buy se centra en elegir la mejor capa cliente y conectarla con Odoo.

## Matriz

Escala: 1 = debil, 5 = fuerte.

| Opcion | Capa cliente | Odoo | Lab/TellmeGen | Velocidad | Control | Riesgo API | Encaje v2 | Veredicto |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | --- |
| A. Healthie/ContinuousCare como capa cliente + Odoo backoffice + lab API | Plataforma sanitaria central | Backoffice | Solo API real | 5 | 3 | 3 | 5 | Recomendacion base |
| B. Odoo como nucleo + portal propio/minimo | Odoo/propio | Nucleo total | Solo API real | 2 | 4 | 3 | 2 | No recomendado como primera opcion |
| C. Odoo + n8n + formularios seguros | Formularios | Backoffice | Solo API real | 3 | 4 | 3 | 2 | Insuficiente para experiencia cliente completa |
| D. Desarrollo propio completo | Propia | Backoffice | Solo API real | 1 | 5 | 3 | 1 | Fuera de alcance Fase 1 |
| E. Plataforma sanitaria europea equivalente + Odoo + lab API | Plataforma sanitaria central | Backoffice | Solo API real | 4 | 4 | 3 | 5 | Alternativa si A falla |

## Lectura

### Opcion A - Healthie/ContinuousCare como capa cliente

Es la opcion que mejor refleja la peticion de la clienta. Healthie o ContinuousCare deben cubrir portal, formularios, consentimientos, cuestionarios, seguimiento, comunicacion segura, documentos e interaccion operativa con el cliente. Odoo queda como backoffice y sistema interno.

Seleccionar entre Healthie y ContinuousCare depende de criterios contractuales y tecnicos: residencia UE, API, DPA, datos geneticos, coste y exportabilidad.

### Opcion B - Odoo como nucleo total

Odoo sigue siendo relevante, pero no deberia sustituir una plataforma sanitaria de cliente si Healthie/ContinuousCare cubren el 70-80% del flujo. Usar Odoo como portal principal aumentaria configuracion/desarrollo y podria empeorar experiencia cliente.

### Opcion C - Formularios seguros + Odoo

La v1 se acerco demasiado a esta opcion. Es util como plan de contingencia tactico, pero queda por debajo de la necesidad real: EPI10 necesita una capa operativa cliente, no solo formularios.

### Opcion D - Desarrollo propio completo

Contradice el principio de no construir desde cero y no corresponde a una Fase 1 acotada.

### Opcion E - Plataforma sanitaria europea equivalente

Si Healthie o ContinuousCare no cumplen requisitos criticos, la respuesta correcta no es bajar a formularios simples, sino buscar una plataforma sanitaria equivalente con portal, consentimientos, comunicacion, documentos, API y residencia UE.

## Reglas De Decision

- Si Healthie cumple API, GDPR/UE, datos geneticos, costes y operativa: Healthie puede ser capa cliente.
- Si ContinuousCare cumple API, GDPR/UE, datos geneticos, costes y operativa: ContinuousCare puede ser capa cliente.
- Si ninguna cumple: buscar equivalente sanitario europeo.
- Si no hay API de laboratorio/TellmeGen: la integracion de resultados no entra en Fase 1.
- Si la integracion genetica es imprescindible en Fase 1 y TellmeGen no tiene API: cambiar de proveedor/laboratorio o reestructurar el alcance.
