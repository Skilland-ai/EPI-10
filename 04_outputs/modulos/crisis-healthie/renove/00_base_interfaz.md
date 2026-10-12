# Guía de la base de interfaz EPI10 UI para las áreas 1–7

Fecha: 2026-10-11 · Linear: SKI2-209 (área 0) · Decisión: [2026-10-11_base_interfaz_decision_v1.md](2026-10-11_base_interfaz_decision_v1.md), ratificada por Raúl
Código: repo `Skilland-ai/epi10-oe-module`, carpeta `oe-module-epi10-ui/`, en `main` desde el PR #2 (base) y los PR de las áreas
Muestra en vivo (hermes-node, con sesión): portal `http://localhost:4896/interface/modules/custom_modules/oe-module-epi10-ui/public/portal/kit.php` · back office `…/public/backoffice/kit.php`

## 1. Qué es, en cinco líneas

1. **EPI10 UI** es un CSS y un JS sin build: el sistema de diseño de shadcn/ui (vía Basecoat), con la marca EPI10, prefijo `epi-` y sin `@layer`, para convivir con el Bootstrap 4 de OpenEMR.
2. Vive en un **módulo hermano**, `oe-module-epi10-ui`. El módulo `oe-module-epi10` es el contrato v1 con el monolito (SKI2-210): **no se toca** salvo coordinándolo con el orquestador.
3. Las vistas nuevas son **páginas PHP del módulo + plantillas Twig** con el layout común (cabecera con logo, «volver» y menú de usuario).
4. Lo rico (chat, firma, calendario, visor PDF) son **islas Preact + htm**: un `<div data-epi10-isla="…">` que monta un módulo ES. Sin npm, sin bundler.
5. Todo en **español**. Lo que EPI10 no usa **se esconde**, no se borra.

## 2. Reglas

- **Prefijo `epi-`** en todas las clases propias. Nunca estilos sobre elementos sueltos (`button {…}`) ni sobre clases de Bootstrap, salvo en `epi10-nucleo.css` (vistas del núcleo, ver §6).
- **No cambies ids del núcleo** que use el ensayo E2E de SKI2-210 (`#documents-go`, `#messages-go`, `#signTemplate`, `#sendTemplate`, `#uname`, `#pass`, `#authUser`, `#clearPass`, `#login-button`…). Añade `data-epi10-*` al lado. Si necesitas cambiar uno, avisa antes al orquestador.
- **Sin build y sin CDN**: lo de terceros se vendoriza ya compilado en `public/ui/vendor/<lib>/` con su licencia. Comprueba que sea MIT, ISC, BSD o Apache-2.0.
- **Sin datos reales.** Pacientes ficticias nuevas si hace falta; no borres a Lucía (pid 1).
- **Ningún texto en inglés.** Textos propios en español en la plantilla; constantes de OpenEMR por `i18n/openemr_es.tsv` (§8).
- Portal **precioso**; back office **usable**: misma base, más densidad.

## 3. Estructura del módulo

```text
oe-module-epi10-ui/
  config.php                     vistas_renovadas (vistas del núcleo con shell), marca, ayuda
  src/Bootstrap.php              eventos: estilos, scripts, Twig (@epi10 + sobrescrituras), login del back office
  src/Vista.php                  Vista::portal() y Vista::backoffice(): pintan una plantilla con el layout
  templates/epi10/layouts/       base, portal, backoffice
  templates/epi10/componentes/   ui.html.twig (macros), cabecera, menú de usuario
  templates/epi10/paginas/       una plantilla por vista propia (kit.html.twig es la referencia)
  templates/epi10/login/         login del back office
  templates/sobrescritas/        rutas del núcleo que sustituimos (portal/header.html.twig, tarjetas del inicio)
  public/ui/epi10-ui.css         tokens + shell + componentes
  public/ui/epi10-ui.js          menú, modal, toast, volver, cargador de islas (window.EPI10)
  public/ui/epi10-nucleo.css     ajustes a vistas del núcleo renovadas (por vista)
  public/ui/iconos.svg           sprite de iconos Lucide (ISC)
  public/ui/islas/*.mjs          islas Preact (una por archivo)
  public/ui/vendor/              preact-htm.mjs y lo que vendoricéis
  public/portal/*.php            páginas del portal (sesión de paciente)
  public/backoffice/*.php        páginas del equipo (sesión de OpenEMR)
  i18n/openemr_es.tsv            traducciones de constantes de OpenEMR
scripts/instalar-ui.sh           despliegue al contenedor sin reiniciar OpenEMR
scripts/capturas-renove.mjs      capturas de escritorio y móvil
```

