import { Redis } from '@upstash/redis';

export const LEDGER_KEY = 'epi10:stripe:sandbox:v1';
export type Observation = {
  event_id: string; event_type: string; event_created: number; received_at: string;
  status: 'paid' | 'refunded' | 'pending' | 'expired' | 'failed' | 'ignored';
  reason?: string; order_id?: string; session_id?: string; payment_id?: string;
  amount?: number; currency?: string;
};
export type LedgerResult = { outcome: string; deliveries: number; business_action_created: boolean };
let redisClient: Redis | undefined;
export function ledgerClient() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error('Ledger unavailable');
  return redisClient ??= new Redis({ url, token, retry: { retries: 2, backoff: n => Math.min(100 * 2 ** n, 1000) } });
}

// All reads and decisions run together on Redis. One HSET commits the complete
// journal change, with no expiring lock and no gap between event and business record.
export const RECORD_EVENT_LUA = `
local input = cjson.decode(ARGV[1])
local eventField = 'event:' .. input.event_id
local previousEvent = redis.call('HGET', KEYS[1], eventField)
if previousEvent then
  local saved = cjson.decode(previousEvent)
  saved.deliveries = saved.deliveries + 1
  saved.last_received_at = input.received_at
  redis.call('HSET', KEYS[1], eventField, cjson.encode(saved))
  return cjson.encode({outcome='duplicate_event', deliveries=saved.deliveries, business_action_created=false})
end
local event = input
event.deliveries = 1
event.last_received_at = input.received_at
event.outcome = input.status
local writes = {}
local businessCreated = false
if input.order_id then
  local orderField = 'order:' .. input.order_id
  local storedOrder = redis.call('HGET', KEYS[1], orderField)
  local order = storedOrder and cjson.decode(storedOrder) or {order_id=input.order_id, status='pending', first_event=input.event_id}
  local effectField = 'effect:' .. input.order_id
  local effect = redis.call('HGET', KEYS[1], effectField)
  local paymentField = input.payment_id and ('payment:' .. input.payment_id) or nil
  local knownPayment = paymentField and redis.call('HGET', KEYS[1], paymentField) or nil
  local payment = knownPayment and cjson.decode(knownPayment) or nil
  if payment and payment.order_id ~= input.order_id then
    return redis.error_reply('Payment belongs to another order')
  end
  if input.status == 'paid' then
    if order.payment_id and order.payment_id ~= input.payment_id then
      event.outcome = 'duplicate_payment'
      order.needs_review = true
    elseif effect then
      event.outcome = 'payment_already_recorded'
    elseif order.status == 'refunded' then
      event.outcome = 'ignored_after_refund'
    else
      event.outcome = 'payment_recorded'
      businessCreated = true
      table.insert(writes, effectField)
      table.insert(writes, cjson.encode({kind='demo.payment_recorded', order_id=input.order_id, payment_id=input.payment_id, session_id=input.session_id, event_id=input.event_id, created_at=input.received_at, livemode=false}))
    end
    if not order.payment_id or order.payment_id == input.payment_id then
      order.payment_id = input.payment_id
      order.session_id = input.session_id
      if order.status ~= 'refunded' then order.status = 'paid' end
    end
  elseif input.status == 'refunded' then
    if not order.payment_id or order.payment_id == input.payment_id then
      order.status = 'refunded'
      order.payment_id = input.payment_id
      order.session_id = input.session_id
    else
      event.outcome = 'additional_payment_refunded'
    end
  elseif order.status ~= 'paid' and order.status ~= 'refunded' then
    order.status = input.status
    order.session_id = input.session_id
  end
  order.amount = input.amount
  order.currency = input.currency
  order.updated_at = input.received_at
  order.livemode = false
  table.insert(writes, orderField)
  table.insert(writes, cjson.encode(order))
  if paymentField then
    local paymentStatus = input.status
    if payment and payment.status == 'refunded' then paymentStatus = 'refunded' end
    if payment and payment.status == 'paid' and input.status ~= 'refunded' then paymentStatus = 'paid' end
    table.insert(writes, paymentField)
    table.insert(writes, cjson.encode({order_id=input.order_id, payment_id=input.payment_id, session_id=input.session_id, status=paymentStatus, amount=input.amount, currency=input.currency, updated_at=input.received_at, livemode=false}))
  end
end
table.insert(writes, eventField)
table.insert(writes, cjson.encode(event))
redis.call('HSET', KEYS[1], unpack(writes))
return cjson.encode({outcome=event.outcome, deliveries=1, business_action_created=businessCreated})
`;

export async function recordObservation(observation: Observation, key = LEDGER_KEY, client = ledgerClient()): Promise<LedgerResult> {
  return client.eval<string[], LedgerResult>(RECORD_EVENT_LUA, [key], [JSON.stringify(observation)]);
}
