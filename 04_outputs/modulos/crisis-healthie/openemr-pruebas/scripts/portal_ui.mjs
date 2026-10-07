// Automatiza el portal del paciente de OpenEMR 8.4.1 con Playwright (lo que no tiene API).
// Uso: node portal_ui.mjs <accion> [args]   con OE_BASE, PORTAL_USER, PORTAL_PASS, PORTAL_EMAIL en el entorno
// Acciones: home | firmar <nombre-plantilla> | encuesta <nombre-plantilla> | mensaje <asunto> <texto> | buzon | documentos | descargar <nombre-doc>
// Capturas en ../evidencia/capturas/. Solo datos ficticios.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const CAPTURAS = join(HERE, '..', 'evidencia', 'capturas');
mkdirSync(CAPTURAS, { recursive: true });
const BASE = (process.env.OE_BASE || 'http://localhost:4896').replace(/\/$/, '');
const [accion = 'home', ...args] = process.argv.slice(2);
const log = (...a) => console.log('[portal]', ...a);

const browser = await chromium.launch();
const ctx = await browser.newContext({ locale: 'es-ES', acceptDownloads: true, viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
page.setDefaultTimeout(60000);

async function captura(nombre) {
  const f = join(CAPTURAS, `${nombre}.png`);
  await page.screenshot({ path: f, fullPage: true });
  log('captura', f);
}

async function login() {
  await page.goto(`${BASE}/portal/index.php?site=default`);
  await page.fill('#uname', process.env.PORTAL_USER);
  await page.fill('#pass', process.env.PORTAL_PASS);
  if (process.env.PORTAL_EMAIL) await page.fill('#passaddon', process.env.PORTAL_EMAIL);
  await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }), page.click('button[type=submit]')]);
  // Si pide cambio de contraseña o muestra un aviso, lo registramos.
  log('url tras login:', page.url(), '| título:', await page.title());
}

async function abrirTarjeta(texto) {
  // El menú superior del portal (home.php) abre "tarjetas" (cards) por nombre.
  const link = page.locator(`#topNav a:has-text("${texto}"), a.nav-link:has-text("${texto}"), a:has-text("${texto}")`).first();
  await link.click();
  await page.waitForTimeout(1500);
}

