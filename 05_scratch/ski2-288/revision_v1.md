# Revisión independiente de SKI2-288 (v1)

Fecha: 2026-10-18 · Revisa: `04_outputs/modulos/crisis-healthie/2026-10-18_repaso_plataformas_mercado_v1.md` (commit 3431ca6, rama `ski2-288-repaso-mercado`) · Comparado con el research del 7 oct (SKI2-206), `02_context/01_estado_actual.md` y `epi10-orquestador` (master 4fd7c84, solo lectura).

Reglas cumplidas: solo fuentes públicas, sin cuentas, sin editar el documento y sin commits.

## Veredicto

**Apto con cambios.** El muestreo confirma casi todas las cifras: 27 de 33 se confirman tal cual. Hay un hallazgo bloqueante, pero se arregla solo con texto: la comparación de horas con el desarrollo propio usa horas de construcción de OpenEMR que ya están gastadas. Hay cuatro importantes: la reapertura de Odoo aparece como decidida, el rango de costes del resumen deja fuera a Practice Better, el art. 9 de Knack está mal leído y las horas de integración son optimistas.

## Criterios de terminado

| Criterio | Estado |
|---|---|
| Más de 40 plataformas, todas las del 7 oct, con fuente de octubre de 2026 | **Cumple.** Hay 127 filas: 41 del 7 oct, Odoo (R) y 85 nuevas. Las 41 del 7 oct están todas. La fecha (18 oct) es global y no va por fila. Ver M6 y M7. |
| Cada descarte del 7 oct confirmado o revocado con su motivo | **Cumple.** Las 38 D, la D★ (Practice Better) y la línea base (Healthie) llevan «¿se mantiene?». Ninguna se revoca. |
| Lista corta con coste a 3 años y horas | **Cumple en la forma.** Las cifras de horas y de comparación necesitan corrección (B1, I3, I4). |
| Revisión independiente | Este documento. |

---

## Bloqueante

### B1. La comparación con el desarrollo propio cuenta como pendientes horas que ya están gastadas

**Evidencia.**
- La tabla del §3 da a «OpenEMR autoalojado + módulo (vía 1)» **52–76 h de construcción**, como si se empezara de cero.
- El mismo documento lo reconoce en una nota interna (l. 284): «la vía 1 de OpenEMR ya está construida en buena parte (v1.3 en `main`)».
- `01_estado_actual.md` (l. 140) lo confirma: v1.3 en main, recorrido 75/75 y ensayo 16/16. En el orquestador están el módulo `openemr` (≈ 2.700 líneas) y sus simuladores e integración (≈ 1.900 líneas), con 4 PR del 11 al 13 oct.
- La fila de Healthie sí descuenta lo construido («6–10 h, validar lo hecho»). OpenEMR no recibe el mismo trato.
- De ahí salen dos conclusiones: el resumen (l. 20, «ninguna ahorra más de unas 15–25 h») y la lectura 2 del §3 («Pabau o Practice Better, de 10 a 25 h menos»). Cualquiera que lea el dossier entenderá que una plataforma ahorra horas frente a lo propio. **Frente a la vía ya construida, cualquier plataforma suma entre 35 y 80 h nuevas.**

**Corrección propuesta.**
- Añadir al §3 una columna «Horas desde hoy (estimación)»: OpenEMR vía 1 = lo que falte según su propio documento (2.1 b), Healthie = 6–10 h más lo indicado en M4, y cada plataforma = sus horas completas.
- Reescribir el punto 5 del resumen y la lectura 2. Las 52–76 h solo pueden ir como «coste histórico de construcción», para comparar en igualdad.

---

## Importantes

### I1. Odoo como portal: el documento cuenta el descarte, pero da la reapertura por hecha y la apoya en un argumento que su propio inventario contradice

