/* El visor PDF del módulo (pdf.js reciente) usa Map/WeakMap.getOrInsert(Computed), que aún no
 * tienen todos los navegadores. Se carga antes que nada, sin defer. */
(function () {
  'use strict';
  [typeof Map !== 'undefined' && Map, typeof WeakMap !== 'undefined' && WeakMap].forEach(function (C) {
    if (!C) return;
    var p = C.prototype;
    if (!p.getOrInsertComputed) {
      Object.defineProperty(p, 'getOrInsertComputed', {
        configurable: true, writable: true,
        value: function (k, f) { if (this.has(k)) return this.get(k); var v = f(k); this.set(k, v); return v; },
      });
    }
    if (!p.getOrInsert) {
      Object.defineProperty(p, 'getOrInsert', {
        configurable: true, writable: true,
        value: function (k, v) { if (this.has(k)) return this.get(k); this.set(k, v); return v; },
      });
    }
  });
})();
