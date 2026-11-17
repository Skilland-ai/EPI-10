#!/usr/bin/env python3
"""EPI10 · Informe visual · renderizador.

Convierte los datos estructurados de un informe (JSON, ver references/esquema-datos.md)
en un HTML autocontenido: fuentes, logos, iconos y estilos van incrustados.

    python3 scripts/render.py datos.json -o informe.html               # A4 imprimible (PDF)
    python3 scripts/render.py datos.json -o informe_pantalla.html --modo pantalla   # vista portal / móvil

Requisitos: Python 3.9+ y Jinja2 (pip install jinja2).
Los gráficos (rueda, mapa de prioridades, mapa del cuerpo, escalas) se generan aquí como SVG
a partir de los datos: nunca se dibujan a mano en la plantilla.
"""
from __future__ import annotations

import argparse
import base64
import json
import math
import sys
from html import escape
from pathlib import Path

try:
    from jinja2 import Environment, FileSystemLoader, StrictUndefined
    from markupsafe import Markup
except ImportError:  # pragma: no cover
    sys.exit("Falta Jinja2: pip install jinja2")

RAIZ = Path(__file__).resolve().parent.parent

# ── Vocabulario controlado ────────────────────────────────────────────────
ESTADOS = {  # estado → (clase css, palabra para el cliente)
    "verde": ("verde", "Vas bien"),
    "ambar": ("ambar", "Mejorable"),
    "rojo": ("rojo", "Prioridad"),
    "info": ("info", "Dato"),
}
ESTADOS_COMPLEMENTO = {  # revisión de lo que ya toma + tarjeta de complemento
    "mantener": ("verde", "Mantener", "check"),
    "ajustar": ("ambar", "Ajustar", "ajustar"),
    "revisar": ("ambar", "Revisar", "ajustar"),
    "dejar": ("rojo", "Dejar", "cruz"),
    "anadir": ("nuevo", "Añadir", "mas"),
    "nuevo": ("nuevo", "Nuevo", "mas"),
}
ESCALA = {  # tendencias de TellmeGen → posición 1..5 en la escala neutra
    "bajo": 1, "baja": 1, "ligeramente bajo": 2, "ligeramente baja": 2,
    "medio": 3, "media": 3, "normal": 3,
    "ligeramente alto": 4, "ligeramente alta": 4, "alto": 5, "alta": 5, "elevado": 5,
}
ESCALA_TXT = {1: "Bajo", 2: "Lig. bajo", 3: "Medio", 4: "Lig. alto", 5: "Alto"}
EVIDENCIA_TXT = {3: "Alta", 2: "Moderada", 1: "Preliminar"}
MOMENTOS = {"comida": ("comida", "Con comida"), "entreno": ("entreno", "Con el entreno"),
            "manana": ("sol", "Por la mañana"), "noche": ("descanso", "Por la noche"),
            "agua": ("vaso", "Con agua")}
COLOR = {"verde": "#2e9e6a", "ambar": "#e8a317", "rojo": "#d6453d", "info": "#5b6474", "nuevo": "#029acc"}
NEUTRA = {1: "#e3edf6", 2: "#bcd3e8", 3: "#86b1d6", 4: "#4682b8", 5: "#01447b"}


def nivel(t: str) -> int:
    return ESCALA.get(str(t).strip().lower(), 0)


def _arco(cx, cy, r_out, r_in, a0, a1):
    """Sector anular entre los ángulos a0 y a1 (grados, 0 = arriba, sentido horario)."""
    def p(r, a):
        rad = math.radians(a - 90)
        return cx + r * math.cos(rad), cy + r * math.sin(rad)
    large = 1 if (a1 - a0) > 180 else 0
    x0, y0 = p(r_out, a0); x1, y1 = p(r_out, a1)
    x2, y2 = p(r_in, a1); x3, y3 = p(r_in, a0)
    return (f"M{x0:.2f} {y0:.2f}A{r_out} {r_out} 0 {large} 1 {x1:.2f} {y1:.2f}"
            f"L{x2:.2f} {y2:.2f}A{r_in} {r_in} 0 {large} 0 {x3:.2f} {y3:.2f}Z")


