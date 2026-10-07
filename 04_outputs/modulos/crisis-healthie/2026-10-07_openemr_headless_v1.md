# OpenEMR autoalojado con la cara de EPI10: cobertura real y cómo cambiarle la cara (v1)

Fecha: 2026-10-07 · Linear: SKI2-207 (hija de SKI2-204) · Estado: **prueba terminada, pendiente de decisión de Raúl**
Contexto: [botón rojo, SKI2-205](2026-10-07_arquitectura_boton_rojo_v1.md) · [research de alternativas, SKI2-206, §4.3](2026-10-07_research_alternativas_healthie_v1.md) · [journey v2](../journey/2026-10-03_customer_journey_mvp_v2.md) (test mixto desde el 4 oct) · monolito `Skilland-ai/epi10-orquestador`
Material: [openemr-pruebas/](openemr-pruebas/README.md): scripts, módulo prototipo, evidencias JSON y capturas.

**Qué es este documento.** Raúl propone usar OpenEMR autoalojado en el servidor de EPI10 y cambiarle la cara. El orquestador planteó dos vías: (1) retocar el propio OpenEMR (temas, CSS, plantillas) o (2) usarlo por debajo con un portal propio en el monolito. Durante la prueba Raúl añadió dos indicaciones: si la API no llega, **hacemos módulos PHP propios** (no es un bloqueo), y hay que explorar **a fondo la vía (1)** con un prototipo real. Todo lo que sigue se ha probado en OpenEMR **8.4.1** (20 sep 2026) con datos ficticios, salvo lo marcado como estimación o **Unknown**.

## Veredicto en cinco líneas

1. **OpenEMR cubre el journey de Lucía de punta a punta**, pero la API estándar solo llega a la mitad. Con un **módulo PHP propio de unas 650 líneas** (prototipado y probado hoy) se cierra todo por API: alta con enlace mágico, plantillas, mensajes en los dos sentidos y consulta periódica de cambios.
2. **La hipótesis (2), el portal propio sobre la API, queda refutada como «la mejor».** La API del paciente es casi solo de lectura y limitada (sin Consent, sin Communication, sin escritura de cuestionarios; la API del portal es experimental). Habría que construir la interfaz del botón rojo y además mantener OpenEMR: **67–90 h**, más que las otras dos.
3. **La vía (1), el lavado de cara, llega mucho más lejos de lo esperado sin tocar el núcleo.** Con eventos del module manager, plantillas Twig sobrescritas, CSS, logos y traducciones propias, el portal pasa de «EHR de 2015 en inglés» a un espacio con marca EPI10, en español y usable en el móvil. Hay capturas antes y después.
4. **No ahorra «muchísimo» en el MVP: 52–76 h frente a 56–70 h del botón rojo** (más 8–12 h legales en los dos casos). Lo que sí da es mucho más producto por esas horas: citas (test mixto), auditoría, permisos, segundo factor, documentos cifrados y versionados, back office y exportación de datos, sin escribir nosotros el código que guarda datos de salud.
5. **Recomendación: vía (1), con condiciones.** El precio es operar un EHR en PHP expuesto a internet: actualizaciones mensuales y parches de seguridad rápidos (la 8.4.0 corrigió 16 avisos, tres de ellos críticos), entre 2 y 4 h al mes. Si EPI10 o Aresoltec no pueden asumir esa disciplina, el botón rojo es la opción más segura.

---

## 1. Qué se probó

| Pieza | Detalle |
|---|---|
| Instancia | hermes-node, `~/Projects/epi10-openemr-prueba`, compose con `openemr/openemr:latest` (8.4.1) y MariaDB 11.8. Español (España), portal y API REST, FHIR y portal activadas |
| Acceso | Cliente OAuth2 confidencial registrado por `/oauth2/default/registration`. Para automatizar se activó el *password grant*; en producción sería *authorization code* con *refresh token* |
| Personas ficticias | Lucía (pid 1, ya existía), varias «Marta» creadas por API (pid 2–7), usuario de back office `operaciones.prueba` (rol de Aitor) |
| Scripts | `openemr-pruebas/scripts/`: 8 pruebas en Python, automatización del portal con Playwright y capturas |
| Módulo | `openemr-pruebas/modulo/oe-module-epi10/`: tema, plantillas, traducciones, tarjeta de tienda, menú de operaciones y API propia |

