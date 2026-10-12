# Batida de componentes UI · inventario consolidado e integración v1.2

Fecha: 2026-10-12 · Linear: SKI2-254 (sub-issue de SKI2-249) · Autor: integrador de la batida (Opus 5.5)
Entradas: inventarios de los lotes [A](2026-10-12_lote_A_v1.md) (SKI2-250), [B](2026-10-12_lote_B_v1.md) (SKI2-251), [C](2026-10-12_lote_C_v1.md) (SKI2-252), [D](2026-10-12_lote_D_v1.md) (SKI2-253) y [E](2026-10-12_lote_E_v1.md) (SKI2-255, referencias de Raúl en X, con [maqueta](capturas/E/maqueta-lote-E.html)). Base: [00_base_interfaz.md](../00_base_interfaz.md). Feedback de Raúl: [2026-10-11_feedback_vistas_openemr_v1.md](../../2026-10-11_feedback_vistas_openemr_v1.md). Código contrastado: `Skilland-ai/epi10-oe-module` `main` b013569 (lo instalado en la demo).

## Resumen ejecutivo

1. Los cinco lotes han visto **≈3.250 componentes o piezas** en 21 fuentes y 3 referencias de X, y han dejado 124 filas; de ellas proponían **45 para HOY**.
2. Tras deduplicar (el esqueleto lo proponían 4 fuentes; la línea de actividad, 4; la subida de archivos, 4; las pestañas deslizantes, 3) y quitar lo que ya existe o no se ve en la demo, **entran hoy 24 componentes distintos**, aplicados en **46 tareas** repartidas en 7 áreas más un retoque en el monolito (≈ 28 h de agente, 5–6 h de reloj en paralelo).
3. Criterio: sobrio y de salud. Nada de WebGL, partículas, confeti ni texto que vuela. El portal gana acabado; el back office, densidad de información.
4. **Portal · login:** sacudida si falla y botón «Entrar» con estado; grano en el panel azul. Ya estaba bien: entra poco.
5. **Portal · inicio:** rejilla bento sin huecos (el informe manda) y tarjetas «vivas» con un dato cada una («2 de 2 hechas», «Nuevo», «Sin cita»).
6. **Portal · mis documentos / tarea firmable / cuestionario:** esqueletos en lugar de spinner, tick que se dibuja, firma con «Deshacer trazo» y sello «Firmado», casillas con check dibujado y preguntas que se deslizan según la dirección.
7. **Portal · mensajes:** separadores de día fijos («Hoy», «Ayer») y burbujas agrupadas por remitente (deja de repetir «Operaciones» y la hora en cada burbuja); adjuntos con icono de formato, fila con progreso y error, y «Suelta para adjuntar» al arrastrar. **Mi informe:** icono PDF de verdad, esqueleto en el visor, grano en el destacado y carpeta plana en el vacío. **Citas:** solo esqueleto (ya está bien).
8. **Back office · ficha:** datos clave en la cabecera, pestañas con indicador deslizante y **línea de actividad** en Resumen («Lucía firmó el Consentimiento»), la referencia de Raúl. **Lista:** progreso de fase por fila y chips con punto y contador. **Mensajes del equipo:** filtro «Todas · Sin responder». Selector, panel «Hoy» y calendario: ya están bien, sin cambios propios.
9. **El área 0 entra primero** (PR 1, contratos CSS, ≈ 3 h, portando la maqueta del lote E): esqueleto, icono de tipo y chip de adjunto, fila de archivo, zona de arrastre, carpeta plana, segmentado, dato vivo, grano, línea de actividad y tokens de movimiento. Las demás áreas trabajan desde ya contra los nombres de clase de este documento.
10. Hay 11 decisiones estéticas para Raúl (stepper vertical, letras A/B/C, confeti, rejilla de carpetas, etc.) en DESPUÉS, cada una con su pregunta. Las carpetas 3D y el modal de subida completo (necesita un endpoint que toca R4 del contrato v1) quedan en DESPUÉS.

## Criterio aplicado (uniforme para todas las vistas)

- **Entra HOY** si cumple a la vez: (a) se ve en el recorrido de la demo del 13 oct; (b) se hace en CSS `epi-` o en una isla Preact que ya existe, sin dependencias nuevas; (c) licencia MIT/ISC/BSD/Apache-2.0 **o** patrón reescrito desde cero; (d) esfuerzo S o M; (e) no hace falta que Raúl elija entre dos estilos válidos.
- **Una sola versión por patrón.** Si varios lotes proponen lo mismo, gana la fuente MIT con código legible y CSS plano. Las demás se citan como descartadas.
- **Todo se reescribe.** Ningún área copia CSS, SVG ni JS literal de las fuentes (así no hace falta arrastrar avisos). El icono de tipo de fichero se hace con el CSS propio de la maqueta del lote E (`.epi-tipo`), no con la silueta de AlignUI. La maqueta del lote E es código nuestro: el área 0 puede portarla tal cual.
- **Movimiento:** ≤ 200 ms en microinteracciones, ≤ 300 ms en transiciones de pantalla, siempre con `prefers-reduced-motion: reduce` y sin rebotes.
- **Portal precioso, back office usable:** en el back office solo entra lo que ahorra clics o da lectura de un vistazo.
- **Corte:** lo que no esté fusionado y probado con el recorrido de 99-demo a las **22:00 del 12 oct** se queda fuera de la demo. No se toca nada tras ese corte.

## Inventario por vista: portal de la clienta

### Portal · login

Antes: [99-demo/01_portal_login.png](../../openemr-pruebas/evidencia/capturas/renove/99-demo/01_portal_login.png) · [móvil](../../openemr-pruebas/evidencia/capturas/renove/99-demo/01_portal_login_movil.png). **Ya está bien** (pantalla partida, renovada por el área 1). Entra poco.

| Componente | Fuente elegida y por qué | Cómo se traslada | Esf. | Fichero que toca |
|---|---|---|---|---|
| Sacudida en error | HextaUI `use-invalid-shake` (MIT). Gana a Transitions.dev error-state-shake (licencia propia; mismo patrón) | El área 0 crea `@keyframes epi-shake` (±4 px, 300 ms) sobre `[aria-invalid="true"]` y `.epi-alert--error`, más `EPI10.sacudir(el)`. El área 1 llama a `EPI10.sacudir` cuando el núcleo devuelve error | S | `public/ui/epi10-login-portal.js` (área 1) |
| Botón «Entrar» con estado | HextaUI Button feedback + `use-delayed-loading` (MIT). Gana a beUI stateful (depende de `motion`) | `aria-busy` al enviar, con 200 ms de retardo, sin doble clic (atributo `data-epi10-ocupado-al-enviar` en el `<form>`, lo resuelve `epi10-ui.js`) | S | `epi10-login-portal.js` (área 1) |
| Grano en el panel azul | Grainient (solo patrón; ruido SVG `feTurbulence` propio, sin sus assets) | `.epi-grano` del área 0 aplicado a `.epi-auth__brand` | S | `epi10-ui.css` (área 0) |

**Después:** fondo con anillos concéntricos (Arc Login centered, AlignUI Auth Card). *Pregunta para Raúl: ¿añadimos un halo de anillos detrás del logo o dejamos el panel liso con grano?* · Estado «Te hemos enviado el enlace / Entrando…» (Kargul): mirar antes si el área 1 ya lo pinta.
**Descartado:** OTP de 6 dígitos (affectUI, Arc, beUI, BoardUI, Kobra): el portal entra por enlace, no por código. Shader de 23rd: sin licencia y es efecto de landing. Velo luminoso animado (Grainient): decisión de marca, va a Después en el inicio.

### Portal · inicio «Tu espacio EPI10»

Antes: [99-demo/02_portal_inicio.png](../../openemr-pruebas/evidencia/capturas/renove/99-demo/02_portal_inicio.png). Planteamiento bueno («no está del todo mal»), pero las 5 tarjetas en 3 columnas dejan un hueco abajo a la derecha y no dicen nada vivo.

| Componente | Fuente elegida y por qué | Cómo se traslada | Esf. | Fichero que toca |
|---|---|---|---|---|
| Rejilla bento | Bento Grids (inspiración, sin código). Única propuesta del patrón | Sobre `#inject_card`: rejilla de 6 columnas. «Mi informe» ocupa 4 (el producto manda), «Tienda» 2 y el resto 2. En móvil, una columna. Sin huecos con 5 tarjetas | S | `public/ui/epi10-nucleo.css` (sección «Portal · inicio», área 1) |
| Tarjetas vivas | Bento Grids + Apple Health Summary (Mobbin), inspiración | Cada tarjeta enseña un dato en `.epi-card__vivo` (área 0): Mis documentos «2 de 2 hechas» (`--cifra`), Mi informe «Nuevo · 11 oct» (`--chip`), Citas «Sin cita · elige día» o «Martes 13 · 10:30» (`--chip`). Mensajes sin leer, solo si `DatosCaso` ya lo tiene; si no, Después | M | `templates/sobrescritas/portal/partial/_nav_icon.html.twig`, `src/Inicio/DatosCaso.php`, `src/Inicio/FuncionesTwig.php` (área 1) |
| Grano en la tarjeta de fase | Grainient (patrón propio) | `.epi-grano` aplicado a `.epi-fase` | S | `epi10-ui.css` (área 0) |

**Después:** anillo de progreso junto a la fase (AlignUI Progress Circle, HextaUI, Evil Charts). *Pregunta para Raúl: ¿anillo «4 de 5» además de la barra de 5 tramos, o basta la barra?* · Línea temporal «tu caso hasta ahora» (Arc Timeline): solo si gusta en la ficha. · Velo luminoso en el marfil (Grainient). *Pregunta: ¿marfil liso o con luz difusa detrás del saludo?* · Bloque «Tu equipo EPI10» (Hanging Team, reinterpretado sin física): necesita fotos reales con consentimiento. · Consejos mientras espera (affectUI Tips Panel): necesita contenido validado.
**Descartado:** Kobra Task List (repite «Mis documentos»), Recommendation Card de Beautiful UI (tono de «confianza de la IA»), heat calendar (no hay datos de adherencia).

