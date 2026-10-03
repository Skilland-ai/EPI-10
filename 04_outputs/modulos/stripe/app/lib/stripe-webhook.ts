import Stripe from 'stripe';
import { DEMO_ACCOUNT, purchaseState, stripe } from './purchase.ts';
import { recordObservation, type Observation, type LedgerResult } from './stripe-ledger.ts';

export const WEBHOOK_EVENTS = [
  'checkout.session.completed', 'checkout.session.async_payment_succeeded',
  'checkout.session.async_payment_failed', 'checkout.session.expired', 'charge.refunded',
] as const;

type Dependencies = {
  secret: string;
  retrieveSession: (id: string) => Promise<Stripe.Checkout.Session>;
  sessionForPayment: (id: string) => Promise<string | undefined>;
  record: (observation: Observation) => Promise<LedgerResult>;
};
export function webhookDependencies(): Dependencies {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error('Webhook signing unavailable');
  return {
    secret,
    retrieveSession: id => stripe().checkout.sessions.retrieve(id, { expand: ['line_items', 'payment_intent.latest_charge'] }),
    sessionForPayment: async id => {
      const result = await stripe().checkout.sessions.list({ payment_intent: id, limit: 2 });
      if (result.data.length > 1) throw new Error('Ambiguous payment');
      return result.data[0]?.id;
    },
    record: observation => recordObservation(observation),
  };
}

export async function observeEvent(event: Stripe.Event, deps: Dependencies): Promise<Observation> {
  const base: Observation = {
    event_id: event.id, event_type: event.type, event_created: event.created,
    received_at: new Date().toISOString(), status: 'ignored',
  };
  let sessionId: string | undefined;
  if (event.type === 'charge.refunded') {
    const charge = event.data.object as Stripe.Charge;
    const paymentId = typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id;
    if (paymentId) sessionId = await deps.sessionForPayment(paymentId);
  } else {
    const snapshot = event.data.object as Stripe.Checkout.Session;
    if (snapshot.metadata?.demo !== 'nutriwell-v1' || snapshot.metadata?.account !== DEMO_ACCOUNT) {
      return { ...base, reason: 'unrelated_checkout' };
    }
    sessionId = snapshot.id;
  }
  if (!sessionId) return { ...base, reason: 'unrelated_payment' };
  const session = await deps.retrieveSession(sessionId);
  if (session.metadata?.demo !== 'nutriwell-v1' || session.metadata?.account !== DEMO_ACCOUNT) {
    return { ...base, reason: 'unrelated_checkout' };
  }
  const orderId = session.client_reference_id;
  const attempt = Number(session.metadata.attempt);
  if (!orderId || !/^[0-9a-f-]{36}$/.test(orderId) || !Number.isSafeInteger(attempt) || attempt < 0) {
    throw new Error('Invalid purchase reference');
  }
  const state = purchaseState(session, { id: orderId, attempt, started: session.created * 1000, session: session.id });
  const canRecordPaid = event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded';
  if (state === 'paid' && !canRecordPaid) return { ...base, reason: 'event_cannot_confirm_payment', session_id: session.id };
  const intent = session.payment_intent;
  const paymentId = typeof intent === 'string' ? intent : intent?.id;
  if (['paid', 'refunded'].includes(state) && !paymentId) throw new Error('Payment missing');
  return {
    ...base, status: state === 'processing' ? 'pending' : state,
    order_id: orderId, session_id: session.id, payment_id: paymentId ?? undefined,
    amount: session.amount_total!, currency: session.currency!,
    ...(event.type === 'checkout.session.async_payment_failed' && ['pending', 'processing'].includes(state) ? { status: 'failed' as const } : {}),
  };
}

export async function handleStripeWebhook(request: Request, deps: Dependencies): Promise<Response> {
  const signature = request.headers.get('stripe-signature');
  if (!signature) return Response.json({ error: 'Invalid signature' }, { status: 400 });
  const raw = await request.text();
  if (Buffer.byteLength(raw) > 256 * 1024) return Response.json({ error: 'Payload too large' }, { status: 413 });
  let event: Stripe.Event;
  try { event = Stripe.webhooks.constructEvent(raw, signature, deps.secret); }
  catch { return Response.json({ error: 'Invalid signature' }, { status: 400 }); }
  if (event.livemode !== false || !/^evt_[A-Za-z0-9]+$/.test(event.id) || (event.account && event.account !== DEMO_ACCOUNT)) {
    return Response.json({ error: 'Invalid event context' }, { status: 400 });
  }
  if (!(WEBHOOK_EVENTS as readonly string[]).includes(event.type)) return Response.json({ received: true, outcome: 'ignored_type' });
  try {
    const observation = await observeEvent(event, deps);
    const result = await deps.record(observation);
    // Acknowledge only after the persistent write. Stripe retries if either service fails.
    return Response.json({ received: true, ...result });
  } catch {
    console.error('stripe_webhook_retry', { event_id: event.id, event_type: event.type });
    return Response.json({ error: 'Retry later' }, { status: 503 });
  }
}