**Evidencia.**
- **A favor:** el §2.3 dice que Raúl descartó la C el 7 oct, lo pone como riesgo («es lo que Raúl rechazó») y pide su decisión antes de la prueba. Coincide con `01_estado_actual.md` l. 103: «Odoo vale como back office, no como portal del cliente (C descartada)».
- **En contra, cuatro puntos:**
  1. El resumen (l. 16, «**Se reabre** una opción descartada»), la tabla (estado **R**) y la línea que el agente añadió a `01_estado_actual.md` (l. 148, «Se reabre **Odoo como portal**») la dan por reabierta. Quien reabre la C es Raúl, y todavía no ha decidido.
  2. «Odoo es la **única** opción del inventario que junta […] web, tienda y portal» (l. 138) es falso según el propio inventario. Marcan ✅ en 2.2, entre otras, Softr, Simply.Coach, Jane (Jane Websites), DriCloud, Koibox, Systeme.io y Bubble. Y el punto 2.2 del correo del 14 oct se refiere precisamente al **portal propio** («la misma interfaz y la misma imagen de marca»).
  3. «El proveedor de la web de EPI10 se ha caído» se presenta como un hecho. El correo dice «**parece** haberse caído», y su nota de fechas aclara: «La caída del proveedor de la web no consta por correo».
  4. La cita de Raúl entre comillas («vale como back office, pero el cliente necesita una app web propia») no aparece en el repo. `01_estado_actual.md` dice otra cosa.
- El argumento nuevo (2.2) no responde al motivo original del descarte, que era la experiencia del cliente.

**Corrección propuesta.**
- Estado «**propuesta de reapertura (pendiente de Raúl)**» en el resumen, en la tabla (p. ej. «R?») y en `01_estado_actual.md` l. 148.
- Cambiar «la única» por «la única **de la lista corta**».
- «Parece haberse caído (no consta por correo)».
- Citar la fuente de la frase o parafrasear lo que dice `01_estado_actual.md`.

### I2. El rango de costes del resumen no incluye a Practice Better ni la incertidumbre de Pabau

**Evidencia.**
- El resumen (l. 20) dice: «cualquier opción de la lista corta cuesta entre 0 y 6.200 € a 3 años».
- El §2.2 da para Practice Better «≥ 2.955 € + API» y, con una API al estilo de Healthie, **8.000–30.000 €**.
- El techo de Pabau (6.200 €) sale de una fuente terciaria: ToolRadar, «verified Sep 2026», con paquetes de **1 usuario** a 59 $ y 69 $. Esos precios se extrapolan al plan Team, que es «Book a demo». La página oficial dice además que el precio va **por sede** y según el país, y que quitar la marca Pabau probablemente es un complemento (Marketing Plus) que no se ha costeado. La fórmula de 1.370–2.050 € no se muestra.

**Corrección propuesta.**
- Resumen: «0–6.200 € en licencias conocidas. Practice Better, ≥ 2.955 € + una API sin precio (hasta 30.000 € con una API al estilo de Healthie). Pabau, extrapolado de una fuente terciaria de 1 usuario».
- Mostrar la fórmula de Pabau y sumar «complemento de marca: Unknown».

### I3. Knack: los términos excluyen el art. 9 **sin** la excepción HIPAA

**Evidencia.** Los términos de Knack (revisados el 24 ago 2026), §3(a), en literal: «not intended for use in […] data that is […] (ii) Protected Health Information, **unless** Customer uses the Services in a HIPAA Environment […], (iii) Sensitive Personal Data». El §1(18) define este último término por el art. 9 del RGPD. La excepción solo se aplica a la PHI (ii). El art. 9 (iii) no tiene ninguna. El documento dice «excluyen el art. 9 **salvo el plan HIPAA**» (§2.4 y §5.1).

Además, la página de precios no dice «Frankfurt». Dice que se puede elegir centro de datos en «US, Europe, or Asia» en todos los planes. Lo de Frankfurt queda sin confirmar.

**Corrección propuesta.**
- «Los términos dicen que el servicio no está pensado para datos del art. 9, sin excepción: ni siquiera el plan HIPAA los cubre. Solo valdría una enmienda escrita».
- Cambiar «Frankfurt» por «región UE a elegir (Frankfurt sin confirmar)» y añadirlo a U7.

### I4. Las horas de integración son optimistas y el documento no describe bien el contrato real

