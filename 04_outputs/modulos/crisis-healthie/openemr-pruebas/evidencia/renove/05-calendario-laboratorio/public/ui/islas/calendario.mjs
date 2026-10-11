// Isla «calendario»: reservar, ver y cancelar la cita desde un único calendario.
// Elegir día → elegir hueco → confirmar. Datos: citas_api.php (agenda de OpenEMR).
import { html, render, useState, useEffect, useRef } from '../vendor/htm-preact-3.1.1.mjs';

const fmtDia = new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
const fmtCorto = new Intl.DateTimeFormat('es-ES', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
const aFecha = (iso) => new Date(iso + 'T00:00:00Z');
const mayus = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const diaLargo = (iso) => mayus(fmtDia.format(aFecha(iso)));
const isoDe = (d) => d.toISOString().slice(0, 10);
const masMinutos = (hora, min) => {
  const [h, m] = hora.split(':').map(Number);
  const t = h * 60 + m + min;
  return String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0');
};

class SesionCaducada extends Error {}

async function llamar(api, csrf, cuerpo) {
  const r = await fetch(api, {
    method: cuerpo ? 'POST' : 'GET',
    credentials: 'same-origin',
    headers: cuerpo ? { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf } : {},
    body: cuerpo ? JSON.stringify(cuerpo) : undefined,
  });
  if (!(r.headers.get('content-type') || '').includes('application/json')) throw new SesionCaducada();
  const datos = await r.json();
  if (!r.ok) throw new Error(datos.mensaje || 'No hemos podido completar la operación.');
  return datos;
}

function ics(cita, duracion, lugar) {
  const f = cita.fecha.replaceAll('-', '');
  const h = (x) => x.replace(':', '') + '00';
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent([
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//EPI10//Citas//ES', 'BEGIN:VEVENT',
    `UID:epi10-cita-${cita.id}@epi10`, `DTSTART:${f}T${h(cita.hora)}`, `DTEND:${f}T${h(masMinutos(cita.hora, duracion))}`,
    'SUMMARY:Cita EPI10', `LOCATION:${lugar}`, 'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n'));
}

function Calendario({ datos, dia, alElegir }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const misDias = new Set(datos.citas.map((c) => c.fecha));
    el.isDateDisallowed = (d) => { const iso = isoDe(d); return !datos.huecos[iso] && !misDias.has(iso); };
    el.getDayParts = (d) => { const iso = isoDe(d); return misDias.has(iso) ? 'mi-cita' : datos.huecos[iso] ? 'con-huecos' : ''; };
    const cambio = (e) => alElegir(e.target.value);
    el.addEventListener('change', cambio);
    return () => el.removeEventListener('change', cambio);
  }, [datos]);
  useEffect(() => { if (ref.current && dia) ref.current.value = dia; }, [dia]);
  return html`
    <calendar-date ref=${ref} class="epi-cal-mes" locale="es-ES" first-day-of-week="1"
      min=${datos.hoy} max=${datos.hasta} value=${dia || ''} data-epi10-citas="calendario">
      <span slot="previous" class="epi-cal-flecha"><span aria-hidden="true">‹</span><span class="epi-cal-vh">Mes anterior</span></span>
      <span slot="heading"></span>
      <span slot="next" class="epi-cal-flecha"><span aria-hidden="true">›</span><span class="epi-cal-vh">Mes siguiente</span></span>
      <calendar-month></calendar-month>
    </calendar-date>
    <ul class="epi-cal-leyenda" aria-hidden="true">
      <li><span class="epi-cal-punto epi-cal-punto--libre"></span>Con huecos</li>
      <li><span class="epi-cal-punto epi-cal-punto--mia"></span>Tu cita</li>
    </ul>`;
}

