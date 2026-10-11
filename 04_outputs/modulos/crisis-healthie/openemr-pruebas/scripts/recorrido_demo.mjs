// Recorrido final de la demo del renove (SKI2-230): portal de Lucía y back office de operaciones.prueba y admin,
// en escritorio (1366 px) y móvil (390 px), con capturas y una tabla de comprobaciones en Markdown.
// Uso: node recorrido_demo.mjs <carpeta-capturas> > informe.md      (desde esta carpeta: usa su node_modules/playwright)
// Entorno: OE_BASE (http://localhost:4896), PORTAL_PASS (lucia), OE_PASS (admin), OPS_PASS (operaciones.prueba).
// Solo datos ficticios. Sale con código 1 si alguna comprobación falla.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT = process.argv[2] || 'capturas-demo';
mkdirSync(OUT, { recursive: true });
const BASE = (process.env.OE_BASE || 'http://localhost:4896').replace(/\/$/, '');
const UI = '/interface/modules/custom_modules/oe-module-epi10-ui/public';
const VPS = [['escritorio', { width: 1366, height: 900 }, false], ['movil', { width: 390, height: 844 }, true]];
const filas = [];
let fallos = 0;
const ok = (cara, vp, que, bien, detalle = '') => { filas.push([cara, vp, que, bien ? '✅' : '❌', detalle]); if (!bien) fallos++; };
// Informativo: se anota pero no cuenta como fallo (p. ej. el menú completo de admin, que no es la persona de la demo).
const info = (cara, vp, que, bien, detalle = '') => filas.push([cara, vp, que, bien ? '✅' : 'ℹ️', detalle]);

async function nuevaPagina(browser, viewport, isMobile) {
  const ctx = await browser.newContext({ locale: 'es-ES', viewport, isMobile, hasTouch: isMobile });
  const page = await ctx.newPage();
  page.setDefaultTimeout(30000);
  const errores = [];
  page.on('pageerror', (e) => errores.push('JS: ' + e.message.split('\n')[0]));
  page.on('response', (r) => { if (r.status() >= 500) errores.push(r.status() + ' ' + r.url().replace(BASE, '')); });
  return { ctx, page, errores };
}
const sinDesborde = (page) => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1);
const vista = (page) => page.evaluate(() => document.body?.dataset?.epi10Vista || document.querySelector('[data-epi10-vista]')?.dataset?.epi10Vista || '');
const foto = async (page, nombre, sufijo) => { await page.waitForTimeout(500); await page.screenshot({ path: join(OUT, `${nombre}${sufijo}.png`) }); };

