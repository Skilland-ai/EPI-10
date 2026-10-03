import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { ledgerClient, recordObservation } from '../lib/stripe-ledger.ts';

// Requires .env.local. Separate QA keys never touch the demo journal.
const key = `epi10:stripe:qa:${randomUUID()}`;
const redis = ledgerClient();
const observation = {
  event_id: 'evt_concurrent', event_type: 'checkout.session.completed', event_created: Math.floor(Date.now() / 1000),
  received_at: new Date().toISOString(), status: 'paid', order_id: randomUUID(), session_id: 'cs_test_fixture',
  payment_id: 'pi_fixture', amount: 10000, currency: 'eur',
};
test('atomic journal prevents concurrent duplication and late state regressions', async t => {
  try {
    const responses = await Promise.all(Array.from({ length: 6 }, () => recordObservation(observation, key, redis)));
    assert.equal(responses.filter(r => r.business_action_created).length, 1);
    let records = await redis.hgetall(key);
    assert.equal(records['event:evt_concurrent'].deliveries, 6);
    assert.equal(Object.keys(records).filter(k => k.startsWith('effect:')).length, 1);

    const nextEvent = { ...observation, event_id: 'evt_otherSuccess', event_type: 'checkout.session.async_payment_succeeded' };
    assert.equal((await recordObservation(nextEvent, key, redis)).outcome, 'payment_already_recorded');
    const duplicatePayment = { ...observation, event_id: 'evt_secondPayment', payment_id: 'pi_second' };
    assert.equal((await recordObservation(duplicatePayment, key, redis)).outcome, 'duplicate_payment');
    records = await redis.hgetall(key);
    assert.equal(records[`order:${observation.order_id}`].needs_review, true);
    assert.equal(Object.keys(records).filter(k => k.startsWith('effect:')).length, 1);

    await recordObservation({ ...observation, event_id: 'evt_latePending', status: 'pending' }, key, redis);
    records = await redis.hgetall(key);
    assert.equal(records['payment:pi_fixture'].status, 'paid');
    assert.equal(records[`order:${observation.order_id}`].status, 'paid');
    await recordObservation({ ...observation, event_id: 'evt_refund', status: 'refunded' }, key, redis);
    await recordObservation({ ...observation, event_id: 'evt_latePaid' }, key, redis);
    records = await redis.hgetall(key);
    assert.equal(records['payment:pi_fixture'].status, 'refunded');
    assert.equal(records[`order:${observation.order_id}`].status, 'refunded');
    assert.equal(Object.keys(records).filter(k => k.startsWith('effect:')).length, 1);
    t.diagnostic('6 concurrent deliveries, different success event, second payment, pending and refund ordering: PASS');
  } finally { await redis.del(key); }
});
test('an unpaid event creates no business action', async () => {
  const pendingKey = key + ':pending';
  try {
    const result = await recordObservation({ ...observation, status: 'pending' }, pendingKey, redis);
    assert.equal(result.business_action_created, false);
    const records = await redis.hgetall(pendingKey);
    assert.equal(Object.keys(records).some(k => k.startsWith('effect:')), false);
  } finally { await redis.del(pendingKey); }
});