try {
  if (process.env.ENLACE_FILE) {
    const { readFileSync } = await import('node:fs');
    await page.goto(readFileSync(process.env.ENLACE_FILE, 'utf8').trim());
    await page.waitForLoadState('networkidle');
    await captura('20_enlace_magico_abierto');
    // La página de autologin puede pedir confirmar con un botón (CSRF)
    const boton = page.locator('button[type=submit], input[type=submit]').first();
    if (await boton.isVisible().catch(() => false)) {
      await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {}), boton.click()]);
    }
    await page.waitForTimeout(2000);
    log('url tras enlace mágico:', page.url());
  } else {
    await login();
  }
  if (accion === 'home') {
    await captura('01_portal_home');
    const textos = await page.locator('#topNav a, .nav-link').allInnerTexts();
    log('menú:', textos.map((t) => t.trim()).filter(Boolean).join(' | '));
  } else if (accion === 'firmar' || accion === 'encuesta') {
    const nombre = args[0];
    await page.locator('#documents-go').first().click();
    await page.waitForTimeout(3000);
    const frame = page.frames().find((f) => f.url().includes('onsitedocuments'));
    await frame.locator('#dropdownMenu').first().click();
    await page.waitForTimeout(800);
    await frame.locator(`a.template-item:has-text("${nombre}")`).first().click();
    await page.waitForTimeout(5000);
    await captura(`03_${accion}_abierto`);
    if (accion === 'firmar') {
      // 1) Crear la firma «en archivo»: botón Firma → modal con lienzo → dibujar → guardar.
      await frame.locator('#signTemplate').click();
      await page.waitForTimeout(1500);
      const canvas = frame.locator('#openSignModal canvas, canvas.canvas').first();
      await canvas.waitFor({ state: 'visible' });
      const box = await canvas.boundingBox();
      await page.mouse.move(box.x + 30, box.y + box.height / 2);
      await page.mouse.down();
      for (let i = 1; i <= 40; i++) await page.mouse.move(box.x + 30 + i * (box.width - 60) / 40, box.y + box.height / 2 + Math.sin(i / 3) * box.height / 4);
      await page.mouse.up();
      await captura('04_firma_dibujada');
      await frame.locator('[data-action="save_signature"]').first().click();
      await page.waitForTimeout(2000);
      // Cerrar el modal si sigue abierto
      const cerrar = frame.locator('#openSignModal .close, #openSignModal button:has-text("Cancelar"), #openSignModal [data-dismiss="modal"]').first();
      if (await frame.locator('#openSignModal').isVisible().catch(() => false)) await cerrar.click().catch(() => {});
      await page.waitForTimeout(800);
      // 2) Colocar la firma en el documento (clic en la X) y marcar las casillas.
      await frame.locator('#patientSignature').click();
      await page.waitForTimeout(1500);
      for (const cb of await frame.locator('input.checkMark').all()) await cb.check().catch(() => {});
      await captura('05_firma_colocada');
      // 3) Guardar y enviar.
      await frame.locator('#saveTemplate').click();
      await page.waitForTimeout(3000);
      await captura('06_guardado');
      const submit = frame.locator('#sendTemplate'); // «Submit Completed»
      if (await submit.isVisible().catch(() => false)) {
        await submit.click();
        await page.waitForTimeout(3000);
        // Puede pedir confirmación
        const conf = frame.locator('button:has-text("Confirm"), button:has-text("Confirmar"), button:has-text("Yes"), button:has-text("Sí")').first();
        if (await conf.isVisible().catch(() => false)) { await conf.click(); await page.waitForTimeout(2500); }
      } else {
        log('sendTemplate (Submit Completed) no visible tras guardar');
      }
      await page.waitForTimeout(1500);
      const chart = frame.locator('#chartTemplate');
      log('chartTemplate visible:', await chart.isVisible().catch(() => false), '| texto:', await chart.innerText().catch(() => ''));
      await captura('07_enviado');
      log('texto final:', JSON.stringify((await frame.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 600)));
    } else {
      // Encuesta: el directivo {Questionnaire:…} incrusta un iframe con el runtime FHIR de OpenEMR (questionnaire_assessments.php).
      await page.waitForTimeout(5000);
      const qf = page.frames().find((f) => f.url().includes('questionnaire_assessments'));
      log('marco del cuestionario:', qf ? qf.url().slice(0, 90) : 'NO ENCONTRADO');
      const nums = qf.locator('input[type=number]');
      for (let i = 0; i < await nums.count(); i++) await nums.nth(i).fill(i === 0 ? '7' : '3', { timeout: 5000 });
      const radios = await qf.locator('input[type=radio]').evaluateAll((els) => [...new Set(els.map((e) => e.name))]);
      for (const name of radios) await qf.locator(`label[for="${name}-0"]`).click({ timeout: 5000 });
      const tas = qf.locator('textarea');
      for (let i = 0; i < await tas.count(); i++) await tas.nth(i).fill('Duermo peor cuando viajo. Respuesta de prueba (ficticia).', { timeout: 5000 });
      await captura('04_encuesta_rellena');
      page.on('dialog', (d) => { log('diálogo:', d.message()); d.accept(); });
      // «Enviar a EPI10» directamente (guardar borrador recarga la vista y oculta el botón)
      const submit = frame.locator('#sendTemplate'); // «Submit Completed»
      if (await submit.isVisible().catch(() => false)) {
        await submit.click();
        await page.waitForTimeout(3000);
        const conf = frame.locator('button:has-text("Confirm"), button:has-text("Confirmar"), button:has-text("Yes"), button:has-text("Sí")').first();
        if (await conf.isVisible().catch(() => false)) { await conf.click(); await page.waitForTimeout(2500); }
      } else {
        log('sendTemplate (Submit Completed) no visible tras guardar');
      }
      await captura('05_encuesta_enviada');
      log('texto final:', JSON.stringify((await frame.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 600)));
    }
  } else if (accion === 'mensaje') {
    const [asunto, texto] = args;
    if (!(await page.locator('#messages-go').isVisible())) await page.locator('#quickstart_dashboard').click().catch(() => {});
    await page.locator('#messages-go').click();
    await page.waitForTimeout(3000);
    const scope = page.frames().find((f) => f.url().includes('messaging')) || page;
    await captura('21_buzon_paciente');
    log('texto buzón:', JSON.stringify((await scope.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 400)));
    await scope.locator('button:has-text("Escribir mensaje"), a:has-text("Escribir mensaje"), button:has-text("Compose")').first().click();
    await page.waitForTimeout(1500);
    const visibles = await scope.locator('input:visible, select:visible, textarea:visible, [contenteditable=true]:visible').evaluateAll((els) => els.map((e) => `${e.tagName}#${e.id}.${e.name || ''}`));
    log('campos visibles:', JSON.stringify(visibles));
    const sel = scope.locator('select:visible').first();
    if (await sel.count()) { await sel.selectOption({ index: 0 }).catch(() => {}); log('destinatario:', await sel.inputValue().catch(() => '?')); }
    await scope.locator('input#title:visible, input[name=title]:visible').first().fill(asunto);
    const editable = scope.locator('[contenteditable=true]:visible, textarea:visible').first();
    await editable.click(); await page.keyboard.type(texto);
    await captura('22_mensaje_redactado');
    await scope.locator('button:has-text("Enviar"):visible, button:has-text("Send"):visible, input[type=submit]:visible').first().click();
    await page.waitForTimeout(3000);
    await captura('23_mensaje_enviado');
  } else if (accion === 'buzon') {
    await abrirTarjeta('Buzón');
    await page.waitForTimeout(1500);
    await captura('09_buzon_entrada');
    const filas = await page.locator('table tbody tr, .message-list li, .list-group-item').allInnerTexts();
    log('mensajes visibles:', JSON.stringify(filas.slice(0, 10)));
  } else if (accion === 'documentos' || accion === 'descargar') {
    if (!(await page.locator('#reports-go').isVisible())) await page.locator('#quickstart_dashboard').click().catch(() => {});
    await page.locator('#reports-go').click();
    await page.waitForTimeout(2000);
    await captura('30_mi_informe');
    await page.locator('#download-documents-go').click();
    await page.waitForTimeout(3000);
    const scope = page.frames().find((f) => f.url().includes('get_patient_documents')) || page;
    log('marco:', scope.url ? scope.url() : 'page');
    const lista = (await scope.locator('body').innerText()).replace(/\s+/g, ' ');
    log('lista:', JSON.stringify(lista.slice(0, 500)));
    await captura('31_lista_documentos');
    if (accion === 'descargar') {
      const nombre = args[0];
      const fila = scope.locator(`label:has-text("${nombre}")`).first();
      await fila.click();
      const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 30000 }),
        scope.locator('button[type=submit]:has-text("Descargar"), button[type=submit]').last().click(),
      ]);
      const destino = join(CAPTURAS, `descarga_${download.suggestedFilename()}`);
      await download.saveAs(destino);
      log('descargado →', destino);
    }
  } else if (accion === 'tarjeta') {
    // Exploración: abre una tarjeta por su texto y vuelca enlaces, botones y marcos para afinar selectores.
    const nombre = args[0];
    await page.locator(`a:has-text("${nombre}"), button:has-text("${nombre}")`).first().click();
    await page.waitForTimeout(3000);
    await captura(`explorar_${nombre.replace(/\s+/g, '_')}`);
    for (const f of page.frames()) {
      const enlaces = await f.locator('a, button').allInnerTexts().catch(() => []);
      log('frame', f.url(), '| controles:', JSON.stringify(enlaces.map((t) => t.trim()).filter(Boolean).slice(0, 40)));
      const texto = await f.locator('body').innerText().catch(() => '');
      log('texto:', JSON.stringify(texto.replace(/\s+/g, ' ').slice(0, 1500)));
    }
  } else if (accion === 'abrir') {
    // Exploración: abre "Clinical Documents", pulsa la plantilla y vuelca el HTML relevante del marco.
    const nombre = args[0];
    await page.locator('#documents-go').first().click();
    await page.waitForTimeout(3000);
    const frame = page.frames().find((f) => f.url().includes('onsitedocuments'));
    await frame.locator('#dropdownMenu').first().click();
    await page.waitForTimeout(1000);
    await frame.locator(`a:has-text("${nombre}"), button:has-text("${nombre}"), li:has-text("${nombre}")`).first().click();
    await page.waitForTimeout(5000);
    await captura(`abrir_${nombre.replace(/\s+/g, '_')}`);
    const html = await frame.locator('body').innerHTML();
    const resumen = html.match(/<(button|input|select|textarea|canvas|img|a)[^>]*>/g) || [];
    log('controles:', JSON.stringify(resumen.filter((t) => /sign|firma|submit|save|canvas|signature|check|radio|number|text|select|questionnaire|lhc|oe-q/i.test(t)).slice(0, 80), null, 0));
    log('texto:', JSON.stringify((await frame.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 1200)));
  } else {
    throw new Error(`acción desconocida: ${accion}`);
  }
  writeFileSync(join(CAPTURAS, `ultima_url_${accion}.txt`), page.url());
} catch (e) {
  await captura(`error_${accion}`);
  log('ERROR', e.message);
  process.exitCode = 1;
} finally {
  await browser.close();
}
