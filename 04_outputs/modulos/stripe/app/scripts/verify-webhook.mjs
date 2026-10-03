import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import Stripe from 'stripe';
import { stripe } from '../lib/purchase.ts';
import { ledgerClient, LEDGER_KEY } from '../lib/stripe-ledger.ts';

// Replays an existing sandbox event; does not create another payment.
const eventId = process.argv[2];
if (!/^evt_[A-Za-z0-9]+$/.test(eventId ?? '')) throw new Error('Pass a sandbox event ID');
const config = JSON.parse(await readFile(new URL('../../config/webhook_demo.json', import.meta.url), 'utf8'));
const event = await stripe().events.retrieve(eventId);
assert.equal(event.livemode, false);
const payload = JSON.stringify(event);
const redis = ledgerClient();
const before = await redis.hgetall(LEDGER_KEY);
assert.ok(before?.[`event:${eventId}`], 'Receive the real Stripe delivery first');
const statuses = [];
for (const variant of ['missing', 'wrong', 'tampered', 'expired']) {
  const header = variant === 'missing' ? undefined : Stripe.webhooks.generateTestHeaderString({
    payload, secret: variant === 'wrong' ? 'invalid-signing-key' : process.env.STRIPE_WEBHOOK_SECRET,
    ...(variant === 'expired' ? { timestamp: Math.floor(Date.now() / 1000) - 600 } : {}),
  });
  const response = await fetch(config.url, {
    method: 'POST', headers: { 'content-type': 'application/json', ...(header ? { 'stripe-signature': header } : {}) },
    body: variant === 'tampered' ? payload + ' ' : payload,
  });
  assert.equal(response.status, 400);
  statuses.push({ variant, status: response.status });
}
assert.deepEqual(await redis.hgetall(LEDGER_KEY), before, 'Invalid signatures must not mutate any journal field');
const header = Stripe.webhooks.generateTestHeaderString({ payload, secret: process.env.STRIPE_WEBHOOK_SECRET });
const replay = await fetch(config.url, { method: 'POST', headers: { 'content-type': 'application/json', 'stripe-signature': header }, body: payload });
assert.equal(replay.status, 200);
const response = await replay.json();
assert.equal(response.outcome, 'duplicate_event');
assert.equal(response.business_action_created, false);
const after = await redis.hgetall(LEDGER_KEY);
const businessRecords = values => Object.entries(values).filter(([key]) => key.startsWith('effect:'));
assert.deepEqual(businessRecords(after), businessRecords(before));
assert.equal(after[`event:${eventId}`].deliveries, before[`event:${eventId}`].deliveries + 1);
const get = await fetch(config.url);
assert.equal(get.status, 405);
const evidence = {
  checked_at: new Date().toISOString(), event_id: eventId, invalid_signatures: statuses,
  invalid_requests_left_journal_unchanged: true, local_signed_replay: { status: replay.status, ...response },
  deliveries_before: before[`event:${eventId}`].deliveries, deliveries_after: after[`event:${eventId}`].deliveries,
  business_records_unchanged: true, journal_get_status: get.status,
};
if (process.argv[3]) await writeFile(process.argv[3], JSON.stringify(evidence, null, 2) + '\n');
console.log(JSON.stringify(evidence, null, 2));