function MiCita({ cita, props, duracion, alCancelar, ocupado, titulo }) {
  const [seguro, setSeguro] = useState(false);
  return html`
    <section class="epi-cal-cita" data-epi10-citas="mi-cita" data-epi10-cita-id=${cita.id}>
      <p class="epi-cal-etiqueta">${titulo}</p>
      <p class="epi-cal-cita-dia">${diaLargo(cita.fecha)}</p>
      <p class="epi-cal-cita-hora">${cita.hora} – ${cita.fin || masMinutos(cita.hora, duracion)}</p>
      ${props.lugar && html`<p class="epi-cal-cita-lugar">${props.lugar}</p>`}
      ${cita.pendiente && html`<p class="epi-cal-nota">Pendiente de que el equipo la confirme.</p>`}
      <div class="epi-cal-acciones">
        <a class="epi-btn epi-btn--secundario" href=${ics(cita, duracion, props.lugar || '')} download="cita-epi10.ics">Añadir a mi calendario</a>
        ${cita.cancelable && !seguro && html`
          <button class="epi-btn epi-btn--texto" onClick=${() => setSeguro(true)} data-epi10-citas="cancelar">Cancelar cita</button>`}
      </div>
      ${!cita.cancelable && html`
        <p class="epi-cal-nota">Queda poco para tu cita. Si no puedes venir, <a href=${props.mensajes}>escríbenos por Mensajes</a>.</p>`}
      ${seguro && html`
        <div class="epi-cal-confirma" role="alertdialog" aria-label="Cancelar la cita">
          <p>¿Cancelamos tu cita del ${fmtDia.format(aFecha(cita.fecha))} a las ${cita.hora}?</p>
          <div class="epi-cal-acciones">
            <button class="epi-btn epi-btn--peligro" disabled=${ocupado} onClick=${() => alCancelar(cita)} data-epi10-citas="confirmar-cancelacion">Sí, cancelar</button>
            <button class="epi-btn epi-btn--texto" onClick=${() => setSeguro(false)}>No, mantenerla</button>
          </div>
        </div>`}
    </section>`;
}

function Huecos({ dia, horas, elegida, alElegir }) {
  const grupos = [['Mañana', horas.filter((h) => h < '14:00')], ['Tarde', horas.filter((h) => h >= '14:00')]];
  return html`
    <div class="epi-cal-huecos" data-epi10-citas="huecos" data-epi10-citas-dia=${dia}>
      ${grupos.filter(([, hs]) => hs.length).map(([nombre, hs]) => html`
        <fieldset class="epi-cal-grupo">
          <legend>${nombre}</legend>
          <div class="epi-cal-chips">
            ${hs.map((h) => html`
              <button type="button" class=${'epi-cal-chip' + (h === elegida ? ' is-elegida' : '')} aria-pressed=${h === elegida}
                onClick=${() => alElegir(h)} data-epi10-citas-hueco=${h}>${h}</button>`)}
          </div>
        </fieldset>`)}
    </div>`;
}