**Evidencia** (orquestador, solo lectura):
- **El contrato no está donde dice el documento.** Las 7 operaciones están en `src/modules/openemr/contrato.ts` (v1.2.0). `portal/portal-cliente.ts` solo traduce los nombres de los trabajos del outbox (`alta`, `mensaje`, `grupo`).
- **«Odoo, Stripe e informes no se tocan» (l. 40) no es cierto.** Cambiar de portal toca también:
  - `core/external-ids.ts` y `core/case-events.service.ts` (`EVENT_SOURCES`);
  - una migración: la `0004_openemr` añade el id de la paciente, la restricción `source` y la tabla del cursor de mensajes;
  - `config/env.ts` y un `config/<portal>-env.ts`, más `app.module.ts`;
  - `informes/pantalla/pantalla.module.ts`, por el puerto `PUBLICADOR_INFORME`;
  - `odoo/milestones/task-read-listeners.ts`, por el resumen del caso;
  - `stripe/stripe.jobs.ts`.
- **El servidor de OpenEMR hacía parte del trabajo.** El módulo PHP propio entrega ya resueltas la idempotencia (`duplicado`), el enlace mágico, el estado agregado de los formularios y el paso 3 del onboarding (`test`: modalidad, datos de envío del kit y cita, SKI2-267). Con Pabau o Practice Better todo eso lo tiene que hacer el monolito sobre una API genérica. En la colección de Pabau existen `complete-forms` y `medical-forms`, pero no hay ninguna ruta de invitación al portal ni de buzón del portal: solo `send/email|sms|WhatsApp`. Sacar los datos de envío de las respuestas de un formulario es Unknown.
- **El back office de Aitor depende de OpenEMR.** `resumen-caso.ts` (actualizar_caso) y el enlace firmado `informes/pantalla/enlace-backoffice.ts` funcionan sobre OpenEMR. Con otra plataforma, el back office de Aitor cambia, y el documento no lo cuenta.
- **El proyecto prueba cada integración contra un simulador.** El de OpenEMR (`test/fakes/openemr/server.ts`, 712 líneas) más su flujo de integración (937 líneas) no tienen equivalente en las estimaciones. Pabau solo prevé «Ensayo E2E y demo: 3–6 h».

**Valoración.**
- Pabau 35–55 h: la veo más cerca de **55–85 h**.
- Odoo 40–70 h: el módulo `odoo` es un adaptador de tareas, no de portal. Lo veo en **50–90 h**.
- Practice Better 30–45 h: no se puede estimar sin ver las docs, como admite el propio documento. Debería ir como «Unknown (≥ 30 h)».
- Knack y Noloco: verosímiles, porque ya suman el portal fino.
- Simply.Coach 15–25 h: verosímil si se aceptan 4–6 a mano.

**Corrección propuesta.**
- Corregir la l. 28 y la l. 40.
- Añadir a cada ficha una línea fija: cableado en core, configuración y migración, 3–5 h; simulador y pruebas de integración, 8–15 h; back office de Aitor, Unknown.
- Revisar Pabau y Odoo al alza, o justificar por qué no.

---

## Menores

- **M1. Cliniko** cuesta 495 €/año con 1 profesional. La leyenda del inventario dice «2–3 personas». Con 2–5 profesionales son 95 $/mes ≈ 960–1.050 €/año (un mes gratis si se paga al año).
- **M2. Zapier de Simply.Coach:** son 11 disparadores y 6 acciones (una es «Find or Create»), más 3 búsquedas, no 12 y 5. La página de Zapier no dice que sea oficial.
- **M3. Odoo:** 1.004 € y 1.220 € son el precio **completo** de Custom con 3 usuarios (27,90 € y 33,90 €/usuario/mes), no la diferencia con Standard. Sign va incluido en Online Standard. **La prueba de 1–2 h se hace en un Odoo 17 Community, que no tiene Sign**, así que no puede comprobar el consentimiento con firma. Hay que decirlo en la prueba.
- **M4. Healthie como línea base, «6–10 h validar lo hecho»:** el módulo `healthie` no tiene el paso 3 del onboarding (SKI2-267) ni actualizar_caso (v1.2). Faltan esas horas.
- **M5. «Las 41 del 7 oct»:** el research del 7 oct dice 36, pero sus tablas tienen 39 más InsideTracker, y aquí se suma Healthie. Una línea que lo explique evita dudas de recuento.
- **M6. Las 17 sin revisar:** seis son software español de nutrición (Nutrisoft, Ofimedic, Diet-Plan, Nutriboss, Dietowin y Nutrimind), justo el barrido que pedía la issue. Hay que hacer una pasada rápida o justificar por separado por qué quedan fuera. Lo de «no se espera que cambien la lista corta» está bien marcado como inferencia.
- **M7. Filas que no se pudieron evaluar y cuentan en las 127:** Eugenomic («no localizada»), Medicapp («no verificada»), Dietbox (error 500) e indya (la web no resuelve). Están bien marcadas, pero el resumen debería decir «127 revisadas, 4 sin poder evaluar».
- **M8. Practice Better:** la cita «Pricing … will be introduced … once the beta period has concluded» no se ha podido volver a comprobar hoy (artículo con 403 y la búsqueda no la encuentra). Debe ir como «cita del 7 oct, no re-verificada el 18».
- **M9. U7 pregunta a Softr** si acepta datos del art. 9, pero Softr ya dice por escrito «PHI cannot be transmitted to or stored inside Softr» y que no firma BAA. La pregunta sobra o hay que reformularla.

