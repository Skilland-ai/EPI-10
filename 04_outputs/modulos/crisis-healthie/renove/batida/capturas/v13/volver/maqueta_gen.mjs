// Maqueta SKI2-272: reproduce a mano la salida de cabecera.html.twig + cabecera_miga.html.twig (cara portal).
import { writeFileSync } from 'node:fs';
const ic = (n) => `<svg class="epi-icon" aria-hidden="true" focusable="false"><use href="/ui/iconos.svg#i-${n}"></use></svg>`;
const ES = '/portal/home.php';
const vistas = {
  inicio: { titulo: 'Tu espacio', miga: false },
  'mis-documentos': { titulo: 'Tus documentos', miga: [['Tu espacio', ES, 'raiz'], ['Tus documentos']] },
  tarea: { titulo: 'Consentimiento informado', miga: [['Tu espacio', ES, 'raiz'], ['Tus documentos', '/portal/mis-documentos.php'], ['Consentimiento informado']] },
  'mi-informe': { titulo: 'Mi informe', miga: [['Tu espacio', ES, 'raiz'], ['Mi informe']] },
  'biblioteca-documento': { titulo: 'Informe de resultados del test EPI10', miga: [['Tu espacio', ES, 'raiz'], ['Mi informe', '/portal/biblioteca.php'], ['Informe de resultados del test EPI10']] },
  mensajes: { titulo: 'Mensajes', miga: [['Tu espacio', ES, 'raiz'], ['Mensajes']] },
};
for (const [v, d] of Object.entries(vistas)) {
  const m = d.miga;
  let nav = '';
  if (m) {
    const madre = m[m.length - 2];
    const lis = m.map((t, i) => {
      if (i === m.length - 1) return `<li class="epi-miga__tramo epi-miga__tramo--actual"><span class="epi-miga__texto" aria-current="page">${t[0]}</span></li>`;
      const esMadre = i === m.length - 2, raiz = t[2] === 'raiz';
      return `<li class="epi-miga__tramo${raiz ? ' epi-miga__tramo--raiz' : ''}${esMadre ? ' epi-miga__tramo--madre' : ''}"><a class="epi-miga__enlace" href="${t[1]}"${esMadre ? ' data-epi10-accion="volver" data-epi10-volver="href"' : ''}>${esMadre ? `<span class="epi-miga__atras">${ic('chevron-left')}</span>` : ''}${raiz ? `<span class="epi-miga__casita">${ic('house')}</span>` : ''}<span class="epi-miga__texto">${t[0]}</span></a></li>`;
    }).join('');
    nav = `<nav class="epi-miga epi-miga--volver" aria-label="Estás aquí" data-epi10-shell="miga">
<a class="epi-miga__volver" href="${madre[1]}" aria-label="Volver a ${madre[0]}" title="Volver a ${madre[0]}" data-epi10-accion="volver-jerarquico">${ic('arrow-left')}<span class="epi-miga__volver-texto">Volver</span></a>
<ol class="epi-miga__lista">${lis}</ol>${m.length > 2 ? `<a class="epi-miga__inicio" href="${ES}" aria-label="Ir a Tu espacio" data-epi10-accion="ir-inicio">${ic('house')}</a>` : ''}</nav>`;
  }
  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${d.titulo} · maqueta SKI2-272</title><link rel="stylesheet" href="/ui/epi10-ui.css"></head>
<body class="epi-app" data-epi10-cara="portal" data-epi10-vista="${v}">
<header class="epi-header${m ? ' epi-header--miga' : ''}" data-epi10-shell="cabecera"><div class="epi-header__inner">
<a class="epi-header__brand" href="${ES}"><img src="/img/epi10-azul.png" alt="EPI10" width="95" height="26"></a>
${nav}<span class="epi-header__spacer"></span>
<div class="epi-usermenu"><button type="button" class="epi-usermenu__trigger"><span class="epi-avatar" aria-hidden="true">LF</span><span class="epi-usermenu__name">Lucía</span>${ic('chevron-down')}</button></div>
</div></header>
<main class="epi-main" id="contenido"><div class="epi-page-head"><h1 class="epi-title">${d.titulo}</h1><p class="epi-lead">Contenido de ejemplo (maqueta, sin datos reales).</p></div>
<div class="epi-card" style="padding:24px;min-height:200px">…</div></main></body></html>`;
  writeFileSync(new URL(`./${v}.html`, import.meta.url), html);
}