## 2. Cobertura probada con el journey de Lucía

Leyenda: ✅ funciona · ◐ funciona con matices · ❌ no funciona. «API estándar» es OpenEMR tal cual; «con módulo» es con `oe-module-epi10`.

| # | Paso | API estándar | Con módulo | Evidencia (petición → respuesta) |
|---|---|---|---|---|
| 1 | **Alta de paciente con acceso al portal** | ◐ | ✅ | `POST /fhir/Patient` → 201 y `POST /api/patient` → 201 `{pid, uuid}`. No hay ninguna ruta para crear las credenciales del portal: `POST …/portal_credentials` → 404. Con el módulo, `POST /api/patient/:pid/epi10_portal_access` → 201 `{portal_username, magic_link, expires_hours: 48}`. El enlace abre el portal sin contraseña y es de un solo uso (`01_alta_paciente.json`, `07_modulo_api.json`, captura `21_buzon_paciente.png`) |
| 2 | **Consentimiento con firma** | ◐ | ✅ | Plantilla propia con `{PatientSignature}` y casillas. Lucía dibuja la firma, marca las casillas y pulsa «Enviar a EPI10»: `onsite_documents` queda con `patient_signed_status = 1`, hora de firma y estado «En revisión». No hay recurso FHIR `Consent` (`GET /fhir/Consent` → 404). El módulo lo expone en `GET /api/epi10_changes`. Una vez archivado en la ficha, el PDF firmado (44 KB) sale como `DocumentReference` y se descarga como `Binary` → 200 `application/pdf` (`02_consentimiento.json`, capturas `04_firma_dibujada.png` y `05_firma_colocada.png`) |
| 3 | **Asignar y rellenar la encuesta de hábitos** | ◐ | ✅ | Cuestionario FHIR en español (`datos/cuestionario_habitos_epi10.json`) importado al repositorio y asignado como plantilla `{Questionnaire:…}`. Lucía lo rellena en el portal con el motor de cuestionarios FHIR nativo y lo envía. La asignación no tiene API; con el módulo, `POST /api/patient/:pid/epi10_portal_template` → 201 (`07_modulo_api.json`, captura `tema/despues_05_portal_encuesta.png`) |
| 4 | **Leer las respuestas desde fuera** | ✅ | ✅ | `GET /fhir/QuestionnaireResponse?patient=…` → 200 con las 6 respuestas: 7 horas de sueño, 3 días de ejercicio, no fuma, nunca bebe, sí sigue dieta y texto libre. Pequeño matiz: el estado FHIR queda `in-progress` aunque el documento se haya enviado (`03_encuesta.json`) |
| 5 | **Mensajes en los dos sentidos** | ❌ | ✅ | `POST /api/patient/:pid/message` → 201, pero escribe en `pnotes` (notas internas); no llega al buzón del portal (`onsite_mail`). No hay FHIR `Communication` (404) ni ruta de mensajes en la API del portal. Con el módulo: equipo → buzón del portal (`POST …/epi10_portal_message` → 201), Marta lo lee y responde desde el portal, y el monolito lee la respuesta (`GET /api/epi10_portal_message?since=…` → 2 mensajes) (`04_mensajes.json`, `08_lectura_cambios.json`, capturas `21`–`23`) |
| 6 | **Subir el informe en PDF y que la paciente lo vea y descargue** | ◐ | ◐ | `POST /api/patient/:pid/document?path=/medical_record` (campo `document`) → 200. El equipo lo lee como `DocumentReference` y `Binary`, y la descarga coincide byte a byte (sha256). Lucía lo ve en «Mi informe › Descargar mis documentos» y lo baja como ZIP (`descarga_patient_documents.zip`, 637 B). Dos matices: el portal enseña **todos** los documentos de la ficha, no solo los publicados; y con el token de la paciente (SMART `patient/DocumentReference.read`) la búsqueda devuelve 0 y el `Binary` da 401 (causa **Unknown**) (`05_informe_pdf.json`, captura `31_lista_documentos.png`) |
| 7 | **Detectar cambios sin webhooks** | ◐ | ✅ | `Patient?_lastUpdated=gt…` y `DocumentReference?_lastUpdated=gt…` filtran bien (control con fecha futura → 0). `QuestionnaireResponse` ignora `_lastUpdated` y solo filtra por `authored` (fecha de creación). Los documentos firmados y los mensajes no tienen API. Con el módulo, `GET /api/epi10_changes?since=…` devuelve todo en una llamada (documentos del portal, cuestionarios, mensajes, documentos y actividad) con un cursor; la segunda llamada con ese cursor sale vacía (`06_polling.json`, `08_lectura_cambios.json`) |

