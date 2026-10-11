# Base de interfaz del renove de EPI10 sobre OpenEMR: decisión (v1)

Fecha: 2026-10-11 · Linear: SKI2-209 (área 0, hija de SKI2-230) · Estado: **recomendación lista, pendiente de ratificar por el orquestador o Raúl**
Entrada: [feedback de Raúl](../2026-10-11_feedback_vistas_openemr_v1.md) · [prototipo SKI2-207](../2026-10-07_openemr_headless_v1.md) · canon de marca `02_context/EPI10-branding/` · repo `Skilland-ai/epi10-oe-module`.

## Recomendación

**EPI10 UI: el sistema de diseño de shadcn/ui, tomado de su versión para HTML (Basecoat, MIT), escrito como CSS plano con prefijo `epi-` y sin build, más islas de JavaScript con Preact + htm para los componentes ricos. Vive en un módulo de interfaz hermano, `oe-module-epi10-ui`, en el mismo repo.**

En una frase: la estética y la anatomía de shadcn/ui (tokens, radios, anillos de foco, estados, componentes), con la marca EPI10 encima, servida como un CSS y un JS que conviven con el Bootstrap 4 de OpenEMR en cualquier página, y que cualquier área usa con HTML/Twig sin compilar nada.

## Por qué

1. **Lo que pide Raúl es la pinta de shadcn/ui**: moderna, sobria, de app. Es el estándar de facto (MIT, enorme adopción) y Basecoat lo trae a HTML sin React (MIT, 1.0.2, 41 componentes, jul 2026).
2. **Pero ninguna librería Tailwind se puede cargar tal cual en OpenEMR.** Lo he comprobado con el CSS de Basecoat 1.0.2:
   - todo va dentro de `@layer`; el Bootstrap 4 de OpenEMR no tiene capas, y **lo que no tiene capa gana siempre**, sea cual sea la especificidad;
   - las clases chocan con las de Bootstrap (`.btn`, `.card`, `.badge`, `.table`, `.alert`);
   - trae un reset global (márgenes, bordes y `box-sizing` a cero en todo) que desmonta las pantallas del núcleo que no vamos a rehacer.
   Lo mismo pasa con daisyUI, Flowbite y Preline (Tailwind v4 compila en capas). Se puede forzar con parches de compilación, pero sería frágil y obliga a un build en un HP de 2 hilos.
3. **Con prefijo `epi-` y sin capas no hay conflicto posible**: el kit funciona igual en una página nuestra, en el login del portal (PHP del núcleo) o dentro de un iframe del portal. No toca nada que no lleve `epi-`.
4. **Sin build**: un CSS de tokens y componentes y un JS de comportamiento, editables a mano. Lo que necesite librería (firma, PDF, calendario) se vendoriza ya minificado y se commitea.
5. **Islas, no SPA**: OpenEMR sigue sirviendo páginas PHP/Twig; las áreas 2, 3 y 5 montan un componente rico en un `<div data-epi10-isla="chat">`. Preact + htm pesa unos 5 KB y funciona como módulo ES sin compilar.
6. **Módulo hermano**: el módulo `oe-module-epi10` es el contrato v1 con el monolito (SKI2-210) y lo está reinstalando otro agente. Si la interfaz va en su propio módulo, cada uno despliega lo suyo sin pisarse y el contrato no se toca. El tema heredado del prototipo se va apagando vista a vista (ver «Convivencia»).

Lo que se pierde frente a usar Basecoat tal cual: copiar sus 41 componentes gratis. Para la demo hacen falta unos 12; el resto se porta cuando un área lo necesite, con su HTML y sus valores como referencia.

## Comparativa corta

