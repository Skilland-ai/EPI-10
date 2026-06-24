# Materiales de ejecucion presencial v1

Uso: imprimir, llevar como tablero o copiar a una pizarra colaborativa durante el workshop de 3 horas.

Reglas visibles:

- Proceso real primero; herramientas despues.
- TellmeGen externo/manual en Fase 1, sin API operativa confirmada.
- Copilot Harness ayuda a borrador interno con pseudonimizacion y revision humana; no diagnostica y no sustituye criterio profesional.
- Cada idea va a Fase 1 imprescindible, Fase 1 deseable, Fase 2 o fuera de alcance.
- Si no hay evidencia, marcar `Unknown`.

## 1. Agenda board

| Hora | Bloque | Facilitador captura | Participantes clave |
| --- | --- | --- | --- |
| 0:00-0:10 | Apertura, objetivo y scope | Reglas, limites, parking lot | Tomas, Carmen, Aitor |
| 0:10-0:45 | Journey real actual | Pasos, fricciones, canales, tareas | Aitor lidera; Carmen/Tomas completan |
| 0:45-1:20 | Journey objetivo Fase 1 | Estados, sistemas, owners | Todos |
| 1:20-1:30 | Pausa | Limpieza de tablero | Facilitador |
| 1:30-2:05 | Estados, roles y sistemas | State map, responsibility matrix, source of truth | Aitor + Carmen |
| 2:05-2:35 | Informe, Copilot y datos sensibles | Ready for report, human review, data checklist | Carmen + Aitor |
| 2:35-2:50 | Automatizaciones, excepciones y scope | Automation matrix, exceptions, parking lot | Tomas prioriza |
| 2:50-3:00 | Cierre | Decision log, Unknowns, next step | Todos |

## 2. End-to-end journey canvas

Pregunta guia:

> Desde que una persona muestra interes hasta que recibe su informe final y seguimiento, que decisiones, datos, documentos, estados, responsables y comunicaciones ocurren?

| Paso | Que ocurre hoy | Que debe ocurrir en MVP | Estado candidato | Owner | Sistema/canal | Dato/documento | Dolor actual | Automatizar/controlar |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Interes / lead |  |  |  |  | web / email / WhatsApp |  |  |  |
| Pago |  |  |  |  | web/pago |  |  |  |
| Alta operativa |  |  |  |  | Odoo |  |  |  |
| Portal / onboarding |  |  |  |  | Healthie/equivalente |  |  |  |
| Formularios |  |  |  |  | Healthie/equivalente |  |  |  |
| Consentimiento |  |  |  |  | Healthie/equivalente |  |  |  |
| Documentos / analiticas |  |  |  |  | Healthie/equivalente |  |  |  |
| TellmeGen / laboratorio |  |  |  |  | TellmeGen externo/manual |  |  |  |
| Preparacion informe |  |  |  |  | Odoo + Copilot Harness |  |  |  |
| Revision humana |  |  |  |  | Equipo EPI10 |  |  |  |
| Entrega informe |  |  |  |  | Healthie / fallback aprobado |  |  |  |
| Seguimiento |  |  |  |  | Odoo + portal |  |  |  |

## 3. State map template

| Estado | Entra cuando | Sale cuando | Owner | Sistema visible | Bloquea siguiente paso? | Automatizacion posible | Manual fallback |
| --- | --- | --- | --- | --- | --- | --- | --- |
| lead recibido |  |  |  | Odoo/MVP |  |  |  |
| pago pendiente |  |  |  | Odoo |  |  |  |
| pago confirmado |  |  |  | Odoo |  |  |  |
| portal invitado |  |  |  | Healthie/Odoo |  |  |  |
| onboarding completado |  |  |  | Healthie/Odoo |  |  |  |
| consentimiento completado |  |  |  | Healthie/Odoo |  |  |  |
| documentos recibidos |  |  |  | Healthie/Odoo |  |  |  |
| TellmeGen pendiente |  |  |  | Odoo manual |  | No API |  |
| resultado externo disponible |  |  |  | Odoo manual |  | No API |  |
| listo para informe |  |  |  | Odoo |  |  |  |
| informe en revision humana |  |  |  | Odoo/Copilot Harness |  |  |  |
| informe aprobado |  |  |  | Odoo |  |  |  |
| informe entregado |  |  |  | Odoo/Healthie |  |  |  |
| seguimiento activo |  |  |  | Odoo/Healthie |  |  |  |
| cerrado |  |  |  | Odoo |  |  |  |
| incidencia |  |  |  | Odoo |  |  |  |

