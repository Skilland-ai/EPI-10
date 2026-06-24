


## PROPUESTA TÉCNICA Y ECONÓMICA



SkillRadar

Herramienta de analítica del mercado laboral



## €14.400

Precio del proyecto
8 sem.

Plazo de entrega
6 meses

Garantía incluida



Dirigida a:

## D. Miguel Ángel Acosta Rodríguez

Secretario del Consejo Social
Universidad de Las Palmas de Gran Canaria




















Elaborado por  Fer Martin
Santana -- https://www.linkedin.com/in/fermartin/
13 de mayo de 2026




SkillRadar  ·  Propuesta Técnica y Económica  Consejo Social · ULPGC

- El problema

El Consejo Social de la ULPGC tiene un mandato claro: garantizar que la universidad responda a las
necesidades reales de la sociedad canaria — desde el tejido empresarial hasta las instituciones públicas
— y para ello tiene poder real: aprueba presupuestos, avala nuevas titulaciones y decide sobre la oferta
de formación permanente.
El problema es que estas decisiones se toman sin datos sistemáticos sobre lo que el mercado laboral
realmente demanda.
El catálogo actual de microcredenciales de la ULPGC — nueve programas apilables, todos dentro del
ámbito de la información y documentación — refleja cómo se construyen estos catálogos sin datos
sistemáticos: a partir de lo que ya existe, no de lo que el mercado demanda.
La ULPGC reconoce esta brecha y tiene intención de ampliar la oferta hacia ciberseguridad, inteligencia
artificial o competencias digitales.
SkillRadar es el instrumento que convierte esa intención en decisiones basadas en evidencia.
Esta situación no es un fallo de voluntad — es un fallo de visibilidad. Sin un instrumento que muestre de
forma continua qué competencias demanda el mercado, las decisiones formativas se construyen sobre
percepciones, inercias institucionales e iniciativas puntuales. El resultado es predecible: una oferta
que responde bien a lo que la universidad ya sabe hacer, pero no necesariamente a lo que Canarias
necesita.
W. Edwards Deming, cuyo trabajo transformó la gestión industrial del siglo XX, lo formuló de forma
inapelable: "In God we trust. All others must bring data". SkillRadar es el instrumento que convierte la
demanda del mercado laboral en evidencia continua, estructurada y accionable — para que las
decisiones del Consejo Social se apoyen evidencias, y no en meras suposiciones.


Documento confidencial · Uso exclusivo del Consejo Social de la ULPGC # 2


SkillRadar  ·  Propuesta Técnica y Económica  Consejo Social · ULPGC
- La solución

SkillRadar es un dashboard de analítica del mercado laboral diseñado específicamente para el Consejo
Social de la ULPGC. Muestra, de forma continua y actualizada cada semana, qué competencias
demandan las empresas — agrupadas por área temática, con evolución temporal y con granularidad
geográfica hasta nivel insular en Canarias.
Vista 1 — Ranking de competencias
Competencias del mercado laboral ordenadas por demanda y agrupadas en áreas temáticas basadas
en la taxonomía ESCO de la Comisión Europea
## 1
. Cada área se puede expandir para ver las
competencias concretas con su porcentaje de aparición en ofertas y tendencia.
El ranking incluye una visualización de red interactiva — el mapa del ecosistema de competencias de
Canarias — donde cada competencia aparece como un nodo, su tamaño refleja la demanda, y las
conexiones muestran qué habilidades aparecen juntas en las mismas ofertas de trabajo.
Vista 2 — Distribución geográfica
Análisis de la demanda por territorio con granularidad autonómica en España y por isla en Canarias.
Permite entender si una competencia se demanda localmente o es un fenómeno nacional, y si la
oportunidad formativa es más relevante para Gran Canaria, Tenerife o el archipiélago en su conjunto.
Vista 3 — Tendencias temporales
Evolución semanal de cualquier competencia o área en el tiempo. La vista se abre con las diez áreas de
mayor crecimiento ya cargadas, para que el valor sea inmediato. Permite comparar hasta cinco series
simultáneamente y responder preguntas como:
● ¿Es este el momento adecuado para proponer una microcredencial en ciberseguridad?
● ¿Está creciendo la demanda de inteligencia artificial en Canarias?

Los tres filtros globales — territorio, periodo y sector — afectan a todas las vistas simultáneamente.
Hacer clic en cualquier elemento actualiza todo el dashboard al instante. Los enlaces se pueden
compartir ya que cualquier vista filtrada tiene su propia URL.


## 1

https://esco.ec.europa.eu/es
Documento confidencial · Uso exclusivo del Consejo Social de la ULPGC # 3


SkillRadar  ·  Propuesta Técnica y Económica  Consejo Social · ULPGC
- Fuentes de datos y tecnología

