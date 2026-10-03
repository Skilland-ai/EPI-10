'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cookieOptions, decodeOrder, encodeOrder, newOrder, ORDER_COOKIE } from '../../lib/order';
import { checkoutForOrder, readPurchase, stripe } from '../../lib/purchase';

export async function continuePurchase() {
  const jar = await cookies();
  const order = decodeOrder(jar.get(ORDER_COOKIE)?.value);
  if (!order) redirect('/compra?aviso=sin-compra');
  let destination: string;
  try {
    const checkout = await checkoutForOrder(order);
    jar.set(ORDER_COOKIE, encodeOrder(checkout.order), cookieOptions);
    destination = checkout.url;
  } catch {
    // Do not log Stripe payloads, customer details or credentials.
    redirect('/compra?aviso=conexion');
  }
  redirect(destination);
}

export async function startNewPurchase() {
  const jar = await cookies();
  const order = decodeOrder(jar.get(ORDER_COOKIE)?.value);
  let processing = false;
  try {
    if (order) {
      const current = await readPurchase(order);
      processing = current?.state === 'processing';
      if (current?.state === 'pending') {
        // The old checkout must no longer accept payment before a new demo is started.
        await stripe().checkout.sessions.expire(current.session.id);
      }
    }
  } catch { redirect('/compra?aviso=conexion'); }
  if (processing) redirect('/compra');
  jar.set(ORDER_COOKIE, encodeOrder(newOrder()), cookieOptions);
  redirect('/#demo');
}
