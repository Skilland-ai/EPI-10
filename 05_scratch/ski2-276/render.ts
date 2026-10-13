// Renderiza las vistas de la pantalla de informes con datos ficticios (capturas SKI2-276).
import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { ESTILOS, vistaCaso, vistaLista, vistaLogin } from '../src/modules/informes/pantalla/vistas.ts';

const out = process.argv[2] ?? '/tmp/ski2-276-render';
const bo = 'http://localhost:4896/interface/main/tabs/main.php';
const d = (s: string) => new Date(s);
const caso = (caseId: string, state: string, cuando: string) => ({ caseId, state, externalIds: {}, createdAt: d('2026-10-06T09:12:00Z'), updatedAt: d(cuando), stateChangedAt: d(cuando) }) as never;
const casos = [
  caso('0b6f4c1e-2f4b-4c8e-9a51-6f0f3f2b8a11', 'entregable_disponible', '2026-10-13T08:40:00Z'),
  caso('7d21a9e0-5c3b-4f1a-8e22-1a9b0c4d5e66', 'borrador_en_revision', '2026-10-12T16:05:00Z'),
  caso('c4e8b2d7-9a10-4b6e-b3f5-2e7d8c9a0b17', 'informe_validado', '2026-10-11T11:30:00Z'),
];
mkdirSync(`${out}/informes/casos`, { recursive: true });
mkdirSync(`${out}/informes/marca`, { recursive: true });
writeFileSync(`${out}/informes/estilos.css`, ESTILOS);
cpSync('src/modules/informes/pantalla/marca', `${out}/informes/marca`, { recursive: true });
writeFileSync(`${out}/informes/login.html`, vistaLogin({ csrf: 'x', backofficeUrl: bo, aviso: 'aviso.enlace_no_valido' }));
writeFileSync(`${out}/informes/index.html`, vistaLista({ casos, usuario: 'aitor', csrf: 'x', backofficeUrl: bo }));
writeFileSync(`${out}/informes/casos/caso.html`, vistaCaso({ detalle: { caso: casos[0] }, usuario: 'aitor', csrf: 'x', maxMb: 20, modoPublicacion: 'automatico', portalOpenemr: true, backofficeUrl: bo }));
console.log('ok', out);
