import http from 'node:http';
import { createRequire } from 'node:module';
const require = createRequire('/home/reboot/Escritorio/Skilland.ai/skilland-finance-c-dashboard-controller/apps/dashboard/');
const { chromium } = require('playwright');
const bo = http.createServer((q, r) => { r.setHeader('content-type','text/html'); r.end('<a id=m href="http://localhost:5952/acceso?modo=meta">m</a><a id=r href="http://localhost:5952/acceso?modo=303">r</a>'); }).listen(5951, '127.0.0.1');
const app = http.createServer((q, r) => {
  const u = new URL(q.url, 'http://x');
  if (u.pathname === '/acceso') {
    r.setHeader('set-cookie', `s${u.searchParams.get('modo')}=1; Path=/; HttpOnly; Secure; SameSite=Strict`);
    if (u.searchParams.get('modo') === '303') { r.statusCode = 303; r.setHeader('location', '/dest'); return r.end(); }
    r.setHeader('content-type','text/html'); return r.end('<meta http-equiv="refresh" content="0; url=/dest">');
  }
  r.end('COOKIE=' + (q.headers.cookie ?? '(ninguna)'));
}).listen(5952, '127.0.0.1');
const b = await chromium.launch();
for (const modo of ['r', 'm']) {
  const ctx = await b.newContext(); const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:5951/'); await p.click('#' + modo);
  await p.waitForURL('**/dest'); await p.waitForTimeout(300);
  console.log(modo === 'r' ? '303 :' : 'meta:', await p.textContent('body')); await ctx.close();
}
await b.close(); bo.close(); app.close();
