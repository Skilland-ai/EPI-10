# Build vs Buy Matrix v1 - EPI10 Salud

Fecha: 2026-05-26

## Decision Recomendada

La opcion recomendada para Fase 1 es una arquitectura hibrida: Odoo como backoffice, portal/formularios seguro externo o minimo propio, n8n self-hosted como middleware y TellmeGen con integracion semimanual. Esta opcion equilibra velocidad, control, coste y reduccion de riesgo.

No se recomienda prometer una integracion profunda con TellmeGen ni seleccionar una suite sanitaria completa sin garantias de residencia UE, API, exportabilidad y tratamiento de datos geneticos.

## Matriz

Escala: 1 = debil, 5 = fuerte.

| Opcion | Velocidad | Control | GDPR/UE | Integracion | Coste inicial | Lock-in | Puntuacion | Veredicto |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| A. Healthie/Continuous Care como portal principal + Odoo backoffice | 4 | 2 | 2 | 3 | 3 | 2 | 16/30 | Viable con reservas |
| B. Odoo como nucleo + portal externo minimo | 3 | 4 | 4 | 4 | 3 | 4 | 22/30 | Recomendable |
| C. Odoo + n8n + formularios/portal seguro de terceros | 4 | 4 | 4 | 4 | 4 | 4 | 24/30 | Recomendacion base |
| D. Desarrollo propio minimo | 2 | 5 | 5 | 5 | 2 | 5 | 24/30 | Fallback si SaaS no encaja |

## Lectura De La Matriz

### Opcion A - Suite sanitaria como portal principal

Ventaja: acelera mucho si la herramienta encaja. Healthie tiene API potente y Continuous Care cubre portal paciente amplio. Tambien reduce desarrollo inicial.

Riesgo: la decision queda muy condicionada por contrato, residencia de datos, API, exportabilidad y coste. Healthie parece mas orientado a mercado US/HIPAA. Continuous Care encaja mas como plataforma internacional, pero no muestra API publica clara.

Uso recomendado: solo si durante implantacion se puede contratar una instancia con garantias suficientes. No debe ser la hipotesis comercial principal.

### Opcion B - Odoo como nucleo + portal externo minimo

Ventaja: concentra la operacion en Odoo y deja la experiencia cliente en una capa mas simple. Reduce lock-in y mantiene control sobre datos, estados y procesos.

Riesgo: requiere criterio de implementacion y no resuelve por si sola la experiencia cliente sanitaria. Hay que evitar convertir Odoo en un portal paciente improvisado.

Uso recomendado: base solida si el portal externo es sencillo y seguro.

### Opcion C - Odoo + n8n + formularios/portal seguro de terceros

Ventaja: mayor equilibrio para MVP. Permite empezar con formularios, consentimientos, documentos, automatizaciones y backoffice sin sobredesarrollar. n8n puede conectar web/formularios con Odoo y disparar tareas internas.

Riesgo: mas piezas implican mas responsabilidad tecnica. Hay que documentar flujos, retencion, errores y trazabilidad.

Uso recomendado: opcion base de Fase 1.

### Opcion D - Desarrollo propio minimo

Ventaja: control maximo sobre datos, UX, integraciones y residencia. Evita depender de una herramienta que no encaje en GDPR/API.

Riesgo: mas esfuerzo y mantenimiento. Puede crecer demasiado si no se limita a portal, formularios, consentimiento, documentos y estados.

Uso recomendado: fallback si las herramientas SaaS no superan los criterios de seguridad o integracion.

## Decision Operativa

Para la propuesta comercial, presentar una Fase 1 en dos niveles:

- Base recomendada: Odoo + n8n + portal/formularios seguro con integracion semiautomatica.
- Alternativa acelerada: suite sanitaria tipo Continuous Care/Healthie si se valida contratualmente residencia, API y exportabilidad.
- Fallback tecnico: portal propio minimo alojado en UE si no hay SaaS adecuado.

## Reglas De Decision Para Fase 1

- Si una herramienta no garantiza tratamiento adecuado de datos de salud/geneticos, se descarta para datos sensibles.
- Si una herramienta no ofrece API/exportacion suficiente, se puede usar solo como modulo aislado o no se usa.
- Si TellmeGen no ofrece API usable, el flujo oficial sera semimanual.
- Si Odoo ya existe, se integra sobre lo disponible; si no existe, se implanta como backoffice acotado.
- Si hay duda legal, se escribe como condicion de cumplimiento, no como promesa.