### Portal · mis documentos

Antes: [99-demo/04_portal_mis-documentos.png](../../openemr-pruebas/evidencia/capturas/renove/99-demo/04_portal_mis-documentos.png). Ya es didáctica (lista numerada, progreso, «Todo listo por tu parte»). Solo falta movimiento al cargar y al completar.

| Componente | Fuente elegida y por qué | Cómo se traslada | Esf. | Fichero que toca |
|---|---|---|---|---|
| Esqueleto de la lista | HextaUI Skeleton (MIT, con retardo de 150 ms: no parpadea en cargas rápidas). Gana a Transitions.dev (licencia), HorizonX y Kobra (propietarias), Arc, affectUI y Beautiful UI (equivalentes) | Sustituye «Cargando tus documentos…» por 2 filas `.epi-skeleton` con la forma de `epi-list__item`; al llegar los datos, `.epi-revela` funde el contenido | S | `public/ui/islas/tareas.mjs` (área 2) |
| Progreso con tick dibujado | affectUI Progress Tracker (MIT). Gana a Bencho checklist y HorizonX Task Checkbox (sin código público) | La barra crece de 0 al valor al montar (`scaleX`, 400 ms) y el círculo de las tareas hechas dibuja su check (`stroke-dashoffset`). **Sin tachado**: una tarea médica tachada se lee como «anulada» | S | `tareas.mjs`, `public/ui/epi10-tareas.css` (área 2) |

**Después:** tareas agrupadas por fase y plegables (Beautiful UI Task Rows): cuando haya más de una fase con tareas. Pasos con candado (Kargul): solo si hay orden obligatorio, regla de negocio. Adjuntar desde aquí con zona de arrastre: «Adjuntar» sigue en segundo plano dentro de «Historial y otras opciones» (feedback 1.3).
**Descartado:** tachado animado (Bencho, HorizonX), Firework Todo (poco sobrio).

### Portal · tarea firmable (consentimiento)

Antes: [02-tareas/despues_escritorio_02_consentimiento.png](../../openemr-pruebas/evidencia/capturas/renove/02-tareas/despues/despues_escritorio_02_consentimiento.png) (no hay captura en 99-demo porque Lucía ya firmó). Ya tiene pasos Leer → Aceptar → Firmar → Enviar, papel legible, «Firma aquí» con línea base y un CTA único. Falta la **sensación de firmar** que pedía Raúl.

| Componente | Fuente elegida y por qué | Cómo se traslada | Esf. | Fichero que toca |
|---|---|---|---|---|
| Firma con «Deshacer trazo» y sello «Firmado» | Bencho signature (MIT declarado, sin código público → inspiración). Única propuesta; Arc signature pad duplica `signature_pad` | Con el `signature_pad` vendorizado: botón «Deshacer trazo» (`toData()` + `fromData()` sin el último trazo) junto a «Borrar», y al soltar el último trazo válido un sello «Firmado · 12 oct 2026» con `badge-check` que aparece con `epi10-aparece` (200 ms) | S–M | `tareas.mjs`, `epi10-tareas.css` (área 2) |
| Casillas con check dibujado | Transitions.dev checkbox-check (licencia propia → patrón reescrito). Única propuesta | El área 0 dibuja el check de `epi-check` con SVG y `stroke-dashoffset` en `:checked`. El área 2 pone `epi-check` en «Acepto el tratamiento…» y «Soy mayor de edad» | S | `tareas.mjs` (área 2); `epi10-ui.css` (área 0) |
| Esqueleto al abrir la tarea | HextaUI Skeleton (ver mis documentos) | Sustituye «Abriendo…» por un papel `.epi-skeleton--tarjeta` con 4 líneas | S | `tareas.mjs` (área 2) |

**Después:** stepper vertical a la izquierda del papel en escritorio (AlignUI Vertical Stepper, MIT, y Kargul; los proponían C y D para HOY). *Pregunta para Raúl: ¿pasos en raíl vertical a la izquierda del documento en escritorio, o mantenemos la barra horizontal actual, que ya funciona?* Lo dejo fuera de hoy porque obliga a cambiar la maquetación de la tarea en la víspera. · Opciones de consentimiento en tarjetas con ilustración (Kargul «Tú controlas tus datos»): el contenido es legal y no se decide en la interfaz. · Pantalla de confirmación con confeti (Kargul). *Pregunta: ¿confeti una vez o halo cian sobrio alrededor del check actual?*
**Descartado:** botón de deslizar para confirmar (Bencho slide-confirm), hold-to-confirm (Arc): menos claro que un CTA.

### Portal · cuestionario de hábitos

Antes: [02-tareas/despues_escritorio_06_pregunta3.png](../../openemr-pruebas/evidencia/capturas/renove/02-tareas/despues/despues_escritorio_06_pregunta3.png). Una pregunta por pantalla con progreso: está bien. Falta que «Siguiente» se sienta como una app.

| Componente | Fuente elegida y por qué | Cómo se traslada | Esf. | Fichero que toca |
|---|---|---|---|---|
| Transición direccional entre preguntas | HextaUI Questionnaire (MIT; solo el patrón visual). Gana a Transitions.dev page-side-by-side (licencia), HorizonX Stepper (propietaria, viene de React Bits con Commons Clause) y BoardUI questionnaire (Pro) | La isla pone `data-epi10-direccion="adelante|atras"` en la tarjeta de la pregunta al cambiar de paso; `@keyframes` de deslizamiento de 24 px + fundido, 220 ms. Con movimiento reducido, solo fundido | M | `tareas.mjs`, `epi10-tareas.css` (área 2) |
| Aviso con sacudida si falta respuesta | HextaUI `use-invalid-shake` (MIT), del área 0 | Si se pulsa «Siguiente» sin elegir, `aria-invalid` en el grupo, texto «Elige una opción para seguir» y `EPI10.sacudir()` | S | `tareas.mjs` (área 2) |

**Después:** opciones con letra A, B, C y atajos de teclado (Kobra Question Card, inspiración; HextaUI tiene atajos 1–9). *Pregunta para Raúl: ¿opciones con letra estilo Typeform o mantenemos el radio actual?* · Escala con caras o números (Kargul), chips de selección múltiple (Kargul), slider de esfuerzo (HorizonX): dependen de que el cuestionario tenga ese tipo de preguntas. · Autoavance al elegir: choca con el botón «Siguiente» y con «Revisar respuestas».
**Descartado:** Approval Card (Beautiful UI, se solapa con Questionnaire), pastillas de paso de BoardUI (Pro).

### Portal · mensajes

Antes: [99-demo/04_portal_mensajes.png](../../openemr-pruebas/evidencia/capturas/renove/99-demo/04_portal_mensajes.png). Es un chat de verdad, pero repite «Operaciones» y la hora encima y debajo de cada burbuja y no separa los días.

| Componente | Fuente elegida y por qué | Cómo se traslada | Esf. | Fichero que toca |
|---|---|---|---|---|
| Separadores de día fijos | HextaUI Marker (MIT). Gana a Arc Chat thread (duplica `chat.mjs` y usa `motion`) | Entre mensajes de días distintos, un separador «Hoy», «Ayer» o «12 de octubre» con `position: sticky` que pasa a pastilla al quedar fijo (`IntersectionObserver` → `data-stuck`) | S | `public/ui/islas/chat.mjs`, `public/ui/epi10-chat.css` (área 3) |
| Burbujas agrupadas por remitente | HextaUI Bubble group (MIT) | Mensajes seguidos del mismo autor en menos de 5 min: autor solo en la primera, hora y «Leído» solo en la última, esquinas fundidas con `data-pos="first|mid|last"` | S–M | `chat.mjs`, `epi10-chat.css` (área 3) |
| Adjunto enviado como chip con tipo y peso | Lote E n.º 9 `epi-adjunto` (anatomía: icono de tipo, nombre, «PDF · 412 KB») + lote C n.º 01 AlignUI File Format Icon (MIT, colores por tipo) + HextaUI Attachment (MIT, truncar conservando la extensión). Una sola pieza | `.epi-adjunto` con `EPI10.fichero('pdf')` (`.epi-tipo--pdf`) en lugar de `epi-chat-adjunto` con «PDF» fijo; nombre en dos `<span>` («Guia-kit-fic….pdf») | S | `chat.mjs`, `epi10-chat.css` (área 3) |
| Adjunto pendiente con progreso y error en la fila | Lote E n.º 5 `epi-archivo` (subiendo con hilo de 2 px, hecho, error con motivo). Gana a beUI File upload (lote A n.º 26, `motion`), Bencho upload-dropzone (lote B n.º 24, sin código) y AlignUI File Upload (lote C n.º 13): la cola de E es la más sobria y trae el estado de error | Antes de enviar, el adjunto elegido se pinta como `.epi-archivo` con `data-epi10-estado="pendiente|hecho|error"`; un archivo rechazado (tipo o peso) muestra el motivo en la propia fila en lugar de un aviso aparte | S | `chat.mjs`, `epi10-chat.css` (área 3) |
| «Suelta para adjuntar» al arrastrar | Lote E n.º 4 `epi-dropzone` (estado de arrastre y carpeta) | En escritorio, al arrastrar un archivo sobre el hilo aparece una capa `.epi-dropzone[data-epi10-estado="arrastrando"]` con la carpeta `--suave`; al soltar entra como adjunto pendiente. El clip sigue igual | S | `chat.mjs`, `epi10-chat.css` (área 3) |
| Esqueleto del hilo | HextaUI Skeleton (MIT) | Sustituye «Cargando mensajes…» por 3 burbujas `.epi-skeleton` alternas | S | `chat.mjs` (área 3) |

