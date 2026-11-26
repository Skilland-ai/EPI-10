// Batería de la portada de uso diario. Contra la pila de pruebas (./levantar.sh):
//   BASE=http://127.0.0.1:4131 node --test portada.test.mjs
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const BASE = process.env.BASE ?? 'http://127.0.0.1:4131';
const aqui = new URL('.', import.meta.url);
const leer = (ruta) => readFile(new URL(ruta, aqui), 'utf8');
const pedir = (ruta, opciones) => fetch(BASE + ruta, { redirect: 'manual', ...opciones });
/** Lo que lee la persona: sin etiquetas, sin <title>/<desc> del SVG y sin scripts. */
const visible = (html) =>
  html
    .replace(/<(script|style|title|desc)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');

const portada = await leer('../portada/index.html');
const guia = await leer('../portada/guia-rapida.html');
const antesDelDesplegable = portada.slice(0, portada.indexOf('<details'));
const desplegable = portada.slice(portada.indexOf('<details'), portada.indexOf('</details>'));

test('la portada y la guía se sirven, con la política de contenido', async () => {
  for (const ruta of ['/', '/guia-rapida', '/guia-rapida.html']) {
    const r = await pedir(ruta);
    assert.equal(r.status, 200, ruta);
    assert.match(r.headers.get('content-type'), /text\/html/);
    const csp = r.headers.get('content-security-policy');
    assert.match(csp, /default-src 'none'/);
    assert.match(csp, /script-src 'self'/);
    assert.match(csp, /connect-src 'self'/);
    assert.equal(r.headers.get('x-robots-tag'), 'noindex, nofollow');
  }
});

test('los recursos de las páginas existen', async () => {
  const rutas = new Set();
  for (const html of [portada, guia])
    for (const [, ruta] of html.matchAll(/(?:href|src)="(?!https?:|#|\/__puerta)([^"#]+)/g))
      rutas.add('/' + ruta.replace(/^\//, ''));
  assert.ok(rutas.has('/descargas/caso-a-lucia-ferrer.zip') && rutas.has('/guia-rapida'));
  for (const ruta of rutas) assert.equal((await pedir(ruta)).status, 200, ruta);
  for (const fuente of ['400', '600', '700'])
    assert.equal((await pedir(`/fonts/manrope-latin-${fuente}-normal.woff2`)).status, 200);
});

test('la política no admite estilos ni scripts en línea, y las páginas no los usan', () => {
  for (const html of [portada, guia]) {
    assert.doesNotMatch(html, /\sstyle="/);
    assert.doesNotMatch(html, /<style/);
    assert.doesNotMatch(html, /<script(?![^>]*\ssrc=)/);
    assert.doesNotMatch(html, /\son[a-z]+="/);
  }
});

test('la identidad llega por /__puerta/yo', async () => {
  const yo = await (await pedir('/__puerta/yo')).json();
  assert.deepEqual(Object.keys(yo).sort(), ['correo', 'nombre', 'rol']);
});

test('el recorrido antiguo no se inyecta', async () => {
  const html = await (await pedir('/', { headers: { 'Sec-Fetch-Dest': 'document' } })).text();
  assert.doesNotMatch(html, /__guia/);
  assert.equal(html, portada);
  for (const sitio of ['../portada.caddy', '../compra.caddy'])
    assert.doesNotMatch(await leer(sitio), /^\s*import guia/m, sitio);
});

test('ningún texto de demo ni jerga a la vista', () => {
  const prohibido = /demostraci[oó]n|\bdemo\b|ficticio|datos reales|clienta|healthie|motor|seudonim|borrador suelto|auditor/i;
  assert.doesNotMatch(visible(portada), prohibido);
  assert.doesNotMatch(visible(guia), prohibido);
  assert.doesNotMatch(portada + guia, /clienta|healthie/i);
  // «Orquestador» solo dentro del desplegable, donde se explica la arquitectura.
  assert.doesNotMatch(visible(antesDelDesplegable), /orquestador/i);
  assert.doesNotMatch(visible(guia), /orquestador/i);
});

test('la portada tiene, en orden, lo que pide el diseño', () => {
  const orden = [
    'data-yo-saludo',
    'se copia cada noche',
    'Casos y clientes',
    'Esta herramienta es Odoo',
    'Generador de borradores de informes',
    'No envía nada al cliente',
    '¿Primera vez?',
    'Tu primer caso',
    'Guía rápida',
    'Lucía Ferrer',
    'Javier Ortega',
    'vista técnica',
    '<details>',
    '¿Quieres más información sobre este sistema?',
  ];
  let desde = 0;
  for (const trozo of orden) {
    const en = portada.indexOf(trozo, desde);
    assert.ok(en >= 0, `falta o está fuera de sitio: ${trozo}`);
    desde = en;
  }
  assert.doesNotMatch(portada, /<details[^>]*\sopen/);
  assert.match(portada, /href="\/__puerta\/salir"[^>]*>Salir</);
  assert.match(guia, /href="\/__puerta\/salir"[^>]*>Salir</);
});

test('los destinos son los del contrato', () => {
  const destino = (nombre) => portada.match(new RegExp(`href="([^"]+)" data-destino="${nombre}"`))?.[1];
  assert.equal(destino('odoo'), 'https://odoo.aporta-epi10.com/__entrar');
  assert.equal(destino('generador'), 'https://generador.aporta-epi10.com/__entrar');
  assert.equal(destino('recorrido'), 'https://odoo.aporta-epi10.com/__entrar?volver=/epi10/primer-caso');
  assert.equal(destino('tecnica'), 'https://panel.aporta-epi10.com/__entrar?volver=/panel');
  assert.equal(destino('guia'), 'guia-rapida');
  assert.equal(destino('orquestador'), 'https://panel.aporta-epi10.com/__entrar?volver=/panel');
});

test('cada botón abre pestaña nueva; salir, el logo, volver y las descargas, no', () => {
  const enlaces = (html) => [...html.matchAll(/<a\s[^>]*>/g)].map(([a]) => a);
  const nueva = (a) => /\starget="_blank"/.test(a) && /\srel="noopener"/.test(a);
  for (const nombre of ['odoo', 'generador', 'recorrido', 'guia', 'tecnica', 'orquestador']) {
    const a = enlaces(portada).find((e) => e.includes(`data-destino="${nombre}"`));
    assert.ok(a && nueva(a), `${nombre} abre pestaña nueva`);
  }
  for (const a of enlaces(portada).filter((e) => /href="https:/.test(e)))
    assert.ok(nueva(a), `abre pestaña nueva: ${a}`);
  const misma = enlaces(portada + guia).filter((e) => !/href="https:|data-destino="guia"/.test(e));
  assert.ok(misma.length >= 8);
  for (const a of misma) assert.doesNotMatch(a, /target=/, a);
});

test('la tarjeta del orquestador va debajo de la web de compra y la pasarela de pago', () => {
  const pago = desplegable.indexOf('Iniciar el pago de prueba');
  const tarjeta = desplegable.indexOf('data-destino="orquestador"');
  const sobre = desplegable.indexOf('id="mas-sobre"');
  assert.ok(pago > 0 && pago < tarjeta && tarjeta < sobre);
  assert.match(desplegable, /<article class="tarjeta tarjeta--plana t-orq">/);
  assert.match(desplegable, />Abrir el orquestador<\/a>/);
});

test('la web de compra y Stripe solo se enlazan dentro del desplegable', () => {
  assert.doesNotMatch(antesDelDesplegable, /compra\.aporta-epi10\.com/);
  assert.match(desplegable, /href="https:\/\/compra\.aporta-epi10\.com"/);
  assert.match(desplegable, /Stripe/);
  assert.match(desplegable, /4242 4242 4242 4242/);
  assert.match(desplegable, /Arquitectura del sistema/);
  assert.match(desplegable, /<svg class="arq__svg"/);
  assert.match(desplegable, /Fase 1/);
  assert.match(desplegable, /Fase 2/);
});

test('la guía trae los tres tutoriales y las dos explicaciones del «por ahora»', () => {
  for (const id of ['entrar', 'cliente', 'informe']) assert.match(guia, new RegExp(`id="${id}"`));
  assert.ok(
    guia.includes(
      'Ahora los clientes se dan de alta a mano porque la web todavía no está conectada. Cuando lo esté, cada compra creará el cliente sola, aquí y en el sistema.',
    ),
  );
  assert.ok(
    guia.includes(
      'Ahora la etapa la cambias tú porque el portal de clientes todavía no está conectado. Cuando lo esté, el caso avanzará solo conforme el cliente use la app.',
    ),
  );
});
