#!/usr/bin/env python3
"""EPI10 · Informe visual · catálogo de componentes.

Genera un HTML A4 que enseña cada componente del informe con su nombre, para qué sirve,
cuándo aparece y sus variantes. Está pensado para que lo revise gente no técnica.
Usa los mismos componentes, estilos y datos de ejemplo que el informe: si cambia un componente,
cambia el catálogo.

    python3 scripts/catalogo.py -o catalogo_componentes.html
    scripts/exportar_pdf.sh catalogo_componentes.html
"""
from __future__ import annotations

import argparse
from pathlib import Path

import render as r


def persona_de(**p) -> dict:
    return r.preparar_persona({"persona": p}, [])


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("-o", "--salida", type=Path, required=True)
    ap.add_argument("--fecha", default="Noviembre 2026")
    args = ap.parse_args()

    m, pm, _ = r.cargar(r.RAIZ / "ejemplo" / "datos_ejemplo_mujer.json")
    h, ph, _ = r.cargar(r.RAIZ / "ejemplo" / "datos_ejemplo.json")
    progresiones = [  # (título, regla en llano, persona)
        ("Ganar, un paso", "Mujer · complexión 2 · quiere ganar músculo",
         persona_de(sexo="mujer", complexion=2, objetivo="ganar_musculo", objetivo_txt="Ganar fuerza y masa muscular")),
        ("Ganar, dos pasos", "Hombre · complexión 1 · quiere ganar peso · el profesional marca el destino",
         persona_de(sexo="hombre", complexion=1, objetivo="ganar_peso", complexion_objetivo=3, objetivo_txt="Ganar peso y músculo")),
        ("Bajar, un paso", "Hombre · complexión 4 · quiere bajar grasa",
         persona_de(sexo="hombre", complexion=4, objetivo="perder_grasa", objetivo_txt="Bajar grasa sin perder músculo")),
        ("Bajar, dos pasos", "Mujer · complexión 5 · quiere bajar grasa · el profesional marca el destino",
         persona_de(sexo="mujer", complexion=5, objetivo="perder_grasa", complexion_objetivo=3, objetivo_txt="Bajar grasa poco a poco")),
        ("Sin cambio de complexión", "Mujer · complexión 3 · quiere rendir más",
         persona_de(sexo="mujer", complexion=3, objetivo="rendimiento", objetivo_txt="Rendir más en tus carreras")),
    ]
    notas = {
        "Perimenopausia o menopausia": persona_de(sexo="mujer", etapa={"hormonal": "menopausia"})["notas"],
        "Embarazo y lactancia": persona_de(sexo="mujer", etapa={"embarazo": True, "lactancia": True})["notas"],
        "Terapia hormonal y más de 65 años": persona_de(sexo="mujer", edad=67, etapa={"terapia_hormonal": True})["notas"],
    }
    html = r.crear_entorno().get_template("plantilla/catalogo.html.j2").render(
        m=m, pm=pm, h=h, ph=ph, fecha=args.fecha, progresiones=progresiones, notas=notas,
        areas_m={a["id"]: a for a in m["areas"]}, areas_h={a["id"]: a for a in h["areas"]},
        cortes=r.CORTES_IMC, **r.recursos())
    args.salida.write_text(html, encoding="utf-8")
    print(f"OK · {args.salida} ({len(html)//1024} KB)")


if __name__ == "__main__":
    main()
