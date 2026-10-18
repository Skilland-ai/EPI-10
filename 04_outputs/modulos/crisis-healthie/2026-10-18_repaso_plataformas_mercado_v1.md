# Repaso de plataformas de mercado para el portal de cliente (v1)

Fecha: 2026-10-18 · Linear: SKI2-288 (dossier del 21 oct, línea 2.1 (a) «otra plataforma del mercado») · Estado: **revisado, con correcciones aplicadas** (revisión independiente «apto con cambios», 18 oct; decisiones de Raúl del 18 oct)
Antecedente: [research del 7 oct, SKI2-206](2026-10-07_research_alternativas_healthie_v1.md) · Contexto: [arquitectura del sistema v1](../integracion/2026-10-12_arquitectura_sistema_v1.md) · [requisitos legales](../../comunicaciones/2026-10-13_requisitos_legales_operar_openemr_vs_healthie.md) · [correo del 14 oct](../../comunicaciones/2026-10-14_correo_carmen_tomas_cambio_de_pieza.md) · contrato del portal en `epi10-orquestador` (`src/modules/openemr/contrato.ts`, v1.2.0)

**Qué es este documento.** Repasa una a una las plataformas de mercado que podrían hacer de portal de cliente de EPI10. No busca confirmar el veredicto del 7 oct. Busca la plataforma viable que se nos escapó, aunque obligue a ceder en algo.

**Método.**
- Todas las fuentes se consultaron el **2026-10-18**, solo información pública.
- No se ha abierto ninguna cuenta ni prueba, no se ha contactado con ningún proveedor y no se ha pagado nada.
- Lo que no está en una fuente primaria va como **Unknown** o como «terciaria».
- **Todas las horas y todos los costes son estimaciones.** Cambio usado: 1 $ ≈ 0,92 €; 1 £ ≈ 1,15 €; 1 CAD ≈ 0,66 €.
- Cinco investigadores trabajaron en paralelo por grupos de plataformas. La síntesis es de este documento.

**Decisiones de Raúl (18 oct, comentario en SKI2-288).**
1. Sí a la demo de Pabau; la pide él (SKI2-289).
2. Odoo como portal (opción C) **no se reabre**: ya hay portal propio sobre OpenEMR y Odoo no aporta nada encima.

## Resumen en cinco líneas

1. **Revisamos 137 plataformas;** 4 de ellas no se pudieron evaluar por falta de fuente.
   - Son las 41 del 7 oct (incluidas Healthie e InsideTracker), Odoo como portal y 95 nuevas.
   - **Ningún descarte del 7 oct se revoca.** Dos se suavizan sin llegar a ser viables: InsideTracker y Halaxy ya tienen API pública. Cinco empeoran: Practice Better, Softr, Assembly, Oystehr y Fasten.
   - **Odoo como portal sigue descartado** (Raúl, 18 oct).
2. **Sí hay una que se nos escapó: Pabau** (Reino Unido, nueva). Es **casi viable**.
   - Su API pública con webhooks cubre buena parte de las 7 operaciones. Tiene región UE, DPA y venta adicional nativa.
   - Pero no tiene ruta de invitación al portal ni de buzón, el precio solo se da con demo y falta confirmar el español del portal.
   - Raúl pide la demo (SKI2-289).
3. **Practice Better sigue siendo la que mejor automatiza, pero empeora:** los datos están ahora en AWS EE. UU., la interfaz es solo en inglés y la API tendrá precio tras la beta, sin anunciar. Es el patrón de Healthie.
   - Hallazgo nuevo: muchos portales no-code **prohíben por escrito los datos de salud o genéticos**. Knack los excluye sin excepción.
4. **Licencias a 3 años (estimación):**

| Opción | Licencias 3 años |
|---|---|
| Noloco | ≈ 2.150 € |
| Simply.Coach | 2.950–4.600 € |
| Pabau | 4.100–6.200 € (extrapolado de una fuente terciaria con 1 usuario; techo real Unknown) |
| Practice Better | ≥ 2.955 € más una API sin precio; con una API al estilo de Healthie, 8.200–34.400 € |
| Portal propio sobre OpenEMR | 0–1.440 € |
| Healthie con API | ≈ 43.300 € |

5. **Horas desde hoy hasta producción (estimación).** El portal propio sobre OpenEMR ya está construido (v1.3 en `main`).

| Opción | Horas desde hoy |
|---|---|
| Portal propio sobre OpenEMR | 39–62 h (SKI2-239 a 242 y 173) |
| Simply.Coach | 34–56 h, más 5–10 min manuales por caso |
| Pabau | 69–107 h |
| Noloco | 68–107 h |
| Practice Better | ≥ 59 h |
| Healthie con API | 23–37 h |

   **Ninguna plataforma ahorra horas frente a lo ya construido:** cuestan más horas y añaden licencia y dependencia. Healthie con API sería la más corta, pero cuesta ≈ 43.300 € a 3 años.

---

## 1. Qué buscamos y qué cambia respecto al 7 oct

**La plataforma solo sustituye el portal de cliente.** Stripe, Odoo, el generador de informes y la ficha de la persona ya están construidos en el orquestador. Por eso cada plataforma se valora por lo que costaría enchufarla al monolito, no como sistema completo.

**El contrato del portal** está en `src/modules/openemr/contrato.ts` (v1.2.0). `src/modules/portal/portal-cliente.ts` solo traduce los nombres de los trabajos del outbox (`alta`, `mensaje`, `grupo`). El contrato tiene 7 operaciones:

| # | Operación | Qué hace | Crítica |
|---|---|---|---|
| 1 | `crear_acceso` | Alta de la clienta tras pagar en Stripe e invitación al portal | Sí |
| 2 | `asignar_formularios` | Consentimiento con firma y encuesta de hábitos | Sí |
| 3 | `estado_formularios` | Saber cuándo los ha completado, incluido el paso «test en casa o en la sede» con datos de envío o cita (D3, SKI2-267) | Sí |
| 4 | `enviar_mensaje` | Mensajes de hito en el buzón del portal | Alta |
| 5 | `mensajes_nuevos` | Leer lo que escribe la clienta | Alta |
| 6 | `publicar_informe` | Subir el PDF y que la clienta lo vea y descargue | Sí |
| 7 | `actualizar_caso` | Resumen del caso en la ficha, para guiar a Aitor | Deseable |