function App({ props }) {
  const [datos, setDatos] = useState(null);
  const [dia, setDia] = useState(null);
  const [hora, setHora] = useState(null);
  const [hecha, setHecha] = useState(null);
  const [aviso, setAviso] = useState(null);
  const [ocupado, setOcupado] = useState(false);
  const [caducada, setCaducada] = useState(false);
  const panel = useRef(null);

  const cargar = async (elegir) => {
    try {
      const d = await llamar(props.api);
      setDatos(d);
      if (elegir) setDia(d.citas[0]?.fecha || Object.keys(d.huecos)[0] || null);
    } catch (e) {
      if (e instanceof SesionCaducada) setCaducada(true); else setAviso({ tipo: 'error', texto: e.message });
    }
  };
  useEffect(() => { cargar(true); }, []);

  const elegirDia = (iso) => {
    setDia(iso); setHora(null); setHecha(null); setAviso(null);
    if (window.matchMedia('(max-width: 839px)').matches) setTimeout(() => panel.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const escribir = async (cuerpo, alTerminar) => {
    setOcupado(true); setAviso(null);
    try {
      const r = await llamar(props.api, props.csrf, cuerpo);
      alTerminar(r);
      await cargar(false);
    } catch (e) {
      if (e instanceof SesionCaducada) setCaducada(true);
      else { setAviso({ tipo: 'error', texto: e.message }); await cargar(false); }
    } finally { setOcupado(false); }
  };
  const reservar = () => escribir({ accion: 'reservar', fecha: dia, hora }, (r) => {
    setHecha(r.citas.find((c) => c.id === r.cita.id) || r.cita); setHora(null);
  });
  const cancelar = (cita) => escribir({ accion: 'cancelar', id: cita.id }, () => {
    setHecha(null); setAviso({ tipo: 'ok', texto: 'Hemos cancelado tu cita. Si quieres, elige otro hueco.' });
  });

  if (caducada) {
    return html`<div class="epi-cal-alerta" role="alert">Tu sesión ha caducado. <a href="../../../../../../portal/index.php">Vuelve a entrar</a> para ver tus citas.</div>`;
  }
  if (!datos) return html`<p class="epi-cal-cargando" aria-busy="true">${aviso ? aviso.texto : 'Cargando el calendario…'}</p>`;

  const miCita = datos.citas.find((c) => c.fecha === dia);
  const proxima = datos.citas[0];
  const horas = (dia && datos.huecos[dia]) || [];
  const lleno = datos.citas.length >= datos.maximo;
  const sinHuecos = Object.keys(datos.huecos).length === 0;

  let contenido;
  if (hecha) {
    contenido = html`
      <div class="epi-cal-hecho" role="status" data-epi10-citas="reservada">
        <span class="epi-cal-check" aria-hidden="true">✓</span>
        <h2>¡Cita reservada!</h2>
      </div>
      <${MiCita} cita=${hecha} props=${props} duracion=${datos.duracion} titulo="Tu cita" alCancelar=${cancelar} ocupado=${ocupado} />`;
  } else if (miCita) {
    contenido = html`<${MiCita} cita=${miCita} props=${props} duracion=${datos.duracion} titulo="Tu cita" alCancelar=${cancelar} ocupado=${ocupado} />`;
  } else if (!dia) {
    contenido = html`<p class="epi-cal-vacio">${sinHuecos
      ? html`Ahora mismo no hay huecos libres. <a href=${props.mensajes}>Escríbenos por Mensajes</a> y te buscamos uno.`
      : 'Elige un día marcado en el calendario.'}</p>`;
  } else if (lleno) {
    contenido = html`
      <h2 class="epi-cal-panel-titulo">${diaLargo(dia)}</h2>
      <p class="epi-cal-vacio">Ya tienes una cita el ${fmtDia.format(aFecha(proxima.fecha))} a las ${proxima.hora}.
        Si prefieres este día, cancela esa cita primero.</p>
      <button class="epi-btn epi-btn--secundario" onClick=${() => elegirDia(proxima.fecha)}>Ver mi cita</button>`;
  } else {
    contenido = html`
      <h2 class="epi-cal-panel-titulo">${diaLargo(dia)}</h2>
      <p class="epi-cal-sub">${horas.length === 1 ? 'Queda 1 hueco' : `Quedan ${horas.length} huecos`} · ${datos.duracion} min</p>
      <${Huecos} dia=${dia} horas=${horas} elegida=${hora} alElegir=${(h) => { setHora(h); setAviso(null); }} />
      ${hora && html`
        <div class="epi-cal-resumen" data-epi10-citas="resumen">
          <p><strong>${diaLargo(dia)}</strong>, de ${hora} a ${masMinutos(hora, datos.duracion)}${props.lugar ? html`<br /><span>${props.lugar}</span>` : ''}</p>
          <button class="epi-btn epi-btn--primario" disabled=${ocupado} onClick=${reservar} data-epi10-citas="confirmar">
            ${ocupado ? 'Reservando…' : 'Confirmar cita'}
          </button>
        </div>`}`;
  }

  return html`
    ${proxima && !hecha && proxima.fecha !== dia && html`
      <button class="epi-cal-banda" onClick=${() => elegirDia(proxima.fecha)} data-epi10-citas="proxima">
        <span>Tu próxima cita</span>
        <strong>${mayus(fmtCorto.format(aFecha(proxima.fecha)))} · ${proxima.hora}</strong>
        <span aria-hidden="true">→</span>
      </button>`}
    <div class="epi-cal-rejilla">
      <section class="epi-cal-tarjeta" aria-label="Calendario">
        <${Calendario} datos=${datos} dia=${dia} alElegir=${elegirDia} />
      </section>
      <section class="epi-cal-tarjeta epi-cal-panel" ref=${panel} aria-live="polite">
        ${aviso && html`<div class=${'epi-cal-alerta' + (aviso.tipo === 'ok' ? ' is-ok' : '')} role=${aviso.tipo === 'ok' ? 'status' : 'alert'}>${aviso.texto}</div>`}
        ${contenido}
      </section>
    </div>`;
}

for (const el of document.querySelectorAll('[data-epi10-isla="calendario"]')) {
  el.textContent = '';
  render(html`<${App} props=${JSON.parse(el.dataset.props || '{}')} />`, el);
}
