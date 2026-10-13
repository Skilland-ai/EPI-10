// Rótulos del spot como PNG 1280×720 con transparencia (Manrope, colores EPI10): faldón por escena y tarjetas de inicio y cierre.
import { chromium, OUT } from './lib.mjs';
import { readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
const escenas = JSON.parse(readFileSync(join(OUT, 'escenas.json'), 'utf8'));
const DIR = join(OUT, 'rotulos'); mkdirSync(DIR, { recursive: true });
const datos = (n, tipo) => `data:${tipo};base64,` + readFileSync(join(OUT, 'fuentes', n)).toString('base64');
const F = (n) => datos(n, 'font/woff2');
const css = `@font-face{font-family:M;font-weight:500;src:url(${F('manrope-latin-500-normal.woff2')})}
@font-face{font-family:M;font-weight:700;src:url(${F('manrope-latin-700-normal.woff2')})}
*{margin:0;box-sizing:border-box} html,body{width:1280px;height:720px;background:transparent;font-family:M,sans-serif}
.faldon{position:absolute;left:40px;bottom:40px;max-width:760px;background:rgba(11,27,61,.94);border-radius:18px;padding:18px 26px 20px 22px;
  box-shadow:0 10px 30px rgba(11,27,61,.35);display:flex;gap:16px;align-items:stretch}
.barra{width:5px;border-radius:3px;background:#4DA9D9}
.ceja{font-weight:700;font-size:15px;letter-spacing:.14em;text-transform:uppercase;color:#7FC4E8;margin-bottom:6px}
.titular{font-weight:700;font-size:36px;line-height:1.12;color:#fff;letter-spacing:-.01em}
.marca{position:absolute;right:28px;top:22px;background:rgba(255,255,255,.96);border-radius:999px;padding:9px 16px;box-shadow:0 4px 14px rgba(11,27,61,.18)}
.marca img{height:22px;display:block}
.tarjeta{position:absolute;inset:0;background:#0B1B3D;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#fff}
.tarjeta::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 30% 20%,rgba(77,169,217,.28),transparent 55%),radial-gradient(circle at 80% 90%,rgba(27,73,184,.45),transparent 60%)}
.tarjeta > *{position:relative} .tarjeta img{height:84px;filter:brightness(0) invert(1);margin-bottom:38px}
.tarjeta h1{font-weight:700;font-size:58px;letter-spacing:-.02em;max-width:1000px;line-height:1.08}
.tarjeta p{font-weight:500;font-size:26px;color:#B6C4DE;margin-top:18px}
.tarjeta .nota{position:absolute;bottom:34px;font-size:16px;color:#8FA3C6;letter-spacing:.06em}
.linea{width:120px;height:4px;border-radius:2px;background:#4DA9D9;margin:30px auto 0}`;
const logo = datos('epi10-logo.png', 'image/png');
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
let n = 0;
for (const e of escenas) {
  let html;
  if (e.tipo === 'tarjeta') html = `<div class="tarjeta"><img src="${logo}"><h1>${e.titulo}</h1><p>${e.sub}</p><div class="linea"></div>${e.nota ? `<div class="nota">${e.nota}</div>` : ''}</div>`;
  else { n++; html = `<div class="marca"><img src="${logo}"></div><div class="faldon"><div class="barra"></div><div><div class="ceja">${String(n).padStart(2, '0')} · ${e.entorno}</div><div class="titular">${e.rotulo}</div></div></div>`; }
  await p.setContent(`<html><head><style>${css}</style></head><body>${html}</body></html>`, { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: join(DIR, e.id + '.png'), omitBackground: e.tipo !== 'tarjeta' });
}
await b.close(); console.log('rótulos:', escenas.length);
