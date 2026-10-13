// Tramo 8b: pantalla de informes → borrador listo → subir el informe final → confirmar → «Validar y publicar».
import { abrirNavegador, clip, STATE, OE, OUT, estado } from './lib.mjs';
import { join } from 'node:path';
const b = await abrirNavegador();
const c = await clip(b, '09_informes_publicar', { storage: join(STATE, 'bo.json') }); const { page } = c;
await page.goto(`https://localhost:4893/informes/casos/${estado('caso')}`, { waitUntil: 'networkidle' }); await c.pausa(1500);
c.marca('borrador'); await c.ir('text=Descargar borrador (Word)'); await c.pausa(1500);
await c.ir('text=3. Validar y publicar'); await c.pausa(800);
await page.setInputFiles('#final', join(OUT, 'pdf', 'informe-final-spot.pdf')); await c.pausa(1000);
await c.clic('#confirmo'); await c.pausa(1000); c.marca('validar'); await c.foto('32_informes_validar');
await Promise.all([page.waitForLoadState('networkidle'), c.clic('button:has-text("Validar y publicar")')]);
for (let i = 0; i < 20; i++) { await page.waitForTimeout(2000); if (/publicad/i.test(await page.locator('body').innerText())) break; if (i % 4 === 3) await page.reload({ waitUntil: 'networkidle' }); }
await c.pausa(2500); c.marca('publicado'); await c.foto('33_informes_publicado');
console.log((await page.locator('body').innerText()).slice(0, 1200));
await c.cerrar(join(STATE, 'bo.json')); await b.close();