def rueda_svg(areas: list[dict]) -> str:
    """La rueda del perfil: una porción por área, coloreada con su semáforo."""
    n = len(areas)
    paso, hueco = 360 / n, 2.4
    r_out, r_in, r_lab = 104, 60, 122
    partes = ['<svg class="rueda" viewBox="-160 -150 320 300" role="img" aria-label="Rueda del perfil">']
    for i, a in enumerate(areas):
        est = ESTADOS.get(a["estado"], ESTADOS["info"])[0]
        a0, a1 = i * paso + hueco / 2, (i + 1) * paso - hueco / 2
        partes.append(f'<path d="{_arco(0, 0, r_out, r_in, a0, a1)}" fill="{COLOR[est]}"/>')
        mid = math.radians((a0 + a1) / 2 - 90)
        rm = (r_out + r_in) / 2
        ix, iy = rm * math.cos(mid), rm * math.sin(mid)
        partes.append(f'<use href="#i-{a["id"]}" x="{ix-12:.1f}" y="{iy-12:.1f}" width="24" height="24" style="color:#fff"/>')
        lx, ly = r_lab * math.cos(mid), r_lab * math.sin(mid)
        anchor = "middle" if abs(lx) < 20 else ("start" if lx > 0 else "end")
        dy = -4 if ly < -90 else (10 if ly > 90 else 4)
        partes.append(f'<text x="{lx:.1f}" y="{ly+dy:.1f}" text-anchor="{anchor}" class="rueda-lab">{escape(a["nombre"])}</text>')
    cuenta = {k: sum(1 for a in areas if a["estado"] == k) for k in ("verde", "ambar", "rojo")}
    partes.append('<circle r="52" fill="#fff"/>')
    partes.append('<text y="-14" text-anchor="middle" class="rueda-centro-k">TU PERFIL</text>')
    x = -30
    for k in ("verde", "ambar", "rojo"):
        partes.append(f'<circle cx="{x}" cy="10" r="9" fill="{COLOR[k]}"/>'
                      f'<text x="{x}" y="14.2" text-anchor="middle" class="rueda-centro-n">{cuenta[k]}</text>')
        x += 30
    partes.append('<text y="38" text-anchor="middle" class="rueda-centro-s">áreas por estado</text>')
    partes.append("</svg>")
    return "".join(partes)


