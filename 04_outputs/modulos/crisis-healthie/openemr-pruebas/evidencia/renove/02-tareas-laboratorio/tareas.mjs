/**
 * EPI10 · Área 2 · Isla «tareas» (SKI2-232): «Tus documentos» y la plantilla única de tarea
 * (documento para firmar o cuestionario), con confirmación.
 *
 * Uso: montar(elemento, { vista: 'lista' | 'tarea', formulario, api, rutas })
 *   api   → adaptador de datos (adaptador-demo.mjs en el laboratorio; el de OpenEMR en la fase B)
 *   rutas → { inicio(), lista(), tarea(formulario) } devuelven URLs
 * Requiere window.SignaturePad (vendor/signature_pad.umd.min.js) para firmar.
 * Selectores estables para Playwright: data-epi10-*.
 */
import { html, render, useState, useEffect, useRef, useMemo, useCallback } from './vendor/htm-preact-standalone.mjs';

const fechaLarga = (iso) => {
  if (!iso) return '';
  try { return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso)); }
  catch { return ''; }
};
const EN_LETRA = ['cero', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis'];
const ETIQUETA_ESTADO = { pendiente: 'Pendiente', en_curso: 'A medias', completado: 'Hecho' };

function useEnfoqueTitulo(clave) {
  const ref = useRef(null);
  useEffect(() => { ref.current && ref.current.focus({ preventScroll: false }); }, [clave]);
  return ref;
}

/* ============================== «Tus documentos» ============================== */

function Lista({ api, rutas }) {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState('');
  const titulo = useEnfoqueTitulo('lista');

  const cargar = useCallback(() => {
    api.lista().then((d) => { setDatos(d); setError(''); })
      .catch(() => setError('No hemos podido cargar tus documentos. Vuelve a intentarlo en unos segundos.'));
  }, [api]);

  // Recarga en segundo plano: al volver a la pestaña y cada minuto. Sin botón «Recargar».
  useEffect(() => {
    cargar();
    const alVolver = () => document.visibilityState === 'visible' && cargar();
    document.addEventListener('visibilitychange', alVolver);
    const t = setInterval(cargar, 60000);
    return () => { document.removeEventListener('visibilitychange', alVolver); clearInterval(t); };
  }, [cargar]);

  if (!datos) {
    return html`<div class="epi-contenedor">${error ? html`<p class="epi-error" role="alert">${error}</p>` : html`<p class="epi-cargando">Cargando tus documentos…</p>`}</div>`;
  }
  const { tareas, historial } = datos;
  const hechas = tareas.filter((t) => t.estado === 'completado').length;
  const pendientes = tareas.filter((t) => t.estado !== 'completado');
  const minutos = pendientes.reduce((s, t) => s + (t.minutos || 0), 0);
  const siguiente = pendientes[0]?.formulario;
  const todo = tareas.length > 0 && pendientes.length === 0;

  return html`
    <div class="epi-contenedor" data-epi10-vista="tareas-lista">
      <a class="epi-volver" href=${rutas.inicio()} data-epi10-accion="volver">← Tu espacio</a>
      <h1 class="epi-titulo" tabindex="-1" ref=${titulo}>Tus documentos</h1>
      <p class="epi-entradilla">
        ${todo ? 'Has completado todo lo que necesitábamos. Gracias.'
          : html`Antes de tu test necesitamos ${pendientes.length === 1 ? 'una cosa más' : `${EN_LETRA[pendientes.length] || pendientes.length} cosas`}. Te llevará unos ${minutos} minutos.`}
      </p>

      <div class="epi-progreso" aria-live="polite">
        <div class="epi-progreso__texto"><span><strong>${hechas} de ${tareas.length}</strong> hechas</span></div>
        <div class="epi-progreso__barra" role="progressbar" aria-valuemin="0" aria-valuemax=${tareas.length} aria-valuenow=${hechas} aria-label="Tareas completadas">
          <div class="epi-progreso__relleno" style=${`width:${tareas.length ? (100 * hechas) / tareas.length : 0}%`}></div>
        </div>
      </div>

      ${todo && html`
        <div class="epi-aviso-listo" role="status" data-epi10-aviso="todo-listo">
          <span aria-hidden="true">✓</span>
          <div><strong>Todo listo por tu parte</strong>El equipo de EPI10 ya tiene lo que necesita. Te avisaremos del siguiente paso.</div>
        </div>`}

      <ol class="epi-lista-tareas">
        ${tareas.map((t, i) => html`
          <li key=${t.formulario}
              class=${`epi-tarea-item epi-tarea-item--${t.estado}${t.formulario === siguiente ? ' epi-tarea-item--siguiente' : ''}`}
              data-epi10-tarea=${t.formulario} data-epi10-estado=${t.estado}>
            <span class="epi-tarea-item__num" aria-hidden="true">${t.estado === 'completado' ? '✓' : i + 1}</span>
            <div>
              <h2 class="epi-tarea-item__titulo">${t.titulo}</h2>
              <p class="epi-tarea-item__texto">${t.resumen} · ${t.minutos} min</p>
              <span class=${`epi-estado epi-estado--${t.estado}`}>
                ${ETIQUETA_ESTADO[t.estado]}${t.estado === 'completado' && t.completado_en ? ` · ${fechaLarga(t.completado_en)}` : ''}
              </span>
            </div>
            <a class=${`epi-boton${t.estado === 'completado' ? ' epi-boton--secundario' : ''}`}
               href=${rutas.tarea(t.formulario)} data-epi10-accion="abrir-tarea"
               aria-label=${`${t.estado === 'completado' ? 'Ver' : t.estado === 'en_curso' ? 'Continuar' : t.accion}: ${t.titulo}`}>
              ${t.estado === 'completado' ? 'Ver' : t.estado === 'en_curso' ? 'Continuar' : t.accion}
            </a>
          </li>`)}
      </ol>

      <details class="epi-mas" data-epi10-bloque="otras-opciones">
        <summary>Historial y otras opciones</summary>
        <div class="epi-mas__cuerpo">
          <div class="epi-mas__bloque" data-epi10-bloque="historial">
            <h3>Lo que has enviado</h3>
            ${historial.length
              ? html`<ul class="epi-historial">${historial.map((h) => html`<li><span>${h.titulo} · ${h.estado}</span><time datetime=${h.fecha}>${fechaLarga(h.fecha)}</time></li>`)}</ul>`
              : html`<p>Aún no has enviado nada.</p>`}
          </div>
          <div class="epi-mas__bloque" data-epi10-bloque="adjuntar">
            <h3>Enviar un archivo al equipo</h3>
            <p>Si el equipo te pide un documento (por ejemplo, una analítica previa), puedes adjuntarlo aquí.</p>
            <p style="margin-top:10px"><a class="epi-boton epi-boton--secundario" href=${rutas.adjuntar ? rutas.adjuntar() : '#'} data-epi10-accion="adjuntar">Adjuntar un archivo</a></p>
          </div>
        </div>
      </details>
    </div>`;
}

/* ============================== Plantilla única de tarea ============================== */

function PlantillaTarea({ tarea, rutas, pasos, pasoActual, children, cta, onCta, ctaListo, ayuda, ayudaError, secundaria, guardado }) {
  const titulo = useEnfoqueTitulo(tarea.formulario);
  return html`
    <div class="epi-tarea" data-epi10-vista="tarea" data-epi10-tarea=${tarea.formulario} data-epi10-tipo=${tarea.tipo}>
      <a class="epi-volver" href=${rutas.lista()} data-epi10-accion="volver">← Tus documentos</a>
      <p class="epi-antetitulo">Paso ${tarea.orden} de ${tarea.total}</p>
      <h1 class="epi-titulo" tabindex="-1" ref=${titulo}>${tarea.titulo_tarea}</h1>
      <p class="epi-entradilla">${tarea.proposito}</p>
      <div class="epi-tarea__meta">
        <span class="epi-chip">⏱ ${tarea.minutos} min</span>
        ${tarea.estado === 'completado' && html`<span class="epi-estado epi-estado--completado">Enviado el ${fechaLarga(tarea.completado_en)}</span>`}
      </div>
      ${pasos && html`
        <ol class="epi-pasos" aria-label="Pasos">
          ${pasos.map((p, i) => html`<li data-estado=${i < pasoActual ? 'hecho' : i === pasoActual ? 'actual' : 'pendiente'}
            aria-current=${i === pasoActual ? 'step' : undefined}>${p}</li>`)}
        </ol>`}
      <div class="epi-tarea__cuerpo">${children}</div>
      <div class="epi-tarea__accion">
        <div class="epi-tarea__accion-dentro">
          ${(ayuda || guardado) && html`<p class=${`epi-tarea__ayuda${ayudaError ? ' epi-tarea__ayuda--error' : ''}`} aria-live="polite">${ayuda || guardado}</p>`}
          <div class="epi-tarea__accion-fila">
            ${secundaria}
            <button type="button" class=${`epi-boton epi-boton--grande${ctaListo ? '' : ' epi-boton--apagado'}`}
                    onClick=${onCta} data-epi10-accion="cta">${cta}</button>
          </div>
        </div>
      </div>
    </div>`;
}

function Confirmacion({ tarea, siguiente, rutas }) {
  const titulo = useEnfoqueTitulo('confirmacion');
  return html`
    <div class="epi-contenedor" data-epi10-vista="confirmacion" data-epi10-tarea=${tarea.formulario}>
      <div class="epi-confirmacion" role="status">
        <div class="epi-confirmacion__icono" aria-hidden="true">✓</div>
        <h1 tabindex="-1" ref=${titulo}>${tarea.confirmacion.titulo}</h1>
        <p>${tarea.confirmacion.texto}</p>
        <div class="epi-confirmacion__acciones">
          ${siguiente
            ? html`<a class="epi-boton epi-boton--grande" href=${rutas.tarea(siguiente.formulario)} data-epi10-accion="siguiente-tarea">Siguiente: ${siguiente.titulo}</a>
                   <a class="epi-boton epi-boton--texto" href=${rutas.lista()} data-epi10-accion="volver">Volver a tus documentos</a>`
            : html`<a class="epi-boton epi-boton--grande" href=${rutas.lista()} data-epi10-accion="volver">Volver a tus documentos</a>`}
        </div>
      </div>
    </div>`;
}

/* ============================== Documento para firmar ============================== */

function ZonaFirma({ valor, onCambio, soloLectura }) {
  const lienzo = useRef(null);
  const pad = useRef(null);
  useEffect(() => {
    if (soloLectura || !window.SignaturePad) return undefined;
    const c = lienzo.current;
    const p = new window.SignaturePad(c, { penColor: '#00294d', minWidth: 0.8, maxWidth: 2.6 });
    pad.current = p;
    const ajustar = () => {
      const datos = p.toData();
      const r = Math.max(window.devicePixelRatio || 1, 1);
      c.width = c.offsetWidth * r; c.height = c.offsetHeight * r;
      c.getContext('2d').scale(r, r);
      p.clear();
      if (datos.length) p.fromData(datos);
    };
    ajustar();
    if (valor) p.fromDataURL(valor, { ratio: 1, width: c.offsetWidth, height: c.offsetHeight });
    p.addEventListener('endStroke', () => onCambio(p.isEmpty() ? '' : p.toDataURL('image/png')));
    window.addEventListener('resize', ajustar);
    return () => { window.removeEventListener('resize', ajustar); p.off(); };
  }, [soloLectura]);

  if (soloLectura) {
    return html`<div class="epi-firma"><img class="epi-firma__vista" src=${valor} alt="Tu firma" /></div>`;
  }
  const borrar = () => { pad.current && pad.current.clear(); onCambio(''); };
  return html`
    <div class="epi-firma" data-epi10-campo="firma">
      <div class=${`epi-firma__zona${valor ? ' epi-firma__zona--firmada' : ''}`}>
        ${!valor && html`<span class="epi-firma__indicacion">Firma aquí con el dedo o el ratón</span>`}
        <span class="epi-firma__marca" aria-hidden="true">✕</span>
        <span class="epi-firma__guia" aria-hidden="true"></span>
        <canvas ref=${lienzo} aria-label="Zona de firma: dibuja tu firma con el dedo o el ratón" role="img"></canvas>
      </div>
      <div class="epi-firma__pie">
        <span>${valor ? 'Firma lista.' : 'Tu firma se añadirá al documento.'}</span>
        ${valor && html`<button type="button" class="epi-boton epi-boton--texto" onClick=${borrar} data-epi10-accion="borrar-firma">Borrar y repetir</button>`}
      </div>
    </div>`;
}

function TareaDocumento({ tarea, api, rutas, onEnviado }) {
  const doc = tarea.documento;
  const hecho = tarea.estado === 'completado';
  const [acepta, setAcepta] = useState(() => Object.fromEntries(doc.aceptaciones.map((a) => [a.nombre, hecho || !!tarea.borrador?.aceptaciones?.[a.nombre]])));
  const [firma, setFirma] = useState(hecho ? (tarea.borrador?.firma || '') : '');
  const [leido, setLeido] = useState(hecho);
  const [aviso, setAviso] = useState('');
  const [enviando, setEnviando] = useState(false);
  const fin = useRef(null);
  const bloqueAcepto = useRef(null);
  const bloqueFirma = useRef(null);

  useEffect(() => {
    if (leido || !fin.current || !('IntersectionObserver' in window)) { setLeido(true); return undefined; }
    const o = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && setLeido(true), { threshold: 1 });
    o.observe(fin.current);
    return () => o.disconnect();
  }, []);

  const todasAceptadas = doc.aceptaciones.every((a) => acepta[a.nombre]);
  const paso = hecho ? 4 : !leido && !todasAceptadas ? 0 : !todasAceptadas ? 1 : !firma ? 2 : 3;
  const listo = todasAceptadas && !!firma;
  const falta = !todasAceptadas ? 'Marca las casillas de aceptación para seguir.' : !firma ? 'Falta tu firma.' : '';

  const enviar = async () => {
    if (hecho) { location.href = rutas.lista(); return; }
    if (!listo) {
      setAviso(falta);
      (!todasAceptadas ? bloqueAcepto : bloqueFirma).current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setEnviando(true); setAviso('');
    try {
      await api.enviar(tarea.formulario, { aceptaciones: acepta, firma });
      onEnviado();
    } catch {
      setAviso('No se ha podido enviar. Revisa tu conexión y vuelve a pulsar.');
      setEnviando(false);
    }
  };

  return html`
    <${PlantillaTarea} tarea=${tarea} rutas=${rutas} pasos=${tarea.pasos} pasoActual=${paso}
      cta=${hecho ? 'Volver a tus documentos' : enviando ? 'Enviando…' : tarea.cta}
      ctaListo=${hecho || (listo && !enviando)} onCta=${enviar}
      ayuda=${aviso || (hecho ? '' : listo ? 'Al pulsar, firmas el documento y lo recibe el equipo de EPI10.' : '')}
      ayudaError=${!!aviso}>
      <article class="epi-papel" data-epi10-bloque="documento" aria-label="Documento">
        <header class="epi-papel__marca">
          <img src=${tarea.logo || 'img/epi10-azul.png'} alt="EPI10 Salud" />
          <span>${doc.referencia}</span>
        </header>
        <h2>${doc.titulo}</h2>
        ${doc.parrafos.map((p) => html`<p>${p}</p>`)}
        <p class="epi-papel__fin" ref=${fin}>— Fin del documento —</p>
      </article>

      <section class="epi-seccion" ref=${bloqueAcepto} data-epi10-bloque="aceptaciones">
        <h2 class="epi-seccion__titulo">Confirma que estás de acuerdo</h2>
        <p class="epi-seccion__texto">Marca cada casilla.</p>
        ${doc.aceptaciones.map((a) => html`
          <label class=${`epi-acepto${acepta[a.nombre] ? ' epi-acepto--marcado' : ''}`} data-epi10-campo=${a.nombre}>
            <input type="checkbox" checked=${acepta[a.nombre]} disabled=${hecho}
                   onChange=${(e) => { setAcepta({ ...acepta, [a.nombre]: e.currentTarget.checked }); setAviso(''); }} />
            <span class="epi-acepto__caja" aria-hidden="true">✓</span>
            <span class="epi-acepto__texto">${a.texto}</span>
          </label>`)}
      </section>

      <section class="epi-seccion" ref=${bloqueFirma} data-epi10-bloque="firma">
        <h2 class="epi-seccion__titulo">${hecho ? 'Tu firma' : 'Firma'}</h2>
        <p class="epi-seccion__texto">${doc.firmante} · ${fechaLarga(hecho ? tarea.completado_en : new Date().toISOString())}</p>
        <${ZonaFirma} valor=${firma} soloLectura=${hecho} onCambio=${(v) => { setFirma(v); setAviso(''); }} />
      </section>
    <//>`;
}

/* ============================== Cuestionario ============================== */

const tieneRespuesta = (v) => v !== undefined && v !== null && v !== '';

function preguntasDe(cuestionario) {
  const salida = [];
  const recorrer = (items) => (items || []).forEach((it) => {
    if (it.type === 'group') recorrer(it.item);
    else if (it.type !== 'display') salida.push(it);
  });
  recorrer(cuestionario.item);
  return salida;
}

// enableWhen básico (=, !=, exists) sobre respuestas guardadas por linkId.
function visible(item, r) {
  if (!item.enableWhen || !item.enableWhen.length) return true;
  const ok = item.enableWhen.map((c) => {
    const v = r[c.question];
    const esperado = c.answerCoding?.code ?? c.answerBoolean ?? c.answerInteger ?? c.answerDecimal ?? c.answerString;
    if (c.operator === 'exists') return tieneRespuesta(v) === (c.answerBoolean !== false);
    if (c.operator === '!=') return v !== esperado;
    return v === esperado;
  });
  return item.enableBehavior === 'any' ? ok.some(Boolean) : ok.every(Boolean);
}

function textoRespuesta(item, v) {
  if (!tieneRespuesta(v)) return '';
  if (item.type === 'boolean') return v ? 'Sí' : 'No';
  if (item.type === 'choice' || item.type === 'open-choice') {
    const o = (item.answerOption || []).find((x) => (x.valueCoding?.code ?? x.valueString) === v);
    return o ? (o.valueCoding?.display ?? o.valueString) : String(v);
  }
  return String(v);
}

function Pregunta({ item, valor, onCambio }) {
  const id = `epi-p-${item.linkId}`;
  const opcional = !item.required && html`<span class="epi-opcional">Opcional</span>`;
  if (item.type === 'choice' || item.type === 'open-choice' || item.type === 'boolean') {
    const opciones = item.type === 'boolean'
      ? [{ v: true, t: 'Sí' }, { v: false, t: 'No' }]
      : (item.answerOption || []).map((o) => ({ v: o.valueCoding?.code ?? o.valueString, t: o.valueCoding?.display ?? o.valueString }));
    return html`
      <fieldset>
        <legend>${item.text}${opcional}</legend>
        <p class="epi-pregunta__nota">Elige una opción.</p>
        <div class=${`epi-opciones${opciones.length === 2 ? ' epi-opciones--dos' : ''}`}>
          ${opciones.map((o) => html`
            <label class=${`epi-opcion${valor === o.v ? ' epi-opcion--marcada' : ''}`} data-epi10-opcion=${String(o.v)}>
              <input type="radio" name=${id} checked=${valor === o.v} onChange=${() => onCambio(o.v)} />
              <span class="epi-opcion__punto" aria-hidden="true"></span>
              <span>${o.t}</span>
            </label>`)}
        </div>
      </fieldset>`;
  }
  if (item.type === 'integer' || item.type === 'decimal') {
    const paso = item.type === 'integer' ? 1 : 0.5;
    const n = tieneRespuesta(valor) ? Number(valor) : null;
    const fijar = (x) => onCambio(x === '' || x === null ? '' : Math.max(0, item.type === 'integer' ? Math.round(Number(x)) : Number(x)));
    return html`
      <div>
        <label class="epi-pregunta__enunciado" for=${id} style="display:block">${item.text}${opcional}</label>
        <p class="epi-pregunta__nota">Escribe un número o usa los botones.</p>
        <div class="epi-numero">
          <button type="button" aria-label="Restar" onClick=${() => fijar(Math.max(0, (n ?? 1) - paso))}>−</button>
          <input id=${id} type="number" inputmode=${item.type === 'integer' ? 'numeric' : 'decimal'} min="0" step=${paso}
                 value=${n ?? ''} onInput=${(e) => fijar(e.currentTarget.value)} />
          <button type="button" aria-label="Sumar" onClick=${() => fijar((n ?? 0) + paso)}>+</button>
        </div>
      </div>`;
  }
  return html`
    <div>
      <label class="epi-pregunta__enunciado" for=${id} style="display:block">${item.text}${opcional}</label>
      <p class="epi-pregunta__nota">${item.required ? 'Escribe tu respuesta.' : 'Si no tienes nada que añadir, puedes seguir.'}</p>
      ${item.type === 'text'
        ? html`<textarea id=${id} class="epi-texto" value=${valor ?? ''} onInput=${(e) => onCambio(e.currentTarget.value)}></textarea>`
        : html`<input id=${id} class="epi-texto" style="min-height:52px" type=${item.type === 'date' ? 'date' : 'text'} value=${valor ?? ''} onInput=${(e) => onCambio(e.currentTarget.value)} />`}
    </div>`;
}

function TareaCuestionario({ tarea, api, rutas, onEnviado }) {
  const todas = useMemo(() => preguntasDe(tarea.cuestionario), [tarea]);
  const hecho = tarea.estado === 'completado';
  const [resp, setResp] = useState(() => ({ ...(tarea.borrador?.respuestas || {}) }));
  const preguntas = todas.filter((p) => visible(p, resp));
  const total = preguntas.length;
  const [i, setI] = useState(() => {
    if (hecho) return total;
    const primera = preguntas.findIndex((p) => !tieneRespuesta(resp[p.linkId]));
    return primera === -1 ? (Object.keys(resp).length ? total : 0) : primera;
  });
  const [aviso, setAviso] = useState('');
  const [guardado, setGuardado] = useState('');
  const [enviando, setEnviando] = useState(false);
  const temporizador = useRef(null);
  const enRepaso = i >= total;
  const actual = preguntas[i];

  const cambiar = (v) => {
    const nuevas = { ...resp, [actual.linkId]: v };
    setResp(nuevas); setAviso('');
    clearTimeout(temporizador.current);
    setGuardado('Guardando…');
    temporizador.current = setTimeout(() => {
      api.guardarBorrador(tarea.formulario, { respuestas: nuevas })
        .then(() => setGuardado('Guardado. Puedes seguir más tarde.'))
        .catch(() => setGuardado('No se ha podido guardar. Lo intentaremos al seguir.'));
    }, 600);
  };

  const ir = (n) => { setI(n); setAviso(''); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const siguiente = async () => {
    if (hecho) { location.href = rutas.lista(); return; }
    if (!enRepaso) {
      if (actual.required && !tieneRespuesta(resp[actual.linkId])) {
        setAviso(actual.type === 'integer' || actual.type === 'decimal' ? 'Escribe un número para seguir.' : 'Elige una respuesta para seguir.');
        return;
      }
      ir(i + 1);
      return;
    }
    const sinResponder = preguntas.findIndex((p) => p.required && !tieneRespuesta(resp[p.linkId]));
    if (sinResponder !== -1) { ir(sinResponder); setAviso('Te falta esta respuesta.'); return; }
    setEnviando(true); setAviso('');
    try {
      clearTimeout(temporizador.current);
      await api.enviar(tarea.formulario, { respuestas: resp });
      onEnviado();
    } catch {
      setAviso('No se ha podido enviar. Revisa tu conexión y vuelve a pulsar.');
      setEnviando(false);
    }
  };

  const hechas = enRepaso ? total : i;
  const cta = hecho ? 'Volver a tus documentos' : enRepaso ? (enviando ? 'Enviando…' : tarea.cta) : i === total - 1 ? 'Revisar respuestas' : 'Siguiente';
  const atras = !hecho && i > 0 && html`<button type="button" class="epi-boton epi-boton--secundario" onClick=${() => ir(i - 1)} data-epi10-accion="atras" aria-label="Pregunta anterior">←</button>`;

  return html`
    <${PlantillaTarea} tarea=${tarea} rutas=${rutas} cta=${cta} ctaListo=${!enviando} onCta=${siguiente}
      ayuda=${aviso} ayudaError=${!!aviso} guardado=${!hecho && !enRepaso ? guardado : ''} secundaria=${atras}>
      <div class="epi-progreso" aria-live="polite" data-epi10-bloque="progreso">
        <div class="epi-progreso__texto">
          <span>${enRepaso ? html`<strong>Repaso</strong>` : html`Pregunta <strong>${i + 1} de ${total}</strong>`}</span>
          <span>${Math.round((100 * hechas) / Math.max(total, 1))} %</span>
        </div>
        <div class="epi-progreso__barra" role="progressbar" aria-valuemin="0" aria-valuemax=${total} aria-valuenow=${hechas} aria-label="Progreso del cuestionario">
          <div class="epi-progreso__relleno" style=${`width:${(100 * hechas) / Math.max(total, 1)}%`}></div>
        </div>
      </div>
      <div style="margin-top:20px">
        ${enRepaso
          ? html`
            <h2 class="epi-seccion__titulo">${hecho ? 'Tus respuestas' : 'Revisa tus respuestas'}</h2>
            <p class="epi-seccion__texto">${hecho ? 'Esto es lo que enviaste.' : 'Si todo está bien, envíalo. Puedes cambiar cualquier respuesta.'}</p>
            <ol class="epi-repaso" data-epi10-bloque="repaso">
              ${preguntas.map((p, n) => html`
                <li>
                  <span class="epi-repaso__pregunta">${p.text}</span>
                  <span class=${`epi-repaso__respuesta${tieneRespuesta(resp[p.linkId]) ? '' : ' epi-repaso__respuesta--vacia'}`}>${textoRespuesta(p, resp[p.linkId]) || 'Sin respuesta'}</span>
                  ${!hecho && html`<button type="button" class="epi-boton epi-boton--texto" onClick=${() => ir(n)}>Cambiar</button>`}
                </li>`)}
            </ol>`
          : html`
            <div class="epi-pregunta" key=${actual.linkId} data-epi10-pregunta=${actual.linkId}>
              <${Pregunta} item=${actual} valor=${resp[actual.linkId]} onCambio=${cambiar} />
            </div>`}
      </div>
    <//>`;
}

/* ============================== Vista de tarea ============================== */

function Tarea({ formulario, api, rutas }) {
  const [tarea, setTarea] = useState(null);
  const [error, setError] = useState('');
  const [enviado, setEnviado] = useState(null);

  useEffect(() => {
    api.tarea(formulario).then(setTarea).catch(() => setError('No hemos podido abrir esta tarea.'));
  }, [formulario]);

  const alEnviar = async () => {
    let siguiente = null;
    try {
      const l = await api.lista();
      siguiente = l.tareas.find((t) => t.estado !== 'completado' && t.formulario !== formulario) || null;
    } catch { /* sin siguiente */ }
    setEnviado({ siguiente });
    window.scrollTo({ top: 0 });
  };

  if (error) return html`<div class="epi-contenedor"><a class="epi-volver" href=${rutas.lista()}>← Tus documentos</a><p class="epi-error" role="alert">${error}</p></div>`;
  if (!tarea) return html`<div class="epi-contenedor"><p class="epi-cargando">Abriendo…</p></div>`;
  if (enviado) return html`<${Confirmacion} tarea=${tarea} siguiente=${enviado.siguiente} rutas=${rutas} />`;
  const Vista = tarea.tipo === 'documento' ? TareaDocumento : TareaCuestionario;
  return html`<${Vista} tarea=${tarea} api=${api} rutas=${rutas} onEnviado=${alEnviar} />`;
}

export function montar(el, { vista, formulario, api, rutas }) {
  el.classList.add('epi-tareas');
  render(vista === 'tarea'
    ? html`<${Tarea} key=${formulario} formulario=${formulario} api=${api} rutas=${rutas} />`
    : html`<${Lista} api=${api} rutas=${rutas} />`, el);
}