## 4. Crear una vista nueva

### Portal (sesión de la clienta)

`public/portal/mis-documentos.php`:

```php
<?php
use OpenEMR\Modules\Epi10Ui\Vista;

$landingpage = '../../../../../../portal/index.php?site=' . urlencode((string)($_GET['site'] ?? 'default'));
require_once __DIR__ . '/../../../../../../portal/verify_session.php'; // fija $pid o redirige al login

echo Vista::portal('@epi10/paginas/mis-documentos.html.twig', [
    'vista' => 'mis-documentos',                 // → <body data-epi10-vista="mis-documentos">
    'titulo' => 'Mis documentos',
    'eyebrow' => 'Paso 1 de tu proceso',         // opcional
    'entradilla' => 'Esto es lo que te toca ahora.',
    'volver' => ['url' => \OpenEMR\Core\OEGlobalsBag::getInstance()->getString('webroot') . '/portal/home.php', 'texto' => 'Volver a tu espacio'],
    'ancho' => 'estrecho',                       // opcional: lectura y formularios
    'tareas' => $tareas,                         // tus datos
]);
```

`templates/epi10/paginas/mis-documentos.html.twig`:

```twig
{% extends "@epi10/layouts/portal.html.twig" %}
{% import "@epi10/componentes/ui.html.twig" as ui %}
{% block contenido %}
  <ul class="epi-list" data-epi10-lista="tareas">
    {% for t in tareas %}
      <li class="epi-list__item epi-list__item--link" data-epi10-estado="{{ t.estado|attr }}" data-epi10-item="{{ t.clave|attr }}">
        <span class="epi-list__num">{{ loop.index }}</span>
        <div class="epi-list__body">
          <p class="epi-list__title"><a href="{{ t.url|attr }}">{{ t.titulo|text }}</a></p>
          <p class="epi-list__meta">{{ t.meta|text }}</p>
        </div>
        <div class="epi-list__aside">{{ ui.estado(t.estado) }}<span class="epi-btn epi-btn--sm">{{ t.cta|text }}</span></div>
      </li>
    {% endfor %}
  </ul>
{% endblock %}
```

URL: `/interface/modules/custom_modules/oe-module-epi10-ui/public/portal/mis-documentos.php`.

**Apuntar una tarjeta del inicio a tu página** (mecanismo del área 1): añade el id del núcleo a `config.php › destinos_tarjetas`, con la ruta desde el webroot:

```php
'destinos_tarjetas' => [
    'documents-go' => '/interface/modules/custom_modules/oe-module-epi10-ui/public/portal/mis-documentos.php',
],
```

La tarjeta conserva su id (y los `data-epi10-*`), deja de abrir la sección del núcleo y navega a tu página. Si el archivo no está instalado, sigue con el comportamiento del núcleo. Al volver al inicio desde una página propia se abre siempre el panel: `Vista::portal()` reinicia la sección recordada (`whereto`).

`Vista::portal()` ya pone: cabecera (logo → inicio, «volver» si pasas `volver`), menú de usuario (Ajustes, Ayuda, Cerrar sesión), nombre e iniciales de la clienta, `csrf` (token del portal) y el global `epi10` (`epi10.ui`, `epi10.img`, `epi10.webroot`, `epi10.v`, `epi10.marca`).

### Back office (sesión del equipo)

```php
<?php
use OpenEMR\Modules\Epi10Ui\Vista;
require_once __DIR__ . '/../../../../../globals.php'; // sesión y ACL de OpenEMR
// comprueba permisos con AclMain::aclCheckCore(...) si la vista lo necesita
echo Vista::backoffice('@epi10/paginas/clientes.html.twig', [
    'vista' => 'clientes', 'titulo' => 'Clientes',
    'compacto' => true, // sin cabecera propia cuando se abre dentro de una pestaña de main.php
]);
```

La plantilla extiende `@epi10/layouts/backoffice.html.twig` con los mismos bloques (`contenido`, `cabecera_pagina`). Menús y ACL del back office son del **área 7**; la cabecera y el shell, del área 0.

### Datos para la vista o la isla (JSON)

Un endpoint por recurso en `public/portal/api/` o `public/backoffice/api/`, con la misma sesión y CSRF:

```php
<?php
use OpenEMR\Common\Csrf\CsrfUtils;
use OpenEMR\Common\Session\SessionWrapperFactory;
$landingpage = '../../../../../../../portal/index.php?site=default';
require_once __DIR__ . '/../../../../../../../portal/verify_session.php';
$session = SessionWrapperFactory::getInstance()->getActiveSession();
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !CsrfUtils::verifyCsrfToken($_SERVER['HTTP_X_CSRF_TOKEN'] ?? '', session: $session)) {
    http_response_code(403); exit;
}
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['mensajes' => [/* … solo lo de $pid … */]]);
```

**Sesión caducada en una API.** `verify_session.php` no devuelve 401: redirige (302) al login, y `fetch` sigue la redirección y recibe HTML con estado 200. En la isla, trata como «sesión caducada» cualquier respuesta que no sea JSON:

```js
const r = await fetch(api, { credentials: 'same-origin' });
if (r.redirected || !(r.headers.get('content-type') || '').includes('application/json')) {
  window.EPI10.toast('Tu sesión ha caducado. Vuelve a entrar.', { tipo: 'error' });
  location.href = window.EPI10.uiBase.replace(/\/interface\/.*$/, '') + '/portal/index.php';
  return;
}
```

(Pendiente en la base: un ayudante que responda 401 JSON sin pasar por la redirección.)

Reutiliza los servicios de `oe-module-epi10` (`OpenEMR\Modules\Epi10\Portal\…`) para leer formularios, mensajes o informes: no dupliques reglas como la de publicación de informes (R4). **El contrato v1 no cambia.**

## 5. Componentes

Todos están en la página de muestra con su HTML. Copia el bloque que necesites.

| Componente | Clases | Notas |
|---|---|---|
| Botón | `epi-btn` + `--secondary` `--outline` `--ghost` `--danger` `--light` `--link` · `--sm` `--lg` `--block` `--icon` | `aria-busy="true"` muestra el spinner. **Un solo CTA principal por pantalla** |
| Tarjeta | `epi-card` `__header` `__title` `__desc` `__body` `__footer` `__icon` `__cta` · `--link` `--destacada` `--plana` | `--destacada` para «el siguiente paso» |
| Formulario | `epi-form` `epi-field` `epi-label` `epi-hint` `epi-error-text` `epi-input` `epi-select` `epi-textarea` `epi-input-group` | Error: `aria-invalid="true"` + `epi-error-text` con `aria-describedby` |
| Opciones | `epi-check` (casilla o radio compacto) · `epi-choice` (opción grande, cuestionarios) · `epi-switch` · `epi-fieldset` `epi-legend` | `epi-choice` resalta la elegida con `:has(:checked)` |
| Lista con estados | `epi-list` `__item` `__item--link` `__num` `__icon` `__body` `__title` `__meta` `__aside` + `data-epi10-estado` | Estados: `nuevo` (barra cian, negrita), `visto`, `pendiente`, `hecho`, `error` |
| Badge | `epi-badge--nuevo|visto|pendiente|hecho|error|azul` · `epi-count` | Macro `ui.estado('pendiente')` pone el texto en español |
| Aviso | `epi-alert` + `--ok` `--aviso` `--error` · `epi-empty` | |
| Progreso | `ui.progreso(40, 'Pregunta 4 de 10')` · `epi-steps` con `data-epi10-estado="hecho|actual|pendiente"` | |
| Modal | `<dialog class="epi-dialog">` `__header` `__title` `__close` `__body` `__footer` | Abrir: `data-epi10-abrir-modal="id"`; cerrar: `data-epi10-cerrar-modal` |
| Visor de documento | `epi-visor` `__toolbar` `__title` `__meta` `__scroll` `__paper` (HTML) o `__frame` (iframe PDF) `__footer` (CTA fijo) · `epi-firma` | Contenedor para el área 2 (consentimiento) y el área 4 (PDF) |
| Toast | `EPI10.toast('Texto', {tipo: 'ok'|'error'|'info', duracion: 5000})` | |
| Pestañas | `epi-tabs` `epi-tabs__tab` con `aria-current="page"` o `aria-selected="true"` | Ficha de cliente del área 7. **v1.2:** el indicador deslizante `.epi-tabs__ind` lo crea `epi10-ui.js` solo; para pestañas pintadas después, `EPI10.pestanas(raiz)` |
| Tabla | `epi-table-wrap` > `epi-table` | Back office |
| Maquetación | `epi-main` (`--estrecho`), `epi-page-head`, `epi-eyebrow`, `epi-title`, `epi-lead`, `epi-h2`, `epi-stack` (`--sm` `--lg`), `epi-row` (`--between` `--end`), `epi-grid` (`--epi-col: 280px`) | |
| Iconos | `ui.icono('arrow-left')` en Twig · `EPI10.icono('check')` en JS | Sprite de 51 iconos Lucide (v1.2 añade `undo-2`, `phone`, `cake`, `package`, `activity`, `log-in`). Para añadir uno, copia su `<symbol>` de lucide-static en `public/ui/iconos.svg` |


