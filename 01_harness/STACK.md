# STACK

Base actual: workspace documental y sandbox de desarrollo por módulos.

- Planificación: `04_outputs/planificacion/linear/` (snapshot fechado de Linear).
- Módulos: `04_outputs/modulos/<modulo>/`; Stripe es el foco inicial.
- Documentación: Markdown; guías cliente separadas de bitácora y evidencia.
- Catálogo y Payment Link Stripe de pruebas creados por CLI/API; checkout
  alojado en Stripe, comprobado por API y DOM. IDs/configuración en
  `04_outputs/modulos/stripe/config/`; script Python 3 reutilizable en
  `04_outputs/modulos/stripe/scripts/prepare_checkout.py`. Pantalla de entrada al
  mockup en `04_outputs/modulos/stripe/app/`: Next.js/App Router para Vercel, React 19
  y CSS. Ruta anterior Vinext/Sites conservada. Publicación pública en Vercel
  por petición de Raúl. La web definitiva corresponde a otro proveedor.
  Operaciones de catálogo en
  `05_scratch/stripe-catalogo/` (Python 3 y CLI; subida binaria con autorización
  del CLI en memoria mediante el llavero del sistema).
- Stripe CLI `1.50.11` vía `npx`, autorizado por navegador para el sandbox
  «Entorno de prueba de EPI10 Salud». Lecturas API verificadas; detalles en
  `04_outputs/modulos/stripe/docs/acceso_stripe.md`. No se creó un sandbox anónimo.

Actualización SKI-50: los CTA de Vercel usan Checkout Sessions desde acciones de
servidor y `/compra` verifica el estado en Stripe. SDK `stripe@22.6.2`, cookie
firmada y claves de pruebas solo en servidor. Configuración vigente:
`04_outputs/modulos/stripe/config/compra_demo.json`. Payment Link inicial
conservado como referencia. SKI-51 incorpora `POST /api/webhooks/stripe`, firma
verificada y registro persistente en Upstash Redis (`@upstash/redis@1.38.4`),
conectado mediante Vercel Marketplace. Configuración no secreta en
`04_outputs/modulos/stripe/config/webhook_demo.json`.

Comandos desde `04_outputs/modulos/stripe/app/`:
- Desarrollo: `npm run dev`.
- Build: `npm run build`.
- Tipos: `npx tsc --noEmit`.
- Desarrollo Vercel: `npm run dev:vercel`.
- Build Vercel: `npm run build:vercel` (incluye TypeScript).
- Publicación actual: `vercel --prod --scope raul-1873s-projects`, desde app/.
- Configuración: `vercel.json`; vinculación `.vercel/project.json` ignorada.
- Pruebas de compra: `node --experimental-strip-types --test tests/purchase.test.mjs`.
- Suite completa con Redis de QA aislado: `node --env-file=.env.local --experimental-strip-types --test tests/*.test.mjs`.
- Consulta privada del registro: `node --env-file=.env.local --experimental-strip-types scripts/read-stripe-ledger.mjs`.
- Publicación anterior Sites: `.openai/hosting.json`; Git local dentro de app/.
