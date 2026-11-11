/* Botón «Entrar en mi espacio» del correo simulado: se abre en pestaña nueva, cierra cualquier
 * sesión del portal que quedara abierta (otra clienta) y lleva a la puerta del portal. Evita
 * logout.php directo, que aterriza en la pantalla de error («&w»). */
(function () {
  'use strict';
  var ir = function () { location.replace('/portal/index.php?site=default'); };
  fetch('/portal/logout.php', { credentials: 'same-origin', redirect: 'manual', cache: 'no-store' }).then(ir, ir);
})();
