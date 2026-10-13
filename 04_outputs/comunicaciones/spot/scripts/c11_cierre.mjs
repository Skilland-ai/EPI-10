// Tramo 10: cierre en la ficha del back office con la etapa «Informe entregado».
import { abrirNavegador, clip, STATE, OE, UI, estado } from './lib.mjs';
import { join } from 'node:path';
const b = await abrirNavegador();
const c = await clip(b, '11_cierre', { storage: join(STATE, 'bo.json') }); const { page } = c;
await page.goto(`${OE}${UI}/backoffice/ficha.php?set_pid=${estado('pid')}`, { waitUntil: 'networkidle' }); await c.pausa(2500);
c.marca('ficha'); await c.foto('36_bo_ficha_entregado');
await c.ir('[data-epi10-region="cabecera-ficha"] [data-epi10-estado]'); await c.pausa(1500);
await c.clic('#tab-documentos'); await c.pausa(2500); c.marca('documentos'); await c.foto('37_bo_ficha_informe');
console.log((await page.locator('[data-epi10-region="cabecera-ficha"]').innerText()).replace(/\n+/g, ' | ').slice(0, 500));
await c.cerrar(join(STATE, 'bo.json')); await b.close();