**Qué cambia en el monolito si cambia el portal.** Más de lo que decía la primera versión de este documento:
- un módulo nuevo, hermano de `healthie` y `openemr`;
- cableado en `core/external-ids.ts` y `core/case-events.service.ts` (`EVENT_SOURCES`);
- una migración: id externo de la clienta, restricción `source` y cursor de mensajes, como hizo la `0004_openemr`;
- `config/env.ts`, un `config/<portal>-env.ts` y `app.module.ts`;
- el puerto `PUBLICADOR_INFORME` de `informes/pantalla`;
- los listeners de hitos de `odoo/milestones`;
- `stripe/stripe.jobs.ts`.

**Además, el servidor de OpenEMR hacía parte del trabajo.** El módulo PHP propio ya da resueltos la idempotencia, el enlace mágico, el estado agregado de los formularios y el paso 3 del onboarding. Con una plataforma genérica, todo eso lo tiene que hacer el monolito. El back office de Aitor también se apoya hoy en OpenEMR: el resumen del caso y el enlace firmado a la pantalla de informes. Con otra plataforma, ese back office cambia (Unknown).

**Línea fija en cada estimación de plataforma** (estimación):
- cableado en core, configuración y migración: 3–5 h;
- simulador y pruebas de integración, como exige el método del proyecto: 8–15 h;
- back office de Aitor: Unknown.

**Requisitos críticos del 7 oct:**
- R1: portal en español con marca EPI10.
- R2/R8: automatización por API gratis o barata.
- R6: venta adicional.
- R9: datos de salud y genéticos en la UE, con DPA.

**Punto extra (línea 2.2):** integrar la web de EPI10 con la misma marca. Se anota en el inventario, pero el argumento de la web va a otra parte del dossier (Raúl, 18 oct).

**Horas comunes a cualquier opción desde hoy** (estimación; ya están en Linear, sin estimar allí):
- SKI2-173, despliegue del monolito en el servidor de EPI10: 8–12 h;
- SKI2-240, purga de `jobs` y estado en memoria: 3–5 h;
- SKI2-241, retirar Healthie y fijar el portal por defecto, sin la migración del ensayo E2E: 3–5 h.

**Total común: 14–22 h.** El bloque legal (EIPD, registro, contrato de encargo, consentimiento revisado) también es común: 8–12 h, que ya hacían falta con Healthie. Va aparte.

---

## 2. Lista corta: cuatro viables o casi viables

Orden: de más a menos encaje con los cuatro críticos. Ninguna los cumple todos hoy sin ceder en algo.

### 2.1 Pabau (Reino Unido · nueva) — la que se nos escapó

**Qué es.** Software clínico en la nube (estética, bienestar y medicina) con portal de paciente en todos los planes, app Pabau Go, web y soporte en español. Lo encontraron por separado dos de los cinco investigadores. **Raúl pide la demo (SKI2-289).**

**Contrato 1–7.** API REST pública, con documentación en Postman sin login: colección «Pabau Legacy», 212 rutas, ejemplos de marzo de 2026. Operación por operación:

1. `clients/create`. **No hay ruta de invitación al portal**: cómo se da el acceso es Unknown.
2. `clients/{id}/medical-forms/create`.
3. `complete-forms` más webhooks de formularios y documentos. Sacar los datos de envío del kit de las respuestas es Unknown.
4. Solo `send/email`, `send/sms` y `send/WhatsApp`. **No hay ruta de buzón del portal.**
5. `clients/{id}/communications`, por consulta.
6. `clients/{id}/documents/upload`. Si la clienta lo ve en el portal es Unknown.
7. Notas, etiquetas y campos propios.

Límites: 110 peticiones/min y 25.000/día. Las claves de API y los webhooks aparecen en todas las columnas de la tabla de planes; no se anuncia un coste aparte por la API.

| Punto | Dato (18 oct) |
|---|---|
| R1 español y marca | Web, soporte y ficha del portal en español. Idioma de la interfaz del portal y de los correos: **Unknown**. «Quitar la marca Pabau» parece ir en el complemento Marketing Plus (inferido de la tabla; precio Unknown). |
| R3/R4/R5 | Formularios de admisión y médicos en el portal, que pueden exigirse antes de reservar; mensajería segura; documentos compartidos. Firma del consentimiento: la página del portal no la menciona (Unknown). |
| R6 venta | Paquetes, membresías, bonos regalo, enlaces de pago y productos con inventario; Stripe y Klarna. |
| R9 datos | Trust Centre: DigitalOcean y AWS en «EU & US regions»; no dice si el cliente elige la UE. DPA de UK GDPR con subencargados, a petición; no menciona SCC. Subencargados en EE. UU. (SendGrid, Sentry, Vercel…). ISO 27001 del centro de datos, no de Pabau; SOC 2 solo como «readiness». |
| 2.2 web | Reservas en la web propia y enlaces de pago. Web o tienda en la plataforma: no. |

**Coste total a 3 años (estimación, extrapolado).**
- La página oficial no da cifras. Los planes van por número de usuarios (Team = 2–3), por sede y por país, con hasta un 20 % de descuento anual.
- **Fórmula:** 62 $/usuario/mes (blog del fabricante, vía fuente terciaria) × 2–3 usuarios × 12 × 0,92 = 1.370–2.050 €/año.
- Las fuentes terciarias (ToolRadar, Software Advice) dan 59–69 $/mes **para 1 usuario**. Llevarlo a 2–3 usuarios es una suposición nuestra.
- No incluye el complemento de marca ni el posible recargo por sede.

| Concepto | Año 1 | Año 2 | Año 3 |
|---|---|---|---|
| Licencia Team, 2–3 usuarios (extrapolada) | 1.370–2.050 € | 1.370–2.050 € | 1.370–2.050 € |
| API y webhooks | 0 € anunciado (Unknown) | ídem | ídem |
| Complemento de marca (Marketing Plus) | Unknown | Unknown | Unknown |
| **Total 3 años** | | | **≈ 4.100–6.200 € + marca (techo real Unknown)** |

