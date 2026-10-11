import { chromium } from 'playwright';
const B='http://localhost:4896', O='../evidencia/capturas/renove/04-documentos/despues/';
const b = await chromium.launch();
for (const movil of [false, true]) {
  const s = movil ? 'movil' : 'escritorio';
  const c = await b.newContext({ locale:'es-ES', viewport: movil?{width:390,height:844}:{width:1366,height:900}, isMobile:movil, hasTouch:movil });
  const p = await c.newPage(); p.setDefaultTimeout(60000);
  await p.goto(`${B}/portal/index.php?site=default`, {waitUntil:'networkidle'});
  await p.fill('#uname','lucia'); await p.fill('#pass',process.env.PORTAL_PASS); await p.fill('#passaddon',process.env.PORTAL_EMAIL).catch(()=>{});
  await Promise.all([p.waitForNavigation({waitUntil:'networkidle'}), p.click('form[action="get_patient_info.php"] button[type=submit]')]);
  await p.waitForTimeout(1500);
  const card = p.locator('#reports-go');
  console.log(s, 'reports-go href', await card.getAttribute('href'));
  await card.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
  await p.screenshot({ path: O+`despues_inicio_tarjeta_mi_informe_${s}.png` });
  await Promise.all([p.waitForNavigation({waitUntil:'networkidle'}), card.click()]);
  console.log(s, 'tras pulsar', p.url(), await p.locator('body').getAttribute('data-epi10-vista'));
  await c.close();
}
const c = await b.newContext({ locale:'es-ES', viewport:{width:1440,height:900} }); const p = await c.newPage(); p.setDefaultTimeout(60000);
await p.goto(`${B}/interface/login/login.php?site=default`); await p.fill('#authUser','admin'); await p.fill('#clearPass',process.env.OE_PASS);
await Promise.all([p.waitForNavigation({waitUntil:'networkidle'}).catch(()=>{}), p.click('#login-button')]); await p.waitForTimeout(2000);
await p.goto(`${B}/interface/modules/custom_modules/oe-module-epi10-ui/public/backoffice/ficha.php?pid=1#documentos`, {waitUntil:'networkidle'});
await p.waitForTimeout(1000);
console.log('ficha filas', await p.locator('[data-epi10-lista="documentos-ficha"] > [data-epi10-item]').count());
await p.screenshot({ path: O+'despues_ficha_area7_pestana_documentos_escritorio.png' });
await b.close();