def matriz_svg(areas: list[dict]) -> str:
    """Mapa de prioridades: genética (x) frente a hábitos (y). Explica por qué cada área es prioridad o no."""
    W, H = 340, 262
    x0, y0, w, h = 40, 20, 290, 196
    pad = .1  # margen interior para que ningún punto quede pegado al borde
    def px(g): return x0 + (pad + (1 - 2 * pad) * (max(1, min(3, g)) - 1) / 2) * w
    def py(hb): return y0 + (pad + (1 - 2 * pad) * (5 - max(1, min(5, hb))) / 4) * h
    out = [f'<svg class="matriz" viewBox="0 0 {W} {H}" role="img" aria-label="Mapa de prioridades">']
    cuadrantes = [  # x, y, fondo, etiqueta, tinta; las etiquetas van FUERA del área de datos
        (x0, y0, "#e2f3ea", "Mantén", "#17663f"),
        (x0 + w / 2, y0, "#e5f5fa", "Vigila y protege", "#00739a"),
        (x0, y0 + h / 2, "#fcf0d4", "Mejora el hábito", "#865600"),
        (x0 + w / 2, y0 + h / 2, "#fbe4e2", "Prioridad", "#9b2620"),
    ]
    for cx, cy, fill, lab, ink in cuadrantes:
        out.append(f'<rect x="{cx}" y="{cy}" width="{w/2}" height="{h/2}" fill="{fill}"/>')
        ty = y0 - 6 if cy == y0 else y0 + h + 12
        out.append(f'<text x="{cx + w/4}" y="{ty}" text-anchor="middle" class="mz-q" fill="{ink}">{lab.upper()}</text>')
    out.append(f'<line x1="{x0+w/2}" y1="{y0}" x2="{x0+w/2}" y2="{y0+h}" stroke="#fff" stroke-width="1.5"/>'
               f'<line x1="{x0}" y1="{y0+h/2}" x2="{x0+w}" y2="{y0+h/2}" stroke="#fff" stroke-width="1.5"/>')
    yb = y0 + h + 28
    out.append(f'<line x1="{x0}" y1="{yb-4}" x2="{x0+w}" y2="{yb-4}" class="mz-eje"/><path d="M{x0+w-5} {yb-8}l5 4-5 4" class="mz-eje"/>'
               f'<text x="{x0+w/2}" y="{yb+9}" text-anchor="middle" class="mz-ax">Señal de tu genética</text>'
               f'<text x="{x0}" y="{yb+9}" class="mz-ax2">menos</text><text x="{x0+w}" y="{yb+9}" text-anchor="end" class="mz-ax2">más</text>')
    out.append(f'<line x1="{x0-14}" y1="{y0+h}" x2="{x0-14}" y2="{y0}" class="mz-eje"/><path d="M{x0-18} {y0+5}l4-5 4 5" class="mz-eje"/>'
               f'<text transform="translate({x0-20} {y0+h/2}) rotate(-90)" text-anchor="middle" class="mz-ax">Tus hábitos hoy</text>'
               f'<text transform="translate({x0-20} {y0+h}) rotate(-90)" class="mz-ax2">mejorables</text>'
               f'<text transform="translate({x0-20} {y0}) rotate(-90)" text-anchor="end" class="mz-ax2">buenos</text>')
    grupos: dict[float, list] = {}
    for a in areas:
        grupos.setdefault(a["habitos"], []).append(a)
    for hb, grupo in grupos.items():
        grupo.sort(key=lambda a: a["genetica"])
        for j, a in enumerate(grupo):
            est = ESTADOS.get(a["estado"], ESTADOS["info"])[0]
            x, y = px(a["genetica"]), py(a["habitos"])
            out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="12.5" fill="{COLOR[est]}" stroke="#fff" stroke-width="2"/>')
            out.append(f'<use href="#i-{a["id"]}" x="{x-8:.1f}" y="{y-8:.1f}" width="16" height="16" style="color:#fff"/>')
            arriba = (j % 2 == 0) if len(grupo) > 1 else True
            if y < y0 + 34: arriba = False
            if y > y0 + h - 34: arriba = True
            ly = y - 17 if arriba else y + 25
            anc = "end" if x > x0 + w - 45 else ("start" if x < x0 + 45 else "middle")
            out.append(f'<text x="{x:.1f}" y="{ly:.1f}" text-anchor="{anc}" class="mz-lab">{escape(a["nombre"])}</text>')
    out.append("</svg>")
    return "".join(out)