**Horas de integración (estimación): 55–85 h.** Desde hoy, con las comunes, son **69–107 h**. Por qué se sube de las 35–55 h de la primera versión: sin ruta de invitación ni de buzón, y sin el trabajo que hacía el módulo PHP de OpenEMR, el monolito tiene que resolverlo todo él. Desglose:
- cliente REST, cableado y migración: 6–10 h;
- alta y acceso sin ruta de invitación: 6–10 h;
- formularios, D3 y paso 3 desde las respuestas: 10–16 h;
- receptor de webhooks: 4–6 h;
- mensajes por correo o SMS y lectura de comunicaciones: 5–8 h;
- informe y caso: 4–6 h;
- simulador y pruebas de integración: 8–15 h;
- configuración de Pabau (plantillas en español, formularios y portal): 6–10 h;
- ensayo E2E y demo: 3–5 h;
- back office de Aitor: Unknown.

Mantenimiento: 6–12 h/año.

**Riesgos.**
- **Precio:** opaco y por demo. La colección se llama «Legacy»: puede haber migración.
- **Idioma:** el del portal y los correos no está confirmado.
- **Datos de salud:** la región UE no está garantizada por escrito, el DPA es de UK GDPR y hay subencargados en EE. UU.
- **Dependencia:** producto orientado a estética, con mucho que ocultar a Aitor.

**Qué tendría que aceptar EPI10.**
- Un software clínico de terceros con aspecto propio.
- Mensajes de hito por correo o SMS en vez del buzón, si se confirma que no hay buzón por API.
- Una licencia anual.
- Datos de salud en la UE o en el Reino Unido, con DPA y subencargados en EE. UU.

**Prueba de 1–2 h que lo confirme (tras la demo de SKI2-289).** En un sandbox, con la colección de Postman:
1. Crear una clienta, asignarle un formulario, subir un PDF y enviar un mensaje.
2. Comprobar en el portal, en español, cómo recibe el acceso.
3. Comprobar que se ven el formulario, el PDF y el mensaje, y que salta el webhook al completar.

Si falla el punto 3, Pabau baja a «puente semiautomático».

