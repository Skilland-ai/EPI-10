// Prueba E2E del laboratorio del área 4 (SKI2-234) contra la instancia de hermes-node. Solo datos ficticios.
// Uso (desde una carpeta con node_modules/playwright):
//   OE_BASE=http://localhost:4896 PORTAL_USER=lucia PORTAL_PASS=… PORTAL_EMAIL=… OE_PASS=… PID_PUBLICAR=12 \
//   node lab/area-4/pruebas/biblioteca_e2e.mjs <carpeta de capturas> <pdf ficticio para subir>
// Portal: Lucía (pid 1) con un informe publicado por el contrato. Back office: admin; publica en PID_PUBLICAR (ficticia).
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = (process.env.OE_BASE || 'http://localhost:4896').replace(/\/$/, '');
// MODO=lab (por defecto): /portal/epi10-lab-4/. MODO=modulo: las páginas instaladas en oe-module-epi10-ui (fase B).
const MOD = `${BASE}/interface/modules/custom_modules/oe-module-epi10-ui/public`;
const U = process.env.MODO === 'modulo'
  ? { biblioteca: `${MOD}/portal/biblioteca.php`, pdf: `${MOD}/portal/biblioteca-pdf.php`, novedades: `${MOD}/portal/api/biblioteca-novedades.php`, ficha: `${MOD}/backoffice/ficha-documentos.php`, volverA: '/portal/biblioteca.php' }
  : { biblioteca: `${BASE}/portal/epi10-lab-4/index.php`, pdf: `${BASE}/portal/epi10-lab-4/pdf.php`, novedades: `${BASE}/portal/epi10-lab-4/novedades.php`, ficha: `${BASE}/portal/epi10-lab-4/equipo/documentos.php`, volverA: '/epi10-lab-4/index.php' };
const SALIDA = process.argv[2] || 'capturas-area-4';
const PDF_SUBIR = process.argv[3];
const PID_PUBLICAR = process.env.PID_PUBLICAR || '12';
fs.mkdirSync(SALIDA, { recursive: true });

const resultados = [];
const ok = (cond, texto) => { resultados.push([!!cond, texto]); console.log(`${cond ? 'OK  ' : 'FALLO'} ${texto}`); };
const shot = (page, nombre, full = false) => page.screenshot({ path: path.join(SALIDA, `${nombre}.png`), fullPage: full });
const sinScrollHorizontal = (page) => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
const INGLES = /\b(Download|Medical Record|Documents|Back|Cancel|Upload|Submit|Save|Loading|Page|of)\b/;

const navegador = await chromium.launch();
const errores = [];

