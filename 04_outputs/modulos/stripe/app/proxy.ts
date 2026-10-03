import { NextRequest, NextResponse } from 'next/server';
import { cookieOptions, decodeOrder, encodeOrder, newOrder, ORDER_COOKIE } from './lib/order';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  if (request.method === 'GET' && process.env.DEMO_COOKIE_SECRET && !decodeOrder(request.cookies.get(ORDER_COOKIE)?.value)) {
    response.cookies.set(ORDER_COOKIE, encodeOrder(newOrder()), cookieOptions);
  }
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}
export const config = { matcher: ['/'] };
