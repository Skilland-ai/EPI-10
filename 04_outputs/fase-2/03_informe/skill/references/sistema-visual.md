# Sistema visual del informe de EPI10

Principio: **cada dato en su mejor forma**. No todo es un semáforo. Se usa el semáforo solo donde hay algo que el cliente puede cambiar.

## 1. Los tres lenguajes de color

| Lenguaje | Para qué | Colores | Nunca |
|---|---|---|---|
| **Semáforo** | Estado de lo que el cliente puede cambiar: áreas, hábitos y complementos | Verde `#2e9e6a` vas bien · ámbar `#e8a317` mejorable · rojo `#d6453d` prioridad · cian `#029acc` añadir | Para riesgos genéticos ni para decorar |
| **Escala neutra azul** | Tendencias, rasgos y predisposiciones genéticas. Describen; no juzgan | 5 pasos, de `#e3edf6` a `#01447b` | En rojo, aunque diga «riesgo alto» |
| **Origen del dato** | De dónde sale cada conclusión | Genética: cian suave · hábitos: marfil · analítica: lavanda | Sin su icono |

Marca: azul profundo `#01447b` para titulares y bandas, `#00294d`–`#001a33` para la portada, cian para navegación y llamadas a la acción, marfil `#fdf4ed` como papel. Los valores coinciden con el portal (`oe-module-epi10/epi10-tokens.css`).

## 2. Componentes

| # | Componente | Macro | Dato de entrada | Por qué esta forma |
|---|---|---|---|---|
| 1 | **Portada** | plantilla | `meta`, `prioridades` | Las tres prioridades ya en la portada: el cliente sabe de qué va antes de abrir |
| 2 | **Rueda del perfil** | `rueda`, `rueda_mini` | `areas[]` (estado) | Una vista de las cinco áreas. Sirve igual en el chatbot, el informe y el portal. El centro cuenta las áreas por color |
| 3 | **Tres prioridades** | `prioridades` | `prioridades[]` | Número grande y una frase. Es lo que se recuerda tras la sesión |
| 4 | **Punto de partida** | `perfil` | `perfil_habitos[]` | Lo que nos contó, con icono y punto de estado. Demuestra que le hemos leído |
| 5 | **Cómo leer los colores** | `como_leer` | — | Enseña los tres lenguajes de color una sola vez |
| 6 | **Mapa de prioridades** (genética × hábitos) | `matriz` | `areas[].genetica`, `areas[].habitos` | Explica *por qué* algo es prioridad: donde la genética da señal y los hábitos flojean. Cuatro cuadrantes: mantén, vigila y protege, mejora el hábito, prioridad |
| 7 | **Leyenda de áreas con puntuaciones** | `rueda_leyenda` | `areas[]` | Hábitos en 5 puntos y señal genética en 3 barras (eco de las barras del logo) |
| 8 | **Mapa del cuerpo** | `cuerpo` | `cuerpo[]` (zona, nivel) | Las tendencias físicas sobre una silueta de trazos redondeados. Escala neutra; es estático. El interactivo queda para después de la v1 |
| 9 | **Semáforo de hábitos** | `tarjeta_habito` | `habitos[]` | Luz de semáforo, lo que vemos (genes + hábitos), una acción y el indicador que se marcará en el portal |
| 10 | **Tu complementación hoy** | `complementacion_hoy` | `complementacion_actual[]` | Antes y después: «tomas 6 → mantén 3, revisa 3, añade 1». Es la pieza más diferencial: dice lo que sobra |
| 11 | **Tarjeta de complemento** | `tarjeta_complemento` | `complementos[]` | Dosis grande, porqué con su origen, momentos con icono, evidencia en 3 barras, declaración UE literal, referencias y hueco para «Disponible en EPI10» |
| 12 | **Tu día** | `tu_dia` | `dia[]` | Hábitos y complementos en cuatro momentos del día. Convierte la lista en rutina |
| 13 | **Lo que viene ahora** | `pasos` | `siguientes_pasos[]` | Línea de tiempo: leer, sesión, Mi plan, revisión mensual, revisión a seis meses |
| 14 | **Primera revisión mensual** | `revision` | `habitos[].indicador` | Vista previa del check-in del portal. Anticipa el hábito de volver |
| 15 | **Llamada a la acción** | `cta` | `cta` | Banda azul hacia el portal, con la regla «recomendamos lo que encaja, lo venda EPI10 o no» |
| 16 | **Qué es y qué no es** | `es_no_es` | — | Los avisos, juntos y visibles una vez, en vez de siete veces repartidos |
| 17 | **Rasgos en escala neutra** | `tabla_rasgos` | `capa2.rasgos[]` | Tarjetas por categoría. Las variantes («dos copias») van como etiqueta |
| 18 | **Ancestralidad y linajes** | `ancestralidad` | `capa2.ancestralidad` | Barra de porcentajes, fichas de haplogrupo, medidor de neandertal y línea del tiempo de los linajes |
| 19 | **Bloque sensible** | `aviso_sensible` + página | `capa2.sensible` | Banda oscura con candado, «la ves porque la pediste», y derivación al médico |

## 3. Reglas de composición

- **Una página, un trabajo.** Si una página se queda corta, se compacta. Si se desborda, se sube densidad antes de partir.
- Titular de página = la conclusión, no el tema. «Antes de añadir nada, ordenamos lo que ya tomas», no «Complementación actual».
- Papel marfil y tarjetas blancas con sombra suave. Bandas azules solo para lo que empuja a la acción (siguiente paso, CTA, aviso sensible, contacto).
- Números grandes para lo que se recuerda: prioridades, dosis, recuentos y porcentajes.
- Iconos del sprite `components/iconos.svg`, de trazo 1,7 y extremos redondeados. Si falta uno, se añade con la misma rejilla de 24.
- La capa 2 usa un papel más frío (`#f8f6f3` y `#f4f6f9` en lo sensible) para que se note el cambio de capa.

## 4. Modo pantalla

`--modo pantalla` reutiliza los mismos componentes sin geometría A4: flujo continuo, máximo 860 px y rejillas que se pliegan por debajo de 720 px. Es la base de «Mi informe» en el portal. Los gráficos son SVG y escalan sin pérdida.

## 5. Ampliar el sistema

1. Añade el dato al JSON y documéntalo en `esquema-datos.md`.
2. Si es un gráfico, genera el SVG en `render.py` a partir del dato. No lo dibujes a mano.
3. Crea la macro en `componentes.j2` y su CSS con prefijo propio. Ojo con las clases genéricas: `.habitos`, `.complemento` o `.cuerpo` ya chocaron una vez.
4. Comprueba los dos modos y exporta el PDF.
