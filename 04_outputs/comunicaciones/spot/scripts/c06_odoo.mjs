// Tramo 6: Odoo como Aitor → kanban «Casos EPI10» → tarea de Marta → Test pedido → Test recibido → código de barras
// → Test realizado → Muestra enviada → Entregable disponible. Espera ESPERA_MS tras cada cambio (el monolito aplica el hito).
import { abrirNavegador, clip, STATE, env, estado } from './lib.mjs';
import { join } from 'node:path';
const ESPERA = Number(process.env.ESPERA_MS || 70000);
const tarea = estado('odooTarea');
const b = await abrirNavegador();
const c = await clip(b, '06_odoo'); const { page } = c;
const ODOO = 'http://localhost:4881';
await page.goto(`${ODOO}/web/login`, { waitUntil: 'load' }); await c.pausa(800); c.marca('login');
await c.escribir('input[name=login]', 'aitor', 60); await c.ir('input[name=password]'); await page.fill('input[name=password]', env('ODOO_PASS'));
await Promise.all([page.waitForURL(/\/web#|\/web$/, { timeout: 45000 }), c.clic('button[type=submit]')]);
await page.waitForSelector('.o_action_manager', { timeout: 45000 }); await c.pausa(2000);
// Kanban del proyecto
await page.goto(`${ODOO}/web#action=project.open_view_project_all`, { waitUntil: 'load' });
await page.waitForSelector('.o_kanban_record:has-text("Casos EPI10")', { timeout: 45000 }); await c.pausa(1500);
const proy = page.locator('.o_kanban_record:has-text("Casos EPI10")').first();
await c.clic(proy.locator('span:has-text("Casos EPI10")').first());
await page.waitForSelector('.o_kanban_group', { timeout: 45000 }); await c.pausa(2500); c.marca('kanban'); await c.foto('21_odoo_kanban');
const tarjeta = page.locator('.o_kanban_group').filter({ hasText: 'Listo para pedir test' }).locator('.o_kanban_record:has-text("Marta")').first();
if (await tarjeta.count()) { await c.clic(tarjeta); } else { await page.goto(`${ODOO}/web#id=${tarea}&model=project.task&view_type=form`, { waitUntil: 'load' }); }
await page.waitForSelector('.o_form_view .o_statusbar_status', { timeout: 45000 }); await c.pausa(2000); c.marca('tarea'); await c.foto('22_odoo_tarea');
if (!page.url().includes(`id=${tarea}`)) console.log('AVISO: tarea abierta', page.url());

async function etapa(valor, nombre) {
  const btn = page.locator(`.o_statusbar_status button[data-value="${valor}"]`);
  if (await btn.isVisible().catch(() => false)) await c.clic(btn);
  else {
    for (const mas of await page.locator('.o_statusbar_status button[aria-label="Más..."]').all()) {
      if (!(await mas.isVisible())) continue; await c.clic(mas); await c.pausa(500);
      const it = page.locator('.dropdown-menu .dropdown-item, .o-dropdown--menu .dropdown-item').filter({ hasText: nombre }).first();
      if (await it.isVisible().catch(() => false)) { await c.clic(it); break; }
      await page.keyboard.press('Escape');
    }
  }
  await c.pausa(1500);
  const actual = (await page.locator('.o_statusbar_status button[aria-checked="true"]').first().innerText().catch(() => '')).trim();
  c.marca('etapa:' + nombre + ' → ' + actual.split('\n')[0]);
}
async function esperar(n) { c.marca('espera ' + n); await page.waitForTimeout(ESPERA); await page.reload({ waitUntil: 'load' }); await page.waitForSelector('.o_statusbar_status'); await c.pausa(1500); c.marca('fin espera ' + n); }

await etapa(4, 'Test pedido'); await c.foto('23_odoo_test_pedido'); await esperar('pedido');
await etapa(5, 'Test recibido'); await esperar('recibido');
await c.clic('.o_notebook a[name=epi10]'); await c.pausa(1200);
const cod = page.locator('.o_notebook .tab-pane.active').locator('label:has-text("Código de barras")').first();
const id = await cod.getAttribute('for').catch(() => null);
const inp = id ? page.locator('#' + id) : page.locator('.o_notebook .tab-pane.active input').first();
await c.escribir(inp, 'SPOT123', 80); await c.pausa(600);
const guardar = page.locator('.o_form_button_save'); if (await guardar.isVisible().catch(() => false)) await c.clic(guardar);
await c.pausa(1500); c.marca('codigo'); await c.foto('24_odoo_codigo');
await etapa(7, 'Test realizado'); await esperar('realizado');
await etapa(8, 'Muestra enviada'); await esperar('muestra');
await etapa(9, 'Entregable disponible'); await c.foto('25_odoo_entregable'); await esperar('entregable');
// Vuelta al kanban para ver la tarjeta en su columna
await page.goBack({ waitUntil: 'load' }).catch(() => {}); await page.waitForSelector('.o_kanban_group', { timeout: 20000 }).catch(() => {});
await c.pausa(2500); c.marca('kanban final'); await c.foto('26_odoo_kanban_final');
await c.cerrar(join(STATE, 'odoo.json')); await b.close();