### Piezas v1.2 (SKI2-256, área 0)

Contrato completo en la tabla «Contrato del área 0» de [batida/2026-10-12_inventario_consolidado_v1.md](batida/2026-10-12_inventario_consolidado_v1.md). Todas están en la página de muestra (secciones «Carga», «Ficheros», «Segmentado», «Actividad», «Dato vivo y grano» y «Comportamientos»).

| Componente | Clases y API | Notas |
|---|---|---|
| Movimiento | `--epi10-dur-1` (120 ms) `--epi10-dur-2` (200 ms) `--epi10-dur-3` (300 ms) · `--epi10-ease-salida` (lo que entra) `--epi10-ease-entrada` (lo que sale) | ≤ 200 ms en microinteracciones, ≤ 300 ms en pantallas, sin rebotes, siempre con `prefers-reduced-motion` |
| Esqueleto | `epi-skeleton` `--linea` `--circulo` `--tarjeta` (ancho con `--ancho`) · `ui.esqueleto('lista'|'tarjeta'|'tabla', n)` · `EPI10.esqueleto(tipo, n)` (HTML) · `epi-revela` | Aparece a los 150 ms; el bloque lleva `role="status"` y `aria-busy`. El contenido real entra con `epi-revela` |
| Tipo de fichero | `epi-tipo` `--pdf` `--doc` `--img` `--otro` · `--sm` `--lg` · `ui.fichero(tipo, 'sm'|'lg')` · `EPI10.fichero(tipo, tamaño)` | `tipo` admite extensión, nombre o MIME |
| Nombre de fichero | `epi-fichero-nombre` · `ui.nombre_fichero(n)` · `EPI10.nombreFichero(n)` · `ui.peso(bytes)` · `EPI10.peso(bytes)` | Trunca la base y conserva la extensión; peso «148 KB», «1,2 MB» |
| Chip de adjunto | `epi-adjunto` + `__meta` · `ui.adjunto({nombre, url, tipo?, peso?})` | |
| Fila de archivo | `epi-archivos` > `epi-archivo[data-epi10-estado="pendiente|hecho|error"]` con `--valor`, `__nombre`, `__peso`, `__estado` | Barra de progreso solo en `pendiente` |
| Zona de arrastre | `<label class="epi-dropzone">` + `<input type="file" class="epi-sr-only">`, `__titulo` (`data-epi10-texto-arrastrando`), `__ayuda` | Sin JS funciona como selector. Con JS: `data-epi10-estado="arrastrando"` y evento `epi10:archivos` `{archivos, rechazados, origen}` (`archivos` cumplen el `accept` del input; `rechazados`, no). Con el input `disabled` o la zona `aria-disabled` no reacciona. Fuera de las zonas solo evita que el navegador abra el fichero, y nunca si una isla ya gestiona el arrastre (`preventDefault` previo) o el destino es un `<input type=file>` normal |
| Carpeta plana | `epi-carpeta` `--suave` `--marfil` con `__trasera`, `__papel` ×1–2, `__frente` | En `epi-empty` sustituye a `__icon` |
| Control segmentado | `epi-segmentado[data-epi10-segmentado="nombre"]` (`--iconos`) con `button[aria-pressed][value]` | Evento `epi10:segmentado` `{nombre, valor, boton}`. Filtra dentro de una vista; para cambiar de vista, `epi-tabs` |
| Línea de actividad | `ol.epi-actividad` > `li.__periodo` + `li.__item[data-epi10-tipo="clienta|hito|sistema"]` con `__icono`, `__frase`, `__fecha`, `__detalle` · `ui.actividad(periodos)` | `periodos = [{titulo, items: [{tipo, icono, actor, accion, objeto, resto?, frase?, fecha, fecha_iso?, detalle?, adjunto?, clave?}]}]` |
| Dato vivo | `epi-card__vivo` `--cifra` (número en `<strong>`) `--chip` (`data-epi10-estado`) `--barra` (`--valor`) | También sobre `epi-card--destacada` |
| Grano | `epi-grano` | Ya aplicado a `.epi-fase` y `.epi-auth__brand` (el panel azul de los logins) |
| Botón con estado | `<form data-epi10-ocupado-al-enviar>` · `EPI10.conFeedback(boton, promesa, {retardo: 200, minimo: 500})` | `aria-busy` y luego `data-epi10-estado="hecho|error"` 1,2 s. No desactiva el submit. El formulario se libera solo si otro código cancela el envío, al volver con «atrás», si solo cambia el fragmento o a los 15 s (descargas); con `target` distinto de `_self` no se marca. `conFeedback` sin botón devuelve la promesa tal cual; con dos llamadas seguidas sobre el mismo botón manda la última |
| Sacudida | `EPI10.sacudir(el)` | Automática cuando un campo **pasa** a `aria-invalid="true"` y, al cargar, en el primer campo inválido. **Si el campo ya era inválido y se vuelve a fallar, el atributo no cambia y no sacude solo: llama a `EPI10.sacudir(campo)`** |
| Check dibujado | `epi-check` con `input[type=checkbox]` | Sin cambios de marcado |