**Después:** varios adjuntos a la vez en un modal de subida (lote E n.º 6). · Botón «ir al final» con contador de nuevos (HextaUI Message scroller): cuando los hilos sean largos. · Eventos de sistema en línea («Informe publicado») del Marker de HextaUI: necesita que el chat reciba eventos de la biblioteca. · Redactor que se abre (HorizonX AI Prompt Composer): tocar el redactor la víspera es más riesgo que mejora. · Notas de voz y onda (audiocn, MIT, lo más bonito del lote B). *Pregunta para Raúl: ¿queremos notas de voz? Abre un tema de privacidad (audio con datos de salud).*
**Descartado (hasta que haya señal real):** indicador «escribiendo…» (Arc, Amicro, HorizonX). El chat consulta cada 10 s y no sabe si el equipo escribe; pintarlo sin señal sería fingir en un canal clínico. Si Raúl lo quiere igualmente, es S en `epi10-chat.css`.

### Portal · mi informe (biblioteca y visor)

Antes: [99-demo/04_portal_mi-informe.png](../../openemr-pruebas/evidencia/capturas/renove/99-demo/04_portal_mi-informe.png). Correcta pero sobria en exceso para «el delivery del producto»: un icono genérico y mucho vacío.

| Componente | Fuente elegida y por qué | Cómo se traslada | Esf. | Fichero que toca |
|---|---|---|---|---|
| Icono de formato PDF | AlignUI File Format Icon (lote C n.º 01, MIT) fusionado con `.epi-tipo` del lote E (CSS propio) | `ui.fichero('pdf')` del área 0 en cada fila y en el destacado; tamaño 40 px en la lista | S | `templates/epi10/paginas/biblioteca.html.twig`, `biblioteca-documento.html.twig` (área 4) |
| Vacío con carpeta plana | Lote E n.º 1 `epi-carpeta`. Gana a HextaUI Empty (fichas en abanico) y Arc Empty states: es un objeto de marca y lo reutilizan la zona de arrastre y los vacíos | «Aún no hay informe» (y el vacío de ficha › Documentos) con `.epi-carpeta--marfil` en lugar del icono suelto. No se ve con Lucía, pero sí con cualquier clienta nueva | S | `biblioteca.html.twig`, `documentos_ficha.html.twig` (área 4) |
| Esqueleto del visor PDF | HextaUI Skeleton (MIT) | Sustituye el spinner «Abriendo el documento…» por una hoja A4 `.epi-skeleton--tarjeta` (proporción 1:1,414) con 6 líneas | S | `public/ui/islas/visor-pdf.mjs`, `public/ui/epi10-biblioteca.css` (área 4) |
| Grano en el destacado del informe | Grainient (patrón propio) | Clase `epi-grano` en `.epi-biblio__destacado` | S | `biblioteca.html.twig` (área 4) |

**Después:** biblioteca agrupada en carpetas planas con chips («Tu informe», «Lo que has firmado», lote E n.º 2). *Pregunta para Raúl: ¿agrupamos Mi informe en carpetas cuando haya más documentos, aunque hoy añada un clic con uno solo?* · Carpeta 3D de vidrio (lote E n.º 3): Después por decisión de Raúl; si algún día entra, una sola carpeta como portada, nunca una rejilla. · Marcadores frente a rango de referencia (Arc Gauge, Evil Charts radial) y «qué ha cambiado» (affectUI Change Summary): necesitan datos estructurados y criterio clínico; el informe hoy es un PDF. · Palabra rotatoria «Preparando… tu informe» (HorizonX): el visor carga en menos de 1 s. · Acordeón animado (Transitions.dev): no hay secciones que plegar.
**Descartado:** Loading State de Beautiful UI (rejilla de píxeles; redundante con el esqueleto).

### Portal · citas

Antes: [99-demo/04_portal_citas.png](../../openemr-pruebas/evidencia/capturas/renove/99-demo/04_portal_citas.png). **Ya está bien** (calendario con días con hueco, franjas Mañana/Tarde). Entra solo el esqueleto.

| Componente | Fuente elegida y por qué | Cómo se traslada | Esf. | Fichero que toca |
|---|---|---|---|---|
| Esqueleto del calendario y de los huecos | HextaUI Skeleton (MIT) | Sustituye «Cargando el calendario…» por una rejilla de 5×7 celdas y 6 huecos `.epi-skeleton` | S | `public/ui/islas/calendario.mjs`, `public/ui/islas/calendario.css` (área 5) |

**Después:** «Prepárate para tu cita» tras reservar (Zocdoc en Mobbin): el contenido lo fija EPI10. · Control segmentado Mañana/Tarde o Próximas/Pasadas (`epi-segmentado` del área 0): las dos franjas ya se ven a la vez y Lucía tiene como mucho una cita. · Calendario de mes con eventos (BoardUI Pro, inspiración): Raúl no lo pide.
**Descartado:** availability scheduler de beUI (la agenda de OpenEMR ya manda), date pickers de Arc, HextaUI y beUI (ya está Cally).

### Portal · transversal

Lo que se nota en todas las vistas lo hace el área 0 (ver plan). En la demo se verá en: cargas (esqueletos), casillas, errores, pestañas e iconos de fichero.

| Componente | Fuente elegida y por qué | Cómo se traslada | Esf. | Fichero que toca |
|---|---|---|---|---|
| Tokens de movimiento | Transitions.dev skill transitions-polish (licencia propia → solo la idea de una escala; valores propios) | `--epi10-dur-1: 120ms`, `--epi10-dur-2: 200ms`, `--epi10-dur-3: 300ms`, `--epi10-ease-salida: cubic-bezier(.2,.8,.2,1)`, `--epi10-ease-entrada: cubic-bezier(.4,0,1,1)`; los usan `epi-pop`, toast, modal y todo lo nuevo | S | `epi10-ui.css` (área 0) |
| Esqueleto y revelado | HextaUI Skeleton + Shimmer (MIT) | `.epi-skeleton` (`--linea`, `--circulo`, `--tarjeta`), aparece a los 150 ms, barrido `::after` de 1,4 s; `.epi-revela` funde el contenido real en 200 ms. Macro `ui.esqueleto(tipo, n)` | S | `epi10-ui.css`, `templates/epi10/componentes/ui.html.twig` (área 0) |
| Piezas de fichero: tipo, chip de adjunto, fila de archivo, zona de arrastre y carpeta plana | Lote E n.º 1, 4, 5 y 9 (CSS propio de su maqueta) + lote C n.º 01 (colores por tipo). Una sola familia para chat, biblioteca, ficha y vacíos | El área 0 porta la maqueta del lote E a `epi10-ui.css` y añade `ui.fichero()`/`EPI10.fichero()`; la zona de arrastre funciona sin JS (`<label>` con `<input type=file>`) y `epi10-ui.js` solo pone `data-epi10-estado="arrastrando"` | S | `epi10-ui.css`, `epi10-ui.js`, `ui.html.twig` (área 0) |
| Control segmentado | Lote E n.º 7 `epi-segmentado` (patrón del ToggleGroup de shadcn/ui, MIT). Gana a AlignUI y BoardUI Segmented Control y HorizonX Glass Radio: mismo patrón, este ya está maquetado con nuestros tokens | `<div class="epi-segmentado" data-epi10-segmentado>` con `<button aria-pressed>`; `epi10-ui.js` alterna `aria-pressed` y lanza el evento `epi10:segmentado`. Filtra dentro de una vista; no sustituye a `epi-tabs` | S | `epi10-ui.css`, `epi10-ui.js` (área 0) |

**Después:** toasts que pasan de «cargando» a «hecho» (HextaUI Toast promise, affectUI Notification Stack); centro de avisos con campana (Arc, BoardUI, AlignUI): necesita un endpoint de novedades; badge con icono por estado (beUI Animated Badge); bordes de 0,5 px en retina (HextaUI Hairline: dudoso contraste sobre marfil); fundido en los bordes de lo que hace scroll (HextaUI Scroll fade).
**Descartado:** todo lo de 23rd (sin licencia), fondos shader de beUI, Amicro y HorizonX, cursores, carruseles 3D, text-scramble, Dynamic Island, cristal líquido, `sound` de Kobra.

## Inventario por vista: back office del equipo

### Back office · login

Antes: [99-demo/10_backoffice_login.png](../../openemr-pruebas/evidencia/capturas/renove/99-demo/10_backoffice_login.png). **Ya está bien.** Los mismos tres retoques que el portal, con el mismo código.

| Componente | Fuente elegida y por qué | Cómo se traslada | Esf. | Fichero que toca |
|---|---|---|---|---|
| Sacudida en error y «Entrar» con estado | HextaUI (MIT), vía área 0 | `data-epi10-ocupado-al-enviar` en el `<form>` y `EPI10.sacudir` sobre el aviso de error | S | `templates/epi10/login/backoffice.html.twig` (área 1) |
| Grano en el panel azul | Grainient (patrón propio) | `.epi-auth__brand` ya lo recibe del área 0 | — | `epi10-ui.css` (área 0) |

**Después y descartado:** como en el login del portal.

### Back office · selector de funcionalidades y panel «Hoy»

Antes: [99-demo/11_backoffice_inicio_ops.png](../../openemr-pruebas/evidencia/capturas/renove/99-demo/11_backoffice_inicio_ops.png). **Ya está bien** (cinco tarjetas en una fila y cuatro bloques «Hoy» con contador). **Sin cambios hoy.**

