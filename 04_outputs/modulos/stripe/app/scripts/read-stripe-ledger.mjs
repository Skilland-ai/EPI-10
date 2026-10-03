import { ledgerClient, LEDGER_KEY } from '../lib/stripe-ledger.ts';

const records = await ledgerClient().hgetall(LEDGER_KEY) ?? {};
const group = prefix => Object.entries(records).filter(([key]) => key.startsWith(prefix)).map(([, value]) => value);
console.log(JSON.stringify({
  checked_at: new Date().toISOString(), events: group('event:'), orders: group('order:'),
  payments: group('payment:'), business_records: group('effect:'),
}, null, 2));