Fuentes de datos
SkillRadar integra cuatro
## 2
fuentes públicas y gratuitas, actualizadas cada semana de forma automática:

## Fuente

## Cobertura

## SEPE
España por provincia
Datos históricos desde 2006.
Fuente primaria para el mercado laboral español.
## EURES
## Unión Europea
Portal europeo de empleo.
Más de 28.000 ofertas españolas activas.
ESCO v1.2.1
## Comisión Europea
Taxonomía oficial de competencias:
- 13.939 competencias en 28 idiomas.
- Base del sistema de normalización.
## INE
## España
Códigos geográficos oficiales, incluido nivel insular
para Canarias.

## Tecnología
La solución se construye íntegramente con tecnología open source, sin costes de licencias, y se
despliega en la infraestructura de la ULPGC mediante un único comando de arranque:

## Capa

## Tecnología

Base de datos
PostgreSQL 17 + TimescaleDB + pgvector
Backend y procesamiento
Python 3.12 + FastAPI + NLP multilingüe
Extracción de competencias
Coincidencia semántica con ESCO + embeddings
Frontend y visualizaciones
React 18 + Apache ECharts + Leaflet.js
## Infraestructura
## Docker Compose + Nginx

Sin dependencias externas de pago. Sin suscripciones. Sin costes recurrentes de software.


## 2
Fuentes adicionales en evaluación para fases posteriores: Adzuna (pendiente verificación de condiciones de uso) e Infojobs (mayor
bolsa privada española, ~200.000 ofertas activas). La viabilidad de Infojobs depende de confirmación jurídica por parte de la ULPGC
sobre el encuadre del proyecto como investigación científica. Se abordará en el kick-off.
Documento confidencial · Uso exclusivo del Consejo Social de la ULPGC # 4


SkillRadar  ·  Propuesta Técnica y Económica  Consejo Social · ULPGC
## 4. Diseño Visual

SkillRadar adopta la identidad visual del Consejo Social: colores corporativos de la ULPGC, tipografía
oficial, modo claro. El resultado es una herramienta que parece construida por y para la institución —
no un producto genérico adaptado.
Las pantallas siguientes muestran el aspecto de la herramienta con datos del mercado laboral:

Pantalla 1 — Ranking de competencias + Red de skills



Documento confidencial · Uso exclusivo del Consejo Social de la ULPGC # 5


SkillRadar  ·  Propuesta Técnica y Económica  Consejo Social · ULPGC

Pantalla 2 — Distribución geográfica · España + Canarias





Documento confidencial · Uso exclusivo del Consejo Social de la ULPGC # 6


SkillRadar  ·  Propuesta Técnica y Económica  Consejo Social · ULPGC

Pantalla 3 — Tendencias temporales




Documento confidencial · Uso exclusivo del Consejo Social de la ULPGC # 7


SkillRadar  ·  Propuesta Técnica y Económica  Consejo Social · ULPGC
- Sobre el Proveedor

Fernando Martín Santana es un líder técnico con más de 20 años de experiencia en desarrollo de
software, arquitectura cloud e inteligencia artificial.
Experiencia relevante
● CTO en ComplexChaos.ai, San Francisco (2023 - 2025)
CTO de empresa de IA respaldada por Village Global (Reid Hoffman, Bill Gates, Jeff Bezos, Mark
Zuckerberg). Plataforma de IA para negociaciones multipartitas con motor de procesamiento de
lenguaje natural a gran escala. Arquitectura full-stack con Python y despliegue en AWS.
● CTO Fractional en Mottum Analytica (2026 - presente)
Líder técnico de Noetia.io, plataforma de IA para análisis de licitaciones públicas en España. 6
asistentes de IA especializados mediante LangChain y Azure OpenAI, incluyendo análisis
documental automatizado y motor de evaluación con scoring.
● Fundador de Reboot Academy (2019 - 2025)
Empresa de educación tecnológica, +600 graduados con 93% de empleabilidad. Desarrollo de
edukami.ai, plataforma con IA adoptada por la Universidad de La Laguna, el Gobierno de Canarias
y el Instituto Tecnológico de Canarias entre otros. 12 ingenieros, orquestación multi-LLM.
Experiencia adicional destacada
● Product Manager en Telefónica I+D (2009 - 2010)
Responsable de Bluevia.com, la mayor iniciativa de innovación abierta del grupo Telefónica, APIs para
desarrolladores de 16 países y 260 millones de clientes móviles.
● CTO en PCCW Solutions, Hong Kong (2018 - 2019)
Equipo de +25 ingenieros, plataforma de comercio electrónico a gran escala, migración a microservicios en
## AWS.
● Investigador AI en NTT Emergent Technologies Lab, Japón (2005 - 2006)
Investigación en computación ubicua en colaboración con el MIT Media Labs, programa Vulcanus del Centro
UE-Japón.
● Consultor Senior en Fusion Systems, Japón/Singapur (2007 - 2008)
Sistemas de trading de alta frecuencia para Goldman Sachs, Citibank, Morgan Stanley, Bloomberg,  Shinsei
Bank. Consultoría de procesos y software delivery para Citibank.
## Formación Relevante
Ingeniero en Informática (ULPGC), Máster en Inteligencia de Negocio y Gestión del Conocimiento (UOC),
Machine Learning (Stanford University), Deep Learning (EOI), Data Science (GA).

