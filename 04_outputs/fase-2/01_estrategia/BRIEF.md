# Encargo · Estrategia y propuesta de valor de la app de EPI10 (CON-577)

Eres el estratega de producto de Skilland para EPI10 Salud. Tu tarea es el **primer eslabón de la fase 2**. Lo que entregues lo usarán después:
- la investigación de apps de salud y hábitos (CON-580),
- el portal de clientes v0.2 (CON-578),
- el rediseño del informe (CON-582),
- el workshop con el cliente en la primera semana hábil tras el puente de diciembre (desde el 9 dic).

## Contexto en dos párrafos

EPI10 Salud (Canarias) vende informes epigenéticos. El cliente compra un test, se toma la muestra, el laboratorio procesa el análisis, y Aitor (el experto de EPI10) redacta un informe largo con recomendaciones. Skilland ha construido la fase 1: compra con Stripe, orquestador, Odoo para el equipo y un generador de borradores de informe con IA. Además, ya existe una maqueta de un **portal de clientes propio sobre OpenEMR** (la fase 2 actual), pensada solo para «pides el informe, lo recibes».

En la demo del 12 nov, EPI10 (Carmen, directora; Tomás, socio con visión de negocio; Aitor, experto) pidió **un enfoque más abierto**. Según Tomás, el informe no es el producto: los informes no los quiere nadie. El informe sirve para **cualificar al cliente** y abrirle la puerta a lo que de verdad vende EPI10: **hábitos, suplementación, productos y fórmulas propias, y su implementación**. La narrativa: «da un paso más, entiéndete a ti mismo; cuando te entendamos, te recomendamos el mejor tipo de vida para ti». Carmen y Aitor siguen centrados en el informe: tu propuesta tiene que **alinearlos** con argumentos, no imponerse.

## Lo que salió de la demo (la materia prima)

Lee primero **`/home/reboot/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10-project/EPI10_POSTDEMO_CONTEXTO.md`**, sobre todo la sección «Fase 2». Resumen:
- **Tres tipos de cliente**, sin decidir todavía:
  - **A**: no tiene informe y lo contrata con EPI10. Dentro del portal se le ofrece suplementación y servicios complementarios.
  - **B**: crea una cuenta sin informe, quizá gratis o barata, y recibe recomendaciones.
  - **C**: ya tiene un informe epigenético de otra empresa y entra para recibir recomendaciones y seguir hábitos.
- **Chatbot con IA en la web.** Pregunta cómo eres y qué hábitos tienes, da una recomendación gratis y empuja al portal.
- **Portal como lugar de hábitos.** Ayuda a conocerte, propone hábitos, dietas y suplementación, y los sigue. Ideas sueltas: semáforos de hábitos, paneles visuales, imágenes del cuerpo humano. Desde el portal se recomiendan productos y soluciones de EPI10.
- **Informe rediseñado.** Hoy es un muro de texto. Debe convertirse en piezas visuales: semáforos, ruedas, gráficos.
- **Datos para investigación.** Tomás quiere un banco de datos epigenéticos, con universidades, para entrenar un modelo de recomendación que relacione datos epigenéticos con soluciones de suplementación. Los datos de clientes reales del portal tienen valor para eso.
- **Eurofins.** Evolución prevista: que el test se haga en laboratorios Eurofins de Canarias.
- El cliente es **difuso**: trabaja mejor si el proveedor le entiende, hace ingeniería inversa y le aterriza una primera versión sobre la que pulir.

## Fuentes que puedes leer

Todas están dentro de `/home/reboot/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10-project/`:
- `EPI-10/02_context/00_intake_context_pack.md` y `01_estado_actual.md`: contexto de negocio original.
- `EPI-10/02_context/EPI10-branding/`: canon de marca, auditoría, brochure del informe y maqueta web actual.
- `EPI-10/04_outputs/entrega-epi10-2026-10-27/`: opciones del portal (`04_opciones-portal`) y propuesta actual del portal propio (`05_propuesta-portal-propio`).
- `DOCUMENTOS-AITOR-GENERADOR-BORRADORES-INFORMES/`: informes anonimizados, cuestionarios y resultados de TellmeGen, para ver qué datos tenemos de cada cliente.
- La web pública de EPI10 (epi10.es) y la de Publiservic (publiservic.com), que distribuye productos naturales y es la empresa de Tomás: para entender el catálogo.

## Método

Aplica un proceso de producto de startup con criterio. Puedes cargar las skills `skilland-board-estrategia` y `skilland-board-producto` como marcos.
- **Trabajo por hacer de cada tipo de cliente**: qué quiere conseguir de verdad.
- **Segmentos y prioridad**: con cuál empezar y por qué.
- **Propuesta de valor por segmento.**
- **Posicionamiento** frente a alternativas: otras empresas de test epigenéticos (TellmeGen y similares), apps de hábitos y salud, y la consulta tradicional.
- **Modelo de negocio**: cómo el informe y la app llevan a la venta recurrente de suplementación y servicios.
- **Estrategia de producto** para la v1 de la app y lo que se deja fuera.
- **Riesgos y supuestos que validar** en el workshop.

Investiga en la web lo que necesites (mercado, competidores, benchmarks), citando las fuentes. **Trabaja con criterio**: pocos entregables, bien pensados. No hace falta un tratado.

## Entregables

En esta misma carpeta, `04_outputs/fase-2/01_estrategia/`:
1. **`estrategia_app_epi10_v1.md`**. Respuesta primero, en pirámide. Máximo unas 8 a 12 páginas. Debe incluir:
   - una tesis de una frase;
   - los tres tipos de cliente resueltos con una recomendación;
   - la propuesta de valor;
   - el viaje del cliente de punta a punta (web y chatbot → informe o cuenta → portal de hábitos → suplementación recurrente);
   - qué entra en la v1;
   - cómo encaja el banco de datos para investigación;
   - las preguntas que hay que cerrar en el workshop.
2. **`para_los_siguientes_agentes.md`** (1 o 2 páginas): lo que deben saber los agentes de investigación, portal e informe. Qué buscar, qué pantallas importan y qué conceptos visuales y de producto proponer.

Escribe en español claro, para gente de negocio. Frases cortas.

## Reglas
- Trabaja de forma autónoma. Toma tú las decisiones y anota los supuestos.
- No escribas al cliente, no publiques nada y no toques Linear.
- No hagas `git commit` ni `git push`: lo hace el orquestador.
- Nunca uses `herdr notification`.
- Al terminar, responde solo con las rutas de los entregables y un resumen de 5 líneas.
