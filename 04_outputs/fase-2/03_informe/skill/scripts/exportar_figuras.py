#!/usr/bin/env python3
"""EPI10 · Informe visual · exporta las figuras de anatomía sueltas.

Escribe en la carpeta indicada las once figuras (mujer y hombre en cinco complexiones, más la neutra),
una lámina con todas y varios ejemplos de progresión, en SVG y, si hay Chromium, también en PNG.

    python3 scripts/exportar_figuras.py carpeta/           # SVG + PNG
    python3 scripts/exportar_figuras.py carpeta/ --sin-png
"""
from __future__ import annotations

import argparse
import glob
import os
import shutil
import subprocess
import tempfile
from pathlib import Path

import render as r


def chromium() -> str | None:
    c = os.environ.get("CHROME")
    if c:
        return c
    pw = sorted(glob.glob(str(Path.home() / ".cache/ms-playwright/chromium-*/chrome-linux*/chrome")))
    if pw:
        return pw[-1]
    for n in ("google-chrome", "google-chrome-stable", "chromium", "chromium-browser"):
        if shutil.which(n) and not shutil.which(n).startswith("/snap/"):
            return shutil.which(n)
    return None


def lamina() -> tuple[str, int, int]:
    """Las diez figuras en dos filas, con su nombre."""
    paso, alto = 170, 400
    W, H = 110 + paso * 5, alto * 2 + 20
    o = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" font-family="Manrope, system-ui, sans-serif">',
         f'<rect width="{W}" height="{H}" fill="#fdf4ed"/>']
    for f, (sexo, nombre) in enumerate((("mujer", "Mujer"), ("hombre", "Hombre"))):
        o.append(f'<text x="24" y="{f * alto + 190}" font-size="22" font-weight="700" fill="#0d2a4a">{nombre}</text>')
        for k in range(1, 6):
            x = 110 + (k - 1) * paso - 15
            o.append(f'<g transform="translate({x} {f * alto + 20})">{r.figura_g(sexo, k)}</g>')
            o.append(f'<text x="{x + 100}" y="{f * alto + 384}" text-anchor="middle" font-size="15" font-weight="700" '
                     f'fill="#5b6474">Complexión {k}</text>')
    o.append("</svg>")
    return "".join(o), W, H


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("carpeta", type=Path)
    ap.add_argument("--sin-png", action="store_true")
    args = ap.parse_args()
    args.carpeta.mkdir(parents=True, exist_ok=True)

    piezas: dict[str, tuple[str, int, int]] = {}  # nombre → (svg, ancho, alto)
    for sexo in ("mujer", "hombre"):
        for k in range(1, 6):
            piezas[f"figura_{sexo}_complexion_{k}"] = (r.figura_svg(sexo, k), 200, 330)
    piezas["figura_neutra_complexion_3"] = (r.figura_svg("neutra", 3), 200, 330)
    piezas["lamina_figuras_mujer_y_hombre"] = lamina()
    for nombre, sexo, pasos in (("progresion_mujer_ganar_de_2_a_3", "mujer", [2, 3]),
                                ("progresion_mujer_bajar_de_5_a_3", "mujer", [5, 4, 3]),
                                ("progresion_hombre_bajar_de_4_a_3", "hombre", [4, 3]),
                                ("progresion_hombre_ganar_de_1_a_3", "hombre", [1, 2, 3])):
        piezas[nombre] = (r.progresion_svg(sexo, pasos), 146 + 150 * (len(pasos) - 1), 364)

    for nombre, (svg, _, _) in piezas.items():
        (args.carpeta / f"{nombre}.svg").write_text(svg + "\n", encoding="utf-8")
    print(f"OK · {len(piezas)} SVG en {args.carpeta}")

    ch = None if args.sin_png else chromium()
    if not ch:
        if not args.sin_png:
            print("Sin Chromium: no se generan los PNG.")
        return
    css = r.css_incrustado().split(":root")[0]  # solo las fuentes
    with tempfile.TemporaryDirectory() as tmp:
        for nombre, (svg, w, h) in piezas.items():
            z = 3 if w <= 600 else 2  # px por unidad
            html = Path(tmp) / f"{nombre}.html"
            html.write_text(f'<!doctype html><meta charset="utf-8"><style>{css}html,body{{margin:0;background:#fdf4ed}}'
                            f'svg{{display:block;width:{w * z}px;height:{h * z}px}}</style>{svg}', encoding="utf-8")
            subprocess.run([ch, "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
                            f"--window-size={w * z},{h * z}", "--virtual-time-budget=2000",
                            f"--screenshot={(args.carpeta / (nombre + '.png')).resolve()}", f"file://{html}"],
                           check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"OK · {len(piezas)} PNG en {args.carpeta}")


if __name__ == "__main__":
    main()
