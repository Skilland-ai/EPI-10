#!/usr/bin/env python3
"""EPI10 · Informe visual · renderizador.

Convierte los datos estructurados de un informe (JSON, ver references/esquema-datos.md)
en un HTML autocontenido: fuentes, logos, iconos y estilos van incrustados.

    python3 scripts/render.py datos.json -o informe.html               # A4 imprimible (PDF)
    python3 scripts/render.py datos.json -o informe_pantalla.html --modo pantalla   # vista portal / móvil

Requisitos: Python 3.9+ y Jinja2 (pip install jinja2).
Los gráficos (rueda, mapa de prioridades, figuras de anatomía, mapa del cuerpo, progresión, escalas)
se generan aquí como SVG a partir de los datos: nunca se dibujan a mano en la plantilla.

Desde la versión 0.2 el renderizador es también la maquetadora: con el bloque `persona` del JSON
(sexo, talla y peso o IMC, objetivo, actividad, edad, etapa) elige sola la figura, la progresión,
la ficha «Tú, hoy» y las notas de etapa. Reglas: references/personalizacion.md.
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


# ── Figuras de anatomía ───────────────────────────────────────────────────
# Una figura = sexo × complexión (1..5). Se dibuja con medidas, no a mano: medias anchuras en px
# sobre un lienzo de 200 × 330. Trazo redondeado de 1,7, como los iconos.
# Las medidas y los pasos son una propuesta de Skilland (ver references/personalizacion.md).
FIG_BASE = {  # complexión 3
    "hombre": dict(sh=36, ch=30.5, wa=26, hi=27, aw=14.5, ge=10.5),
    "mujer": dict(sh=30, ch=26.5, wa=21.5, hi=30, aw=12.5, ge=10),
    "neutra": dict(sh=33, ch=28.5, wa=24, hi=28.5, aw=13.5, ge=10.2),
}
FIG_SUBE = {  # cambio por paso hacia las complexiones 4 y 5
    "hombre": dict(sh=1.8, ch=3.4, wa=5.6, hi=3.8, aw=1.7, ge=1.1),
    "mujer": dict(sh=1.5, ch=3.0, wa=5.0, hi=4.6, aw=1.6, ge=1.1),
    "neutra": dict(sh=1.65, ch=3.2, wa=5.3, hi=4.2, aw=1.65, ge=1.1),
}
FIG_BAJA = {  # cambio por paso hacia las complexiones 2 y 1: más suave, para no caricaturizar
    "hombre": dict(sh=1.5, ch=2.2, wa=2.6, hi=2.0, aw=1.3, ge=.8),
    "mujer": dict(sh=1.2, ch=1.9, wa=2.2, hi=2.4, aw=1.1, ge=.8),
    "neutra": dict(sh=1.35, ch=2.05, wa=2.4, hi=2.2, aw=1.2, ge=.8),
}
FIG_TONOS = {  # variante → (relleno, trazo)
    "mapa": ("#e3edf6", "#86b1d6"),     # fondo del mapa del cuerpo: discreta, mandan los marcadores
    "normal": ("#e3edf6", "#4682b8"),
    "activa": ("#bcd3e8", "#01447b"),   # «hoy»
    "meta": ("#e5f5fa", "#029acc"),     # «tu dirección»
    "suave": ("#eef3f8", "#bcd3e8"),    # pasos intermedios
}
SEXOS = ("mujer", "hombre")


def _sexo_fig(sexo) -> str:
    return sexo if sexo in SEXOS else "neutra"


def _medidas(sexo: str, k: int) -> dict:
    s = _sexo_fig(sexo)
    t = max(1, min(5, int(k))) - 3
    paso = FIG_SUBE[s] if t > 0 else FIG_BAJA[s]
    return {m: FIG_BASE[s][m] + paso[m] * t for m in FIG_BASE[s]}


def _cerrada(pts: list, tension: float = .8) -> str:
    """Curva cerrada y suave por los puntos (Catmull-Rom → Bézier)."""
    n = len(pts)
    d = [f"M{pts[0][0]:.1f} {pts[0][1]:.1f}"]
    for i in range(n):
        p0, p1, p2, p3 = pts[i - 1], pts[i], pts[(i + 1) % n], pts[(i + 2) % n]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6 * tension, p1[1] + (p2[1] - p0[1]) / 6 * tension)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6 * tension, p2[1] - (p3[1] - p1[1]) / 6 * tension)
        d.append(f"C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {p2[0]:.1f} {p2[1]:.1f}")
    return "".join(d) + "Z"


def _esqueleto(sexo: str, k: int) -> dict:
    """Puntos de la figura (lado derecho del lienzo; el izquierdo es su espejo)."""
    m = _medidas(sexo, k)
    sh, ch, wa, hi, aw, ge = (m[x] for x in ("sh", "ch", "wa", "hi", "aw", "ge"))
    torso = [(8.5, 63), (sh * .7, 66.5), (sh, 77), (ch, 104), (wa, 136), (hi, 168), (hi * .55, 186)]
    ex = max(sh, hi, wa) + aw / 2 + 3
    brazo = [(sh - aw / 2 + 1, 77 + aw / 2), (ex, 133), (ex + 2.5, 188)]
    r = 3.2                      # radio de redondeo de la pierna (lo pone el trazo)
    mu = (hi - 1.2) / 2          # medio muslo: los dos muslos llenan la cadera
    mx = hi - mu                 # centro del muslo
    rx, tx = mx * .9 + 1.5, max(mx * .78, ge * .7 + 2.2)
    pierna = [(mx + mu - r, 170), (rx + ge * 1.1 - r + .6, 246), (tx + ge * .7 - r, 311),
              (tx - ge * .7 + r, 311), (rx - ge * 1.1 + r - .6, 246), (mx - mu + r, 180)]
    return dict(m=m, torso=torso, brazo=brazo, pierna=pierna, r=r, mx=mx, rx=rx, tx=tx, ex=ex)


def figura_g(sexo: str = "neutra", k: int = 3, variante: str = "normal", grosor: float = 1.7) -> str:
    """Los trazos de una figura (sin <svg>), para componerla dentro de otros gráficos.
    El contorno único sale de pintar dos veces las mismas piezas: primero en el color del trazo
    y algo más gruesas, y encima en el color de relleno."""
    e = _esqueleto(sexo, k)
    relleno, trazo = FIG_TONOS.get(variante, FIG_TONOS["normal"])
    aw, r, cx = e["m"]["aw"], e["r"], 100

    def linea(pts, lado, cierra=False):
        return "M" + "L".join(f"{cx + lado * x:.1f} {y:.1f}" for x, y in pts) + ("Z" if cierra else "")

    def capa(color, extra):
        o = [f'<g fill="{color}" stroke="{color}" stroke-linecap="round" stroke-linejoin="round">']
        for lado in (-1, 1):
            o.append(f'<path d="{linea(e["pierna"], lado, True)}" stroke-width="{2 * r + extra:.1f}"/>')
            o.append(f'<path d="{linea(e["brazo"], lado)}" fill="none" stroke-width="{aw + extra:.1f}"/>')
        o.append(f'<rect x="{cx - 8}" y="44" width="16" height="26" rx="6" stroke-width="{extra}"/>')
        torso = [(cx + x, y) for x, y in e["torso"]] + [(cx - x, y) for x, y in reversed(e["torso"])]
        o.append(f'<path d="{_cerrada(torso)}" stroke-width="{extra}"/>')
        o.append(f'<ellipse cx="{cx}" cy="30" rx="19.5" ry="21.5" stroke-width="{extra}"/>')
        o.append("</g>")
        return "".join(o)

    return capa(trazo, 2 * grosor) + capa(relleno, 0)


def figura_svg(sexo: str = "neutra", k: int = 3, variante: str = "normal", clase: str = "figura") -> str:
    """Una figura suelta: sexo («mujer», «hombre» o «neutra») × complexión (1..5)."""
    nombre = {"mujer": "de mujer", "hombre": "de hombre"}.get(_sexo_fig(sexo), "neutra")
    return (f'<svg xmlns="http://www.w3.org/2000/svg" class="{clase}" viewBox="0 0 200 330" role="img" '
            f'aria-label="Figura {nombre}, complexión {int(k)} de 5">{figura_g(sexo, k, variante)}</svg>')


def zonas(sexo: str = "neutra", k: int = 3) -> dict:
    """Dónde cae cada zona del mapa del cuerpo en la figura que toca (cambia con hombros, cintura y cadera)."""
    e = _esqueleto(sexo, k)
    m = e["m"]
    return {
        "cabeza": (100, 30), "cuello": (100, 58), "corazon": (100 - m["ch"] * .4, 100),
        "pulmon": (100 + m["ch"] * .45, 96), "higado": (100 + m["wa"] * .5, 124),
        "estomago": (100 - m["wa"] * .42, 128), "intestino": (100, 152), "espalda": (100, 118),
        "piel": (100 + (e["brazo"][0][0] + e["ex"]) / 2, 106), "codo": (100 - e["ex"], 134),
        "mano": (100 - e["ex"] - 2.5, 186), "cadera": (100 - m["hi"] * .55, 172),
        "muslo": (100 - e["mx"], 214), "rodilla": (100 + e["rx"], 248), "tobillo": (100 + e["tx"], 300),
    }


ZONAS = zonas()  # compatibilidad: las zonas de la figura neutra


def cuerpo_svg(marcadores: list[dict], sexo: str = "neutra", complexion: int = 3) -> str:
    """Mapa del cuerpo: la figura que toca (sexo × complexión) con marcadores numerados en escala neutra."""
    z = zonas(sexo, complexion)
    out = ['<svg class="cuerpo-svg" viewBox="0 0 200 330" role="img" aria-label="Mapa del cuerpo">',
           figura_g(sexo, complexion, "mapa")]
    for i, m in enumerate(marcadores, 1):
        x, y = z.get(m["zona"], z["espalda"])
        c = NEUTRA[max(3, nivel(m.get("nivel", "medio")) or 3)]
        out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="10.5" fill="{c}" stroke="#fff" stroke-width="2.2"/>'
                   f'<text x="{x:.1f}" y="{y + 3.8:.1f}" text-anchor="middle" class="cuerpo-n">{i}</text>')
    out.append("</svg>")
    return "".join(out)


def progresion_svg(sexo: str, pasos: list[int], etiquetas: tuple[str, str] = ("Hoy", "Tu dirección")) -> str:
    """«De dónde partes → a dónde vas»: las figuras de la complexión de partida a la de destino.
    Con un solo paso (el objetivo no cambia la complexión) dibuja una figura sola."""
    paso_x, ancho, alto = 150, 118, 330
    n = len(pasos)
    W = ancho + paso_x * (n - 1)
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" class="prog-svg" viewBox="-14 0 {W + 28} {alto + 34}" role="img" '
           f'aria-label="De dónde partes y a dónde vas" font-family="Manrope, system-ui, sans-serif">']
    for i, k in enumerate(pasos):
        var = "activa" if i == 0 else ("meta" if i == n - 1 else "suave")
        x = i * paso_x + (ancho - 200) / 2
        out.append(f'<g transform="translate({x:.0f} 0)">{figura_g(sexo, k, var)}</g>')
        if i < n - 1:
            ax = i * paso_x + ancho + 4
            out.append(f'<path d="M{ax} 150h{paso_x - ancho - 8}m-7-7l7 7-7 7" fill="none" stroke="#029acc" '
                       f'stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>')
        if i == 0 or i == n - 1:
            txt = etiquetas[0] if i == 0 else etiquetas[1]
            if n == 1:
                txt = "Tu punto de partida"
            out.append(f'<text x="{i * paso_x + ancho / 2:.0f}" y="{alto + 26}" text-anchor="middle" font-size="19" '
                       f'font-weight="700" fill="{"#01447b" if i == 0 else "#00739a"}">{escape(txt)}</text>')
    out.append("</svg>")
    return "".join(out)


# ── Persona: lo que la maquetadora decide sola ────────────────────────────
OBJETIVOS = {  # objetivo → (nombre para el cliente, sentido en la escala de complexión)
    "perder_grasa": ("Bajar grasa", -1),
    "ganar_musculo": ("Ganar músculo", +1),
    "ganar_peso": ("Ganar peso", +1),
    "mantener": ("Mantenerte como estás", 0),
    "rendimiento": ("Rendir más", 0),
    "bienestar": ("Sentirte mejor", 0),
}
ACTIVIDAD = {"sedentaria": (1, "Sedentaria"), "suave": (2, "Suave"), "moderada": (3, "Moderada"), "alta": (4, "Alta")}
ETAPAS = {"ciclo": "Ciclo regular", "perimenopausia": "Perimenopausia", "menopausia": "Menopausia"}
CORTES_IMC = (18.5, 22.0, 25.0, 30.0)  # propuesta de Skilland, pendiente de validar por EPI10


def complexion_de_imc(imc: float) -> int:
    """IMC → complexión 1..5. Los cortes son una propuesta pendiente de validar."""
    return 1 + sum(1 for c in CORTES_IMC if imc >= c)


def _es(n: float, dec: int = 1) -> str:
    return f"{n:.{dec}f}".replace(".", ",")


def preparar_persona(datos: dict, avisos: list[str]) -> dict | None:
    """Lee `persona` del JSON y decide figura, progresión, ficha y notas de etapa. Sin `persona`, devuelve None
    y el informe sale como en la versión 0.1, con la figura neutra."""
    p = datos.get("persona")
    if not p:
        avisos.append("Sin bloque `persona`: figura neutra, sin ficha, progresión ni notas de etapa.")
        return None
    sexo = p.get("sexo")
    if sexo not in SEXOS:
        avisos.append(f"`persona.sexo` debe ser «mujer» u «hombre» (llega {sexo!r}): se usa la figura neutra.")
        sexo = None
    talla, peso, imc = p.get("talla_cm"), p.get("peso_kg"), p.get("imc")
    if not imc and talla and peso:
        imc = peso / (talla / 100) ** 2
    k = p.get("complexion")
    if k:
        k = max(1, min(5, int(k)))
    elif imc:
        k = complexion_de_imc(imc)
    else:
        avisos.append("Sin IMC ni talla y peso: complexión media (3) y sin progresión.")
        k = 3
    edad = p.get("edad")
    if edad is not None and edad < 18:
        avisos.append("Menor de 18 años: el informe no está pensado para menores. Revísalo con el profesional.")

    # Progresión «de dónde partes → a dónde vas»
    obj = p.get("objetivo")
    if obj and obj not in OBJETIVOS:
        avisos.append(f"`persona.objetivo` desconocido ({obj!r}): no se dibuja la progresión.")
        obj = None
    nombre_obj, sentido = OBJETIVOS.get(obj, ("", 0))
    destino = k
    if imc or p.get("complexion"):
        pedido = p.get("complexion_objetivo")
        if sentido < 0 and k >= 4:      # bajar: como mucho dos pasos y nunca por debajo de la complexión media
            destino = max(3, k - 2, min(k - 1, int(pedido))) if pedido else k - 1
        elif sentido > 0 and k <= 2:    # ganar: como mucho dos pasos y nunca por encima de la media
            destino = min(3, k + 2, max(k + 1, int(pedido))) if pedido else k + 1
    paso = 1 if destino > k else -1
    pasos = list(range(k, destino, paso)) + [destino] if destino != k else [k]

    # Actividad
    act = p.get("actividad")
    if act and act not in ACTIVIDAD:
        avisos.append(f"`persona.actividad` desconocida ({act!r}): no se muestra el medidor.")
        act = None

    # Notas de etapa: reglas de prudencia del anexo del cuestionario de EPI10 (P45–P48) y una propuesta por edad
    et = p.get("etapa") or {}
    notas = []
    if sexo == "mujer":
        if et.get("embarazo"):
            notas.append(dict(titulo="Embarazo", texto="Toma este plan solo como orientación. Antes de tomar cualquier complemento, consúltalo con tu médico o tu matrona."))
        if et.get("lactancia"):
            notas.append(dict(titulo="Lactancia", texto="Toma este plan solo como orientación. Antes de tomar cualquier complemento, consúltalo con tu profesional sanitario."))
        if et.get("hormonal") in ("perimenopausia", "menopausia"):
            notas.append(dict(titulo=ETAPAS[et["hormonal"]], texto="En esta etapa algunos complementos pueden interactuar con tus cambios hormonales. Coméntalo con tu profesional sanitario antes de empezar."))
        if et.get("terapia_hormonal"):
            notas.append(dict(titulo="Anticonceptivos o terapia hormonal", texto="Algunos complementos pueden interactuar con ellos. Consúltalo con tu profesional sanitario antes de empezar."))
    elif any(et.get(x) for x in ("embarazo", "lactancia", "hormonal", "terapia_hormonal")):
        avisos.append("`persona.etapa` solo se aplica si el sexo es «mujer»: se ignora.")
    if edad is not None and edad >= 65:
        notas.append(dict(titulo="A partir de los 65", texto="Es más habitual tomar medicación. Revisa estos complementos con tu médico antes de empezar: sus indicaciones van primero."))

    return dict(
        sexo=sexo, sexo_fig=_sexo_fig(sexo), edad=edad, talla_cm=talla, peso_kg=peso,
        imc=imc, imc_txt=_es(imc) if imc else None, complexion=k,
        complexion_origen="profesional" if p.get("complexion") else ("imc" if imc else "sin datos"),
        objetivo=obj, objetivo_nombre=nombre_obj, objetivo_txt=p.get("objetivo_txt") or nombre_obj,
        pasos=pasos, cambia=len(pasos) > 1, progresion=bool(obj and (imc or p.get("complexion"))),
        actividad=act, actividad_nivel=ACTIVIDAD[act][0] if act else None,
        actividad_nombre=ACTIVIDAD[act][1] if act else None, actividad_txt=p.get("actividad_txt") or "",
        etapa_nombre=ETAPAS.get(et.get("hormonal")) if sexo == "mujer" else None, notas=notas,
    )


def aplicar_sexo(datos: dict, persona: dict | None, avisos: list[str]) -> None:
    """Lo que depende del sexo y no debe quedar al cuidado de quien rellena el JSON:
    el linaje paterno de una mujer no existe, y lo marcado con `solo` se quita si no es para su sexo."""
    sexo = persona and persona["sexo"]
    if not sexo:
        return
    anc = datos.get("capa2", {}).get("ancestralidad")
    if sexo == "mujer" and anc and anc.get("linaje_paterno"):
        anc["linaje_paterno"] = None
        avisos.append("Mujer con `linaje_paterno` relleno: se ha puesto «No aplica».")

    def filtra(lista: list, donde: str) -> list:
        fuera = [x for x in lista if x.get("solo") in SEXOS and x["solo"] != sexo]
        for x in fuera:
            avisos.append(f"{donde}: «{x.get('rasgo') or x.get('nombre') or x.get('titulo')}» es solo para "
                          f"{x['solo']} y se ha quitado.")
        return [x for x in lista if x not in fuera]

    if "cuerpo" in datos:
        datos["cuerpo"] = filtra(datos["cuerpo"], "Mapa del cuerpo")
    c2 = datos.get("capa2", {})
    for r in c2.get("rasgos", []):
        r["items"] = filtra(r["items"], "Rasgos")
    for g in c2.get("sensible", {}).get("predisposiciones", []):
        g["items"] = filtra(g["items"], "Predisposiciones")


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


FUNCIONES_SVG = (rueda_svg, matriz_svg, cuerpo_svg, linaje_svg, escala_html, puntos, barras_genetica,
                 figura_svg, progresion_svg)


def crear_entorno() -> Environment:
    env = Environment(loader=FileSystemLoader(str(RAIZ)), undefined=StrictUndefined,
                      trim_blocks=True, lstrip_blocks=True, autoescape=True)
    env.globals.update(
        ESTADOS=ESTADOS, ESTADOS_COMPLEMENTO=ESTADOS_COMPLEMENTO, MOMENTOS=MOMENTOS,
        EVIDENCIA_TXT=EVIDENCIA_TXT, nivel=nivel,
        **{f.__name__: (lambda f: lambda *a, **k: Markup(f(*a, **k)))(f) for f in FUNCIONES_SVG},
    )
    return env


def recursos() -> dict:
    """Estilos, iconos y logos incrustados: lo que hace que el HTML sea un solo archivo."""
    return dict(
        css=css_incrustado(),
        iconos=(RAIZ / "components" / "iconos.svg").read_text(encoding="utf-8"),
        logo_azul=b64(RAIZ / "assets/logos/epi10-azul.png", "image/png"),
        logo_blanco=b64(RAIZ / "assets/logos/epi10-blanco.png", "image/png"),
    )


def cargar(ruta: Path) -> tuple[dict, dict | None, list[str]]:
    """Lee el JSON y aplica las reglas de personalización. Devuelve (datos, persona, avisos)."""
    datos = json.loads(ruta.read_text(encoding="utf-8"))
    avisos: list[str] = []
    persona = preparar_persona(datos, avisos)
    aplicar_sexo(datos, persona, avisos)
    return datos, persona, avisos


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("datos", type=Path)
    ap.add_argument("-o", "--salida", type=Path, required=True)
    ap.add_argument("--modo", choices=["pdf", "pantalla"], default="pdf")
    ap.add_argument("--sin-capa2", action="store_true", help="Solo «Tu plan» (capa 1)")
    args = ap.parse_args()

    datos, persona, avisos = cargar(args.datos)
    areas = {a["id"]: a for a in datos["areas"]}
    html = crear_entorno().get_template("plantilla/informe.html.j2").render(
        d=datos, areas=areas, persona=persona, modo=args.modo, capa2=not args.sin_capa2, **recursos())
    args.salida.write_text(html, encoding="utf-8")
    print(f"OK · {args.salida} ({len(html)//1024} KB, modo {args.modo})")
    if persona:
        print(f"   Versión: {persona['sexo'] or 'sin sexo'} · complexión {persona['complexion']} "
              f"({persona['complexion_origen']}) · progresión {' → '.join(map(str, persona['pasos']))}"
              f" · notas de etapa: {len(persona['notas'])}")
    for a in avisos:
        print(f"   Aviso · {a}", file=sys.stderr)


if __name__ == "__main__":
    main()