**Lo que el módulo hace y cómo.** Son 5 rutas bajo `/apis/default/api` con OAuth2 del equipo y scopes propios `user/epi10_*`; sin esos scopes la ruta da 401 (probado). No guarda nada aparte: usa los servicios de OpenEMR (`PatientAccessOnsiteService`, `OneTimeAuth`, `DocumentTemplateService`, el buzón del portal) y sus tablas.

| Ruta del módulo | Para qué |
|---|---|
| `POST /api/patient/:pid/epi10_portal_access` | Crea las credenciales del portal y devuelve un enlace mágico de un solo uso. La contraseña aleatoria no sale de OpenEMR |
| `POST /api/patient/:pid/epi10_portal_template` | Asigna a la paciente una plantilla del repositorio (consentimiento o cuestionario) |
| `POST /api/patient/:pid/epi10_portal_message` | Mensaje del equipo al buzón del portal, con las dos copias que hace el propio portal |
| `GET /api/epi10_portal_message?since=` | Mensajes escritos por pacientes |
| `GET /api/epi10_changes?since=` | Fuente única de cambios para la consulta periódica, solo con IDs, estados y fechas |

## 3. Cómo cambiarle la cara

### 3.1 Cómo están hechas las vistas del portal

| Vista | Tecnología | Cómo se cambia sin tocar el núcleo |
|---|---|---|
| Acceso (`portal/index.php`) | PHP con HTML incrustado y Bootstrap 4 | CSS por evento, logo por evento, textos por traducción propia y el global `openemr_name` |
| Inicio (`home.php` → `templates/portal/home.html.twig`) | Twig 3 y Bootstrap 4 | **Sobrescribir parciales Twig desde el módulo** (`TwigEnvironmentEvent` → `prependPath`), CSS y tarjetas inyectadas (`RenderEvent::EVENT_DASHBOARD_INJECT_CARD`) |
| Documentos, consentimiento y cuestionario (`portal/patient/onsitedocuments`) | Phreeze (`.tpl.php`) con iframes; el cuestionario es otro iframe (`questionnaire_assessments.php`) | CSS por evento. La plantilla «Help» es un dato y se reescribe. La estructura no se puede cambiar sin tocar el núcleo |
| Mensajes (`portal/messaging/messages.php`) | PHP, jQuery, Summernote | CSS y traducciones |
| Back office (`interface/…`) | PHP heredado, Twig en el login, menú JSON | CSS, logos, `MenuEvent` para el menú por usuario, ACL por grupos, global `login_tagline_text` |

Recursos comunes: Bootstrap 4 y Font Awesome del núcleo, temas `public/themes/*.css` (solo variantes de color de OpenEMR), logos en `sites/default/images/logos/…` (fuera de la imagen, en el volumen) o por `LogoFilterEvent`, y traducciones en `lang_definitions`. Las propias se guardan también en `lang_custom` para reaplicarlas tras actualizar.

### 3.2 Prototipo real: tema EPI10 aplicado

Módulo `oe-module-epi10`, instalado por el module manager. Mide unas 650 líneas en total: 382 de PHP, 61 de plantillas Twig, 156 de CSS y 49 de SQL, más la fuente Manrope autoalojada (sin Google Fonts) y los logos nuevos.

