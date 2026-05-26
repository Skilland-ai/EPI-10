# Budget Estimation Notes v1 - EPI10 Salud

Fecha: 2026-05-26

## Principio De Presupuesto

Separar siempre tres bolsas:

- Trabajo propio: analisis, configuracion, integracion, automatizaciones, documentacion, formacion y soporte inicial.
- Costes externos: licencias SaaS, hosting, dominios, email/SMS, almacenamiento, backups, proveedores de firma/consentimiento si aplica.
- Riesgos/variables: API TellmeGen, cambios de Odoo, requisitos legales, migraciones, volumen de clientes y soporte operativo.

## Escenarios De Fase 1

| Escenario | Duracion orientativa | Enfoque | Cuándo usarlo |
| --- | ---: | --- | --- |
| Lean | 3-4 semanas | Odoo basico + formularios/portal simple + tareas manuales | Si se quiere operar rapido con poca automatizacion |
| Recomendado | 5-7 semanas | Odoo + portal/formularios + n8n + documentos + seguimiento | Escenario base para propuesta defendible |
| Expandido | 8-10 semanas | Mayor automatizacion, reporting, permisos finos, hardening | Si EPI10 quiere llegar a Fase 1 con mas robustez |

## Partidas De Trabajo Propio

| Partida | Lean | Recomendado | Expandido |
| --- | ---: | ---: | ---: |
| Descubrimiento interno y diseno final | S | M | M |
| Configuracion Odoo/backoffice | M | L | L |
| Portal/formularios/consentimientos | M | L | XL |
| Automatizaciones n8n | S | M | L |
| Flujo TellmeGen semimanual/API condicional | S | M | L |
| Documentacion operativa | S | M | M |
| Formacion equipo | S | S | M |
| QA y soporte inicial | S | M | L |

Leyenda: S = bajo, M = medio, L = alto, XL = muy alto.

## Costes Externos A Considerar

- Odoo: Community sin licencia, pero con coste de hosting, mantenimiento y soporte; Enterprise/Online/Odoo.sh añade licencias y condiciones de API/hosting.
- Portal SaaS: Healthie/Continuous Care u otra plataforma puede tener licencias por usuario, plan, cliente activo, SMS/video, soporte, marca blanca o API.
- n8n: self-hosting implica VPS, base de datos, backups, monitorizacion y mantenimiento; cloud implica DPA/subprocesadores y residencia.
- Infraestructura UE: VPS/managed cloud, backups, almacenamiento cifrado, logs y monitorizacion.
- Comunicaciones: email transaccional, SMS, firma electronica o verificacion si se usan.
- Seguridad/legal: revision DPO/legal externa si EPI10 requiere validacion formal.

## Condiciones De Presupuesto

- La integracion profunda con TellmeGen no debe incluirse como cerrada salvo API disponible y documentada.
- El coste de licencias debe estimarse con precios vigentes en el momento de contratar.
- Si se usa SaaS sanitario, el presupuesto debe incluir setup, integracion, formacion y dependencia de proveedor.
- Si se elige portal propio minimo, el coste inicial sube pero baja el lock-in.
- Si Odoo ya existe, el trabajo puede bajar; si no existe, hay que incluir despliegue/configuracion.

## Recomendacion Comercial

Presupuestar una Fase 1 recomendada en torno a implantacion, no consultoria abstracta:

- Configuracion de Odoo como backoffice operativo.
- Configuracion o construccion minima de portal/formularios.
- Consentimientos y cuestionarios iniciales.
- Automatizaciones iniciales con n8n.
- Flujo TellmeGen semimanual con opcion de API futura.
- Documentacion, formacion y soporte de arranque.

Dejar Fase 2 para automatizacion avanzada, reporting y experiencia cliente. Dejar Fase 3 para producto digital/gemelo digital.