**Después:** tarjetas de cifra con tendencia y minigráfico (Arc Metric card, BoardUI stat-cards, AlignUI Stats Pro), que necesitan histórico. · Cifras que entran escalonadas (Transitions.dev number-pop-in, affectUI Number Ticker): adorno. · «Decisiones abiertas» con respuesta rápida (affectUI Decision Inbox): necesita acciones reales detrás. · Actividad reciente de todas las clientas con `epi-actividad` (lote E n.º 8, BoardUI notification-center): el lote E la proponía para hoy, pero la dejo para después. Los cuatro bloques de «Hoy» ya agrupan esos mismos eventos por lo que hay que hacer, una línea más los repetiría y hace falta una consulta agregada nueva en `PanelHoy.php`. Primero se valida el componente en la ficha. · Gráfico de casos por semana (Evil Charts peak, SVG a mano). · Paleta Ctrl+K (Arc, Kobra, AlignUI, Bencho Pro): funcionalidad nueva, no pulido.
**Descartado:** bento en el selector (cinco tarjetas caben en una fila; solo si crece a 6+).

### Back office · buscador y lista de clientas

Antes: [99-demo/12_backoffice_clientes.png](../../openemr-pruebas/evidencia/capturas/renove/99-demo/12_backoffice_clientes.png). Legible, con buscador y chips por fase. Falta leer la fase de cada clienta sin abrir la ficha.

| Componente | Fuente elegida y por qué | Cómo se traslada | Esf. | Fichero que toca |
|---|---|---|---|---|
| Progreso de fase por fila | Kargul «Quick Actions + Lists» (inspiración). Única propuesta | Columna «Estado del caso»: el badge actual y debajo una micro-barra de 64 × 4 px con «3 de 5 · Test y cita», con las 5 fases de `FaseCaso` | S | `templates/epi10/paginas/backoffice/_clientes_resultados.html.twig`, `public/ui/vistas/backoffice-clientes.css` (`.epi-bo-progreso`), `src/Backoffice/Clientes.php` (área 7) |
| Chips con punto de color y contador | BoardUI chip + status-dot (MIT). Gana a Beautiful UI Filter Table (equivalente; los chips ya existen y solo falta el punto y el número) | Cada chip de fase con su punto (colores de `epi-badge`) y su recuento, no solo «Todos» | S | `templates/epi10/paginas/backoffice/clientes.html.twig`, `backoffice-clientes.css`, `src/Backoffice/Clientes.php` (área 7) |
| Esqueleto al buscar | HextaUI Skeleton (MIT) | Mientras llega el parcial (`fetch …&parcial=1`), 3 filas `.epi-skeleton--linea` en la tabla | S | `public/ui/vistas/backoffice-clientes.js` (área 7) |

**Después:** tabla agrupada por fase y plegable (Kobra Grouped Table, inspiración): útil con 30+ clientas. · Barra de filtros con chips quitables (Arc Filter toolbar, affectUI Filter Menu). · Vista rápida en panel lateral (Kobra Sheet). · Resalte que se desliza entre filas (HextaUI Item). *Pregunta para Raúl: ¿le gusta el resalte deslizante o sobra en un back office?* · Cabecera fija y columna de etiquetas (Beautiful UI Records Table).
**Descartado:** data-table con TanStack (BoardUI, HextaUI), virtualización de beUI, paginación (pocas clientas).

### Back office · ficha de la clienta

Antes: [99-demo/12_backoffice_ficha.png](../../openemr-pruebas/evidencia/capturas/renove/99-demo/12_backoffice_ficha.png). Buena base (fases, pestañas, siguiente paso), pero la cabecera solo tiene nombre y correo, la tarjeta «Caso» queda vacía y el Resumen es una lista de estados sin historia.

| Componente | Fuente elegida y por qué | Cómo se traslada | Esf. | Fichero que toca |
|---|---|---|---|---|
| Datos clave en la cabecera | BoardUI patient-info-card (MIT, código en el repo; solo la tarjeta, no la página Pro). Gana a Kargul «Patient profile» (solo inspiración). Contenido según el feedback 2.3 | Bajo el nombre, un `<dl>` en rejilla (`auto-fill, minmax(160px, 1fr)`): teléfono, fecha de nacimiento, código del kit, alta, caso en Odoo (enlace). Etiqueta 0,78 rem en gris y valor en 600. Si falta el caso, «Sin caso en Odoo» en gris. Nada clínico | S–M | `templates/epi10/paginas/backoffice/ficha.html.twig`, `backoffice-clientes.css` (`.epi-bo-ficha-cab__datos`), `src/Backoffice/Ficha.php` (área 7) |
| Línea de actividad en Resumen | Lote E n.º 8 (referencia de Raúl, n_vc) para la anatomía: icono en caja, frase actor-verbo-objeto, fecha a la derecha y detalle anidado. Lote A n.º 3 Arc UI Timeline (MIT) para la agrupación por periodo. Fusiona también lote B n.º 14 (BoardUI notification-center) y lote C n.º 18 (Kobra Marker) | Los hitos que ya calcula la ficha (acceso al portal, consentimiento, cuestionario, informe publicado, cita, último mensaje) en orden cronológico, lo último arriba, agrupados por «Esta semana» y por mes. Frase del tipo «**Lucía** firmó el **Consentimiento**» o «**Equipo** publicó el **Informe**», con `data-epi10-tipo="clienta|hito|sistema"`. El informe publicado lleva en el detalle el chip `.epi-adjunto` («Informe EPI10 · PDF · 148 KB»). Lo que aún no ha pasado («Próxima cita: sin cita») queda en un bloque «Pendiente» encima. Sin filtros: con 6 eventos sobran | M | `ficha.html.twig`, `src/Backoffice/Ficha.php` (área 7) |
| Pestañas con indicador deslizante | HextaUI Tabs (MIT). Gana a Transitions.dev tabs-sliding (licencia), Arc Tabs y los segmentados de BoardUI y AlignUI (equivalentes) | El área 0 añade `.epi-tabs__ind` y lo mueve con `offsetLeft/offsetWidth` de la pestaña con `aria-current="page"` o `aria-selected="true"`; un `MutationObserver` lo sigue cuando `backoffice-clientes.js` cambia `aria-selected`. **El área 7 no toca su JS** | S | `epi10-ui.css`, `epi10-ui.js` (área 0) |
| «Guardar» (Datos) con estado | HextaUI Button feedback (MIT), vía área 0 | `data-epi10-ocupado-al-enviar` en `form[data-epi10-form="datos-cliente"]` | S | `ficha.html.twig` (área 7) |
| Pestaña Documentos: icono de formato y «Publicar informe» con estado | AlignUI (MIT) y HextaUI (MIT), vía área 0 | `ui.fichero('pdf')` en las tres filas y `data-epi10-ocupado-al-enviar` en el formulario de publicar | S | `templates/epi10/componentes/documentos_ficha.html.twig` (área 4) |

**Después:** tarjeta de alertas importantes (BoardUI important-alerts-card): ¿qué alertas? (mensaje sin responder, cuestionario sin revisar); se decide con Raúl. · Cabecera que se pliega al hacer scroll (Arc Page header). · Equipo asignado con avatares apilados (AlignUI Avatar Group, Bencho picker): no hay dato de «equipo asignado». · Modal de subida completo con cola y progreso (lote E n.º 6): no hay endpoint de subida en el módulo UI y subir informes toca R4 del contrato v1; se coordina con el orquestador. · Filtros segmentados de la actividad (Todo · Mensajes · Documentos · Sistema): cuando haya muchos eventos. · Notas internas del equipo con compositor (lote E n.º 10): hay que decidir dónde viven (`pnotes` o mensajes del equipo) y hace falta un endpoint. · Confirmación en línea «¿Seguro? Sí / No» (Bencho): no hay acciones destructivas en la demo. · Tooltip en botones de icono (AlignUI).
**Descartado:** la página Medical profile de BoardUI (Pro), Client Context de affectUI (Pro).

### Back office · mensajes del equipo

Antes: [99-demo/12_backoffice_mensajes.png](../../openemr-pruebas/evidencia/capturas/renove/99-demo/12_backoffice_mensajes.png). Mismo componente que el portal en versión equipo: **recibe gratis** los separadores de día, las burbujas agrupadas, los adjuntos y el esqueleto del área 3 (también en la lista de conversaciones). Solo una pieza propia:

| Componente | Fuente elegida y por qué | Cómo se traslada | Esf. | Fichero que toca |
|---|---|---|---|---|
| Filtro «Todas · Sin responder» | Lote E n.º 7 `epi-segmentado` (ver transversal) | Encima de la lista de conversaciones; «Sin responder» deja las que tienen el último mensaje de la clienta (el dato ya existe: insignia de no leídos y el bloque «Mensajes sin responder» del panel «Hoy») | S | `chat.mjs`, `epi10-chat.css` (área 3) |

**Después:** como en mensajes del portal; además, notificaciones del equipo con pestañas Todas / No leídas (AlignUI Notification Pro, inspiración).

### Back office · calendario

Antes: [05-calendario/despues_backoffice_calendario_escritorio.png](../../openemr-pruebas/evidencia/capturas/renove/05-calendario/despues_backoffice_calendario_escritorio.png). Vista del núcleo. Raúl: «se puede quedar así». **Sin cambios.**

**Después:** control segmentado Día / Semana / Mes (AlignUI, BoardUI). Calendario Pro de BoardUI: solo referencia.

## Lote E: referencias de Raúl en X

Incorporado (inventario [2026-10-12_lote_E_v1.md](2026-10-12_lote_E_v1.md), commit 585d9b5; [maqueta con el CSS propuesto](capturas/E/maqueta-lote-E.html)). Proponía 6 para HOY y 4 para DESPUÉS. Así queda cada fila tras fusionarla con los otros lotes:

| E n.º | Pieza | Se fusiona con | Decisión | Vista y área |
|---|---|---|---|---|
| 1 | Carpeta plana `epi-carpeta` ([captura](capturas/E/01-david_visuals-carpeta-plana.png)) | HextaUI Empty y Arc Empty states (A, Después) | **HOY**, sustituye al abanico de HextaUI como ilustración de vacío y de la zona de arrastre | Transversal (área 0); vacíos de mi informe y ficha › Documentos (área 4) |
| 2 | Rejilla de carpetas con chips | — | **DESPUÉS** · *pregunta para Raúl en mi informe* | Mi informe |
| 3 | Carpeta 3D de vidrio | React Bits Folder (MIT + Commons Clause, prohibido) | **DESPUÉS** (decisión de Raúl) | Mi informe |
| 4 | Zona de arrastre `epi-dropzone` ([captura](capturas/E/04-jamie_merrill-zona-arrastre.png)) | A n.º 26 beUI, B n.º 24 Bencho, C n.º 13 AlignUI | **HOY**, una sola pieza con la anatomía de E | Componente (área 0); «Suelta para adjuntar» en el chat (área 3); pantalla de informes del monolito |
| 5 | Fila de archivo `epi-archivo` ([captura](capturas/E/05-jamie_merrill-fila-archivo.png)) | A n.º 26, B n.º 24, C n.º 13; `.epi-tipo` = C n.º 01 | **HOY** | Componente (área 0); adjunto pendiente del chat (área 3); monolito |
| 6 | Modal de subida completo ([captura](capturas/E/06-jamie_merrill-modal-subida.png)) | — | **DESPUÉS**: necesita un endpoint de subida que toca R4 del contrato v1 | Ficha › Documentos |
| 7 | Control segmentado `epi-segmentado` ([captura](capturas/E/07-jamie_merrill-n_vc-control-segmentado.png)) | AlignUI y BoardUI Segmented Control, HorizonX Glass Radio | **HOY** | Componente (área 0); «Todas · Sin responder» en mensajes del equipo (área 3) |
| 8 | Línea de actividad `epi-actividad` ([captura](capturas/E/08-n_vc-linea-actividad.png)) | A n.º 3 Arc Timeline, B n.º 14 BoardUI, C n.º 18 Kobra Marker | **HOY en la ficha**; en el panel «Hoy», **DESPUÉS** (ver panel «Hoy») | Componente (área 0); ficha › Resumen (área 7) |
| 9 | Chip de adjunto `epi-adjunto` ([captura](capturas/E/09-n_vc-chip-adjunto.png)) | C n.º 01, HextaUI Attachment | **HOY** | Componente (área 0); chat (área 3); detalle de la actividad (área 7) |
| 10 | Compositor de nota interna | — | **DESPUÉS**: endpoint y decisión sobre dónde viven las notas | Ficha |

**Pantalla de informes del monolito** (`Skilland-ai/epi10-orquestador`, `src/modules/informes/pantalla/vistas.ts`, estilos servidos en `/informes/estilos.css`). No es OpenEMR ni usa EPI10 UI, y la pantalla no lleva JavaScript. Entra **solo la parte visual**: el `<input type="file">` actual dentro de un `<label>` con aspecto de zona de arrastre con la carpeta y el estado de foco (sin JS, como en la maqueta), y el informe ya subido como fila de archivo en estado «hecho» (tipo, nombre, peso), pintada por el servidor. **No cambian** las rutas, el `multipart/form-data` ni la lógica de subida y publicación (R4). Lo hace un agente aparte en ese repo, copiando el CSS de la maqueta del lote E con los colores de la pantalla.

## Licencias

| Fuente | Licencia | Uso hoy | Qué se toma |
|---|---|---|---|
| HextaUI (parte gratuita) | MIT (© 2026 Preet Suthar) | Patrón reescrito | Esqueleto, botón con estado, sacudida, pestañas con indicador, separadores de día y burbujas, truncado del adjunto, cuestionario |
| Arc UI (parte gratuita) | MIT (© 2026 Elia Kuratli) | Patrón reescrito | Agrupación por periodo de la línea de actividad |
| affectUI (parte gratuita) | MIT (© 2026 Florian Höller) | Patrón reescrito | Progress Tracker |
| AlignUI (componentes base) | MIT (© 2024 Doğukan Çavuş) | Patrón reescrito (colores por tipo; la silueta no se copia) | File Format Icon |
| BoardUI (parte gratuita) | MIT (repo `BoardUI/boardui`) | Patrón reescrito | patient-info-card, chip + status-dot |
| shadcn/ui | MIT | Referencia de semántica (`aria-pressed`) | ToggleGroup → `epi-segmentado` |
| Uiverse.io (`uiverse-io/galaxy`) | MIT | Solo referencia de la técnica de tres capas | Carpeta plana |
| Origin UI (`cosscom/coss`, solo `apps/origin` y `apps/ui`) | MIT en esas carpetas; **el resto del repo es AGPL-3.0** | Solo referencia, no se copia | Timeline y `use-file-upload` |
| Dropzone, FilePond, Dice UI | MIT | Solo referencia; **no se vendorizan** | Zona de arrastre y cola |
| Transitions.dev | Propia (uso comercial permitido, sin redistribución; **no admitida**) | Solo patrón, reescrito sin su código | Escala de movimiento, check dibujado, revelado del esqueleto |
| Bencho | MIT declarado, pero sin código público | Inspiración | Firma con deshacer y sello |
| Bento Grids, Grainient, kargul.studio, Mobbin | Galerías o assets con licencia propia | Inspiración; ningún asset descargado ni incrustado | Rejilla bento, tarjetas vivas, grano propio, progreso por fila |
| Posts de X del lote E (david_visuals_, Jamie_Merrill, n___vc) | Sin licencia (trabajos de terceros) | Inspiración; CSS propio de la maqueta del lote E; las imágenes de `referencias/` son de uso interno | Carpeta, zona de arrastre, fila de archivo, segmentado, línea de actividad, chip de adjunto |

**Prohibido y no usado:** 23rd (sin licencia), Arc UI Pro, affectUI Pro, HextaUI Pro, AlignUI Pro, BoardUI Pro, Bencho Pro, Kobra (de pago y prohíbe pasar su código a modelos), HorizonX (de pago), Hanging Team y cualquier kit de Framer, React Bits (MIT + Commons Clause), la parte AGPL de coss, fondos de Grainient y capturas de Mobbin. Transitions.dev no se redistribuye: ningún bloque CSS suyo entra en el módulo. **Ninguna dependencia nueva en `vendor/`** (ni `motion`, ni Tailwind, ni React, ni librerías de gráficos o de subida).

## Plan de integración v1.2

### Reglas comunes

- Ramas `batida-area-<n>` desde `main` (b013569) en `Skilland-ai/epi10-oe-module`. PR contra `main` sin fusionar. El área 0 integra en `renove-demo`, instala en hermes-node (§9 de la base) y repite el recorrido de 99-demo, el detector de inglés y el contrato.
- **Las áreas 1–7 no tocan `epi10-ui.css`, `epi10-ui.js`, `ui.html.twig`, `iconos.svg` ni `vendor/`.** Si necesitan algo de ahí, lo piden al área 0. Iconos nuevos que añade el área 0 en el PR 1: `undo-2` (área 2), `phone`, `cake`, `package`, `activity`, `log-in` (área 7). El resto ya está en el sprite (`upload`, `file-signature`, `clipboard-list`, `message-circle`, `loader-circle`…).
- Cada área trabaja desde ya con los nombres del **contrato del área 0** (abajo); hasta que se fusione el PR 1, las clases simplemente no pintan nada y nada se rompe.
- Sin ids del núcleo cambiados, selectores `data-epi10-*` nuevos donde haya acción, `prefers-reduced-motion` en todo, capturas antes y después en `capturas/renove/batida/<area>/`.
- No se toca `oe-module-epi10` (contrato v1) ni se crea ningún endpoint de subida.
- Corte a las 22:00 del 12 oct (ver criterio).

### Contrato del área 0 (lo que usan las demás)

Nombres tomados de la [maqueta del lote E](capturas/E/maqueta-lote-E.html) cuando la pieza viene de ahí.

| Pieza | API |
|---|---|
| Esqueleto | `<div class="epi-skeleton epi-skeleton--linea|--circulo|--tarjeta" aria-hidden="true">` dentro de un contenedor con `aria-busy="true"`; `ui.esqueleto('lista'|'tarjeta'|'tabla', n)`; contenido real con `.epi-revela` |
| Tipo de fichero | `<span class="epi-tipo epi-tipo--pdf|--doc|--img">`; `ui.fichero('pdf', 'sm'|'lg')` (el 2.º parámetro es el tamaño del icono; el peso en bytes va en `ui.peso(bytes)` o `ui.adjunto({peso})`) en Twig y `EPI10.fichero('pdf')` en islas devuelven ese marcado |
| Chip de adjunto | `<a class="epi-adjunto">` con `.epi-tipo`, nombre truncado (`<span class="epi-fichero-nombre"><span>Guia-kit</span><span>.pdf</span></span>`) y `.epi-adjunto__meta` («PDF · 148 KB») |
| Fila de archivo | `ul.epi-archivos` > `li.epi-archivo` con `data-epi10-estado="pendiente|hecho|error"`, `style="--valor: 38"`, `.epi-tipo`, `__nombre`, `__peso`, `__estado` |
| Zona de arrastre | `<label class="epi-dropzone">` con `<input type="file" class="epi-sr-only">`, `.epi-carpeta--suave`, `__titulo`, `__ayuda`; `epi10-ui.js` pone `data-epi10-estado="arrastrando"` y lanza `epi10:archivos` con los ficheros soltados |
| Carpeta plana | `.epi-carpeta` (`--suave`, `--marfil`) con `__trasera`, `__papel` (×1–2), `__frente`; dentro de `epi-empty` sustituye a `__icon` |
| Control segmentado | `<div class="epi-segmentado" data-epi10-segmentado>` (`--iconos`) con `<button type="button" aria-pressed>`; evento `epi10:segmentado` con el valor |
| Línea de actividad | `ol.epi-actividad` > `li.epi-actividad__periodo` y `li.epi-actividad__item[data-epi10-tipo="clienta|hito|sistema"]` con `__icono`, `__frase` (actor y objeto en `<b>`), `__fecha`, `__detalle`; macro `ui.actividad(periodos)` |
| Botón con estado | Formularios: `data-epi10-ocupado-al-enviar` en el `<form>` (pone `aria-busy` en el submit a los 200 ms y lo bloquea). Fetch: `EPI10.conFeedback(boton, promesa, {retardo: 200, minimo: 500})` → `aria-busy` y luego `data-epi10-estado="hecho|error"` con el check dibujado durante 1,2 s |
| Sacudida | `EPI10.sacudir(elemento)`; automática en `[aria-invalid="true"]` cuando cambia |
| Check dibujado | `epi-check` con `input[type=checkbox]` (sin cambios de marcado) |
| Pestañas | `epi-tabs` sin cambios de marcado; el indicador se crea solo y sigue `aria-selected` o `aria-current` |
| Dato vivo en tarjeta | `<p class="epi-card__vivo epi-card__vivo--cifra|--chip|--barra">` dentro de `epi-card` |
| Grano | Clase `epi-grano` en cualquier superficie azul; ya aplicada por CSS a `.epi-fase` y `.epi-auth__brand` |
| Movimiento | `--epi10-dur-1|2|3`, `--epi10-ease-salida|entrada` |