Tokens en `:root` (`--epi10-azul`, `--epi10-cian`, `--epi10-marfil`, `--epi10-tinta`, `--epi10-radius`, `--epi10-shadow`…). Úsalos en vez de colores sueltos. Si un área necesita un componente que no está, lo añade a `epi10-ui.css` con su sección y lo pone en la página de muestra; avisa al orquestador para que el resto lo vea.

## 6. Vistas del núcleo (las que sigue pintando OpenEMR)

Para vestir una pantalla del núcleo (Phreeze de documentos, mensajes, citas) sin rehacerla:

1. Añade su ruta (sufijo de `SCRIPT_NAME`) a `config.php › vistas_renovadas`. En esa vista se carga `epi10-ui.css`, `epi10-nucleo.css` y `epi10-ui.js`, y **se apaga el tema heredado** del prototipo.
2. Añade una sección a `epi10-nucleo.css` encabezada con la vista. Ahí sí se permiten selectores del núcleo, acotados a esa vista.
3. Si la vista es Twig, puedes sobrescribir su plantilla en `templates/sobrescritas/<misma ruta>` (gana sobre el núcleo y sobre `oe-module-epi10`). Conserva ids y atributos que use su JS.
4. Si la vista es PHP sin plantilla (login del portal), el JS puede envolver el HTML existente **moviendo** nodos, nunca clonándolos (ver `epi10-login-portal.js`).
5. **Ajuste ligero sin renovar la vista** (p. ej. traducir con JS las cabeceras del calendario, que el núcleo pinta con `date()`): `config.php › scripts_por_vista` y `estilos_por_vista` (`'/interface/main/calendar/index.php' => ['ui/vistas/calendario-backoffice.js']`). Se inyecta solo en esa vista, sin shell y sin apagar el tema heredado. Los archivos van en `public/ui/vistas/`.

Lo que ya está renovado por el área 0:

| Vista | Cómo | Dueña siguiente |
|---|---|---|
| Login del portal (`portal/index.php`) | Envoltorio JS + CSS; formulario del núcleo intacto | Área 1 |
| Inicio del portal (`portal/home.php`) | `header.html.twig` y tarjetas sobrescritas; Ajustes, Ayuda y Salir pasan al menú de usuario | Área 1 |
| Login del back office (`interface/login/login.php`) | Plantilla propia por `TemplatePageEvent` | Área 1 |
| Página de muestra (portal y back office) | Páginas propias | Área 0 |

## 7. Islas de JavaScript (chat, firma, calendario, visor)

Una isla es un módulo ES en `public/ui/islas/<nombre>.mjs` que exporta una función por defecto. `epi10-ui.js` busca los `[data-epi10-isla]` al cargar la página y los monta.

**1. En la plantilla:**

```twig
{{ ui.isla('chat', {hilo: hilo_id, api: epi10.modulo ~ 'portal/api/mensajes.php', csrf: csrf}) }}
{# equivale a <div data-epi10-isla="chat" data-epi10-props='{"hilo":…}'></div> #}
```

**2. En `public/ui/islas/chat.mjs`:**