const browser = await chromium.launch();
for (const [vp, viewport, isMobile] of VPS) {
  const sufijo = vp === 'movil' ? '_movil' : '';

  // ───────── Portal · Lucía ─────────
  {
    const { ctx, page, errores } = await nuevaPagina(browser, viewport, isMobile);
    await page.goto(`${BASE}/portal/index.php?site=default`, { waitUntil: 'networkidle' });
    ok('Portal', vp, 'Login con el shell EPI10', (await vista(page)) === 'login-portal', await vista(page));
    ok('Portal', vp, 'Login sin pedir correo', !(await page.locator('#passaddon').isVisible().catch(() => false)));
    await foto(page, '01_portal_login', sufijo);
    await page.fill('#uname', 'lucia');
    await page.fill('#pass', process.env.PORTAL_PASS || '');
    await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }), page.click('form[action="get_patient_info.php"] button[type=submit]')]);
    await page.waitForTimeout(1200);
    ok('Portal', vp, 'Entra al inicio', page.url().includes('/portal/home.php'), page.url().replace(BASE, ''));
    ok('Portal', vp, 'Cabecera EPI10 y saludo', (await page.locator('#topNav.epi-header').count()) === 1 && /Hola/.test(await page.locator('.epi-eyebrow').first().textContent().catch(() => '')));
    ok('Portal', vp, 'Inicio sin desbordar', await sinDesborde(page));
    await foto(page, '02_portal_inicio', sufijo);
    await page.locator('[data-epi10-accion="abrir-menu-usuario"]').click();
    ok('Portal', vp, 'Menú de usuario: Ajustes, Ayuda y Cerrar sesión', (await page.locator('#epi10-menu-usuario .epi-menu__item:visible').count()) === 3);
    await foto(page, '03_portal_menu_usuario', sufijo);
    await page.keyboard.press('Escape');

    for (const [id, vistaEsperada, isla] of [['documents-go', 'mis-documentos', 'tareas'], ['appointments-go', 'citas', 'calendario'],
      ['messages-go', 'mensajes', 'chat'], ['reports-go', 'mi-informe', null]]) {
      await page.goto(`${BASE}/portal/home.php`, { waitUntil: 'networkidle' });
      const volver = page.locator('#quickstart_dashboard');
      if (await volver.isVisible().catch(() => false)) { await volver.click(); await page.waitForTimeout(600); }
      await page.locator('#' + id).click();
      await page.waitForLoadState('networkidle'); await page.waitForTimeout(1500);
      const v = await vista(page);
      const montada = isla ? await page.locator(`[data-epi10-isla="${isla}"][data-epi10-isla-montada="si"]`).count() : 1;
      ok('Portal', vp, `Tarjeta ${id} → ${vistaEsperada}${isla ? ' (isla ' + isla + ')' : ''}`, v === vistaEsperada && montada > 0, `vista=${v}`);
      ok('Portal', vp, `${vistaEsperada} sin desbordar`, await sinDesborde(page));
      await foto(page, `04_portal_${vistaEsperada}`, sufijo);
    }
    await page.goto(`${BASE}/portal/home.php`, { waitUntil: 'networkidle' }); await page.waitForTimeout(800);
    ok('Portal', vp, 'Vuelta al inicio muestra el panel', await page.locator('#documents-go').isVisible());
    ok('Portal', vp, 'Sin errores de JS ni 5xx', errores.length === 0, errores.slice(0, 3).join(' · '));
    await ctx.close();
  }

  // ───────── Portal · primer acceso (sin sesión) ─────────
  {
    const { ctx, page } = await nuevaPagina(browser, viewport, isMobile);
    await page.goto(`${BASE}/portal/index.php?site=default&password_update=1`, { waitUntil: 'networkidle' });
    const texto = await page.locator('.epi-auth__card').innerText().catch(() => '');
    ok('Portal', vp, 'Primer acceso en español', (await vista(page)) === 'primer-acceso-portal' && !/Account Name|New Password|Cancel\b/.test(texto));
    await foto(page, '05_portal_primer_acceso', sufijo);
    await ctx.close();
  }

  // ───────── Back office · operaciones.prueba (y admin en escritorio) ─────────
  for (const [usuario, clave] of [['operaciones.prueba', process.env.OPS_PASS], ...(vp === 'escritorio' ? [['admin', process.env.OE_PASS]] : [])]) {
    if (!clave) { ok('Back office', vp, `${usuario}: sin contraseña en el entorno`, false); continue; }
    const { ctx, page, errores } = await nuevaPagina(browser, viewport, isMobile);
    const quien = usuario === 'admin' ? 'admin' : 'ops';
    await page.goto(`${BASE}/interface/login/login.php?site=default`, { waitUntil: 'networkidle' });
    if (usuario !== 'admin') {
      ok('Back office', vp, 'Login con el shell EPI10', (await vista(page)) === 'login-backoffice');
      await foto(page, '10_backoffice_login', sufijo);
    }
    await page.fill('#authUser', usuario); await page.fill('#clearPass', clave);
    await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {}), page.click('#login-button')]);
    await page.waitForTimeout(4000);
    const inicio = page.frames().find((f) => f.url().includes('/backoffice/inicio.php'));
    ok('Back office', vp, `${usuario}: primera pestaña = inicio EPI10 (no el calendario)`, !!inicio);
    (usuario === 'admin' ? info : ok)('Back office', vp, `${usuario}: main.php sin desbordar`, await sinDesborde(page),
      usuario === 'admin' ? 'menú completo de OpenEMR (decisión del área 7: admin lo conserva)' : '');
    await foto(page, `11_backoffice_inicio_${quien}`, sufijo);
    if (usuario !== 'admin') {
      for (const [ruta, nombre] of [['clientes.php', 'clientes'], ['ficha.php?set_pid=1', 'ficha'], ['mensajes.php', 'mensajes'], ['kit.php', 'kit']]) {
        const r = await page.goto(`${BASE}${UI}/backoffice/${ruta}`, { waitUntil: 'networkidle' }).catch(() => null);
        await page.waitForTimeout(1200);
        ok('Back office', vp, `${nombre}: carga con EPI10 UI`, !!r && r.status() === 200 && (await vista(page)) !== '', `HTTP ${r ? r.status() : '—'} · vista=${await vista(page)}`);
        ok('Back office', vp, `${nombre}: sin desbordar`, await sinDesborde(page));
        await foto(page, `12_backoffice_${nombre}`, sufijo);
      }
      const cal = await page.goto(`${BASE}/interface/main/calendar/index.php`, { waitUntil: 'networkidle' }).catch(() => null);
      ok('Back office', vp, 'Calendario del núcleo carga', !!cal && cal.status() === 200);
    }
    ok('Back office', vp, `${usuario}: sin errores de JS ni 5xx`, errores.length === 0, errores.slice(0, 3).join(' · '));
    await ctx.close();
  }
}
await browser.close();

console.log(`| Cara | Pantalla | Comprobación | Resultado | Detalle |\n|---|---|---|---|---|`);
for (const f of filas) console.log(`| ${f.join(' | ')} |`);
console.log(`\n**${fallos} fallos en ${filas.filter((f) => f[3] !== 'ℹ️').length} comprobaciones bloqueantes** (más ${filas.filter((f) => f[3] === 'ℹ️').length} informativas). Capturas en \`${OUT}\`.`);
process.exit(fallos ? 1 : 0);
