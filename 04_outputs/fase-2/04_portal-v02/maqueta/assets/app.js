/* EPI10 · Portal v0.2 · maqueta: cabecera, navegación, recorrido guiado y componentes comunes.
   Sin dependencias ni servidor: se abre con doble clic. */
(function () {
  "use strict";

  var RECORRIDO = [
    { f: "chatbot.html", t: "Puerta B · El chatbot de la web", v: "nuevo",
      n: "Marta llega desde la web. Cuestionario multifórmula de Aitor en forma de conversación: una pregunta por burbuja, filtros de seguridad y resultado antes de pedir el correo." },
    { f: "gratuita.html", t: "Cuenta gratuita · portal sin informe", v: "nuevo",
      n: "Lo que ve una cuenta B: tres semáforos del chatbot, dos hábitos, su fórmula orientativa y la invitación al informe. Útil, no vacío." },
    { f: "se-mantiene.html", t: "Compra, consentimiento, cuestionario y kit", v: "mantiene",
      n: "El recorrido de la fase 1 no cambia: pago con Stripe, alta, consentimiento firmado, cuestionario de hábitos (ya medio relleno por el chatbot) y elección del test." },
    { f: "espera.html", t: "Espera del informe", v: "cambia",
      n: "El inicio de la v0.1 con su stepper, más dos hábitos ya activos y tres tarjetas de «qué vas a descubrir». El portal no está vacío durante semanas." },
    { f: "mi-informe.html", t: "Mi informe, versión visual", v: "cambia",
      n: "Antes era un PDF con un visor. Ahora el resumen visual va primero (rueda, prioridades, complementación) y el PDF completo se descarga abajo. Mismos componentes que el informe de CON-582." },
    { f: "mi-plan.html", t: "Mi plan · la pantalla principal", v: "nuevo",
      n: "La pantalla que sustituye a «Tu espacio» tras el informe. Recuento, tres prioridades, la semana de hábitos, la suplementación y la próxima revisión." },
    { f: "prioridades.html", t: "Tus tres prioridades", v: "nuevo",
      n: "Por qué cada prioridad, de dónde sale (genética o hábitos), qué hacer y cuándo se revisa. Una se resuelve sin producto." },
    { f: "habitos.html", t: "Hábitos con semáforo y seguimiento", v: "nuevo",
      n: "Rejilla semanal: se toca la celda y se elige sí, no o saltar. Progreso «de 7», sin rachas. Tira de evolución por hábito. Pausar el plan sin culpa." },
    { f: "suplementacion.html", t: "Suplementación, compra y recompra", v: "nuevo",
      n: "Tomar, mantener, revisar y dejar con el mismo peso. Cada una con su porqué. Lo que EPI10 no vende sale igual. «Pedir de nuevo» cuando quedan unos días, y «Ajustar» antes que la baja." },
    { f: "revision.html", t: "Revisión mensual · dos minutos", v: "nuevo",
      n: "Seis preguntas con pulsador. Al terminar, los semáforos cambian, se ve antes → ahora y se decide la suplementación del mes que viene. Lo que baja avisa al equipo." },
    { f: "investigacion.html", t: "Consentimiento para investigación", v: "nuevo",
      n: "Aparte del consentimiento del servicio. Opcional, por finalidades, revocable y sin efecto en el precio. Con lo que se guarda, quién lo ve y el registro de exportaciones." },
    { f: "ya-tengo-mi-test.html", t: "Puerta C · Ya tengo mi test", v: "nuevo",
      n: "Solo un formulario de solicitud con subida de archivo. En la v1 se atiende a mano y solo con TellmeGen." },
    { f: "equipo-hoy.html", t: "Equipo · Hoy, con los planes", v: "cambia",
      n: "El inicio del back office de la v0.1 con un bloque nuevo: semáforos que han bajado, revisiones pendientes, recompras próximas y la métrica principal." },
    { f: "equipo-ficha.html", t: "Equipo · Ficha de la clienta, pestaña Plan", v: "cambia",
      n: "Misma ficha de la v0.1 con una pestaña nueva: el plan de la clienta con los mismos componentes que ve ella, su evolución y la alerta de lo que ha bajado." }
  ];
  var V02 = { nuevo: "Nuevo en v0.2", cambia: "Cambia en v0.2", mantiene: "Se mantiene de v0.1" };

  var E = window.EPI || {};
  var COLOR = { verde: "#2e9e6a", ambar: "#e8a317", rojo: "#d6453d", gris: "#c5cbd3", nuevo: "#029acc" };
  var ESTADO_TXT = { verde: "Vas bien", ambar: "Mejorable", rojo: "Prioridad", gris: "Sin datos todavía" };
  var EST_SUPL = { tomar: ["Tomar", "mas"], mantener: ["Mantener", "check"], revisar: ["Revisar", "ajustar"], dejar: ["Dejar", "cruz"] };

  function ic(n, cls) { return '<svg class="ic ' + (cls || "") + '" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function sem(estado, txt) { return '<span class="sem sem-' + estado + '">' + (txt || ESTADO_TXT[estado]) + "</span>"; }
  function est(e) { var d = EST_SUPL[e]; return '<span class="est est-' + e + '">' + ic(d[1]) + d[0] + "</span>"; }
  function area(id) { return (E.areas || []).filter(function (a) { return a.id === id; })[0] || { nombre: id, id: id }; }

  function recuento(areas, oscuro) {
    var c = { verde: 0, ambar: 0, rojo: 0, gris: 0 };
    areas.forEach(function (a) { c[a.estado] = (c[a.estado] || 0) + 1; });
    var partes = [];
    if (c.verde) partes.push("<b>" + c.verde + "</b> vas bien");
    if (c.ambar) partes.push("<b>" + c.ambar + "</b> mejorable" + (c.ambar > 1 ? "s" : ""));
    if (c.rojo) partes.push("<b>" + c.rojo + "</b> prioridad" + (c.rojo > 1 ? "es" : ""));
    if (c.gris) partes.push("<b>" + c.gris + "</b> sin datos todavía");
    var barra = ["verde", "ambar", "rojo", "gris"].map(function (k) {
      return c[k] ? '<i class="' + k[0] + '" style="flex:' + c[k] + '"></i>' : "";
    }).join("");
    return '<div class="recuento"><div class="recuento-txt">De ' + areas.length + " áreas: " + partes.join(" · ") +
      '</div><div class="barra3" role="img" aria-label="Recuento por estado">' + barra + "</div></div>";
  }

  function arco(r1, r2, a0, a1) {
    function p(r, a) { var rad = (a - 90) * Math.PI / 180; return [r * Math.cos(rad), r * Math.sin(rad)]; }
    var L = a1 - a0 > 180 ? 1 : 0, A = p(r1, a0), B = p(r1, a1), C = p(r2, a1), D = p(r2, a0);
    return "M" + A[0].toFixed(2) + " " + A[1].toFixed(2) + "A" + r1 + " " + r1 + " 0 " + L + " 1 " + B[0].toFixed(2) + " " + B[1].toFixed(2) +
      "L" + C[0].toFixed(2) + " " + C[1].toFixed(2) + "A" + r2 + " " + r2 + " 0 " + L + " 0 " + D[0].toFixed(2) + " " + D[1].toFixed(2) + "Z";
  }

  /* La rueda del perfil: misma geometría que render.py del informe (CON-582). */
  function rueda(areas, op) {
    op = op || {};
    var n = areas.length, paso = 360 / n, hueco = 2.4, ro = 104, ri = 60, rl = 124;
    var vb = op.mini ? "-110 -110 220 220" : "-190 -146 380 292";
    var s = ['<svg class="rueda' + (op.mini ? " rueda-mini" : "") + '" viewBox="' + vb + '" role="img" aria-label="Rueda del perfil: ' +
      areas.map(function (a) { return a.nombre + ", " + ESTADO_TXT[a.estado]; }).join("; ") + '">'];
    areas.forEach(function (a, i) {
      var a0 = i * paso + hueco / 2, a1 = (i + 1) * paso - hueco / 2, mid = ((a0 + a1) / 2 - 90) * Math.PI / 180, rm = (ro + ri) / 2;
      s.push('<path class="sector" data-area="' + a.id + '" d="' + arco(ro, ri, a0, a1) + '" fill="' + COLOR[a.estado] + '"><title>' + esc(a.nombre) + " · " + ESTADO_TXT[a.estado] + "</title></path>");
      s.push('<use href="#i-' + a.id + '" x="' + (rm * Math.cos(mid) - 12).toFixed(1) + '" y="' + (rm * Math.sin(mid) - 12).toFixed(1) + '" width="24" height="24" style="color:#fff;pointer-events:none"/>');
      if (!op.mini) {
        var lx = rl * Math.cos(mid), ly = rl * Math.sin(mid), anc = Math.abs(lx) < 20 ? "middle" : (lx > 0 ? "start" : "end");
        var dy = ly < -90 ? -4 : (ly > 90 ? 12 : 4);
        s.push('<text x="' + lx.toFixed(1) + '" y="' + (ly + dy).toFixed(1) + '" text-anchor="' + anc + '" class="rueda-lab">' + esc(a.nombre) + "</text>");
      }
    });
    var c = { verde: 0, ambar: 0, rojo: 0, gris: 0 };
    areas.forEach(function (a) { c[a.estado]++; });
    s.push('<circle r="54" fill="#fff"/>');
    if (op.centro) { s.push(op.centro); }
    else {
      s.push('<text y="-16" text-anchor="middle" class="rueda-k">TU PERFIL</text>');
      var ks = ["verde", "ambar", "rojo"].concat(c.gris ? ["gris"] : []).filter(function (k) { return c[k]; });
      var x = -(ks.length - 1) * 14;
      ks.forEach(function (k) {
        s.push('<circle cx="' + x + '" cy="8" r="10" fill="' + COLOR[k] + '"/><text x="' + x + '" y="12" text-anchor="middle" class="rueda-n">' + c[k] + "</text>");
        x += 28;
      });
      s.push('<text y="36" text-anchor="middle" class="rueda-s">áreas por estado</text>');
    }
    s.push("</svg>");
    return s.join("");
  }

  /* Rueda + lista de áreas: tocar un sector o una fila abre el detalle con la doble marca. */
  function ruedaConLista(cont, areas, op) {
    op = op || {};
    var lista = '<ul class="areas-lista">' + areas.map(function (a) {
      return '<li data-area="' + a.id + '"><span class="punto p-' + a.estado + '"></span><span class="nom">' + esc(a.nombre) +
        '</span><span class="fr">' + esc(a.frase) + "</span>" + ic("chevron", "ic-s gris") + "</li>";
    }).join("") + "</ul>";
    cont.innerHTML = '<div class="rueda-w">' + rueda(areas, op) + lista + '<div class="area-det"></div></div>';
    var det = cont.querySelector(".area-det");
    function sel(id) {
      var a = areas.filter(function (x) { return x.id === id; })[0];
      cont.querySelectorAll("[data-area]").forEach(function (el) { el.classList.toggle("sel", el.getAttribute("data-area") === id); });
      if (!a) return;
      det.innerHTML = '<div class="fila entre"><div class="fila">' + ic(a.id, "azul") + '<b>' + esc(a.nombre) + "</b></div>" + sem(a.estado) + "</div>" +
        (a.gen ? '<div class="orgs"><span class="org org-gen">' + ic("genetica") + "<span><b>Lo que traes</b> · " + esc(a.gen) + ' <span class="barras-g">' + barras(a.genetica) + "</span></span></span>" +
        '<span class="org org-hab">' + ic("habitos") + "<span><b>Lo que haces</b> · " + esc(a.hab) + "</span></span></div>" : '<p class="peq mt8">' + esc(a.frase) + "</p>") +
        (op.notaDet ? '<p class="nota mt8">' + op.notaDet + "</p>" : "");
      det.classList.add("on");
    }
    cont.addEventListener("click", function (ev) {
      var el = ev.target.closest("[data-area]"); if (el) sel(el.getAttribute("data-area"));
    });
    if (op.inicial) sel(op.inicial);
  }
  function barras(g) { var v = Math.round(g || 0), h = ""; for (var k = 0; k < 3; k++) h += '<i class="' + (k < v ? "on" : "") + '"></i>'; return h; }
  function escala(n) { var h = '<span class="escala">'; for (var k = 1; k <= 5; k++) h += '<i class="' + (k <= n ? "on" : "") + '"></i>'; return h + "</span>"; }
  function tira(arr, eje) {
    var h = '<span class="tira-l"><span class="tira">' + arr.map(function (e) { return '<i class="' + e + '"></i>'; }).join("") + "</span>";
    if (eje) h += '<span class="eje">' + eje.map(function (t) { return "<span>" + t + "</span>"; }).join("") + "</span>";
    return h + "</span>";
  }

  /* Rejilla semanal: tocar una celda abre «Sí · No · Saltar». Los días por venir no se marcan. */
  var DIAS = ["L", "M", "X", "J", "V", "S", "D"], HOY = 3;
  function rejilla(cont, habitos, op) {
    op = op || {};
    function celda(v, i, d) {
      var cls = "celda", cont = "";
      if (d > HOY) cls += " fut";
      else if (v === 1) { cls += " si"; cont = ic("check"); }
      else if (v === 0) { cls += " no"; cont = ic("cruz"); }
      else if (v === 2) { cls += " salta"; cont = ic("linea"); }
      if (d === HOY) cls += " hoy";
      return '<button class="' + cls + '" data-h="' + i + '" data-d="' + d + '" aria-label="' + DIAS[d] + '">' + cont + "</button>";
    }
    function pinta() {
      var h = '<table class="rej"><thead><tr><th></th>' + DIAS.map(function (d, i) { return '<th class="' + (i === HOY ? "hoy" : "") + '">' + d + "</th>"; }).join("") + "</tr></thead><tbody>";
      habitos.forEach(function (hb, i) {
        h += '<tr><td class="h">' + esc(hb.nombre) + (op.area ? "<small>" + ic(hb.area, "ic-s") + esc(area(hb.area).nombre) + "</small>" : "") + "</td>" +
          hb.semana.map(function (v, d) { return "<td>" + celda(v, i, d) + "</td>"; }).join("") + "</tr>";
      });
      h += "</tbody></table>";
      if (op.leyenda !== false) h += '<div class="leyenda"><span><i style="background:var(--verde)"></i>Sí</span><span><i style="background:var(--rojo-suave);border:1px solid #f2c6c2"></i>No</span><span><i style="background:#eef0f3"></i>Saltar (no cuenta)</span><span>Toca una celda para marcarla</span></div>';
      cont.innerHTML = h;
      if (op.alCambiar) op.alCambiar(habitos);
    }
    var menu = null;
    function cierra() { if (menu) { menu.remove(); menu = null; } }
    cont.addEventListener("click", function (ev) {
      var b = ev.target.closest(".celda"); if (!b || b.classList.contains("fut")) return;
      ev.stopPropagation(); cierra();
      var hi = +b.dataset.h, d = +b.dataset.d, r = b.getBoundingClientRect();
      menu = document.createElement("div"); menu.className = "menu-celda";
      menu.innerHTML = '<button data-v="1">' + ic("check", "ic-s") + 'Sí</button><button data-v="0">' + ic("cruz", "ic-s") + 'No</button><button data-v="2">' + ic("linea", "ic-s") + "Saltar</button>";
      document.body.appendChild(menu);
      var x = Math.min(window.scrollX + r.left - 60, window.scrollX + document.documentElement.clientWidth - menu.offsetWidth - 8);
      menu.style.left = Math.max(8, x) + "px"; menu.style.top = (window.scrollY + r.bottom + 6) + "px";
      menu.addEventListener("click", function (e2) {
        var o = e2.target.closest("button"); if (!o) return;
        habitos[hi].semana[d] = +o.dataset.v; cierra(); pinta();
      });
    });
    document.addEventListener("click", cierra);
    pinta();
  }
  function cuentaSemana(habitos) {
    var si = 0, tot = 0;
    habitos.forEach(function (h) { h.semana.forEach(function (v, d) { if (d <= HOY && v !== null && v !== 2) { tot++; if (v === 1) si++; } }); });
    return { si: si, tot: tot };
  }

  /* Modal sencillo */
  function modal(titulo, cuerpo) {
    var f = document.querySelector(".modal-fondo");
    if (!f) {
      f = document.createElement("div"); f.className = "modal-fondo";
      f.innerHTML = '<div class="modal" role="dialog" aria-modal="true"><div class="modal-cab"><h3></h3><button class="cerrar" aria-label="Cerrar">' + ic("cruz", "ic-s") + '</button></div><div class="modal-c"></div></div>';
      document.body.appendChild(f);
      f.addEventListener("click", function (e) { if (e.target === f || e.target.closest(".cerrar")) f.classList.remove("on"); });
    }
    f.querySelector("h3").textContent = titulo;
    f.querySelector(".modal-c").innerHTML = cuerpo;
    f.classList.add("on");
    return f.querySelector(".modal-c");
  }
  function cierraModal() { var f = document.querySelector(".modal-fondo"); if (f) f.classList.remove("on"); }

  /* ── Cabeceras ───────────────────────────────────────────────── */
  var NAV = {
    clienta: [["mi-plan.html", "inicio", "Mi plan"], ["habitos.html", "habitos", "Hábitos"], ["suplementacion.html", "capsula-med", "Suplementación", "Suplementos"],
              ["mi-informe.html", "documento", "Mi informe", "Informe"], ["se-mantiene.html#mensajes", "conversa", "Mensajes"]],
    gratuita: [["gratuita.html", "inicio", "Inicio"], ["gratuita.html#habitos", "habitos", "Hábitos"], ["gratuita.html#formula", "capsula-med", "Mi fórmula", "Fórmula"],
               ["gratuita.html#informe", "genetica", "Tu genética", "Genética"]],
    espera: [["espera.html", "inicio", "Tu espacio"], ["espera.html#habitos", "habitos", "Hábitos"], ["se-mantiene.html#documentos", "documento", "Documentos"],
             ["se-mantiene.html#mensajes", "conversa", "Mensajes"], ["se-mantiene.html#citas", "calendario", "Citas"]]
  };
  function cabecera(zona, actual) {
    var logo = '<a class="cab-logo" href="index.html" title="Índice de la maqueta"><img src="assets/img/epi10-azul.png" alt="EPI10"></a>';
    if (zona === "web") {
      return '<header class="cab"><div class="cab-in">' + logo + '<nav class="cab-nav" style="justify-content:flex-end"><a>El test</a><a>Fórmulas</a><a>Quiénes somos</a></nav><div class="cab-der"><a class="btn btn-s btn-sm" href="ya-tengo-mi-test.html">Ya tengo mi test</a><a class="btn btn-p btn-sm solo-escritorio" href="gratuita.html">Entrar</a></div></div></header>';
    }
    if (zona === "equipo") {
      return '<header class="cab"><div class="cab-in">' + logo + '<span class="cab-equipo">Equipo EPI10</span><div class="cab-der"><span class="cab-yo"><span class="av">O</span>Operaciones' + ic("chevron-abajo", "ic-s") + "</span></div></div></header>";
    }
    var items = NAV[zona] || NAV.clienta;
    var nav = items.map(function (it) {
      return '<a href="' + it[0] + '" class="' + (it[0].split("#")[0] === actual && it[0].indexOf("#") < 0 ? "act" : "") + '">' + ic(it[1], "ic-s") + it[2] + "</a>";
    }).join("");
    var tabs = items.map(function (it) {
      return '<a href="' + it[0] + '" class="' + (it[0].split("#")[0] === actual && it[0].indexOf("#") < 0 ? "act" : "") + '">' + ic(it[1]) + (it[3] || it[2]) + "</a>";
    }).join("");
    var c = E.clienta || { iniciales: "MG", nombre: "Marta" };
    return '<header class="cab"><div class="cab-in">' + logo + '<nav class="cab-nav">' + nav + '</nav><div class="cab-der"><a class="cab-campana" href="revision.html" title="Avisos">' + ic("campana") + "<i></i></a>" +
      '<a class="cab-yo" href="investigacion.html" title="Tus datos y permisos"><span class="av">' + c.iniciales + "</span>" + c.nombre + ic("chevron-abajo", "ic-s") + "</a></div></div></header>" +
      '<nav class="tabs" aria-label="Navegación">' + tabs + "</nav>";
  }

  function barraMaqueta(actual) {
    var i = -1;
    RECORRIDO.forEach(function (r, k) { if (r.f === actual) i = k; });
    if (i < 0) return "";
    var r = RECORRIDO[i], ant = RECORRIDO[i - 1], sig = RECORRIDO[i + 1];
    return '<div class="maq"><div class="maq-in"><span class="maq-paso">Recorrido ' + (i + 1) + "/" + RECORRIDO.length + '</span><span class="maq-tit">' + esc(r.t) + "</span>" +
      '<button class="maq-btn-nota" type="button">Nota</button><span class="maq-nav"><a class="' + (ant ? "" : "off") + '" href="' + (ant ? ant.f : "#") + '">‹ Anterior</a><a href="index.html">Índice</a><a class="' + (sig ? "" : "off") + '" href="' + (sig ? sig.f : "#") + '">Siguiente ›</a></span>' +
      '<span class="maq-nota">' + esc(r.n) + "</span></div></div>";
  }

  function pie() {
    return '<footer class="pie"><span>© 2026 EPI10 Salud · Maqueta v0.2 para el workshop · Datos de ejemplo: Marta es una clienta ficticia; fórmulas, precios y dosis pendientes del catálogo real.</span><span>No es un diagnóstico. Si tomas medicación, estás embarazada o tienes una enfermedad diagnosticada, consulta a tu profesional.</span></footer>';
  }

  document.addEventListener("DOMContentLoaded", function () {
    var b = document.body, actual = location.pathname.split("/").pop() || "index.html";
    if (/[?&]captura/.test(location.search)) b.classList.add("captura");
    var zona = b.getAttribute("data-zona");
    var pre = barraMaqueta(actual) + (zona ? cabecera(zona, actual) : "");
    b.insertAdjacentHTML("afterbegin", pre);
    if (zona && zona !== "web" && zona !== "equipo") b.classList.add("con-tabs");
    if (b.hasAttribute("data-pie")) b.insertAdjacentHTML("beforeend", pie());
    var v = b.getAttribute("data-v02");
    document.querySelectorAll("[data-marca]").forEach(function (el) { el.innerHTML = '<span class="v02 v02-' + v + '">' + V02[v] + "</span>"; });
    var nb = document.querySelector(".maq-btn-nota");
    if (nb) nb.addEventListener("click", function () { document.querySelector(".maq").classList.toggle("abierta"); });
    document.querySelectorAll("[data-ic]").forEach(function (el) { el.insertAdjacentHTML("afterbegin", ic(el.getAttribute("data-ic"), el.getAttribute("data-ic-c") || "")); });
  });

  window.EPIU = { ic: ic, esc: esc, sem: sem, est: est, area: area, recuento: recuento, rueda: rueda, ruedaConLista: ruedaConLista,
    barras: barras, escala: escala, tira: tira, rejilla: rejilla, cuentaSemana: cuentaSemana, modal: modal, cierraModal: cierraModal,
    RECORRIDO: RECORRIDO, V02: V02, ESTADO_TXT: ESTADO_TXT, COLOR: COLOR, DIAS: DIAS, HOY: HOY };
})();
