/* Capturas de la maqueta v0.2 con Chromium sin interfaz, sobre los ficheros locales (sin servidor).
   Uso: node capturar.cjs [pagina.html ...]     (sin argumentos: todas)
   Variables: PW_CORE = ruta a playwright-core · CHROME = ejecutable de Chromium / headless shell.
   Salida: ../capturas/NN_nombre_escritorio.png y NN_nombre_movil.png (página completa). */
const path = require("path");
const fs = require("fs");
const os = require("os");
const PW = process.env.PW_CORE || path.join(os.homedir(), ".nvm/versions/node/v22.22.0/lib/node_modules/brandmd/node_modules/playwright-core");
const CHROME = process.env.CHROME || path.join(os.homedir(), ".cache/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-linux64/chrome-headless-shell");
const { chromium } = require(PW);

const MAQ = path.resolve(__dirname, "../maqueta");
const OUT = path.resolve(__dirname, "../capturas");

// [nº, fichero, nombre, acciones opcionales antes de capturar]
const PANTALLAS = [
  ["01", "chatbot.html", "chatbot_inicio"],
  ["02", "chatbot.html", "chatbot_resultado", async (p) => { await p.click("#comoMarta"); await p.waitForSelector("#resultado:not(.oculto)", { timeout: 20000 }); await p.waitForTimeout(400); }],
  ["03", "gratuita.html", "cuenta_gratuita"],
  ["04", "se-mantiene.html", "se_mantiene_v01"],
  ["05", "espera.html", "espera_informe"],
  ["06", "mi-informe.html", "mi_informe"],
  ["07", "mi-informe.html", "mi_informe_sensible", async (p) => { await p.click("#verSensible"); await p.click("#confirmaSensible"); await p.waitForTimeout(200); await p.evaluate(() => document.querySelector("#sensible").scrollIntoView()); }],
  ["08", "mi-plan.html", "mi_plan"],
  ["09", "prioridades.html", "prioridades"],
  ["10", "habitos.html", "habitos"],
  ["11", "suplementacion.html", "suplementacion"],
  ["12", "suplementacion.html", "suplementacion_pedido", async (p) => { await p.click("#btnPedir"); await p.waitForTimeout(200); }, { recorte: true }],
  ["13", "revision.html", "revision_pregunta", async (p) => { await p.click("#empezar"); await p.waitForTimeout(150); }],
  ["14", "revision.html", "revision_resultado", async (p) => { await p.click("#comoMarta"); await p.waitForSelector("#res:not(.oculto)", { timeout: 20000 }); await p.waitForTimeout(300); }],
  ["15", "investigacion.html", "consentimiento_investigacion"],
  ["16", "ya-tengo-mi-test.html", "puerta_c"],
  ["17", "equipo-hoy.html", "equipo_hoy"],
  ["18", "equipo-ficha.html", "equipo_ficha_plan"],
  ["00", "index.html", "indice"],
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const filtro = process.argv.slice(2);
  const b = await chromium.launch({ executablePath: CHROME });
  for (const [n, f, nombre, accion, op] of PANTALLAS) {
    if (filtro.length && !filtro.includes(f) && !filtro.includes(nombre)) continue;
    for (const [disp, vp] of [["escritorio", { width: 1440, height: 900 }], ["movil", { width: 390, height: 844 }]]) {
      const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: disp === "movil" ? 2 : 1 });
      const p = await ctx.newPage();
      const errores = [];
      p.on("pageerror", (e) => errores.push(e.message));
      await p.goto("file://" + path.join(MAQ, f) + (f === "index.html" ? "" : "?captura"));
      await p.waitForTimeout(350);
      if (accion) await accion(p);
      const ancho = await p.evaluate(() => document.documentElement.scrollWidth);
      const archivo = path.join(OUT, `${n}_${nombre}_${disp}.png`);
      await p.screenshot({ path: archivo, fullPage: !(op && op.recorte) });
      console.log(`${archivo.split("/").pop()}${ancho > vp.width ? `  ⚠ desborda: ${ancho}px` : ""}${errores.length ? "  ⚠ errores: " + errores.join(" | ") : ""}`);
      await ctx.close();
    }
  }
  await b.close();
})();
