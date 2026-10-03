import test from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { checkoutForOrder, DEMO_ACCOUNT, DEMO_PRICE, purchaseState, readPurchase, sessionParameters } from '../lib/purchase.ts';
import { decodeOrder, encodeOrder, newOrder } from '../lib/order.ts';

const order = newOrder();
function session(overrides = {}) {
  return {
    id: 'cs_test_fixture', mode: 'payment', livemode: false, client_reference_id: order.id,
    metadata: { demo: 'nutriwell-v1', account: DEMO_ACCOUNT, attempt: '0' },
    amount_total: 10000, currency: 'eur', status: 'open', payment_status: 'unpaid',
    line_items: { data: [{ quantity: 1, price: { id: DEMO_PRICE } }] },
    url: 'https://checkout.stripe.com/fixture', ...overrides,
  };
}
function paid(overrides = {}) {
  return session({ status: 'complete', payment_status: 'paid', payment_intent: {
    livemode: false, status: 'succeeded', amount_received: 10000, currency: 'eur', metadata: { order_id: order.id },
    latest_charge: { paid: true, livemode: false, amount: 10000, currency: 'eur', amount_refunded: 0, refunded: false },
  }, ...overrides });
}
function gateway(initial = []) {
  const records = [...initial];
  const creations = [];
  const byKey = new Map();
  const client = { checkout: { sessions: {
    list: () => ({ async *[Symbol.asyncIterator]() { yield* [...records]; } }),
    retrieve: async id => records.find(item => item.id === id),
    create: async (params, options) => {
      creations.push({ params, options });
      if (byKey.has(options.idempotencyKey)) return byKey.get(options.idempotencyKey);
      const item = session({ id: `cs_test_attempt${params.metadata.attempt}`, metadata: params.metadata });
      byKey.set(options.idempotencyKey, item); records.push(item); return item;
    },
  } } };
  return { client, creations, records };
}
test('an unpaid or processing checkout never becomes a paid confirmation', () => {
  assert.equal(purchaseState(session(), order), 'pending');
  assert.equal(purchaseState(session({ status: 'complete' }), order), 'processing');
  assert.equal(purchaseState(session({ payment_status: 'no_payment_required' }), order), 'processing');
  assert.throws(() => purchaseState(session({ payment_status: 'paid' }), order));
});
test('verifies the paid charge and full refund; partial refund stays unconfirmed', () => {
  const item = paid();
  assert.equal(purchaseState(item, order), 'paid');
  item.payment_intent.latest_charge.amount_refunded = 5000;
  assert.throws(() => purchaseState(item, order));
  item.payment_intent.latest_charge.amount_refunded = 10000;
  item.payment_intent.latest_charge.refunded = true;
  assert.equal(purchaseState(item, order), 'refunded');
});
test('rejects live mode, other purchases, amounts, prices and quantities', () => {
  for (const override of [{ livemode: true }, { amount_total: 1 }, { currency: 'usd' },
    { client_reference_id: 'another-order' }, { line_items: { data: [{ quantity: 2, price: { id: DEMO_PRICE } }] } },
    { line_items: { data: [{ quantity: 1, price: { id: 'another-price' } }] } },
    { metadata: { demo: 'other', account: DEMO_ACCOUNT, attempt: '0' } }]) {
    assert.throws(() => purchaseState(paid(override), order));
  }
});
test('signed cookie rejects edits and malformed values', () => {
  process.env.DEMO_COOKIE_SECRET = randomBytes(32).toString('hex');
  const signed = encodeOrder(order);
  assert.deepEqual(decodeOrder(signed), order);
  assert.equal(decodeOrder(signed.replace(/^./, signed[0] === 'a' ? 'b' : 'a')), undefined);
  assert.equal(decodeOrder(`${signed}.extra`), undefined);
  assert.equal(decodeOrder('untrusted'), undefined);
});
test('resume and paid replay create no new checkout', async () => {
  for (const item of [session(), paid()]) {
    const store = gateway([item]);
    const result = await checkoutForOrder(order, store.client);
    assert.equal(store.creations.length, 0);
    assert.equal(result.url, item.payment_status === 'paid' ? '/compra' : item.url);
    assert.equal(result.order.session, item.id);
  }
});
test('lost cookie response recovers the Stripe record even after 24h', async () => {
  const staleOrder = { ...order, started: Date.now() - 48 * 60 * 60 * 1000 };
  const store = gateway([paid()]);
  const result = await checkoutForOrder(staleOrder, store.client);
  assert.equal(result.url, '/compra');
  assert.equal(store.creations.length, 0);
});
test('expired attempts keep the purchase reference and increment attempt', async () => {
  const store = gateway([session({ status: 'expired', url: null })]);
  const result = await checkoutForOrder(order, store.client);
  assert.equal(store.creations.length, 1);
  assert.equal(result.order.id, order.id);
  assert.equal(result.order.attempt, 1);
});
test('concurrent initial submissions use identical idempotency keys and fixed amounts', async () => {
  const store = gateway();
  const results = await Promise.all([checkoutForOrder(order, store.client), checkoutForOrder(order, store.client)]);
  assert.equal(new Set(store.creations.map(item => item.options.idempotencyKey)).size, 1);
  assert.equal(new Set(results.map(item => item.order.session)).size, 1);
  assert.deepEqual(sessionParameters(order).line_items, [{ price: DEMO_PRICE, quantity: 1 }]);
});
test('duplicate completed payments and missing known sessions fail closed', async () => {
  const duplicates = gateway([paid(), paid({ id: 'cs_test_duplicate' })]);
  await assert.rejects(() => readPurchase(order, duplicates.client));
  const absent = gateway();
  await assert.rejects(() => readPurchase({ ...order, session: 'cs_test_missing' }, absent.client));
  await assert.rejects(() => checkoutForOrder({ ...order, started: Date.now() - 25 * 3600000 }, absent.client));
  assert.equal(absent.creations.length, 0);
});
test('Stripe outage cannot create a replacement checkout', async () => {
  const store = gateway();
  store.client.checkout.sessions.list = () => { throw new Error('offline'); };
  await assert.rejects(() => checkoutForOrder(order, store.client));
  assert.equal(store.creations.length, 0);
});