| Candidato | Licencia | Madurez y peso | Estética | Encaje con OpenEMR (Bootstrap 4, PHP/Twig, sin núcleo) | Veredicto |
|---|---|---|---|---|---|
| **shadcn/ui** | MIT | Muy alta; React + Radix + Tailwind, con build | La de referencia | Solo en islas React; obliga a build y a React en cada vista | **Se toma como sistema de diseño**, no como código |
| **Basecoat** (shadcn sin React) | MIT | 1.0.2, 41 componentes, ~220 KB en CDN con utilidades | shadcn idéntico | Capas, reset global y `.btn`/`.card` chocan con Bootstrap. Solo valdría en páginas sin Bootstrap | **Fuente del port** (anatomía, valores, HTML) |
| Franken UI 2 | MIT | Media; UIkit + web components Lit | Parecida a shadcn | Añade UIkit (otro framework), clases `uk-`, más peso | Descartado |
| daisyUI 5 | MIT | Alta; plugin de Tailwind con prefijo configurable | Más «juguete», temas | Necesita build Tailwind; sigue en capas y pierde contra Bootstrap | Descartado |
| Flowbite | MIT el núcleo; Pro de pago | Alta; Tailwind + JS propio | Genérica | Build Tailwind, capas, JS global con `data-` propios | Descartado |
| Preline | MIT + «Fair Use License» | Alta | Buena | Licencia doble ambigua para derivados; Tailwind en capas | Descartado |
| Web Awesome / Shoelace | MIT (núcleo) | Alta; web components con shadow DOM | Propia, menos shadcn | El shadow DOM sí aísla de Bootstrap; pero su estética y su peso no ayudan al «precioso» | Plan B para islas sueltas |
| Plantillas de portal de pacientes | — | No hay ninguna open source madura: las buenas son de pago (Ember, Clinova, Medjestic) o apps completas (Medplum en React + Mantine, OpenMRS O3 en Carbon) | — | Ninguna se monta sobre OpenEMR | **Solo referencia de patrones** (Healthie, Medplum) |

Librerías de islas para las áreas, todas sin build y con licencia permisiva:

| Necesidad | Librería | Licencia | Área |
|---|---|---|---|
| Motor de islas | Preact + htm (`htm/preact/standalone`) | MIT | todas |
| Firma con el dedo o el ratón | signature_pad 5.1 | MIT | 2 |
| Formularios por pasos con progreso | Propio sobre el kit; SurveyJS Form Library si hace falta lógica condicional | MIT | 2 |
| Visor de PDF | Visor nativo del navegador en `<iframe>` dentro de `epi-visor`; PDF.js 5 si hay que controlar páginas | Apache-2.0 | 4 |
| Calendario | Cally 0.9 (web component, <9 KB) o rejilla propia de huecos | MIT | 5 |
| Chat | Isla propia (burbujas, caja de texto, sondeo periódico) | — | 3 |

## Cómo se integra

### Puntos de inyección en OpenEMR 8.4.1 (comprobados en el código del contenedor)

| Vista | Cómo la pinta el núcleo | Cómo entra la base |
|---|---|---|
| Login del back office (`interface/login/login.php`) | Twig, despachando `TemplatePageEvent` | **Se cambia la plantilla entera** por la nuestra (`@epi10/login/backoffice.html.twig`), conservando los nombres de campo y el JS de envío |
| Login del portal (`portal/index.php`) | PHP con HTML incrustado y `Header::setupHeader` | CSS por `StyleFilterEvent` y JS por `ScriptFilterEvent`: el JS envuelve el formulario existente en el shell; no se cambian ids ni nombres |
| Inicio del portal (`home.php` → `portal/home.html.twig`) | Twig 3 | Parciales sobrescritos (`portal/header.html.twig`) y CSS |
| Vistas nuevas (kit, chat, biblioteca, calendario…) | — | Páginas PHP del módulo que comprueban la sesión (`portal/verify_session.php` o `interface/globals.php`) y pintan Twig con el layout común |
| Interiores del núcleo que se queden (Phreeze, iframes) | PHP, Bootstrap | Tokens + componentes `epi-` + CSS de ajuste por vista |

### Carpetas del módulo

