import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';

export const ORDER_COOKIE = 'nutriwell_demo_order';
export type Order = { id: string; attempt: number; started: number; session?: string };
export function newOrder(): Order {
  return { id: randomUUID(), attempt: 0, started: Date.now() };
}
function signingKey() {
  const key = process.env.DEMO_COOKIE_SECRET;
  if (!key || key.length < 32) throw new Error('Cookie signing unavailable');
  return key;
}
export function encodeOrder(order: Order) {
  const payload = Buffer.from(JSON.stringify(order)).toString('base64url');
  return `${payload}.${createHmac('sha256', signingKey()).update(payload).digest('base64url')}`;
}
export function decodeOrder(value?: string): Order | undefined {
  if (!value || value.length > 2048) return;
  try {
    const [payload, signature, extra] = value.split('.');
    if (!payload || !signature || extra) return;
    const expected = createHmac('sha256', signingKey()).update(payload).digest();
    const actual = Buffer.from(signature, 'base64url');
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return;
    const order = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (!/^[0-9a-f-]{36}$/.test(order.id) || !Number.isSafeInteger(order.attempt) || order.attempt < 0 ||
      !Number.isSafeInteger(order.started) || order.started > Date.now() + 60000 ||
      (order.session !== undefined && !/^cs_test_[A-Za-z0-9]+$/.test(order.session))) return;
    return order as Order;
  } catch { return; }
}
export const cookieOptions = {
  httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const,
  path: '/', maxAge: 60 * 60 * 24 * 30,
};
export function orderReference(order: Order) { return `NW-${order.id.slice(0, 8).toUpperCase()}`; }
