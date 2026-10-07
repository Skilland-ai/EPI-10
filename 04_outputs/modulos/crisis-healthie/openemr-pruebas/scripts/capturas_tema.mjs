// Capturas comparables del portal del paciente y del back office de OpenEMR (antes y después del tema EPI10).
// Uso: node capturas_tema.mjs <prefijo> [movil]   (prefijo: antes | despues)
// Entorno: OE_BASE, PORTAL_USER, PORTAL_PASS, PORTAL_EMAIL, OE_USER, OE_PASS. Solo datos ficticios.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'evidencia', 'capturas', 'tema');
mkdirSync(OUT, { recursive: true });
const BASE = (process.env.OE_BASE || 'http://localhost:4896').replace(/\/$/, '');
const prefijo = process.argv[2] || 'antes';
const movil = process.argv[3] === 'movil';
const vp = movil ? { width: 390, height: 844 } : { width: 1366, height: 900 };
const sufijo = movil ? '_movil' : '';
const log = (...a) => console.log(`[${prefijo}]`, ...a);

const browser = await chromium.launch();
const shot = async (page, nombre) => {
  const f = join(OUT, `${prefijo}_${nombre}${sufijo}.png`);
  await page.screenshot({ path: f, fullPage: false });
  log(f.split('/').slice(-1)[0]);
};
const docFrame = (page) => page.frames().find((f) => f.url().includes('onsitedocuments'));

// ---------- Portal del paciente ----------
{
  const ctx = await browser.newContext({ locale: 'es-ES', viewport: vp, isMobile: movil });
  const page = await ctx.newPage();
  page.setDefaultTimeout(45000);
  await page.goto(`${BASE}/portal/index.php?site=default`);
  await page.waitForLoadState('networkidle');
  await shot(page, '01_portal_login');
  await page.fill('#uname', process.env.PORTAL_USER);
  await page.fill('#pass', process.env.PORTAL_PASS);
  if (process.env.PORTAL_EMAIL) await page.fill('#passaddon', process.env.PORTAL_EMAIL).catch(() => {});
  await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }), page.click('button[type=submit]')]);
  await page.waitForTimeout(1500);
  await shot(page, '02_portal_inicio');

  // Documentos y consentimiento
  try {
    await page.locator('#documents-go').first().click();
    await page.waitForTimeout(3500);
    await shot(page, '03_portal_documentos');
    const f = docFrame(page);
    if (f) {
      await f.locator('#dropdownMenu').first().click().catch(() => {});
      await page.waitForTimeout(800);
      await f.locator('a.template-item:has-text("Consentimiento EPI10 Salud")').first().click();
      await page.waitForTimeout(4000);
      await shot(page, '04_portal_consentimiento');
      await f.locator('#dismissOnsiteDocumentButtonTop').first().click().catch(() => {});
      await page.waitForTimeout(3000);
      const f2 = docFrame(page);
      await f2.locator('#dropdownMenu').first().click().catch(() => {});
      await page.waitForTimeout(800);
      await f2.locator('a.template-item:has-text("Hábitos de vida EPI10")').first().click();
      await page.waitForTimeout(6000);
      await shot(page, '05_portal_encuesta');
    }
  } catch (e) { log('documentos/encuesta:', e.message.split('\n')[0]); }

  // Mensajes
  try {
    await page.goto(`${BASE}/portal/home.php`);
    await page.waitForTimeout(1500);
    await page.locator('#messages-go').first().click();
    await page.waitForTimeout(3500);
    await shot(page, '06_portal_mensajes');
  } catch (e) { log('mensajes:', e.message.split('\n')[0]); }

  // Informes descargables
  try {
    await page.goto(`${BASE}/portal/home.php`);
    await page.waitForTimeout(1500);
    if (!(await page.locator('#reports-go').isVisible())) await page.locator('#quickstart_dashboard').click();
    await page.waitForTimeout(1000);
    await page.locator('#reports-go').first().click();
    await page.waitForTimeout(3000);
    await shot(page, '07_portal_informes');
  } catch (e) { log('informes:', e.message.split('\n')[0]); }
  await ctx.close();
}

// ---------- Back office (equipo) ----------
async function backoffice(usuario, clave, etiqueta) {
  const ctx = await browser.newContext({ locale: 'es-ES', viewport: vp });
  const page = await ctx.newPage();
  page.setDefaultTimeout(45000);
  await page.goto(`${BASE}/interface/login/login.php?site=default`);
  await page.waitForLoadState('networkidle');
  if (etiqueta === 'admin') await shot(page, '10_backoffice_login');
  await page.fill('#authUser', usuario);
  await page.fill('#clearPass', clave);
  await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }), page.click('#login-button')]);
  await page.waitForTimeout(5000);
  await shot(page, etiqueta === 'admin' ? '11_backoffice_inicio' : '13_backoffice_operaciones_inicio');
  try {
    const p2 = await ctx.newPage();
    await p2.goto(`${BASE}/interface/patient_file/summary/demographics.php?set_pid=1`);
    await p2.waitForTimeout(6000);
    await p2.screenshot({ path: join(OUT, `${prefijo}_${etiqueta === 'admin' ? '12_backoffice_ficha' : '14_backoffice_operaciones_ficha'}.png`) });
    await p2.close();
  } catch (e) { log('ficha:', e.message.split('\n')[0]); }
  if (etiqueta !== 'admin') {
    try {
      const p3 = await ctx.newPage();
      await p3.goto(`${BASE}/portal/patient/provider`);
      await p3.waitForTimeout(6000);
      await p3.screenshot({ path: join(OUT, `${prefijo}_15_backoffice_operaciones_portal.png`) });
      await p3.close();
    } catch (e) { log('portal dashboard:', e.message.split('\n')[0]); }
  }
  await ctx.close();
}
if (!movil) {
  await backoffice(process.env.OE_USER || 'admin', process.env.OE_PASS, 'admin');
  if (process.env.OPS_PASS) await backoffice('operaciones.prueba', process.env.OPS_PASS, 'operaciones');
}
await browser.close();