| Mecanismo | Qué se hizo | Resultado |
|---|---|---|
| `StyleFilterEvent` | Tokens EPI10 (azul profundo `#01447B`, cian `#029ACC`, marfil `#FDF4ED`, casi negro), Manrope, botones en píldora, tarjetas, formularios y campos | Se aplica en todas las vistas del portal (también en el iframe del cuestionario) y en el back office |
| `LogoFilterEvent` | Logo EPI10 monocromo azul en el acceso del portal, la barra del portal y el back office | ✅ |
| Plantillas Twig sobrescritas | `portal/header.html.twig` (logo, «Hola, Lucía», botón de inicio) y `portal/partial/_nav_icon*.html.twig` (tarjetas con descripción y llamada a la acción). Mantienen los mismos atributos para no romper el JavaScript del portal | ✅ 61 líneas que hay que revisar en cada actualización |
| `RenderEvent` (tarjeta inyectada) | Tarjeta «Tienda EPI10» que abre la tienda o un Stripe Checkout | ✅ |
| CSS | Oculta las tarjetas clínicas que el servicio no usa (resumen de salud, perfil, pagos) y el selector de idioma | ✅ |
| Traducciones propias y globals | 44 textos al español con tono EPI10 («Tu espacio EPI10», «Mis documentos», «Enviar a EPI10»…), título «EPI10 Salud · Mi espacio», lema del back office | ✅ |
| Plantilla «Help» | Instrucciones en inglés sobre fondo oscuro sustituidas por una guía de cuatro pasos en español | ✅ |
| `MenuEvent` | Menú del back office reducido para el rol de operaciones; el administrador conserva el completo | ◐ Funciona, pero las ACL del grupo Front Office ocultan además Citas y Mensajes. Hay que afinar el grupo |
| Sesión con enlace mágico | El portal caía en inglés al entrar con enlace mágico; el módulo fija el español en la sesión | ✅ |

**Capturas** (`openemr-pruebas/evidencia/capturas/tema/`; `_movil` = 390 px de ancho):

| Pantalla | Antes | Después |
|---|---|---|
| Acceso al portal | `antes_01_portal_login.png` | `despues_01_portal_login.png` · `…_movil.png` |
| Inicio | `antes_02_portal_inicio.png` | `despues_02_portal_inicio.png` · `…_movil.png` |
| Documentos | `antes_03_portal_documentos.png` | `despues_03_portal_documentos.png` · `…_movil.png` |
| Consentimiento | `antes_04_portal_consentimiento.png` | `despues_04_portal_consentimiento.png` |
| Cuestionario | `antes_05_portal_encuesta.png` | `despues_05_portal_encuesta.png` |
| Mensajes | `antes_06_portal_mensajes.png` | `despues_06_portal_mensajes.png` · `…_movil.png` |
| Mi informe | — | `despues_07_portal_informes.png` · `…_movil.png` |
| Back office: acceso, inicio y ficha | `antes_10`, `antes_11`, `antes_12` | `despues_10`, `despues_11`, `despues_12` |
| Back office con el rol de Aitor | — | `despues_13_…inicio`, `despues_14_…ficha` |

Raúl puede verlo en vivo en **http://localhost:4896/portal/** (Lucía: usuario `lucia`, contraseña `PORTAL_PASS` del `.env` del HP) y en **http://localhost:4896/** (back office: `admin` con `OE_PASS`, o `operaciones.prueba` con `OPS_PASS`).

### 3.3 ¿Puede el portal alojar la venta, la encuesta y el consentimiento con un aspecto digno?

- **Consentimiento: sí.** Texto propio con casillas y firma dibujada con el dedo o el ratón, en español y con la marca. Es firma electrónica simple con registro de fecha, IP e imagen (`onsite_signatures`), lo mismo que proponía el botón rojo.
- **Encuesta: sí, con matices.** El motor FHIR nativo pinta bien las preguntas en español y respeta las obligatorias. Pero el sí/no booleano sale como «Yes / No» (texto del JavaScript del motor) y el formulario vive en un iframe dentro de otro iframe.
- **Venta adicional: sí, como enlace.** La tarjeta «Tienda EPI10» abre la tienda. Para un Checkout con el cliente ya rellenado, la tarjeta apuntaría a una ruta del monolito que crea la sesión de Stripe (2–4 h). No hay carrito dentro del portal.
- **Techo del lavado de cara:**
  - la estructura de las páginas Phreeze (documentos) y de mensajes no se cambia sin tocar el núcleo;
  - algunos textos del JavaScript siguen en inglés;
  - las URL dicen `/portal/patient/onsitedocuments`;
  - la descarga del informe va en ZIP;
  - el resultado es un portal digno y con marca, no una app a medida como la del mockup web.

### 3.4 Back office de Aitor: qué se simplifica

