# Esquema de datos del informe

Un informe es un JSON. Hay dos ejemplos completos: `ejemplo/datos_ejemplo.json` (hombre) y `ejemplo/datos_ejemplo_mujer.json` (mujer). Si se usan campos obligatorios sin valor, el renderizador falla (`StrictUndefined`): es a propósito. Con `null` o `""` vale.

Vocabularios:
- `estado` (área, hábito, perfil): `verde` · `ambar` · `rojo` · `info`.
- `estado` (complemento): `mantener` · `revisar` · `ajustar` · `dejar` · `anadir` · `nuevo`.
- `area` / `id`: `nutricion` · `movimiento` · `descanso` · `estres` · `complementacion`.
- `tendencia` / `nivel`: `bajo` · `ligeramente bajo` · `medio` · `ligeramente alto` · `alto`, o texto libre para variantes.
- `icono`: cualquier `id` de `components/iconos.svg` sin el prefijo `i-`.
- `momentos`: `comida` · `entreno` · `manana` · `noche` · `agua`.
- `sexo`: `mujer` · `hombre` (sexo al nacer, pregunta 3 del cuestionario).
- `objetivo`: `perder_grasa` · `ganar_musculo` · `ganar_peso` · `mantener` · `rendimiento` · `bienestar`.
- `actividad`: `sedentaria` · `suave` · `moderada` · `alta`.
- `etapa.hormonal`: `ciclo` · `perimenopausia` · `menopausia` · `null`.
- `solo`: `mujer` · `hombre`. Opcional. El elemento solo sale para ese sexo.

| Campo | Tipo | Notas |
|---|---|---|
| `meta.producto`, `meta.titulo` | texto | «NutriWell», «Tu plan» |
| `meta.cliente.nombre`, `.codigo` | texto | En pruebas, ficticios |
| `meta.fecha`, `meta.revisado_por` | texto | |
| `meta.ejemplo`, `meta.nota_ejemplo` | bool, texto | Si es `true`, la portada lleva la nota |
| `persona` | objeto | **Opcional, nuevo en 0.2.** Sin él, figura neutra y sin ficha, progresión ni notas. Reglas en `personalizacion.md` |
| `persona.sexo` | texto | Decide figura, linaje paterno, notas de etapa y filtro `solo` |
| `persona.edad` | número | Años |
| `persona.talla_cm`, `.peso_kg` | número | Con ellos se calcula el IMC |
| `persona.imc` | número o `null` | Solo si no hay talla y peso |
| `persona.complexion` | 1–5 o `null` | Lo fija el profesional. Si es `null`, sale del IMC |
| `persona.objetivo`, `.objetivo_txt` | texto | El código decide la progresión; el texto es la frase que lee el cliente |
| `persona.complexion_objetivo` | 1–5 o `null` | Opcional. Alarga la progresión a dos pasos |
| `persona.actividad`, `.actividad_txt` | texto | Nivel y detalle corto (hasta 6 palabras) |
| `persona.etapa` | objeto o `null` | Solo mujer: `embarazo`, `lactancia`, `terapia_hormonal` (bool) y `hormonal` |
| `resumen.frase` | texto | Titular de la página 2. Hasta 30 palabras |
| `resumen.lo_que_haces_bien[]` | texto | 3 o 4 frases cortas |
| `areas[]` | objeto | `id`, `nombre`, `estado`, `habitos` (1–5), `genetica` (1–3), `frase`, `genetica_txt`, `habitos_txt` |
| `prioridades[]` | objeto | Exactamente 3: `n`, `area`, `titulo` (≤ 5 palabras), `frase` (≤ 30 palabras) |
| `perfil_habitos[]` | objeto | 6–8: `icono`, `etiqueta`, `valor`, `estado` |
| `analitica` | objeto | `aportada` (bool), `resumen` |
| `cuerpo[]` | objeto | 4–8: `zona` (ver `zonas()` en `render.py`), `titulo`, `texto`, `nivel` y, opcional, `solo`. Con progresión, mejor 7 como mucho |
| `habitos[]` | objeto | 3–5 más uno verde: `area`, `estado`, `titulo`, `vemos.genetica`, `vemos.habitos`, `accion`, `por_que`, `indicador`, `frecuencia` |
| `complementacion_actual[]` | objeto | `nombre`, `estado`, `motivo`, `ajuste` |
| `medicacion` | texto o `null` | |
| `complementos[]` | objeto | `nombre`, `dosis`, `unidad`, `estado`, `por_que.genetica`, `por_que.habitos`, `como`, `momentos[]`, `evidencia` (1–3), `declaracion`, `referencias[]`, `epi10` |
| `complementos[].epi10` | `null` u objeto | `{ "nombre": "…", "nota": "…" }`. Muestra «Disponible en EPI10». Solo si lo decide el profesional |
| `dia[]` | objeto | 3–4 momentos: `momento`, `icono`, `items[]` (`tipo`: `habito` o `complemento`, `texto`) |
| `siguientes_pasos[]` | objeto | 5: `icono`, `titulo`, `texto`, `cuando`. El segundo aparece como «siguiente paso» en la página 2 |
| `cta` | objeto | `titulo`, `texto`, `boton`, `url` (opcional), `nota` |
| `capa2.ancestralidad` | objeto | `regiones[]` (`nombre`, `pct`, `detalle`), `continente`, `linaje_materno` y `linaje_paterno` (`haplogrupo`, `sub`, `texto`, `ruta[]` con `hg` y `hace`; el paterno es `null` en mujeres, y si no lo es `render.py` lo vacía), `neandertal_pct`, `neandertal_txt` |
| `capa2.rasgos[]` | objeto | `categoria`, `icono`, `items[]` (`rasgo`, `tendencia` y, opcional, `solo`), `significa` |
| `capa2.sensible.consentimiento` | bool | Si es `false`, no se genera la página sensible |
| `capa2.sensible.farmacogenetica[]` | objeto | `familia`, `resultado`, `relevancia` |
| `capa2.sensible.predisposiciones[]` | objeto | `categoria`, `items[]` (`nombre`, `nivel` y, opcional, `solo`) |
| `capa2.sensible.predisposiciones_txt` | texto | Aviso de la página sensible |
| `capa2.sensible.hereditarias[]` | objeto | `condicion`, `resultado`, `significa` |
| `referencias[]` | objeto | `texto`, `url` |
| `contacto` | objeto | `telefono`, `email`, `web`, `direccion` |

## Lo que pasa a «Mi plan» en el portal

`persona` (objetivo y actividad), `prioridades`, `habitos` (con `indicador` y `frecuencia`), `complementacion_actual`, `complementos` y `siguientes_pasos`. El portal guarda el estado de cada hábito y lo actualiza en la revisión mensual. El informe es la foto de partida.
