# Repaso de plataformas de mercado para el portal de cliente (v1)

Fecha: 2026-10-18 · Linear: SKI2-288 (dossier del 21 oct, línea 2.1 (a) «otra plataforma del mercado») · Estado: **entregado, pendiente de revisión independiente**
Antecedente: [research del 7 oct, SKI2-206](2026-10-07_research_alternativas_healthie_v1.md) · Contexto: [arquitectura del sistema v1](../integracion/2026-10-12_arquitectura_sistema_v1.md) · [requisitos legales](../../comunicaciones/2026-10-13_requisitos_legales_operar_openemr_vs_healthie.md) · [correo del 14 oct](../../comunicaciones/2026-10-14_correo_carmen_tomas_cambio_de_pieza.md) · contrato del portal en `epi10-orquestador` (`src/modules/portal`, `healthie`, `openemr`)

**Qué es este documento.** Repasa una a una las plataformas de mercado que podrían hacer de portal de cliente de EPI10. No busca confirmar el veredicto del 7 oct. Busca la plataforma viable que se nos escapó, aunque obligue a ceder en algo.

**Método.** Todas las fuentes se consultaron el **2026-10-18**, solo información pública. No se ha abierto ninguna cuenta ni prueba, no se ha contactado con ningún proveedor y no se ha pagado nada. Lo que no está en una fuente primaria va como **Unknown** o como «terciaria». **Todas las horas y todos los costes son estimaciones** (1 $ ≈ 0,92 €; 1 £ ≈ 1,15 €; 1 CAD ≈ 0,66 €). Cinco investigadores en paralelo por grupos de plataformas; la síntesis es de este documento.

## Resumen en cinco líneas

1. **Revisamos 127 plataformas:** las 41 del 7 oct (incluidas Healthie e InsideTracker), Odoo como portal y 85 nuevas.
   - **Ningún descarte del 7 oct se revoca.**
   - Dos se suavizan sin llegar a ser viables: InsideTracker y Halaxy ya tienen API pública.
   - Cinco empeoran: Practice Better, Softr, Assembly, Oystehr y Fasten.
   - **Se reabre una opción descartada:** Odoo como portal (la opción C de SKI2-204).
2. **Sí hay una que se nos escapó: Pabau** (Reino Unido, nueva). Sobre el papel cubre las 7 operaciones del contrato por API pública con webhooks, tiene región UE, DPA y venta adicional nativa. Es **casi viable**: falta confirmar el precio (solo con demo), el español del portal y que lo enviado por API se vea en el portal. Concesión: un producto pensado para clínicas estéticas.
3. **Practice Better sigue siendo la que mejor automatiza, pero empeora.** Los datos están ahora en AWS EE. UU., la interfaz es solo en inglés y la API seguirá siendo de pago tras la beta, con precio sin anunciar. Es el patrón de Healthie.
4. **Hallazgo nuevo:** muchos portales no-code **prohíben por escrito datos de salud o genéticos** (Glide, Bubble, Budibase Cloud, Circle, Kajabi). Los que tienen la UE (Knack, Noloco, Softr) solo valdrían con una excepción escrita o con un «portal fino» que no guarde salud. Las plataformas genéticas B2B2C solo entregan su propio test.
5. **En cifras:** cualquier opción de la lista corta cuesta entre 0 y 6.200 € a 3 años en licencias, frente a unos 43.300 € de Healthie con la API. **Salvo Simply.Coach, que deja trabajo manual en cada caso, ninguna ahorra más de unas 15–25 h de construcción** frente al desarrollo propio. A cambio, se depende de un tercero y de su precio. La línea 2.1 (a) tiene una candidata real que hay que confirmar con una demo antes del 21.

---

## 1. Qué buscamos y qué cambia respecto al 7 oct

**La plataforma solo sustituye el portal de cliente.** Stripe, Odoo, el generador de informes y la ficha de la persona ya están construidos en el orquestador. Por eso cada plataforma se valora por lo que costaría enchufarla al monolito, no como sistema completo.

**El contrato del portal**, tal como lo usa hoy el orquestador (`src/modules/portal/portal-cliente.ts` y módulo `openemr`, contrato v1.2), tiene 7 operaciones:

| # | Operación | Qué hace | Crítica |
|---|---|---|---|
| 1 | `crear_acceso` | Alta de la clienta tras pagar en Stripe e invitación al portal | Sí |
| 2 | `asignar_formularios` | Consentimiento con firma y encuesta de hábitos | Sí |
| 3 | `estado_formularios` | Saber cuándo los ha completado, incluido el paso «test en casa o en la sede» (D3) | Sí |
| 4 | `enviar_mensaje` | Mensajes de hito en el buzón del portal | Alta |
| 5 | `mensajes_nuevos` | Leer lo que escribe la clienta | Alta |
| 6 | `publicar_informe` | Subir el PDF y que la clienta lo vea y descargue | Sí |
| 7 | `actualizar_caso` | Resumen o etiqueta de estado en la ficha | Deseable |

**Cambiar de portal es añadir un módulo hermano de `healthie` y `openemr`** en `src/modules/` y registrarlo en `PORTALES_CLIENTE`. Los trabajos del outbox (alta, mensaje), el publicador de informes y la consulta de formularios cambian de implementación, no de contrato. Odoo, Stripe e informes no se tocan.

**Requisitos críticos del 7 oct:** R1 portal en español con marca EPI10; R2/R8 automatización por API gratis o barata; R6 venta adicional; R9 datos de salud y genéticos en la UE con DPA. **Punto extra (línea 2.2):** integrar la web de EPI10 con la misma marca.

---

## 2. Lista corta: cinco viables o casi viables

Orden: de más a menos encaje con los cuatro críticos. Ninguna los cumple todos hoy sin ceder en algo.

### 2.1 Pabau (Reino Unido · nueva) — la que se nos escapó

**Qué es.** Software clínico en la nube (estética, bienestar y medicina) con portal de paciente en todos los planes, app Pabau Go, web y soporte en español. Lo encontraron por separado dos de los cinco investigadores.

**Contrato 1–7.** API REST pública con documentación en Postman sin login («Pabau Legacy», ejemplos de marzo de 2026):
1 `clients/create` (si envía la invitación al portal: **Unknown**) · 2 `clients/{id}/medical-forms/create` · 3 `complete-forms` + webhooks de formularios y documentos · 4 `send/email`, `send/sms`, `send/WhatsApp` (si escribe en el buzón del portal: **Unknown**) · 5 `clients/{id}/communications` por consulta · 6 `clients/{id}/documents/upload` (si la clienta lo ve en el portal: **Unknown**) · 7 notas, etiquetas y campos propios.
Límites: 110 peticiones/min y 25.000/día. Claves de API y webhooks aparecen en la tabla de planes; coste propio de la API: no se anuncia.

| Punto | Dato (18 oct) |
|---|---|
| R1 español y marca | Web, soporte y ficha del portal en español. Idioma de la interfaz del portal y de los correos: **Unknown**. «Quitar la marca Pabau»: probablemente en el complemento Marketing Plus (inferido de la tabla). |
| R3/R4/R5 | Formularios de admisión y médicos en el portal, que pueden exigirse antes de reservar; mensajería segura; documentos compartidos. Firma del consentimiento: no la menciona la página del portal (Unknown). |
| R6 venta | Paquetes, membresías, bonos regalo, enlaces de pago y productos con inventario; Stripe y Klarna. |
| R9 datos | Trust Centre: DigitalOcean y AWS en «EU & US regions». No dice si el cliente elige la UE. DPA de UK GDPR con subencargados, a petición. SCC no mencionadas. Subencargados en EE. UU. (SendGrid, Sentry, Vercel…). ISO 27001 del centro de datos, no de Pabau; SOC 2 solo como «readiness». |
| 2.2 web | Reservas en la web propia y enlaces de pago. Web o tienda en la plataforma: no. |

**Coste total a 3 años (estimación).** Precio no publicado: los planes van por número de usuarios (Team = 2–3) y piden demo. Fuentes terciarias: «desde 59–69 $/mes» con 1 usuario.

