# Área 2 · Tareas y documentos firmables: research, elección e integración (v1)

Fecha: 2026-10-11 · Linear: SKI2-232 (hija de SKI2-230) · Fase A (research y prototipo aislado) · Estado: **prototipo funcionando en la instancia, pendiente de la guía del área 0 para la fase B**
Entrada: [feedback de Raúl §1.3, 1.4 y 1.5](../2026-10-11_feedback_vistas_openemr_v1.md) · [base de interfaz (área 0)](2026-10-11_base_interfaz_decision_v1.md) · [prototipo SKI2-207](../2026-10-07_openemr_headless_v1.md) · contrato v1 (`CONTRATO.md`, PR #1 de `Skilland-ai/epi10-oe-module`).

## Veredicto en cinco líneas

1. **Elección: vistas propias del módulo sobre el almacenamiento nativo de OpenEMR.** Por fuera, la plantilla única de tarea, hecha con la base del área 0 (isla Preact). Por dentro, **signature_pad** (MIT) para firmar y un **cuestionario por pasos propio** que lee el FHIR `Questionnaire` del repositorio de OpenEMR.
2. **Lo que se guarda no cambia:** las mismas filas y columnas que escribe hoy el portal nativo (`onsite_documents`, `onsite_signatures`, `onsite_portal_activity` y `QuestionnaireResponse`). Por eso `EstadoFormularios` y el contrato v1 (`asignar_formularios`, `estado_formularios`) siguen igual, y el back office ve lo mismo que hoy.
3. **Descartados como motor:** SurveyJS, Form.io, JSON Forms y Formily. Todos usan un esquema propio que no es FHIR, son pesados o necesitan React o Vue con compilación, y obligarían a traducir las respuestas de ida y vuelta. SurveyJS queda como plan B si algún día hace falta lógica condicional compleja.
4. **Los nativos no se pueden «vestir bien» solo con CSS.** La página de documentos es Phreeze con una barra de siete botones y textos fijos en el JavaScript. El «Yes» del cuestionario está escrito en el código del motor (`openemr_questionnaire.js:1273`). Se conserva lo nativo **como almacenamiento y como vista de respaldo**, no como interfaz.
5. **Prototipo:** http://localhost:4896/portal/epi10-lab-2/ (con datos ficticios y sin escribir en OpenEMR). Hecho el recorrido completo en escritorio y móvil con Playwright, sin errores de consola. Fase B estimada en 10–14 h.

## 1. Qué hay hoy y qué pide Raúl

| Vista | Hoy (núcleo) | Lo que pide Raúl |
|---|---|---|
| 1.3 Mis documentos | `portal/patient/onsitedocuments` (Phreeze): barra de Firma, Elegir documento, Historial, Recargar, Adjuntar y Volver, con la cabecera duplicada y una barra «Editando» | Lista didáctica de tareas con su estado y su botón; historial y adjuntar en segundo plano |
| 1.4 Consentimiento | La plantilla «Consentimiento EPI10 Salud» con casillas en línea, la firma en un modal y el CTA perdido en la barra. Además, «New Version / Status: In Review», «Borrar documento» y dos «Cerrar» | Visor de documento como un papel, aceptación explícita, «Firma aquí» y un único CTA grande «Firmar y enviar a EPI10» |
| 1.5 Cuestionario | `{Questionnaire:…}` en un iframe dentro de otro iframe; el motor FHIR nativo de 8.4 pinta todas las preguntas juntas y escribe «Yes» | Una pregunta por pantalla, barra de progreso, guardado parcial, «Sí/No» y confirmación |

Común a las tres: **una sola plantilla de tarea**. Por fuera, la app; por dentro, título y propósito, pasos, un único CTA y una confirmación.

## 2. Comparativa corta

Criterios: licencia permisiva, sin compilación (ver la decisión del área 0), peso, español, una pregunta por pantalla con progreso, y **encaje con lo que OpenEMR ya guarda** (FHIR `Questionnaire` y `QuestionnaireResponse`, `onsite_documents`). El último criterio es el que decide.

| Candidato | Licencia | Peso y forma | Esquema | Encaje con OpenEMR y el contrato | Veredicto |
|---|---|---|---|---|---|
| **SurveyJS Form Library** (`survey-core` + `survey-js-ui`) | MIT (el Creator es de pago) | ~1,1 MB minificado (~280 KB gzip) solo el núcleo, más la interfaz. Va sin compilar, pero es pesado | JSON propio. Trae páginas, barra de progreso, i18n y lógica condicional | Hay que convertir FHIR → SurveyJS y las respuestas → `QuestionnaireResponse`, mantener dos esquemas y quitarle su tema para ponerle el nuestro | **Plan B** si el cuestionario crece con mucha lógica |
| **Form.io** (`formiojs`, renderizador) | MIT el renderizador; la plataforma es aparte | Pesado, con estilos de Bootstrap y modo asistente | JSON propio de Form.io | Está pensado para su servidor de envíos. Además, otra vez la doble conversión | Descartado |
| **JSON Forms** (EclipseSource) | MIT | Renderizadores para React, Angular o Vue: obliga a compilar | JSON Schema + UI Schema | JSON Schema no es FHIR, y además mete un framework con compilación | Descartado |
| **Formily** (Alibaba) | MIT | React o Vue, con compilación; documentación sobre todo en chino | JSON Schema propio | Lo mismo, con más peso | Descartado |
| **LHC-Forms** (el antiguo motor de OpenEMR) | — | — | FHIR | **OpenEMR 8.4 lo ha eliminado** (`LFORMS_MIGRATION.md` del núcleo) | No aplica |
| **Motor FHIR nativo de OpenEMR 8.4** (`questionnaire_assessments`, `native/openemr_questionnaire.js`, 64 KB) | GPL-3 (el núcleo) | Ya está instalado | FHIR | Guarda exactamente lo que queremos, pero pinta todas las preguntas juntas, dentro de iframes, y con «Yes» fijo en el código | **Se usa su almacenamiento y su servicio de guardado**, no su interfaz |
| **Firma nativa de OpenEMR** (`portal/sign`, signature_pad **4.0.4** en un modal) | GPL-3 / MIT | Ya está instalada | — | La tabla `onsite_signatures` y el formato de `template_data` sirven tal cual. El modal y la barra no | **Se usa su almacenamiento**, no su interfaz |
| **signature_pad 5.1.4** (szimek) | MIT | 17 KB minificado, sin dependencias, eventos de puntero (dedo y ratón) | — | Produce el mismo PNG en *data URL* que guarda el núcleo | **Elegido** para la firma |
| **Cuestionario por pasos propio** (isla Preact sobre el FHIR `Questionnaire`) | Nuestro | Unos 6 KB dentro de la isla `tareas` | FHIR directamente: `integer`, `decimal`, `choice`, `boolean`, `string`, `text`, `date`, grupos y `enableWhen` básico | Lee el mismo `Questionnaire` y genera un `QuestionnaireResponse` FHIR para el servicio nativo. Sin conversión | **Elegido** para el cuestionario |

Las versiones y los pesos de SurveyJS y Form.io salen de npm y de sus notas de versión (junio de 2026). Las de JSON Forms y Formily no las he comprobado: no cambian el veredicto, porque los descarta su modelo (framework con compilación).

## 3. Elección

**Una isla `tareas` de la base del área 0 con tres vistas: «Tus documentos», «Tarea» (documento para firmar o cuestionario) y «Confirmación». Detrás, un servicio PHP del módulo que lee y escribe con las tablas y los servicios nativos de OpenEMR.**

Por qué:

- **El contrato v1 no se toca, y ni siquiera su interior de estados.** `EstadoFormularios::calcular` sigue leyendo `onsite_documents` (`denial_reason`, `patient_signed_status`…) y la vista nueva escribe esas columnas con los mismos valores que el portal nativo. Las pruebas `EstadoFormulariosTest` y `tests/contrato/contrato_v1.py` siguen valiendo.
- **El back office no cambia.** El consentimiento firmado y la encuesta aparecen en el Portal Dashboard y en la cola de revisión (`onsite_portal_activity`), y se archivan en PDF como hoy. El área 7, que rehace esa vista, lee lo mismo.
- **El texto legal lo sigue gobernando OpenEMR.** El consentimiento es la plantilla «Consentimiento EPI10 Salud» del repositorio de plantillas. Si se cambia allí, cambia en el visor sin desplegar código.
- **Ligero y sin compilar.** La isla, el CSS y signature_pad suman unos 50 KB sin comprimir y funcionan en el móvil.
- **Una sola plantilla para todo.** Para una tarea nueva basta con añadir una entrada en `config.php` (textos, minutos, pasos) y su plantilla en OpenEMR. Si la plantilla lleva `{PatientSignature}` es un documento para firmar; si lleva `{Questionnaire:…}`, un cuestionario.

## 4. Prototipo (fase A)

- **Dónde:** rama `renove-area-2` de `Skilland-ai/epi10-oe-module`, carpeta `lab/area-2/`. Está desplegado en la instancia como directorio propio, **`/portal/epi10-lab-2/`**, sin tocar ninguna vista ni la copia del módulo.
- **Cómo verlo:** con el túnel abierto (`hn open 4896`), en http://localhost:4896/portal/epi10-lab-2/. No hace falta iniciar sesión: usa datos ficticios guardados en el navegador. «Reiniciar la demostración» vuelve al principio.
- **Piezas:**

| Archivo | Qué es |
|---|---|
| `tareas.mjs` | La isla: `Lista` («Tus documentos»), `PlantillaTarea` (cabecera, pasos, cuerpo, barra fija con el CTA único), `TareaDocumento` (papel, aceptaciones y `ZonaFirma`), `TareaCuestionario` (una pregunta por pantalla, progreso, guardado parcial y repaso) y `Confirmacion` |
| `adaptador-demo.mjs` | Datos de demostración con **la misma forma que la API real** de la fase B (`lista`, `tarea`, `guardarBorrador`, `enviar`) |
| `epi10-tareas.css` | Estilos con prefijo `epi-` bajo `.epi-tareas`, sin capas. El reset tiene especificidad (0,1,0) para ganar a Bootstrap sin pisar las clases. Los tokens de la base del área 0 mandan si existen |
| `vendor/` | `htm/preact/standalone` 3.1.1 (Apache-2.0 + MIT) y `signature_pad` 5.1.4 (MIT), con sus licencias |
| `index.html` | Un shell **provisional** y aislado (logo y avatar) que en la fase B sustituye el layout del área 0 |

- **Cómo resuelve cada punto de Raúl:**

| Punto | En el prototipo |
|---|---|
| Lista didáctica | Cada tarea con número, título, propósito, minutos, estado (Pendiente, A medias, Hecho y la fecha) y un único botón (Firmar, Rellenar, Continuar o Ver). La siguiente tarea va resaltada, con progreso «0 de 2 hechas» y el aviso «Todo listo por tu parte» al terminar |
| Lo secundario, en segundo plano | «Historial y otras opciones», plegado: lo enviado con su fecha y «Adjuntar un archivo». Sin botón «Recargar»: la lista se recarga sola al volver a la pestaña y cada minuto |
| Plantilla única | Antetítulo «Paso 1 de 2», título («Firma tu consentimiento»), propósito, «⏱ 2 min», pasos, cuerpo y **una sola barra fija abajo con el CTA grande**. Si falta algo, el CTA explica qué falta y lleva hasta ello, en lugar de quedarse mudo |
| Consentimiento | El documento como un papel con la marca, «Fin del documento», aceptaciones explícitas grandes, «Firma aquí con el dedo o el ratón» con línea de firma y «Borrar y repetir», nombre y fecha, y «Firmar y enviar a EPI10». Pasos: Leer → Aceptar → Firmar → Enviar. Sin «In Review», sin «Borrar documento» y sin dos «Cerrar» |
| Cuestionario | «Pregunta 3 de 6» con barra y porcentaje, opciones grandes, números con − y +, «Sí/No», «Opcional» en las no obligatorias, «Guardado. Puedes seguir más tarde.», repaso con «Cambiar» y «Enviar a EPI10». Al volver, retoma en la primera pregunta sin responder |
| Confirmación | ✓, «Consentimiento firmado», lo que pasa ahora y «Siguiente: Cuestionario de hábitos» |
| Idioma | Todo en español; no hay ningún texto del núcleo en la vista |

- **Pruebas** (Playwright desde el ASUS a través del túnel, Chromium a 1366×900 y con perfil de iPhone 13 táctil):
  - recorrido completo: lista → consentimiento → avisos sin aceptar («Marca las casillas…») → firma → envío → confirmación → cuestionario → aviso sin responder («Escribe un número…») → **recarga a mitad (retoma en la pregunta 4)** → repaso → envío → lista con «Todo listo» → consentimiento en modo lectura con la firma;
  - en escritorio y en móvil, con **0 errores de consola**;
  - capturas: `openemr-pruebas/evidencia/capturas/renove/02-tareas/lab/` (`lab_escritorio_*` y `lab_movil_*`, 10 de cada).

## 5. Cómo se engancha a OpenEMR y al módulo (fase B)

### 5.1 Piezas

| Pieza | Dónde (pendiente de la guía `00_base_interfaz.md`) | Qué hace |
|---|---|---|
| `public/portal/tareas.php` y `tarea.php?f=…` | Módulo de interfaz (`oe-module-epi10-ui`) | Comprueban la sesión del portal (`portal/verify_session.php`), pintan el layout común y montan `<div data-epi10-isla="tareas" data-props='{"vista":…}'>` |
| `public/portal/tareas_api.php` | Ídem | JSON `lista`, `tarea`, `borrador`, `enviar`. El `pid` sale **siempre de la sesión** y nunca de la petición, con CSRF de la sesión del portal |
| `Tareas` (servicio) | `oe-module-epi10`, junto a `Formularios`, porque comparte su `config.php › formularios` y los estados de `EstadoFormularios` | Lee las asignaciones y el estado con las mismas funciones que el contrato, y escribe como el portal nativo (5.2) |
| `config.php › tareas` | `oe-module-epi10` | Los textos de cada tarea: título, propósito, minutos, CTA y confirmación. Las claves son las de `formularios` |
| `adaptador-openemr.mjs` | Isla | Sustituye a `adaptador-demo.mjs` con la misma interfaz |

La tarjeta del inicio (`#documents-go`) conserva su id y pasa a apuntar a `tareas.php`. Se cambia en el parcial Twig sobrescrito, sin tocar el núcleo.

### 5.2 Qué escribe, columna por columna (lo mismo que el portal nativo)

**Enviar el consentimiento**, en una transacción:

1. `onsite_signatures`: crea o actualiza la fila de la paciente, igual que `portal/sign/lib/save-signature.php`. Guarda `type='patient-signature'`, `user=pid`, `signator`, `sig_image` (PNG en *data URL*), `sig_hash` (sha3-512), `ip`, `status='filed'` y `created`/`lastmod`.
2. `onsite_documents`, la fila de la plantilla asignada a la paciente (si no existe, la crea, igual que el `Create` nativo):
   - `file_path`: el id de la plantilla asignada;
   - `doc_type` y `file_name`: el nombre de la plantilla;
   - `full_document`: `template_content` más `<input id='portal_version' … value='New'>`;
   - `template_data`: `[{"name":"check0","value":"on"}, …, {"name":"portal_version","value":"New"}, {"name":"patient_signature0","value":"data:image/png…"}]`, con los mismos nombres que genera el render nativo, para que la revisión y el PDF del back office lo restauren igual;
   - `patient_signed_status=1`, `patient_signed_time=ahora` y `denial_reason='In Review'`.
3. `onsite_portal_activity`: `activity='document'`, `status='waiting'`, `pending_action='review'`, `table_action='update'`, `table_args=<id del documento>` y `narrative=<plantilla>`, como hace hoy el portal.

**Enviar el cuestionario:**

1. Se construye el FHIR `QuestionnaireResponse` a partir de las respuestas (`valueInteger`, `valueCoding`, `valueBoolean`, `valueString`).
2. Se guarda con `QuestionnaireResponseService::saveQuestionnaireResponse` y `FormService::saveEncounterForm(FormQuestionnaireAssessment)`, la misma secuencia que `interface/forms/questionnaire_assessments/save.php`. Devuelve el `formid`.
3. `onsite_documents`:
   - `encounter=formid` y `full_document='{Questionnaire:Hábitos de vida EPI10}'` + `portal_version`;
   - `template_data` con `encounterForm` (la URL de `questionnaire_assessments.php?…&id=formid`) y `encounterFormId`, para que el back office abra las respuestas en el visor nativo;
   - `denial_reason='In Review'`.
4. `onsite_portal_activity`, como arriba.

**Guardar el borrador** (solo el cuestionario): `onsite_documents` con `denial_reason='Editing'` y las respuestas en `template_data` (`{"name":"epi10_borrador","value":{…}}`). Para el contrato es `en_curso`, como hoy cuando la paciente guarda un borrador.

**Estados que verá el monolito** (tabla del contrato, sin cambios):

| Situación en la vista nueva | `estado_formularios` |
|---|---|
| Asignado, sin abrir | `pendiente` |
| Cuestionario con respuestas a medias | `en_curso` |
| Consentimiento o cuestionario enviado (el consentimiento, firmado) | `completado`, con `completado_en` |

### 5.3 Convivencia y respaldo

- La vista nativa `portal/patient/onsitedocuments` **sigue existiendo y funciona**: no se borra ni se toca. Deja de enlazarse desde el inicio («por omisión»), y queda como respaldo y para el ensayo E2E si hace falta.
- Lo que la paciente envíe desde la vista nueva se puede abrir en la nativa, y al revés, porque el almacenamiento es el mismo.
- «Adjuntar un archivo»: en la fase B, la acción secundaria usa la subida nativa del portal (el Dropzone de `onsitedocuments`, con el formulario `#patientFileDrop`). Su URL exacta (`$urlAjax`) y si conviene una subida propia más sencilla: **Unknown**, se decide en la fase B.

## 6. Coordinación con otros agentes

| Con quién | Qué | Propuesta |
|---|---|---|
| SKI2-210 (ensayo E2E) | Usa `#documents-go`, `#signTemplate` y `#sendTemplate` | `#documents-go` se conserva en la tarjeta del inicio. En la vista nueva, `#signTemplate` irá en la zona de firma y `#sendTemplate` en el CTA, junto a sus `data-epi10-*`. **Pero el flujo cambia**: no hay modal ni «Elegir documento», se firma en un canvas en la página. Dos opciones: (a) el E2E pasa a los pasos nuevos (selectores `data-epi10-*` y el trazo en el canvas); (b) el E2E sigue con el flujo nativo abriendo `/portal/patient/onsitedocuments` por URL. **Pendiente de confirmar con el orquestador antes de la fase B** |
| Área 0 | Layout, tokens, islas y carpeta del módulo de interfaz | La isla ya sigue su patrón (Preact + htm, `data-epi10-isla`, prefijo `epi-`, sin compilar). En la fase B se quita el shell provisional y los tokens de respaldo se leen de la base |
| Área 1 (inicio) | La tarjeta «Mis documentos» del inicio | El área 2 solo cambia su `href` (y el resumen «0 de 2» si el área 1 lo quiere pintar). Hay que acordarlo para no pisar el parcial Twig |
| Área 7 (back office) | La pestaña Documentos de la ficha | Lee lo mismo que hoy (§5.2). El área 7 puede reutilizar el papel y el visor de firma en modo lectura |

## 7. Riesgos y Unknown

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| Una actualización de OpenEMR cambia el formato de `onsite_documents`, `template_data` u `onsite_signatures` | Baja (es así desde 2016) | Un único punto de escritura (`Tareas`) con pruebas unitarias del formato, más el E2E y `contrato_v1.py` después de cada actualización |
| La revisión del back office no restaura la firma o las casillas escritas por la vista nueva | Media | Prueba en la fase B: abrir en el back office el documento enviado desde la vista nueva y archivarlo en PDF. Si falla, se ajusta `template_data` al formato exacto del render nativo |
| El texto de la plantilla cambia de forma (más casillas, campos de texto) | Media | El servicio convierte cada `{CheckMark}` en una aceptación y sustituye los datos de la paciente (`{PatientName}`, `{PatientDOB}`, `{DOS}`…). Si encuentra un marcador que no conoce, la tarea muestra un error en lugar de un documento a medias. Los marcadores soportados quedan documentados |
| Firma con validez legal | — | Igual que hoy: firma electrónica simple con imagen, hora, IP y hash (`onsite_signatures`). La vista nueva no la empeora. Que sea suficiente para datos genéticos es una pregunta legal (**Unknown**, fuera de esta área) |
| El cuestionario crece con lógica condicional compleja | Baja en el MVP | `enableWhen` básico ya soportado. Si no basta, el plan B es SurveyJS detrás de la misma isla |
| **Unknown**: si `QuestionnaireResponseService` acepta `status: completed` desde el portal sin otros efectos | — | Se prueba en la fase B; el nativo deja `in-progress`. El contrato no depende de ello |
| **Unknown**: si el E2E de SKI2-210 se adapta o se queda en el flujo nativo | — | §6, pendiente del orquestador |

## 8. Fase B: plan y horas

| Paso | Horas |
|---|---|
| Servicio `Tareas` (lectura y escritura nativas) y sus pruebas unitarias | 3–4 |
| `tareas_api.php`, las páginas y `adaptador-openemr.mjs` sobre el layout del área 0 | 2–3 |
| La tarjeta del inicio a la vista nueva (`#documents-go`), los ids del E2E y los `data-epi10-*` | 1 |
| Pruebas: recorrido de Lucía en la instancia, revisión y archivo en el back office, `contrato_v1.py` y E2E | 2–3 |
| Capturas antes y después (escritorio y móvil) en `capturas/renove/02-tareas/` y el PR | 1–2 |
| Margen de integración con las áreas 0, 1 y 7 | 1 |
| **Total** | **10–14 h** |
