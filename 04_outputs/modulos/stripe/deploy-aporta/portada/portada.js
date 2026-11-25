// Saludo de la portada y de la guía rápida. La identidad la da la puerta (carril acceso):
//   GET /__puerta/yo → { nombre, correo, rol }
// Si la puerta no responde o no trae nombre, la página se queda en «Hola» y funciona igual.
(async () => {
  let yo;
  try {
    const respuesta = await fetch('/__puerta/yo', {
      headers: { Accept: 'application/json' },
      credentials: 'same-origin',
      cache: 'no-store',
    });
    if (!respuesta.ok) return;
    yo = await respuesta.json();
  } catch {
    return;
  }

  const completo = typeof yo?.nombre === 'string' ? yo.nombre.trim() : '';
  if (completo === '') return;
  const [pila] = completo.split(/\s+/);

  for (const nodo of document.querySelectorAll('[data-yo-saludo]')) nodo.textContent = `Hola, ${pila}`;
  for (const nodo of document.querySelectorAll('[data-yo-nombre]')) {
    nodo.textContent = completo;
    nodo.hidden = false;
  }
})();
