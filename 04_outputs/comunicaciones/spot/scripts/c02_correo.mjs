// Tramo 2: Mailpit → correo «Tu espacio EPI10 Salud ya está listo» → «Entrar en mi espacio» → primer acceso al portal.
// El enlace lleva un token de un solo uso: se difumina en pantalla (CSS dentro del correo) y nunca se imprime.
import { abrirNavegador, clip, MARTA, STATE, estado } from './lib.mjs';
import { join } from 'node:path';
const b = await abrirNavegador();
const c = await clip(b, '02_correo_acceso'); const { page } = c;
await page.goto('http://localhost:4895/search?q=' + encodeURIComponent('to:' + MARTA.email), { waitUntil: 'networkidle' });
await c.pausa(1500); c.marca('buzon');
await c.clic(`.message:has-text("Tu espacio EPI10"), a:has-text("Tu espacio EPI10")`);
await page.waitForTimeout(2500);
const fr = page.frameLocator('iframe#preview-html, iframe').first();
const frame = page.frames().find((f) => f !== page.mainFrame());
const difuminar = async () => { for (const f of page.frames()) await f.evaluate(() => {
  const st = document.createElement('style'); st.textContent = '.__blur{filter:blur(6px)!important}'; document.head?.appendChild(st);
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); const ns = [];
  while (w.nextNode()) if (/service_auth|https?:\/\//.test(w.currentNode.nodeValue)) ns.push(w.currentNode);
  for (const n of ns) { const s = document.createElement('span'); s.className = '__blur'; n.parentNode.replaceChild(s, n); s.appendChild(n); }
}).catch(() => {}); };
await difuminar(); await c.pausa(500);
c.marca('correo'); await c.foto('05_correo'); await c.pausa(2000);
// Enlace del botón (sin imprimirlo)
let href = null;
for (const f of page.frames()) { if (!(await f.locator('a:has-text("Entrar en mi espacio")').count())) continue; href = await f.locator('a:has-text("Entrar en mi espacio")').first().getAttribute('href').catch(() => null); if (href) { await c.ir(f.locator('a:has-text("Entrar en mi espacio")').first()); break; } }
if (!href) throw new Error('No encuentro el botón «Entrar en mi espacio»');
await c.pausa(1200); // Sin clic real: el botón abre otra pestaña y el enlace es de un solo uso.
c.marca('entrar');
await page.goto(href.replace(/&amp;/g, '&'), { waitUntil: 'load' });
await page.waitForURL(/home\.php|onboarding|password|index\.php\?site=default&oi/, { timeout: 45000 }).catch(() => {});
await page.waitForLoadState('networkidle').catch(() => {});
await c.pausa(2500); c.marca('portal:' + page.url().replace(/service_auth=[^&]+/, 'service_auth=…'));
await c.foto('06_portal_primero');
console.log((await page.locator('body').innerText()).slice(0, 1200));
console.log(await page.evaluate(() => [...document.querySelectorAll('input,button,a[data-epi10-accion]')].map(e => `${e.tagName} id=${e.id} name=${e.name} type=${e.type} ${(e.innerText||'').trim().slice(0,30)}`).join('\n')));
await c.cerrar(join(STATE, 'portal.json')); await b.close();