async function portal(movil) {
  const sufijo = movil ? 'movil' : 'escritorio';
  const ctx = await navegador.newContext({ locale: 'es-ES', viewport: movil ? { width: 390, height: 844 } : { width: 1366, height: 900 }, isMobile: movil, hasTouch: movil, acceptDownloads: true });
  const page = await ctx.newPage();
  page.setDefaultTimeout(45000);
  page.on('pageerror', (e) => errores.push(`portal ${sufijo}: ${e.message}`));
  await page.goto(`${BASE}/portal/index.php?site=default`, { waitUntil: 'networkidle' });
  await page.fill('#uname', process.env.PORTAL_USER || 'lucia');
  await page.fill('#pass', process.env.PORTAL_PASS || '');
  if (process.env.PORTAL_EMAIL) await page.fill('#passaddon', process.env.PORTAL_EMAIL).catch(() => {});
  await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }), page.click('form[action="get_patient_info.php"] button[type=submit]')]);

  if (!movil) {
    // Antes: «Mi informe» del núcleo (menú con «Resumen de mi historial») y la página del contrato 1.0.0.
    const tarjeta = page.locator('#reports-go');
    if (await tarjeta.count()) { await tarjeta.first().click(); await page.waitForTimeout(800); await shot(page, `antes_mi_informe_menu_${sufijo}`); }
    await page.goto(`${BASE}/interface/modules/custom_modules/oe-module-epi10/public/portal/informes.php`, { waitUntil: 'networkidle' });
    await shot(page, `antes_informes_contrato_${sufijo}`);
  }

  await page.goto(U.biblioteca, { waitUntil: 'networkidle' });
  ok(await page.locator('body[data-epi10-vista="mi-informe"], body[data-epi10-vista="mis-documentos"]').count() === 1, `[${sufijo}] la biblioteca carga con la base EPI10 UI`);
  const items = page.locator('[data-epi10-lista="documentos"] [data-epi10-item]');
  const ids = await items.evaluateAll((els) => els.map((e) => e.getAttribute('data-epi10-item')));
  ok(ids.length >= 1, `[${sufijo}] hay al menos un documento publicado (${ids.join(', ')})`);
  ok(!ids.some((i) => ['4', '5', '6', '17', '18', '19', '20'].includes(i)), `[${sufijo}] R4: no aparece ningún documento no publicado de la ficha`);
  const id = ids[0];
  ok(await page.locator('[data-epi10-volver]').count() === 1, `[${sufijo}] hay «volver» al inicio`);
  ok(await sinScrollHorizontal(page), `[${sufijo}] biblioteca sin scroll horizontal`);
  ok(!INGLES.test(await page.locator('main').innerText()), `[${sufijo}] biblioteca sin textos en inglés`);
  await shot(page, `despues_biblioteca_${sufijo}`, true);

  const nov = await page.request.get(U.novedades);
  ok(nov.ok() && typeof (await nov.json()).total === 'number', `[${sufijo}] API de novedades responde JSON`);

  const ajeno = await page.request.get(`${U.pdf}?id=4`);
  ok(ajeno.status() === 404, `[${sufijo}] R4: pdf.php de un documento no publicado da 404`);
  const inline = await page.request.get(`${U.pdf}?id=${id}`);
  ok(inline.ok() && inline.headers()['content-type'] === 'application/pdf' && inline.headers()['content-disposition'].startsWith('inline'), `[${sufijo}] PDF en línea para el visor`);

  await Promise.all([page.waitForNavigation(), page.locator(`[data-epi10-lista="documentos"] [data-epi10-item="${id}"] a`).click()]);
  await page.waitForSelector('[data-epi10-visor-estado="listo"]');
  await page.waitForFunction(() => { const c = document.querySelector('[data-epi10-pagina="1"] canvas'); return c && c.width > 0; });
  await page.waitForTimeout(800);
  const paginas = await page.locator('[data-epi10-pagina]').count();
  ok(paginas >= 1, `[${sufijo}] el visor pinta el PDF (${paginas} páginas)`);
  ok(await page.locator('[data-epi10-visor-pagina]').innerText() === `1 / ${paginas}`, `[${sufijo}] indicador de página`);
  ok(await page.locator('[data-epi10-volver]').getAttribute('href').then((h) => h.endsWith(U.volverA)), `[${sufijo}] «volver» lleva a Mi informe`);
  ok(await sinScrollHorizontal(page), `[${sufijo}] visor sin scroll horizontal`);
  await shot(page, `despues_visor_${sufijo}`);
  if (paginas > 1) {
    await page.locator('[data-epi10-accion="pagina-siguiente"]').click();
    await page.waitForTimeout(1200);
    await shot(page, `despues_visor_pagina2_${sufijo}`);
  }
  await page.locator('[data-epi10-accion="acercar"]').click();
  await page.waitForTimeout(800);
  ok((await page.locator('.epi-visor-pdf__zoom').innerText()).includes('125'), `[${sufijo}] zoom`);

  const [descarga] = await Promise.all([page.waitForEvent('download'), page.locator('[data-epi10-accion="descargar"]').click()]);
  ok(descarga.suggestedFilename().endsWith('.pdf'), `[${sufijo}] descarga directa en PDF (${descarga.suggestedFilename()}), nunca ZIP`);

  await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }), page.locator('[data-epi10-volver]').click()]);
  ok(await page.locator(`[data-epi10-lista="documentos"] [data-epi10-item="${id}"]`).getAttribute('data-epi10-estado') === 'visto', `[${sufijo}] tras abrirlo, el documento pasa a «visto»`);
  await shot(page, `despues_biblioteca_vista_${sufijo}`);
  await ctx.close();
}

