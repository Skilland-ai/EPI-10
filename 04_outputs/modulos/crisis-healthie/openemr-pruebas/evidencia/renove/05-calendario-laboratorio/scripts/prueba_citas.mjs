// Prueba E2E del calendario de citas (área 5): entra como Lucía, reserva, ve y cancela; capturas en escritorio y móvil.
// Entorno: OE_BASE (http://localhost:4896), PORTAL_USER, PORTAL_PASS, PORTAL_EMAIL, PW_MODULES (node_modules con playwright),
// OUT (carpeta de capturas), LAB_URL (ruta de la página). Solo datos ficticios.
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const require = createRequire(join(process.env.PW_MODULES, 'x.js'));
const { chromium } = require('playwright');
const BASE = process.env.OE_BASE || 'http://localhost:4896';
const LAB = process.env.LAB_URL || '/interface/modules/custom_modules/epi10-lab-5/public/portal/citas.php';
const OUT = process.env.OUT || 'capturas';
mkdirSync(OUT, { recursive: true });

const resultado = { pasos: [], ingles: [] };
const paso = (nombre, ok, extra = {}) => { resultado.pasos.push({ nombre, ok, ...extra }); console.log(ok ? '✔' : '✘', nombre, JSON.stringify(extra)); };

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 }, locale: 'es-ES' });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.log('pageerror:', e.message));
  page.on('console', (m) => m.type() === 'error' && console.log('console:', m.text()));
  page.on('response', (r) => r.status() >= 400 && console.log('http', r.status(), r.url()));
  await page.goto(`${BASE}/portal/index.php?site=default`);
  await page.fill('#uname', process.env.PORTAL_USER);
  await page.fill('#pass', process.env.PORTAL_PASS);
  if (process.env.PORTAL_EMAIL) await page.fill('#passaddon', process.env.PORTAL_EMAIL).catch(() => {});
  await Promise.all([page.waitForURL(/home\.php/, { timeout: 30000 }), page.click('#submit, button[type=submit]')]);
  paso('login del portal', true);

  // Antes: la tarjeta de citas del núcleo.
  await page.goto(`${BASE}/portal/home.php`);
  await page.waitForLoadState('networkidle');
  const tarjeta = page.locator('#appointments-go');
  if (await tarjeta.count()) {
    await tarjeta.first().click();
    await page.waitForTimeout(1200);
    await page.screenshot({ path: join(OUT, 'antes_portal_citas_escritorio.png'), fullPage: true });
  }

  await page.goto(BASE + LAB);
  console.log('url:', page.url());
  await page.waitForSelector('[data-epi10-citas="calendario"]', { timeout: 20000 });
  await page.waitForTimeout(600);
  const api = await page.evaluate(async () => (await fetch('citas_api.php')).json());
  const dias = Object.keys(api.huecos);
  paso('la API da huecos', dias.length > 0, { dias: dias.length, primero: dias[0], horas: api.huecos[dias[0]]?.length, citas: api.citas.length });
  await page.screenshot({ path: join(OUT, 'despues_01_calendario_escritorio.png'), fullPage: true });

  // Elegir día (el tercero con huecos, dentro del calendario) → hueco → confirmar.
  await page.locator('calendar-month button[part~="con-huecos"]').nth(2).click();
  await page.waitForTimeout(300);
  const chip = page.locator('[data-epi10-citas-hueco]').nth(2);
  const hora = await chip.getAttribute('data-epi10-citas-hueco');
  await chip.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: join(OUT, 'despues_02_hueco_elegido_escritorio.png'), fullPage: true });
  await page.click('[data-epi10-citas="confirmar"]');
  await page.waitForSelector('[data-epi10-citas="reservada"]', { timeout: 15000 });
  const tras = await page.evaluate(async () => (await fetch('citas_api.php')).json());
  paso('reserva creada', tras.citas.length === 1 && tras.citas[0].hora === hora, { cita: tras.citas[0] });
  resultado.eid = tras.citas[0]?.id;
  await page.screenshot({ path: join(OUT, 'despues_03_reservada_escritorio.png'), fullPage: true });

  // Una segunda reserva se rechaza (máximo una cita futura).
  const segunda = await page.evaluate(async ({ d, csrf }) => {
    const r = await fetch('citas_api.php', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf },
      body: JSON.stringify({ accion: 'reservar', fecha: d, hora: '10:00' }) });
    return { estado: r.status, cuerpo: await r.json() };
  }, { d: dias[dias.length - 1], csrf: JSON.parse(await page.getAttribute('[data-epi10-isla]', 'data-props')).csrf });
  paso('segunda reserva rechazada', segunda.estado === 409 && segunda.cuerpo.error === 'ya_tienes_cita', segunda);

  // Sin token CSRF, 403.
  const sinCsrf = await page.evaluate(async () => (await fetch('citas_api.php', { method: 'POST', body: '{"accion":"cancelar","id":1}' })).status);
  paso('escritura sin CSRF rechazada', sinCsrf === 403, { estado: sinCsrf });

  // Móvil: misma sesión, 390 px.
  const movil = await ctx.newPage();
  await movil.setViewportSize({ width: 390, height: 844 });
  await movil.goto(BASE + LAB);
  await movil.waitForSelector('[data-epi10-citas="mi-cita"]', { timeout: 20000 });
  await movil.waitForTimeout(500);
  await movil.screenshot({ path: join(OUT, 'despues_04_mi_cita_movil.png'), fullPage: true });
  const anchoDesborda = await movil.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  paso('sin scroll horizontal en móvil', !anchoDesborda);

  // Cancelar desde el calendario.
  await page.click('[data-epi10-citas="cancelar"]');
  await page.screenshot({ path: join(OUT, 'despues_05_cancelar_confirmacion_escritorio.png'), fullPage: true });
  await page.click('[data-epi10-citas="confirmar-cancelacion"]');
  await page.waitForSelector('.epi-cal-alerta.is-ok', { timeout: 15000 });
  const fin = await page.evaluate(async () => (await fetch('citas_api.php')).json());
  paso('cita cancelada', fin.citas.length === 0);
  await page.screenshot({ path: join(OUT, 'despues_06_cancelada_escritorio.png'), fullPage: true });

  // Móvil con un día elegido (huecos).
  await movil.reload();
  await movil.waitForSelector('[data-epi10-citas-hueco]', { timeout: 20000 });
  await movil.screenshot({ path: join(OUT, 'despues_07_huecos_movil.png'), fullPage: true });
  await movil.locator('[data-epi10-citas-hueco]').nth(1).click();
  await movil.waitForTimeout(500);
  await movil.screenshot({ path: join(OUT, 'despues_08_confirmar_movil.png') });

  // Detector de inglés: textos visibles, incluidos los del web component.
  const textos = await page.evaluate(() => {
    const out = [document.body.innerText];
    document.querySelectorAll('calendar-date, calendar-month').forEach((el) => el.shadowRoot && out.push(el.shadowRoot.textContent));
    document.querySelectorAll('calendar-month').forEach((el) => el.shadowRoot?.querySelectorAll('[aria-label]').forEach((b) => out.push(b.getAttribute('aria-label'))));
    return out.join('\n');
  });
  resultado.ingles = [...new Set(textos.match(/\b(Previous|Next|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|January|February|March|April|May|June|July|August|September|October|November|December|Cancel|Appointment|Schedule)\b/g) || [])];
  paso('sin textos en inglés', resultado.ingles.length === 0, { ingles: resultado.ingles });
} catch (e) {
  paso('excepción', false, { error: e.message.split('\n')[0] });
} finally {
  await browser.close();
  console.log(JSON.stringify(resultado));
}