Fuentes (2026-10-18): [precios](https://pabau.com/pricing/), [precios ES](https://pabau.com/es/precios/), [portal](https://pabau.com/es/funcionalidades/client-portal), [API en Postman](https://documenter.getpostman.com/view/4391324/2sAYJAdxBb), [webhooks](https://support.pabau.com/en/pabau2/how-to-set-up-webhooks), [Trust Centre](https://trust.pabau.com/), [RGPD](https://pabau.com/gdpr/), [Software Advice, terciaria](https://www.softwareadvice.com/telemedicine/pabau-profile/), [ToolRadar, terciaria](https://toolradar.com/tools/pabau/pricing).

### 2.2 Practice Better (Canadá · descartada el 7 oct, sigue casi) — automatiza, en inglés y con datos en EE. UU.

**Contrato 1–7.**
- Por API: 1 (o Zapier «Add Client»), 2, 4 y 6.
- Por webhook: 3, solo según una guía terciaria de 2024.
- Unknown: 5 y 7.

La API REST de lectura y escritura está en beta pública gratuita, en planes de pago y con revisión del soporte. Las docs solo se ven tras activarla. Zapier: 6 disparadores y 1 acción.

| Punto | Dato (18 oct) |
|---|---|
| R1 | **Interfaz solo en inglés**, sin selector (artículo oficial). Los campos fijos de los formularios salen en inglés. El contenido propio sí puede ir en español. Marca y URL personalizada en Plus. |
| R6 | Paquetes y programas con Stripe, desde Plus. |
| R9 | **Nuevo: servidores consolidados en AWS EE. UU.** (artículo «Data Residency»; 403, leído en el extracto del buscador). DPA desde la cuenta. SCC/DPF: Unknown. |
| API | Cita del 7 oct, **no reverificada el 18** (403 y la búsqueda no la encuentra): «Pricing … will be introduced … once the beta period has concluded». Sin precio ni fecha. |

**Coste total a 3 años (estimación).** Plus anual: 89 $/mes ≈ 985 €/año, con 1 profesional y 3 administradores.
- **Sin API de pago: ≥ 2.955 €** (985 € × 3).
- **Escenario «API al estilo de Healthie»: 8.200–34.400 €.** El suelo supone una API de 475 $/mes solo el año 3 (2.955 + 5.244). El techo supone 950 $/mes el año 2 y 1.900 $/mes el año 3 (2.955 + 10.488 + 20.976).

**Horas (estimación): Unknown, ≥ 45 h.** Sin ver las docs no se puede estimar en serio.
- Suelo: cliente y alta, 22–32 h; plantillas en español, 6–10 h; más la línea fija (cableado 3–5 h y simulador 8–15 h).
- **Desde hoy: ≥ 59 h.**

Mantenimiento: 6–12 h/año.

**Riesgos.**
- **Precio:** alto; la API pasará a ser de pago.
- **Idioma:** inglés.
- **Datos:** los genéticos, en EE. UU.
- **Dependencia:** el roadmap de un tercero.

**Qué tendría que aceptar EPI10.**
- Un portal con botones en inglés.
- Datos genéticos en EE. UU., con DPA y SCC y una evaluación de la transferencia.
- Un precio futuro desconocido.

**Prueba de 1–2 h.**
1. Pedir por escrito el precio de la API tras la beta y la fecha en que acaba (Raúl o Carmen).
2. Solo si es asumible: activar el complemento en una cuenta de prueba y verificar el alta, el formulario, el PDF y los webhooks.

Fuentes (2026-10-18): [precios](https://practicebetter.io/pricing), [API beta](https://help.practicebetter.io/hc/en-us/articles/16637584053275-Getting-Started-with-the-Practice-Better-API-Beta) (403, extracto), [residencia de datos](https://help.practicebetter.io/hc/en-us/articles/47681541627931-Practice-Better-Data-Residency) (403, extracto), [Zapier](https://zapier.com/apps/practice-better/integrations).

### 2.3 Noloco (Irlanda · nueva) con «portal fino»

**La idea.** Noloco pone la interfaz, alojada en la UE. El orquestador, en el servidor de EPI10, guarda lo sensible: las respuestas de salud y el PDF.
- El portal guarda nombre, correo, estado y mensajes de hito.
- El PDF se sirve con un enlace firmado y caducable del orquestador.
- Reduce el riesgo del art. 9 en el proveedor, pero no lo elimina: los mensajes y el formulario pueden contener datos de salud.

| Punto | Dato (18 oct) |
|---|---|
| R1 | **Sin localización nativa:** textos a mano y login con código. Correos de invitación editables. |
| Contrato | Por GraphQL: 1, 2, 4, 6 y 7. Con workflows y webhook saliente: 3 y 5. Si crear la clienta por API envía la invitación: Unknown. |
| R3/R4/R5 | Firma, formularios, comentarios por registro (no hay chat en tiempo real) y archivos. |
| R6 | Stripe como fuente de datos sincronizada; botón de pago nativo: Unknown. |
| R9 | AWS Irlanda e ISO 27001:2022 propia. **DPA no publicado.** No menciona los datos de salud: ni los prohíbe ni los acepta. |
| Precio | Build 65 $/mes anual ≈ 720 €/año, con 1.000 clientas activas. **Total 3 años ≈ 2.150 €.** |
| 2.2 | No. |

**Horas (estimación): 54–85 h** (desde hoy, **68–107 h**):
- montaje: 30–45 h;
- portal fino: 8–12 h;
- español: 5–8 h;
- línea fija (cableado y simulador): 11–20 h.

Mantenimiento: 6–12 h/año.

**Riesgos.**
- **Legal:** el bloqueante es tener por escrito que acepta datos del art. 9 y un DPA.
- **Idioma:** sin localización nativa.
- **Chat:** pobre, son comentarios.
- **Dependencia:** empresa pequeña.

**Qué tendría que aceptar EPI10.** Un portal hecho con un constructor, con limitaciones de diseño. Un DPA negociado. Y más piezas que mantener.

**Prueba de 1–2 h.**
1. Antes, pregunta escrita: ¿aceptan datos del art. 9 bajo un DPA?
2. Si dicen que sí, en una cuenta de prueba: crear una clienta por API, ver si llega la invitación, ver el español del login y de los correos, y ver si hay disparador de «comentario nuevo».

Fuentes (2026-10-18): [precios](https://noloco.io/pricing), [seguridad](https://noloco.io/security), [MSA](https://noloco.io/msa), [comunidad: localización](https://community.noloco.io/t/multi-language-portals/569).

**Knack sale de la lista corta (corrección de la revisión).**
- Sus términos (§3(a), rev. 24 ago 2026) dicen que el servicio no está pensado para «Sensitive Personal Data», que el §1(18) define por el art. 9 del RGPD. **No hay ninguna excepción: ni siquiera el plan HIPAA la cubre.** La excepción HIPAA solo vale para la PHI.
- La página de precios ofrece región «US, Europe, or Asia»; Frankfurt sin confirmar.
- Solo valdría con una enmienda escrita del contrato.

**Softr** también queda fuera: su documentación dice «PHI cannot be transmitted to or stored inside Softr» y no firma BAA.

### 2.4 Simply.Coach (India/EE. UU. · nueva) — el mejor español, semiautomático

**Por qué entra.** Es la única del inventario con R1 resuelto de verdad. La FAQ oficial dice que está disponible de forma nativa en inglés, español y francés «across the web app, mobile app, and even email notifications». El plan Leap da marca blanca y dominio propio por 69 $/mes.

**Contrato 1–7.** Sin API pública. Tiene integración con Zapier: 11 disparadores, 6 acciones (una es «Find or Create») y 3 búsquedas. La página de Zapier no dice que sea oficial.
- Por Zapier: 1 «Create Contact» (si invita: Unknown), 2 «Create Engagement» (en parte), 3 «New Response Submitted for Form» y 7 «Create Note».
- **A mano: 4, 5 y 6** (mensajes de hito, lectura de mensajes y PDF). Son 2–3 tareas por caso, unos 5–10 min para Aitor.

| Punto | Dato (18 oct) |
|---|---|
| R3/R4/R5 | Formularios, contratos con firma, chat y archivos. |
| R6 | Paquetes, suscripciones, página escaparate, Stripe y PayPal. |
| R9 | AWS, región **no publicada**. Dice SOC 2, HIPAA y GDPR. **DPA no publicado.** |
| 2.2 | Dominio propio y página escaparate. |

**Coste total a 3 años (estimación).** Leap ≈ 760 €/año más Zapier de pago (≈ 220–770 €/año): ≈ 980–1.530 €/año. **Total ≈ 2.950–4.600 €.** Los planes anuales anuncian «hasta −52 %»; no está aplicado.

**Horas (estimación): 20–34 h** (desde hoy, **34–56 h**), más el trabajo manual de cada caso:
- flujos de Zapier: 6–10 h;
- módulo puente en el monolito, como la alternativa manual de Healthie (SKI2-172): 6–10 h;
- cableado: 3–5 h;
- pruebas: 2–4 h;
- guía para Aitor: 3–5 h.

**Riesgos.**
- **Dependencia:** es un producto de coaching, no clínico. Zapier es una pieza más y cobra por tarea.
- **Automatización:** incompleta.
- **Datos de salud:** la región y el DPA son Unknown.

**Qué tendría que aceptar EPI10.** Automatizar solo la entrada y los formularios, con los mensajes y el informe a mano, y negociar el DPA.

**Prueba de 1–2 h** (con el OK de Raúl; prueba gratuita de 14 días).
1. Antes, pregunta escrita: región de los datos y DPA.
2. Crear un contacto por Zapier y comprobar la invitación y el español de los correos.
3. Enviar un formulario y recibir el disparador.

Fuentes (2026-10-18): [precios y FAQ](https://simply.coach/pricing-for-solopreneurs/), [integraciones](https://simply.coach/business-management/integrations/), [seguridad](https://simply.coach/security/), [Zapier](https://zapier.com/apps/simplycoach/integrations).

### 2.5 Fuera de la lista corta

- **Odoo como portal (opción C): descartado.** Raúl, 18 oct: «ya hay portal propio sobre OpenEMR y Odoo no aporta nada encima». Odoo sigue como back office. El argumento de la web (2.2) va a otra parte del dossier. Allí, la caída del proveedor de la web va como «parece haberse caído», como dice el correo del 14 oct; no consta por escrito.
- **Knack:** excluye el art. 9 sin excepción (§2.3).
- **Tellescope** (EE. UU., nueva): API pública muy completa que cubre las 7 operaciones, portal de marca blanca en dominio propio y formularios traducibles. Pero no publica precio (implementación más tarifa por paciente) y su región y DPA son Unknown (lo probable es EE. UU.).
- **CoachAccountable** (EE. UU., nueva): API madura incluida en el plan (alta e invitación, acuerdo con firma, archivo compartido) por 120–250 $/mes. Interfaz en inglés, datos en Chicago y declara «NOT HIPAA compliant».
- **Carepatron** (NZ): el mejor puente manual en español, con DPA de la UE que cubre datos de salud. Su API sigue igual que el 2 oct (4 rutas, sin webhooks).
- **IntakeQ/PracticeQ** (Canadá, nueva): automatiza bien formularios y consentimientos, con datos en Canadá y DPA estándar. Mensajes y PDF a mano; 500 peticiones/día.
- **DriCloud** (España, nueva): español, Azure en Europa, firma remota y tienda online. Pero su API solo cubre pacientes y citas, sin webhooks: ≈ 2.810 € el año 1.

---

## 3. Comparación con el desarrollo propio, solo en cifras

Mismo formato para todas. Licencias en € y horas, todo estimación.
- **«Horas desde hoy»** = lo que falta hasta producción, sumadas las 14–22 h comunes (SKI2-173, 240 y parte de 241).
- **«Construcción (histórico)»** = lo que cuesta construir la opción desde cero. Sirve para comparar en igualdad, pero en el portal propio sobre OpenEMR ya está gastado.
- No incluye el bloque legal común (8–12 h en todas). Las opciones con datos fuera de la UE suman 2–4 h de evaluación de la transferencia.

| Opción | Año 1 | Año 2 | Año 3 | **Total 3 años** | **Horas desde hoy** | Construcción (histórico) | Mantenimiento h/año | Manual por caso |
|---|---|---|---|---|---|---|---|---|
| **Propio: portal sobre OpenEMR + módulo (vía 1, ya construido)** | 0–480 € | 0–480 € | 0–480 € | **≈ 0–1.440 €** | **39–62** | 52–76 (gastadas) | 24–48 | 0 |
| Healthie con API (línea base) | 7.440 € | 12.690 € | 23.170 € | **≈ 43.300 €** | 23–37 | — | 6–12 | 0 |
| Pabau | 1.370–2.050 € (ext.) | ídem | ídem | **≈ 4.100–6.200 € + marca (U)** | 69–107 | 55–85 | 6–12 | 0 (U) |
| Practice Better, sin API de pago | 985 € | 985 € | 985 € | **≥ 2.955 €** | ≥ 59 (U) | ≥ 45 (U) | 6–12 | 0 |
| Practice Better, API al estilo de Healthie | 985 € | 985–11.473 € | 6.229–21.961 € | **8.200–34.400 €** | ≥ 59 (U) | ≥ 45 (U) | 6–12 | 0 |
| Noloco con portal fino | 720 € | 720 € | 720 € | **≈ 2.150 €** | 68–107 | 54–85 | 6–12 | 0 |
| Simply.Coach + Zapier | 980–1.530 € | ídem | ídem | **≈ 2.950–4.600 €** | 34–56 | 20–34 | 6–12 | 5–10 min |
| Propio alternativo: portal en el monolito («botón rojo», SKI2-205, no elegido) | 60–240 € | 60–240 € | 60–240 € | **≈ 180–720 €** | 70–92 | 56–70 (60–76 con venta) | 12–24 | 0 |

**Cómo se calculan las horas desde hoy del propio sobre OpenEMR (39–62 h).** Linear no tiene estimaciones; estas son nuestras, a partir de cada issue:

| Issue | Qué falta | Horas |
|---|---|---|
| SKI2-239 | Contrato v1.1: fase única del caso, hitos por el monolito y republicar el informe | 10–16 h |
| SKI2-242 | OpenEMR reproducible: compose versionado, imagen fijada, ajustes de producción y *authorization code* | 8–12 h |
| SKI2-241 (parte) | Migrar el ensayo E2E al portal de OpenEMR | 3–5 h |
| SKI2-173 (parte) | Desplegar OpenEMR en el servidor de EPI10, además del monolito | 3–5 h |
| SKI2-268 | Integrar las ramas del kit, ya revisadas | 1–2 h |
| **Propias de OpenEMR** | | **25–40 h** |
| Comunes a todas las opciones | SKI2-173, 240 y parte de 241 | 14–22 h |

**Cómo se calcula el resto de filas.**
- **Healthie, 23–37 h desde hoy:**
  - 6–10 h para validar en el sandbox lo construido;
  - 6–10 h para el paso 3 del onboarding y el resumen del caso, que su módulo no tiene;
  - 11–17 h comunes, porque no hay que retirar Healthie.
- **Licencias:**
  - Healthie: Group con 2 clínicos (199 $/mes) más la API, a 475, 950 y 1.900 $/mes.
  - Portal propio sobre OpenEMR: 0 € en el servidor de EPI10, o DINAO Performance a 39,90 €/mes + IVA.
  - Botón rojo: 5–20 €/mes de correo transaccional en la UE.
- **Nota para el dossier:** cómo se presenta lo ya construido lo decide Raúl. El correo del 14 oct no lo menciona.

Lectura en tres frases:
1. **En licencias**, todas las plataformas de la lista corta cuestan bastante menos que Healthie con API, salvo Practice Better si su API acaba costando como la de Healthie. El portal propio sobre OpenEMR es el más barato.
2. **En horas desde hoy, ninguna plataforma ahorra frente a lo ya construido:**
   - Simply.Coach se queda en 34–56 h, frente a 39–62 h, solo porque deja mensajes e informe a mano.
   - Pabau y Noloco suman entre 6 y 68 h más que terminar OpenEMR. Practice Better, al menos lo mismo (Unknown).
   - **En mantenimiento**, una plataforma pide unas 20–35 h/año menos que operar OpenEMR.
3. **En riesgo**, las plataformas cambian horas por dependencia: un precio que puede cambiar (Practice Better ya lo ha anunciado), el idioma y dónde viven los datos genéticos.

---

## 4. Inventario completo

137 plataformas, una fila por plataforma. **Todas las fuentes se consultaron el 2026-10-18**, también las de cada fila. Se marca «terciaria» cuando no hubo fuente primaria.

**Recuento de «las 41 del 7 oct».**
- El research del 7 oct decía «36», pero sus tablas tienen 39 filas más InsideTracker.
- Aquí se suma Healthie como línea base: 41.
- Odoo como portal (la opción C de SKI2-204) va aparte.
- Hay 95 nuevas, 10 de ellas añadidas en la corrección.
- **Cuatro filas no se pudieron evaluar por falta de fuente:** Eugenomic, Medicapp, Dietbox e indya.

Leyenda de **Estado:**
- **D**: descartada.
- **N**: nueva.
- **N★**: nueva y en la lista corta.
- **D★**: descartada el 7 oct que sigue en la lista corta.
- **V**: vigente, la dirección actual.

En la columna «¿Se mantiene?»:
- **Sí**: el motivo del 7 oct sigue siendo cierto.
- **En parte**: algo ha cambiado, pero no basta.
- **No**: el motivo ya no vale.

Columna **2.2**: ✅ integra la web con la misma marca · ◐ en parte · — no.
Costes: años 1 / 2 / 3, en € para 2–3 personas (estimación), salvo donde se indica; U = Unknown.

### 4.1 Práctica clínica y bienestar (SaaS)

| Plataforma (sede) | Estado | Motivo del 7 oct · ¿se mantiene? | Concesión necesaria | Coste a1 / a2 / a3 | 2.2 | Fuente principal |
|---|---|---|---|---|---|---|
| Healthie (EE. UU.) | D (línea base) | API de pago, inglés, EE. UU. · **Sí**: la API sigue como complemento «Additional Fees Apply», sin precio público | Pagar la API | 7.440 / 12.690 / 23.170 | — | [precios](https://www.gethealthie.com/pricing) |
| Practice Better (CA) | D★ | Inglés, región U, API de pago tras la beta · **Sí, y peor**: datos en AWS EE. UU. | Inglés, EE. UU. y precio de API futuro | 985 / 985+API / 985+API | ◐ | [precios](https://practicebetter.io/pricing) |
| Carepatron (NZ) | D | API embrionaria, sin webhooks · **Sí**: spec del 2026-10-02 idéntica, 4 rutas | Puente manual (15–25 min/caso) | 515–1.030 / 1.030 / 1.030 | — | [OpenAPI](https://developer.carepatron.com/openapi.yaml) |
| Zanda (AU) | D | API beta de solo lectura · **Sí**: «Zanda API – coming soon» | Todo manual, sin chat | 405 / 540 / 540 | ◐ | [precios](https://www.zandahealth.com/pricing/) |
| Cliniko (AU) | D | Sin portal ni webhooks · **Sí** | Construir el portal igualmente | 960–1.050 ×3 (2–5 profesionales; 495 con 1) | — | [API](https://docs.api.cliniko.com/) |
| Jane (CA) | D | API solo para partners · **Sí**: la API no crea pacientes ni tiene formularios ni mensajes | Ser partner o todo manual | ≈ 790 / 790 / 790 | ✅ Jane Websites | [developers](https://developers.jane.app/) |
| SimplePractice (EE. UU.) | D | Sin API · **Sí**; además, solo USD y CAD | Todo manual, EE. UU. | ≈ 870 / 870 / 870 | ◐ | [precios](https://www.simplepractice.com/pricing/) |
| Halaxy (AU) | D | Sin docs públicas ni UE · **En parte**: ya hay docs, API UE (`eu-api.halaxy.com`) y webhooks, pero sin formularios, mensajes ni documentos | Formularios, mensajes y PDF a mano | U | U | [webhooks](https://developers.halaxy.com/docs/webhooks.md) |
| Pabau (UK) | N★ | No estaba | Producto de estética; sin ruta de invitación ni buzón por API; precio por demo; ES y región U | 1.370–2.050 ×3 (extrapolado, U) | ◐ | [API](https://documenter.getpostman.com/view/4391324/2sAYJAdxBb) |
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
| Owl Practice (CA) | N | No estaba | Inglés y francés; portal como extra; sin API conocida | ≈ 300–540 ×3 (terciaria) | — | [Capterra, terciaria](https://www.capterra.com/p/160519/OwlPractice/pricing/) |
| TherapyNotes (EE. UU.) | N | No estaba | Sin API pública oficial (solo una integración no oficial de terceros) | U | — | [Supergood, terciaria](https://docs.supergood.ai/therapynotes-api) |
| CharmHealth (EE. UU.) | N | No estaba | Programa de API, HL7 y FHIR; EE. UU.; webhooks y precio U | U | — | [Capterra, terciaria](https://www.capterra.in/compare/120340/129169/charm-ehr/vs/tebra) |
| Tebra / Kareo (EE. UU.) | N | No estaba | Portal y API citados sin detalle; mercado de EE. UU. | U | — | [GetApp, terciaria](https://www.getapp.co.uk/compare/102859/102863/tebra/vs/therapynotes-com) |

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
| Dietowin (ES) | N | No estaba | Programa de escritorio con nube; portal de paciente citado; sin API | U | — | [softwaredoit, terciaria](https://www.softwaredoit.es/dietowin/dietowin.html) |
| Nutrimind (MX/ES) | N | No estaba | Fuentes contradictorias sobre el portal; sin marca blanca ni API | U | — | [softwaredoit, terciaria](https://www.softwaredoit.es/nutrimind/nutrimind.html) |
| Ofimedic (ES) | N | No estaba | Portal de paciente y firma (Namirial); sin API pública; precio no publicado | U | — | [Namirial](https://www.namirial.com/de/partners/marketplace/ofimedic/) |
| Doctena (LU/DE) | N | No estaba | Agenda; la API de Okta es solo de identidad del personal | U | — | [Okta, terciaria](https://www.okta.com/integrations/doctena/) |
| Jameda (DE) | N | No estaba | Solo interfaces de agenda con software alemán | U | — | [Ärzte Zeitung, terciaria](https://www.aerztezeitung.de/Wirtschaft/jameda-und-medatixx-kooperieren-298080.html) |
| NutriSoft (EE. UU.) | N | No estaba | Programa de análisis nutricional, no portal | n/a | — | [directorio, terciaria](https://oldavista.com/dirs/business_and_economy/companies/health/software/personal_health/nutrition) |
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
| Odoo como portal (BE) | D | Opción C de SKI2-204 (7 oct) · **Sí**: Raúl, 18 oct, «ya hay portal propio sobre OpenEMR y Odoo no aporta nada encima». Sigue como back office | No aplica | Custom con 3 usuarios, precio completo: 1.004 / 1.220 / 1.220 (0 € si ya tiene la API) | ✅ | [precios](https://www.odoo.com/pricing-plan) |
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
| Knack (EE. UU., región UE a elegir) | N | No estaba | **Excluye el art. 9 sin excepción**, ni siquiera con el plan HIPAA; solo valdría una enmienda escrita. Frankfurt sin confirmar | 1.215 ×3 | — | [términos](https://www.knack.com/terms-of-service/) |
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
   - Knack los excluye **sin excepción**: su excepción HIPAA solo cubre la PHI de EE. UU., no el art. 9.
   - Xano los excluye salvo un «Health Data Agreement» aparte.
   - Lo desaconsejan: Softr, Plutio, Memberstack y Jotform.
   - Es un dato nuevo frente al 7 oct, cuando Softr quedó como mención sin esta comprobación.
2. **Las genéticas B2B2C no sirven como portal.** Todas entregan su propio test o motor. La más útil es **TellmeGen B2B**, como complemento: es gratuita y saca el PDF genético con el logo de EPI10.
   - Aviso nuevo: en España, los productos Advanced y ULTRA de TellmeGen «requieren prescripción médica previa». Hay que confirmar cuál usa EPI10.
3. **Venta adicional (R6) en España.**
   - Fullscript no envía a España (artículo actualizado el 4 sep 2026).
   - Siguen valiendo Stripe Checkout desde el orquestador (2–4 h) o la venta nativa de Pabau y Practice Better.
   - Systeme.io (Irlanda) sirve como web y tienda en la UE. Es un dato para la parte del dossier que trata la web (2.2), no para el portal.
4. **Complementos baratos en la UE.** Tally (Bélgica, 0–20 €/mes) para el consentimiento y la encuesta, con webhooks. Son útiles en cualquier opción con portal fino.
5. **Lo que no cambia.** A 18 oct no existe una plataforma en la UE con portal en español, API gratis y venta adicional para una pyme de nutrición. Pabau es la que más se acerca, y lo tiene que demostrar.
6. **Frente a lo ya construido**, ninguna plataforma ahorra horas hasta producción (§3).

---

## 6. Unknown, con quién y cómo se resuelven

| # | Unknown | Quién | Cómo |
|---|---|---|---|
| U1 | Pabau: precio de Team (2–3 usuarios) por sede y país, coste del complemento de marca (Marketing Plus) y si la API y los webhooks tienen coste | Raúl (demo pedida, SKI2-289) | Demo y presupuesto por escrito |
| U2 | Pabau: idioma del portal, de la app y de los correos | Raúl o el equipo, tras la demo | Tour público o demo; prueba de 1–2 h |
| U3 | Pabau: cómo se da el acceso al portal sin ruta de invitación, si los documentos subidos por API se ven en el portal, si hay buzón accesible por API y qué eventos tiene el webhook | El equipo, tras la demo | Prueba de 1–2 h en sandbox con la colección de Postman |
| U4 | Pabau: región UE garantizada por contrato, DPA de la UE (no solo UK GDPR) con SCC, y subencargados de EE. UU. | Raúl + abogado o DPD de EPI10 | Pregunta escrita y lectura del DPA |
| U5 | Practice Better: precio y fecha de la API tras la beta | Raúl o Carmen | Pregunta escrita |
| U6 | Back office de Aitor con otra plataforma: hoy se apoya en OpenEMR (resumen del caso y enlace a la pantalla de informes) | Equipo | Diseño breve si se elige una plataforma; no se ha estimado |
| U7 | Noloco: ¿acepta datos del art. 9 y firma un DPA? Knack: ¿aceptaría una enmienda del §3(a) para el art. 9 y en qué región de la UE (Frankfurt sin confirmar)? Softr no se pregunta: ya dice por escrito que no | Raúl | Pregunta escrita a Noloco; a Knack solo si se quiere insistir |
| U8 | Simply.Coach: región AWS y DPA; si «Create Contact» invita | Raúl | Pregunta escrita; prueba de 14 días con su OK |
| U9 | Tellescope: precio, región y DPA | Raúl | Pregunta escrita |
| U10 | TellmeGen: qué producto usa EPI10 (¿exige prescripción?) y si la marca blanca evita que la clienta reciba sus correos | Carmen | Pregunta a TellmeGen (EPI10 ya es cliente) |
| U11 | Horas consumidas de las 110 h | Raúl | Heredado de SKI2-205; condiciona cualquier opción |

**Lo que no bloquea este documento.** Ninguna prueba con cuenta es imprescindible para entregar la línea 2.1 (a). **Sí lo es para afirmar en el dossier que Pabau es viable:** hasta resolver U1–U3, tras la demo de SKI2-289, Pabau es «casi viable».

---

## 7. Limitaciones y lo que no se revisó

- El cupo de búsquedas web se agotó a mitad del trabajo en los cinco grupos. Desde ese punto, los datos salen de abrir directamente las páginas oficiales. Las cifras de terceros van marcadas.
- En la corrección volvió el cupo. Se añadieron 10 de las 17 pendientes: Dietowin, Nutrimind, Ofimedic, Doctena, Jameda, NutriSoft, Owl Practice, TherapyNotes, CharmHealth y Tebra. Todas son de fuente terciaria, y ninguna tiene API pública útil para el contrato.
- Varias páginas dieron 403 o solo cargan con JavaScript: los artículos de Practice Better (leídos en el extracto del buscador), el DPA de Softr, el portal de desarrolladores de Carepatron y las tablas de precios en imagen de Noloco y Softr.
- **No localizadas con ninguna fuente**, ni primaria ni terciaria (búsquedas del 18 oct sin resultados con esos nombres): Diet-Plan, Nutriboss, Esana, Halsa, Kenko, Satori y Livv Health. Las dos últimas tampoco resolvían DNS. Si alguien da el nombre exacto o la web, se revisan.
- Las horas son estimaciones a partir del contrato real (`contrato.ts` v1.2.0) y de lo construido para Healthie y OpenEMR. Ninguna plataforma se ha probado.
- Las horas desde hoy de OpenEMR salen de las descripciones de SKI2-239 a 242 y 173, que no tienen estimación en Linear.

## 8. Fuentes

Todas consultadas el **2026-10-18**. Las fuentes de cada plataforma están en su fila del inventario (§4) y en cada ficha de la lista corta (§2). Las que sostienen el veredicto:

- Pabau: [API en Postman](https://documenter.getpostman.com/view/4391324/2sAYJAdxBb), [Trust Centre](https://trust.pabau.com/), [precios](https://pabau.com/pricing/), [portal](https://pabau.com/es/funcionalidades/client-portal), [webhooks](https://support.pabau.com/en/pabau2/how-to-set-up-webhooks), [ToolRadar, terciaria](https://toolradar.com/tools/pabau/pricing), [Capterra, terciaria](https://www.capterra.com/p/140062/Pabau-CRM/pricing/).
- Practice Better: [precios](https://practicebetter.io/pricing), [residencia de datos](https://help.practicebetter.io/hc/en-us/articles/47681541627931-Practice-Better-Data-Residency) (extracto), [API beta](https://help.practicebetter.io/hc/en-us/articles/16637584053275-Getting-Started-with-the-Practice-Better-API-Beta) (extracto).
- Carepatron: [OpenAPI 2026-10-02](https://developer.carepatron.com/openapi.yaml), [DPA UE](https://www.carepatron.com/eu-data-processing-addendum), [precios](https://www.carepatron.com/pricing).
- Healthie: [precios](https://www.gethealthie.com/pricing), [formularios en español](https://help.gethealthie.com/article/1106-forms-available-in-spanish).
- Odoo (descartado como portal): [precios](https://www.odoo.com/pricing-plan).
- Knack (excluye el art. 9): [precios](https://www.knack.com/pricing/), [términos, §3(a) y §1(18)](https://www.knack.com/terms-of-service/). Noloco: [precios](https://noloco.io/pricing), [seguridad](https://noloco.io/security). Softr: [HIPAA](https://docs.softr.io/security/hipaa-compliance).
- Simply.Coach: [precios y FAQ](https://simply.coach/pricing-for-solopreneurs/), [Zapier](https://zapier.com/apps/simplycoach/integrations).
- OpenEMR: [releases](https://github.com/openemr/openemr/releases), [DINAO](https://dinao.com/en/conteneur/openemr).
- Prohibiciones del art. 9: [Glide](https://www.glideapps.com/legal/user-data), [Bubble DPA](https://bubble.io/dpa), [Budibase](https://budibase.com/terms/), [Plutio DPA](https://www.plutio.com/legal/data-processing-agreement).
- Venta en España: [Fullscript, envíos](https://support.fullscript.com/articles/eligible-shipping-addresses).
- TellmeGen: [plataforma B2B](https://www.tellmegen.com/plataforma-b2b), [privacidad](https://www.tellmegen.com/politica-de-privacidad).
- Añadidas en la corrección (terciarias): [Dietowin](https://www.softwaredoit.es/dietowin/dietowin.html), [Nutrimind](https://www.softwaredoit.es/nutrimind/nutrimind.html), [Ofimedic](https://www.namirial.com/de/partners/marketplace/ofimedic/), [Doctena](https://www.okta.com/integrations/doctena/), [Jameda](https://www.aerztezeitung.de/Wirtschaft/jameda-und-medatixx-kooperieren-298080.html), [Owl Practice](https://www.capterra.com/p/160519/OwlPractice/pricing/), [TherapyNotes](https://docs.supergood.ai/therapynotes-api), [CharmHealth y Tebra](https://www.capterra.in/compare/120340/129169/charm-ehr/vs/tebra).
- Referencias internas: Healthie 475/950/1.900 $/mes (correo del 7 oct, `../healthie/2026-10-07_noticias_healthie_v1.md`); botón rojo (SKI2-205, §7.1); OpenEMR vía 1 (SKI2-207); horas desde hoy (SKI2-239, 240, 241, 242 y 173); decisiones de Raúl (comentario en SKI2-288, 18 oct); revisión independiente (`05_scratch/ski2-288/revision_v1.md`, repo principal).

## Siguiente paso

1. Hecho: revisión independiente («apto con cambios») y correcciones aplicadas (B1, I1–I4 y los menores M1–M9).
2. Demo de Pabau (SKI2-289, la pide Raúl). Después, la prueba de 1–2 h para U1–U3.
3. Si Raúl autoriza las preguntas escritas: Practice Better (U5) y Noloco (U7).
4. El dossier del 21 pone esta línea 2.1 (a) junto a la 2.1 (b) con el cuadro del §3.
