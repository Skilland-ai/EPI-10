# Architecture Recommendation v1 - EPI10 Salud

Fecha: 2026-05-26

## Recomendacion

Implantar Fase 1 con una arquitectura hibrida y acotada:

Web EPI10 -> Portal/formularios seguro -> n8n self-hosted -> Odoo backoffice -> entrega/seguimiento -> TellmeGen semimanual.

Odoo debe ser el centro operativo interno, no necesariamente el portal cliente. La capa cliente debe resolver onboarding, consentimientos, cuestionarios, documentos y comunicacion con el menor desarrollo posible. n8n debe coordinar automatizaciones simples. TellmeGen debe tratarse como fuente externa de resultados, con integracion semimanual en la primera version salvo disponibilidad real de API.

## Arquitectura Objetivo

```text
Web EPI10
  -> formulario/contacto/compra
  -> portal cliente o formularios seguros
  -> n8n self-hosted en UE
  -> Odoo backoffice
  -> tareas, estados, documentos, reporting

TellmeGen
  -> resultado externo
  -> asociacion manual o semimanual
  -> informe/enlace/documento seguro
```

## Componentes

| Componente | Responsabilidad | Recomendacion |
| --- | --- | --- |
| Web EPI10 | Captacion, informacion, entrada al flujo | Mantener como front publico; integrar solo lead/solicitud |
| Portal/formularios | Onboarding, consentimiento, cuestionarios, documentos | SaaS europeo validado o portal propio minimo si no hay SaaS suficiente |
| Odoo | Backoffice, CRM, pipeline, tareas, estados, documentos operativos | Nucleo interno recomendado |
| n8n | Automatizaciones y sincronizaciones | Self-hosted en UE, con retencion corta y logs controlados |
| TellmeGen | Resultados geneticos | Fuente externa; no prometer API profunda |
| Infraestructura | Hosting, backups, seguridad | UE/Espana preferente; proveedores europeos o HDS si se tratan datos de salud |

## Flujo De Datos

1. Web captura lead o solicitud y envia datos minimos al portal/Odoo.
2. Odoo crea contacto y oportunidad/servicio.
3. Portal envia onboarding, consentimiento y cuestionarios.
4. n8n sincroniza estados y dispara tareas internas.
5. Equipo EPI10 revisa datos y gestiona el estado del test.
6. Resultado TellmeGen se asocia manualmente o mediante integracion si existe API.
7. Informe/documento se entrega por canal seguro.
8. Odoo registra entrega, seguimiento y cierre.

## Seguridad Y Privacidad

- Datos geneticos y de salud son categoria sensible; deben tratarse con minimizacion y acceso restringido.
- Evitar duplicar raw data genetico en Odoo si no es imprescindible.
- Guardar en Odoo el estado operativo y referencias seguras; no convertirlo en repositorio genetico por defecto.
- Usar roles diferenciados para administracion, operacion y revision.
- Activar logs/auditoria donde la herramienta lo permita.
- Usar infraestructura UE y cifrado en transito/reposo.
- Redactar la propuesta como arquitectura orientada a cumplimiento, no como garantia legal.

## Alternativas Evaluadas

### A. Healthie/Continuous Care como portal principal

Encaja si se prioriza rapidez y se acepta vendor lock-in. Se descarta como recomendacion base por incertidumbre de residencia, API contractual, coste y tratamiento de datos geneticos.

### B. Odoo como todo-en-uno

Encaja para backoffice, pero se descarta como portal clinico completo porque puede requerir demasiada adaptacion y generar una experiencia cliente pobre.

### C. Odoo + n8n + portal/formularios seguro

Recomendacion base. Permite iterar, controlar datos y automatizar sin sobredesarrollar.

### D. Portal propio minimo

Fallback fuerte si las herramientas de terceros no satisfacen residencia/API/seguridad. Debe limitarse a onboarding, consentimiento, cuestionarios, documentos y estado.

## Fallbacks

- Si no hay API TellmeGen: asociacion manual de informes/resultados y control de estado en Odoo.
- Si el portal SaaS no garantiza residencia UE: portal propio minimo o proveedor europeo alternativo.
- Si Odoo no esta instalado: desplegar Odoo Community/Enterprise segun necesidad y presupuesto como parte de Fase 1.
- Si n8n resulta excesivo: automatizaciones directas portal -> Odoo o tareas manuales iniciales.

## Recomendacion Para Propuesta Comercial

Presentar Fase 1 como implantacion del sistema operativo MVP:

- Backoffice en Odoo.
- Portal/formularios seguros para cliente.
- Automatizaciones semiautomaticas.
- Integracion progresiva con TellmeGen segun disponibilidad real.
- Infraestructura y politicas orientadas a datos sensibles en UE.
- Documentacion y formacion interna.

No presentar Fase 1 como desarrollo de plataforma sanitaria completa, producto digital final ni gemelo digital.
