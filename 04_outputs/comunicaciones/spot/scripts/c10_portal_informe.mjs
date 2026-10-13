// Tramo 9: portal de Marta → inicio en el paso 5 → «Mi informe» con el PDF.
import { abrirNavegador, clip, STATE, OE } from './lib.mjs';
import { join } from 'node:path';
const b = await abrirNavegador();
const c = await clip(b, '10_portal_informe', { storage: join(STATE, 'portal.json') }); const { page } = c;
await page.goto(`${OE}/portal/home.php`, { waitUntil: 'networkidle' }); await c.pausa(2500); c.marca('inicio'); await c.foto('34_portal_inicio_paso5');
await c.scroll(300, 25); await c.pausa(1200); await c.scroll(-300, 15);
await Promise.all([page.waitForLoadState('networkidle'), c.clic('#reports-go')]); await c.pausa(2500);
c.marca('mi informe'); await c.foto('35_portal_mi_informe');
console.log((await page.locator('main, body').first().innerText()).slice(0, 600));
const leer = page.locator('a:has-text("Leer ahora"), button:has-text("Leer ahora")').first();
if (await leer.count()) { await Promise.all([page.waitForLoadState('networkidle').catch(() => {}), c.clic(leer)]); await c.pausa(4000); c.marca('leer'); await c.foto('35b_portal_pdf'); }
await c.cerrar(join(STATE, 'portal.json')); await b.close();
