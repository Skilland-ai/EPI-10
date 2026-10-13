// Tramo 3: carril de onboarding de Marta (bienvenida → consentimiento con firma → cuestionario → test en casa → Todo listo → inicio).
import { abrirNavegador, clip, MARTA, STATE, OE, UI } from './lib.mjs';
import { join } from 'node:path';
const b = await abrirNavegador();
const c = await clip(b, '03_onboarding', { storage: join(STATE, 'portal.json') }); const { page } = c;
const paso = (id) => page.waitForSelector(`[data-epi10-onboarding][data-epi10-onboarding-paso="${id}"]`, { timeout: 45000 }).then(() => true).catch(() => false);
await page.goto(`${OE}${UI}/portal/onboarding.php`, { waitUntil: 'networkidle' });
await c.pausa(1500); c.marca('bienvenida'); await c.foto('07_bienvenida');
await c.clic('[data-epi10-accion="empezar"]');
await paso('consentimiento'); await c.pausa(1200);
const nac = page.locator('section[aria-labelledby="epi10-onb-nacimiento"] input[type=date]');
if (await nac.count()) { c.marca('nacimiento'); await c.foto('08a_nacimiento'); await c.ir(nac); await nac.click(); await nac.pressSequentially('12051988', { delay: 90 });
  await c.pausa(900); await c.clic('button:has-text("Continuar al consentimiento")'); }
await page.waitForSelector('[data-epi10-region="tarea"]'); await c.pausa(1500);
c.marca('consentimiento'); await c.foto('08_consentimiento');
await c.scroll(500, 25); await c.pausa(600);
for (const ch of await page.locator('[data-epi10-bloque="aceptaciones"] input[type=checkbox]').all()) { await c.ir(ch); await ch.check(); await c.pausa(300); }
const lienzo = page.locator('#signTemplate canvas'); await lienzo.scrollIntoViewIfNeeded().catch(() => {});
const bx = await lienzo.boundingBox();
if (bx) { await page.mouse.move(bx.x + bx.width * 0.2, bx.y + bx.height * 0.6, { steps: 12 }); await page.mouse.down();
  for (let i = 1; i <= 24; i++) await page.mouse.move(bx.x + bx.width * (0.2 + i * 0.025), bx.y + bx.height * (0.6 - Math.sin(i / 2.5) * 0.25), { steps: 3 });
  await page.mouse.up(); }
await c.pausa(1000); c.marca('firmado'); await c.foto('09_firma');
await c.clic('#sendTemplate');
await paso('encuesta_habitos'); await c.pausa(1500); c.marca('cuestionario'); await c.foto('10_cuestionario');
for (let i = 0; i < 40; i++) {
  await page.waitForTimeout(500);
  if (await page.locator('[data-epi10-bloque="repaso"]').isVisible().catch(() => false)) { await c.pausa(800); await c.clic('[data-epi10-accion="enviar"]'); break; }
  const q = page.locator('[data-epi10-pregunta]').first();
  const op = q.locator('label.epi-choice'); const n = await op.count();
  if (n) await c.clic(op.nth(Math.min(1, n - 1)));
  else if (await q.locator('input[type=number]').count()) await c.escribir(q.locator('input[type=number]'), '7');
  else if (await q.locator('input[type=date]').count()) { await c.ir(q.locator('input[type=date]')); await q.locator('input[type=date]').fill('1988-05-12'); }
  else if (await q.locator('textarea, input[type=text]').count()) await c.escribir(q.locator('textarea, input[type=text]').first(), 'Nada que añadir', 30);
  await c.pausa(300); await c.clic('[data-epi10-accion="siguiente"]');
}
await paso('test'); await c.pausa(1500); c.marca('test'); await c.foto('11_tu_test');
await c.clic('label[data-epi10-modalidad="casa"]');
await page.waitForSelector('form[data-epi10-envio]'); await c.pausa(800);
const f = 'form[data-epi10-envio] ';
await page.fill(f + 'input[name=nombre]', '');
await c.escribir(f + 'input[name=nombre]', MARTA.nombre, 25);
await c.escribir(f + 'input[name=direccion]', MARTA.calle, 30);
await c.escribir(f + 'input[name=cp]', MARTA.cp, 50);
await c.escribir(f + 'input[name=ciudad]', MARTA.ciudad, 40);
await c.escribir(f + 'input[name=telefono]', MARTA.tel, 30);
await c.clic('label[data-epi10-franja="manana"]'); await c.pausa(800); c.marca('envio'); await c.foto('12_envio');
await c.clic(f + 'button[type=submit]');
await paso('listo'); await c.pausa(2500); c.marca('listo'); await c.foto('13_listo');
await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {}), c.clic('[data-epi10-accion="ir-al-inicio"]')]);
await c.pausa(2500); c.marca('inicio'); await c.foto('14_inicio');
await c.scroll(500, 30); await c.pausa(1500); await c.scroll(-500, 20); await c.pausa(800);
await c.cerrar(join(STATE, 'portal.json')); await b.close();