```js
import { html, render, useState, useEffect } from '../vendor/preact-htm.mjs';

function Chat({ api, csrf }) {
  const [mensajes, setMensajes] = useState([]);
  useEffect(() => {
    const cargar = () => fetch(api, { credentials: 'same-origin' }).then(r => r.json()).then(d => setMensajes(d.mensajes));
    cargar();
    const t = setInterval(cargar, 10000); // «parece tiempo real»
    return () => clearInterval(t);
  }, []);
  const enviar = (texto) => fetch(api, { method: 'POST', credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf }, body: JSON.stringify({ texto }) })
    .then(r => r.ok ? window.EPI10.toast('Mensaje enviado', { tipo: 'ok' }) : window.EPI10.toast('No se ha podido enviar', { tipo: 'error' }));
  return html`<div class="epi-card" data-epi10-chat>…${mensajes.map(m => html`<p>${m.texto}</p>`)}…</div>`;
}

export default (el, props) => render(html`<${Chat} ...${props} />`, el);
```

**3. Librerías de terceros sin build.** Descarga el paquete con `npm pack <lib>@<versión>` en una carpeta temporal, copia **solo** su build ES (`.mjs` o `dist/*.js` con `export`) a `public/ui/vendor/<lib>/` con su `LICENSE`, e impórtalo con ruta relativa:

```js
import SignaturePad from '../vendor/signature_pad/signature_pad.js';   // área 2 (MIT)
import 'https://…'                                                     // NO: nada de CDN
```

- Si la librería solo trae UMD, cárgala con `<script src="{{ epi10.ui }}/vendor/<lib>/<lib>.min.js">` en `{% block head %}` y úsala desde `window`.
- Si trae su CSS, enlázalo en `{% block head %}` y **acótalo** a la isla (`[data-epi10-isla="calendario"] .lib-clase`), o reescribe los estilos con tokens `epi-`.
- PDF.js necesita su *worker*: vendoriza `pdf.mjs` y `pdf.worker.mjs` y fija `GlobalWorkerOptions.workerSrc = window.EPI10.uiBase + '/vendor/pdfjs/pdf.worker.mjs'`. Para el MVP basta un `<iframe class="epi-visor__frame">` con el PDF: el navegador trae visor.
- Usa los componentes `epi-` dentro de la isla (son clases normales). Para iconos en JS: `EPI10.icono('send')`.
- Una isla que haya que montar después de pintar HTML dinámico: `EPI10.montarIslas(contenedor)`.
- Ejemplo completo y funcionando: `public/ui/islas/ejemplo-pasos.mjs` (asistente con pasos y progreso).

## 8. Idioma (nunca en inglés)

- **Textos propios**: en español, directamente en la plantilla o en la isla. No hace falta `xlt` para textos que solo existen en español.
- **Textos del núcleo** (los que pasan por `xl`/`xlt`/`xla`): añade la línea a `oe-module-epi10-ui/i18n/openemr_es.tsv` (`constante<TAB>traducción`) y ejecuta `scripts/i18n-a-sql.sh --table`, que regenera `table.sql`. `instalar-ui.sh` las aplica al instalar, y el module manager también al pulsar «Instalar». Se escriben en `lang_definitions` y en `lang_custom`, así que sobreviven a la sincronización de idiomas.
  - Las constantes son **globales**: «Close» cambia en todo OpenEMR, portal y back office. Traduce solo las que faltan o están mal, con un texto que valga en cualquier pantalla. Si una pantalla necesita un texto distinto, cámbialo en su plantilla sobrescrita, no en la constante.
- **Textos dentro del JS del núcleo** (p. ej. «Yes/No» del motor de cuestionarios): no pasan por `xl`. Se arreglan en la vista que los pinta (sobrescritura o isla).

### Textos en inglés detectados (pendientes, por área)

| Área | Vista | Textos |
|---|---|---|
| 2 | Documentos, consentimiento, cuestionario | «Editing», «New Version», «Dated», «Status: In Review», «Yes» / «No» del cuestionario (JS del motor), instrucciones de la plantilla «Help» |
| 3 | Mensajes (portal y back office) | «Sent», «All», «Compose New Message», «To», «1–0 of 0»; back office: «My Messages», «Recalls», «Add New», «Delete» |
| 4 | Mi informe | «Download Documents From Medical Record», «Medical Record/», «Onsite Portal/Reviewed/», «Your files will download as a zip file» |
| 5 | Citas | «Future Appointments», «Past Appointments», «No Past Appointments», «Schedule A New Appointment», «Request New Appointment», «See Availability», «Cancel», AM/PM; back office: «Your Clinic Name Here», «Facultativos» → «Equipo» |
| 7 | Back office | «Search by any demographic», «Medical Record Dashboard», «Care Team», «Treatment Intervention Preferences», «Care Experience Preferences», «Finder», «Flow Board», pestañas «Unknown» |
| 1 | Acceso e inicio | Ya traducidos por el área 0: avisos de sesión cerrada, enlace caducado o no válido, «Log In», «Username» |

