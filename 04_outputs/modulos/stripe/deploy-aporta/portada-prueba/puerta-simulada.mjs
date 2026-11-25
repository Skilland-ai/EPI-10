// Puerta simulada para probar la portada sin el carril acceso. Solo para la pila de pruebas.
//   GET /__verificar     204 (como una sesión válida)
//   GET /__puerta/yo     { nombre, correo, rol }; con la cookie `sinyo=1`, 404 (puerta antigua)
//   GET /__puerta/salir  página de «has salido»
import { createServer } from 'node:http';

const yo = {
  nombre: process.env.YO_NOMBRE ?? 'Aitor Ejemplo',
  correo: process.env.YO_CORREO ?? 'aitor@example.com',
  rol: process.env.YO_ROL ?? 'equipo',
};

createServer((req, res) => {
  const ruta = new URL(req.url, 'http://puerta').pathname;
  if (ruta === '/__verificar') return res.writeHead(204).end();
  if (ruta === '/__puerta/yo') {
    if ((req.headers.cookie ?? '').includes('sinyo=1')) return res.writeHead(404).end('no');
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    return res.end(JSON.stringify(yo));
  }
  if (ruta === '/__puerta/salir') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end('<!doctype html><title>Fuera</title><h1 id="fuera">Has salido</h1>');
  }
  res.writeHead(404).end('no');
}).listen(8080, '0.0.0.0');
