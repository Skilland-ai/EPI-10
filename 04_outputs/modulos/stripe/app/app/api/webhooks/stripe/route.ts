import { handleStripeWebhook, webhookDependencies } from '../../../../lib/stripe-webhook';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  try { return await handleStripeWebhook(request, webhookDependencies()); }
  catch { return Response.json({ error: 'Webhook unavailable' }, { status: 503 }); }
}
