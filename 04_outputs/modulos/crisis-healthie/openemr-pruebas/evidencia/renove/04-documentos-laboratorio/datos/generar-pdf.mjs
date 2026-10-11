// Imprime el informe ficticio de Lucía a PDF (Chromium de Playwright). Uso:
//   node lab/area-4/datos/generar-pdf.mjs [salida.pdf]
// Ejecutar desde una carpeta con node_modules/playwright (p. ej. openemr-pruebas/scripts) con NODE_PATH apuntando a ella.
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const salida = process.argv[2] || path.join(aqui, 'Informe-EPI10-Lucia-ficticio.pdf');
const navegador = await chromium.launch();
const pagina = await navegador.newPage();
await pagina.goto(pathToFileURL(path.join(aqui, 'informe-ficticio.html')).href, { waitUntil: 'networkidle' });
await pagina.pdf({ path: salida, format: 'A4', printBackground: true, preferCSSPageSize: true });
await navegador.close();
console.log(salida);