### Áreas

| Área | Componentes hoy | Ficheros | Depende del área 0 | Conflicto con otras áreas | Horas |
|---|---|---|---|---|---|
| **0 · Base y transversal** | PR 1 (contratos CSS, primero, ≈ 3 h): tokens de movimiento, esqueleto + revelado, tipo de fichero, chip de adjunto, fila de archivo, zona de arrastre, carpeta plana, control segmentado, línea de actividad, dato vivo, grano, iconos nuevos. PR 2 (comportamientos, ≈ 3 h): botón con estado, sacudida, check dibujado, pestañas con indicador, JS de arrastre y de segmentado. Página de muestra y §5 de la guía al día | `public/ui/epi10-ui.css`, `public/ui/epi10-ui.js`, `templates/epi10/componentes/ui.html.twig`, `public/ui/iconos.svg`, `templates/epi10/paginas/kit.html.twig`, `renove/00_base_interfaz.md` (repo EPI-10) | — | Ninguno: es dueña única de sus ficheros | 6 |
| **1 · Acceso e inicio + selector** | Rejilla bento del inicio; tarjetas vivas; login del portal y del back office con sacudida y «Entrar» con estado. Selector: sin cambios | `public/ui/epi10-nucleo.css` (solo secciones «Portal · inicio» y «acceso»), `templates/sobrescritas/portal/partial/_nav_icon.html.twig`, `src/Inicio/DatosCaso.php`, `src/Inicio/FuncionesTwig.php`, `public/ui/epi10-login-portal.js`, `templates/epi10/login/backoffice.html.twig` | Dato vivo (PR 1); sacudida y botón (PR 2) | Ninguno. `epi10-nucleo.css` solo lo toca el área 1 hoy | 3 |
| **2 · Tareas firmables y cuestionario** | Esqueleto de la lista y de la tarea; progreso con tick dibujado; firma con «Deshacer trazo» y sello «Firmado»; casillas con check dibujado; transición direccional entre preguntas; aviso con sacudida si falta respuesta | `public/ui/islas/tareas.mjs`, `public/ui/epi10-tareas.css` | Esqueleto e icono `undo-2` (PR 1); check y sacudida (PR 2) | Ninguno: `tareas.mjs` es suyo. Riesgo interno: el E2E de SKI2-210 usa `#signTemplate`/`#sendTemplate` → no cambiar ids | 5 |
| **3 · Chat** | Separadores de día fijos; burbujas agrupadas; adjunto enviado como `epi-adjunto`; adjunto pendiente como `epi-archivo` con error en la fila; «Suelta para adjuntar» con `epi-dropzone`; esqueleto del hilo y de la lista; filtro «Todas · Sin responder» en la vista de equipo | `public/ui/islas/chat.mjs`, `public/ui/epi10-chat.css` | Esqueleto, tipo, adjunto, archivo, zona de arrastre y segmentado (PR 1); JS de arrastre y segmentado (PR 2) | Ninguno. La ficha incrusta el chat por iframe: no tocar `ficha.html.twig` | 4,5 |
| **4 · Biblioteca e informe** | Icono de tipo en lista, destacado y ficha › Documentos; esqueleto del visor PDF; grano en el destacado; vacío con carpeta plana (mi informe y ficha › Documentos); «Publicar informe» con estado | `templates/epi10/paginas/biblioteca.html.twig`, `templates/epi10/paginas/biblioteca-documento.html.twig`, `public/ui/islas/visor-pdf.mjs`, `public/ui/epi10-biblioteca.css`, `templates/epi10/componentes/documentos_ficha.html.twig` | Tipo, esqueleto, carpeta y grano (PR 1); botón (PR 2) | Con el área 7: `documentos_ficha.html.twig` se pinta dentro de la ficha, pero es del área 4; el área 7 no lo toca | 2,5 |
| **4b · Pantalla de informes del monolito** (fuera de OpenEMR) | Zona de arrastre sin JS alrededor del `<input type="file">` y el informe subido como fila de archivo «hecho». Solo visual | Repo `Skilland-ai/epi10-orquestador`: `src/modules/informes/pantalla/vistas.ts` (plantillas y estilos de `/informes/estilos.css`) | Ninguna: copia el CSS de la maqueta del lote E | Ninguno con el módulo. No tocar rutas, `multipart` ni la lógica de publicación (R4) | 1,5 |
| **5 · Citas y calendario** | Esqueleto del calendario y de los huecos. Calendario del back office: sin cambios | `public/ui/islas/calendario.mjs`, `public/ui/islas/calendario.css` | Esqueleto (PR 1) | Ninguno. **Propuesta:** que lo haga el mismo agente del área 4 (ficheros distintos) para no levantar un agente por 1 h | 1 |
| **7 · Back office** | Ficha: datos clave en la cabecera, línea de actividad en Resumen (con chip de adjunto en el informe), «Guardar» con estado. Lista: progreso de fase por fila, chips con punto y contador, esqueleto al buscar. Pestañas: comprobar el indicador (lo pone el área 0). Panel «Hoy» y selector: sin cambios | `templates/epi10/paginas/backoffice/ficha.html.twig`, `templates/epi10/paginas/backoffice/clientes.html.twig`, `templates/epi10/paginas/backoffice/_clientes_resultados.html.twig`, `public/ui/vistas/backoffice-clientes.css`, `public/ui/vistas/backoffice-clientes.js`, `src/Backoffice/Ficha.php`, `src/Backoffice/Clientes.php` | Línea de actividad, chip de adjunto e iconos (PR 1); botón y pestañas (PR 2) | Con el área 4 (ver arriba) y con el área 3 (iframe de mensajes): ninguno si cada una se queda en sus ficheros | 4,5 |

**Total:** ≈ 28 h de agente. Con 6 agentes en paralelo en el módulo (4 y 5 juntos) más uno en el monolito, unas 5–6 h de reloj.

### Qué entra primero y orden de fusión

1. **Área 0, PR 1 (contratos CSS)**: lo antes posible (objetivo ≈ 3 h; la maqueta del lote E ya trae la mitad del CSS). Sin él, las demás no se ven en la instancia.
2. **Área 2** (tarea firmable, P1 de la demo y la vista que Raúl peor puntuó).
3. **Área 3** (chat, P1: lo va a ver Carmen).
4. **Área 7** (ficha y lista, P1 para Aitor; la línea de actividad es la referencia de Raúl).
5. **Área 0, PR 2 (comportamientos)**: en cuanto esté; es transversal y se prueba mejor con 2, 3 y 7 ya dentro.
6. **Áreas 4 + 5** (informe y citas).
7. **Área 1** (inicio y login): al final, porque la rejilla bento y las tarjetas vivas cambian la primera pantalla y conviene verlas con todo lo demás ya instalado.
8. **4b (monolito)**: independiente; se fusiona en su repo cuando pase sus pruebas (`npm test`) y la captura de la pantalla de informes.

Tras cada fusión, el área 0 instala, sube el *patch* de `version.php` (caché de los CSS) y repite el recorrido de 99-demo en escritorio y móvil. Si algo rompe el recorrido, se revierte esa fusión y no se reintenta tras el corte de las 22:00.

### Preguntas para Raúl (todas en Después; nada de hoy depende de ellas)

1. ¿Pasos en raíl vertical a la izquierda del consentimiento en escritorio, o mantenemos la barra horizontal?
2. ¿Opciones del cuestionario con letra A/B/C estilo Typeform, o el radio actual?
3. ¿Confeti una vez al terminar, o halo cian sobrio alrededor del check?
4. ¿Halo de anillos detrás del logo en los logins, o panel liso con grano?
5. ¿Marfil liso en el inicio, o con luz difusa detrás del saludo?
6. ¿Anillo «4 de 5» junto a la fase del caso, además de la barra de 5 tramos?
7. ¿Indicador «el equipo está escribiendo…» aunque no haya señal real detrás?
8. ¿Resalte que se desliza entre filas en la lista de clientas?
9. ¿Notas de voz en el chat? (abre un tema de privacidad)
10. ¿Agrupamos Mi informe en carpetas planas cuando haya más documentos?
11. ¿Grano en los azules? Entra hoy porque es sutil y se quita con una línea; si no le gusta, se quita.