def linaje_svg(materno: list[dict], paterno: list[dict] | None) -> str:
    """Tus linajes en el tiempo: haplogrupos sobre un eje de «hace X años» (de 300.000 a hoy)."""
    W, x0, x1 = 520, 60, 505
    tmax = max([p["hace"] or 0 for p in (materno + (paterno or []))] + [150000])
    def px(t): return x0 + (1 - (t or 0) / tmax) * (x1 - x0)
    filas = [("Materno", materno, "#029acc")] + ([("Paterno", paterno, "#01447b")] if paterno else [])
    H = 34 + 46 * len(filas)
    out = [f'<svg class="linaje" viewBox="0 0 {W} {H}" role="img" aria-label="Tus linajes en el tiempo">']
    for k in range(0, int(tmax) + 1, 50000):
        x = px(k)
        out.append(f'<line x1="{x:.1f}" y1="8" x2="{x:.1f}" y2="{H-22}" stroke="#e6dfd8" stroke-dasharray="2 3"/>'
                   f'<text x="{x:.1f}" y="{H-8}" text-anchor="middle" class="ln-ax">{"hoy" if k == 0 else f"{k//1000}.000"}</text>')
    out.append(f'<text x="{x1}" y="{H-8}" text-anchor="end" class="ln-ax" dx="-18"></text>')
    for i, (nombre, ruta, color) in enumerate(filas):
        y = 26 + i * 46
        out.append(f'<text x="0" y="{y+4}" class="ln-fila">{nombre}</text>')
        pts = [p for p in ruta if p["hace"]]
        out.append(f'<line x1="{px(pts[0]["hace"]):.1f}" y1="{y}" x2="{x1}" y2="{y}" stroke="{color}" stroke-width="3" stroke-linecap="round" opacity=".35"/>')
        etiquetas = []  # (x, texto): primero, los que tienen sitio y siempre el último
        for p in pts:
            x = px(p["hace"])
            out.append(f'<circle cx="{x:.1f}" cy="{y}" r="4.5" fill="{color}"/>')
            if not etiquetas or x - etiquetas[-1][0] > 24:
                etiquetas.append((x, p["hg"]))
        xl = px(pts[-1]["hace"])
        if etiquetas[-1][1] != pts[-1]["hg"]:
            while etiquetas and xl - etiquetas[-1][0] < 24:
                etiquetas.pop()
            etiquetas.append((xl, pts[-1]["hg"]))
        for j, (x, t) in enumerate(etiquetas):
            dy = -9 if j % 2 == 0 else 17
            out.append(f'<text x="{x:.1f}" y="{y+dy}" text-anchor="middle" class="ln-hg">{escape(t)}</text>')
        out.append(f'<circle cx="{x1}" cy="{y}" r="6" fill="#fff" stroke="{color}" stroke-width="2.5"/>'
                   f'<text x="{x1}" y="{y-11}" text-anchor="middle" class="ln-tu">Tú</text>')
    out.append("</svg>")
    return "".join(out)


ZONAS = {  # coordenadas en la silueta (viewBox 0 0 200 330)
    "cabeza": (100, 34), "cuello": (100, 62), "corazon": (88, 100), "pulmon": (114, 96),
    "higado": (113, 124), "estomago": (90, 128), "intestino": (100, 150), "piel": (146, 112),
    "codo": (52, 136), "mano": (44, 192), "cadera": (86, 172), "muslo": (82, 212),
    "rodilla": (119, 250), "tobillo": (121, 312), "espalda": (100, 120),
}


def cuerpo_svg(marcadores: list[dict]) -> str:
    """Mapa del cuerpo: silueta de trazos redondeados (eco del logo) con marcadores numerados en escala neutra."""
    f = "#e3edf6"
    out = ['<svg class="cuerpo-svg" viewBox="0 0 200 330" role="img" aria-label="Mapa del cuerpo">',
           f'<g fill="{f}" stroke="{f}" stroke-linecap="round" stroke-linejoin="round">',
           '<circle cx="100" cy="32" r="21" stroke="none"/>',
           '<rect x="92" y="48" width="16" height="16" rx="6" stroke="none"/>',
           '<rect x="68" y="60" width="64" height="116" rx="28" stroke="none"/>',
           '<path d="M74 74L52 136L44 194" fill="none" stroke-width="17"/>',
           '<path d="M126 74L148 136L156 194" fill="none" stroke-width="17"/>',
           '<path d="M88 168L82 250L80 314" fill="none" stroke-width="21"/>',
           '<path d="M112 168L119 250L121 314" fill="none" stroke-width="21"/>',
           "</g>"]
    for i, m in enumerate(marcadores, 1):
        x, y = ZONAS.get(m["zona"], (100, 120))
        c = NEUTRA[max(3, nivel(m.get("nivel", "medio")) or 3)]
        out.append(f'<circle cx="{x}" cy="{y}" r="10.5" fill="{c}" stroke="#fff" stroke-width="2.2"/>'
                   f'<text x="{x}" y="{y+3.8}" text-anchor="middle" class="cuerpo-n">{i}</text>')
    out.append("</svg>")
    return "".join(out)


