// Tramo 8a: ficha de Marta (Entregable disponible) → «Preparar el informe de Marta» → pantalla de informes → subir el entregable → borrador.
import { abrirNavegador, clip, STATE, OE, UI, OUT, estado } from './lib.mjs';
import { join } from 'node:path';
const b = await abrirNavegador();
const c = await clip(b, '08_informes_subir', { storage: join(STATE, 'bo.json') }); const { page } = c;
await page.goto(`${OE}${UI}/backoffice/ficha.php?set_pid=${estado('pid')}`, { waitUntil: 'networkidle' }); await c.pausa(2000);
c.marca('ficha'); await c.foto('29_bo_ficha_entregable');
const a = page.locator('[data-epi10-region=guia-aitor] a:has-text("Preparar el informe")').first();
await c.ir(a); await c.pausa(800);
await page.goto(new URL(await a.getAttribute('href'), OE).href, { waitUntil: 'networkidle' }); await c.pausa(2000);
c.marca('pantalla'); await c.foto('30_informes_caso');
await c.ir('text=Elige o arrastra aquí el PDF'); await page.setInputFiles('#entregable', join(OUT, 'pdf', 'entregable-laboratorio-spot.pdf'));
await c.pausa(1200); c.marca('elegido');
await Promise.all([page.waitForLoadState('networkidle'), c.clic('button:has-text("Subir y generar borrador")')]);
for (let i = 0; i < 30; i++) { await page.waitForTimeout(2000);
  const t = await page.locator('body').innerText(); if (/borrador/i.test(t) && /(validar|Validar|descargar|Descargar)/.test(t)) break;
  if (i % 3 === 2) await page.reload({ waitUntil: 'networkidle' }); }
await c.pausa(1500); c.marca('borrador'); await c.foto('31_informes_borrador');
console.log((await page.locator('main, body').first().innerText()).slice(0, 1500));
console.log(await page.evaluate(() => [...document.querySelectorAll('a,button,input:not([type=hidden]),form,textarea')].map(e => e.tagName + ' ' + [...e.attributes].filter(a => !['style', 'class'].includes(a.name)).map(a => a.name + '=' + a.value.slice(0, 70)).join(' ') + ' | ' + (e.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 50)).join('\n')));
await c.cerrar(join(STATE, 'bo.json')); await b.close();