```json
{
  "version": "1.2",
  "fecha": "2026-10-12",
  "issue": "SKI2-254",
  "repo_codigo": "Skilland-ai/epi10-oe-module (main b013569)",
  "lote_e": "incorporado (585d9b5)",
  "corte": "2026-10-12T22:00",
  "orden_fusion": [
    "0 (PR 1)",
    "2",
    "3",
    "7",
    "0 (PR 2)",
    "4+5",
    "1",
    "4b (repo del monolito, independiente)"
  ],
  "areas": [
    {
      "area": 0,
      "nombre": "Base y transversal",
      "repo": "Skilland-ai/epi10-oe-module",
      "componentes": [
        {
          "nombre": "Tokens de movimiento (--epi10-dur-*, --epi10-ease-*)",
          "fuente": "Transitions.dev (solo patrón, reescrito)",
          "vista": "transversal",
          "fichero": "public/ui/epi10-ui.css",
          "esfuerzo": "S"
        },
        {
          "nombre": "Esqueleto y revelado (.epi-skeleton, .epi-revela, ui.esqueleto)",
          "fuente": "HextaUI Skeleton + Shimmer (MIT)",
          "vista": "transversal",
          "fichero": "public/ui/epi10-ui.css; templates/epi10/componentes/ui.html.twig",
          "esfuerzo": "S"
        },
        {
          "nombre": "Tipo de fichero (.epi-tipo, ui.fichero, EPI10.fichero)",
          "fuente": "Lote E maqueta + AlignUI File Format Icon (MIT, patrón)",
          "vista": "mensajes, mi informe, ficha › Documentos",
          "fichero": "public/ui/epi10-ui.css; public/ui/epi10-ui.js; templates/epi10/componentes/ui.html.twig",
          "esfuerzo": "S"
        },
        {
          "nombre": "Chip de adjunto (.epi-adjunto, nombre truncado con extensión)",
          "fuente": "Lote E n.º 9 + HextaUI Attachment (MIT)",
          "vista": "mensajes, ficha › Resumen",
          "fichero": "public/ui/epi10-ui.css",
          "esfuerzo": "S"
        },
        {
          "nombre": "Fila de archivo (.epi-archivo con pendiente|hecho|error y --valor)",
          "fuente": "Lote E n.º 5 (fusiona A n.º 26, B n.º 24, C n.º 13)",
          "vista": "mensajes",
          "fichero": "public/ui/epi10-ui.css",
          "esfuerzo": "S"
        },
        {
          "nombre": "Zona de arrastre (.epi-dropzone, arrastrando, evento epi10:archivos)",
          "fuente": "Lote E n.º 4 (fusiona A n.º 26, B n.º 24, C n.º 13)",
          "vista": "mensajes",
          "fichero": "public/ui/epi10-ui.css; public/ui/epi10-ui.js",
          "esfuerzo": "S"
        },
        {
          "nombre": "Carpeta plana (.epi-carpeta --suave --marfil)",
          "fuente": "Lote E n.º 1 (técnica validada con Uiverse, MIT)",
          "vista": "vacíos, zona de arrastre",
          "fichero": "public/ui/epi10-ui.css",
          "esfuerzo": "S"
        },
        {
          "nombre": "Control segmentado (.epi-segmentado, aria-pressed, evento epi10:segmentado)",
          "fuente": "Lote E n.º 7 (patrón ToggleGroup de shadcn/ui, MIT)",
          "vista": "mensajes del equipo",
          "fichero": "public/ui/epi10-ui.css; public/ui/epi10-ui.js",
          "esfuerzo": "S"
        },
        {
          "nombre": "Línea de actividad (.epi-actividad, ui.actividad)",
          "fuente": "Lote E n.º 8 + Arc UI Timeline (MIT); fusiona B n.º 14 y C n.º 18",
          "vista": "ficha › Resumen",
          "fichero": "public/ui/epi10-ui.css; templates/epi10/componentes/ui.html.twig",
          "esfuerzo": "S"
        },
        {
          "nombre": "Dato vivo en tarjeta (.epi-card__vivo)",
          "fuente": "Bento Grids (inspiración)",
          "vista": "portal inicio",
          "fichero": "public/ui/epi10-ui.css",
          "esfuerzo": "S"
        },
        {
          "nombre": "Textura de grano (.epi-grano) aplicada a .epi-fase y .epi-auth__brand",
          "fuente": "Grainient (patrón propio, sin assets)",
          "vista": "logins, inicio, mi informe",
          "fichero": "public/ui/epi10-ui.css",
          "esfuerzo": "S"
        },
        {
          "nombre": "Iconos nuevos: undo-2, phone, cake, package, activity, log-in",
          "fuente": "Lucide (ISC)",
          "vista": "tarea firmable, ficha",
          "fichero": "public/ui/iconos.svg",
          "esfuerzo": "S"
        },
        {
          "nombre": "Botón con estado (data-epi10-ocupado-al-enviar, EPI10.conFeedback)",
          "fuente": "HextaUI Button feedback + use-delayed-loading (MIT)",
          "vista": "logins, ficha, ficha › Documentos",
          "fichero": "public/ui/epi10-ui.js; public/ui/epi10-ui.css",
          "esfuerzo": "S"
        },
        {
          "nombre": "Sacudida de error (EPI10.sacudir, [aria-invalid])",
          "fuente": "HextaUI use-invalid-shake (MIT)",
          "vista": "logins, cuestionario",
          "fichero": "public/ui/epi10-ui.js; public/ui/epi10-ui.css",
          "esfuerzo": "S"
        },
        {
          "nombre": "Casilla con check dibujado (epi-check)",
          "fuente": "Transitions.dev checkbox-check (solo patrón, reescrito)",
          "vista": "tarea firmable",
          "fichero": "public/ui/epi10-ui.css",
          "esfuerzo": "S"
        },
        {
          "nombre": "Pestañas con indicador deslizante (.epi-tabs__ind)",
          "fuente": "HextaUI Tabs (MIT)",
          "vista": "ficha de clienta",
          "fichero": "public/ui/epi10-ui.css; public/ui/epi10-ui.js",
          "esfuerzo": "S"
        }
      ],
      "ficheros": [
        "public/ui/epi10-ui.css",
        "public/ui/epi10-ui.js",
        "templates/epi10/componentes/ui.html.twig",
        "public/ui/iconos.svg",
        "templates/epi10/paginas/kit.html.twig"
      ],
      "horas": 6
    },
    {
      "area": 1,
      "nombre": "Acceso e inicio + selector del back office",
      "repo": "Skilland-ai/epi10-oe-module",
      "componentes": [
        {
          "nombre": "Rejilla bento del inicio (#inject_card, 6 columnas, Mi informe ancho)",
          "fuente": "Bento Grids (inspiración)",
          "vista": "portal inicio",
          "fichero": "public/ui/epi10-nucleo.css",
          "esfuerzo": "S"
        },
        {
          "nombre": "Tarjetas vivas (documentos hechos, informe nuevo, próxima cita)",
          "fuente": "Bento Grids + Apple Health en Mobbin (inspiración)",
          "vista": "portal inicio",
          "fichero": "templates/sobrescritas/portal/partial/_nav_icon.html.twig; src/Inicio/DatosCaso.php; src/Inicio/FuncionesTwig.php",
          "esfuerzo": "M"
        },
        {
          "nombre": "Login con sacudida en error y Entrar con estado (portal y back office)",
          "fuente": "HextaUI (MIT), vía área 0",
          "vista": "portal login, back office login",
          "fichero": "public/ui/epi10-login-portal.js; templates/epi10/login/backoffice.html.twig",
          "esfuerzo": "S"
        }
      ],
      "ficheros": [
        "public/ui/epi10-nucleo.css",
        "templates/sobrescritas/portal/partial/_nav_icon.html.twig",
        "src/Inicio/DatosCaso.php",
        "src/Inicio/FuncionesTwig.php",
        "public/ui/epi10-login-portal.js",
        "templates/epi10/login/backoffice.html.twig"
      ],
      "horas": 3
    },
    {
      "area": 2,
      "nombre": "Tareas firmables y cuestionario",
      "repo": "Skilland-ai/epi10-oe-module",
      "componentes": [
        {
          "nombre": "Esqueleto de la lista y de la tarea",
          "fuente": "HextaUI Skeleton (MIT), vía área 0",
          "vista": "mis documentos, tarea firmable",
          "fichero": "public/ui/islas/tareas.mjs",
          "esfuerzo": "S"
        },
        {
          "nombre": "Progreso que crece y tick dibujado en tareas hechas (sin tachado)",
          "fuente": "affectUI Progress Tracker (MIT)",
          "vista": "mis documentos",
          "fichero": "public/ui/islas/tareas.mjs; public/ui/epi10-tareas.css",
          "esfuerzo": "S"
        },
        {
          "nombre": "Firma con Deshacer trazo y sello Firmado",
          "fuente": "Bencho signature (inspiración) sobre signature_pad",
          "vista": "tarea firmable",
          "fichero": "public/ui/islas/tareas.mjs; public/ui/epi10-tareas.css",
          "esfuerzo": "M"
        },
        {
          "nombre": "Casillas de aceptación con check dibujado (epi-check)",
          "fuente": "Transitions.dev (solo patrón), vía área 0",
          "vista": "tarea firmable",
          "fichero": "public/ui/islas/tareas.mjs",
          "esfuerzo": "S"
        },
        {
          "nombre": "Transición direccional entre preguntas (data-epi10-direccion)",
          "fuente": "HextaUI Questionnaire (MIT, patrón)",
          "vista": "cuestionario",
          "fichero": "public/ui/islas/tareas.mjs; public/ui/epi10-tareas.css",
          "esfuerzo": "M"
        },
        {
          "nombre": "Aviso con sacudida si falta respuesta",
          "fuente": "HextaUI use-invalid-shake (MIT), vía área 0",
          "vista": "cuestionario",
          "fichero": "public/ui/islas/tareas.mjs",
          "esfuerzo": "S"
        }
      ],
      "ficheros": [
        "public/ui/islas/tareas.mjs",
        "public/ui/epi10-tareas.css"
      ],
      "horas": 5
    },
    {
      "area": 3,
      "nombre": "Chat",
      "repo": "Skilland-ai/epi10-oe-module",
      "componentes": [
        {
          "nombre": "Separadores de día fijos (Hoy, Ayer, fecha)",
          "fuente": "HextaUI Marker (MIT)",
          "vista": "mensajes portal y equipo",
          "fichero": "public/ui/islas/chat.mjs; public/ui/epi10-chat.css",
          "esfuerzo": "S"
        },
        {
          "nombre": "Burbujas agrupadas por remitente (autor en la primera, hora en la última)",
          "fuente": "HextaUI Bubble group (MIT)",
          "vista": "mensajes portal y equipo",
          "fichero": "public/ui/islas/chat.mjs; public/ui/epi10-chat.css",
          "esfuerzo": "M"
        },
        {
          "nombre": "Adjunto enviado como chip epi-adjunto con tipo y peso",
          "fuente": "Lote E n.º 9 + C n.º 01 + HextaUI Attachment, vía área 0",
          "vista": "mensajes portal y equipo",
          "fichero": "public/ui/islas/chat.mjs; public/ui/epi10-chat.css",
          "esfuerzo": "S"
        },
        {
          "nombre": "Adjunto pendiente como epi-archivo con error en la fila",
          "fuente": "Lote E n.º 5, vía área 0",
          "vista": "mensajes portal y equipo",
          "fichero": "public/ui/islas/chat.mjs; public/ui/epi10-chat.css",
          "esfuerzo": "S"
        },
        {
          "nombre": "Suelta para adjuntar (epi-dropzone sobre el hilo, escritorio)",
          "fuente": "Lote E n.º 4, vía área 0",
          "vista": "mensajes portal y equipo",
          "fichero": "public/ui/islas/chat.mjs; public/ui/epi10-chat.css",
          "esfuerzo": "S"
        },
        {
          "nombre": "Esqueleto del hilo y de la lista de conversaciones",
          "fuente": "HextaUI Skeleton (MIT), vía área 0",
          "vista": "mensajes portal y equipo",
          "fichero": "public/ui/islas/chat.mjs",
          "esfuerzo": "S"
        },
        {
          "nombre": "Filtro Todas · Sin responder (epi-segmentado)",
          "fuente": "Lote E n.º 7, vía área 0",
          "vista": "mensajes del equipo",
          "fichero": "public/ui/islas/chat.mjs; public/ui/epi10-chat.css",
          "esfuerzo": "S"
        }
      ],
      "ficheros": [
        "public/ui/islas/chat.mjs",
        "public/ui/epi10-chat.css"
      ],
      "horas": 4.5
    },
    {
      "area": 4,
      "nombre": "Biblioteca e informe",
      "repo": "Skilland-ai/epi10-oe-module",
      "componentes": [
        {
          "nombre": "Icono de tipo PDF en lista, destacado y ficha › Documentos",
          "fuente": "AlignUI File Format Icon (MIT, patrón) + lote E .epi-tipo, vía área 0",
          "vista": "mi informe, ficha › Documentos",
          "fichero": "templates/epi10/paginas/biblioteca.html.twig; templates/epi10/paginas/biblioteca-documento.html.twig; templates/epi10/componentes/documentos_ficha.html.twig",
          "esfuerzo": "S"
        },
        {
          "nombre": "Esqueleto del visor PDF (hoja A4)",
          "fuente": "HextaUI Skeleton (MIT), vía área 0",
          "vista": "mi informe",
          "fichero": "public/ui/islas/visor-pdf.mjs; public/ui/epi10-biblioteca.css",
          "esfuerzo": "S"
        },
        {
          "nombre": "Grano en el destacado del informe",
          "fuente": "Grainient (patrón propio), vía área 0",
          "vista": "mi informe",
          "fichero": "templates/epi10/paginas/biblioteca.html.twig",
          "esfuerzo": "S"
        },
        {
          "nombre": "Vacío con carpeta plana (aún no hay informe; ficha › Documentos vacía)",
          "fuente": "Lote E n.º 1, vía área 0",
          "vista": "mi informe, ficha › Documentos",
          "fichero": "templates/epi10/paginas/biblioteca.html.twig; templates/epi10/componentes/documentos_ficha.html.twig",
          "esfuerzo": "S"
        },
        {
          "nombre": "Publicar informe con estado (sin doble clic)",
          "fuente": "HextaUI Button feedback (MIT), vía área 0",
          "vista": "ficha › Documentos",
          "fichero": "templates/epi10/componentes/documentos_ficha.html.twig",
          "esfuerzo": "S"
        }
      ],
      "ficheros": [
        "templates/epi10/paginas/biblioteca.html.twig",
        "templates/epi10/paginas/biblioteca-documento.html.twig",
        "templates/epi10/componentes/documentos_ficha.html.twig",
        "public/ui/islas/visor-pdf.mjs",
        "public/ui/epi10-biblioteca.css"
      ],
      "horas": 2.5
    },
    {
      "area": "4b",
      "nombre": "Pantalla de informes del monolito (solo visual)",
      "repo": "Skilland-ai/epi10-orquestador",
      "componentes": [
        {
          "nombre": "Zona de arrastre sin JS alrededor del input de subida",
          "fuente": "Lote E n.º 4 (CSS de la maqueta)",
          "vista": "monolito: pantalla de informes",
          "fichero": "src/modules/informes/pantalla/vistas.ts",
          "esfuerzo": "S"
        },
        {
          "nombre": "Informe subido como fila de archivo en estado hecho (tipo, nombre, peso)",
          "fuente": "Lote E n.º 5 (CSS de la maqueta)",
          "vista": "monolito: pantalla de informes",
          "fichero": "src/modules/informes/pantalla/vistas.ts",
          "esfuerzo": "S"
        }
      ],
      "ficheros": [
        "src/modules/informes/pantalla/vistas.ts"
      ],
      "horas": 1.5
    },
    {
      "area": 5,
      "nombre": "Citas y calendario",
      "repo": "Skilland-ai/epi10-oe-module",
      "componentes": [
        {
          "nombre": "Esqueleto del calendario y de los huecos",
          "fuente": "HextaUI Skeleton (MIT), vía área 0",
          "vista": "portal citas",
          "fichero": "public/ui/islas/calendario.mjs; public/ui/islas/calendario.css",
          "esfuerzo": "S"
        }
      ],
      "ficheros": [
        "public/ui/islas/calendario.mjs",
        "public/ui/islas/calendario.css"
      ],
      "horas": 1
    },
    {
      "area": 7,
      "nombre": "Back office (lista, ficha, panel Hoy)",
      "repo": "Skilland-ai/epi10-oe-module",
      "componentes": [
        {
          "nombre": "Datos clave en la cabecera de la ficha (teléfono, nacimiento, kit, alta, caso en Odoo)",
          "fuente": "BoardUI patient-info-card (MIT)",
          "vista": "ficha de clienta",
          "fichero": "templates/epi10/paginas/backoffice/ficha.html.twig; public/ui/vistas/backoffice-clientes.css; src/Backoffice/Ficha.php",
          "esfuerzo": "S"
        },
        {
          "nombre": "Línea de actividad en Resumen (actor-verbo-objeto, por periodo, bloque Pendiente, chip del informe)",
          "fuente": "Lote E n.º 8 + Arc UI Timeline (MIT), vía área 0",
          "vista": "ficha de clienta",
          "fichero": "templates/epi10/paginas/backoffice/ficha.html.twig; src/Backoffice/Ficha.php",
          "esfuerzo": "M"
        },
        {
          "nombre": "Guardar datos con estado",
          "fuente": "HextaUI Button feedback (MIT), vía área 0",
          "vista": "ficha de clienta",
          "fichero": "templates/epi10/paginas/backoffice/ficha.html.twig",
          "esfuerzo": "S"
        },
        {
          "nombre": "Progreso de fase por fila (micro-barra y 3 de 5)",
          "fuente": "kargul.studio (inspiración)",
          "vista": "buscador y lista de clientas",
          "fichero": "templates/epi10/paginas/backoffice/_clientes_resultados.html.twig; public/ui/vistas/backoffice-clientes.css; src/Backoffice/Clientes.php",
          "esfuerzo": "S"
        },
        {
          "nombre": "Chips de fase con punto de color y contador",
          "fuente": "BoardUI chip + status-dot (MIT)",
          "vista": "buscador y lista de clientas",
          "fichero": "templates/epi10/paginas/backoffice/clientes.html.twig; public/ui/vistas/backoffice-clientes.css; src/Backoffice/Clientes.php",
          "esfuerzo": "S"
        },
        {
          "nombre": "Esqueleto al buscar",
          "fuente": "HextaUI Skeleton (MIT), vía área 0",
          "vista": "buscador y lista de clientas",
          "fichero": "public/ui/vistas/backoffice-clientes.js",
          "esfuerzo": "S"
        }
      ],
      "ficheros": [
        "templates/epi10/paginas/backoffice/ficha.html.twig",
        "templates/epi10/paginas/backoffice/clientes.html.twig",
        "templates/epi10/paginas/backoffice/_clientes_resultados.html.twig",
        "public/ui/vistas/backoffice-clientes.css",
        "public/ui/vistas/backoffice-clientes.js",
        "src/Backoffice/Ficha.php",
        "src/Backoffice/Clientes.php"
      ],
      "horas": 4.5
    }
  ]
}
```