async function equipo(movil) {
  const sufijo = movil ? 'movil' : 'escritorio';
  const ctx = await navegador.newContext({ locale: 'es-ES', viewport: movil ? { width: 390, height: 844 } : { width: 1440, height: 900 }, isMobile: movil, hasTouch: movil });
  const page = await ctx.newPage();
  page.setDefaultTimeout(45000);
  page.on('pageerror', (e) => errores.push(`equipo ${sufijo}: ${e.message}`));
  await page.goto(`${BASE}/interface/login/login.php?site=default`, { waitUntil: 'networkidle' });
  await page.fill('#authUser', process.env.OE_USER || 'admin');
  await page.fill('#clearPass', process.env.OE_PASS);
  await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {}), page.click('#login-button')]);
  await page.waitForTimeout(2000);

  if (!movil) {
    await page.goto(`${BASE}/controller.php?document&list&patient_id=1`, { waitUntil: 'networkidle' }).catch(() => {});
    await shot(page, `antes_backoffice_documentos_${sufijo}`);
  }

  await page.goto(`${U.ficha}?pid=1`, { waitUntil: 'networkidle' });
  const filas = await page.locator('[data-epi10-lista="documentos-ficha"] > [data-epi10-item]').evaluateAll((els) => els.map((e) => e.getAttribute('data-epi10-item')));
  ok(filas.join(',') === 'consentimiento,cuestionario,informe', `[equipo ${sufijo}] tres filas y nada más (${filas.join(', ')})`);
  ok(await page.locator('[data-epi10-item="informe"]').getAttribute('data-epi10-informe') === 'publicado', `[equipo ${sufijo}] el informe de Lucía figura como publicado`);
  ok(await sinScrollHorizontal(page), `[equipo ${sufijo}] pestaña sin scroll horizontal`);
  await shot(page, `despues_ficha_documentos_lucia_${sufijo}`, true);

  if (!movil) {
    await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }), page.locator('[data-epi10-accion="ver-cuestionario"]').click()]);
    ok(await page.locator('[data-epi10-lista="respuestas"] li').count() >= 3, `[equipo] «Ver respuestas» enseña las respuestas del cuestionario`);
    await shot(page, `despues_respuestas_${sufijo}`);
    await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }), page.locator('[data-epi10-volver]').click()]);
    const verConsent = page.locator('[data-epi10-accion="ver-consentimiento"]');
    if (await verConsent.count()) {
      await verConsent.click();
      await page.waitForSelector('[data-epi10-visor-estado="listo"]');
      ok(true, '[equipo] el consentimiento firmado se abre en el mismo visor');
      await shot(page, `despues_consentimiento_${sufijo}`);
    }

    // Flujo del informe en una paciente ficticia: subir → borrador → validar → publicar.
    if (PDF_SUBIR) {
      await page.goto(`${U.ficha}?pid=${PID_PUBLICAR}`, { waitUntil: 'networkidle' });
      await page.locator('[data-epi10-accion="subir-informe"]').click();
      await page.setInputFiles('#epi10-subir-informe [data-epi10-campo="archivo"]', PDF_SUBIR);
      await shot(page, `despues_subir_informe_modal_${sufijo}`);
      await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }), page.locator('[data-epi10-accion="confirmar-subir_informe"]').click()]);
      ok(await page.locator('[data-epi10-item="informe"]').getAttribute('data-epi10-informe') === 'borrador', '[equipo] tras subirlo, el informe queda en borrador');
      await shot(page, `despues_informe_borrador_${sufijo}`);
      await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }), page.locator('[data-epi10-accion="validar-informe"]').click()]);
      ok(await page.locator('[data-epi10-item="informe"]').getAttribute('data-epi10-informe') === 'validado', '[equipo] «Marcar validado» lo pasa a validado');
      await page.locator('[data-epi10-accion="publicar-informe"]').click();
      await shot(page, `despues_publicar_modal_${sufijo}`);
      await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }), page.locator('[data-epi10-accion="confirmar-publicar"]').click()]);
      ok(await page.locator('[data-epi10-item="informe"]').getAttribute('data-epi10-informe') === 'publicado', '[equipo] «Publicar informe» lo publica por la clase del contrato');
      await shot(page, `despues_informe_publicado_${sufijo}`);
    }
  }
  await ctx.close();
}

await portal(false);
await portal(true);
await equipo(false);
await equipo(true);
await navegador.close();
ok(errores.length === 0, `sin errores de JavaScript${errores.length ? ': ' + errores.join(' | ') : ''}`);
const fallos = resultados.filter(([c]) => !c).length;
fs.writeFileSync(path.join(SALIDA, 'resultado.json'), JSON.stringify({ fecha: new Date().toISOString(), resultados }, null, 2));
console.log(`\n${resultados.length - fallos}/${resultados.length} OK`);
process.exit(fallos ? 1 : 0);
