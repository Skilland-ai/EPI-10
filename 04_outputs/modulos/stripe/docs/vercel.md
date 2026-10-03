# NutriWell en Vercel

**URL pública:** [epi10-nutriwell-demo.vercel.app](https://epi10-nutriwell-demo.vercel.app).
Publicación de producción `READY`, verificada el 15 de septiembre de 2026.

## Alcance

Pantalla de producto con tipografía ampliada y CTA inferior corregido; ahora
con confirmación propia y recuperación de compra. Marca y recursos conservados.
El precio es ficticio; los botones abren el entorno de pruebas de Stripe.
La web definitiva sigue a cargo del otro proveedor.

## Implementación y publicación

Desde `04_outputs/modulos/stripe/app/`:

```sh
npm run build:vercel
vercel deploy --prod --yes --scope raul-1873s-projects
vercel inspect epi10-nutriwell-demo.vercel.app --scope raul-1873s-projects
```

El proyecto ya está vinculado en `.vercel/project.json`, ignorado por Git.
Se reutilizó la cuenta CLI autorizada de Raúl; no se guardaron tokens en el repo.
`vercel.json` selecciona Next.js y `npm run build:vercel`;
`postcss.config.mjs` aplica Tailwind. Los comandos originales Vinext/Sites se
conservan para referencia; esta petición publica exclusivamente en Vercel.

El origen de metadatos en `app/layout.tsx` apunta a Vercel. Las acciones de compra
se procesan en servidor y consultan Stripe; el receptor guarda un registro mínimo
en Upstash Redis. Las claves permanecen en servidor. Los datos de tarjeta se introducen en Stripe. Configuración basada en la
[documentación oficial de Next.js en Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
y de [CSS en Next.js](https://nextjs.org/docs/app/getting-started/css).

## Verificación de la migración inicial E16

- Compilación y TypeScript correctos, localmente y en Vercel.
- HTTP 200 sin cookies ni autorización en la dirección de presentación.
- Imágenes, hoja de estilos y tarjeta social accesibles; metadatos OG/X con Vercel.
- Código visual y recursos idénticos por SHA256 a la versión revisada.
- Navegador: DM Sans, texto principal 18 px y CTA inferior 64 px de alto.
- CTA inferior abre NutriWell · DEMO por 100,00 EUR en el entorno de prueba.
- La consulta de logs de error del despliegue no devolvió entradas.

[Evidencia E16](../evidencias/2026-09-15_vercel_publicacion.json). Detalle en
`05_scratch/stripe-vercel/`. No se ejecutó ningún pago ni se completó una
auditoría de dependencias. Pruebas de pago y eventos siguen en SKI-50/51/52.

## Actualización de compra y resultado — SKI-50

Dos variables sensibles en el entorno de producción de Vercel:
`STRIPE_SECRET_KEY` (sandbox) y `DEMO_COOKIE_SECRET`. No usar prefijo NEXT_PUBLIC.
La publicación sigue siendo una demo de pruebas aunque Vercel denomine
«production» al despliegue público. `.env.local` está excluido de Git y subida.

Pago, rechazo, abandono y recuperación comprobados. Detalles en
[confirmación y recuperación](confirmacion_recuperacion.md) y evidencia E17.

## Notificación persistente — SKI-51

`POST /api/webhooks/stripe` verifica la firma y registra evento, compra y pago en
Upstash Redis, conectado por Vercel Marketplace con plan gratuito. La publicación
no depende del CLI ni de un proceso local. No hay lectura pública del registro.

Variables adicionales de servidor: `STRIPE_WEBHOOK_SECRET`, `KV_REST_API_URL` y
`KV_REST_API_TOKEN`. La integración gestiona las variables de Redis; el secreto
de Stripe se ha añadido como sensible. [Procedimiento](webhook_stripe.md).

Despliegue final `dpl_357Xo8829MwqA4qNyx57XQR1on2u`: build y TypeScript correctos,
URL pública HTTP 200, firma válida HTTP 200 e inválida HTTP 400 sin alterar datos.
[Evidencia E18](../evidencias/2026-09-15_webhook_verificado.json).
