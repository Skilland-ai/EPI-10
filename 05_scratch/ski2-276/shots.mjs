import { createRequire } from 'node:module';
const require = createRequire('/home/reboot/Escritorio/Skilland.ai/skilland-finance-c-dashboard-controller/apps/dashboard/');
const { chromium } = require('playwright');
const out = process.argv[2];
const b = await chromium.launch();
for (const [w, h] of [[1366, 900], [390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: w < 500 ? 2 : 1 });
  for (const [n, u] of [['lista', '/informes/index.html'], ['caso', '/informes/casos/caso.html'], ['login', '/informes/login.html']]) {
    await p.goto('http://127.0.0.1:4977' + u); await p.waitForLoadState('networkidle');
    await p.screenshot({ path: `${out}/informes_${n}_${w}.png`, fullPage: true });
  }
  await p.close();
}
await b.close();
