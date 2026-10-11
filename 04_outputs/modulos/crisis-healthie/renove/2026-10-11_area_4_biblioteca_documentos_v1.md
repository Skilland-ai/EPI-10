# Área 4 · «Mi informe» (biblioteca de documentos), visor PDF y pestaña Documentos: research, prototipo e integración (v1)

Fecha: 2026-10-11 · Linear: SKI2-234 (hija de SKI2-230) · Fase A terminada; la B empieza ya sobre la base del área 0
Entrada: [feedback de Raúl](../2026-10-11_feedback_vistas_openemr_v1.md) §1.7 y §2.4 · [base de interfaz](2026-10-11_base_interfaz_decision_v1.md) y [guía](00_base_interfaz.md) · contrato v1 (`CONTRATO.md`, PR #1 de `Skilland-ai/epi10-oe-module`, regla R4)
Código: rama `renove-area-4` de `Skilland-ai/epi10-oe-module` (parte de `renove-area-0`). Ya está escrito como código del módulo de interfaz (`oe-module-epi10-ui/src/Biblioteca/`, plantillas, islas). El laboratorio que lo monta tal cual en `/portal/epi10-lab-4/` está en `openemr-pruebas/evidencia/renove/04-documentos-laboratorio/`.

**Nombres (11 oct, a petición del área 0):** la lista de tareas del área 2 ya es `portal/mis-documentos.php` («Mis documentos», tarjeta `#documents-go`). La biblioteca del área 4 se llama **«Mi informe»** (`portal/biblioteca.php`, tarjeta `#reports-go` vía `config.php › destinos_tarjetas` del área 1) para que no haya dos «Mis documentos».

## Resumen

- **Visor:** una **isla propia con PDF.js 6.3** (Apache-2.0, vendorizado sin build) que pinta las páginas en `<canvas>`, a lo ancho, solo cuando entran en pantalla, con página actual, zoom y «volver». Se descarta el visor nativo en `<iframe>` porque **no funciona en Chrome de Android** (ofrece descargar) y en iOS se ve sin controles; el portal se usará sobre todo en el móvil. La descarga directa en PDF queda como acción secundaria. **Nunca ZIP.**
- **Solo lo publicado:** la biblioteca lee `Informes::publicados()` del contrato (R4). No repite la regla: la usa. Un PDF de la ficha que no se publicó da 404 también por URL.
- **Estados de interacción:** `nuevo` (publicado y nunca abierto) y `visto` (abierto en el visor o descargado), en una tabla mínima `epi10_documentos_vistos`. `pendiente` son las tareas que le faltan (consentimiento, cuestionario), con el mismo cálculo que `estado_formularios`. La tarjeta del inicio lleva una insignia con lo nuevo más lo pendiente.
- **Back office:** pestaña Documentos con **tres filas y nada más** (Consentimiento, Cuestionario, Informe) y «Subir otro documento» como enlace secundario. El informe va de **sin informe → borrador → validado → publicado**; «Publicar informe» usa la misma clase del contrato con la referencia del caso, así que una llamada posterior del monolito es idempotente. **El contrato v1 no cambia.**
- **PR:** https://github.com/Skilland-ai/epi10-oe-module/pull/10 (contra `main`, sin fusionar). E2E 44/44 también en `MODO=modulo` sobre la instancia integrada.
- **Prueba E2E: 44/44 en verde** (Playwright, escritorio y móvil, portal y back office). Rama `renove-area-4`, commit `2516ffc` (rebasada sobre `renove-area-0` 19a7b8b, sin conflictos con `renove-integracion`), enviada al área 0 para integrarla; el área 7 ya la incluye en su ficha (`90d3685`).

## Comparativa del visor

| Candidato | Licencia | Peso | Móvil | Encaje | Veredicto |
|---|---|---|---|---|---|
| Visor nativo en `<iframe>`/`<embed>`/`<object>` | — | 0 KB | **Android Chrome no pinta PDF en iframe** (ofrece descargarlo); Safari de iOS lo enseña como imagen, sin páginas ni zoom propios | Trivial; aspecto distinto en cada navegador y con la barra del navegador en inglés en algunos | Solo como plan B en escritorio |
| **PDF.js 6.3 (`pdfjs-dist`), isla propia** | Apache-2.0 | 450 KB + 1,27 MB del *worker* (130 + 375 KB con gzip); se cargan solo al abrir un documento y quedan en caché | Igual en todos: canvas a lo ancho, scroll vertical, zoom | Módulo ES sin build, como pide la base; controles con los componentes `epi-` | **Elegido** |
| Visor completo de PDF.js (`web/viewer.html`) | Apache-2.0 | ~3 MB más sus locales | Bien | Interfaz propia de Mozilla (barra, miniaturas, textos traducibles) que no es la de la app | Descartado: no parece EPI10 |
| react-pdf / vue-pdf | MIT | PDF.js + framework | Bien | Necesitan React o Vue y build | Descartado (la base es Preact sin build) |
| Nutrient (PSPDFKit), Apryse, Foxit Web SDK | Comerciales | Grandes | Muy bien | Licencia de pago por dominio | Descartado |
| Visor de Google Docs o servicios en la nube | Servicio de terceros | — | Bien | **Saca datos de salud a un tercero** | Descartado |

Referencia de patrón para la lista con estados: la bandeja de documentos de Healthie y las apps de banca (lista con punto de «nuevo», fecha y un único botón «Abrir»), más una tarjeta destacada cuando llega el entregable importante.

## Modelo de estados

| Dónde | Estado | Regla | Se guarda en |
|---|---|---|---|
| Portal, cada documento | `nuevo` | Publicado por `publicar_informe` y sin fila en `epi10_documentos_vistos` | — |
| | `visto` | Abierto en el visor o descargado (cuenta veces y descargas) | `epi10_documentos_vistos (pid, document_id, primera_vez, ultima_vez, veces, descargas)` |
| Portal, «Te falta» | `pendiente` | Formulario del contrato en `pendiente` o `en_curso` (`Portal\Formularios::estado`) | — (lo calcula el contrato) |
| Inicio, insignia | número | nuevos + pendientes (`portal/api/novedades.php`) | — |
| Back office, Consentimiento | Firmado · Sin firmar · Pendiente · Sin asignar | Estado del contrato; «Ver PDF» abre el consentimiento archivado en la ficha (`Consentimiento*.pdf`) | — |
| Back office, Cuestionario | Completado · Empezado · Pendiente · Sin asignar | Estado del contrato; «Ver respuestas» lee el `QuestionnaireResponse` FHIR de OpenEMR y lo pinta como preguntas y respuestas (Sí/No en español) | — |
| Back office, Informe | Sin informe | Ni borrador ni publicado | — |
| | Borrador | PDF subido por el equipo a «Borradores de informe EPI10», más nuevo que lo publicado | `documents` |
| | Validado | Marca del equipo sobre el borrador | `epi10_informes_validados (document_id, pid, usuario, validado_en)` |
| | Publicado | En `epi10_informes_publicados` (contrato). Muestra si la clienta ya lo abrió | contrato |

**Por qué no `onsite_portal_activity`:** es la cola de auditoría del portal de OpenEMR (el «Portal Dashboard» enseña sus filas como pendientes de revisar). Escribir ahí cada lectura llenaría esa cola. Las dos tablas nuevas solo guardan IDs, fechas y contadores, y se crean solas (`CREATE TABLE IF NOT EXISTS`), como las del contrato.

## Qué hace el prototipo

**Portal («Mi informe», precioso):** cabecera común con «Volver a tu espacio». Si hay un documento nuevo, una tarjeta destacada azul «Informe EPI10 ya está listo · Leer ahora». Debajo, «Te falta» (solo si queda algo) y «Tus documentos»: icono, título, «PDF · 148 KB · Hoy», insignia Nuevo o Visto y botón «Abrir». Sin documentos: estado vacío con los tres pasos del proceso y «Escribir al equipo».

**Lector:** «Volver a Mi informe», barra con título, fecha y «Descargar PDF» (secundario), y el visor: páginas como papel sobre marfil, control flotante con «‹ 1 / 3 ›» y zoom (60–250 %). Abrirlo marca el documento como visto. En el móvil ocupa la pantalla y la descarga queda como icono.

**Back office (pestaña Documentos, usable):** las tres filas con insignia de estado, fecha, una nota corta («La clienta lo abrió: hoy», «La clienta todavía no lo ve») y la acción que toca: «Ver PDF», «Ver respuestas», «Subir informe», «Marcar validado», «Publicar informe» (con confirmación). «Subir otro documento» es un enlace secundario que guarda el PDF en «Documentos del equipo EPI10»: **nunca llega al portal** (R4). Ver un documento usa el mismo visor que el portal.

**Decisiones del orquestador (11 oct):** «validado» se marca en el monolito; publicar desde la ficha es un atajo de demo sin aviso a la clienta y sin que el monolito se entere (contrato v1.1 después de la demo). Ver «Riesgos».

Datos de prueba: un informe **ficticio** de Lucía de 3 páginas con la marca EPI10 (`04-documentos-laboratorio/datos/informe-ficticio.html` → PDF con Playwright), publicado por el contrato real (`POST epi10_v1_informe`, referencia `lab4-lucia-informe-ficticio-v1`, documento 26). El flujo subir → validar → publicar se probó en la paciente ficticia pid 12 («Marta Contrato Ficticia»).

## Cómo se engancha sin tocar el núcleo

| Pieza | Dónde | Cómo |
|---|---|---|
| Lógica | `oe-module-epi10-ui/src/Biblioteca/` (`Biblioteca`, `FichaDocumentos`, `Paginas`, `Pdf`, `Fecha`, `Esquema`) | Usa las clases internas del contrato: `Portal\Informes` (publicados, publicar), `Portal\Formularios` (estados), `Portal\Esquema` (categorías). **Depende del PR #1 (oe-module-epi10 1.0.0)** |
| Portal | `public/portal/biblioteca.php`, `biblioteca-documento.php?id=`, `biblioteca-pdf.php?id=[&descargar=1]`, `api/biblioteca-novedades.php` | `verify_session.php`: el pid sale de la sesión. `biblioteca-pdf.php` solo sirve IDs de `Informes::idsPublicados($pid)` |
| Back office | `public/backoffice/ficha-documentos.php?pid=[&compacto=1]`, `ficha-ver-documento.php`, `ficha-pdf.php`, `ficha-documentos-accion.php` | `interface/globals.php` + ACL `patients/docs` (lectura para ver; escritura o `addonly` para subir, validar y publicar). POST con CSRF propio y vuelta a la ficha (PRG) |
| Ficha del área 7 | Su hueco `data-epi10-slot="documentos"` | `{% include "@epi10/componentes/documentos_ficha.html.twig" %}` con `Paginas::varsFicha($pid, $urlDeVuelta)`. Sin iframe |
| Inicio | `config.php › destinos_tarjetas` del área 1 | La tarjeta `#reports-go` (mismo id) deja de abrir el menú del núcleo y va a `biblioteca.php`. **Así desaparece «Resumen de mi historial»** de la vista; además `allow_custom_report = 0`. Insignia: el «Disponible» del área 1; la isla `aviso-novedades` (nuevos + pendientes) queda disponible si se prefiere «Nuevo» hasta que se abre |
| Islas | `public/ui/islas/visor-pdf.mjs`, `aviso-novedades.mjs`; `public/ui/vendor/pdfjs/` | Montadas por el cargador del área 0 (`data-epi10-isla`) |
| Estilos | `public/ui/epi10-biblioteca.css` (solo en estas vistas) | Prefijo `epi-`, tokens de la base; no toca `epi10-ui.css` |
| Iconos | `public/ui/iconos.svg` | +5 de Lucide (ISC): `zoom-in`, `zoom-out`, `chevron-left`, `file-check`, `badge-check` |

**«Publicar informe» y el monolito.** Hoy publica el monolito por el contrato. Si Aitor publica desde la ficha, se usa `Informes::publicar` con la referencia del caso (`epi10_referencias`): cuando el monolito llame después a `publicar_informe` con esa referencia, recibirá `duplicado: true` y no habrá dos informes. Si el caso ya tenía informe publicado, la versión nueva lleva una referencia propia (`<caso>:equipo:<id>`).

**Selectores para Playwright:** `data-epi10-vista` (`mi-informe`, `biblioteca-documento`, `ficha-documentos`, `ficha-ver-documento`), `data-epi10-lista` (`documentos`, `pendientes`, `documentos-ficha`, `respuestas`), `data-epi10-item` (id del documento o `consentimiento`/`cuestionario`/`informe`), `data-epi10-estado`, `data-epi10-informe` (`sin_informe`/`borrador`/`validado`/`publicado`), `data-epi10-accion` (`abrir-documento`, `abrir-destacado`, `descargar`, `pagina-anterior`, `pagina-siguiente`, `acercar`, `alejar`, `ajustar`, `ver-consentimiento`, `ver-cuestionario`, `ver-informe`, `subir-informe`, `validar-informe`, `publicar-informe`, `confirmar-publicar`, `subir-otro`), `data-epi10-visor-estado` (`cargando`/`listo`/`error`), `data-epi10-visor-pagina`, `data-epi10-novedades`. No se cambia ningún id del núcleo (`#reports-go` se conserva).

## Coordinación

| Con | Qué |
|---|---|
| Área 0 | Instala la rama (protocolo: solo el área 0 ejecuta `instalar-ui.sh`). Único archivo compartido: `iconos.svg` (+5 símbolos); fila en `VENDORS.md` |
| Área 1 | La tarjeta `#reports-go` apunta a `biblioteca.php` por su `destinos_tarjetas` (la línea la añade el área 0 al integrar) |
| Área 2 | «Te falta» enlaza a `tarea.php?f=<formulario>` de su diseño. Si cambia la ruta, es una línea en `Paginas::rutas()` |
| Área 3 | El estado vacío enlaza a «Escribir al equipo»: hoy al inicio; en la fase B, a la URL del chat |
| Área 7 | Incluye la pestaña en `data-epi10-slot="documentos"` (ver tabla). El grupo «EPI10 Operaciones» necesita `patients/docs` de escritura para publicar |
| SKI2-210 | Dependo de `Portal\Informes`, `Portal\Formularios` y `Portal\Esquema` del PR #1 tal como están. No cambio el contrato |

## Riesgos y Unknown

| Tema | Detalle | Propuesta |
|---|---|---|
| Peso de PDF.js | 1,7 MB sin comprimir la primera vez; **Apache de la instancia no comprime `.mjs`** | Carga perezosa (solo al abrir un documento) y caché del navegador. En producción, gzip/brotli en el proxy |
| Navegadores antiguos | PDF.js 6 pide navegador moderno | Si falla, la isla enseña «Descargar PDF» (probado el camino de error en código, no en un navegador viejo) |
| Accesibilidad del PDF | El canvas no tiene capa de texto: no se puede seleccionar ni lo lee un lector de pantalla | Fase posterior: activar la capa de texto de PDF.js (`TextLayer`). La descarga queda siempre |
| «Validado» | **Decidido (orquestador, 11 oct):** lo marcan Aitor o Carmen en la pantalla de informes del monolito, que es donde se revisa el borrador; OpenEMR solo lo refleja | El botón «Marcar validado» de la pestaña queda como atajo de demo. Para reflejar la validación del monolito hace falta el contrato v1.1 (después de la demo) |
| El monolito no se entera de una publicación hecha desde la ficha | **Decidido:** publicar desde la ficha es un atajo de demo; lo normal es publicar desde el monolito por el contrato (idempotente por `case_id`, comprobado). **Limitación:** desde la ficha, el monolito no se entera | Después de la demo, contrato v1.1: `publicado_en` o un evento en `mensajes_nuevos` |
| Aviso a la clienta | **Decidido:** lo manda el monolito con el mensaje de hito «informe disponible» cuando publica por el contrato. **Limitación:** si se publica desde la ficha, no hay aviso | Ninguna para la demo: se publica desde el monolito |
| Rutas del núcleo aún accesibles por URL | `portal/report/portal_patient_report.php` («Customized Medical History Report», que en español sale como «Resumen de mi historial») respondía si alguien escribía la URL | **Decidido por el orquestador:** `allow_custom_report = 0` y `ccda_alt_service_enable = 0`. Los fija el `aplicar.sh` del área 7, que ya los ha aplicado en la instancia (con `--revertir`) |
| Fechas | Las tablas nuevas guardan la hora de la sesión de OpenEMR (Madrid); la consola de MariaDB está en UTC | Mismo riesgo R2 del área 7; la interfaz solo enseña días |
| Varias versiones | El portal enseña todas las publicadas, la más reciente primero | Basta para la demo |
| Informe de Lucía | El PDF publicado a Lucía (documento 26) se generó con el logo de portada estirado; el PDF del repositorio ya está corregido | Se queda como caso de referencia. Republicar añadiría un segundo informe a su biblioteca: no lo hago sin que lo pida el orquestador |

## Pruebas (hermes-node, OpenEMR 8.4.1)

`openemr-pruebas/evidencia/renove/04-documentos-laboratorio/pruebas/biblioteca_e2e.mjs` (Playwright 1.56; Lucía en el portal, `admin` en el back office; escritorio 1366/1440 px y móvil 390 px): **44/44 OK** (11 oct, tras corregir una carrera de la propia prueba y un fallo real: las fechas de `documents` mezclan zonas horarias en la instancia, así que el borrador se compara con lo publicado por id de documento y no por fecha)

Comprueba: carga con la base EPI10 UI; solo el documento publicado (ninguno de los 7 PDF no publicados de Lucía); `biblioteca-pdf.php` de un documento no publicado da 404; PDF en línea para el visor; el visor pinta las 3 páginas, indicador «1 / 3», zoom; «volver» a Mi informe; descarga directa `.pdf`; nuevo → visto al abrirlo; API de novedades; sin scroll horizontal y sin inglés; tres filas y nada más; «Ver respuestas»; consentimiento firmado en el mismo visor; subir → borrador → validado → publicado; sin errores de JavaScript.

Capturas en `openemr-pruebas/evidencia/capturas/renove/04-documentos/fase-a/`: `antes_*` (menú «Mi informe» del núcleo, página del contrato 1.0.0, árbol de documentos del back office) y `despues_*` (biblioteca, visor y pestaña, en escritorio y móvil), más `resultado.json`.

Fuentes: [npm, pdfjs-dist 6.3.289](https://www.npmjs.com/package/pdfjs-dist) · [PDF.js, ejemplos de uso de la API](https://mozilla.github.io/pdf.js/examples/) · [Lucide (ISC)](https://lucide.dev/license).