---

## Anexo: muestreo de fuentes (consultadas el 18 oct)

C = se confirma · P = en parte · E = mal · NV = no verificable.

| # | Afirmación del documento | Resultado | Evidencia |
|---|---|---|---|
| 1 | Pabau: Team = 2–3 usuarios, precio por demo | C | pabau.com/pricing: Solo 1, Team 2–3, Medium 4–5, Group 6–15; «Book a demo»; precio por sede y país; hasta −20 % al año |
| 2 | Pabau: claves de API y webhooks en la tabla de planes | C | Sección «Integrations & Platform», marcados en todas las columnas |
| 3 | Pabau: «desde 59–69 $/mes», terciaria | C (terciaria) | ToolRadar «verified Sep 2026»: 59 $ «Growing business» y 69 $ «Startup», 1 usuario. Ver I2. |
| 4 | Pabau: colección «Legacy», 110/min y 25.000/día, ejemplos de marzo de 2026 | C | JSON público de la colección: «Pabau Legacy»; «All Other Accounts: 110 / 25,000»; cabeceras del 19 mar 2026 |
| 5 | Pabau: rutas clients/create, medical-forms/create, complete-forms, send/*, communications, documents/upload | C | Las 212 rutas de la colección. No hay ruta de invitación al portal ni de buzón (avala U3). |
| 6 | Pabau: DigitalOcean y AWS «EU & US regions», DPA de UK GDPR a petición, sin SCC, ISO del centro de datos, SOC 2 «readiness» | C | trust.pabau.com, literal |
| 7 | Pabau: formularios, mensajería y documentos en el portal; firma no mencionada; idioma del portal Unknown | C | pabau.com/es/funcionalidades/client-portal |
| 8 | Practice Better: Plus 89 $/mes al año, 1 profesional + 3 administradores | C | practicebetter.io/pricing |
| 9 | Practice Better: datos movidos a AWS EE. UU. | C | Extracto del artículo «Data Residency»: antes en Quebec, con copias en Virginia. Se aplica a todos los usuarios. |
| 10 | Practice Better: la API será de pago tras la beta | NV hoy | 403; la búsqueda no encuentra la frase (M8) |
| 11 | Knack: Pro 110 $/mes al año ≈ 1.215 € | C | knack.com/pricing (130 $ al mes; 110 $ al año) |
| 12 | Knack: Stripe desde Pro | C | «Payments / E-Commerce» en Pro, Corporate y Enterprise |
| 13 | Knack: §3(a) excluye el art. 9 «salvo el plan HIPAA» | **E** | La excepción solo cubre la PHI (ii); el art. 9 (iii) no tiene ninguna (I3) |
| 14 | Knack: Frankfurt en todos los planes | P | «US, Europe, or Asia» en todos los planes; Frankfurt no figura (I3) |
| 15 | Noloco: Build 65 $/mes al año, 1.000 clientas | C | noloco.io/pricing |
| 16 | Noloco: AWS Irlanda, ISO 27001:2022, sin DPA publicado, salud no mencionada | C | noloco.io/security; el MSA no menciona DPA ni datos sensibles |
| 17 | Simply.Coach: Leap 69 $, marca blanca y dominio propio | C | simply.coach/pricing-for-solopreneurs |
| 18 | Simply.Coach: inglés, español y francés «across the web app, mobile app, and even email notifications» | C | La misma FAQ, literal |
| 19 | Simply.Coach: Zapier con 12 disparadores y 5 acciones | P | 11 disparadores, 6 acciones y 3 búsquedas (M2) |
| 20 | Simply.Coach: región AWS no publicada, sin DPA publicado | C | simply.coach/security: AWS sin región; «certified compliant for SOC2, HIPAA, GDPR»; BAA sí; DPA no |
| 21 | Odoo: API externa solo en Custom; los usuarios del portal no pagan; 1.004 € y 1.220 € con 3 usuarios | C | odoo.com/pricing-plan: 27,90 € y 33,90 €/usuario. Ver M3. |
| 22 | Odoo: Sign solo en ediciones de pago | C (matizar) | Incluido en Online Standard; no en Community (M3) |
| 23 | Healthie: API «Additional Fees Apply»; Group con 2 clínicos 199 $ | C | gethealthie.com/pricing: Group 149 $ + 50 $ por clínico. 7.440 / 12.690 / 23.170 € cuadran. |
| 24 | Softr: «PHI cannot be transmitted to or stored inside Softr» | C | docs.softr.io/security/hipaa-compliance; tampoco firma BAA |
| 25 | Bubble: el DPA §13.4 prohíbe el art. 9 | C | bubble.io/dpa §13.4(i): «special categories of personal data» |
| 26 | Glide: prohíbe datos genéticos | C | «genetic data or biometric data» entre los tipos prohibidos |
| 27 | Fullscript: no envía a España (actualizado el 4 sep 2026) | C | Solo EE. UU. y Canadá; «Last modified September 04, 2026» |
| 28 | Fasten: archivado el 18 jul 2026 | C | «archived by the owner on Jul 18, 2026» |
| 29 | Canvas: 4.000 $/mes, contrato de 2 años | C | canvasmedical.com/pricing |
| 30 | Carepatron: spec del 2 oct, 4 rutas, sin webhooks | C | openapi.yaml: `version: "2026-10-02"`, 4 rutas, 0 menciones a webhooks |
| 31 | Kalix: API solo en Enterprise, 846 $/mes; 432 € sin API | C | kalixhealth.com/pricing (Virtual Practice, 470 $/año) |
| 32 | Doctoralia: 89–129 €/mes; 1.308 €/año | C | 89, 109 y 129 € + IVA; 1.308 € = plan Plus |
| 33 | Cliniko: 495 €/año (2–3 personas) | **E** (base) | 45 $ con 1 profesional y 95 $ con 2–5 (M1) |

Resumen del muestreo: de 33 puntos, 27 se confirman, 3 en parte (14, 19, 22), 2 están mal (13, 33) y 1 no se puede verificar (10). En el art. 9 de los no-code, las prohibiciones que se citan (Bubble, Glide y Softr) se confirman literalmente. El único error de este tipo es el de Knack, y va en la dirección de exagerar la salida.

## Coherencia (punto 4)

- **Recuento:** 127 filas en el §4 (20 + 26 + 22 + 31 + 28). Por estado: D 38, D★ 1, línea base 1 y V 1, que suman las 41 del 7 oct; R 1; nuevas 85 (N 75, N★ 4, complementos 5 y solo R6 1). Cuadra con el resumen.
- **Descartes del 7 oct:** las 41 tienen fila y veredicto «¿se mantiene?». Ninguna se queda sin revisar. Los cinco «empeoran» y los dos «en parte» del resumen coinciden con la tabla.
- **Unknown:** U1–U11 tienen quién y cómo. Faltan la región de Knack (I3), el complemento de marca y el precio por sede de Pabau (I2) y el back office de Aitor con otra plataforma (I4).
- **Las 17 sin revisar:** están declaradas en el §7 como inferencia. Ver M6.