```text
oe-module-epi10-ui/
  openemr.bootstrap.php      entrada: registra eventos con prioridad baja (corre después de oe-module-epi10)
  config.php                 vistas renovadas, enlaces del menú de usuario, textos de marca
  src/Bootstrap.php          estilos, scripts, Twig (@epi10 y sobrescrituras), login del back office
  src/Vista.php              ayuda para páginas propias: sesión, layout y Twig
  templates/epi10/           namespace @epi10: layouts/, componentes/ (macros), login/, paginas/
  templates/sobrescritas/    rutas del núcleo que se sustituyen (portal/header.html.twig…)
  public/ui/epi10-ui.css     tokens + shell + componentes (sin capas, prefijo epi-)
  public/ui/epi10-ui.js      menú de usuario, modal, toast, cargador de islas
  public/ui/vendor/          librerías ya minificadas (preact-htm, signature_pad…)
  public/ui/islas/           una isla por archivo .mjs
  public/portal/*.php        páginas del portal (kit.php…)
  public/backoffice/*.php    páginas del equipo
  public/fonts/, public/img/ Manrope autoalojada y logos EPI10
  i18n/openemr_es.tsv        traducciones de constantes de OpenEMR (constante → texto)
scripts/                     instalar-ui.sh, capturas y detector de inglés (Playwright)
```

### Pipeline de assets

Ninguno. Se edita el CSS o el JS y se despliega con `scripts/instalar-ui.sh` (copia al contenedor sin reiniciar OpenEMR y aplica las traducciones). Las librerías de terceros se vendorizan minificadas con su licencia al lado. El navegador recibe un CSS de unos 30 KB y un JS de unos 5 KB, más la isla de cada vista.

### Cómo crea una vista nueva otra área

1. Crea `public/portal/<vista>.php`: `require` de la sesión del portal y `Vista::portal('@epi10/paginas/<vista>.html.twig', [...])`.
2. Crea la plantilla extendiendo `@epi10/layouts/portal.html.twig` (cabecera, «volver», menú de usuario incluidos) y usando las macros de `@epi10/componentes/`.
3. Si necesita algo rico, añade `public/ui/islas/<isla>.mjs` y un `<div data-epi10-isla="<isla>" data-props='{…}'>`.
4. Marca los elementos con `data-epi10-*` para Playwright (ver la guía).
5. Añade la ruta a `config.php › vistas_renovadas` para que se apague el tema heredado en ella.

La guía completa para las áreas 1–7 estará en `renove/00_base_interfaz.md`.

### Convivencia con el tema heredado

El tema del prototipo (`oe-module-epi10/public/css/epi10-portal.css`) sigue cargándose en las vistas que aún no se han renovado, para no empeorar la demo. En las vistas declaradas como renovadas, el módulo de interfaz lo quita de la lista de estilos y pone el suyo. Cuando todas estén renovadas, el tema heredado se borra de `oe-module-epi10` en un PR coordinado con SKI2-210.

### i18n

- **Constantes de OpenEMR** (lo que pasa por `xl`/`xlt`): `i18n/openemr_es.tsv`, que el instalador vuelca en `lang_definitions` y `lang_custom` para «Spanish (Spain)» (sobrevive a la sincronización de idiomas).
- **Textos propios del módulo**: se escriben en español directamente en las plantillas; el producto solo tiene un idioma.
- **Detector**: un script Playwright recorre las vistas y lista los textos visibles en inglés. La lista inicial va en la guía para las demás áreas.

## Riesgos y Unknown

| Riesgo | Mitigación |
|---|---|
| Una actualización de OpenEMR cambia el login del back office o el `header.html.twig` del portal | Las sobrescrituras son pocas y están listadas; las capturas automáticas lo detectan |
| El JS que envuelve el login del portal depende de ids del núcleo (`#login_form`…) | Si no los encuentra, no hace nada: el login sigue funcionando con el CSS |
| Que Raúl quiera Basecoat literal en vez de un port | Las páginas propias sin Bootstrap podrían usar Basecoat tal cual; se mezclarían dos sistemas. No lo recomiendo |
| **Unknown**: orden de carga entre módulos en el module manager | Se resuelve con prioridad de eventos, no con el orden de registro |
