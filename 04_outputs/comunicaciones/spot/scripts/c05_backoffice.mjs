// Tramo 5: back office (operaciones.prueba) → inicio «Casos que esperan a Aitor» → ficha de Marta → Documentos «Revisado» → Mensajes con plantilla.
import { abrirNavegador, clip, STATE, OE, UI, env, estado } from './lib.mjs';
import { join } from 'node:path';
const pid = estado('pid');
const b = await abrirNavegador();
const c = await clip(b, '05_backoffice'); const { page } = c;
await page.goto(`${OE}/interface/login/login.php?site=default`, { waitUntil: 'networkidle' }); await c.pausa(1000);
c.marca('login'); await c.escribir('#authUser', 'operaciones.prueba', 40);
await c.ir('#clearPass'); await page.fill('#clearPass', env('OPS_PASS')); await c.pausa(400);
await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {}), c.clic('#login-button')]);
await page.waitForTimeout(3500); c.marca('inicio'); await c.foto('17_bo_inicio');
await page.mouse.move(640, 560, { steps: 20 }); await c.pausa(1500);
const fi = page.frames().find((f) => f.url().includes('inicio.php'));
if (fi) { await fi.evaluate(() => window.scrollBy({ top: 260, behavior: 'smooth' })); await c.pausa(2000); await c.foto('17b_bo_casos'); }
await page.goto(`${OE}${UI}/backoffice/ficha.php?set_pid=${pid}`, { waitUntil: 'networkidle' }); await c.pausa(2000);
c.marca('ficha'); await c.foto('18_bo_ficha');
await c.ir('[data-epi10-region="guia-aitor"]'); await c.pausa(1500);
await c.clic('#tab-documentos'); await c.pausa(1500); c.marca('documentos');
await Promise.all([page.waitForLoadState('networkidle'), c.clic('[data-epi10-accion="marcar-revisado-consentimiento"]')]); await c.pausa(1500);
if (!page.url().includes('#documentos')) { await page.locator('#tab-documentos').click().catch(() => {}); await c.pausa(800); }
const r2 = page.locator('[data-epi10-accion="marcar-revisado-cuestionario"]');
if (await r2.count()) { await Promise.all([page.waitForLoadState('networkidle'), c.clic(r2)]); await c.pausa(1200);
  if (!page.url().includes('#documentos')) { await page.locator('#tab-documentos').click().catch(() => {}); } }
await c.pausa(1500); c.marca('revisado'); await c.foto('19_bo_revisado');
await c.clic('#tab-mensajes'); await c.pausa(2500);
const f = await (await page.locator('iframe[data-epi10-region=chat-equipo]').elementHandle()).contentFrame();
await page.locator('iframe[data-epi10-region=chat-equipo]').scrollIntoViewIfNeeded(); await c.pausa(800);
c.marca('mensajes');
await c.clic(f.locator('[data-epi10-chat-plantillas]')); await c.pausa(1500);
await c.clic(f.locator('[data-epi10-chat-plantilla="1"]')); await c.pausa(1800);
await c.clic(f.locator('[data-epi10-chat-enviar]')); await c.pausa(3000);
c.marca('respondido'); await c.foto('20_bo_respuesta');
await c.cerrar(join(STATE, 'bo.json')); await b.close();
