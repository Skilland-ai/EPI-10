/**
 * Adaptador de datos de DEMOSTRACIÓN (solo laboratorio). Misma forma que el adaptador real
 * (`adaptador-openemr.mjs`, fase B), que hablará con `public/portal/tareas_api.php` del módulo.
 * Persona ficticia. Guarda en localStorage para probar el guardado parcial; si el navegador no lo
 * permite, funciona igual en memoria.
 *
 * Forma de los datos:
 *   lista()  → { paciente: {nombre}, tareas: [Resumen], historial: [{titulo, fecha, estado}] }
 *   Resumen  = { formulario, orden, titulo, resumen, minutos, accion, estado, completado_en }
 *              estado ∈ pendiente | en_curso | completado (los del contrato v1; no_asignado no llega)
 *   tarea(f) → Resumen + { tipo: 'documento' | 'cuestionario', titulo_tarea, proposito, cta,
 *              confirmacion: {titulo, texto}, documento?, cuestionario?, borrador }
 *   guardarBorrador(f, datos) · enviar(f, datos) → { estado, completado_en }
 */

const CLAVE = 'epi10-lab-area2';

const CUESTIONARIO = {
  resourceType: 'Questionnaire',
  title: 'Hábitos de vida EPI10',
  language: 'es-ES',
  item: [
    { linkId: '1', text: '¿Cuántas horas duermes de media cada noche?', type: 'integer', required: true },
    { linkId: '2', text: '¿Cuántos días a la semana haces ejercicio físico de al menos 30 minutos?', type: 'integer', required: true },
    { linkId: '3', text: '¿Fumas?', type: 'choice', required: true, answerOption: [
      { valueCoding: { code: 'no', display: 'No' } },
      { valueCoding: { code: 'ocasional', display: 'Ocasionalmente' } },
      { valueCoding: { code: 'diario', display: 'A diario' } }] },
    { linkId: '4', text: '¿Con qué frecuencia consumes alcohol?', type: 'choice', required: true, answerOption: [
      { valueCoding: { code: 'nunca', display: 'Nunca' } },
      { valueCoding: { code: 'semanal', display: 'Alguna vez a la semana' } },
      { valueCoding: { code: 'diario', display: 'A diario' } }] },
    { linkId: '5', text: '¿Sigues alguna dieta o pauta alimentaria concreta?', type: 'boolean', required: false },
    { linkId: '6', text: '¿Hay algo más sobre tus hábitos que quieras contarnos?', type: 'text', required: false },
  ],
};

// Lo que el módulo leerá de config.php (textos de cada tarea) y de la plantilla de OpenEMR (documento).
const TAREAS = {
  consentimiento: {
    formulario: 'consentimiento', orden: 1, tipo: 'documento',
    titulo: 'Consentimiento', resumen: 'Autoriza el uso de tus datos para tu informe', minutos: 2, accion: 'Firmar',
    titulo_tarea: 'Firma tu consentimiento',
    proposito: 'Nos autoriza a usar tus datos de salud y genéticos solo para preparar tu informe. Es corto: léelo con calma.',
    pasos: ['Leer', 'Aceptar', 'Firmar', 'Enviar'],
    cta: 'Firmar y enviar a EPI10',
    confirmacion: { titulo: 'Consentimiento firmado', texto: 'Ya lo tenemos. Puedes volver a verlo cuando quieras en Tus documentos.' },
    documento: {
      titulo: 'Consentimiento informado · EPI10 Salud',
      referencia: 'Versión de prueba · datos ficticios',
      parrafos: [
        'Yo, Lucía Peñalver Ortiz (ficticia), nacida el 12/04/1988, consiento el tratamiento de mis datos de salud y genéticos por EPI10 Salud con la finalidad de elaborar mi informe nutricional a partir del test epigenético, según la información recibida.',
      ],
      aceptaciones: [
        { nombre: 'check0', texto: 'Acepto el tratamiento de datos genéticos' },
        { nombre: 'check1', texto: 'Soy mayor de edad' },
      ],
      firmante: 'Lucía Peñalver Ortiz (ficticia)',
    },
  },
  encuesta_habitos: {
    formulario: 'encuesta_habitos', orden: 2, tipo: 'cuestionario',
    titulo: 'Cuestionario de hábitos', resumen: 'Seis preguntas sobre sueño, ejercicio y alimentación', minutos: 3, accion: 'Rellenar',
    titulo_tarea: 'Cuéntanos tus hábitos',
    proposito: 'Con tus respuestas personalizamos tu informe. Puedes dejarlo a medias: guardamos cada respuesta.',
    cta: 'Enviar a EPI10',
    confirmacion: { titulo: 'Cuestionario enviado', texto: 'Gracias. Tus respuestas ya están con el equipo de EPI10.' },
    cuestionario: CUESTIONARIO,
  },
};

function leer() {
  try { return JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch { return memoria; }
}
let memoria = {};
function escribir(estado) {
  memoria = estado;
  try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch { /* sin almacenamiento: queda en memoria */ }
}
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

function resumen(f, guardado) {
  const t = TAREAS[f];
  const g = guardado[f] || {};
  return {
    formulario: f, orden: t.orden, titulo: t.titulo, resumen: t.resumen, minutos: t.minutos, accion: t.accion,
    estado: g.estado || 'pendiente', completado_en: g.completado_en || null,
  };
}

export const api = {
  async lista() {
    await espera(150);
    const g = leer();
    const tareas = Object.keys(TAREAS).map((f) => resumen(f, g)).sort((a, b) => a.orden - b.orden);
    const historial = tareas.filter((t) => t.estado === 'completado')
      .map((t) => ({ titulo: t.titulo, fecha: t.completado_en, estado: 'Enviado a EPI10' }));
    return { paciente: { nombre: 'Lucía' }, tareas, historial };
  },
  async tarea(f) {
    await espera(150);
    if (!TAREAS[f]) throw new Error('Esta tarea no existe.');
    const g = leer();
    const total = Object.keys(TAREAS).length;
    return { ...TAREAS[f], ...resumen(f, g), total, borrador: (g[f] && g[f].datos) || {} };
  },
  async guardarBorrador(f, datos) {
    await espera(250);
    const g = leer();
    if (g[f]?.estado === 'completado') return { estado: 'completado' };
    g[f] = { estado: 'en_curso', datos, completado_en: null };
    escribir(g);
    return { estado: 'en_curso', completado_en: null };
  },
  async enviar(f, datos) {
    await espera(600);
    const g = leer();
    const ahora = new Date().toISOString();
    g[f] = { estado: 'completado', datos, completado_en: ahora };
    escribir(g);
    return { estado: 'completado', completado_en: ahora };
  },
  reiniciar() { escribir({}); },
};
