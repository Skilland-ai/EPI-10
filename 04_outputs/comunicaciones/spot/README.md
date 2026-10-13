# Spot del recorrido EPI10 (SKI2-277)

- `epi10_recorrido.mp4`: el spot. 200 s, H.264 1280×720, AAC, 7,4 MB.
- `guion.md`: escenas, rótulos y locución.
- `escenas.json`: el guion en datos. Indica qué tramo de cada clip va en cada escena y a qué velocidad. Lo leen el montaje y los rótulos.
- `capturas/`: una captura por paso del guion (1280×720).
- `scripts/`: grabación (Playwright), PDF ficticios, rótulos y montaje (ffmpeg + Piper).

## Cómo regenerarlo

Hace falta la pila de demo levantada en hermes-node, con los túneles 4881, 4893, 4895 y 4896 abiertos. Se graba con una clienta ficticia **nueva**: el email no puede estar usado, y cada pago crea una paciente en OpenEMR y una tarea en Odoo.

```bash
W=<carpeta de trabajo fuera del repo>   # clips/, shots/, state/, rotulos/, piezas/, voz/, venv/
mkdir -p $W/fuentes $W/pdf && cp escenas.json $W/ && cp -r scripts $W/
cp <epi10-oe-module>/oe-module-epi10-ui/public/fonts/manrope-latin-{500,700}-normal.woff2 $W/fuentes/
cp ../artefacto_carmen/img/epi10-logo.png $W/fuentes/
export SPOT_OUT=$W MARTA_EMAIL=<email-ficticio-nuevo>@correo-ficticio.test
export OPS_PASS=<operaciones.prueba> ODOO_PASS=<aitor en Odoo>   # nunca en el repo
cd $W
node scripts/c01_web_pago.mjs          # web → Stripe (4242) → confirmación
node scripts/c02_correo.mjs            # Mailpit → enlace mágico (un solo uso: no repetir sin pagar de nuevo)
node scripts/c03_onboarding.mjs        # carril: nacimiento, consentimiento, cuestionario, test en casa
node scripts/c04_portal_docs_mensajes.mjs
# Antes de c05: rellenar pid, caso y odooTarea de la clienta en state/estado.json (tabla cases del core).
node scripts/c05_backoffice.mjs
node scripts/c06_odoo.mjs              # ~7 min: espera 70 s tras cada etapa (ESPERA_MS)
node scripts/c07_portal_hitos.mjs
node scripts/pdfs.mjs && node scripts/c08_informes_subir.mjs && node scripts/c09_informes_publicar.mjs
node scripts/c10_portal_informe.mjs && node scripts/c11_cierre.mjs
# Montaje
python3 -m venv venv && venv/bin/pip install piper-tts   # local; sin él, el montaje sale sin voz
# voz/es_ES-sharvard-medium.onnx(.json) desde huggingface.co/rhasspy/piper-voices (es/es_ES/sharvard/medium)
node scripts/rotulos.mjs && python3 scripts/montar.py
```

- **Playwright:** los scripts usan el de `04_outputs/modulos/crisis-healthie/openemr-pruebas/scripts/node_modules`. Se puede cambiar con `PW_DIR`.
- **Clips:** cada tramo graba su propio clip, así que se puede repetir uno sin rehacer todo. Los tramos que dependen del estado van en orden: el enlace mágico se usa una sola vez, y las etapas de Odoo y la publicación avanzan el caso.
- **Cortes:** si cambian los clips, ajusta los cortes en `escenas.json` con las marcas de `clips/*.marcas.json`, que dan los segundos de cada momento clave.
- **Tamaño:** `CRF=28` por defecto. Si pasa de 12 MB, sube el valor.