## 4. Role / responsibility matrix

| Fase | Tomas | Carmen | Aitor | Equipo EPI10 | Skilland/Reboot | Sistema principal |
| --- | --- | --- | --- | --- | --- | --- |
| Prioridad y scope | Decide tradeoffs | Valida experiencia/calidad | Aporta realidad operativa |  | Facilita y traduce | Decision log |
| Alta / pago |  |  |  |  | Define contrato tecnico | web/pago + Odoo |
| Onboarding |  | Valida experiencia | Opera/revisa |  | Configura flujo | Healthie/equivalente |
| Documentos |  | Valida contenido/calidad | Revisa faltantes |  | Define estados | Healthie + Odoo |
| TellmeGen manual |  |  | Owner principal | Backup si aplica | Registra boundary | TellmeGen + Odoo |
| Informe final |  | Valida criterio y calidad | Prepara/revisa | Apoya | Disena Copilot Harness | Odoo + Harness |
| Entrega |  | Valida experiencia | Ejecuta/controla |  | Automatiza si API permite | Healthie/fallback + Odoo |
| Seguimiento | Valida valor | Valida experiencia | Opera |  | Define tareas | Odoo + portal |

## 5. System / source-of-truth matrix

| Dato/proceso | Web/pago | Odoo | Healthie/equivalente | WhatsApp/email | TellmeGen | Copilot Harness | PostgreSQL tecnico |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Lead/contacto inicial | origen | referencia operativa |  | fallback |  |  | id tecnico si aplica |
| Pago | origen/status | estado operativo |  |  |  |  | event metadata |
| Caso/servicio |  | source of truth operativo |  |  |  |  | state snapshot |
| Formularios |  | flag/fecha | source of truth cliente | evitar |  | facts minimizados si procede | no contenido |
| Consentimientos |  | flag/fecha | source of truth cliente | evitar |  | marcador si procede | no contenido |
| Documentos/analiticas |  | referencia/estado | source of truth documental | evitar |  | extractos minimizados si aprobado | no contenido |
| Resultado TellmeGen |  | milestone manual |  | evitar | source externo | notas minimizadas si aprobado | no raw data |
| Informe borrador |  | estado |  | no |  | trabajo interno temporal | no contenido |
| Informe final | marcador entrega | referencia/estado | entrega si permite | fallback aprobado |  | no aprobacion final | delivery marker |
| Logs/retries |  | tarea recovery |  |  |  | marker sin payload | sanitized only |

## 6. Automation / human-validation matrix

| Idea | Automatizacion candidata | Requiere human validation | Gate tecnico/proveedor | Clasificacion |
| --- | --- | --- | --- | --- |
| Crear caso tras pago | Si | Revision de excepciones | Web/pago schema/auth/idempotency | Fase 1 imprescindible |
| Invitar portal | Si, si API permite | No para envio estandar | Healthie API/plan | Fase 1 imprescindible/deseable |
| Marcar formulario completado | Si | Si contenido requiere revision | Healthie webhook/API | Fase 1 imprescindible |
| Avisar documento pendiente | Si | No | Healthie/Odoo | Fase 1 deseable |
| Registrar hito TellmeGen | No API; tarea/manual | Si | Sin API TellmeGen | Fase 1 manual |
| Preparar borrador informe | Parcial con Copilot Harness | Si, siempre | Data ADR, template, runtime Unknown | Fase 1 gated |
| Aprobar informe | No | Si, siempre | Equipo EPI10 | Fase 1 imprescindible |
| Entregar informe | Si, si API permite | Confirmacion final | Healthie report upload/API | Fase 1 deseable/imprescindible |
| Seguimiento | Parcial | Segun caso | Odoo/portal | Fase 1 deseable |

## 7. Fase 1 / deseable / Fase 2 / fuera de alcance parking lot