| Concepto | Año 1 | Año 2 | Año 3 |
|---|---|---|---|
| Licencia Team, 2–3 usuarios (terciaria, **Unknown**) | 1.370–2.050 € | 1.370–2.050 € | 1.370–2.050 € |
| API y webhooks | 0 € anunciado (Unknown) | ídem | ídem |
| **Total 3 años** | | | **≈ 4.100–6.200 €** |

**Horas de integración (estimación): 35–55 h.**
- Módulo `pabau`:
  - cliente REST y alta, 6–9 h;
  - formularios y paso D3, 8–12 h;
  - receptor de webhooks, 4–6 h;
  - mensajes, 4–6 h;
  - informe y caso, 4–6 h.
- Configuración de Pabau (plantillas en español, formularios, portal): 6–10 h.
- Ensayo E2E y demo: 3–6 h.

Cambian `src/modules/portal` (nuevo valor) y un módulo nuevo. Mantenimiento: 6–12 h/año.

**Riesgos.**
- **Precio:** opaco y por demo. La colección de la API se llama «Legacy»: puede haber migración.
- **Idioma:** el del portal y los correos no está confirmado.
- **Datos de salud:** la región UE no está garantizada por escrito, el DPA es de UK GDPR y hay subencargados en EE. UU.
- **Dependencia:** producto orientado a estética, con mucho que ocultar a Aitor.

**Qué tendría que aceptar EPI10.**
- Un software clínico de terceros con aspecto propio, no el de EPI10.
- Una licencia anual.
- Unos datos de salud alojados en la UE o el Reino Unido con DPA y subencargados en EE. UU.

**Prueba de 1–2 h que lo confirme (necesita el OK de Raúl: implica demo o cuenta).**
1. Demo con presupuesto para Team y la pregunta sobre la región UE.
2. En un sandbox, con la colección de Postman: crear una clienta, asignarle un formulario, subir un PDF y enviar un mensaje.
3. Comprobar en el portal, en español, que llega la invitación, que se ven el formulario, el PDF y el mensaje, y que salta el webhook al completar.

Si falla el punto 3, Pabau baja a «puente semiautomático».

