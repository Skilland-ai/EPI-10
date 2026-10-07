# Research: plataformas alternativas a Healthie con API gratis o barata (v1)

Fecha: 2026-10-07 · Linear: SKI2-206 (opción D de la crisis de Healthie, SKI2-204) · Estado: **investigación terminada, pendiente de decisión de Raúl**
Contexto: [noticias de Healthie 7 oct](../healthie/2026-10-07_noticias_healthie_v1.md) · [journey v2](../journey/2026-10-03_customer_journey_mvp_v2.md) (test mixto desde el 4 oct, SKI2-186) · [ADR del orquestador](../integracion/2026-10-03_adr_orquestador_v1.md) · [contrato de Healthie](../healthie/2026-10-03_contrato_api_healthie_v1.md) · [arquitectura del portal propio, SKI2-205](2026-10-07_arquitectura_boton_rojo_v1.md) · monolito `Skilland-ai/epi10-orquestador`

**Qué es este documento.** Busca una plataforma que sustituya a Healthie como portal del cliente y back office, con API y webhooks gratis o baratos. Compara 36 plataformas (nutrición, práctica clínica, EHR, código abierto, portales genéricos y software español), da las tres mejores con su coste total y lo que cambiaría en el monolito, y las compara con construir el portal propio (SKI2-205).

**Fecha de consulta de todas las fuentes: 2026-10-07.** Lo que no se encontró en una fuente primaria se marca **Unknown**. Las inferencias van marcadas. Las horas son estimaciones nuestras, no compromisos. No se ha probado ninguna plataforma: todo es documentación pública y páginas de precios.

## Resumen en cinco líneas

1. **Ninguna plataforma cumple a la vez los cuatro requisitos de Raúl:** portal en español con marca propia, automatizable por API y webhooks sin coste, datos de salud en la UE y venta adicional. Cada candidata falla en al menos un eje crítico.
2. **InsideTracker, lo que propuso Carmen, no sirve:** es un servicio de análisis de sangre y ADN para consumidores de EE. UU., sin API pública, sin formularios propios, sin chat y sin venta de productos ajenos. Se confirma la sospecha.
3. **Las tres mejores, cada una con una pega grave:** Practice Better (API de escritura y webhooks gratis hoy, pero portal en inglés, datos fuera de la UE y **precio de la API anunciado para después de la beta**, el mismo patrón de Healthie); Carepatron (portal en español barato o gratis, pero su API solo exporta contactos y no tiene webhooks: hoy no automatiza nada); OpenEMR autoalojado (portal en español, consentimiento con firma, chat, PDF y API FHIR gratis en el servidor de EPI10, pero sin webhooks, con interfaz anticuada y sin tienda).
4. **La única opción con API gratis y datos en la UE que automatiza el journey es OpenEMR**, y solo si se acepta su estética y entre 35 y 65 h de integración. Es comparable en horas al portal propio (56–70 h) y peor en experiencia del cliente.
5. **Veredicto:** la opción D no resuelve la crisis con menos horas ni menos riesgo que la B. Si Raúl prioriza automatizar en español y en la UE, el portal propio es la mejor salida. La opción D solo tiene sentido como **puente barato** mientras se construye: Carepatron Free o Plus a mano (en español) sustituye a Healthie a mano con mejor experiencia, o Practice Better si se acepta inglés y datos en Norteamérica a cambio de automatización inmediata.

---

## 1. Qué pedimos a la plataforma

Criterio de Raúl (SKI2-204, 7 oct) y lo que el monolito usaba de Healthie (contrato v1):

| # | Requisito | Qué hacía Healthie | Peso |
|---|---|---|---|
| R1 | Portal o app del cliente, en español y con marca EPI10 | Portal y app, solo en inglés en botones y correos, marca Healthie en el plan Group | Crítico |
| R2 | Entrada tras pagar en Stripe sin pasos manuales | `createClient` por API + invitación automática | Crítico (la hipótesis es automatizar) |
| R3 | Consentimiento y encuesta de hábitos | Intake flow de onboarding, aviso por webhook al completarse (D3) | Crítico |
| R4 | Chat con el equipo | Conversaciones y notas por API, 4 mensajes de hito | Alto |
| R5 | Ver el informe en PDF | `createDocument` compartido con el cliente | Crítico |
| R6 | Venta adicional | Fuera de Fase 1 en el journey; Raúl lo pide ahora | Medio |
| R7 | Back office para Aitor y Carmen | Healthie para el cliente, Odoo para el equipo | Medio (Odoo ya lo cubre) |
| R8 | API y webhooks gratis o baratos | 475 → 950 → 1.900 $/mes | Crítico |
| R9 | Datos de salud y genéticos en la UE, con DPA | EE. UU., DPA sin respuesta | Alto |
| R10 | Precio total para 2–3 personas asumible | Group contratado, puesto extra 50 $/mes | Alto |
| R11 | Madurez y riesgo de cambios de precio | Acaba de pasar | Alto |

