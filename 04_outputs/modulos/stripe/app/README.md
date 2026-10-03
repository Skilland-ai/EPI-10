# NutriWell — pantalla de entrada al mockup Stripe

Vista de demostración de EPI10 preparada por Skilland para presentar la pasarela.
La web comercial definitiva corresponde al otro proveedor.

## Ejecutar

```sh
npm install
npm run dev
npm run build
npm run dev:vercel
npm run build:vercel
npx tsc --noEmit
```

App Router con Next.js para Vercel; ruta anterior Vinext/Sites conservada como
histórico. `vercel.json` selecciona `npm run build:vercel`.
Los botones invocan una acción de servidor que crea o recupera una Checkout
Session del sandbox por 100 EUR ficticios. `/compra` consulta el estado en Stripe.
El Payment Link anterior queda como referencia de catálogo, fuera de este flujo.

Configurar `STRIPE_SECRET_KEY` de pruebas y `DEMO_COOKIE_SECRET` (32 caracteres
como mínimo) en `.env.local` y como variables sensibles de servidor en Vercel.
Nunca usar prefijo `NEXT_PUBLIC_` para estas variables. `.env.local` está
excluido de Git y del despliegue; las credenciales se cargan desde Vercel.

Pruebas de estados, firma de cookie, recuperación e idempotencia:

```sh
node --experimental-strip-types --test tests/purchase.test.mjs
```

La cookie firmada asocia esta demostración al navegador durante 30 días.
Stripe conserva la compra y permite recuperarla si se pierde la respuesta de
creación. Las consultas paginadas se limitan a 1000 sesiones: suficiente para
este sandbox; sustituir por índice de compras al preparar la integración final.
El receptor `/api/webhooks/stripe` verifica la firma original y registra eventos,
compras, pagos y una actuación simulada por compra en Upstash Redis. La escritura
atómica evita duplicados; no crea clientes ni casos en sistemas externos.

Variables adicionales de servidor: `STRIPE_WEBHOOK_SECRET`, `KV_REST_API_URL`
y `KV_REST_API_TOKEN`. El registro no tiene una ruta pública de lectura.

```sh
node --env-file=.env.local --experimental-strip-types --test tests/*.test.mjs
node --env-file=.env.local --experimental-strip-types scripts/read-stripe-ledger.mjs
```

Las pruebas de Redis usan claves aisladas y limpian únicamente esas claves de QA.
`scripts/configure-webhook.mjs` comprueba el endpoint; `--create` permite crearlo
si falta. `scripts/verify-webhook.mjs <evt_id>` prueba firmas y repetición de un
evento de pruebas ya recibido, sin generar otro pago. Procedimiento completo
en `../docs/webhook_stripe.md`.

## Diseño y contenido

- DM Sans + Instrument Serif, marfil #F8F5EF, azul EPI10 #044799 y azul acuático.
- Logos actualizados originales del cliente en `public/images/`.
- Fotografía de la portada del folleto NutriWell, encuadrada con CSS.
- Cinco inclusiones de la ficha de demo, experiencia en tres pasos, zona de compra.
- Navegación por anclas, enlaces y desplegables HTML; foco visible y movimiento reducido.
- Texto principal de 18 px, secundario de 16 px y etiquetas de al menos 14 px,
  definidos en rem para respetar el tamaño base del lector.
- Compra inferior con precio separado, condiciones legibles y botón centrado
  de 64 px de alto. Diseño comprobado por DOM y geometría en anchos de
  320, 390, 768, 1024 y 1440 px, sin desbordamientos.
- Capturas de navegador no disponibles; revisión visual por imagen pendiente.
- Tarjeta social derivada con IA del folleto, generada específicamente para esta vista.

## Publicación

Origen de presentación: https://epi10-nutriwell-demo.vercel.app

Publicar desde este directorio con `vercel --prod --scope raul-1873s-projects`.
La vinculación local vive en `.vercel/project.json`, excluida del repositorio.
La cuenta del CLI ya está autorizada; no copiar tokens al código ni a la guía.

Publicación anterior de Sites: https://epi10-nutriwell-demo.raulreboot.chatgpt.site

Acceso público solicitado por Raúl para compartir con Carmen. Sites conserva su
configuración en `.openai/hosting.json`; no se vuelve a publicar allí durante
esta migración solicitada a Vercel. El proveedor recibe
como referencia el contenido y el botón de entrada a la pasarela; esta vista no
sustituye su web. Estado de publicación y evidencia se mantienen fuera del
checkout en `../docs/pantalla_demo.md`.
