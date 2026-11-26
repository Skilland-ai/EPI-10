# Personalización: qué decide sola la maquetadora

Desde la versión 0.2 el informe se adapta a la persona. Todo sale del bloque `persona` del JSON. `render.py` lo lee, decide y avisa por la salida de errores de lo que ha decidido. Sin `persona`, el informe sale como en la 0.1, con la figura neutra.

**Una sola marca.** No hay una versión «de mujer» y otra «de hombre» con estilos distintos. Hay un informe que cambia lo que tiene que cambiar. Nada de rosa y azul.

## 1. Qué cambia con cada dato

| Dato (`persona.…`) | Sale de | Qué decide |
|---|---|---|
| `sexo` | Cuestionario, P3 «sexo al nacer» | La figura. El linaje paterno. Las notas de etapa. El filtro `solo` |
| `talla_cm`, `peso_kg` o `imc` | Cuestionario, P5 y P6 | El IMC y, con él, la complexión de la figura |
| `complexion` | El profesional (opcional) | Fija la complexión a mano y manda sobre el IMC |
| `objetivo`, `objetivo_txt` | **No está en el cuestionario** | La progresión y la casilla de objetivo |
| `complexion_objetivo` | El profesional (opcional) | Alarga la progresión a dos pasos |
| `actividad`, `actividad_txt` | Cuestionario, P19 a P22 | El medidor de actividad de la ficha |
| `edad` | Cuestionario, P2 | La casilla de edad y la nota de los 65 años |
| `etapa` | Formulario femenino, P45 a P48 | Las notas de etapa |

## 2. Mujer y hombre: qué cambia de verdad

| Qué | Mujer | Hombre |
|---|---|---|
| Figura | Hombros más estrechos, cintura marcada, cadera más ancha | Hombros más anchos, cintura recta |
| Linaje paterno | «No aplica». Si llega relleno, `render.py` lo vacía y avisa | Ficha y línea del tiempo |
| Línea del tiempo de linajes | Una fila (materno) | Dos filas |
| Notas de etapa | Embarazo, lactancia, perimenopausia, menopausia, terapia hormonal | No hay |
| Elementos con `solo` | Salen los de `"solo": "mujer"` | Salen los de `"solo": "hombre"` |
| Cortes de IMC | Los mismos | Los mismos |
| Lenguaje | Concordancia en femenino en los textos del JSON | En masculino |

**Lenguaje.** Los textos fijos de la plantilla están escritos sin género («tu profesional», «lo que nos has contado»). Los del JSON los escribe quien lo rellena y deben concordar: «trabajas sentada», «exfumadora», «metabolizadora». Revísalo en la lista del `SKILL.md`.

**Filtro `solo`.** Cualquier elemento de `cuerpo[]`, de `capa2.rasgos[].items[]` o de `capa2.sensible.predisposiciones[].items[]` puede llevar `"solo": "mujer"` o `"solo": "hombre"`. Si no coincide con el sexo de la persona, no sale y `render.py` avisa. Sirve para próstata, mama, ovario, edad de la menopausia y similares.

**Rangos por sexo.** Hoy la skill no aplica ningún rango numérico distinto por sexo. Si EPI10 quiere valores de referencia distintos (hierro, por ejemplo), hay que definirlos con Aitor: ver `../notas_personalizacion.md`.

## 3. Figuras de anatomía

- Función: `figura_svg(sexo, complexion, variante)` en `render.py`. Diez figuras (dos sexos por cinco complexiones) y una neutra.
- Se dibujan con medidas (hombros, pecho, cintura, cadera, brazo y gemelo), no a mano. Trazo redondeado de 1,7, como los iconos. Las medidas están en `FIG_BASE`, `FIG_SUBE` y `FIG_BAJA`.
- Variantes de color: `mapa` (fondo del mapa del cuerpo), `normal`, `activa` («Hoy»), `meta` («Tu dirección») y `suave` (paso intermedio). Siempre azules. Nunca semáforo: un cuerpo no se pinta en rojo ni en verde.
- **En el informe las figuras no llevan nombre ni número.** «Complexión 1 a 5» y «de ectomorfo a endomorfo» son vocabulario interno. El cliente solo lee «Hoy» y «Tu dirección».
- Sueltas: `python3 scripts/exportar_figuras.py carpeta/` las escribe en SVG y PNG.