La cita presencial (D4) es opcional desde el 4 oct (SKI2-186), así que la agenda deja de ser requisito.

## 2. InsideTracker (propuesta de Carmen)

**Veredicto: descartada.** Es un producto para consumidores, no una plataforma para profesionales.

| Punto | Comprobado |
|---|---|
| Qué es | Segterra, Inc. (Cambridge, MA, 2009). Análisis de biomarcadores en sangre, ADN y wearables con recomendaciones de nutrición, vendido al consumidor final. En 2026 lanzó «Terra», una oferta B2B solo por formulario de contacto. |
| Portal del cliente | Es *su* app para *sus* clientes. No hay portal configurable, ni white label publicado, ni idioma español documentado. |
| Formularios, consentimiento, chat, PDF propio | No existen como funciones para un profesional. Hay un «Coach Dashboard» de solo lectura de resultados. |
| Venta adicional | Solo su propia tienda. |
| API y webhooks | Ninguna API pública ni documentación. |
| Datos | EE. UU. Las extracciones de sangre y el servicio de ADN son solo para EE. UU. «por leyes de privacidad de datos». |
| Precio para profesionales | No publicado («Book demo»). |

Fuentes: [insidetracker.com](https://www.insidetracker.com/), [enterprise.insidetracker.com](https://enterprise.insidetracker.com/), [profesionales](https://info.insidetracker.com/professionals), [restricciones internacionales](https://support.insidetracker.com/en-US/articles/international-84907), [nota sobre Terra](https://insider.fitt.co/?p=31404).

Lo más parecido a lo que Carmen quizá tenía en mente (un servicio que entrega resultados personalizados al consumidor) es exactamente lo que EPI10 quiere construir para sí misma, no una herramienta para hacerlo.

## 3. Matriz comparativa

Leyenda: ✅ sí · ❌ no · ◐ parcial · **U** Unknown. «API» indica si una pyme puede usarla hoy, con su precio y el plan necesario. «€/mes» es el plan mínimo que cubre portal, formularios, chat y API para 2–3 personas, en la moneda publicada. Conversión orientativa: 1 $ ≈ 0,92 €.

### 3.1 Práctica clínica y bienestar

| Plataforma (sede) | Portal cliente / español | Consent. + formularios | Chat | Docs PDF | Venta | Back office | API y webhooks (precio, plan) | Marca propia | UE, DPA, RGPD | €/mes 2–3 pers. | Madurez y riesgo |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Carepatron** (NZ, 2021) | ✅ web + app; idioma por cliente, incluye ES (alcance exacto a verificar) | ✅ firma y formularios, desde Free | ✅ desde Free | ✅ | ◐ pagos sí; tienda **U**/no | ✅ | API pública (30 ago 2026) **solo en Advanced** (39 $/usuario); la spec del 2 oct solo tiene `ping` y exportación de contactos; **sin webhooks**; 0 $ por llamada | Branding en Plus; white label en Advanced | AWS y GCP, región «según requisitos locales», sin UE explícita; DPA UE con SCC; SOC 2; sin ISO 27001 | 0 $ (Free) a 117 $ (Advanced ×3) | Seed 7 M$, promos permanentes; **API embrionaria** |
| **Practice Better** (CA, 2016) | ✅ web + app; **interfaz solo en inglés**, campos editables en ES | ✅ con firma, todos los planes | ✅ | ✅ | ✅ packages y programas con Stripe | ✅ | **REST lectura y escritura + webhooks HMAC, 0 $ en beta pública**; requiere plan de pago y pedir el add-on; «pricing … will be introduced … once the beta period has concluded»; docs solo tras activar | «Custom branding»; plan **U** | GDPR «compliant», DPA; **región de alojamiento U** (inferencia: Canadá/EE. UU.) | 109–119 $ (Plus + admins) a 205–255 $ (Team) | 27 M$ + 13 M$ deuda; **la API pasará a ser de pago, precio no anunciado** |
| **Zanda** (AU, 2010) | ◐ portal web con marca, sin app; ES **U** (solo fuente terciaria) | ✅ | ❌ in-app (SMS y email) | ✅ | ◐ Stripe y facturas | ✅ | API REST **beta, solo lectura, inscripción cerrada**; sin webhooks; coste no publicado | ✅ ambos planes | AWS Londres, Virginia o Sídney; **ISO 27001**; DPA con SCC | 48–67 € | Autofinanciada, estable; API inmadura |
| **Cliniko** (AU, 2011) | ❌ **sin portal ni app**, solo reservas; inglés | ✅ por enlace | ❌ | ◐ PDF por correo | ◐ Stripe en reservas | ✅ | **API REST gratis, autoservicio, docs públicas**, 200 req/min; **sin webhooks** (polling) | ◐ | **Irlanda (UE)**; DPA con SCC; AWS ISO 27001 | 45 $ (1 prof.) / 95 $ (2–5) | 15 años, independiente; riesgo bajo |
| Jane (CA) | ✅ web; idiomas incluyen ES | ✅ | ✅ | **U** | ◐ Jane Payments | ✅ | Solo para partners aprobados; webhooks en docs; precio **U** | ◐ | Datos UE en **Reino Unido**; DPA; SOC 2 | ≈79 CAD + extras | API cerrada |
| SimplePractice (EE. UU.) | ✅ web en ES mexicano (nov 2025) | ✅ | Essential+ | ✅ | ◐ propio | ✅ | **Ninguna** | **U** | EE. UU.; RGPD **U** | ≈247 $ | Sin API: descartada |
| Halaxy (AU) | ◐ premium; ES **U** | ✅ | ✅ (créditos) | **U** | ◐ comisión | ✅ | Add-on por créditos (≈4–6 AUD/mes); **docs públicas no encontradas**; webhooks **U** | ✅ | **Solo Australia**; sin DPA publicado | ≈0 + créditos | Opaca en RGPD y API |

### 3.2 Nutrición

| Plataforma (sede) | Portal cliente / español | Consent. + formularios | Chat | Docs PDF | Venta | Back office | API y webhooks | Marca propia | UE, DPA, RGPD | €/mes 2–3 pers. | Madurez y riesgo |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Nutrium** (PT, 2015) | ✅ app en 7 idiomas, ES | ◐ anamnesis personalizable; firma **U** | ✅ | ◐ adjuntos | ◐ pagos; sin tienda | ✅ | **Ninguna** (ni Zapier) | **U** | **Servidores en Europa**, DPA, DPO | 78–117 € | Serie A 2025; riesgo bajo |
| Dietopro (ES, Valencia) | ✅ app ES/EN | ✅ entrevista + consentimiento de datos | ✅ | ◐ informes | ❌ | ◐ | **Ninguna** | **U** | ES, sin transferencias internacionales | 60–240 € | Negocio unipersonal |
| indya (ES, Valencia) | ✅ app multilingüe; white label solo >100 clientes/mes | ◐ anamnesis; firma **U** | ✅ | ◐ | **U** | ◐ | **Ninguna** | ◐ | RGPD declarado; hosting **U** | 49 € + IVA (10 clientes) | Startup pequeña |
| Kalix (AU) | ◐ desde 47 $; ES **U** | ✅ firma | ✅ | ✅ | ◐ Stripe | ✅ | **Solo Enterprise, 846 $/mes**; Zapier solo triggers | Enterprise | **Azure EE. UU.**; DPA | 94–141 $ | API inaccesible |
| NutriAdmin (UK) | ◐ portal web con marca; ES **U** | ✅ cuestionarios; firma **U** | ❌ | ✅ | ◐ Stripe | ✅ | No documentada; sin Zapier | ✅ | UK; región **U** | Business sin precio público | Opaca |
| Cronometer Pro (CA) | ◐ app ES, sin white label | ❌ | ✅ | ❌ | ❌ | ◐ | Solo socios y Enterprise | ❌ | EE. UU. | 40 $ + 2,50 $/cliente | No es un portal |
| Dietbox (BR), That Clean Life (CA), i-Diet (ES) | Sin API; Dietbox sin RGPD verificable, TCL es solo menús, i-Diet sin portal | | | | | | **Ninguna** | | | | Descartadas |

### 3.3 EHR programables y código abierto

| Plataforma (sede, licencia) | Portal cliente / español | Consent. + formularios | Chat | Docs PDF | Venta | Back office | API y webhooks | Marca propia | UE, DPA, RGPD | €/mes 2–3 pers. | Madurez y riesgo |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **OpenEMR** (EE. UU., GPL-3, 2001) | ✅ portal web nativo; **ES de España y ES latino** entre ~100 idiomas (calidad a revisar); sin app; UI anticuada | ✅ plantillas de consentimiento con **firma dibujada**; cuestionarios **FHIR Questionnaire** en el portal (runtime nativo desde 8.2, jul 2026) | ✅ mensajería y chat seguros | ✅ | ◐ pago de facturas (Stripe); sin tienda | ✅ completo (sobra) | **REST + FHIR R4 gratis** con OAuth2; **sin webhooks salientes** (polling o módulo PHP) | ◐ logos y CSS | **Autoalojado en el servidor de EPI10 (UE)**, sin DPA de terceros; gestionado en Francia (DINAO) 19,90–39,90 €/mes | 0 € autoalojado | 25 años, releases mensuales; riesgo de «sobrepeso» y estética |
| **Medplum** (EE. UU., Apache-2, 2021) | ❌ **sin portal producto**: starters en inglés, sin i18n | ◐ componentes | ◐ componentes | ◐ API | ❌ | ◐ consola de datos | FHIR + GraphQL + Subscriptions + Bots; **autoalojado gratis**; cloud Free sin bots | ✅ (es tu código) | Autoalojado UE sí; cloud EE. UU.; DPA **U** | 0 € autoalojado / 2.000 $ cloud | 80–150 h para el portal (estimación) |
| Oystehr / Ottehr (EE. UU.) | ✅ web intake con **ES** (i18n) | ✅ FHIR Questionnaire, textos HIPAA | ◐ SMS y salas | ◐ | ◐ Stripe por visita | ◐ urgent care | FHIR + Zambdas; uso ≈30–50 $; producción con datos reales exige BAA y plan ≥ 1.000 $/mes (a confirmar) | ◐ licencia exige atribución | **Solo nube EE. UU.**, sin DPA | 90–900 € | Licencia no OSI; backend propietario |
| Canvas Medical (EE. UU.) | ✅ web; ES **U** | ✅ | ✅ | ✅ | ◐ Stripe | ✅ | FHIR + plugins, llamadas ilimitadas, sandbox gratis | ◐ | AWS us-east-1; sin UE | **4.000 $** | Prohibitivo |
| Elation (EE. UU.) | ✅ app con **ES** | ✅ firma | ✅ | ✅ | ◐ Stripe 3,25 % | ✅ | REST + FHIR + webhooks; precio «upon request» | **U** | EE. UU.; RGPD **U** | 700–1.500 $ + API | Opaco, solo EE. UU. |
| Akute Health (EE. UU.) | ✅ app; ES **U** | ◐ sin firma nativa | ✅ | ✅ | ◐ | ✅ | Solo plan Developer, precio no público | **U** | EE. UU.; RGPD no mencionado | ≥ 550 $ | 4 personas |
| Fasten Health, GNU Health, Bahmni, HospitalRun, OpenMRS, LibreHealth, Juno | Fasten es un agregador personal («designed for families, not clinics»); GNU Health no tiene portal web ni app Android; Bahmni tiene un portal en prueba de concepto; HospitalRun está archivado; OpenMRS y Juno sin portal abierto | | | | | | | | | | Descartadas |

### 3.4 Portales de cliente genéricos (no sanitarios)

| Plataforma (sede) | Portal cliente / español | Consent. + formularios | Chat | Docs PDF | Venta | Back office | API y webhooks | Marca propia | UE, DPA, RGPD, datos de salud | €/mes 2–3 pers. | Madurez y riesgo |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Softr** (DE, 2020) | ◐ web y PWA; **sin idioma de interfaz**, textos propios en ES | ✅ formularios con **firma dibujada** (Pro) | ◐ comentarios por registro, sin tiempo real | ✅ | ✅ **Stripe Checkout nativo** | ◐ vistas internas | **Users API (magic link) + Database API + webhooks y «Call API» desde Pro, incluido**; 40 req/s | ✅ dominio propio | **Alemania**; SOC 2; DPA **U**; **PHI no mencionado** | 99–119 $ (Pro, 50 clientes, +1 $/cliente hasta 250) | Topes duros de clientes; ES manual |
| **Assembly** (ex Copilot, EE. UU.) | ◐ web; **solo inglés** («roadmap») | ✅ firma propia + formularios | ✅ | ✅ | ❌ **cobros solo US, UK, CA, AU**; sin Stripe propio | ✅ | **La más completa: REST + webhooks firmados desde Starter (29 $)**; 2.000 req/día | ✅ desde Professional | EE. UU.; DPA a petición; **BAA solo Advanced 499 $** | 99 $ (Professional, 3 usuarios) | 3 renombres en 5 años |
| **SuiteDash** (EE. UU.) | ✅ traducible con Translations Toolkit; PWA | ✅ ambos desde Start | ✅ (en vivo desde Thrive) | ✅ | ✅ **tu Stripe en EUR** | ✅ usuarios ilimitados | API solo contactos y empresas (400–20.000 llamadas/mes); webhooks de formularios **solo Pinnacle 99 $** | ✅ todos los planes | EE. UU. + DPF; **PHI sin BAA = incumplimiento**, BAA a petición | 19 $ (Start) a 99 $ (Pinnacle) | UI compleja, lifetime deals |
| Clinked (UK) | ✅ nativo ES, app | ❌ formularios (Jotform); firma vía DocuSign | ✅ | ✅ | ❌ | ◐ | API pública (chat, archivos); **sin webhooks** | ✅ | **Irlanda**, DPA público, **ISO 27001**; PHI **U** | 33 $ (25 miembros incl. clientes) a 239 $ | Precio por miembro |
| Moxo (EE. UU.) | ✅ app nativa, 22 idiomas | ✅ | ✅ | ✅ | ◐ | ✅ | **Solo plan Scale a medida**; docs tras login | Enterprise | EE. UU.; PHI **U** | ≥ 417 $ (5.000 $/año, 100 flujos) | Fuera de escala |

### 3.5 Software clínico español y europeo

| Plataforma (sede) | Portal cliente / español | Consent. + formularios | Chat | Docs PDF | Venta | Back office | API y webhooks | Marca propia | UE, DPA, RGPD | €/mes 2–3 pers. | Madurez y riesgo |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Clinic Cloud (ES, Docplanner) | ◐ vía Doctoralia, marca Doctoralia | ✅ firma simple remota por email (Mini); cuestionarios a distancia **U** | ❌ | ◐ | ◐ TPV y PayPal, sin Stripe | ✅ | **Ninguna** | ❌ | UE (AWS), DPO | 49–79 € + IVA | Absorbida por Docplanner |
| Medesk (UK) | ✅ white label en Pro | ✅ cuestionarios pre-cita; firma **U** | **U** | **U** | ◐ Stripe | ✅ | Probable, **sin docs públicas** (readthedocs 404) | ✅ | Reino Unido; DPA | 0–50 $ | API no verificable |
| Doctoralia / Docplanner (ES) | ✅ marca Doctoralia | ◐ check-in | ✅ | ✅ | ◐ pago de cita | ✅ | Solo agenda y **solo para proveedores de software** | ❌ | UE, ISO 27001 | 178–387 € | Marketplace, caro |
| MN program (ES) | ✅ | Premium / Enterprise | ❌ | ◐ | **U** | ✅ | SOAP sin webhooks, precio **U** | **U** | UE | **U** (≥ 30 €) | API heredada |
| Docline (ES) | ✅ marca blanca | ◐ custodia | ✅ | ✅ | ◐ Stripe | ✅ | «Apificado» **sin docs ni precio** | ✅ | UE (DE, NL) | **U** (enterprise) | Fuera del ticket de una pyme |

## 4. Las tres mejores, con coste total y cambios en el monolito

Ninguna de las tres cumple R1, R2, R8 y R9 a la vez. Se ordenan por lo que más pesa en el criterio de Raúl: automatizar.

### 4.1 Practice Better: automatiza hoy, en inglés, con precio de API por anunciar

**Por qué entra.** Es la única plataforma comercial de la lista con API de escritura (crear e invitar clientes, enviar formularios), webhooks firmados y coste cero hoy. Cubre portal, app, consentimiento con firma, chat, PDF y venta de «packages» con Stripe. Es el sustituto funcional más directo de Healthie.

**Por qué no convence.** La interfaz del portal es solo en inglés (menús, botones, correos de sistema); el español solo entra en lo que escribamos nosotros. El alojamiento no está publicado y con toda probabilidad está en Norteamérica: datos genéticos fuera de la UE con DPA y cláusulas tipo. Y el aviso oficial dice que la API tendrá precio para todos los clientes cuando acabe la beta: es el mismo riesgo que acaba de estallar con Healthie, con la diferencia de que hoy no hay nada que pagar.

**Coste total.**

| Concepto | Importe |
|---|---|
| Plataforma, 1 practitioner + 2 admins (Plus) | 109–119 $/mes ≈ 100–110 €/mes |
| Plataforma, 3 practitioners (Team) | 205–255 $/mes |
| API en beta | 0 $/mes; después **Unknown** |
| Horas de integración (estimación) | 25–40 h: cliente REST, 5 operaciones, receptor de webhooks, adaptación del publicador de informes y del ensayo E2E |
| Primer año (Plus, API gratis) | ≈ 1.300 € + horas |

**Qué cambiaría en el monolito.** Poco en estructura, bastante en código.

- Nuevo módulo que sustituye al de Healthie detrás de la misma interfaz: cliente REST en lugar de GraphQL; alta e invitación; «enviar formulario» en lugar de «asignar grupo»; mensaje; subida del PDF. Los trabajos del outbox (`create_client`, `send_message`, `set_group`, publicador de informes) cambian de implementación, no de contrato.
- Receptor de webhooks nuevo (firma HMAC con cabecera propia) y, como con Healthie, trabajo de relectura por caso.
- Los «grupos» de Healthie desaparecen: el estado del caso lo lleva el `core`.
- La alternativa manual (SKI2-172) se reescribe para Practice Better.
- Riesgo técnico: la documentación de la API solo se ve tras activar el add-on. Hay que pedirlo antes de estimar en serio.

### 4.2 Carepatron: el mejor portal en español, sin automatización

**Por qué entra.** Portal web y app con idioma por cliente (incluido el español), consentimiento con firma, formularios, chat y documentos desde el plan gratuito. Branding en Plus (31 $/usuario) y white label en Advanced (39 $/usuario). Es, con diferencia, la mejor experiencia en español a menos coste.

**Por qué no convence.** Su API pública se lanzó el 30 de agosto de 2026 y, comprobado en la spec del 2 de octubre, solo tiene cuatro rutas: ping, ping seguro, lanzar una exportación de contactos y consultar o borrar ese trabajo. No crea clientes, no envía formularios, no lee respuestas y no hay webhooks. Solo en Advanced. Hoy no permite automatizar nada del journey.

**Coste total.**

| Concepto | Importe |
|---|---|
| Free (portal, formularios, chat, sin marca) | 0 $/mes |
| Plus ×3 (branding) | 93 $/mes ≈ 86 €/mes (promo actual 50 %) |
| Advanced ×3 (white label + API) | 117 $/mes |
| Horas (estimación) | 10–15 h: adaptar la alternativa manual, textos, publicador manual del informe y guía para Aitor |
| Primer año (Plus) | ≈ 1.030 € + horas |

**Qué cambiaría en el monolito.** El módulo de Healthie se desactiva y todo el tramo del cliente pasa a la **vía manual** ya construida: actividad en Odoo «alta en Carepatron» tras el pago, «subir el informe a Carepatron» tras validar, y mensajes de hito que Aitor envía desde el chat de Carepatron. Unas 6–8 tareas manuales por caso, como en la opción A, pero en español y sin correos restringidos. Cuando la API crezca (Carepatron dice «more endpoints are coming»), se construye el módulo. **No cumple la hipótesis de automatizar**; es un puente.

### 4.3 OpenEMR autoalojado: todo gratis y en la UE, a costa de la experiencia

**Por qué entra.** Es la única opción que cumple a la vez API gratis y datos en la UE con un portal ya hecho: portal del paciente nativo en español (de España y latino), plantillas de consentimiento con firma dibujada, cuestionarios FHIR que el paciente rellena en el portal, mensajería y chat seguros, descarga de documentos, pago de facturas con Stripe, y API REST y FHIR R4 con OAuth2 incluidas. Se despliega como dos contenedores más en el Docker Compose del servidor de EPI10, con lo que no hay encargado nuevo ni transferencia internacional. Licencia GPL, 25 años de proyecto, releases mensuales en 2026.

**Por qué no convence.** La interfaz del portal es de otra época y no se parece a la app con marca que pide Raúl; la calidad de la traducción al español es irregular según hilos de la comunidad; no hay app móvil; no hay webhooks salientes (habría que consultar cada pocos minutos o escribir un módulo PHP); no hay tienda, así que la venta adicional seguiría en Stripe fuera del portal; y es un EHR completo, con mucho que ocultar para que Aitor no se pierda.

**Coste total.**

| Concepto | Importe |
|---|---|
| Licencia y alojamiento (mismo servidor) | 0 €/mes; gestionado en Francia 19,90–39,90 €/mes si no cabe en el servidor |
| Horas (estimación del investigador, sin probar) | 35–65 h: 8–15 de despliegue, 10–20 de configuración del portal (consentimiento, cuestionario, Stripe, revisión del español), 15–30 de integración FHIR con el monolito |
| Personalización visual | No incluida; **Unknown** |
| Primer año | ≈ 0–480 € + horas |

**Qué cambiaría en el monolito.** Módulo nuevo tipo FHIR en lugar del de Healthie: `Patient` con credenciales del portal, `Questionnaire` asignado, `Communication` para los mensajes, `DocumentReference` para el informe. Sin webhooks: el trabajo de reconciliación periódica que ya existe para Healthie (`healthie.reconcile`) pasa a ser la vía principal, con intervalo corto. Hay que sumar la operación de un tercer sistema en el servidor del cliente (copias, actualizaciones, permisos) además de Odoo y el monolito.

### 4.4 Menciones

- **Softr** (Alemania): la mejor relación API y precio entre los portales genéricos (magic link por API, formularios con firma, webhook al enviar, Stripe nativo, hosting en Alemania) por unos 99 $/mes. No es sanitaria, no dice nada de datos de salud, el chat son comentarios y el español se escribe a mano. Candidata si se descarta construir el portal y se quiere algo «montable» en 20–30 h; haría falta DPA y confirmación escrita sobre datos de salud.
- **Cliniko** (Irlanda, API gratis y documentada, 15 años): excelente como back office con API gratis, pero sin portal, sin chat y en inglés. Solo serviría combinado con un portal propio, y Odoo ya cubre ese papel.
- **Nutrium** (Portugal): la mejor en español y RGPD del nicho de nutrición, pero sin ninguna API ni webhooks. Alternativa a Carepatron como puente manual si se prefiere un producto de nutrición.

## 5. Comparación con el portal propio (opción B, SKI2-205)

El documento de SKI2-205 estima el portal propio en **56–70 h de MVP más 8–12 h legales**, sin coste mensual salvo el correo transaccional. Con esa referencia:

| Criterio | Portal propio (B) | Practice Better | Carepatron (puente) | OpenEMR |
|---|---|---|---|---|
| Español y marca EPI10 | ✅ total | ❌ interfaz en inglés | ✅ (white label en Advanced) | ◐ traducción irregular, estética antigua |
| Automatización desde el monolito | ✅ nativa, sin API externa | ✅ hoy | ❌ manual | ✅ por polling |
| Datos de salud en la UE | ✅ servidor de EPI10 | ❌ (DPA + SCC) | ❌ región no explícita (DPA + SCC) | ✅ servidor de EPI10 |
| Venta adicional | ✅ Checkout de Stripe en el portal | ✅ packages | ◐ pagos, sin tienda | ◐ fuera del portal |
| Chat | ✅ hilo sin tiempo real | ✅ | ✅ | ✅ |
| Coste mensual | ≈ 0–10 € | 100–235 € + API futura | 0–108 € | 0–40 € |
| Horas (estimación) | 56–70 + 8–12 legales | 25–40 | 10–15 | 35–65 |
| Riesgo de precio del proveedor | Ninguno | **Alto** (anunciado) | Medio | Ninguno |
| Riesgo RGPD | Pasa a tratar datos de salud en infraestructura propia: EIPD, cifrado, retención | Encargado fuera de la UE con datos genéticos | Igual | Infraestructura propia, como B |
| Dependencia | Mantenimiento nuestro | Roadmap y precios de un tercero | Roadmap de un tercero | Operar un tercer sistema |

Dos observaciones honestas:

1. **El argumento «con el portal propio pasamos a guardar datos de salud» no desaparece con una plataforma.** Con cualquier SaaS, EPI10 sigue siendo responsable del tratamiento y los datos van a un encargado, casi siempre fuera de la UE, con DPA y cláusulas tipo que Healthie nunca llegó a enviar. La EIPD hacía falta igual con Healthie. La diferencia real es dónde está la carga: seguridad de un sistema propio frente a contratos y transferencias con un tercero.
2. **La opción D no ahorra horas de forma clara.** Practice Better ahorra entre 20 y 40 h frente al portal propio a cambio de inglés, datos fuera de la UE y un precio de API pendiente. OpenEMR está en el mismo orden de horas que el portal propio con peor resultado. Carepatron ahorra casi todas las horas, pero porque renuncia a automatizar.

## 6. Veredicto

**Ninguna plataforma encaja del todo.** Lo decimos sin rodeos porque la pregunta de SKI2-206 era si existe una salida barata y automatizable que mantenga el español y los datos en la UE, y no la hay a 7 de octubre de 2026.

Recomendación, por orden:

1. **Si Raúl mantiene los cuatro requisitos (español, automatizar, UE, venta), la mejor salida es el portal propio (B).** La opción D no lo supera en ningún eje salvo en horas, y solo en el caso de Practice Better.
2. **Puente mientras se construye B:** Carepatron Free o Plus a mano. Reemplaza a «Healthie a mano» con portal en español, consentimiento, formularios y chat, sin correos restringidos, por 0–86 €/mes. Mismo trabajo manual por caso que la opción A; mejor experiencia del cliente. Antes de meter un dato real: DPA firmado y confirmación escrita de la región de alojamiento.
3. **Si Raúl acepta inglés en el portal y datos en Norteamérica a cambio de automatizar ya:** Practice Better Plus, pidiendo el add-on de API hoy y preguntando por escrito el precio previsto tras la beta y la región de los datos. Con un precio de API al estilo de Healthie, esta opción muere igual.
4. **OpenEMR solo si se prioriza «todo gratis y en la UE» por encima de la experiencia del cliente.** Recomendamos probar su demo pública en español antes de descartarlo del todo; cuesta media hora.

## 7. Unknown y comprobaciones pendientes

| # | Unknown | Quién lo resuelve | Cómo |
|---|---|---|---|
| U1 | Precio de la API de Practice Better tras la beta y región de alojamiento | Practice Better | Pedir el add-on y preguntar por escrito (correo que puede enviar Raúl o Carmen) |
| U2 | Alcance real del español en el portal y la app de Carepatron, y región de alojamiento para una cuenta española | Prueba con cuenta Free + soporte | 1 h de prueba, sin datos reales |
| U3 | Calidad del español y aspecto del portal de OpenEMR 8.4 | Nosotros | Demo pública o contenedor en hermes-node, 1–2 h |
| U4 | Postura de Softr sobre datos de salud y DPA | Softr | Correo a soporte |
| U5 | Horas consumidas de las 110 h a 7 oct | Raúl | Condiciona cualquier opción (U1 de SKI2-205) |
| U6 | Si Carmen aceptaría un portal en inglés con marca de terceros como puente | Carmen | Pregunta directa tras la decisión de Raúl |

Limitaciones de este research: todo procede de documentación pública; la cuota de búsqueda se agotó en varios grupos y algunos centros de ayuda devolvieron 403 (Practice Better, SimplePractice), así que varios datos vienen de extractos de búsqueda o fuentes terciarias y están marcados. No se ha abierto ninguna cuenta.

## 8. Fuentes principales

Consultadas el 2026-10-07. Las fuentes por plataforma están en las fichas de los investigadores; aquí van las que sostienen el veredicto.

- Carepatron: [precios](https://www.carepatron.com/pricing), [anuncio de la API](https://help.carepatron.com/en/articles/13864168-the-carepatron-public-api-is-here), [spec OpenAPI](https://developer.carepatron.com/openapi.yaml) (versión 2026-10-02, 4 rutas, sin webhooks), [idioma del cliente](https://help.carepatron.com/en/articles/10458129-adjusting-your-client-s-language), [RGPD](https://help.carepatron.com/en/articles/8216236-how-does-carepatron-support-gdpr-compliance), [trust center](https://trust.carepatron.com/).
- Practice Better: [precios](https://practicebetter.io/pricing), [API beta](https://help.practicebetter.io/hc/en-us/articles/16637584053275-Getting-Started-with-the-Practice-Better-API-Beta) (403 al abrir; cita del precio futuro vía extracto de búsqueda), [idioma del portal](https://help.practicebetter.io/hc/en-us/articles/15268162777499-Customizing-Client-Facing-Content-in-Another-Language), [RGPD](https://help.practicebetter.io/hc/en-us/articles/360002326671-GDPR-and-Practice-Better-Overview), [webhooks (fuente terciaria)](https://rollout.com/integration-guides/practice-better/quick-guide-to-implementing-webhooks-in-practice-better).
- OpenEMR: [portal 6.0+](https://www.open-emr.org/wiki/index.php/The_OpenEMR_6.0%2B_Patient_Portal), [cuestionarios FHIR en el portal](https://community.open-emr.org/t/announcing-fhir-questionnaire-runtime-and-patient-dashboard-assessments/26892), [API REST](https://github.com/openemr/openemr/blob/master/API_README.md), [API FHIR](https://github.com/openemr/openemr/blob/master/FHIR_README.md), [hilo sobre el español](https://community.open-emr.org/t/idioma-espanol-version-7/22402), [DINAO (Francia)](https://dinao.com/en/conteneur/openemr).
- Zanda: [API](https://zandahealth.com/support/integrations/zanda-api/) (beta cerrada, solo lectura), [precios UE](https://zandahealth.com/eu/pricing/), [seguridad](https://zandahealth.com/eu/security/).
- Cliniko: [API](https://docs.api.cliniko.com/developer-portal/), [sin webhooks](https://github.com/redguava/cliniko-api/issues/150), [precios](https://www.cliniko.com/pricing/), [RGPD](https://help.cliniko.com/en/articles/1908020-how-cliniko-helps-you-with-gdpr-compliance).
- Nutrium: [precios](https://nutrium.com/es/pricing), [seguridad y datos](https://help.nutrium.com/en/articles/4805530-is-my-data-safe-on-nutrium).
- Softr: [planes](https://docs.softr.io/workspace-and-billing/pricing-and-plans.md), [Users API](https://docs.softr.io/softr-api/api-setup-and-endpoints), [triggers y webhooks](https://docs.softr.io/workflows/trigger-types.md), [Stripe](https://docs.softr.io/integrations/stripe-checkout.md), [seguridad](https://www.softr.io/security).
- Assembly: [precios](https://assembly.com/pricing), [webhooks](https://assembly.com/docs/api-reference/webhooks/events.md), [pagos solo US/UK/CA/AU](https://assembly.com/docs/built-in-apps/payments.md), [HIPAA](https://assembly.com/guide/hipaa-compliance), [multiidioma en roadmap](https://community.assembly.com/t/multi-lingual-support/639).
- SuiteDash: [precios](https://suitedash.com/pricing), [API](https://help.suitedash.com/article/550-secure-api), [webhooks](https://help.suitedash.com/article/581-webhooks), [condiciones (PHI)](https://suitedash.com/terms-of-service).
- Medplum: [precios](https://www.medplum.com/pricing), [subscriptions](https://www.medplum.com/docs/subscriptions), [bots](https://www.medplum.com/docs/bots).
- InsideTracker: ver §2.
- Resto (SimplePractice, Jane, Halaxy, Kalix, Cronometer, NutriAdmin, Dietopro, indya, Canvas, Elation, Akute, Oystehr, Fasten, GNU Health, Bahmni, Clinked, Moxo, Clinic Cloud, Medesk, Doctoralia, MN program, Docline): fichas de los investigadores en la sesión del 7 oct; URL de precios en cada fila de la matriz consultable a petición.

## Siguiente paso

1. Raúl lee este documento junto con el de SKI2-205 y decide en SKI2-204: B, D como puente, o A.
2. Si elige el puente con Carepatron: abrir una cuenta Free sin datos reales, comprobar el español y pedir el DPA (U2).
3. Si quiere valorar Practice Better: pedir el add-on de API y el precio previsto por escrito (U1) antes de dedicar una sola hora de integración.
4. Después: journey v3, ADR v2 y replanificación de las issues de Healthie.
