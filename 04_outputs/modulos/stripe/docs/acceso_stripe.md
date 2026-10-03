# Acceso de trabajo a Stripe

Verificado el **2026-09-15**. [Módulo](../README.md) · [Plan de Linear](linear_speedrun.md).

## Conexión actual

| Dato | Valor comprobado |
| --- | --- |
| Herramienta | Stripe CLI 1.50.11, ejecutado mediante `npx` |
| Autorización | Flujo de dispositivo en navegador, completado correctamente |
| Dispositivo | EPI10-Codex |
| Contexto activo | Entorno de prueba de EPI10 Salud · sandbox |
| ID de cuenta del sandbox | `acct_1UFzBqRrJS0VSqzs` |
| Catálogo | Sin productos ni precios en el momento de comprobarlo |
| Eventos | Lectura correcta; el evento devuelto tiene `livemode=false` |

El usuario registró la cuenta y autorizó el CLI desde su navegador. No se creó
un entorno anónimo. La autorización permite continuar desde terminal sin que
Raúl tenga que copiar una clave secreta al chat. No hace falta conectar un MCP
adicional para las operaciones que cubran el CLI y la API.

## Comprobación reproducible

```sh
npx --yes @stripe/cli@1.50.11 get /v1/account
npx --yes @stripe/cli@1.50.11 get /v1/products --limit 1
npx --yes @stripe/cli@1.50.11 get /v1/prices --limit 1
npx --yes @stripe/cli@1.50.11 get /v1/events --limit 1
```

Estas cuatro consultas han terminado correctamente. Se filtró la salida antes
de documentarla: solo se guardan identidad técnica, conteos y modo de prueba.
Evidencia: [resumen de acceso](../../../../05_scratch/stripe-remodelacion/stripe_access_verified.json).
La respuesta completa de cuenta no se copia al repositorio.

## Forma de trabajar

- Comprobar el ID del sandbox antes de crear o modificar recursos; usar este
  contexto de pruebas y no añadir `--live`.
- Crear y consultar catálogo, checkout y pagos de prueba mediante CLI/API;
  comprobar el resultado de cada operación antes de darla por terminada.
- Registrar IDs de recursos y evidencias, sin claves ni tokens. Las credenciales
  de aplicación o firma de webhook que hagan falta se configurarán localmente
  fuera del control de versiones.
- Si caduca la sesión, iniciar de nuevo el flujo de autorización en navegador.
  No guardar códigos temporales de emparejamiento en la guía.

La primera prueba acreditó autenticación y lectura. Después se verificó también
la escritura de producto, precio e imagen; véase [catálogo](catalogo_stripe.md).
Marca de cuenta y Payment Link también escritos y releídos; [checkout](checkout_stripe.md).
Pago de prueba y recuperación verificados en SKI-50; webhooks verificados en SKI-51. La identidad legal y la
cuenta productiva del cliente siguen pendientes; el nombre visible EPI10 no las
acredita. La validación del mockup con Carmen sigue siendo una tarea humana.

Referencias: [autorización del CLI](https://docs.stripe.com/cli/login) y
[manejo de claves](https://docs.stripe.com/keys-best-practices).

## Acceso de la aplicación — SKI-50

Raúl aporta una clave secreta del sandbox para ejecutar la aplicación en Vercel.
Cuenta y precio comprobados: `acct_1UFzBqRrJS0VSqzs`, 100 EUR y `livemode=false`.
Se guarda en `.env.local` (ignorado por Git, permisos 0600) y como variable
sensible de servidor en Vercel, junto con el secreto de firma de cookie.
Los nombres son `STRIPE_SECRET_KEY` y `DEMO_COOKIE_SECRET`; sus valores no se
documentan ni se envían al navegador. El CLI conserva su autorización propia.

El plugin `tools` 0.9.2 del CLI se instaló y consultó para comprobar si permitía
preparar la clave; no ofrecía esa operación. No se instaló ningún MCP nuevo.

## Receptor y persistencia — SKI-51

El receptor usa `STRIPE_WEBHOOK_SECRET` y el registro persistente usa
`KV_REST_API_URL` / `KV_REST_API_TOKEN`, solo en servidor. Configurados en el
entorno de producción de Vercel para esta demo y en `.env.local` ignorado, con
permisos 0600. La integración de Upstash gestiona sus variables de Vercel.
El archivo auxiliar `.env.integration.local` también está ignorado y tiene
permisos 0600. No copiar valores a documentación ni al frontend.

[Configuración, comprobación y reproducción](webhook_stripe.md).
