SKI2-268 · Tramo 3 del journey (espera del kit y test): lo que pasa **después** de recibir el kit.

## Qué trae

**1. Guía del kit con la marca EPI10** · `public/portal/guia-kit.php` + `paginas/guia-kit.html.twig` + `epi10-guia-kit.css`
- Cinco pasos con ilustraciones SVG propias (`componentes/ilustraciones_kit.html.twig`): abrir el kit, hisopo por la lengua, cerrar el tubo, apuntar el código de barras, enviárnoslo. Paleta EPI10 por clases `epi-ilu-*`; sin fotos de terceros.
- Versión imprimible (`@media print`, A4): cabecera con logo, los cinco pasos en 3 columnas y una línea de cómo enviar el código; oculta cabecera, miga, pie y formulario. Botón «Imprimir la guía».
- Enlaces: tarea «Enviar el código de tu kit» en **Tus documentos** y enlace «Cómo hacer el test: guía del kit» en la tarjeta de fase del **inicio** (fase 3, salvo «Cita agendada»).

**2. Envío del código de barras** (en la guía, `#enviar-codigo`)
- Formulario sin JS obligatorio (POST multipart + 303): código (normalizado: sin espacios, mayúsculas; letras, cifras y guiones, 5–40) y foto opcional.
- Foto: mismas reglas que los adjuntos del chat pero solo imagen (JPG/PNG/WebP por `finfo`, ≤ 10 MiB, 5 al día). Se guarda en los documentos del paciente, categoría propia **«Kit EPI10»**: el equipo la ve en **Documentos del núcleo de OpenEMR** (no en la ficha EPI10), el portal nunca (R4 intacta: solo lo publicado por `publicar_informe`; `adjunto.php` solo sirve la categoría del chat).
- Tabla propia `epi10_kit` (pid, codigo, documento_id, enviado_en) en `oe-module-epi10` (`table.sql` + `Esquema`). No se parsea el chat.
- El POST solo se acepta con el test en casa en espera (`test_pedido`, `test_recibido`, `test_realizado`: las etapas en que el monolito lo lee) y nunca con modalidad sede; fuera de ahí, 409 y la página enseña un aviso en lugar del formulario. Dentro, la clienta puede corregirlo (manda el último); después, por el chat.
- La categoría «Kit EPI10» se comprueba y crea dentro de la transacción, con la raíz de `categories` bloqueada (`FOR UPDATE`).
- «Tus documentos»: la tarea sale de `config_tareas.php › kit` + `Tareas::tareaKit()` (sin tocar `tareas.mjs`); `tarea.php?f=kit` redirige a la guía. Visible en `test_pedido`, `test_recibido`, `test_realizado` (`Kit\FaseKit`) o, si ya lo envió, como completada.

**3. Contrato 1.1.0** · `estado_formularios` añade `kit: {codigo, enviado_en, foto}` (compatible con 1.0). CONTRATO.md, `tests/contrato/contrato_v1.py` y PHPUnit al día.

EPI10 UI **0.1.18**; `oe-module-epi10` 1.0.1. En `epi10-ui.css` solo un bloque nuevo al final (`/* v1.3 · SKI2-268 */`); no toco layouts, `tareas.mjs`, `epi10-tareas.css` ni `chat.mjs`. Ids del núcleo y `data-epi10-*` intactos (nuevos: `data-epi10-vista="guia-kit"`, `data-epi10-form="codigo-kit"`, `data-epi10-accion="enviar-codigo-kit|imprimir-guia|guia-kit"`).

## Capturas (maqueta con la plantilla Twig real y el CSS real, Chromium)

| | 1366 | 390 |
|---|---|---|
| Guía, sin código | ![](https://github.com/Skilland-ai/EPI-10/blob/9f02c8e/04_outputs/modulos/crisis-healthie/renove/batida/capturas/v13/kit/guia-kit_vacio_1366.png?raw=true) | ![](https://github.com/Skilland-ai/EPI-10/blob/9f02c8e/04_outputs/modulos/crisis-healthie/renove/batida/capturas/v13/kit/guia-kit_vacio_390.png?raw=true) |
| Guía, código enviado | ![](https://github.com/Skilland-ai/EPI-10/blob/9f02c8e/04_outputs/modulos/crisis-healthie/renove/batida/capturas/v13/kit/guia-kit_enviado_1366.png?raw=true) | ![](https://github.com/Skilland-ai/EPI-10/blob/9f02c8e/04_outputs/modulos/crisis-healthie/renove/batida/capturas/v13/kit/guia-kit_enviado_390.png?raw=true) |
| Formulario | ![](https://github.com/Skilland-ai/EPI-10/blob/9f02c8e/04_outputs/modulos/crisis-healthie/renove/batida/capturas/v13/kit/formulario-kit_enviado_1366.png?raw=true) | ![](https://github.com/Skilland-ai/EPI-10/blob/9f02c8e/04_outputs/modulos/crisis-healthie/renove/batida/capturas/v13/kit/formulario-kit_error_390.png?raw=true) |

Versión impresa: [PNG](https://github.com/Skilland-ai/EPI-10/blob/9f02c8e/04_outputs/modulos/crisis-healthie/renove/batida/capturas/v13/kit/guia-kit_impresa.png) · [PDF A4](https://github.com/Skilland-ai/EPI-10/blob/9f02c8e/04_outputs/modulos/crisis-healthie/renove/batida/capturas/v13/kit/guia-kit_impresa.pdf). Los iconos del sprite no salen en la maqueta (file://); en la instancia sí.

## Evidencia

- `php -l` (PHP 8.5 del contenedor) de todos los PHP tocados: sin errores.
- PHPUnit en hermes-node (`composer:2`): **OK (52 tests, 193 assertions)**, incluida `KitTest` (11). [salida](https://github.com/Skilland-ai/EPI-10/blob/9f02c8e/04_outputs/modulos/crisis-healthie/renove/batida/capturas/v13/kit/evidencia_phpunit.txt)
- Instancia real: pendiente de ventana con el orquestador (instalar, `contrato_v1.py`, E2E del formulario con Lucía en `fases_muestra` = `test_recibido`).

## Pendiente / a revisar
- Rebasada sobre main dec0a25 (onboarding, SKI2-267): un solo contrato 1.1.0 con `test` y `kit`; FaseKit lee `test.modalidad`. PHPUnit tras el rebase: **OK (74 tests, 245 assertions)**.
- Textos de los pasos y «Antes de empezar» (30 min sin comer/beber): **provisionales** hasta validarlos con las instrucciones del proveedor.
- Modalidad: `FaseKit` acepta `modalidad` (sede → sin tarea, sin guía en el inicio, sin envío). Al rebasar sobre el onboarding se lee `test.modalidad` y solo si es null se deduce de la etapa (con «Cita agendada», o un `test_realizado` deducido de una cita pasada, es la sede).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