def escala_html(tendencia: str) -> str:
    """Escala neutra de 5 pasos para tendencias genéticas. Nunca usa colores de semáforo."""
    n = nivel(tendencia)
    if not n:
        return f'<span class="variante">{escape(tendencia)}</span>'
    celdas = "".join(f'<i class="{"on" if k <= n else ""}"></i>' for k in range(1, 6))
    return f'<span class="escala" title="{escape(tendencia)}">{celdas}</span><span class="escala-t">{ESCALA_TXT[n]}</span>'


def puntos(valor: float, total: int = 5) -> str:
    v = int(round(valor))
    return '<span class="puntos">' + "".join(f'<i class="{"on" if k < v else ""}"></i>' for k in range(total)) + "</span>"


def barras_genetica(g: float) -> str:
    """Señal genética 1..3 en tres barras redondeadas (como las barras del logo)."""
    v = int(round(g))
    return '<span class="barras">' + "".join(f'<i class="{"on" if k < v else ""}"></i>' for k in range(3)) + "</span>"


def b64(ruta: Path, mime: str) -> str:
    return f"data:{mime};base64," + base64.b64encode(ruta.read_bytes()).decode()


def css_incrustado() -> str:
    tokens = (RAIZ / "tokens" / "tokens.css").read_text(encoding="utf-8")
    for peso in (400, 500, 600, 700):
        nombre = f"manrope-latin-{peso}-normal.woff2"
        tokens = tokens.replace(f'url("fonts/{nombre}")', f'url("{b64(RAIZ / "tokens" / "fonts" / nombre, "font/woff2")}")')
    comps = (RAIZ / "components" / "componentes.css").read_text(encoding="utf-8")
    return tokens + "\n" + comps


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("datos", type=Path)
    ap.add_argument("-o", "--salida", type=Path, required=True)
    ap.add_argument("--modo", choices=["pdf", "pantalla"], default="pdf")
    ap.add_argument("--sin-capa2", action="store_true", help="Solo «Tu plan» (capa 1)")
    args = ap.parse_args()

    datos = json.loads(args.datos.read_text(encoding="utf-8"))
    env = Environment(loader=FileSystemLoader(str(RAIZ)), undefined=StrictUndefined,
                      trim_blocks=True, lstrip_blocks=True, autoescape=True)
    env.globals.update(
        ESTADOS=ESTADOS, ESTADOS_COMPLEMENTO=ESTADOS_COMPLEMENTO, MOMENTOS=MOMENTOS,
        EVIDENCIA_TXT=EVIDENCIA_TXT, nivel=nivel,
        **{f.__name__: (lambda f: lambda *a, **k: Markup(f(*a, **k)))(f)
           for f in (rueda_svg, matriz_svg, cuerpo_svg, linaje_svg, escala_html, puntos, barras_genetica)},
    )
    areas = {a["id"]: a for a in datos["areas"]}
    html = env.get_template("plantilla/informe.html.j2").render(
        d=datos, areas=areas, modo=args.modo, capa2=not args.sin_capa2,
        css=css_incrustado(),
        iconos=(RAIZ / "components" / "iconos.svg").read_text(encoding="utf-8"),
        logo_azul=b64(RAIZ / "assets/logos/epi10-azul.png", "image/png"),
        logo_blanco=b64(RAIZ / "assets/logos/epi10-blanco.png", "image/png"),
    )
    args.salida.write_text(html, encoding="utf-8")
    print(f"OK · {args.salida} ({len(html)//1024} KB, modo {args.modo})")


if __name__ == "__main__":
    main()