Documento confidencial · Uso exclusivo del Consejo Social de la ULPGC # 8


SkillRadar  ·  Propuesta Técnica y Económica  Consejo Social · ULPGC
- Qué incluye este proyecto

## Incluye
## ✔
Validación de fuentes de datos (SEPE, EURES, ESCO, Adzuna)
## ✔
Pipeline de ingesta y normalización de competencias — semanal y automatizado
## ✔
Dashboard completo: ranking, distribución geográfica, tendencias y red de skills
## ✔
Filtros globales coordinados y enlaces directos a vistas específicas
## ✔
Diseño con identidad visual ULPGC / Consejo Social
## ✔
Despliegue en la infraestructura de la ULPGC
## ✔
Documentación operativa para el equipo de IT
## ✔
Sesión de validación con el equipo del Consejo Social
## ✔
Seis meses de garantía

No incluye en esta fase
## ✕
Análisis de brecha formativa ULPGC vs. mercado
(Sería en fase 2 — requiere catálogo estructurado de competencias de la ULPGC

## ✕
Exportación de informes en PDF o Excel
## ✕
Aplicación móvil
## ✕
Gestión de múltiples usuarios con acceso individual


Documento confidencial · Uso exclusivo del Consejo Social de la ULPGC # 9


SkillRadar  ·  Propuesta Técnica y Económica  Consejo Social · ULPGC
- Plan de trabajo

El proyecto se entrega en ocho semanas desde la firma del contrato.

## Hito

## Semanas

## Descripción

Entregable y criterio de aceptación

## M0

## 1
## Kick-off

Reunión de arranque · acceso a infraestructura
confirmado · blockers resueltos
## M1

## 2–3
Pipeline operativo

Ingesta desde todas las fuentes · normalización
ESCO · datos reales en base de datos
## M2

## 3–4
API completa

Todos los endpoints REST documentados y
verificados con datos reales
## M3

## 4–6
Dashboard funcional

Las tres vistas operativas con datos reales · filtros
coordinados
## M4

## 6
Feature complete

QA interno · sin bugs bloqueantes
## M5

## 7
Validación con el Consejo Social

Sesión guiada con usuarios reales y sign-off del
## Consejo Social
## M6

## 7–8
Despliegue en ULPGC
## 3

Herramienta accesible desde la red ULPGC · IT
puede operar el sistema de manera autónoma
## M7

## 8
Entrega formal

Documentación entregada · equipo IT formado



## 3
Los hitos M5 y M6 requieren disponibilidad del equipo de IT de la ULPGC durante la semana 7–8. Se recomienda confirmar la
fecha en el kick-off para evitar posibles retrasos en el despliegue
Documento confidencial · Uso exclusivo del Consejo Social de la ULPGC # 10


SkillRadar  ·  Propuesta Técnica y Económica  Consejo Social · ULPGC
- Precio y condiciones

## Concepto

## Detalle

## Importe

Desarrollo de SkillRadar

270 horas × €53,33/hora
## €14.400

## IGIC (7%)

## Impuesto General Indirecto Canario
## €1.008

## TOTAL
IVA / IGIC incluido
## €15.408

8.1 Forma de pago
– 40 % a la firma del contrato  — €5.760
– 30 % al completar el dashboard (hito M4, semana 6)  — €4.320
– 30 % a la entrega formal (hito M7)  — €4.320

8.2 Garantía — incluida sin coste adicional
Seis meses desde la entrega formal. Cubre cualquier comportamiento que contradiga las
especificaciones: datos incorrectos, filtros que no funcionan, fallos de ingesta, errores de interfaz. No
incluye nuevas funcionalidades ni cambios de alcance.

8.3 Mantenimiento post-garantía — opcional
## Concepto

## Detalle

## Importe

Mantenimiento mensual

Corrección de errores ·
actualizaciones · soporte prioritario
## €300/mes

Contrato 24 meses
Precio cerrado · sin sorpresas
## €7.200

El contrato de mantenimiento se formaliza por separado, una vez entregado el proyecto. No incluye
nuevas funcionalidades — estas se presupuestan y acuerdan de forma independiente a €80/hora.
Documento confidencial · Uso exclusivo del Consejo Social de la ULPGC # 11
