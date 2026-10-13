// Genera los dos PDF ficticios del spot: el entregable del laboratorio y el informe final. Solo texto inventado.
import { chromium, OUT } from './lib.mjs';
import { join } from 'node:path';
const b = await chromium.launch(); const p = await b.newPage();
const parrafos = ['Este documento es un informe de prueba generado para una demostración. No contiene datos reales de ninguna persona.',
  'Resumen de marcadores analizados (valores inventados): metabolismo de la cafeína, sensibilidad a la lactosa, respuesta a grasas saturadas, necesidades de vitamina D y folato.',
  'Metabolismo de la cafeína: perfil intermedio. Sensibilidad a la lactosa: baja probabilidad. Respuesta a grasas saturadas: estándar. Vitamina D: necesidad algo superior a la media. Folato: sin variantes relevantes.',
  'Recomendaciones generales de ejemplo: mantener una dieta variada, priorizar verduras y legumbres, exponerse al sol con moderación y consultar con el equipo cualquier duda.',
  'Las conclusiones de este documento son inventadas y sirven solo para enseñar el recorrido del servicio de principio a fin.'];
for (const [f, titulo] of [['entregable-laboratorio-spot.pdf', 'Informe de prueba · Laboratorio ficticio'], ['informe-final-spot.pdf', 'Informe de prueba · Tu informe EPI10']]) {
  await p.setContent(`<html><body style="font-family:sans-serif;padding:40px;color:#0b2545"><h1>${titulo}</h1><p><b>Paciente:</b> Marta Spot Ficticia · <b>Código de barras de la muestra:</b> SPOT123</p><h2>Resultados</h2>${parrafos.map((t) => `<p style="line-height:1.6">${t}</p>`).join('')}${parrafos.map((t) => `<p style="line-height:1.6">${t}</p>`).join('')}</body></html>`);
  await p.pdf({ path: join(OUT, 'pdf', f), format: 'A4' });
}
await b.close();
