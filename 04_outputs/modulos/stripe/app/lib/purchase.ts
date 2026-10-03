import Stripe from 'stripe';
import type { Order } from './order';

export const DEMO_PRICE = 'price_1UG00zRrJS0VSqzs4Uhv6g9Q';
export const DEMO_ACCOUNT = 'acct_1UFzBqRrJS0VSqzs';
const APP_URL = 'https://epi10-nutriwell-demo.vercel.app';
export type PurchaseState = 'pending' | 'expired' | 'processing' | 'paid' | 'refunded';
export function firstAttemptExpired(order: Order, now = Date.now()) {
  return now - order.started > 23 * 3600000;
}
let stripeClient: Stripe | undefined;
export function stripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || !/^(sk|rk)_test_/.test(key)) throw new Error('Sandbox application key required');
  return stripeClient ??= new Stripe(key, { maxNetworkRetries: 2, timeout: 15000 });
}

// Validate the actual Stripe objects; neither a redirect nor query parameters are proof of payment.
export function purchaseState(session: Stripe.Checkout.Session, order: Order): PurchaseState {
  const lines = session.line_items?.data;
  if (session.livemode || session.mode !== 'payment' || session.client_reference_id !== order.id ||
      session.metadata?.demo !== 'nutriwell-v1' || session.metadata?.account !== DEMO_ACCOUNT ||
      session.metadata?.attempt !== String(order.attempt) ||
      session.amount_total !== 10000 || session.currency !== 'eur' ||
      lines?.length !== 1 || lines[0].quantity !== 1 || lines[0].price?.id !== DEMO_PRICE) {
    throw new Error('Purchase does not match the demo');
  }
  if (session.payment_status === 'paid') {
    const intent = session.payment_intent;
    if (!intent || typeof intent === 'string' || intent.livemode || intent.status !== 'succeeded' ||
        intent.amount_received !== 10000 || intent.currency !== 'eur' || intent.metadata.order_id !== order.id) {
      throw new Error('Payment verification incomplete');
    }
    const charge = intent.latest_charge;
    if (!charge || typeof charge === 'string' || !charge.paid || charge.livemode || charge.amount !== 10000 || charge.currency !== 'eur') {
      throw new Error('Charge verification incomplete');
    }
    if (charge.refunded && charge.amount_refunded === 10000) return 'refunded';
    if (charge.amount_refunded !== 0) throw new Error('Partial refund requires review');
    return 'paid';
  }
  if (session.status === 'expired' && session.payment_status === 'unpaid') return 'expired';
  if (session.status === 'open' && session.payment_status === 'unpaid') return 'pending';
  return 'processing';
}

export async function readPurchase(order: Order, client = stripe()) {
  // Stripe is the durable record for this small sandbox. Recover even if the creation
  // response/cookie was lost. A production order index belongs with the webhook store.
  let scanned = 0;
  const matches: Stripe.Checkout.Session[] = [];
  for await (const item of client.checkout.sessions.list({ created: { gte: Math.floor(order.started / 1000) - 1 }, limit: 100 })) {
    if (++scanned > 1000) throw new Error('Order lookup requires review');
    if (item.client_reference_id === order.id) matches.push(item);
  }
  if (!matches.length) {
    if (order.session) throw new Error('Known purchase missing');
    return;
  }
  const verified = await Promise.all(matches.map(async item => {
    const attempt = Number(item.metadata?.attempt);
    if (!Number.isSafeInteger(attempt) || attempt < 0) throw new Error('Invalid attempt');
    const recovered = { ...order, attempt, session: item.id };
    const session = await client.checkout.sessions.retrieve(item.id, { expand: ['line_items', 'payment_intent.latest_charge'] });
    return { order: recovered, session, state: purchaseState(session, recovered) };
  }));
  const completed = verified.filter(item => ['paid', 'refunded', 'processing'].includes(item.state));
  if (completed.length > 1) throw new Error('Multiple payments require review');
  if (completed.length) return completed[0];
  const open = verified.filter(item => item.state === 'pending');
  if (open.length > 1) throw new Error('Multiple open attempts require review');
  return open[0] ?? verified.sort((a, b) => b.order.attempt - a.order.attempt)[0];
}

export function sessionParameters(order: Order): Stripe.Checkout.SessionCreateParams {
  return {
    mode: 'payment', locale: 'es', payment_method_types: ['card'],
    line_items: [{ price: DEMO_PRICE, quantity: 1 }],
    client_reference_id: order.id,
    metadata: { demo: 'nutriwell-v1', account: DEMO_ACCOUNT, order_id: order.id, attempt: String(order.attempt) },
    payment_intent_data: { metadata: { demo: 'nutriwell-v1', order_id: order.id, attempt: String(order.attempt) } },
    automatic_tax: { enabled: false }, invoice_creation: { enabled: false },
    allow_promotion_codes: false, phone_number_collection: { enabled: false },
    success_url: `${APP_URL}/compra`, cancel_url: `${APP_URL}/compra`,
    branding_settings: {
      display_name: 'EPI10 Salud · DEMO', background_color: '#F8F5EF', button_color: '#044799',
      logo: { type: 'file', file: 'file_1UG02ERrJS0VSqzs5X1MupI8' },
    },
    custom_text: { submit: { message: 'Demostración de EPI10 Salud. Usa únicamente datos de prueba. No se realiza ningún cobro real ni se contrata el servicio.' } },
  };
}

export async function checkoutForOrder(order: Order, client = stripe()): Promise<{ order: Order; url: string }> {
  const previous = await readPurchase(order, client);
  if (previous && previous.state !== 'pending' && previous.state !== 'expired') {
    return { order: previous.order, url: '/compra' };
  }
  if (previous?.state === 'pending') {
    if (!previous.session.url) throw new Error('Checkout unavailable');
    return { order: previous.order, url: previous.session.url };
  }
  const next = previous?.state === 'expired'
    ? { id: order.id, attempt: previous.order.attempt + 1, started: order.started }
    : order;
  // Stripe retains idempotency keys for at least 24h. Never replay a creation beyond that window.
  if (!previous && firstAttemptExpired(next)) throw new Error('Creation window expired');
  const session = await client.checkout.sessions.create(sessionParameters(next), {
    idempotencyKey: `nutriwell-v1:${next.id}:${next.attempt}`,
  });
  if (session.livemode || !session.id.startsWith('cs_test_')) throw new Error('Unexpected checkout mode');
  const saved = { ...next, session: session.id };
  // An idempotent replay can return an already completed session; read it again before redirecting.
  const current = await readPurchase(saved, client);
  return { order: current?.order ?? saved, url: current?.state === 'pending' && current.session.url ? current.session.url : '/compra' };
}