- **Menú por rol** con `MenuEvent`: el menú configurado para Aitor es Clientes, Citas, Mensajes y Portal; el administrador ve todo. Probado con `operaciones.prueba`: hoy solo aparecen Clientes y el botón Portal, porque las ACL del grupo Front Office ocultan el resto. Falta afinar ese grupo (2–3 h).
- **Permisos (ACL de grupos)**: el grupo Front Office ya recorta la ficha (no ve problemas médicos, medicación ni laboratorio). Conviene un grupo propio «EPI10 Operaciones» con lo justo: demografía, documentos, portal, citas y mensajes.
- **Tema**: login, menú y pestañas con la marca. La ficha de la paciente sigue siendo la de un EHR («Medical Record Dashboard», Care Team…). Se puede recortar con ACL y CSS, pero no deja de parecer clínica.
- **Módulo propio**: el mismo `oe-module-epi10` sirve. No hace falta un segundo módulo para el MVP.
- **Odoo sigue siendo el sitio de trabajo de Aitor** (etapas y actividades). OpenEMR es donde están la ficha, el chat y los documentos. Cada actividad de Odoo enlazaría a la ficha de OpenEMR.

### 3.5 Vía (2), OpenEMR por debajo: qué API usaría cada función

| Función del portal propio | API de OpenEMR | Límite comprobado |
|---|---|---|
| Entrar | SMART on FHIR *standalone patient launch* con las credenciales del portal de OpenEMR, o sesión propia del monolito que actúa con token del equipo | Con SMART la paciente pasa por la pantalla de login y consentimiento de OpenEMR (en inglés, sin marca). Con sesión propia el monolito vuelve a ser la puerta a los datos de salud |
| Ver sus datos | FHIR `patient/*.read` | Solo lectura; FHIR prohíbe escribir al rol paciente |
| Consentimiento con firma | Ninguna (no hay `Consent` ni escritura de `onsite_documents`) | Necesita rutas del módulo para guardar documento y firma |
| Cuestionario | FHIR `Questionnaire` y `QuestionnaireResponse` solo lectura | Necesita ruta del módulo para guardar la respuesta |
| Mensajes | Ninguna (no hay `Communication`; la API del portal solo tiene patient, encounter y appointment) | Rutas del módulo |
| Informe | `DocumentReference` y `Binary` | Con el token de la paciente devuelve 0 documentos y 401 (Unknown); habría que servirlo con el token del equipo |
| Cambios | `_lastUpdated` en Patient y DocumentReference; el resto no | Ruta `epi10_changes` del módulo |

La propia documentación de OpenEMR marca la API del portal como **EXPERIMENTAL** y recomienda FHIR, que es de solo lectura para pacientes. Construir nuestra cara encima obliga a hacer toda la interfaz del botón rojo, el módulo con más escrituras y la integración, y además operar OpenEMR.

### 3.6 Comparación de las dos vías

| Criterio | (1) Lavado de cara | (2) Portal propio sobre OpenEMR |
|---|---|---|
| Aspecto | Marca, español, móvil digno; techo en estructura e iframes | Total libertad |
| Qué construimos | Tema + módulo + integración | Toda la interfaz del paciente + módulo con escrituras + integración |
| Autenticación del cliente | Credenciales del portal de OpenEMR, o enlace mágico del módulo enviado por el monolito | SMART (pantallas de OpenEMR) o sesión propia del monolito |
| Datos de salud | Solo en OpenEMR | En OpenEMR, pero pasan por el monolito en cada vista |
| Mantenimiento por actualización | Revisar 3 parciales Twig, el CSS y las rutas del módulo (capturas automáticas) | Revisar rutas del módulo y contratos FHIR |
| Horas MVP (estimación) | **52–76 h** | **67–90 h** |

### 3.7 Actualizaciones y mantenimiento

- **Cadencia de OpenEMR**: 8.4.0 salió el 13 sep y 8.4.1 el 20 sep de 2026. La 8.4.0 corrigió 16 avisos de seguridad. Tres eran **críticos**: ejecución remota de código, reasignación de documentos sin permiso y reutilización del token de un solo uso del portal (el mecanismo de nuestro enlace mágico). Otro, de gravedad alta, era una inyección SQL en el propio portal. Hay que parchear en días, no en meses.
- **Cómo sobrevive el tema**: nada está en el núcleo. El módulo vive en `interface/modules/custom_modules/oe-module-epi10` y en producción va en una **imagen derivada** (`FROM openemr/openemr:8.4.x` y `COPY` del módulo) o en un volumen. Logos, documentos y configuración del sitio están en el volumen `sites`. Las traducciones propias están en `lang_custom`.
- **Qué puede romperse**:
  - los 3 parciales Twig sobrescritos, si el núcleo cambia sus variables;
  - selectores CSS, si cambian clases o ids;
  - los servicios PHP que usa el módulo (`OneTimeAuth`, `sendMail`, `DocumentTemplateService`), si cambian su firma.
