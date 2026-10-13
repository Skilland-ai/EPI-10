// Tramo 4: portal de Marta → Mis documentos → Mensajes («Hola, acabo de registrarme»).
import { abrirNavegador, clip, STATE, OE } from './lib.mjs';
import { join } from 'node:path';
const b = await abrirNavegador();
const c = await clip(b, '04_portal_docs_mensajes', { storage: join(STATE, 'portal.json') }); const { page } = c;
await page.goto(`${OE}/portal/home.php`, { waitUntil: 'networkidle' }); await c.pausa(1500); c.marca('inicio');
await Promise.all([page.waitForLoadState('networkidle'), c.clic('#documents-go')]); await c.pausa(2500);
c.marca('documentos'); await c.foto('15_mis_documentos'); await c.scroll(300, 20); await c.pausa(1200);
await page.goto(`${OE}/portal/home.php`, { waitUntil: 'networkidle' }); await c.pausa(800);
await Promise.all([page.waitForLoadState('networkidle'), c.clic('#messages-go')]); await c.pausa(2000);
c.marca('mensajes');
await c.escribir('[data-epi10-chat-texto]', 'Hola, acabo de registrarme', 55); await c.pausa(600);
await c.clic('[data-epi10-chat-enviar]'); await c.pausa(3000); c.marca('enviado'); await c.foto('16_mensajes');
await c.cerrar(join(STATE, 'portal.json')); await b.close();