Detector: `scripts/detectar-ingles.mjs [portal|backoffice|todo]` recorre las vistas con sesión y lista los textos visibles en inglés. Resultado del 11 oct (evidencia: `capturas/renove/00-base/detector_ingles_2026-10-11.md`): acceso, inicio, ajustes, mi informe y documentos del portal, limpios; quedan los de mensajes (área 3), citas (área 5) y el back office (área 7). El área 0 lo repite antes de cada integración.

## 9. Probar en hermes-node

Instancia: OpenEMR 8.4.1, `http://localhost:4896` (túnel `hn open 4896`). Secretos en `~/Projects/epi10-openemr-prueba/.env` del HP: `OE_PASS` (admin), `PORTAL_PASS` (Lucía, usuario `lucia`), `OPS_PASS` (`operaciones.prueba`). **El login del portal pide también el correo de Lucía** (`enforce_signin_email` activo); está en su ficha (`patient_data.email`, pid 1).

```bash
# 1. Lleva tu rama al HP (una carpeta por área, para no pisar a nadie)
hn push . epi10-oe-module-<area>
# 2. Instala sin reiniciar OpenEMR (la primera vez con --registrar)
hn sh 'cd ~/Projects/epi10-oe-module-<area> && scripts/instalar-ui.sh epi10-openemr-prueba-openemr-1 epi10-openemr-prueba-mysql-1'
# 3. Capturas antes/después (escritorio 1366 px y móvil 390 px)
cd <carpeta con node_modules/playwright>   # p. ej. EPI-10/04_outputs/modulos/crisis-healthie/openemr-pruebas/scripts
OE_BASE=http://localhost:4896 PORTAL_USER=lucia PORTAL_PASS=… PORTAL_EMAIL=… OE_PASS=… \
  node <repo>/scripts/capturas-renove.mjs <EPI-10>/…/capturas/renove/<NN-area>/ despues
```