- **Defensa**: en cada versión, el script de capturas (`capturas_tema.mjs`) y las pruebas `07`–`08` contra una instancia de staging antes de producción.
- **Coste estimado**: 2–4 h al mes (actualizar, pasar pruebas y capturas, revisar avisos). El botón rojo pide 1–2 h al mes.
- **No probado**: una actualización real de versión con el módulo puesto (**Unknown**).

## 4. Horas y riesgos frente al botón rojo

### 4.1 Horas (estimación; el prototipo de hoy no se descuenta)

| Bloque | (1) Lavado de cara + módulo | Botón rojo (SKI2-205) |
|---|---|---|
| Despliegue en el servidor de EPI10: imagen derivada, compose junto a Odoo y el monolito, subdominio y TLS en Caddy, MFA del equipo, copias cifradas de BD y `sites`, monitorización | 8–12 | incluido en P0/P7 |
| Configuración: globals, funciones apagadas, categoría «Informes», plantillas reales (SKI2-184), usuarios y ACL de Aitor y Carmen | 5–8 | — |
| Tema del portal completo (todas las vistas, móvil, textos restantes, tarjeta «Mi informe» directa) | 8–12 | incluido |
| Back office simplificado (grupo ACL, menú, ficha recortada) | 3–5 | P5 9–12 |
| Módulo EPI10 a producción: rutas probadas, informe directo, el portal solo muestra la categoría «Informes», pruebas PHPUnit, auditoría | 8–12 | — |
| Módulo `openemr` del monolito en lugar de `healthie` (sección 4.5) | 12–16 | P1–P4 nuevos |
| Correo transaccional en español (enlace mágico, avisos) | 3–4 | incluido en P0 |
| Venta adicional (tarjeta → ruta del monolito → Checkout con el cliente) | 2–3 | P6 4–6 |
| Ensayo E2E, regresión visual y guía de actualización | 3–4 | P7 |
| **Total MVP** | **52–76 h** | **56–70 h** (60–76 h con venta) |
| Bloque legal (EIPD, encargo, textos) | 8–12 | 8–12 |
| Citas para el test mixto | **incluidas** (agenda y citas del portal) | Fase 2: 6–15 h |
| Mantenimiento | 2–4 h/mes | 1–2 h/mes |

La (2) se estima en **67–90 h**: la interfaz del paciente del botón rojo sin la capa de almacenamiento (30–38 h), las escrituras del módulo (10–14 h), la integración (12–16 h), el despliegue de OpenEMR (8–12 h), la configuración del back office (4–6 h) y el correo (3–4 h).

### 4.2 Despliegue y recursos

- Dos contenedores más en el servidor de EPI10: OpenEMR (Apache + PHP 8.5) y MariaDB 11.8. Hoy, en reposo, ocupan **166 MiB y 225 MiB** de RAM. La imagen pesa **4,0 GB** y la base vacía, 270 MB.
- Se aconsejan al menos 2 vCPU y 1–1,5 GB de RAM libres para OpenEMR con poca carga. Recursos reales del servidor: **Unknown** (SKI2-104).
- Exposición a internet: solo `/portal`, `/oauth2` y `/apis` detrás de Caddy, con límite de peticiones. El back office (`/interface`) iría restringido por IP o VPN, o como mínimo con segundo factor.
- Desactivar lo que no se usa: *password grant* (está activado en la instancia de prueba), módulos de fax/SMS, telemedicina, receta electrónica y registro público del portal.

### 4.3 RGPD

