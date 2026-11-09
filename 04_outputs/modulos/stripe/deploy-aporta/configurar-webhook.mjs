// Crea en el sandbox de Stripe el receptor de compra.aporta-epi10.com.
// Se ejecuta dentro de la imagen de la web. Solo escribe en stdout el secreto de firma
// cuando crea el receptor; si ya existe y el secreto está en .env, no escribe nada.
import Stripe from 'stripe';

const URL_RECEPTOR = 'https://compra.aporta-epi10.com/api/webhooks/stripe';
const CUENTA_DEMO = 'acct_1UFzBqRrJS0VSqzs';
const EVENTOS = [
  'checkout.session.completed', 'checkout.session.async_payment_succeeded',
  'checkout.session.async_payment_failed', 'checkout.session.expired', 'charge.refunded',
];

const clave = process.env.STRIPE_SECRET_KEY ?? '';
if (!clave.startsWith('sk_test_')) throw new Error('La clave de Stripe no es de prueba');

const stripe = new Stripe(clave);
const cuenta = await stripe.accounts.retrieve();
if (cuenta.id !== CUENTA_DEMO) throw new Error('La clave no pertenece al sandbox de la demo');

const existentes = (await stripe.webhookEndpoints.list({ limit: 100 })).data.filter(e => e.url === URL_RECEPTOR);
if (existentes.length > 0 && process.env.STRIPE_WEBHOOK_SECRET) {
  if (existentes.length > 1 || existentes[0].livemode || existentes[0].status !== 'enabled') {
    throw new Error('El receptor existente necesita revisión');
  }
  console.error('Receptor de Stripe ya configurado');
  process.exit(0);
}

// Stripe solo entrega el secreto al crear: sin él, el receptor anterior no sirve.
for (const anterior of existentes) await stripe.webhookEndpoints.del(anterior.id);
const receptor = await stripe.webhookEndpoints.create({
  url: URL_RECEPTOR,
  api_version: '2026-08-26.dahlia',
  enabled_events: EVENTOS,
  description: 'NutriWell DEMO — entorno Aporta — sandbox, sin prestación real',
  metadata: { demo: 'nutriwell-v1', module: 'CON-533' },
});
if (receptor.livemode) throw new Error('Receptor en modo real');
console.error(`Receptor de Stripe creado: ${receptor.id}`);
process.stdout.write(receptor.secret);
