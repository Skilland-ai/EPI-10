/*
 * Fase 2 · portal propio (CON-212). Sello «Vista simulada · fase 2» y recorrido guiado sobre la
 * instancia real de OpenEMR con el módulo EPI10. Mismo patrón que el recorrido de la fase 1
 * (epi10-orquestador/deploy/aporta/guia/recorrido.js): Caddy lo inyecta en cada documento HTML y
 * no se toca la aplicación.
 *
 * Aquí todo ocurre en un solo dominio, así que el paso se guarda en localStorage. El recorrido
 * nunca atrapa a nadie: siempre hay «Atrás», «Siguiente» o «Salir», y si la pantalla no es la del
 * paso, ofrece ir a ella.
 *
 * Las credenciales de las cuentas ficticias no están en el código: se leen de /__fase2/cuentas.json,
 * que solo existe en el VPS y solo se sirve tras la puerta.
 */
(function () {
  'use strict';
  if (window.top !== window.self) return; // los iframes del back office van dentro de la página sellada

  var CLAVE = 'epi10_fase2_tour';
  var ANCHO_MINIMO = 900;
  var UI = '/interface/modules/custom_modules/oe-module-epi10-ui/public';
  var BO = UI + '/backoffice/';
  var PORTAL_LOGIN = '/portal/index.php?site=default';
  var BO_LOGIN = '/interface/login/login.php?site=default';

  // ---------- Sello ----------
  function sello() {
    if (document.querySelector('.f2-sello')) return;
    var s = document.createElement('div');
    s.className = 'f2-sello';
    s.setAttribute('role', 'note');
    s.innerHTML = 'Vista simulada · fase 2 <small>· Así se vería el portal propio. Todavía no está implementado.</small>';
    document.body.appendChild(s);
  }

  // ---------- Utilidades ----------
  var ruta = function () { return location.pathname; };
  var hay = function (sel) { var n = document.querySelector(sel); return !!(n && (n.offsetParent || n.getClientRects().length)); };
  var titulo = function () { var h = document.querySelector('h1'); return h ? h.textContent.trim() : ''; };
  var pasoOnb = function () {
    var n = document.querySelector('[data-epi10-onboarding-paso]');
    return n ? n.getAttribute('data-epi10-onboarding-paso') : null;
  };
  var enLoginPortal = function () { return /^\/portal\/(index\.php)?$/.test(ruta()) && hay('#uname'); };
  var enLoginBO = function () { return /\/interface\/login\/login\.php$/.test(ruta()) && hay('#authUser'); };
  var enOnboarding = function () { return /\/portal\/onboarding\.php$/.test(ruta()); };
  var enHome = function () { return /\/portal\/home\.php$/.test(ruta()); };
  var clientaHome = function () {
    var b = document.querySelector('.epi-usermenu__trigger');
    return b ? b.textContent.replace(/\s+/g, ' ').trim() : '';
  };

  function rellenar(sel, valor) {
    var n = document.querySelector(sel);
    if (!n) return false;
    var proto = n.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(n, valor);
    n.dispatchEvent(new Event('input', { bubbles: true }));
    n.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }

  // Cierra la sesión del portal sin pasar por la pantalla de error de logout.php (lleva «&w»).
  function salirPortal(destino) {
    var ir = function () { location.href = destino; };
    fetch('/portal/logout.php', { credentials: 'same-origin', redirect: 'manual', cache: 'no-store' }).then(ir, ir);
  }

  var cuentas = null;
  function conCuentas(fn) {
    if (cuentas) return fn(cuentas);
    fetch('/__fase2/cuentas.json', { credentials: 'same-origin', cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (c) { cuentas = c; fn(c); })
      .catch(function () { alert('No se han podido leer las cuentas de prueba.'); });
  }
  function entrarPortal(quien) {
    conCuentas(function (c) {
      rellenar('#uname', c[quien].usuario);
      rellenar('#pass', c[quien].clave);
      var b = document.querySelector('form button[type=submit], #submit');
      if (b) b.focus();
    });
  }

  // ---------- Pasos ----------
  var PARTES = ['Inicio', 'Correo', 'Portal de la clienta', 'Su informe', 'Back office'];

  var PASOS = [
    // 1 · Inicio
    {
      id: 'inicio', parte: 1, url: '/', donde: function () { return ruta() === '/'; },
      titulo: 'Fase 2 · Portal propio',
      texto: '<p>Lo que vais a ver es la <strong>instancia real de OpenEMR</strong> con el módulo EPI10 que hemos construido, con datos ficticios.</p>' +
        '<p>Son <strong>vistas simuladas</strong>: así se vería vuestro portal propio. Todavía no está implementado ni conectado con vuestro sistema.</p>',
    },
    {
      id: 'inicio-pago', parte: 1, url: '/', donde: function () { return ruta() === '/'; },
      el: '#f2-capturas', lado: 'top',
      titulo: 'Empieza donde terminó la fase 1',
      texto: '<p>La clienta compra NutriWell y paga en la pasarela de Stripe. Eso ya lo habéis visto funcionando en la fase 1, así que aquí lo damos por hecho.</p>',
    },
    {
      id: 'inicio-correo', parte: 1, url: '/', donde: function () { return ruta() === '/'; },
      el: '#ir-correo', lado: 'top', accion: true,
      hecho: function () { return /^\/correo\/?/.test(ruta()); },
      titulo: 'Tras pagar, le llega un correo',
      texto: '<p>Pulsa «Ver el correo».</p>',
    },
    // 2 · Correo
    {
      id: 'correo', parte: 2, url: '/correo/', donde: function () { return /^\/correo\/?/.test(ruta()); },
      el: '#f2-correo', lado: 'right',
      titulo: 'Así le llega el correo',
      texto: '<p>En español y con vuestra marca. Lo envía el sistema en cuanto se confirma el pago, con un enlace personal de un solo uso.</p>' +
        '<span class="f2-nota">Correo simulado: en la demo no se envía ningún correo.</span>',
    },
    {
      id: 'correo-entrar', parte: 2, url: '/correo/', donde: function () { return /^\/correo\/?/.test(ruta()); },
      el: '#entrar', lado: 'right', accion: true,
      hecho: function () { return enLoginPortal() || enOnboarding(); },
      titulo: 'Entra en su espacio',
      texto: '<p>Pulsa «Entrar en mi espacio».</p>',
    },
    // 3 · Portal de la clienta (Marta, primera vez)
    {
      id: 'login-marta', parte: 3, url: PORTAL_LOGIN, donde: enLoginPortal,
      el: '.epi-auth__card', lado: 'left', accion: true,
      hecho: function () { return enOnboarding() || enHome(); },
      ayuda: [{ texto: 'Rellenar con Marta (ficticia)', fn: function () { entrarPortal('marta'); } }],
      titulo: 'La puerta del portal',
      texto: '<p>Con vuestra marca y en español. En el sistema real, el enlace del correo la deja dentro sin escribir nada; aquí entramos con una clienta de prueba.</p><p>Rellena y pulsa «Entrar».</p>',
    },
    {
      id: 'onb-bienvenida', parte: 3, url: PORTAL_LOGIN, donde: function () { return enOnboarding() && pasoOnb() === 'bienvenida'; },
      el: '[data-epi10-accion=empezar]', lado: 'top', accion: true,
      hecho: function () { return enOnboarding() && !!pasoOnb() && pasoOnb() !== 'bienvenida'; },
      titulo: 'La primera vez, el portal la guía',
      texto: '<p>Antes de nada, tres cosas: el consentimiento, el cuestionario de hábitos y elegir dónde hace el test. Hasta que no las completa, no ve nada más.</p><p>Pulsa «Empezar».</p>',
    },
    {
      id: 'onb-nacimiento', parte: 3, url: PORTAL_LOGIN, donde: function () { return enOnboarding() && hay('form[data-epi10-nacimiento]'); },
      el: 'form[data-epi10-nacimiento]', lado: 'right', accion: true,
      hecho: function () { return enOnboarding() && !!pasoOnb() && pasoOnb() !== 'bienvenida' && !hay('form[data-epi10-nacimiento]'); },
      ayuda: [{ texto: 'Poner una fecha ficticia', fn: function () { rellenar('#epi10-nacimiento', '1988-04-12'); } }],
      titulo: 'Un dato antes de firmar',
      texto: '<p>Si su ficha no tiene la fecha de nacimiento, se la pide aquí y la guarda en OpenEMR.</p><p>Pon una fecha y pulsa «Continuar al consentimiento».</p>',
    },
    {
      id: 'onb-consentimiento', parte: 3, url: PORTAL_LOGIN, donde: function () { return enOnboarding() && pasoOnb() === 'consentimiento'; },
      libre: true, accion: true,
      hecho: function () { return enOnboarding() && pasoOnb() && pasoOnb() !== 'consentimiento'; },
      titulo: 'Firma el consentimiento',
      texto: '<p>Lee el documento, marca las dos casillas y firma con el dedo o el ratón. Se guarda firmado en su ficha, y el equipo lo ve al momento.</p><p>Firma y pulsa «Firmar y enviar a EPI10».</p>',
    },
    {
      id: 'onb-cuestionario', parte: 3, url: PORTAL_LOGIN, donde: function () { return enOnboarding() && pasoOnb() === 'encuesta_habitos'; },
      libre: true, accion: true,
      hecho: function () { return enOnboarding() && pasoOnb() && pasoOnb() !== 'encuesta_habitos'; },
      titulo: 'Cuestionario de hábitos',
      texto: '<p>Seis preguntas cortas, una por pantalla, y al final repasa sus respuestas antes de enviarlas.</p><p>Contesta lo que quieras: son datos ficticios.</p>',
    },
    {
      id: 'onb-test', parte: 3, url: PORTAL_LOGIN, donde: function () { return enOnboarding() && pasoOnb() === 'test'; },
      libre: true, accion: true,
      hecho: function () { return enOnboarding() && pasoOnb() === 'listo'; },
      ayuda: [{
        texto: 'Rellenar dirección ficticia', fn: function () {
          var casa = document.querySelector('label[data-epi10-modalidad="casa"]');
          if (casa && !hay('#epi10-envio-direccion')) casa.click();
          setTimeout(function () {
            rellenar('#epi10-envio-direccion', 'Calle Ficticia 8, 2.º B');
            rellenar('#epi10-envio-cp', '28010');
            rellenar('#epi10-envio-ciudad', 'Madrid');
            rellenar('#epi10-envio-telefono', '600000003');
            var m = document.querySelector('input[name=franja][value=manana]');
            if (m) m.click();
          }, 300);
        },
      }],
      titulo: '¿Dónde hace el test?',
      texto: '<p>En casa, y le enviamos el kit por mensajería, o en la sede, y reserva cita en el calendario del equipo.</p><p>Elige «En casa», rellena la dirección y pulsa «Confirmar envío».</p>',
    },
    {
      id: 'onb-listo', parte: 3, url: PORTAL_LOGIN, donde: function () { return enOnboarding() && pasoOnb() === 'listo'; },
      el: '[data-epi10-accion=ir-al-inicio]', lado: 'top', accion: true,
      hecho: enHome,
      titulo: 'Todo listo',
      texto: '<p>Ya ha hecho su parte. El equipo recibe el aviso y el caso avanza solo.</p><p>Pulsa el botón para ir a su espacio.</p>',
    },
    {
      id: 'home-marta', parte: 3, url: '/portal/home.php', donde: enHome,
      el: '.epi-fase', lado: 'bottom',
      titulo: 'Su espacio',
      texto: '<p>Arriba, siempre, en qué paso está y qué viene después. Debajo, sus documentos, sus citas, los mensajes con el equipo y, al final, su informe.</p>',
    },
    {
      id: 'cambio-lucia', parte: 4, url: '/portal/home.php', donde: enHome,
      titulo: 'Unas semanas después',
      texto: '<p>Saltamos al final del proceso: así lo ve <strong>Lucía</strong>, que ya tiene su informe.</p>',
      primario: { texto: 'Entrar como Lucía', fn: function () { salirPortal(PORTAL_LOGIN); } },
      hecho: function () { return enLoginPortal(); },
    },
    {
      id: 'login-lucia', parte: 4, url: PORTAL_LOGIN, donde: enLoginPortal,
      el: '.epi-auth__card', lado: 'left', accion: true,
      hecho: function () { return enHome() && /Luc/.test(clientaHome()); },
      ayuda: [{ texto: 'Rellenar con Lucía (ficticia)', fn: function () { entrarPortal('lucia'); } }],
      titulo: 'Entramos como Lucía',
      texto: '<p>Rellena y pulsa «Entrar».</p>',
    },
    {
      id: 'home-lucia', parte: 4, url: '/portal/home.php', donde: function () { return enHome() && /Luc/.test(clientaHome()); },
      el: '.epi-fase', lado: 'bottom',
      titulo: 'Paso 5 de 5: informe listo',
      texto: '<p>Le avisamos por correo y aquí lo tiene a un clic. Solo ve los informes que el equipo ha revisado y publicado.</p>',
    },
    {
      id: 'lucia-informe', parte: 4, url: '/portal/home.php', donde: function () { return enHome() && /Luc/.test(clientaHome()); },
      el: '.epi-fase__cta', lado: 'bottom', accion: true,
      hecho: function () { return /\/portal\/biblioteca(-documento)?\.php$/.test(ruta()); },
      titulo: 'Abre su informe',
      texto: '<p>Pulsa «Ver mi informe».</p>',
    },
    {
      id: 'lucia-biblioteca', parte: 4, url: UI + '/portal/biblioteca.php', donde: function () { return /\/portal\/biblioteca\.php$/.test(ruta()); },
      el: 'a[href*="biblioteca-documento"]', lado: 'left', accion: true,
      hecho: function () { return /\/portal\/biblioteca-documento\.php$/.test(ruta()); },
      titulo: 'Mi informe',
      texto: '<p>Su informe y sus documentos, siempre disponibles. Pulsa «Abrir».</p>',
    },
    {
      id: 'lucia-visor', parte: 4, url: UI + '/portal/biblioteca.php', donde: function () { return /\/portal\/biblioteca-documento\.php$/.test(ruta()); },
      titulo: 'El informe, en el portal',
      texto: '<p>Lo lee aquí mismo o lo descarga en PDF. Si tiene dudas, escribe al equipo desde Mensajes y le respondéis en el mismo hilo.</p>',
    },
    // 5 · Back office
    {
      id: 'bo-entrar', parte: 5, url: UI + '/portal/biblioteca.php', donde: function () { return /\/portal\//.test(ruta()); },
      titulo: 'Ahora, el lado del equipo',
      texto: '<p>Pasamos al back office: lo que ven Aitor y el equipo.</p>',
      primario: { texto: 'Ir al back office', fn: function () { location.href = BO_LOGIN; } },
      hecho: function () { return enLoginBO() || /\/interface\/main\/tabs\/main\.php$/.test(ruta()) || ruta().indexOf(BO) === 0; },
    },
    {
      id: 'bo-login', parte: 5, url: BO_LOGIN, donde: enLoginBO,
      el: '.epi-auth__card', lado: 'left', accion: true,
      hecho: function () { return /\/interface\/main\/tabs\/main\.php$/.test(ruta()) || ruta().indexOf(BO) === 0; },
      ayuda: [{
        texto: 'Rellenar con el usuario de Carmen', fn: function () {
          conCuentas(function (c) { rellenar('#authUser', c.equipo.usuario); rellenar('#clearPass', c.equipo.clave); });
        },
      }],
      titulo: 'Acceso del equipo',
      texto: '<p>Cada persona del equipo entra con su usuario y su rol. Aquí, con el usuario de Carmen, que tiene el mismo rol que operaciones.</p><p>Rellena y pulsa «Entrar».</p>',
    },
    {
      id: 'bo-inicio', parte: 5, url: BO + 'inicio.php',
      donde: function () { return /\/interface\/main\/tabs\/main\.php$/.test(ruta()) || /\/backoffice\/inicio\.php$/.test(ruta()); },
      saltarSi: function () { return /\/interface\/main\/tabs\/main\.php$/.test(ruta()); },
      el: '.epi-selector', lado: 'bottom',
      titulo: 'El inicio del equipo',
      texto: '<p>OpenEMR por dentro, pero con vuestra interfaz: solo las funciones que usa el equipo, sin el menú clínico completo.</p>',
    },
    {
      id: 'bo-hoy', parte: 5, url: BO + 'inicio.php', donde: function () { return /\/backoffice\/inicio\.php$/.test(ruta()); },
      el: '.epi-casos', lado: 'top',
      titulo: 'Lo que toca hoy',
      texto: '<p>Los casos que esperan al equipo, con la etapa que marca Odoo, y debajo los consentimientos y cuestionarios que acaban de enviar las clientas. Ahí está el que firmó Marta hace un momento.</p>',
    },
    {
      id: 'bo-a-clientes', parte: 5, url: BO + 'inicio.php', donde: function () { return /\/backoffice\/inicio\.php$/.test(ruta()); },
      el: 'a.epi-selector__item[href*="clientes.php"]', lado: 'bottom', accion: true,
      hecho: function () { return /\/backoffice\/clientes\.php$/.test(ruta()); },
      titulo: 'Clientes',
      texto: '<p>Pulsa «Clientes».</p>',
    },
    {
      id: 'bo-clientes', parte: 5, url: BO + 'clientes.php', donde: function () { return /\/backoffice\/clientes\.php$/.test(ruta()); },
      el: 'a.epi-bo-fila[href*="set_pid=1"]', lado: 'top', accion: true,
      hecho: function () { return /\/backoffice\/ficha\.php$/.test(ruta()); },
      titulo: 'Todas las clientas, por fase',
      texto: '<p>Filtradas por fase: alta, onboarding, test en curso o informe entregado.</p><p>Pulsa en Lucía para abrir su ficha.</p>',
    },
    {
      id: 'bo-ficha', parte: 5, url: BO + 'ficha.php?set_pid=1', donde: function () { return /\/backoffice\/ficha\.php$/.test(ruta()); },
      el: '.epi-card', lado: 'bottom',
      titulo: 'La ficha de la clienta',
      texto: '<p>Sus datos, en qué fase está y el siguiente paso. Debajo, en pestañas: documentos firmados, mensajes, citas y datos de envío, con toda su actividad en orden.</p>',
    },
    {
      id: 'fin', parte: 5, url: BO + 'ficha.php?set_pid=1', donde: function () { return true; },
      titulo: 'Fin del recorrido',
      texto: '<p>Esto es lo que ya funciona en laboratorio, sobre OpenEMR y con datos ficticios.</p>' +
        '<p>Llevarlo a producción, conectarlo con el orquestador y con Odoo y desplegarlo en vuestro servidor es el trabajo de la fase 2.</p>',
      fin: true,
    },
  ];

  // ---------- Estado ----------
  function leer() {
    try { return JSON.parse(localStorage.getItem(CLAVE)) || null; } catch (e) { return null; }
  }
  function guardar(e) {
    try { localStorage.setItem(CLAVE, JSON.stringify(e)); } catch (x) { /* sin almacenamiento: el recorrido vive solo en esta página */ }
    estado = e;
  }
  var estado = leer();

  // ---------- Pintado ----------
  var pintor = null;
  var pintado = null; // clave de lo que hay pintado: id del paso + si el elemento estaba
  var aviso = null;
  var retomar = null;

  function crearPintor() {
    if (pintor || !window.driver || !window.driver.js) return pintor;
    pintor = window.driver.js.driver({
      animate: false,
      allowClose: false,
      overlayOpacity: 0.45,
      stagePadding: 8,
      stageRadius: 12,
      popoverClass: 'f2-pop',
      showButtons: [],
      disableActiveInteraction: false,
      allowKeyboardControl: false,
    });
    return pintor;
  }
  function cerrarTodo() {
    if (pintor && pintor.isActive()) pintor.destroy();
    pintor = null;
    pintado = null;
    if (aviso) { aviso.remove(); aviso = null; }
    if (retomar) { retomar.remove(); retomar = null; }
  }

  function boton(texto, clase, fn) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = clase;
    b.textContent = texto;
    b.addEventListener('click', function (ev) { ev.preventDefault(); ev.stopPropagation(); fn(); });
    return b;
  }

  function botonera(p, i) {
    var f = document.createElement('div');
    f.className = 'f2-botones';
    if (i > 0) f.appendChild(boton('Atrás', 'f2-btn f2-btn--sec', function () { ir(i - 1, true); }));
    (p.ayuda || []).forEach(function (a) { f.appendChild(boton(a.texto, 'f2-btn f2-btn--ayuda', a.fn)); });
    var hueco = document.createElement('span'); hueco.className = 'f2-hueco'; f.appendChild(hueco);
    if (p.fin) {
      f.appendChild(boton('Volver al principio', 'f2-btn f2-btn--sec', reiniciar));
      f.appendChild(boton('Cerrar', 'f2-btn', salir));
    } else if (p.primario) {
      f.appendChild(boton(p.primario.texto, 'f2-btn', p.primario.fn));
    } else if (p.accion) {
      var e = document.createElement('span'); e.className = 'f2-espera'; e.textContent = 'Te esperamos';
      f.appendChild(e);
    } else {
      f.appendChild(boton('Siguiente', 'f2-btn', function () { ir(i + 1, false); }));
    }
    return f;
  }

  function pie(p, i) {
    var w = document.createElement('div');
    w.appendChild(botonera(p, i));
    var g = document.createElement('div');
    g.className = 'f2-progreso';
    g.textContent = 'Parte ' + p.parte + ' de ' + PARTES.length + ' · ' + PARTES[p.parte - 1] + ' · ';
    var s = boton('Salir del recorrido', 'f2-enlace', salir);
    g.appendChild(s);
    if (p.accion) {
      g.appendChild(document.createTextNode(' · '));
      g.appendChild(boton('Saltar este paso', 'f2-enlace', function () { ir(i + 1, false); }));
    }
    w.appendChild(g);
    return w;
  }

  function pintarLibre(p, i) {
    var clave = p.id + '~';
    if (pintado === clave && aviso) return;
    if (pintor && pintor.isActive()) pintor.destroy();
    pintor = null;
    if (retomar) { retomar.remove(); retomar = null; }
    if (aviso) aviso.remove();
    pintado = clave;
    aviso = document.createElement('div');
    aviso.className = 'f2-aviso f2-tarjeta';
    aviso.setAttribute('role', 'dialog');
    aviso.setAttribute('data-paso', p.id + '~');
    aviso.innerHTML = '<span class="f2-parte"></span><h3></h3><div class="f2-tarjeta__texto"></div>';
    aviso.querySelector('.f2-parte').textContent = PARTES[p.parte - 1];
    aviso.querySelector('h3').textContent = p.titulo;
    aviso.querySelector('.f2-tarjeta__texto').innerHTML = p.texto;
    aviso.appendChild(pie(p, i));
    document.body.appendChild(aviso);
  }

  function pintar(p, i) {
    if (p.libre) { pintarLibre(p, i); return; }
    var el = p.el ? document.querySelector(p.el) : null;
    if (el && !(el.offsetParent || el.getClientRects().length)) el = null;
    var clave = p.id + (el ? '+' : '-');
    if (pintado === clave && pintor && pintor.isActive()) return;
    if (aviso) { aviso.remove(); aviso = null; }
    if (retomar) { retomar.remove(); retomar = null; }
    if (pintor && pintor.isActive()) pintor.destroy();
    pintor = null;
    crearPintor();
    if (!pintor) return;
    pintado = clave;
    var cuerpo = '<span class="f2-parte">' + PARTES[p.parte - 1] + '</span>' + p.texto;
    var conf = {
      popover: {
        title: p.titulo,
        description: cuerpo,
        side: p.lado || 'bottom',
        align: 'start',
        onPopoverRender: function (pop) { pop.wrapper.appendChild(pie(p, i)); },
      },
    };
    if (el) { conf.element = el; el.scrollIntoView({ block: 'center', behavior: 'instant' }); }
    pintor.highlight(conf);
  }

  function fueraDeSitio(p, i) {
    if (pintor && pintor.isActive()) pintor.destroy();
    pintor = null;
    pintado = null;
    if (aviso && aviso.getAttribute('data-paso') === p.id) return;
    if (aviso) aviso.remove();
    aviso = document.createElement('div');
    aviso.className = 'f2-aviso';
    aviso.setAttribute('data-paso', p.id);
    aviso.setAttribute('role', 'dialog');
    aviso.innerHTML = '<h3>El recorrido sigue en otra pantalla</h3><p>Siguiente paso: <strong></strong></p>';
    aviso.querySelector('strong').textContent = p.titulo;
    var f = document.createElement('div');
    f.className = 'f2-botones';
    f.appendChild(boton('Ir allí', 'f2-btn', function () { location.href = p.url; }));
    if (i > 0) f.appendChild(boton('Atrás', 'f2-btn f2-btn--sec', function () { ir(i - 1, true); }));
    f.appendChild(boton('Salir', 'f2-enlace', salir));
    aviso.appendChild(f);
    document.body.appendChild(aviso);
  }

  function mostrarRetomar() {
    if (retomar) return;
    var empezado = estado && typeof estado.i === 'number' && estado.i > 0;
    retomar = boton(empezado ? 'Seguir el recorrido guiado' : 'Recorrido guiado', 'f2-btn f2-retomar', function () {
      guardar({ activo: true, i: empezado ? estado.i : 0 });
      retomar.remove(); retomar = null;
      tick();
    });
    document.body.appendChild(retomar);
  }

  // ---------- Navegación ----------
  function ir(i, atras) {
    i = Math.max(0, Math.min(PASOS.length - 1, i));
    guardar({ activo: true, i: i });
    var p = PASOS[i];
    pintado = null;
    // Al ir atrás a un paso de otra pantalla, se navega a ella; hacia delante, el paso lo dice.
    if (!p.donde() && atras && p.url) { location.href = p.url; return; }
    tick();
  }
  function salir() { guardar({ activo: false, i: estado ? estado.i : 0 }); cerrarTodo(); mostrarRetomar(); }
  function reiniciar() { guardar({ activo: true, i: 0 }); cerrarTodo(); if (ruta() !== '/') location.href = '/'; else tick(); }

  function tick() {
    if (window.innerWidth < ANCHO_MINIMO) { cerrarTodo(); return; }
    if (!estado || !estado.activo) { if (pintor && pintor.isActive()) cerrarTodo(); mostrarRetomar(); return; }
    var i = estado.i || 0;
    var p = PASOS[i];
    // Avance automático: el paso de acción se da por hecho cuando la pantalla lo demuestra.
    var vueltas = 0;
    while (p && vueltas < 4 && ((p.hecho && p.hecho()) || (p.saltar && p.saltar()))) {
      i += 1; vueltas += 1; p = PASOS[i];
    }
    if (!p) { i = PASOS.length - 1; p = PASOS[i]; }
    if (i !== estado.i) guardar({ activo: true, i: i });
    if (p.saltarSi && p.saltarSi()) { location.href = p.url; return; }
    if (!p.donde()) { fueraDeSitio(p, i); return; }
    pintar(p, i);
  }

  // ---------- Arranque ----------
  function arrancar() {
    sello();
    // El botón del correo simulado entra siempre como clienta nueva, aunque quede otra sesión abierta.
    var entrar = document.getElementById('entrar');
    if (entrar) entrar.addEventListener('click', function (ev) { ev.preventDefault(); salirPortal(entrar.getAttribute('href')); });
    var empezar = document.getElementById('f2-empezar');
    if (empezar) empezar.addEventListener('click', function () { guardar({ activo: true, i: 0 }); cerrarTodo(); tick(); });
    tick();
    setInterval(tick, 700);
    window.addEventListener('resize', function () { pintado = null; tick(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arrancar);
  else arrancar();
})();
