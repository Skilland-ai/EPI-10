// Captura del calendario del back office (área 5, 2.6) e inventario de textos en inglés visibles.
// Entorno: OE_BASE, OE_USER, OE_PASS, PW_MODULES, OUT, PREFIJO (antes|despues). Solo datos ficticios.
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const require = createRequire(join(process.env.PW_MODULES, 'x.js'));
const { chromium } = require('playwright');
const BASE = process.env.OE_BASE || 'http://localhost:4896';
const OUT = process.env.OUT || 'capturas';
const PREFIJO = process.env.PREFIJO || 'antes';
mkdirSync(OUT, { recursive: true });

const INGLES = /\b(Providers?|Day|Week|Month|Today|Search|Add|Clinic|Your|Name|Here|Calendar|In Office|Out Of Office|Office Visit|Established Patient|New Patient|Lunch|Vacation|Holidays|Closed|Reserved|No Show|Group Therapy|Preventive|Health and Behavioral|Ophthalmological|Facility|Patient|Event|Find|Go|Refresh|All|Print|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|January|February|March|April|May|June|July|August|September|October|November|December)\b/g;

const browser = await chromium.launch();
try {
  for (const [ancho, alto, sufijo] of [[1366, 860, 'escritorio'], [390, 844, 'movil']]) {
    const ctx = await browser.newContext({ viewport: { width: ancho, height: alto }, locale: 'es-ES' });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/interface/login/login.php?site=default`);
    await page.fill('#authUser', process.env.OE_USER || 'admin');
    await page.fill('#clearPass', process.env.OE_PASS);
    await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }), page.click('#login-button')]);
    await page.goto(`${BASE}/interface/main/calendar/index.php?module=PostCalendar&viewtype=week&func=view`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: join(OUT, `${PREFIJO}_backoffice_calendario_${sufijo}.png`), fullPage: sufijo === 'escritorio' });
    if (sufijo === 'escritorio') {
      const texto = await page.evaluate(() => document.body.innerText + '\n' + [...document.querySelectorAll('option')].map((o) => o.textContent).join('\n'));
      const ingles = [...new Set(texto.match(INGLES) || [])];
      writeFileSync(join(OUT, `${PREFIJO}_backoffice_calendario_textos.txt`), texto);
      console.log(JSON.stringify({ ingles }));
    }
    await ctx.close();
  }
} finally {
  await browser.close();
}
