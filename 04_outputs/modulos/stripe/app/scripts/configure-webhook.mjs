import { readFile, writeFile, chmod } from 'node:fs/promises';
import { stripe, DEMO_ACCOUNT } from '../lib/purchase.ts';
import { WEBHOOK_EVENTS } from '../lib/stripe-webhook.ts';

const url = 'https://epi10-nutriwell-demo.vercel.app/api/webhooks/stripe';
try {
  const client = stripe();
  if ((await client.accounts.retrieve()).id !== DEMO_ACCOUNT) throw new Error('Unexpected sandbox');
  const existing = (await client.webhookEndpoints.list({ limit: 100 })).data.filter(item => item.url === url);
  if (existing.length > 1) throw new Error('Multiple endpoints require review');
  let endpoint = existing[0];
  if (!endpoint) {
    if (!process.argv.includes('--create')) throw new Error('No endpoint. Use --create to provision it in the sandbox.');
    endpoint = await client.webhookEndpoints.create({
      url, api_version: '2026-08-26.dahlia', enabled_events: [...WEBHOOK_EVENTS],
      description: 'NutriWell DEMO — sandbox — registro verificado de pagos, sin prestación real',
      metadata: { demo: 'nutriwell-v1', module: 'SKI-51' },
    }, { idempotencyKey: 'epi10-nutriwell-webhook-v1' });
  }
  if (endpoint.livemode || endpoint.status !== 'enabled' || endpoint.metadata.demo !== 'nutriwell-v1') throw new Error('Unexpected endpoint configuration');
  if (JSON.stringify([...endpoint.enabled_events].sort()) !== JSON.stringify([...WEBHOOK_EVENTS].sort())) throw new Error('Unexpected event selection');
  if (endpoint.secret) {
    const path = new URL('../.env.local', import.meta.url);
    const lines = (await readFile(path, 'utf8')).split('\n').filter(line => !line.startsWith('STRIPE_WEBHOOK_SECRET=') && line !== '');
    await writeFile(path, [...lines, `STRIPE_WEBHOOK_SECRET=${endpoint.secret}`, ''].join('\n'));
    await chmod(path, 0o600);
  } else if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error('Existing endpoint requires its original signing secret');
  }
  const config = {
    verified_at: new Date().toISOString(), account_id: DEMO_ACCOUNT, endpoint_id: endpoint.id,
    url, livemode: endpoint.livemode, status: endpoint.status, api_version: endpoint.api_version,
    enabled_events: endpoint.enabled_events, signing_environment_variable: 'STRIPE_WEBHOOK_SECRET',
    storage: { provider: 'Upstash Redis', resource: 'epi10-stripe-events-demo', resource_id: 'store_pLsMKu4pJymUMifN', plan: 'free', region: 'iad1', ledger_key: 'epi10:stripe:sandbox:v1', ttl: null },
  };
  await writeFile(new URL('../../config/webhook_demo.json', import.meta.url), JSON.stringify(config, null, 2) + '\n');
  console.log(JSON.stringify({ endpoint: endpoint.id, livemode: endpoint.livemode, events: endpoint.enabled_events, signing_secret_saved: Boolean(endpoint.secret) }));
} catch (error) {
  console.error(JSON.stringify({ error: error.type ?? error.name, message: error.message }));
  process.exitCode = 1;
}
