import test from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes, randomUUID } from 'node:crypto';
import Stripe from 'stripe';
import { handleStripeWebhook } from '../lib/stripe-webhook.ts';
import { DEMO_ACCOUNT, DEMO_PRICE } from '../lib/purchase.ts';

const secret = randomBytes(32).toString('hex');
const orderId = randomUUID();
function session(paid = true) {
  return {
    id: 'cs_test_fixture', created: Math.floor(Date.now() / 1000), livemode: false, mode: 'payment',
    client_reference_id: orderId, metadata: { demo: 'nutriwell-v1', account: DEMO_ACCOUNT, attempt: '0' },
    currency: 'eur', amount_total: 10000, status: paid ? 'complete' : 'open', payment_status: paid ? 'paid' : 'unpaid',
    line_items: { data: [{ quantity: 1, price: { id: DEMO_PRICE } }] },
    payment_intent: paid ? { id: 'pi_fixture', livemode: false, status: 'succeeded', amount_received: 10000,
      currency: 'eur', metadata: { order_id: orderId }, latest_charge: { id: 'ch_fixture', paid: true,
        livemode: false, currency: 'eur', amount: 10000, refunded: false, amount_refunded: 0 } } : null,
  };
}
function event(overrides = {}) {
  return { id: 'evt_fixture', object: 'event', type: 'checkout.session.completed', livemode: false,
    created: Math.floor(Date.now() / 1000), data: { object: session() }, ...overrides };
}
function request(evt, options = {}) {
  const payload = JSON.stringify(evt);
  const signature = Stripe.webhooks.generateTestHeaderString({ payload, secret, ...options });
  return new Request('https://example.com/api/webhooks/stripe', {
    method: 'POST', body: options.tamper ? payload + ' ' : payload,
    headers: { 'stripe-signature': signature },
  });
}
function deps(current = session()) {
  const records = []; let reads = 0;
  return { records, get reads() { return reads; }, secret,
    retrieveSession: async () => { reads++; return current; }, sessionForPayment: async () => current.id,
    record: async observation => { records.push(observation); return { outcome: observation.status, deliveries: 1, business_action_created: observation.status === 'paid' }; },
  };
}
test('valid raw signature produces a minimal verified observation', async () => {
  const d = deps(); const response = await handleStripeWebhook(request(event()), d);
  assert.equal(response.status, 200);
  assert.equal(d.records[0].status, 'paid');
  assert.equal(d.records[0].order_id, orderId);
  assert.equal(d.records[0].payment_id, 'pi_fixture');
  assert.equal(d.records[0].amount, 10000);
  assert.equal('customer_details' in d.records[0], false);
});
test('invalid, tampered and stale signatures cause no API or ledger changes', async () => {
  for (const req of [request(event(), { secret: 'another-signing-key' }), request(event(), { tamper: true }),
    request(event(), { timestamp: Math.floor(Date.now() / 1000) - 600 }), new Request('https://example.com', { method: 'POST', body: '{}' })]) {
    const d = deps(); assert.equal((await handleStripeWebhook(req, d)).status, 400);
    assert.equal(d.reads, 0); assert.equal(d.records.length, 0);
  }
});
test('live and foreign-account events are rejected even with a valid signature', async () => {
  for (const overrides of [{ livemode: true }, { account: 'acct_another' }]) {
    const d = deps(); assert.equal((await handleStripeWebhook(request(event(overrides)), d)).status, 400);
    assert.equal(d.records.length, 0);
  }
});
test('checkout completion does not itself prove payment', async () => {
  const d = deps(session(false));
  assert.equal((await handleStripeWebhook(request(event()), d)).status, 200);
  assert.equal(d.records[0].status, 'pending');
});
test('wrong amounts fail closed; unrelated sessions do not create paid observations', async () => {
  const d = deps({ ...session(), amount_total: 99 });
  assert.equal((await handleStripeWebhook(request(event()), d)).status, 503);
  assert.equal(d.records.length, 0);
  const ignored = deps();
  const unrelated = event({ data: { object: { ...session(), metadata: {} } } });
  assert.equal((await handleStripeWebhook(request(unrelated), ignored)).status, 200);
  assert.equal(ignored.records[0].status, 'ignored'); assert.equal(ignored.reads, 0);
});
test('expired and failed notifications cannot activate an already-paid purchase', async () => {
  for (const type of ['checkout.session.expired', 'checkout.session.async_payment_failed']) {
    const d = deps();
    assert.equal((await handleStripeWebhook(request(event({ type })), d)).status, 200);
    assert.equal(d.records[0].status, 'ignored');
  }
});
test('an asynchronous failure on a completed unpaid session is recorded as failed', async () => {
  const d = deps({ ...session(false), status: 'complete' });
  const response = await handleStripeWebhook(request(event({ type: 'checkout.session.async_payment_failed' })), d);
  assert.equal(response.status, 200);
  assert.equal(d.records[0].status, 'failed');
});
test('a refund observed before a completion delivery does not create a paid action', async () => {
  const refunded = session();
  refunded.payment_intent.latest_charge.refunded = true;
  refunded.payment_intent.latest_charge.amount_refunded = 10000;
  const d = deps(refunded);
  assert.equal((await handleStripeWebhook(request(event()), d)).status, 200);
  assert.equal(d.records[0].status, 'refunded');
  const refundEvent = event({ type: 'charge.refunded', data: { object: { payment_intent: 'pi_fixture' } } });
  assert.equal((await handleStripeWebhook(request(refundEvent), d)).status, 200);
  assert.equal(d.records[1].status, 'refunded');
});
test('service failures are retriable, not acknowledged as processed', async () => {
  const unavailable = deps(); unavailable.retrieveSession = async () => { throw new Error('Stripe offline'); };
  assert.equal((await handleStripeWebhook(request(event()), unavailable)).status, 503);
  assert.equal(unavailable.records.length, 0);
  const storage = deps(); storage.record = async () => { throw new Error('Redis offline'); };
  assert.equal((await handleStripeWebhook(request(event()), storage)).status, 503);
});
