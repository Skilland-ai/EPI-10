# Artefacto para Carmen · «Gestión de la crisis de Healthie» · brief de Raúl (12 oct, noche)

Transcripción ordenada del feedback de Raúl sobre el primer borrador (https://claude.ai/artifact/QVts4RLfMf6kZ68BXsVXgR). El entregable es un artefacto de Claude (HTML) que se compartirá con Carmen el 13 oct como documentación de cómo hemos gestionado la crisis de Healthie.

## Maquetación y estilo
- **Estilo Skilland**, no genérico. Fuentes: `~/Escritorio/Skilland.ai/Skilland_Identidad_Corporativa/` (branding master doc, guidelines, one-pagers) y `~/Escritorio/Skilland.ai/Skilland.ai-BRANDING-MASTER/skilland.ai-branding/`.
- **Referencia de artefacto bien hecho**: «Noche del cambio ULL» (otro cliente) en `~/Descargas/Noche del cambio ULL (Copy).{html,md,pdf}`: maquetación, organización, componentes visuales, branding. Imitar ese nivel.
- Transversal: **fuera las horas de trabajo y cualquier información técnica interna** nuestra (commits, repos, issues, nombres de ficheros, herramientas internas).

## Estructura de contenido
**Intro · «Gestión de la crisis de Healthie»:** un proveedor nos ha cambiado las reglas del juego a mitad del proyecto y nos ha causado inseguridad; esto es todo lo que hemos hecho para adaptarnos y seguir adelante.

**1. Qué pasó con Healthie**
- 1.1 Qué pasó: Healthie cambió su pricing y las reglas del juego. En verano (plan de prueba) y con el plan Grow contratado, la API de desarrollo estaba incluida y la llegamos a probar. En septiembre la sacaron del plan y la metieron como add-on (475 $/mes el primer año, 950 $ el segundo, 1.900 $ después) o dentro del plan Enterprise, tan caro que ni lo detallaron. Cifras visuales, poco texto. (No escribir que asumimos que EPI10 no lo pagaría.)
- 1.2 Para qué queríamos Healthie: versión resumida de la arquitectura anterior con una **infografía propia** (JPG/PNG/SVG generada por nosotros e incrustada): orquestador en el centro (dentro, el generador de informes y toda la capa de software propia de EPI10); a la izquierda Healthie como portal de cliente (toda la experiencia del cliente: comunicaciones, cuestionarios, hábitos, informe); a la derecha Odoo; un poco aparte, TellmeGen (laboratorio). Qué perdemos: el bloque entero del portal de cliente.
- **Reflexión, en grande:** depender de servicios de terceros para funcionalidades críticas es un riesgo inherente: el proveedor puede cambiar las condiciones a mitad de la vida útil del software. Era un sacrificio asumido porque EPI10 no podía permitirse una aplicación a medida, pero es un gran riesgo.

**2. Qué hemos hecho para absorber el impacto**
- 2.1 Evaluamos alternativas de terceros (research de 36 plataformas, en el repo y en Linear): primero una tabla resumen (aplicación, enlace, motivo del descarte), luego una subsección por candidata relevante, visual, con el porqué del descarte. Conclusión: no hay en el mercado nada que por funcionalidades y coste se parezca a lo que Healthie ofrecía antes.
- 2.2 Construimos algo interno, propiedad de EPI10. Dos vías: desde cero u sobre una capa open source. Elegimos open source por presupuesto y porque EPI10 (y las empresas del grupo) ya usan software open source (Odoo como ERP). Decidimos un **experimento mínimo viable** que pueda mutar a MVP con todas las funcionalidades planteadas. Elegimos **OpenEMR**, el referente open source de historia clínica: casi 20 años, actualizaciones, soporte y comunidad, «muy parecido a Odoo». Y en estos días lo hemos construido: **vista a vista, con captura, de la versión actual** (solo la última), explicando cada una.

**3. Journey actual con el experimento EPI10 (v0.5)**
- Componente visual de journey, bonito, con captura de cada etapa: desde la página de NutriWell (hoy un placeholder; en el futuro la web de EPI10 donde se compren todos los productos) hasta el informe entregado. La demo en vivo no va en el artefacto (serán pestañas aparte).

**4. Comparativa de interfaz: EPI10 vs Healthie**
- Sección para «fardar»: capturas de cada vista nuestra frente a la equivalente de Healthie. Para capturar Healthie hace falta login: el agente pide a Raúl que abra sesión en una pestaña de Chrome (o le pase credenciales de prueba) y captura.

**5. Comparativa de arquitectura: ahora (EPI10 es dueña de todo) vs Healthie**
- Dónde se aloja (proponemos su servidor), regulación y protección de datos (Healthie tenía certificaciones; qué cubrimos nosotros y cómo), mantenimiento (ya no hay cuota mensual: proponemos un contrato de mantenimiento con Skilland).
- Oportunidades: sin riesgo de que el proveedor retire el servicio; mantenimiento con nosotros; evolución funcional libre porque EPI10 es dueña del código, documentado, para experimentar, probar y crear productos y experiencias nuevas; móvil hoy vía navegador (como el LMS de Skilland), app Android/iOS explorable en una fase posterior; posibilidad de un paquete «web + nueva interfaz» trasladando los diseños del nuevo diseñador de EPI10 a la web y a la aplicación como un ecosistema único («aunque creemos que la hemos clavado»).
- Cierre: esta versión mapea todos los pasos de la experiencia de cliente planteada al principio; es la solución para mantener el proyecto sin cambiarlo; y, como muestra de buena fe, todo este desarrollo se ha absorbido en el presupuesto actual.

## Lo que NO va
- Horas, costes internos, commits, repos, issues, herramientas, nombres de agentes.
- La demo en vivo (va en pestañas aparte).

## Segunda ronda de feedback de Raúl (13 oct, 00:40) · v4
1. **Todo plegado por defecto.** Un índice (toggle) por sección, plegado; y dentro, cada subsección también plegable. Los títulos de sección y subsección van **en grande** (no como eyebrow): «1.1 · Qué pasó con Healthie», etc. Al desplegar, el mismo contenido.
2. **2.1 Alternativas:** demasiado. La tabla resumen, colapsada; cada candidata, colapsada. Lo mismo con las tarjetas de cifras y cualquier bloque largo: nada de «ochocientas opciones» a la vista.
3. **Capturas de Healthie reales.** Varias son las de Raúl, el resto son material público o inventadas: hay que hacer capturas de verdad en la cuenta de Healthie (vista de profesional y de clienta). Raúl autoriza en el panel del agente.
4. **Regulación y protección de datos (sección 5):** explicarlo mejor y con menos texto. Dejar claro: qué obligaciones hay (RGPD, datos de salud = categoría especial, responsable y encargado, DPA), qué cubre OpenEMR de serie (cifrado, auditoría, roles), qué hay que hacer para montarlo en el servidor de EPI10 (alojamiento en la UE, copias, acceso, registro de actividades, evaluación de impacto si procede) y **si hace falta alguna certificación o no** (respuesta clara: para operar no se exige certificación; Healthie aportaba certificaciones del proveedor que aquí sustituyen el control propio y buenas prácticas documentadas).
5. **Cierre nuevo:** todo esto ha sido un experimento para comprobar que era posible, absorbido de buena fe en nuestros costes por decisión discrecional nuestra. Se puede dejar aquí. Si EPI10 quiere seguir por esta vía, hay que sentarse (Carmen y Tomás) y encontrar un encaje justo para las dos partes, porque el trabajo realizado ha sido grande.
6. **Bloque «antes vs después» de Healthie** arriba, en 1.1 (lo que disparó todo): condiciones de antes (API incluida en el plan Group, probada en verano) frente a después (API como add-on de 475 → 950 → 1.900 $/mes o plan Enterprise sin precio público). Visual.
