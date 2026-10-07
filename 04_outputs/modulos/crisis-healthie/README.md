# Crisis de Healthie (SKI2-204)

Espacio de los análisis de la crisis del 7 de octubre de 2026: EPI10 no paga la API de Healthie (475 $/mes el primer año, 950 $/mes el segundo, después 1.900 $/mes) y la cuenta tiene los correos restringidos. Contexto en [noticias de Healthie 7 oct](../healthie/2026-10-07_noticias_healthie_v1.md).

## Documentos

| Fecha | Documento | Issue | Estado |
|---|---|---|---|
| 2026-10-07 | [Arquitectura del «botón rojo»: portal propio y back office](2026-10-07_arquitectura_boton_rojo_v1.md) | SKI2-205 (opción B) | Propuesta, pendiente de decisión de Raúl |
| 2026-10-07 | [Research: plataformas alternativas a Healthie con API gratis o barata](2026-10-07_research_alternativas_healthie_v1.md) | SKI2-206 (opción D) | Investigación terminada, pendiente de decisión de Raúl |

## Bitácora

- **2026-10-07** · Acción: redactar la arquitectura del portal propio (opción B). Resultado: documento v1 con alcance, componentes, modelo de datos, flujos, RGPD art. 9, comprar/construir, horas e issues. Evidencia: el documento. Decisión recomendada: módulo `portal` del monolito, HTML servidor + HTMX, correo comprado (UE), resto construido; 56–70 h de MVP más 8–12 h legales; no cabe en lo que quede de las 110 h (horas consumidas: Unknown). Siguiente paso: Raúl decide B, D o A como puente y pone la cifra de horas consumidas.
- **2026-10-07** · Acción: investigar plataformas alternativas a Healthie (opción D). Resultado: matriz de 36 plataformas (clínicas, nutrición, EHR y código abierto, portales genéricos, software español) con fuentes y fecha de consulta; InsideTracker descartada (servicio de biomarcadores para consumidores de EE. UU., sin API). Evidencia: el documento. Conclusión: ninguna cumple a la vez español, automatización por API gratis, datos en la UE y venta adicional. Las tres mejores: Practice Better (API y webhooks gratis en beta, inglés, precio futuro anunciado), Carepatron (portal en español barato, API sin alta ni webhooks: solo puente manual) y OpenEMR autoalojado (gratis y en la UE, estética antigua, sin webhooks, 35–65 h). Decisión recomendada: portal propio (B) si se mantienen los cuatro requisitos; Carepatron como puente. Siguiente paso: decisión de Raúl en SKI2-204.

## Próximo paso

Decisión de Raúl en SKI2-204 tras leer SKI2-205 y SKI2-206.
