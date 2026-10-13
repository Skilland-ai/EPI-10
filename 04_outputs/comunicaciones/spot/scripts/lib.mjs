// Utilidades de grabación del spot (SKI2-277): un clip por tramo, cursor visible, scroll suave y marcas de tiempo.
import { createRequire } from 'node:module';
import { mkdirSync, renameSync, writeFileSync, readdirSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
const require = createRequire((process.env.PW_DIR || '/home/reboot/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10-project/EPI-10/04_outputs/modulos/crisis-healthie/openemr-pruebas/scripts') + '/');
export const { chromium } = require('playwright');
export const OUT = process.env.SPOT_OUT || new URL('..', import.meta.url).pathname;
export const CLIPS = join(OUT, 'clips'); export const SHOTS = join(OUT, 'shots'); export const STATE = join(OUT, 'state');
for (const d of [CLIPS, SHOTS, STATE]) mkdirSync(d, { recursive: true });
export const VP = { width: 1280, height: 720 };
export const MARTA = { nombre: 'Marta Spot Ficticia', email: process.env.MARTA_EMAIL || 'marta.spot@correo-ficticio.test', tel: '600000000',
  calle: 'Calle Falsa 1', cp: '28001', ciudad: 'Madrid', pass: 'Marta-Spot-2026' };
export const OE = 'http://localhost:4896', UI = '/interface/modules/custom_modules/oe-module-epi10-ui/public';
export const env = (k) => { const v = process.env[k]; if (!v) throw new Error('Falta ' + k); return v; };
export const estado = (k, v) => { const f = join(STATE, 'estado.json'); const e = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : {};
  if (v === undefined) return e[k]; e[k] = v; writeFileSync(f, JSON.stringify(e, null, 2)); return v; };

const CURSOR = `(() => { const pon = () => { if (document.getElementById('__cur') || !document.body) return;
  const c = document.createElement('div'); c.id = '__cur';
  c.style.cssText = 'position:fixed;left:-50px;top:-50px;width:22px;height:22px;z-index:2147483647;pointer-events:none;transition:transform .12s;';
  c.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M3 2l7 19 2.5-7.5L20 11z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  document.body.appendChild(c);
  const x = sessionStorage.getItem('__cx'), y = sessionStorage.getItem('__cy'); if (x) { c.style.left = x + 'px'; c.style.top = y + 'px'; } };
  addEventListener('mousemove', (e) => { pon(); const c = document.getElementById('__cur'); if (!c) return; c.style.left = e.clientX - 3 + 'px'; c.style.top = e.clientY - 2 + 'px';
    try { sessionStorage.setItem('__cx', e.clientX - 3); sessionStorage.setItem('__cy', e.clientY - 2); } catch {} }, true);
  addEventListener('mousedown', () => { const c = document.getElementById('__cur'); if (c) c.style.transform = 'scale(.8)'; }, true);
  addEventListener('mouseup', () => { const c = document.getElementById('__cur'); if (c) c.style.transform = ''; }, true);
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', pon); else pon(); })();`;

export async function abrirNavegador() { return chromium.launch(); }

// Un clip = un contexto con vídeo. Al cerrar, renombra el vídeo a clips/<nombre>.webm y guarda las marcas.
export async function clip(browser, nombre, { storage, extra = {} } = {}) {
  const dir = join(CLIPS, '_tmp_' + nombre); mkdirSync(dir, { recursive: true });
  const ctx = await browser.newContext({ viewport: VP, locale: 'es-ES', timezoneId: 'Europe/Madrid', ignoreHTTPSErrors: true,
    recordVideo: { dir, size: VP }, storageState: storage && existsSync(storage) ? storage : undefined, ...extra });
  await ctx.addInitScript(CURSOR);
  const page = await ctx.newPage(); page.setDefaultTimeout(45000);
  const t0 = Date.now(); const marcas = [];
  const h = {
    ctx, page,
    marca: (m) => { marcas.push([((Date.now() - t0) / 1000).toFixed(2), m]); console.log(`[${nombre}] ${((Date.now() - t0) / 1000).toFixed(1)}s ${m}`); },
    pausa: (ms = 1500) => page.waitForTimeout(ms),
    async ir(sel, opts = {}) { const p = opts.page || page; const l = typeof sel === 'string' ? p.locator(sel).first() : sel;
      await l.scrollIntoViewIfNeeded().catch(() => {}); const b = await l.boundingBox(); if (!b) return l;
      await (opts.page || page).mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 18 }); await page.waitForTimeout(250); return l; },
    async clic(sel, opts = {}) { const l = await h.ir(sel, opts); await l.click(opts.click); },
    async escribir(sel, texto, delay = 45) { const l = await h.ir(sel); await l.click(); await l.pressSequentially(texto, { delay }); },
    async scroll(px, pasos = 30, p = page) { for (let i = 0; i < pasos; i++) { await p.mouse.wheel(0, px / pasos); await p.waitForTimeout(25); } },
    async foto(n, p = page) { await p.screenshot({ path: join(SHOTS, n + '.png') }); },
    async cerrar(guardar) { if (guardar) await ctx.storageState({ path: guardar });
      const v = page.video(); await ctx.close(); const src = v ? await v.path() : null;
      if (src) renameSync(src, join(CLIPS, nombre + '.webm'));
      writeFileSync(join(CLIPS, nombre + '.marcas.json'), JSON.stringify(marcas, null, 1)); },
  };
  return h;
}
