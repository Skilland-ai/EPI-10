// Tramo 7: portal de Marta tras los cambios en Odoo → inicio (stepper) → Mensajes con los avisos de hito.
import { abrirNavegador, clip, STATE, OE } from './lib.mjs';
import { join } from 'node:path';
const b = await abrirNavegador();
const c = await clip(b, '07_portal_hitos', { storage: join(STATE, 'portal.json') }); const { page } = c;
await page.goto(`${OE}/portal/home.php`, { waitUntil: 'networkidle' }); await c.pausa(2500); c.marca('inicio'); await c.foto('27_portal_inicio_lab');
await Promise.all([page.waitForLoadState('networkidle'), c.clic('#messages-go')]); await c.pausa(2500);
c.marca('mensajes'); await c.foto('28_portal_mensajes_hitos');
await page.mouse.move(640, 400, { steps: 10 }); await c.scroll(-600, 30); await c.pausa(1500); await c.scroll(600, 30); await c.pausa(1500);
console.log((await page.locator('[data-epi10-chat]').innerText()).replace(/\s+\n/g, '\n').slice(0, 1500));
await c.cerrar(join(STATE, 'portal.json')); await b.close();