- **Los datos de salud quedan en OpenEMR**: consentimiento firmado, cuestionario, mensajes e informe. El monolito sigue guardando solo IDs, estados y eventos, como dice el ADR, y lee por API lo que necesita.
- La regla del botón rojo que obligaba a cifrar columnas en el monolito desaparece. Los documentos ya se guardan **cifrados en disco** (`drive_encryption = 1`, comprobado en las 4 filas de `documents`).
- OpenEMR trae **registro de auditoría** (`enable_auditlog = 1`), ACL, segundo factor y exportación de la historia (módulo EHI exporter, útil para el derecho de acceso).
- **A corregir en producción:**
  - `api_log_option = 2` guarda las peticiones y respuestas completas de la API (con datos de salud) en `api_log`; hay que bajarlo a 1;
  - el registro de accesos de Apache guarda en el *referer* el token del enlace mágico; es de un solo uso y caduca, pero hay que limitar la retención de esos registros;
  - el portal enseña **todos** los documentos de la ficha: nunca se sube allí el entregable de TellmeGen ni nada interno, o se filtra con el módulo.
- **Alojamiento en la UE**: depende del servidor de EPI10 (proveedor y país **Unknown**). No hay encargado nuevo ni transferencias, porque es autoalojado. Aresoltec pasa a tratar datos de salud si administra la máquina (encargo **Unknown**).
- **La EIPD sigue haciendo falta**, como con Healthie o con el botón rojo.

### 4.4 Copias, actualizaciones y seguridad

- **Copias**: volcado diario de MariaDB y del volumen `sites` (documentos, logos y configuración), cifrado con una clave distinta y enviado a un destino en la UE. Las claves del cifrado de documentos viven dentro de `sites`, así que la copia cifrada es obligatoria. Prueba de restauración trimestral.
- **Actualizaciones**: cambiar la etiqueta de la imagen derivada. El contenedor actualiza la base al arrancar con la versión nueva (**no probado aquí**). Antes, staging con las pruebas y capturas.
- **Seguridad**: suscripción a los avisos de `openemr/openemr` y parche en menos de una semana. MFA para el equipo. Contraseñas de la base y claves OAuth en el `.env` del servidor. Revisión de los clientes OAuth registrados.

### 4.5 Integración con el monolito: módulo `openemr` en lugar de `healthie`

| Hoy (`healthie`) | Con OpenEMR |
|---|---|
| `healthie.create_client` + invitación | `openemr.create_patient` (`POST /api/patient`) + `epi10_portal_access` + asignación de plantillas. El monolito envía el enlace mágico en su propio correo en español |
| Webhooks de onboarding → D3 | Trabajo periódico (cada 2–5 min) sobre `epi10_changes` con cursor. D3 = consentimiento firmado **y** cuestionario enviado → `onboarding_completado` y efectos en Odoo (ya existen) |
| `healthie.send_message` (4 mensajes de hito) | `epi10_portal_message` con los textos de `mensajes.ts` + correo de aviso |
| Grupos de Healthie | Desaparecen: el estado vive en el `core` |
| Publicar el informe en Healthie | Tercer publicador: `POST /api/patient/:pid/document?path=/informes` + mensaje «tu informe está disponible» |
| Cita (D4) | Cita del portal de OpenEMR o anotada por Aitor. FHIR `Appointment` se lee con el scope `user/Appointment.read` (no incluido en el cliente de prueba, sin probar) |
| Alternativa manual (SKI2-172) | Se conserva para fallos: actividad en Odoo con enlace a la ficha |

El patrón del cliente con reintentos, candados e idempotencia del módulo `healthie` se reutiliza; cambia el transporte (REST en lugar de GraphQL) y llegan los cursores en lugar de los webhooks.

### 4.6 Convivencia con Odoo

- **Odoo sigue siendo el back office de operaciones**: etapas, actividades de Aitor, hitos del kit (D8) e incidencias. **OpenEMR es la ficha de salud y el portal.** No se duplica el kanban.
- Un mensaje nuevo de una paciente → actividad en Odoo «Responder mensaje» con enlace a OpenEMR (mismo patrón que el botón rojo).
- Riesgo: **dos herramientas para Aitor** (Odoo y OpenEMR) frente a una en el botón rojo, donde Odoo más la pantalla de informes ampliada lo cubrían. Mitigación: menú mínimo en OpenEMR y enlaces directos desde Odoo.
- Los dos sistemas viven en el mismo servidor. Coordinar con Aresoltec puertos, copias y actualizaciones (SKI2-104).

### 4.7 Riesgos

