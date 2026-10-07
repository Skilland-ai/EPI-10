# Crisis de Healthie (SKI2-204)

Espacio de los análisis de la crisis del 7 de octubre de 2026: EPI10 no paga la API de Healthie (475 $/mes el primer año, 950 $/mes el segundo, después 1.900 $/mes) y la cuenta tiene los correos restringidos. Contexto en [noticias de Healthie 7 oct](../healthie/2026-10-07_noticias_healthie_v1.md).

## Documentos

| Fecha | Documento | Issue | Estado |
|---|---|---|---|
| 2026-10-07 | [Arquitectura del «botón rojo»: portal propio y back office](2026-10-07_arquitectura_boton_rojo_v1.md) | SKI2-205 (opción B) | Propuesta, pendiente de decisión de Raúl |
| — | Plataformas alternativas con API barata | SKI2-206 (opción D) | Pendiente |

## Bitácora

- **2026-10-07** · Acción: redactar la arquitectura del portal propio (opción B). Resultado: documento v1 con alcance, componentes, modelo de datos, flujos, RGPD art. 9, comprar/construir, horas e issues. Evidencia: el documento. Decisión recomendada: módulo `portal` del monolito, HTML servidor + HTMX, correo comprado (UE), resto construido; 56–70 h de MVP más 8–12 h legales; no cabe en lo que quede de las 110 h (horas consumidas: Unknown). Siguiente paso: Raúl decide B, D o A como puente y pone la cifra de horas consumidas.

## Próximo paso

Decisión de Raúl en SKI2-204 tras leer SKI2-205 y SKI2-206.
