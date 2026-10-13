import { createRequire } from 'node:module';
const { chromium } = createRequire('/home/reboot/.npm/_npx/9833c18b2d85bc59/node_modules/x.js')('playwright');
const OUT = process.argv[2];
const b = await chromium.launch({ executablePath: '/home/reboot/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell' });
const res = [];
for (const [vp, w, h] of [['1366', 1366, 760], ['390', 390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: vp === '390' ? 2 : 1 });
  for (const v of ['inicio', 'mis-documentos', 'tarea', 'mi-informe', 'biblioteca-documento', 'mensajes']) {
    await p.goto(`http://127.0.0.1:8772/portal/${v}.html`); await p.waitForTimeout(150);
    const info = await p.evaluate(() => {
      const a = document.querySelector('.epi-miga__volver'); const r = a && a.getBoundingClientRect();
      const act = document.querySelector('.epi-miga__tramo--actual'); 
      return { volver: a ? a.getAttribute('href') : null, alto: r ? r.height : null, scrollX: document.documentElement.scrollWidth > innerWidth,
        actualVisible: act ? getComputedStyle(act).display !== 'none' : null, visibles: [...document.querySelectorAll('.epi-miga__tramo')].filter(e => getComputedStyle(e).display !== 'none').map(e => e.textContent.trim()) };
    });
    res.push({ vp, v, ...info });
    await p.screenshot({ path: `${OUT}/${vp}_${v}.png`, clip: { x: 0, y: 0, width: w, height: vp === '390' ? 300 : 260 } });
  }
}
console.log(JSON.stringify(res, null, 1)); await b.close();