| # | Riesgo | Prob. | Impacto | Mitigación |
|---|---|---|---|---|
| R1 | Vulnerabilidad del portal expuesto (en 8.4.0 se corrigieron una RCE crítica y una SQLi alta en el portal) | Media | Muy alto | Parches en días, solo las rutas necesarias expuestas, back office no público, MFA |
| R2 | Una actualización rompe el tema o el módulo | Media | Medio | Imagen fijada por versión, staging, capturas y pruebas automáticas |
| R3 | Nadie mantiene OpenEMR tras el MVP | Media | Alto | Contrato de mantenimiento con horas al mes; si no, botón rojo |
| R4 | El portal enseña documentos internos | Alta si no se controla | Alto | Solo se sube el informe final; filtro por categoría en el módulo |
| R5 | Aitor se pierde entre Odoo y un EHR | Media | Medio | ACL y menú mínimos, enlaces desde Odoo, guía corta |
| R6 | Los textos y la estética del portal no convencen a Carmen | Media | Medio | Enseñar las capturas y la instancia antes de decidir |
| R7 | El servidor de EPI10 no da para Odoo, el monolito y OpenEMR | **Unknown** | Alto | Pedir recursos a Aresoltec; OpenEMR gestionado en Francia (DINAO) como plan B |
| R8 | Las horas no caben en las 110 h | Alta | Alto | Igual que el botón rojo: decidir alcance o presupuesto antes de empezar |

## 5. Recomendación

1. **Descartar la (2).** No es la mejor: suma el coste de la interfaz propia, el de operar OpenEMR y el de un módulo con más escrituras, porque la API del paciente no escribe.
2. **Si Raúl quiere OpenEMR, la opción es la (1)**: OpenEMR con la cara de EPI10, módulo `oe-module-epi10` y módulo `openemr` en el monolito. Cumple los criterios de Raúl: automatiza el journey entero, en español, con la marca, datos en la UE y venta adicional. Está probado hoy con capturas.
3. **No promete ahorro de horas en el MVP** (52–76 h frente a 56–70 h). El ahorro está en lo que viene después: citas del test mixto, auditoría, permisos, MFA, versiones de documentos y exportación de datos, que en el botón rojo serían horas nuevas. También en no escribir nosotros el código que guarda datos de salud.
4. **Condiciones para elegirla**:
   - el servidor de EPI10 aguanta 2 contenedores más (SKI2-104);
   - hay acuerdo de mantenimiento mensual para parchear OpenEMR;
   - Carmen da el visto bueno al aspecto con estas capturas.
5. **Si falla alguna condición, botón rojo.** OpenEMR mal mantenido y expuesto a internet con datos genéticos es peor que un portal propio pequeño.

**Siguiente paso propuesto**: Raúl prueba la instancia (http://localhost:4896/portal/, 15 min) y decide entre (1) y el botón rojo en SKI2-204. Si elige (1), las issues serían:

1. despliegue y seguridad;
2. configuración y plantillas;
3. tema completo;
4. módulo a producción;
5. módulo `openemr` del monolito;
6. correo y venta adicional;
7. E2E y guía de actualización;
8. legal.

## Unknown

| # | Qué no sabemos | Quién o cómo |
|---|---|---|
| U1 | Recursos, proveedor y país del servidor de EPI10, y si cabe OpenEMR junto a Odoo | Aresoltec (SKI2-104) |
| U2 | Cómo se comporta una actualización real de versión con el módulo y las plantillas sobrescritas | Probar en staging con la próxima versión |
| U3 | Por qué el token SMART de la paciente no ve sus `DocumentReference` (0 resultados) ni su `Binary` (401) en 8.4.1 | Depurar o abrir incidencia en OpenEMR. No bloquea la (1) |
| U4 | Ajuste fino de las ACL del grupo de operaciones (hoy oculta Citas y Mensajes) | 2–3 h de configuración |
| U5 | Lectura de citas por FHIR (scope no incluido en el cliente de prueba) | Registrar el scope y probar |
| U6 | Textos reales del consentimiento y preguntas de la encuesta | Carmen y Aitor (SKI2-184) |
| U7 | Si Aresoltec u otro puede asumir el mantenimiento mensual de OpenEMR | Raúl con Carmen |
| U8 | Horas consumidas de las 110 h | Raúl (U1 de SKI2-205) |
| U9 | Si el estado `in-progress` del `QuestionnaireResponse` cambia al revisar el documento en el back office | Probar la revisión del equipo |