- **Instalaciones centralizadas en el área 0** (acordado con el orquestador): `instalar-ui.sh` copia la carpeta entera, así que **solo el área 0 lo ejecuta** en la instancia compartida. Cada área desarrolla en `renove-area-<n>` (desde `renove-area-0`), prueba en su laboratorio, hace push y escribe a la sesión «EPI-10 renove área 0» con la rama y el commit. El área 0 lo fusiona en **`renove-integracion`** (lo que está instalado), repite el detector, instala y confirma. Los pasos 1 y 2 de arriba quedan para el área 0.
- **Caché**: OpenEMR añade `?v=<versión de assets del sitio>` a los CSS y JS inyectados, que no cambia al desplegar. En Playwright cada contexto es nuevo; en el navegador, recarga forzada. Las páginas propias usan `?v=<version.php>`: sube el *patch* al publicar para la demo.
- **APCu y clases nuevas**: el autoloader de Composer de OpenEMR guarda en APCu también las clases que **no** encontró. Si una vista pregunta por una clase de otra área (`class_exists`) antes de que esté instalada, seguirá «sin existir» hasta vaciar APCu, y la página dará 500 con «Class … not found». `instalar-ui.sh` vacía APCu al terminar (PR #8). Si lo ves fuera del instalador, la CLI encuentra la clase y la web no.
- No reinicies OpenEMR ni toques la pila `epi10-demo`.

## 10. Convenciones `data-epi10-*` (para Playwright)

| Atributo | Dónde | Ejemplo |
|---|---|---|
| `data-epi10-vista` | `<body>` de cada vista | `mis-documentos`, `login-portal`, `login-backoffice`, `kit` |
| `data-epi10-shell` | piezas del shell | `cabecera`, `menu-usuario` |
| `data-epi10-region` | zonas grandes | `contenido`, `pie`, `login`, `cabecera-inicio` |
| `data-epi10-accion` | todo lo que se pulsa | `volver`, `inicio`, `abrir-menu-usuario`, `ajustes`, `ayuda`, `salir`, `entrar`, `firmar-enviar`, `enviar` |
| `data-epi10-estado` | elemento con estado | `nuevo`, `visto`, `pendiente`, `hecho`, `error`, `actual` |
| `data-epi10-item` / `data-epi10-lista` | listas | `data-epi10-lista="tareas"` > `data-epi10-item="consentimiento"` |
| `data-epi10-tarjeta` | tarjetas del inicio | igual que el id del núcleo: `documents-go` |
| `data-epi10-campo` / `data-epi10-form` | formularios | `usuario`, `contrasena`; `login-portal` |
| `data-epi10-isla` | punto de montaje | `chat`, `firma`, `calendario`, `visor-pdf` |
| `data-epi10-estado="arrastrando"` | `.epi-dropzone` con ficheros encima (lo pone `epi10-ui.js`, v1.2) | también `pendiente`/`hecho`/`error` en `.epi-archivo` y `hecho`/`error` en un botón tras `EPI10.conFeedback` |
| `data-epi10-dropzone` | zona de arrastre que se quiere localizar en pruebas (v1.2) | `<label class="epi-dropzone" data-epi10-dropzone="adjuntos-chat">` |
| `data-epi10-texto-arrastrando` | `__titulo` de la zona: texto mientras se arrastra (v1.2) | `Suelta para adjuntar` |
| `data-epi10-segmentado` | grupo del control segmentado; su valor es el nombre que viaja en `epi10:segmentado` (v1.2) | `filtro-conversaciones` |
| `data-epi10-valor` | botón del segmentado sin `value` (opcional, v1.2) | `sin-responder` |
| `data-epi10-tipo` | elemento de la línea de actividad (v1.2) | `clienta`, `hito`, `sistema` |
| `data-epi10-actividad` / `data-epi10-actividad-item` | `ol.epi-actividad` y cada elemento con `clave` (v1.2) | `data-epi10-actividad-item="consentimiento-firmado"` |
| `data-epi10-esqueleto` | bloque de carga de `ui.esqueleto`/`EPI10.esqueleto` (v1.2) | `lista`, `tarjeta`, `tabla` |
| `data-epi10-adjunto` | chip de `ui.adjunto`, con el nombre del fichero (v1.2) | `Informe_EPI10_Lucia.pdf` |
| `data-epi10-ocupado-al-enviar` / `data-epi10-enviando` | `<form>` con botón con estado; el segundo lo pone el JS mientras envía (v1.2) | El botón **no** se desactiva: su `name`/`value` viaja en el POST |
| `data-epi10-ind` | `.epi-tabs` que ya tiene su indicador `.epi-tabs__ind` (v1.2) | lo pone `epi10-ui.js` |

Eventos (v1.2, burbujean desde la pieza): `epi10:archivos` `{archivos, origen: 'soltar'|'elegir'}` en `.epi-dropzone`; `epi10:segmentado` `{nombre, valor, boton}` en `[data-epi10-segmentado]`.

Selectores en las pruebas: `page.locator('[data-epi10-accion="salir"]')`, nunca por clase `epi-` ni por texto (los textos cambiarán).

## 11. Desplegar al módulo y entregar

1. Rama `renove-area-<n>` desde `renove-area-0` (hasta que se fusione en `main`). Para verla en la instancia, pide la integración al área 0 (§9).
2. Commits con `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`. No hay CI: pega en el PR la salida de lo que ejecutes (capturas, detector, pruebas del contrato si tocas `oe-module-epi10`).
3. PR contra `main` en `Skilland-ai/epi10-oe-module`, sin fusionar, con capturas antes/después en `crisis-healthie/openemr-pruebas/evidencia/capturas/renove/<NN-area>/`.
4. En producción, `oe-module-epi10-ui` va en la misma imagen derivada que `oe-module-epi10` (`COPY` de las dos carpetas) y se activa en el module manager.

## 12. Qué deja hecho el área 0 y qué no

- **Hecho**: base, shell (cabecera, volver, menú de usuario), componentes, página de muestra, logins del portal y del back office, cabecera y tarjetas del inicio del portal, mecanismo de idioma, capturas y esta guía.
- **No hecho, a propósito**: el contenido del inicio (fase del caso y siguiente paso, área 1), el selector del back office (áreas 1 y 7), menús y ACL (área 7), y las vistas interiores (áreas 2–5).
- **Unknown**: correo de soporte para «¿Problemas para entrar?» (hoy apunta a la web de EPI10); familia tipográfica definitiva del canon (se usa Manrope, la del prototipo).