### Complexión según el IMC (propuesta pendiente de validar)

| Complexión | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| IMC | menos de 18,5 | 18,5–21,9 | 22–24,9 | 25–29,9 | 30 o más |

Los cortes están en `CORTES_IMC`. El IMC no distingue músculo de grasa: una persona muy entrenada puede salir en la 4. Para eso está `persona.complexion`, que fija el escalón a mano.

## 4. Progresión «de dónde partes → a dónde vas»

Aparece en la página 4, junto al mapa del cuerpo, si hay `objetivo` y se conoce la complexión.

| `objetivo` | Texto por defecto | Sentido |
|---|---|---|
| `perder_grasa` | Bajar grasa | Baja |
| `ganar_musculo` | Ganar músculo | Sube |
| `ganar_peso` | Ganar peso | Sube |
| `mantener` | Mantenerte como estás | No cambia |
| `rendimiento` | Rendir más | No cambia |
| `bienestar` | Sentirte mejor | No cambia |

Reglas:
1. **Bajar** solo se dibuja desde las complexiones 4 y 5. **Subir**, solo desde la 1 y la 2.
2. Por defecto, **un paso**. Con `complexion_objetivo`, hasta **dos**.
3. El destino nunca pasa de la complexión media: bajando no baja de la 3 y subiendo no sube de la 3.
4. En el resto de casos sale **una sola figura** y el texto «tu objetivo no pasa por cambiar de complexión».
5. El texto fijo dice que es una dirección, no una talla ni un plazo. No se promete nada.

`objetivo_txt` es la frase del profesional («Bajar grasa sin perder músculo»). Es lo que lee el cliente.

## 5. Ficha «Tú, hoy»

Página 3, sobre «Lo que nos has contado». Casillas: figura, edad (y etapa, si es mujer y consta), talla y peso con el IMC, actividad y objetivo. Cada casilla sale solo si hay dato.

- **IMC**: número con una coma decimal y la palabra «orientativo». Sin categorías («sobrepeso», «normal») y sin colores.
- **Actividad**: `sedentaria` · `suave` · `moderada` · `alta`. Propuesta de conversión desde el cuestionario: P19 «No» → sedentaria; si hace ejercicio, manda P22 (intensidad suave, moderada o alta). Con un día o menos a la semana (P20), baja un nivel.

## 6. Notas de tu etapa

Página 6, sobre el aviso de medicación. Solo si hay alguna.

| Condición | Nota | Origen |
|---|---|---|
| Mujer y `etapa.embarazo` | Solo como orientación; consulta antes de tomar nada | Anexo del cuestionario (P45) |
| Mujer y `etapa.lactancia` | Igual | Anexo del cuestionario (P46) |
| Mujer y `etapa.hormonal` = `perimenopausia` o `menopausia` | Prudencia por posible interacción hormonal | Anexo del cuestionario (P47) |
| Mujer y `etapa.terapia_hormonal` | Prudencia por posible interacción | Anexo del cuestionario (P48) |
| `edad` ≥ 65 | Revisa los complementos con tu médico | **Propuesta de Skilland** |

Los textos son fijos y están en `preparar_persona()`. No recomiendan ni desaconsejan ningún complemento: derivan al profesional sanitario. Con menos de 18 años, `render.py` avisa: el informe no está pensado para menores.

## 7. Lo que no cambia

Las dos capas, las tres prioridades, el semáforo solo para lo que se puede cambiar, la escala azul para la genética, las declaraciones literales, el control de lo sensible y todos los límites de `voz-y-limites.md`.