Fuentes (2026-10-18): [precios](https://pabau.com/pricing/), [precios ES](https://pabau.com/es/precios/), [portal](https://pabau.com/es/funcionalidades/client-portal), [API en Postman](https://documenter.getpostman.com/view/4391324/2sAYJAdxBb), [webhooks](https://support.pabau.com/en/pabau2/how-to-set-up-webhooks), [Trust Centre](https://trust.pabau.com/), [RGPD](https://pabau.com/gdpr/), [Software Advice, terciaria](https://www.softwareadvice.com/telemedicine/pabau-profile/), [ToolRadar, terciaria](https://toolradar.com/tools/pabau/pricing).

### 2.2 Practice Better (Canadá · descartada el 7 oct, sigue casi) — automatiza, en inglés y con datos en EE. UU.

**Contrato 1–7.** Por API: 1 (o Zapier «Add Client»), 2, 4 y 6. Por webhook: 3, solo según una guía terciaria de 2024. Unknown: 5 y 7. API REST de lectura y escritura en beta pública gratuita, en planes de pago y con revisión del soporte. Las docs solo se ven tras activarla. Zapier oficial: 6 disparadores y 1 acción.

| Punto | Dato (18 oct) |
|---|---|
| R1 | **Interfaz solo en inglés**, sin selector (artículo oficial). Los campos fijos de los formularios salen en inglés. El contenido propio sí puede ir en español. Marca y URL personalizada en Plus. |
| R6 | Paquetes y programas con Stripe, desde Plus. |
| R9 | **Nuevo: servidores consolidados en AWS EE. UU.** (artículo «Data Residency»; 403, leído en el extracto del buscador). DPA desde la cuenta. SCC/DPF: Unknown. |
| API | «Pricing … will be introduced … once the beta period has concluded». Sin precio ni fecha. |

**Coste total a 3 años (estimación).** Plus anual 89 $/mes ≈ 985 €/año (1 profesional + 3 administradores). Año 1 ≈ 985 € · año 2 ≈ 985 € + API (Unknown) · año 3 ≈ 985 € + API (Unknown). **Total ≥ 2.955 € + API.** Con un precio de API al estilo de Healthie (475–1.900 $/mes), se va a 8.000–30.000 € a 3 años.

**Horas (estimación): 30–45 h.** Módulo `practicebetter`, 22–32 h; plantillas en español, 6–10 h; E2E, 2–3 h. Riesgo técnico: sin ver las docs no se puede estimar en serio. Mantenimiento: 6–12 h/año.

**Riesgos.**
- **Precio:** alto, porque la API pasará a ser de pago.
- **Idioma:** inglés en la interfaz.
- **Datos:** genéticos en EE. UU.
- **Dependencia:** roadmap de un tercero.

**Qué tendría que aceptar EPI10.** Un portal con botones en inglés. Datos genéticos en EE. UU. con DPA y SCC, más una evaluación de la transferencia. Y un precio futuro desconocido.

**Prueba de 1–2 h.** Pedir por escrito el precio de la API tras la beta y la fecha en que acaba (Raúl o Carmen). Solo si es asumible: activar el complemento en una cuenta de prueba y verificar el alta, el formulario, el PDF y los webhooks.

Fuentes (2026-10-18): [precios](https://practicebetter.io/pricing), [API beta](https://help.practicebetter.io/hc/en-us/articles/16637584053275-Getting-Started-with-the-Practice-Better-API-Beta) (403, extracto), [residencia de datos](https://help.practicebetter.io/hc/en-us/articles/47681541627931-Practice-Better-Data-Residency) (403, extracto), [Zapier](https://zapier.com/apps/practice-better/integrations).

### 2.3 Odoo como portal (Bélgica · reabierta: era la opción C del 7 oct)

**Por qué se reabre.**
- El 7 oct Raúl descartó Odoo como portal: «vale como back office, pero el cliente necesita una app web propia».
- Hoy hay un dato nuevo: el proveedor de la web de EPI10 se ha caído (correo del 14 oct, punto 1.2).
- Odoo es la única opción del inventario que junta en un mismo dominio y con la misma marca la web pública, la tienda (venta adicional) y el portal. Es exactamente el punto 2.2.
- Además, el orquestador ya tiene un adaptador de Odoo probado contra un Odoo 17 real.

**Contrato 1–7.** Todo por la API de Odoo (XML-RPC/JSON-RPC), que el orquestador ya usa:
1. Crear el contacto y darle acceso al portal, que envía la invitación.
2. Encuesta con *Survey* (Community) y firma con *Sign* (solo en las ediciones de pago).
3. Por consulta, o con reglas automáticas (los webhooks de Odoo 17 no se han vuelto a comprobar hoy).
4. `message_post` en el caso, que la clienta ve en el portal.
5. Consulta de `mail.message`.
6. Adjunto en el caso, descargable en el portal.
7. Etapa o etiqueta.

| Punto | Dato (18 oct) |
|---|---|
| R1 | Portal con traducción oficial es_ES y tema web con marca EPI10. Aspecto «Odoo», mejorable con el constructor web. El chat es un hilo de mensajes. |
| R6 | **Nativa:** eCommerce, presupuestos firmables y pago en el portal. |
| R9 | Odoo Online en Bélgica (terciaria); DPA en el acuerdo de suscripción; **datos de salud no mencionados**. Si es autoalojado en el servidor de EPI10, no hay encargado nuevo. |
| 2.2 | **Sí, la mejor del inventario:** web, tienda y portal en el mismo Odoo y dominio. |

**Coste total a 3 años (estimación).** Los usuarios del portal no pagan.
- Si EPI10 ya tiene la API externa (plan Custom, Community o Enterprise autoalojado): **0 € extra**.
- Si está en Online Standard, el paso a Custom con 3 usuarios internos cuesta ≈ 1.004 € el año 1 y ≈ 1.220 €/año después.
- **Total: 0–3.450 €.**

**Horas (estimación): 40–70 h.**
- Portal y plantillas en español: 10–15 h.
- Encuesta y consentimiento: 8–15 h.
- Hilo y avisos: 6–10 h.
- Informe: 4–6 h.
- Reglas o webhooks: 6–12 h.
- Integración: 6–12 h.

Cambia sobre todo el módulo `odoo`, que ya existe, y se añade el valor `odoo` en `PORTALES_CLIENTE`. Mantenimiento: 6–12 h/año.

**Riesgos.**
- **Experiencia:** es lo que Raúl rechazó.
- **Datos:** salud y genética en el mismo ERP que operaciones (permisos y registro de accesos), y DPA sin mención del art. 9.
- **Dependencia:** depende del Odoo de EPI10, cuya versión, edición y mantenedor siguen siendo Unknown (SKI2-104).

**Qué tendría que aceptar EPI10.** Un portal con aspecto Odoo en vez de una app propia. Y concentrar web, tienda, operaciones y datos de salud en Odoo.

**Prueba de 1–2 h** (sin cuentas nuevas: el Odoo 17 de pruebas de SKI2-182, en hermes-node). Crear una clienta con acceso al portal, asignarle una encuesta, publicar un mensaje y un PDF en el caso, y verlo desde el portal en español. **Antes, decisión de Raúl:** ¿se reabre la C con el argumento de la web?

Fuentes (2026-10-18): [precios](https://www.odoo.com/pricing-plan), [Sign](https://www.odoo.com/app/sign), [RGPD](https://www.odoo.com/gdpr), [seguridad](https://www.odoo.com/security), [addon HMS portal](https://apps.odoo.com/apps/modules/18.0/acs_hms_portal).

### 2.4 No-code en la UE con «portal fino»: Knack (Frankfurt) o Noloco (Irlanda)

**La idea.** Un constructor no-code alojado en la UE pone la interfaz. El orquestador, en el servidor de EPI10, guarda lo sensible: las respuestas de salud y el PDF. El portal guarda nombre, correo, estado y mensajes de hito, y sirve el PDF con un enlace firmado del orquestador. Reduce el riesgo del art. 9 en el proveedor, pero no lo elimina, porque los mensajes y el formulario pueden contener datos de salud.

| | **Knack** | **Noloco** |
|---|---|---|
| R1 | App en español (16 idiomas); login y correos: Unknown | **Sin localización nativa**: textos a mano y login con código |
| Contrato | 1, 2, 4, 6 y 7 por API REST; 3 y 5 con Flows (webhook saliente) | 1, 2, 4, 6 y 7 por GraphQL; 3 y 5 con workflows y webhook |
| R3/R4/R5 | Firma dibujada, formularios, comentarios (sin tiempo real), archivos | Firma, formularios, comentarios, archivos |
| R6 | Stripe desde Pro | Stripe sincronizado; pago nativo: Unknown |
| R9 | **Frankfurt en todos los planes.** Pero los términos (§3(a), 24 ago 2026) **excluyen el art. 9** salvo el plan HIPAA | AWS Irlanda, ISO 27001:2022. **DPA no publicado.** Salud: no mencionada |
| Precio | Pro 110 $/mes anual ≈ 1.215 €/año | Build 65 $/mes anual ≈ 720 €/año (1.000 clientas) |
| **Total 3 años** | **≈ 3.650 €** | **≈ 2.150 €** |
| Horas (estimación) | 40–70 h + 8–12 h de portal fino | 30–45 h + 8–12 h de portal fino + 5–8 h de español |
| 2.2 | No | No |

(Softr, en Alemania, es técnicamente la más completa: enlace mágico por API, Stripe nativo y web pública 2.2. Pero su propia documentación dice «PHI cannot be transmitted to or stored inside Softr». Por eso queda detrás: 1.200–1.900 €/año, 30–45 h.)

**Riesgos.**
- **Legal:** el bloqueante es la aceptación escrita del art. 9.
- **Idioma:** sobre todo en Noloco.
- **Chat:** pobre (comentarios).
- **Horas:** en total se acercan a las del portal propio.

**Qué tendría que aceptar EPI10.**
- Un portal hecho con un constructor, con limitaciones de diseño.
- Una excepción contractual del proveedor para el art. 9, o el portal fino.
- Más piezas que mantener.

**Prueba de 1–2 h.**
1. Antes, pregunta escrita a Knack y a Noloco: ¿aceptan datos del art. 9 bajo su DPA?
2. Si dicen que sí, en una cuenta de prueba: crear una clienta por API, ver si llega la invitación, ver el español del login y de los correos, y ver si hay un disparador de «comentario nuevo».

Fuentes (2026-10-18): [Knack precios](https://www.knack.com/pricing/), [Knack términos](https://www.knack.com/terms-of-service/), [Knack límites de API](https://docs.knack.com/docs/api-limits), [Noloco precios](https://noloco.io/pricing), [Noloco seguridad](https://noloco.io/security), [Noloco MSA](https://noloco.io/msa), [Softr HIPAA](https://docs.softr.io/security/hipaa-compliance).

### 2.5 Simply.Coach (India/EE. UU. · nueva) — el mejor español, semiautomático

**Por qué entra.** Es la única del inventario con R1 resuelto de verdad. La FAQ oficial dice que está disponible de forma nativa en inglés, español y francés «across the web app, mobile app, and even email notifications». El plan Leap da marca blanca y dominio propio por 69 $/mes.

**Contrato 1–7.** Sin API pública, con Zapier oficial (12 disparadores y 5 acciones):
- Por Zapier: 1 «Create Contact» (si invita: Unknown), 2 «Create Engagement» (en parte), 3 «New Response Submitted for Form» y 7 «Create Note».
- **A mano: 4, 5 y 6** (mensajes de hito, lectura de mensajes y PDF). Son 2–3 tareas por caso, unos 5–10 min para Aitor.

| Punto | Dato (18 oct) |
|---|---|
| R3/R4/R5 | Formularios, contratos con firma, chat y archivos |
| R6 | Paquetes, suscripciones, página escaparate, Stripe y PayPal |
| R9 | AWS, región **no publicada**; dice SOC 2, HIPAA y GDPR; **DPA no publicado** |
| 2.2 | Dominio propio y página escaparate |

**Coste total a 3 años (estimación).** Leap ≈ 760 €/año más Zapier de pago (≈ 220–770 €/año): ≈ 980–1.530 €/año. **Total ≈ 2.950–4.600 €.** Los planes anuales anuncian «hasta −52 %» (no aplicado).

**Horas (estimación): 15–25 h.**
- Flujos de Zapier: 6–10 h.
- Módulo puente en el monolito (como la alternativa manual de Healthie, SKI2-172): 6–10 h.
- Guía para Aitor: 3–5 h.

**Más el trabajo manual: 5–10 min por caso.**

**Riesgos.**
- **Dependencia:** producto de coaching, no clínico. Zapier es una pieza más y cobra por tarea.
- **Automatización:** incompleta.
- **Datos de salud:** región y DPA desconocidos.

**Qué tendría que aceptar EPI10.** Automatizar solo la entrada y los formularios, con mensajes e informe a mano, y negociar el DPA.

**Prueba de 1–2 h** (con el OK de Raúl: prueba gratuita de 14 días). Crear un contacto por Zapier, comprobar la invitación y el español de los correos, enviar un formulario y recibir el disparador. Antes, pregunta escrita: región de los datos y DPA.

Fuentes (2026-10-18): [precios y FAQ](https://simply.coach/pricing-for-solopreneurs/), [integraciones](https://simply.coach/business-management/integrations/), [seguridad](https://simply.coach/security/), [Zapier](https://zapier.com/apps/simplycoach/integrations).

### 2.6 Se quedan fuera de la lista corta por poco

- **Tellescope** (EE. UU., nueva): API pública muy completa que cubre las 7 operaciones, portal de marca blanca en dominio propio y formularios traducibles. Pero no publica precio (implementación más tarifa por paciente) y su región y DPA son Unknown (lo probable es EE. UU.). Merece una pregunta de precio y RGPD.
- **CoachAccountable** (EE. UU., nueva): API madura incluida en el plan, con alta e invitación, acuerdo con firma y archivo compartido, por 120–250 $/mes. Interfaz en inglés, datos en Chicago y declara «NOT HIPAA compliant».
- **Carepatron** (NZ): el mejor puente manual en español, con DPA UE que cubre datos de salud. Su API sigue siendo la misma del 2 oct (4 rutas, sin webhooks). No automatiza nada.
- **IntakeQ/PracticeQ** (Canadá, nueva): automatiza bien formularios y consentimientos (API + webhook «Intake Submitted»), con datos en Canadá y DPA estándar. Mensajes y PDF a mano; 500 peticiones/día.
- **DriCloud** (España, nueva): español, Azure en Europa, firma remota y tienda online. Pero su API solo cubre pacientes y citas, sin webhooks: ≈ 2.810 € el año 1.

---

## 3. Comparación con el desarrollo propio, solo en cifras

Mismo formato para todas. Licencias en € (estimación). Horas de construcción e integración (estimación). No incluye el bloque legal común (EIPD, registro, contrato de encargo, consentimiento revisado): **8–12 h en todas las opciones**, porque ya hacía falta con Healthie. Las opciones con datos fuera de la UE suman 2–4 h de evaluación de la transferencia (estimación).

| Opción | Año 1 | Año 2 | Año 3 | **Total 3 años** | Horas de construcción | Mantenimiento h/año | Trabajo manual por caso |
|---|---|---|---|---|---|---|---|
| Healthie con API (línea base) | 7.440 € | 12.690 € | 23.170 € | **≈ 43.300 €** | 6–10 (validar lo hecho) | 6–12 | 0 |
| Pabau | 1.370–2.050 € (U) | 1.370–2.050 € (U) | 1.370–2.050 € (U) | **≈ 4.100–6.200 €** | 35–55 | 6–12 | 0 (U) |
| Practice Better | 985 € | 985 € + API (U) | 985 € + API (U) | **≥ 2.955 € + API** | 30–45 | 6–12 | 0 |
| Odoo como portal | 0–1.004 € | 0–1.220 € | 0–1.220 € | **0–3.450 €** | 40–70 | 6–12 | 0 |
| Knack con portal fino | 1.215 € | 1.215 € | 1.215 € | **≈ 3.650 €** | 48–82 | 6–12 | 0 |
| Noloco con portal fino | 720 € | 720 € | 720 € | **≈ 2.150 €** | 43–65 | 6–12 | 0 |
| Simply.Coach + Zapier | 980–1.530 € | 980–1.530 € | 980–1.530 € | **≈ 2.950–4.600 €** | 15–25 | 6–12 | 5–10 min |
| **Propio: portal en el monolito («botón rojo», SKI2-205)** | 60–240 € | 60–240 € | 60–240 € | **≈ 180–720 €** | 56–70 (60–76 con venta) | 12–24 | 0 |
| **Propio: OpenEMR autoalojado + módulo (vía 1, SKI2-207)** | 0–480 € | 0–480 € | 0–480 € | **≈ 0–1.440 €** | 52–76 | 24–48 | 0 |

Cómo se calcula cada fila:
- **Healthie:** Group con 2 clínicos (199 $/mes) más la API, a 475, 950 y 1.900 $/mes.
- **Botón rojo:** solo el coste recurrente nuevo de 5–20 €/mes (correo transaccional en la UE).
- **OpenEMR:** 0 € en el servidor de EPI10, o DINAO Performance a 39,90 €/mes + IVA.

**Nota interna** (no va al dossier tal cual): la vía 1 de OpenEMR ya está construida en buena parte (v1.3 en `main`). Las horas de la línea 2.1 (b) las pone su propio documento. Este cuadro solo deja las cifras lado a lado.

Lectura en tres frases:
1. **En licencias**, todas las plataformas de la lista corta cuestan entre 7 y 20 veces menos que Healthie con API. Ninguna es gratis, salvo Odoo si ya tiene la API.
2. **En horas de construcción**, solo Simply.Coach (con trabajo manual) y Pabau o Practice Better (de 10 a 25 h menos) ahorran algo frente al propio. **En mantenimiento**, una plataforma pide menos que operar OpenEMR (unas 20–35 h/año menos).
3. **En riesgo**, las plataformas cambian horas por dependencia: precio que puede cambiar (Practice Better ya lo ha anunciado), idioma y dónde viven los datos genéticos.

---

## 4. Inventario completo

127 plataformas, una fila por plataforma. **Todas las fuentes se consultaron el 2026-10-18.** Se marca «terciaria» cuando no hubo fuente primaria.

Leyenda de **Estado:**
- **D**: descartada.
- **R**: reabierta.
- **N**: nueva.
- **N★**: nueva y en la lista corta.
- **D★**: descartada el 7 oct que sigue en la lista corta.
- **V**: vigente, la dirección actual.

En la columna «¿Se mantiene?»:
- **Sí**: el motivo del 7 oct sigue siendo cierto.
- **En parte**: algo ha cambiado, pero no basta.
- **No**: el motivo ya no vale.

Columna **2.2**: ✅ integra la web con la misma marca · ◐ en parte · — no.
Costes: años 1 / 2 / 3, en € para 2–3 personas (estimación); U = Unknown.

### 4.1 Práctica clínica y bienestar (SaaS)

| Plataforma (sede) | Estado | Motivo del 7 oct · ¿se mantiene? | Concesión necesaria | Coste a1 / a2 / a3 | 2.2 | Fuente principal |
|---|---|---|---|---|---|---|
| Healthie (EE. UU.) | D (línea base) | API de pago, inglés, EE. UU. · **Sí**: la API sigue como complemento «Additional Fees Apply», sin precio público | Pagar la API | 7.440 / 12.690 / 23.170 | — | [precios](https://www.gethealthie.com/pricing) |
| Practice Better (CA) | D★ | Inglés, región U, API de pago tras la beta · **Sí, y peor**: datos en AWS EE. UU. | Inglés, EE. UU. y precio de API futuro | 985 / 985+API / 985+API | ◐ | [precios](https://practicebetter.io/pricing) |
| Carepatron (NZ) | D | API embrionaria, sin webhooks · **Sí**: spec del 2026-10-02 idéntica, 4 rutas | Puente manual (15–25 min/caso) | 515–1.030 / 1.030 / 1.030 | — | [OpenAPI](https://developer.carepatron.com/openapi.yaml) |
| Zanda (AU) | D | API beta de solo lectura · **Sí**: «Zanda API – coming soon» | Todo manual, sin chat | 405 / 540 / 540 | ◐ | [precios](https://www.zandahealth.com/pricing/) |
| Cliniko (AU) | D | Sin portal ni webhooks · **Sí** | Construir el portal igualmente | 495 / 495 / 495 | — | [API](https://docs.api.cliniko.com/) |
| Jane (CA) | D | API solo para partners · **Sí**: la API no crea pacientes ni tiene formularios ni mensajes | Ser partner o todo manual | ≈ 790 / 790 / 790 | ✅ Jane Websites | [developers](https://developers.jane.app/) |
| SimplePractice (EE. UU.) | D | Sin API · **Sí**; además, solo USD y CAD | Todo manual, EE. UU. | ≈ 870 / 870 / 870 | ◐ | [precios](https://www.simplepractice.com/pricing/) |
| Halaxy (AU) | D | Sin docs públicas ni UE · **En parte**: ya hay docs, API UE (`eu-api.halaxy.com`) y webhooks, pero sin formularios, mensajes ni documentos | Formularios, mensajes y PDF a mano | U | U | [webhooks](https://developers.halaxy.com/docs/webhooks.md) |
| Pabau (UK) | N★ | No estaba | Producto de estética, precio por demo, ES y región U | 1.370–2.050 ×3 (U) | ◐ | [API](https://documenter.getpostman.com/view/4391324/2sAYJAdxBb) |
| Simply.Coach (IN/EE. UU.) | N★ | No estaba | Mensajes y PDF a mano; DPA y región U | 980–1.530 ×3 | ✅ dominio y escaparate | [precios](https://simply.coach/pricing-for-solopreneurs/) |
| CoachAccountable (EE. UU.) | N | No estaba | Inglés, EE. UU. (Chicago); mensajes a mano | 1.325–2.760 ×3 | ◐ widget | [API](https://www.coachaccountable.com/APIDocs) |
| IntakeQ / PracticeQ (EE. UU./CA) | N | No estaba | Mensajes y PDF a mano; datos en Canadá | ≈ 940 ×3 | — | [API](https://support.intakeq.com/article/31-intakeq-api) |
| Spruce Health (EE. UU.) | N | No estaba | Solo sirve como chat; formularios fuera | ≈ 1.080 ×3 | — | [docs](https://developer.sprucehealth.com/docs/overview) |
| Trainerize (CA) | N | No estaba | Fitness; firma fuera; sin DPA visible | ≈ 1.600 ×3 | — | [precios](https://www.trainerize.com/pricing/) |
| Everfit (EE. UU./VN) | N | No estaba | Chat y PDF a mano; fitness | 600–1.300 ×3 | — | [precios](https://everfit.io/pricing/) |
| Delenta (UK) | N | No estaba | Mensajes y PDF a mano; ES y región U | ≈ 645 ×3 | ✅ | [precios](https://www.delenta.com/pricing) |
| Upcoach (EE. UU.) | N | No estaba | Todo manual (sin API) | ≈ 1.090 ×3 | ◐ | [precios](https://upcoach.com/pricing) |
| Heallist (UK) | N | No estaba | Marketplace, sin formularios ni PDF | 220–265 ×3 | ◐ | [precios](https://www.heallist.com/pricing) |
| WriteUpp (UK) | N | No estaba | Todo manual, inglés | ≈ 395 ×3 | ◐ | [precios](https://www.writeupp.com/pricing) |
| Paperbell (EE. UU.) | N | No estaba | Zapier solo de salida; solo serviría como tienda | U | ✅ | [Zapier](https://zapier.com/apps/paperbell/integrations) |

### 4.2 Nutrición y software clínico español y europeo

| Plataforma (sede) | Estado | Motivo del 7 oct · ¿se mantiene? | Concesión necesaria | Coste a1 / a2 / a3 | 2.2 | Fuente principal |
|---|---|---|---|---|---|---|
| Nutrium (PT) | D | Sin API ni Zapier · **Sí** | Puente manual completo | 299–948 / 599–948 / 599–948 | ◐ blog | [profesionales](https://nutrium.com/es/professionals) |
| Dietopro (ES) | D | Sin API · **Sí** | Puente manual | 960 ×3 + IVA | — | [precios](https://dietopro.com/precios/) |
| indya (ES) | D | Sin API · **Sí** (la web no resuelve hoy) | Puente manual | ≈ 588 ×3 (terciaria) | U | [Capterra, terciaria](https://www.capterra.es/software/1077184/INDYA) |
| Kalix (AU) | D | API solo Enterprise, 846 $/mes · **Sí**; novedad: formularios y soporte en ES; Zapier sin acciones | Pagar Enterprise o manual | 432 sin API / ≈ 9.340 con API | — | [precios](https://kalixhealth.com/pricing) |
| NutriAdmin (UK) | D | API no documentada · **Sí** | Puente manual, sin chat | ≈ 690 ×3 | ◐ | [precios](https://www.nutriadmin.com/pricing) |
| Cronometer Pro (CA) | D | No es un portal · **Sí** | No aplica | 440–700 ×3 | — | [Pro](https://cronometer.com/pro/) |
| Dietbox (BR) | D | Sin API ni RGPD · **Sí** (web con error 500) | No evaluable | U | U | [web](https://www.dietbox.me/es) |
| That Clean Life (CA) | D | Solo menús · **Sí** (es parte de Practice Better) | No aplica | n/a | — | [web](https://thatcleanlife.com/) |
| i-Diet (ES) | D | Sin portal · **Sí** | No aplica | 180 ×3 + IVA | — | [web](https://www.i-diet.es/) |
| Clinic Cloud (ES) | D | Sin API · **Sí** (la web redirige a iphome.com) | Puente manual | ≈ 588 ×3 (terciaria) | — | [precios, terciaria](https://pabau.com/es/blog/clinic-cloud-precio/) |
| Medesk (UK) | D | API sin docs · **Sí**: docs con 404 | Puente manual | 0–450 ×3 | — | [precios](https://www.medesk.net/en/pricing/) |
| Doctoralia / Docplanner (ES) | D | API solo de agenda · **Sí**; ahora 89–129 €/mes | Marca Doctoralia, nada automatizado | ≈ 1.308 ×3 + IVA | — | [precios](https://pro.doctoralia.es/precios/para-especialistas) |
| MN program (ES) | D | SOAP sin webhooks · **Sí**: 3 operaciones de CRM | Puente casi completo | ≥ 365 ×3 | — | [integraciones](https://www.mnprogram.com/desarrolladores-integraciones/) |
| Docline (ES) | D | «Apificado» sin docs · **Sí** | Proyecto a medida de precio U | U | ◐ | [tecnología](https://www.docline.com/tecnologia/) |
| DriCloud (ES) | N | No estaba | API solo de pacientes y citas; 2–6 a mano | 2.810 / 2.510 / 2.510 | ✅ tienda | [API](https://dricloud.com/api-software-medico/) |
| Koibox (ES) | N | No estaba | Belleza; solo vale para venta y web | 550 ×3 + IVA | ✅ | [docs API](https://docs.koibox.cloud/intro/first-steps) |
| Harbiz (ES) | N | No estaba | Sin API; puente manual | 1.068–1.788 ×3 + IVA | U | [tarifas](https://www.harbiz.io/tarifas) |
| Semble (UK) | N | No estaba | Sin portal de paciente; habría que construirlo | U | — | [docs](https://docs.semble.io/docs/intro/) |
| MediQuo (ES) | N | No estaba | Solo serviría como chat | U | ◐ widget | [developer](https://developer.mediquo.com/docs/introduction/) |
| Nubimed (ES) | N | No estaba | Sin API ni portal claro | ≈ 600 ×3 + IVA | — | [precios](https://www.nubimed.com/planes-precios/) |
| Clinni (ES) | N | No estaba | Sin API | ≈ 155 ×3 + IVA | — | [precios](https://clinni.com/precios) |
| Flowww (ES) | N | No estaba | Estética; API «abierta» sin docs públicas | 708–2.988 ×3 + IVA (terciaria) | U | [precios, terciaria](https://pabau.com/es/blog/precios-de-flowww/) |
| Doctolib (FR/DE) | N | No estaba | API para partners (Francia); sin programa público en España | U | — | [integración, terciaria](https://www.nextmotion.net/blog/integration-doctolib-logiciel-clinique-esthetique) |
| Nutrilog (FR) | N | No estaba | Solo francés; API sin docs | U | — | [web](https://nutrilog.com/) |
| Evry (NL) | N | No estaba | Solo neerlandés y mercado NL | U | — | [web](https://www.evry.nl/) |
| Luscii (NL) | N | No estaba | Telemonitorización hospitalaria | U | — | [web](https://www.luscii.com/) |

### 4.3 EHR programables, FHIR y código abierto

| Plataforma (sede) | Estado | Motivo del 7 oct · ¿se mantiene? | Concesión necesaria | Coste a1 / a2 / a3 | 2.2 | Fuente principal |
|---|---|---|---|---|---|---|
| OpenEMR (EE. UU., GPL) | V | Top 3 del 7 oct · hoy es la dirección elegida; 8.4.1 del 20 sep, 8.5.0 en desarrollo | Operar un EHR PHP con disciplina de parches | 0–480 ×3 | ◐ subdominio | [releases](https://github.com/openemr/openemr/releases) |
| Medplum (EE. UU.) | D | Sin portal de producto · **Sí** | Construir el portal: 90–160 h | 0 autoalojado / ≈ 22.080 cloud | ◐ | [precios](https://www.medplum.com/pricing) |
| Oystehr / Ottehr (EE. UU.) | D | Solo EE. UU., ≥ 1.000 $/mes · **Sí, y peor**: licencia con atribución y cláusulas anti-IA | Inasumible | ≈ 11.040 ×3 + uso | — | [precios](https://www.oystehr.com/pricing) |
| Canvas Medical (EE. UU.) | D | 4.000 $/mes · **Sí**; contrato de 2 años | Prohibitiva | ≈ 44.160 ×3 | — | [precios](https://www.canvasmedical.com/pricing) |
| Elation (EE. UU.) | D | Opaca, EE. UU. · **Sí** | Datos en EE. UU., precio U | U | — | [precios](https://www.elationhealth.com/pricing/) |
| Akute Health (EE. UU.) | D | API sin precio · **Sí**: Developer «custom» | EE. UU. sin RGPD | > 6.072 ×3 + API U | — | [precios](https://www.akutehealth.com/pricing) |
| Fasten Health (EE. UU.) | D | Para familias · **Sí, y peor**: archivado el 18 jul 2026 | Ninguna | n/a | — | [repo](https://github.com/fastenhealth/fasten-onprem) |
| GNU Health + Tryton (AR/UE) | D | Sin portal web · **Sí** | Construir el portal: > 120 h | 0 + horas | — | [web](https://www.gnuhealth.org/) |
| Bahmni (IN) | D | Portal en prueba de concepto · **Sí** | Terminar el portal | 0 + > 120 h | — | [wiki](https://bahmni.atlassian.net/wiki/spaces/BAH/pages/3247538177/Bahmni+Patient+Portal) |
| HospitalRun (EE. UU.) | D | Archivado · **Sí** (desde 2023) | Ninguna | n/a | — | [repo](https://github.com/HospitalRun/hospitalrun) |
| OpenMRS O3 | D | Sin portal · **Sí** (3.7.1, jul 2026) | Construir el portal | 0 + > 120 h | — | [descargas](https://openmrs.org/download/) |
| LibreHealth EHR (EE. UU.) | D | Sin portal · **Sí**; actividad dudosa | Mejor OpenEMR, que es el original | n/a | — | [GitLab](https://gitlab.com/librehealth/ehr/lh-ehr) |
| Juno EMR (CA) | D | Sin portal · **Sí** | Datos en Canadá | U | — | [GetApp, terciaria](https://www.getapp.com/all-software/a/juno-emr/) |
| Odoo como portal (BE) | **R** | Opción C, descartada por Raúl por la experiencia · **En parte**: la caída de la web de EPI10 le da el argumento 2.2 | Portal con aspecto Odoo; salud en el ERP | 0–1.004 / 0–1.220 / 0–1.220 | ✅ | [precios](https://www.odoo.com/pricing-plan) |
| Marley Health / Frappe (IN) | N | No estaba | Segundo ERP; buzón por construir: 70–110 h | 55–442 ×3 | ◐ | [repo](https://github.com/earthians/marley) |
| Aidbox + Beda EMR (EE. UU.) | N | No estaba | Licencia de producción ≈ Healthie año 3 | ≈ 20.976 ×3 (terciaria) | — | [precios](https://www.health-samurai.io/docs/aidbox/overview/editions-and-pricing) |
| Awell Health (BE/EE. UU.) | N | No estaba | Solo cubre 1–3; no es portal ni buzón | U | ◐ | [Hosted Pages](https://docs.awellhealth.com/docs/embed-and-host/overview-hosted-pages) |
| EHRbase (DE) | N | No estaba | Solo backend openEHR: > 150 h | 0 + horas | — | [repo](https://github.com/ehrbase/ehrbase) |
| Ozone HIS (FR) | N | No estaba | Sin portal; cuatro sistemas | 0 + > 120 h | — | [GitHub](https://github.com/ozone-his) |
| Open Health Stack (Google) | N | No estaba | SDK Android; app por construir: > 200 h | 0 + horas | — | [docs](https://developers.google.com/open-health-stack/android-fhir) |
| Metriport (EE. UU.) | N | No estaba | Datos de redes de EE. UU.; no aplica | n/a | — | [web](https://www.metriport.com/) |
| Dolibarr CabinetMed (FR) | N | No estaba | Módulo médico casi parado; sin portal | 0 + > 120 h | ◐ | [wiki](https://wiki.dolibarr.org/index.php/Module_Medical_Center) |

### 4.4 Portales genéricos, no-code y complementos

| Plataforma (sede) | Estado | Motivo del 7 oct · ¿se mantiene? | Concesión necesaria | Coste a1 / a2 / a3 | 2.2 | Fuente principal |
|---|---|---|---|---|---|---|
| Softr (DE) | D | Sin postura sobre salud, ES a mano · **Sí, y peor**: «PHI cannot be … stored inside Softr» | Permiso escrito o portal fino; ES a mano | 1.200–1.700 / 1.300–1.900 / 1.300–1.900 | ✅ | [HIPAA](https://docs.softr.io/security/hipaa-compliance) |
| Assembly (EE. UU.) | D | Solo inglés, cobros fuera de la UE · **Sí, y peor**: API ya solo desde Professional | Inglés, EE. UU., venta fuera | ≈ 1.090 ×3 | ◐ | [precios](https://assembly.com/pricing) |
| SuiteDash (EE. UU.) | D | API corta, PHI sin BAA · **Sí** | Puente semimanual, EE. UU. | ≈ 885 ×3 | ✅ | [precios](https://suitedash.com/pricing/) |
| Clinked (UK) | D | Sin formularios ni webhooks · **Sí** | Formularios aparte; sondeo | ≈ 2.110 ×3 | — | [precios](https://www.clinked.com/pricing) |
| Moxo (EE. UU.) | D | Fuera de escala · **Sí**; ya no publica precio | Presupuesto empresarial | ≥ 5.000 ×3 | — | [precios](https://www.moxo.com/pricing) |
| Noloco (IE) | N★ | No estaba | ES a mano; DPA no publicado; portal fino | 720 ×3 | — | [precios](https://noloco.io/pricing) |
| Knack (EE. UU., región DE) | N★ | No estaba | Excepción art. 9 o portal fino | 1.215 ×3 | — | [términos](https://www.knack.com/terms-of-service/) |
| Glide (EE. UU.) | N | No estaba | **Prohíbe datos genéticos** | n/a | — | [user data](https://www.glideapps.com/legal/user-data) |
| Bubble (EE. UU.) | N | No estaba | **El DPA prohíbe el art. 9** | n/a | ✅ | [DPA](https://bubble.io/dpa) |
| WeWeb + Xano (FR/EE. UU.) | N | No estaba | Acuerdo de salud con Xano; 70–110 h | 1.160–1.460 (≈ 8.280 con acuerdo de salud) ×3 | ✅ | [Xano precios](https://www.xano.com/pricing/) |
| Budibase (UK) | N | No estaba | La nube prohíbe salud; autoalojar: 50–90 h | 100–300 ×3 | — | [términos](https://budibase.com/terms/) |
| Directus (EE. UU.) | N | No estaba | No es un portal: 90–140 h | 0–1.090 ×3 | ◐ | [precios](https://directus.com/pricing) |
| Appsmith (EE. UU./IN) | N | No estaba | Solo inglés, uso interno | ≈ 8.800 cloud / 0 autoalojado | — | [precios](https://www.appsmith.com/pricing) |
| Zite (EE. UU.) | N | No estaba | Sin UE para apps y datos | ≈ 830 ×3 | ✅ | [región](https://zite.com/help/deployment-region) |
| Stackby (IN) | N | No estaba | Sin UE; no aísla por clienta | ≈ 33.000 ×3 (extrapolación) | — | [precios](https://stackby.com/pricing) |
| Plutio (UK) | N | No estaba | Archivos en EE. UU.; el DPA desaconseja el art. 9 | 550–640 ×3 | U | [DPA](https://www.plutio.com/legal/data-processing-agreement) |
| HoneyBook (EE. UU.) | N | No estaba | **No se puede contratar desde España** | n/a | — | [precios](https://www.honeybook.com/pricing) |
| Dubsado (EE. UU.) | N | No estaba | Sin API; excluye datos sensibles | ≈ 485 ×3 | — | [precios](https://www.dubsado.com/pricing) |
| Portant (AU) | N | No estaba | No es un portal | n/a | — | [precios](https://portant.co/pricing) |
| Portal.io (EE. UU.) | N | No estaba | Otro sector (integradores AV) | n/a | — | [precios](https://portal.io/pricing) |
| Systeme.io (IE) | N | No estaba | No es un portal; solo web y tienda en la UE | 190–1.070 ×3 | ✅ | [precios](https://systeme.io/pricing) |
| Kajabi (EE. UU.) | N | No estaba | **La AUP prohíbe datos de salud** | n/a | ✅ | [precios](https://kajabi.com/pricing) |
| Circle (EE. UU.) | N | No estaba | **El DPA prohíbe el art. 9** | n/a | ◐ | [precios](https://circle.so/pricing) |
| Podia (EE. UU.) | N | No estaba | Sin API ni webhooks | ≈ 930 ×3 | ✅ | [precios](https://www.podia.com/pricing) |
| Teachable (EE. UU.) | N | No estaba | Sin mensajes ni PDF | ≈ 1.535 ×3 | ✅ | [precios](https://www.teachable.com/pricing) |
| Memberstack + Webflow (EE. UU.) | N | No estaba | Portal entero por construir: 80–150 h | 500–900 + Webflow ×3 | ✅ | [precios](https://www.memberstack.com/pricing) |
| Outseta (EE. UU.) | N | No estaba | Sin formularios ni PDF | ≈ 410 ×3 | — | [precios](https://www.outseta.com/pricing) |
| Tally (BE) | N (complemento) | No estaba | Solo formularios: consentimiento y encuesta en la UE | 0–240 ×3 | — | [precios](https://tally.so/pricing) |
| Jotform (EE. UU./UK) | N (complemento) | No estaba | Cláusula de «highly sensitive» | 375–1.420 ×3 | — | [precios](https://www.jotform.com/pricing/) |
| Fillout (EE. UU.) | N (complemento) | No estaba | La UE solo en Team | ≈ 3.310 ×3 | — | [precios](https://www.fillout.com/pricing) |
| Typeform (ES) | N (complemento) | No estaba | UE y firma solo a medida | > 3.000 ×3 (U) | — | [precios](https://www.typeform.com/pricing) |

### 4.5 Genética B2B2C, marca blanca y novedades de 2026

| Plataforma (sede) | Estado | Motivo del 7 oct · ¿se mantiene? | Concesión necesaria | Coste a1 / a2 / a3 | 2.2 | Fuente principal |
|---|---|---|---|---|---|---|
| InsideTracker / Terra (EE. UU.) | D | Sin API, consumo de EE. UU. · **En parte**: ya hay API pública con webhooks, pero es un motor de sangre y wearables y el ADN es solo para EE. UU. | Construir el portal igualmente | U | — | [developer](https://developer.insidetracker.com/docs/glossary) |
| TellmeGen B2B (ES) | N (complemento) | No estaba | No es portal; marca blanca del PDF genético, gratis, sin API | 0 ×3 | — | [B2B](https://www.tellmegen.com/plataforma-b2b) |
| Tellescope (EE. UU.) | N | No estaba | Precio U; datos probablemente en EE. UU. | U | ◐ dominio | [API](https://docs.tellescope.com/api-documentation) |
| 3X4 Genetics (EE. UU./ZA) | N | No estaba | Solo entrega su test | n/a | — | [web](https://3x4genetics.com/) |
| Muhdo Helix (UK) | N | No estaba | Solo sus tests; cambiar de proveedor del kit | ≈ 6.325 / 3.450 / 3.450 | — | [Helix](https://muhdo-b2b.myshopify.com/pages/clinic-and-organisation-helix-portal-set-up-and-subscription) |
| LifeNome (EE. UU.) | N | No estaba | Motor genómico, no portal | U | — | [developers](https://developers.lifenome.com/) |
| Nutrigenomix (CA) | N | No estaba | Solo su test | n/a | — | [web](https://www.nutrigenomix.com/) |
| GenoPalate (EE. UU.) | N | No estaba | Solo su test | n/a | — | [nota, terciaria](https://insider.fitt.co/press-release/genopalate-launches-new-provider-portal-and-turnkey-programs-to-power-the-future-of-personalized-wellness/) |
| Nutrition Genome (EE. UU.) | N | No estaba | Mínimo de 500 muestras/mes | n/a | — | [white label](https://nutritiongenome.com/white-label/) |
| Xcode Life (IN) | N | No estaba | Solo su análisis; datos fuera de la UE | n/a | — | [partners](https://www.xcode.life/partner-with-us/) |
| Fagron Genomics (ES) | N | No estaba | Solo su test | n/a | — | [web](https://www.fagrongenomics.com/) |
| ADNTRO (ES) | N | No estaba | Solo su test de consumo | n/a | — | [web](https://www.adntro.com/) |
| Vitagene / 1health.io (EE. UU.) | N | No estaba | Solo sus tests; sanción de la FTC | n/a | — | [nota, terciaria](https://www.businesswire.com/news/home/20210325005135/en) |
| LetsGetChecked (IE/EE. UU.) | N | No estaba | Solo sus tests | n/a | — | [directorio, terciaria](https://bitscale.ai/directory/letsgetchecked) |
| Function Health (EE. UU.) | N | No estaba | Solo consumidor y EE. UU. | n/a | — | [web](https://www.functionhealth.com/) |
| Lifeforce (EE. UU.) | N | No estaba | Solo consumidor y EE. UU. | n/a | — | [web](https://www.mylifeforce.com/) |
| Vibrant Wellness (EE. UU.) | N | No estaba | Laboratorio, no portal | n/a | — | [nota, terciaria](https://europeanbusinessmagazine.com/?p=35111) |
| Nourish (EE. UU.) | N | No estaba | Servicio de dietistas, no software | n/a | — | [web](https://www.nourish.com/) |
| Heads Up Health (EE. UU.) | N | No estaba | API solo en Enterprise (alta desde 7.000 $) | 3.680 / 2.760 / 2.760 sin API | — | [precios](https://headsuphealth.com/pricing-packages/) |
| Rupa Health (EE. UU.) | N | No estaba | Laboratorios de EE. UU. | n/a | — | [web](https://www.rupahealth.com/) |
| Fullscript (CA/EE. UU.) | N (solo R6) | No estaba | **No envía a España** (solo EE. UU. y Canadá) | n/a | — | [envíos](https://support.fullscript.com/articles/eligible-shipping-addresses) |
| BridgeInteract (EE. UU.) | N | No estaba | Empresarial, EE. UU., sin precio ni docs | U | ◐ | [API](https://www.bridgeinteract.io/api/) |
| Luma Health (EE. UU.) | N | No estaba | Atada a un EHR; venta a sistemas de salud | U | — | [web](https://www.lumahealth.io/) |
| Klara / ModMed (EE. UU.) | N | No estaba | Se vende con el EHR de ModMed | U | — | [web](https://www.modmed.com/what-we-do/patient-engagement/) |
| Patients Know Best (UK) | N | No estaba | Historia clínica del NHS, no portal de marca | U | — | [web](https://patientsknowbest.com/) |
| Physitrack (UK/NL) | N | No estaba | App de marca sin API; fisioterapia | U | — | [branded app](https://www.physitrack.com/es/branded-app) |
| Medicapp (FR/ES) | N | No estaba | No verificada (la web no resuelve) | U | — | [App Store, terciaria](https://apps.apple.com/app/id552305542) |
| Eugenomic | N | No estaba | **No localizada** con fuente primaria | n/a | — | [nota, terciaria](https://elreferente.es/startups/nace-genotica-primer-marketplace-online-comprar-test-geneticos/) |

---

## 5. Hallazgos que cruzan grupos

1. **Datos de salud en no-code: el bloqueo es contractual, no técnico.**
   - Lo prohíben por escrito: Glide (datos genéticos), Bubble (DPA §13.4), Budibase Cloud, Circle (DPA), Kajabi (AUP) y Dubsado.
   - Lo excluyen salvo plan HIPAA de EE. UU. o acuerdo aparte: Knack y Xano.
   - Lo desaconsejan: Softr, Plutio, Memberstack y Jotform.
   - Es un dato nuevo frente al 7 oct, cuando Softr quedó como mención sin esta comprobación.
2. **Las genéticas B2B2C no sirven como portal.** Todas entregan su propio test o motor. La más útil es **TellmeGen B2B**, como complemento: es gratuita y saca el PDF genético con el logo de EPI10.
   - Aviso nuevo: en España, los productos Advanced y ULTRA de TellmeGen «requieren prescripción médica previa». Hay que confirmar cuál usa EPI10.
3. **Venta adicional (R6) en España.**
   - Fullscript no envía a España (artículo actualizado el 4 sep 2026).
   - Siguen valiendo Stripe Checkout desde el orquestador (2–4 h), Odoo eCommerce o la venta nativa de Pabau y Practice Better.
   - Systeme.io (Irlanda) sirve como web y tienda en la UE si la web de EPI10 necesita casa.
4. **Complementos baratos en la UE.** Tally (Bélgica, 0–20 €/mes) para el consentimiento y la encuesta, con webhooks. Son útiles en cualquier opción con portal fino.
5. **Lo que no cambia.** No existe hoy, a 18 oct, una plataforma en la UE, con portal en español, API gratis y venta adicional para una pyme de nutrición. Pabau es la que más se acerca, y lo tiene que demostrar.

---

## 6. Unknown, con quién y cómo se resuelven

| # | Unknown | Quién | Cómo |
|---|---|---|---|
| U1 | Pabau: precio de Team (2–3 usuarios) y si la API y los webhooks tienen coste | Raúl, con su OK para pedir demo | Demo y presupuesto por escrito |
| U2 | Pabau: idioma del portal, de la app y de los correos | Raúl o el equipo, tras la demo | Tour público o demo; prueba de 1–2 h |
| U3 | Pabau: si los mensajes y documentos enviados por API se ven en el portal, si `clients/create` invita y qué eventos tiene el webhook | El equipo, con su OK | Prueba de 1–2 h en sandbox con la colección de Postman |
| U4 | Pabau: región UE garantizada por contrato, DPA de la UE (no solo UK GDPR) con SCC, y subencargados de EE. UU. | Raúl + abogado o DPD de EPI10 | Pregunta escrita y lectura del DPA |
| U5 | Practice Better: precio y fecha de la API tras la beta | Raúl o Carmen | Pregunta escrita |
| U6 | Odoo de EPI10: edición, versión, plan y acceso a la API. Y si se reabre la opción C | Carmen o Aresoltec (SKI2-104); Raúl decide la C | Mirar la suscripción (5 min) y prueba de 1–2 h en el Odoo 17 de pruebas |
| U7 | Knack, Noloco y Softr: ¿aceptan datos del art. 9 bajo su DPA? | Raúl | Pregunta escrita a los tres |
| U8 | Simply.Coach: región AWS y DPA; si «Create Contact» invita | Raúl | Pregunta escrita; prueba de 14 días con su OK |
| U9 | Tellescope: precio, región y DPA | Raúl | Pregunta escrita |
| U10 | TellmeGen: qué producto usa EPI10 (¿exige prescripción?) y si la marca blanca evita que la clienta reciba sus correos | Carmen | Pregunta a TellmeGen (EPI10 ya es cliente) |
| U11 | Horas consumidas de las 110 h | Raúl | Heredado de SKI2-205; condiciona cualquier opción |

**Lo que no bloquea este documento.** Ninguna prueba con cuenta es imprescindible para entregar la línea 2.1 (a). **Sí lo es para afirmar en el dossier que Pabau es viable:** hasta U1–U3, Pabau es «casi viable».

---

## 7. Limitaciones y lo que no se revisó

- El cupo de búsquedas web de la sesión se agotó a mitad del trabajo en los cinco grupos. Desde ese punto, los datos salen de abrir directamente las páginas oficiales. Las cifras de terceros van marcadas.
- Varias páginas dieron 403 o solo cargan con JavaScript: los artículos de Practice Better (leídos en el extracto del buscador), el DPA de Softr, el portal de desarrolladores de Carepatron y las tablas de precios en imagen de Noloco y Softr.
- **No revisadas:** Doctena, Jameda, Esana, Halsa, Kenko, Nutrisoft, Ofimedic, Diet-Plan, Nutriboss, Dietowin, Nutrimind, Owl Practice, TherapyNotes, CharmHealth, Satori, Tebra/Kareo y Livv Health. Por su perfil (agenda, mercado local o EE. UU.) no se espera que cambien la lista corta. Es una inferencia, no una comprobación.
- Las horas son estimaciones a partir del contrato y de lo construido para Healthie y OpenEMR. Ninguna plataforma se ha probado.

## 8. Fuentes

Todas consultadas el **2026-10-18**. Las fuentes de cada plataforma están en su fila del inventario (§4) y en cada ficha de la lista corta (§2). Las que sostienen el veredicto:

- Pabau: [API en Postman](https://documenter.getpostman.com/view/4391324/2sAYJAdxBb), [Trust Centre](https://trust.pabau.com/), [precios](https://pabau.com/pricing/), [portal](https://pabau.com/es/funcionalidades/client-portal), [webhooks](https://support.pabau.com/en/pabau2/how-to-set-up-webhooks), [ToolRadar, terciaria](https://toolradar.com/tools/pabau/pricing), [Capterra, terciaria](https://www.capterra.com/p/140062/Pabau-CRM/pricing/).
- Practice Better: [precios](https://practicebetter.io/pricing), [residencia de datos](https://help.practicebetter.io/hc/en-us/articles/47681541627931-Practice-Better-Data-Residency) (extracto), [API beta](https://help.practicebetter.io/hc/en-us/articles/16637584053275-Getting-Started-with-the-Practice-Better-API-Beta) (extracto).
- Carepatron: [OpenAPI 2026-10-02](https://developer.carepatron.com/openapi.yaml), [DPA UE](https://www.carepatron.com/eu-data-processing-addendum), [precios](https://www.carepatron.com/pricing).
- Healthie: [precios](https://www.gethealthie.com/pricing), [formularios en español](https://help.gethealthie.com/article/1106-forms-available-in-spanish).
- Odoo: [precios](https://www.odoo.com/pricing-plan), [RGPD](https://www.odoo.com/gdpr).
- Knack: [precios](https://www.knack.com/pricing/), [términos](https://www.knack.com/terms-of-service/). Noloco: [precios](https://noloco.io/pricing), [seguridad](https://noloco.io/security). Softr: [HIPAA](https://docs.softr.io/security/hipaa-compliance).
- Simply.Coach: [precios y FAQ](https://simply.coach/pricing-for-solopreneurs/), [Zapier](https://zapier.com/apps/simplycoach/integrations).
- OpenEMR: [releases](https://github.com/openemr/openemr/releases), [DINAO](https://dinao.com/en/conteneur/openemr).
- Prohibiciones del art. 9: [Glide](https://www.glideapps.com/legal/user-data), [Bubble DPA](https://bubble.io/dpa), [Budibase](https://budibase.com/terms/), [Plutio DPA](https://www.plutio.com/legal/data-processing-agreement).
- Venta en España: [Fullscript, envíos](https://support.fullscript.com/articles/eligible-shipping-addresses).
- TellmeGen: [plataforma B2B](https://www.tellmegen.com/plataforma-b2b), [privacidad](https://www.tellmegen.com/politica-de-privacidad).
- Referencias internas: Healthie 475/950/1.900 $/mes (correo del 7 oct, `../healthie/2026-10-07_noticias_healthie_v1.md`); botón rojo (SKI2-205, §7.1); OpenEMR vía 1 (SKI2-207).

## Siguiente paso

1. Revisión independiente de este documento, que lanza el orquestador: muestreo de fuentes y precios.
2. Raúl decide si autoriza la demo de Pabau (U1–U3) antes del 21 y si reabre la opción C (Odoo como portal) con el argumento de la web.
3. Si autoriza las preguntas escritas: Practice Better (U5), y Knack, Noloco y Softr (U7).
4. El dossier del 21 pone esta línea 2.1 (a) junto a la 2.1 (b) con el cuadro del §3.
