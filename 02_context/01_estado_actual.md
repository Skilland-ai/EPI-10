# Estado actual — 18 de octubre de 2026

## Fuente de verdad

- **Estado y tareas:** Linear, proyecto [EPI10 Salud MVP](https://linear.app/skilland/project/epi10-salud-mvp-928812c268de). Documento 00 = roadmap vigente.
- **Repo canónico:** `~/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10` (GitHub `Skilland-ai/EPI-10`). Se movió aquí desde `~/Escritorio/EPI-10` el 3 oct; el clon antiguo de mayo se descartó.
- `04_outputs/planificacion/linear/` es un snapshot del 15 sep del plan por oleadas, **ya obsoleto**.

## Roadmap: 4 fases (aprobado por Raúl el 3 oct)

1. **Poner orden**: hecho (auditoría, repo consolidado, 75 issues del plan anterior canceladas y archivadas).
2. **Deberes externos y cierre Stripe** (10 oct)
   - SKI2-101: pedir a Carmen la API de Healthie (add-on del Group, sandbox y producción) y la cotización Enterprise con white label. Correo: [2026-10-03_correo_carmen_healthie_stripe_v1.md](../04_outputs/2026-10-03_correo_carmen_healthie_stripe_v1.md).
   - SKI2-103 → SKI2-104: correo a Carmen para reenviar al mantenedor de Odoo, y sesión técnica. Correo: [2026-10-03_correo_carmen_odoo_v1.md](../04_outputs/2026-10-03_correo_carmen_odoo_v1.md).
   - SKI2-20 → SKI2-21: replicar Stripe en la cuenta EPI10 y facturar.
3. **Customer journey** (17 oct): SKI2-106, un documento único en `04_outputs/modulos/journey/`. Base: `post_Fer_PENDING_INTEGRAR_BIEN_EN_REPO/epi10_journey_operativo_odoo_healthie_v1.md`.
4. **Implementación del journey** (13 nov): issues por tramo, creadas a partir del journey cerrado.

## Hechos confirmados (3 oct)

- Carmen vio la demo de Stripe (https://epi10-nutriwell-demo.vercel.app) y la aprobó sin cambios.
- Plan Group de Healthie contratado; tenemos las credenciales.
- La API de Healthie es un add-on de pago del plan Group. El white label (semi o full) solo existe como add-on del plan Enterprise.
- No sabemos quién mantiene el Odoo.

## Decisión D2 (3 oct, SKI2-159)

- El orquestador es un monolito propio (NestJS + PostgreSQL) en el servidor donde EPI10 tiene Odoo. Odoo solo por API. AWS descartado por el cliente. [ADR](../04_outputs/modulos/integracion/2026-10-03_adr_orquestador_v1.md).

## Unknown

- Coste de la API y del white label de Healthie.
- Si EPI10 tiene ya cuenta de Stripe, y el producto y precio definitivos.
- Versión, alojamiento y acceso del Odoo.
- Síntesis de la entrevista con Aitor (SKI2-14 está en Done, pero no hay síntesis registrada).

## Fase 4 · implementación (3 oct, noche)

Repo de código: `Skilland-ai/epi10-orquestador`, un monolito NestJS + PostgreSQL. Master: `c0ee3ca`, 17 PR integrados.

- **Hechas, 13 de 15:** SKI2-160 a 172.
  - core;
  - Stripe;
  - adaptador y webhook de Odoo, con Odoo simulado;
  - cliente, webhooks y alternativa manual de Healthie, con Healthie simulado;
  - seudonimizador, borrador, pantalla y publicación de informes;
  - fuente única de datos de la persona y prueba vertical pago → caso.
- **Método:** cada pieza ha pasado una revisión independiente hecha por otro agente de Claude y tiene el CI en verde. Hay unas 590 pruebas unitarias y 310 de integración.
- **Ensayo E2E de los 5 tramos (SKI2-178):** 39/39 pasos en hermes-node, contra los simuladores. Procedimiento en `docs/ensayo-e2e.md` del repo de código.
  - Defectos corregidos: el bucle de arranque, el ID de Healthie que no llegaba a Odoo, la publicación por API (SKI2-179) y el enlace de Odoo (SKI2-180).
  - Pendiente de decidir: SKI2-181, cierre de las actividades de Odoo (recomendado: A, que las cierre el monolito).
- **Bloqueado por terceros:**
  - SKI2-173, despliegue en el servidor de EPI10: depende del mantenedor de Odoo (SKI2-104).
  - SKI2-174, prueba de los 5 tramos real: depende de la API de Healthie (SKI2-101) y del acceso a Odoo.
- **Todo lo de Healthie y Odoo está probado solo contra simuladores.** No se ha llamado nunca a los sistemas reales.

## Siguiente paso

- Raúl:
  - enviar los correos a Carmen (SKI2-101, SKI2-103);
  - configurar Healthie por la interfaz: SKI2-175 y SKI2-176 hechas el 4 oct (ver abajo);
  - conseguir el material de Aitor (SKI2-177).
- Con la clave de API de Healthie: validación en el sandbox según el §4.1 del contrato y la documentación del módulo.
- Con el acceso a Odoo: `npm run odoo:setup` en staging, validación del adaptador y del antibucle, y después el despliegue (SKI2-173).

## Healthie configurado por la interfaz (4 oct, SKI2-175 y SKI2-176)

- Grupos en producción: nuevo cliente `92327`, test recibido `92328`, informe entregado `92329`.
- Onboarding: intake flow `Onboarding EPI10` `132408`, asociado a «nuevo cliente». Consentimiento `3273627` y datos básicos `3273666`, los dos provisionales.
- Marca aplicada. No hay ajuste de idioma. Las plantillas de correo no se pueden guardar («Your account cannot edit custom emails») aunque el plan es Group: el bug sale a Healthie el 5 oct a las 8:00, con Carmen en copia. Plan B: invitación propia del monolito con `set_password_link`.
- **Decisión de Raúl (4 oct):** el test es **mixto**. Por defecto en casa y una cita presencial opcional («Realización test EPI10 (presencial)», solo para «test recibido»). El ID de la cita se sacará por API. El paso 4.1 del journey y la D8 (código del kit) quedan pendientes en SKI2-185.
- Raúl, 5 oct: SKI2-184, pedir a Carmen y Aitor sus formularios y el texto del consentimiento.
- Detalle: nota del 4 oct en `04_outputs/modulos/healthie/2026-10-03_contrato_api_healthie_v1.md`.

## Comunicaciones del 5 oct (cerradas con Raúl el 4 oct por la noche)

Programadas por Raúl para el **5 oct a las 8:00**. Textos finales en `04_outputs/comunicaciones/` (fecha 2026-10-04):
- A Carmen: API de Healthie, cotización del white label y Stripe (SKI2-101, SKI2-20). `…healthie_stripe_v2.md`.
- A Carmen, para reenviar al mantenedor de Odoo: versión exacta, **backup completo y anonimizado** con el filestore, documentación y código de los módulos a medida (SKI2-103 → SKI2-104). `…odoo_v3.md`, redactado por Raúl. El despliegue en su servidor, los webhooks y el usuario de API quedan para la llamada técnica.
- A Healthie, con Carmen en copia: fallo «Your account cannot edit custom emails» (SKI2-175). `…healthie_bug_plantillas_v1.md`.
- A Carmen y Aitor: formularios, consentimiento, membrete y material de TellmeGen anonimizado (SKI2-184, SKI2-177). El material se comparte en una **carpeta del Google Drive de EPI10**, no por correo. `…formularios_material_v2.md`.

**Aplazado al martes 6 oct (decisión de Raúl):** el boletín del mes a Carmen (skill `skilland-boletin-proyecto`; configuración `proyectos/epi10-salud.toml` creada, sin activar, con el email de Carmen pendiente) y el dossier en PDF adjunto.

## 4 oct (noche) · servicios reales y test mixto

- Master del monolito en `bab87af`.
- **Odoo 17 Community real de pruebas** (SKI2-182, repo `Skilland-ai/epi10-odoo-pruebas`, en hermes-node, puerto 4881).
  - Destapó dos fallos graves del adaptador que el simulador no veía. Están corregidos (#19 y #20).
  - El ensayo da 40/40 contra el Odoo real y 43/43 contra los simuladores.
- **Demo visual** (#21 y #23, `docs/demo-visual.md`): Stripe en modo prueba desde la web de Vercel, el Odoo real, el portal simulado de Healthie y la pantalla de informes. La pila queda levantada en hermes-node para Raúl.
- **Test mixto** (SKI2-186, #22): la cita es opcional y el código de barras (D8) sigue siendo obligatorio.
- **Pendientes de Raúl:**
  - SKI2-181: cierre de las actividades de Odoo.
  - El texto del mensaje «Test recibido».
  - El nombre de la etapa «Test recibido · pendiente de cita».
  - SKI2-185: cómo se registra el código del kit con el test en casa.
- **Comunicaciones:** 4 correos programados para el 5 oct a las 8:00. El boletín y el dossier quedan para el 6 oct.

## 7 oct · crisis de Healthie (SKI2-204)

- Healthie cobra la API a 475 $/mes el primer año, 950 $/mes el segundo y 1.900 $/mes después. **EPI10 no la paga** (Raúl). Correos de Healthie restringidos y sin español. Detalle: `04_outputs/modulos/healthie/2026-10-07_noticias_healthie_v1.md`.
- Criterio de Raúl: Healthie a mano (A) solo como último recurso; Odoo vale como back office, no como portal del cliente (C descartada). Opciones vivas: **B, portal propio** (SKI2-205) y **D, otra plataforma** (SKI2-206).
- **SKI2-205 entregado:** `04_outputs/modulos/crisis-healthie/2026-10-07_arquitectura_boton_rojo_v1.md`. Recomendación: módulo `portal` del monolito, HTML servidor + HTMX, correo transaccional comprado en la UE, el resto construido. MVP 56–70 h + 8–12 h legales (EIPD casi segura). No cabe en lo que quede de las 110 h; horas consumidas: **Unknown**, las pone Raúl.
- **SKI2-206 entregado:** `04_outputs/modulos/crisis-healthie/2026-10-07_research_alternativas_healthie_v1.md`. 36 plataformas comparadas. Ninguna cumple a la vez español, API gratis, UE y venta. InsideTracker descartada. Mejores: Practice Better (automatiza hoy, inglés, API de pago tras la beta), Carepatron (español, sin API útil: puente manual) y OpenEMR autoalojado (gratis y UE, 35–65 h, estética antigua). Recomendación: portal propio (B) si se mantienen los requisitos; Carepatron como puente.
- **SKI2-207 entregado:** `04_outputs/modulos/crisis-healthie/2026-10-07_openemr_headless_v1.md`. OpenEMR 8.4.1 probado en hermes-node (puerto 4896) con el journey de Lucía.
  - Con un módulo PHP propio (`oe-module-epi10`, prototipo instalado), los 7 pasos van por API.
  - Tema EPI10 aplicado al portal y al back office sin tocar el núcleo, con capturas antes y después.
  - Recomendación: descartar el portal propio sobre OpenEMR, vía (2), 67–90 h. Si se quiere OpenEMR, lavado de cara + módulo, vía (1): 52–76 h frente a 56–70 h del botón rojo, con más funciones (citas, auditoría, ACL, MFA) y 2–4 h/mes de mantenimiento.
  - En la instancia de prueba queda activado el *password grant* (solo pruebas) y hay un usuario `operaciones.prueba` (contraseña en el `.env` del HP).
- Pendiente: decisión de Raúl (B, D, OpenEMR vía 1 o A como puente) y, después, journey v3, ADR v2 y replanificación de las issues de Healthie.

## 11 oct (noche) · plan renove visual sobre OpenEMR, ejecutado

- **Feedback de Raúl vista por vista** (SKI2-208): `04_outputs/modulos/crisis-healthie/2026-10-11_feedback_vistas_openemr_v1.md`. Cinco decisiones: base de interfaz moderna y open source para toda la app; portal y back office la comparten (portal precioso, back office usable); nunca mezclar idiomas; por omisión, no por adición; la primera vista del back office es un selector.
- **Base «EPI10 UI»** ratificada (SKI2-209): shadcn/ui vía Basecoat como CSS plano con prefijo `epi-`, sin build, islas Preact; módulo hermano `oe-module-epi10-ui`. Guía: `renove/00_base_interfaz.md`.
- **Siete áreas en paralelo**, cada una con revisión independiente, y **diez PR fusionados en `main` de `Skilland-ai/epi10-oe-module`** (b013569): contrato v1 del módulo (#1), base (#2), chat (#3), citas (#4), acceso e inicio (#5), back office (#6), tareas firmables (#7), instalación (#8, #9) y menú de admin (#11), biblioteca e informe (#10). Bloqueantes encontrados y corregidos por la revisión: descarga de documentos no publicados vía marcador en el chat, doble reserva de citas, permisos por pestaña en la ficha.
- **Monolito:** PR #24 fusionado en `master` de `epi10-orquestador` (65bb925): módulo `openemr` que sustituye a Healthie, contrato v1, consulta periódica, demo visual con el portal real de OpenEMR y Mailpit. Ensayo del guion completo (10 pasos) en 76 s.
- **Instancia de hermes-node:** zona horaria Atlantic/Canary; instalación final desde `main` en curso (`renove/instalacion_demo.md`), seguida del recorrido automático (63 comprobaciones) y del ensayo `probar` + `limpiar`.
- **Pendiente de Raúl (en el panel):** ratificar el texto de «Test recibido», el chat sin adjuntos del equipo, la zona horaria, las decisiones de la ficha (código del kit, «Más datos») y el inventario de campos (§3 del doc del área 7); las horas consumidas de las 110.
- **Después de la demo:** contrato v1.1 (`epi10_fase_caso`, `fijar_fase`, publicado_en, republicar informe), migrar el ensayo E2E a los pasos nuevos del portal, aviso por correo de mensaje nuevo, tabla propia de adjuntos del chat, ayudante 401 JSON, `table.sql` desde el module manager, tipografía definitiva.

## 12 oct · documento de arquitectura del sistema v1

- **SKI2-238:** [documento de arquitectura del sistema v1](../04_outputs/modulos/integracion/2026-10-12_arquitectura_sistema_v1.md), escrito desde el código (`epi10-orquestador` 65bb925, `epi10-oe-module` b013569) y la instancia de hermes-node en solo lectura: componentes, flujos, contrato v1, modelo de datos, vistas, seguridad, operación y deuda (A1–A10, D1–D16). En revisión.

## 12 oct (tarde) · batida de componentes e integración v1.2

- **Arquitectura documentada:** `04_outputs/modulos/integracion/2026-10-12_arquitectura_sistema_v1.md` (SKI2-238, desde el código, 10 diagramas) y `…_v0_healthie.md` (SKI2-247, para comparar); ambos como documentos del proyecto en Linear (03 y 02b). Cuatro issues de deuda post-demo: SKI2-239 (contrato v1.1), 240 (purga de `jobs`, estado en memoria), 241 (retirar Healthie), 242 (OpenEMR reproducible y ajustes de producción).
- **Batida de 21 fuentes + 3 referencias de Raúl** (SKI2-249, lotes A–E): ≈3.250 piezas vistas, 124 filas, inventario consolidado y plan por áreas en `renove/batida/2026-10-12_inventario_consolidado_v1.md` (documento 04 en Linear). Licencias vigiladas: 23rd sin licencia, Arc UI Pro y kits de pago solo como inspiración, Transitions.dev reescrito.
- **Integración v1.2 en una tarde:** 7 PR en `main` de `epi10-oe-module` (#12 y #14 área 0, #13 áreas 4 y 5, #15 área 2, #17 área 3, #18 área 7, #16 + #19 área 1; versión 0.1.11, main e204275) y #25 en `master` del monolito (0a435ac, pantalla de informes). Cada PR con revisión independiente; hallazgos corregidos antes de fusionar (dropEffect global que pisaba las islas, formulario que quedaba bloqueado, comilla suelta en el login, función `primerAcceso` borrada en un rebase).
- **Verificación:** recorrido de 99-demo 63/63 sobre main e204275 (`openemr-pruebas/evidencia/capturas/renove/v12/main-e204275/`); ensayo `probar` 15/15 en 72 s; `limpiar` hecho; solo Lucía en OpenEMR. Antes/después vista a vista: `renove/batida/2026-10-12_antes_despues_v12.md`.
- **Decisiones del orquestador pendientes de ratificar por Raúl:** línea de actividad en la ficha pero no en el panel «Hoy»; carpetas planas (las 3D, a Después); modal de subida completo a Después (toca R4); 11 preguntas estéticas en el consolidado (stepper vertical, letras A/B/C, confeti, halo, anillo 4 de 5, «escribiendo…», notas de voz, carpetas en Mi informe, grano).
- **Método:** una sola instancia compartida por 7 áreas con «ventanas» (el orquestador instala la rama sobre main unos minutos y restaura); las áreas prueban en maqueta con el CSS real. Nota: el repo EPI-10 es una sola copia de trabajo; los commits locales de un agente viajan con el push de otro.

## 12 oct (noche) · repaso de Raúl, v1.3 y onboarding guiado

- **Repaso vista por vista** de la v1.2.1 (`crisis-healthie/2026-10-12_feedback_vistas_v13_v1.md`): portal muy bien salvo stepper, enlaces Ver/Abrir, visor, firma escondida en ajustes y navegación; back office con la cinta del núcleo, las pestañas y el calendario como fallos gordos; nuevas peticiones: plantillas de mensaje, vista de documentos e informes, onboarding por carriles.
- **Onboarding guiado acordado y aprobado** (`crisis-healthie/2026-10-12_onboarding_guiado_v1.md`): carril forzado de 3 pasos (consentimiento, cuestionario, «Tu test» en casa con envío o en la sede con cita), D3 de tres pasos, datos de envío en Odoo y en la ficha, página de éxito de NutriWell; tramo 3 (espera del kit, plantillas, guía del kit, código de barras, tarea de recogida).
- **v1.3 en main** (`epi10-oe-module` dec0a25, UI 0.1.17, contrato 1.1.0; `epi10-orquestador` c015d7b): navegación unificada (#21), portal (#22), back office (#23), onboarding (#24 + #26). Cada PR con revisión independiente y correcciones. Verificación final: recorrido **75/75** (nuevo tramo «Carril» con la paciente ficticia Clara, pid 9101), ensayo `probar` **16/16** en 75 s, instancia limpia y resembrada (citas de demo, carril en cero, Lucía con test en casa).
- **Kit (SKI2-268):** ramas `v13-kit` (módulo, ffa1e5d sobre main) y `kit-codigo-recogida` (monolito) revisadas y corregidas; **los PR los crea Raúl** (acción denegada en la sesión del agente). Entrarán después.
- **Para Carmen:** artefacto con la historia de la crisis, la decisión, lo construido y la demo (privado hasta que Raúl lo comparta).
- **Deuda anotada:** unificar el stepper del carril con `stepper.mjs`; carril forzado solo en home.php; cambios del test tras D3 no se sincronizan; `probar` solo automatiza «En casa»; plantilla «Dirección de envío del kit»; kanban tipo tablero para Clientes; redesplegar NutriWell en Vercel con la página de éxito nueva (EPI-10 59c1126).

## 18 oct · repaso de plataformas de mercado (SKI2-288, dossier 2.1 a)

- Documento: `04_outputs/modulos/crisis-healthie/2026-10-18_repaso_plataformas_mercado_v1.md`. Estado: revisado («apto con cambios»), con las correcciones aplicadas.
  - 137 plataformas con fuentes del 18 oct; 4 sin poder evaluar.
  - Solo información pública, sin cuentas ni contactos.
- Ningún descarte del 7 oct se revoca. **Odoo como portal (opción C) sigue descartado**, por decisión de Raúl del 18 oct: ya hay portal propio sobre OpenEMR y Odoo no aporta nada encima.
- **Lista corta, con horas desde hoy y licencias a 3 años** (estimación):

| Opción | Horas desde hoy | Licencias 3 años |
|---|---|---|
| Pabau, casi viable | 69–107 h | 4.100–6.200 €, extrapolado |
| Practice Better | ≥ 59 h | ≥ 2.955 € + API; 8.200–34.400 € con una API al estilo de Healthie |
| Noloco con portal fino | 68–107 h | ≈ 2.150 € |
| Simply.Coach, semiautomático | 34–56 h + trabajo manual | 2.950–4.600 € |

  Knack sale porque excluye el art. 9 sin excepción.
- **Referencia, el propio sobre OpenEMR (ya construido):** 39–62 h hasta producción (SKI2-239 a 242 y 173) y 0–1.440 €. Ninguna plataforma ahorra horas frente a lo construido.
- **Pendiente:**
  - demo de Pabau, que la pide Raúl (SKI2-289), y después la prueba de 1–2 h;
  - preguntas escritas a Practice Better y Noloco, si Raúl las autoriza.

## 18 oct (noche) · cierre de la sesión del orquestador

- **14 oct:** correo a Carmen con Tomás en copia y la nota de 7 págs., enviado a las 17:13 (SKI2-286 y SKI2-287, Done). Sin respuesta a 18 oct.
- **Demo de Pabau:** vie 23 oct, 9:15–10:00, con Danny de Pabau (SKI2-289). Plan de Raúl: el dossier sale el mié 21 y el jue 22 invita a Carmen a la mini demo si quiere venir.
- **Odoo como portal: sigue descartado** (Raúl, 18 oct). Ver `03_specs/decisions.md`.
- **Síntesis para Raúl:** documento 05 del proyecto en Linear, «Portal de cliente · plataformas de mercado frente a desarrollo propio».
- **Dossier del 21:** en pausa. **Raúl lo procesa antes de lanzar ninguna tarea.** SKI2-293 (cifras del propio) y SKI2-294 (web integrada) están en Backlog, con el brief escrito.
- **hermes-node:** los contenedores de EPI10 (demo, OpenEMR y Odoo de pruebas) están **parados, no borrados**, para liberar el HP para otra sesión. Se recuperan con `docker start`. No hacer `down`: los módulos de OpenEMR viven en el contenedor.

## 18 oct (cierre) · matriz por peticiones, ronda de contactos y retraso del dossier

- **Documento 05 en Linear** (repo: `04_outputs/modulos/crisis-healthie/2026-10-18_matriz_peticiones_tiers_v1.md`): 137 plataformas contra 13 peticiones. Resultado: verde 1 (el propio), naranja 13 (sanitarias: Tellescope, Practice Better, Pabau y Marley Health), rojo 119 y 4 sin datos.
- **Reglas de Raúl:**
  - si no automatiza, es rojo, y lo rojo no se contacta;
  - lo que no es software de salud no pasa de naranja (Plutio).
- **Contactos (correos solo en Gmail, Carmen en copia):**
  - Plutio: enviado.
  - Practice Better: enviado, ticket 321185.
  - Pabau: programado para el lunes 19 a las 8:00; demo el viernes 23 a las 9:15.
  - IntakeQ: programado, pero ahora está en rojo; Raúl decide si lo cancela.
  - Tellescope: borrador.
- **El dossier se retrasa una semana, más o menos**, hasta después de la ronda de demos (Raúl). Raúl lo habla con Carmen (SKI2-303).
- **Siguiente:** recoger las respuestas y actualizar las fichas del documento 05. SKI2-293 y SKI2-294 siguen en Backlog hasta que Raúl las active.
- **Hoja de ruta acordada (Raúl, 18 oct, noche):**
  - **Hito 6 · Ronda de demos (19–23 oct):** Tellescope, Practice Better y Pabau, más Plutio de rebote. IntakeQ, cancelado (rojo). Marley Health no se contacta (sería otro propio). Corte de respuestas el lunes 26.
  - **Hito 7 · Nuevo análisis y dossier (~28 oct, por confirmar con Carmen):** primero SKI2-304 (actualizar la matriz y las fichas); después, cuando Raúl lo procese, SKI2-293, SKI2-294 y el dossier.