| Fase 1 imprescindible | Fase 1 deseable | Fase 2 | Fuera de alcance |
| --- | --- | --- | --- |
| Estados oficiales | Automatizacion de recordatorios avanzados | TellmeGen API si existe evidencia | Diagnostico autonomo |
| Owner por estado | Report upload automatico si API permite | Dashboard genetica si hay integracion futura | Integracion TellmeGen sin API |
| Odoo operativo | Mas eventos Healthie/Odoo | Reporting avanzado | Gemelo digital |
| Portal cliente validado o fallback | Mejoras Copilot posteriores | Proveedor genetico alternativo con API | Plataforma sanitaria completa |
| TellmeGen manual visible |  | Automatizacion genetica estructurada | App movil propia si portal cubre |
| Ready for report + human review |  |  | Aprobacion final por IA |

## 8. Decision log template

| ID | Decision | Owner | Sistema afectado | Impacto | Boundary | Unknown pendiente | Next step |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DEC-001 |  |  |  | proceso / estado / dato / automation / human review / exclusion | Fase 1 / deseable / Fase 2 / fuera de alcance |  |  |

Checklist para aceptar una decision:

- Tiene owner.
- Tiene sistema afectado.
- Cambia algo operativo real.
- No promete proveedor no validado.
- No contradice TellmeGen externo/manual.
- No convierte Copilot en diagnostico ni aprobacion autonoma.

## 9. Exceptions / casos raros capture

| Excepcion | Frecuencia | Impacto | Estado donde aparece | Owner | Sistema | Como se detecta | Recuperacion | Clasificacion |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Pago duplicado |  |  |  |  | web/pago/Odoo |  |  |  |
| Cliente no completa consentimiento |  |  |  |  | Healthie/Odoo |  |  |  |
| Documento incompleto |  |  |  |  | Healthie/Odoo |  |  |  |
| Retraso TellmeGen |  |  |  |  | TellmeGen/Odoo |  |  |  |
| Resultado no disponible |  |  |  |  | TellmeGen/Odoo |  |  |  |
| Informe requiere segunda revision |  |  |  |  | Copilot Harness/Odoo |  |  |  |
| Entrega del informe falla |  |  |  |  | Healthie/fallback/Odoo |  |  |  |
| Posible incidencia datos sensibles |  | alta |  |  | todos |  | pausar/escalar | Fase 1 control |

## 10. Data sensitivity and permissions checklist

Marcar durante la sesion:

- [ ] Que datos recoge web/pago.
- [ ] Que datos no deben pasar por web/pago.
- [ ] Que datos vive en Odoo.
- [ ] Que Odoo solo guarda referencias, estados, tareas o flags cuando haya datos sensibles.
- [ ] Que vive en Healthie/equivalente.
- [ ] Que documentos no deben circular por WhatsApp/email.
- [ ] Que hitos TellmeGen se registran manualmente sin copiar raw genetic data.
- [ ] Que puede entrar en Copilot Harness tras pseudonimizacion/anonimizacion.
- [ ] Que nunca entra en Copilot Harness sin aprobacion.
- [ ] Que logs y PostgreSQL tecnico no guardan payloads sensibles.
- [ ] Quien valida permisos por rol.
- [ ] Que queda pendiente de DPO/legal o ADR de datos.

## 11. Final session close checklist

Antes de salir de la sala:

- [ ] Journey actual capturado.
- [ ] Journey objetivo Fase 1 capturado.
- [ ] Estados candidatos aceptados o marcados `Unknown`.
- [ ] Owner por estado definido.
- [ ] Odoo, Healthie, web/pago, WhatsApp/email, TellmeGen y Copilot Harness ubicados correctamente.
- [ ] TellmeGen confirmado como externo/manual en Fase 1.
- [ ] Regla inicial de `ready_for_report` definida o marcada `Unknown`.
- [ ] Revision humana del informe confirmada como obligatoria.
- [ ] Automatizaciones clasificadas.
- [ ] Excepciones principales capturadas.
- [ ] Datos sensibles y permisos con checklist inicial.
- [ ] Decision log revisado con Tomas, Carmen y Aitor.
- [ ] Fase 2 y fuera de alcance revisados para evitar expectativas ambiguas.
- [ ] Next step acordado.
