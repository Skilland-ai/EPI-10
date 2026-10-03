# Estado actual — 17 de septiembre de 2026

## Foco de esta sesión

Raúl y Codex están preparando el mockup de cobro de Stripe para EPI10. El repo
pasa a funcionar como sandbox por módulos, con documentación continua.

- Spec activa: [011_now](../03_specs/now/011_now.md).
- Planificación vigente: [Linear](../04_outputs/planificacion/linear/README.md).
- Espacios de trabajo: [módulos](../04_outputs/modulos/README.md).
- Punto de entrada Stripe: [módulo](../04_outputs/modulos/stripe/README.md).
- Seguimiento de pasos: [bitácora](../04_outputs/modulos/stripe/docs/bitacora.md).

El pack `00_intake_context_pack.md` conserva el contexto de preventa de junio.
Las decisiones y la planificación de septiembre citadas arriba actualizan el
foco y las fechas, sin convertir los supuestos técnicos antiguos en hechos.

## Decisiones actuales

- Empezar por Stripe: mockup en cuenta controlada por Raúl/Skilland; validación
  con Carmen y réplica en la cuenta de EPI10 según el roadmap de Linear.
- Raúl registra la cuenta personalmente desde su navegador. Prefiere esta vía
  al sandbox anónimo propuesto inicialmente; no se creó ningún sandbox anónimo.
- Propuesta vigente de demo: **NutriWell · DEMO**, 100 EUR ficticios, pago único;
  usa la oferta de los documentos de marca en lugar de la etiqueta genérica
  inicial. Oferta y precio comerciales definitivos: Unknown.
- Raúl aportó seis nuevos logos en
  [Nuevos-logos-de-EPI10](EPI10-branding/Nuevos-logos-de-EPI10/). Se han revisado y
  son los activos vigentes para la demo. Aplicación prevista: 01 azul sobre claro,
  02 blanco sobre oscuro; [inventario](../04_outputs/modulos/stripe/docs/marca.md).
- Configuración recomendada: «Aceptar pagos por Internet», desmarcar «Enviar
  facturas» y elegir «Elige lo que necesitas» en ventas internacionales. En la
  pantalla posterior de productos adicionales, desmarcar «Enviar facturas» y
  «Cobrar impuestos» para el mockup; fiscalidad definitiva aún por definir.
- Vía de configuración: «Configurar desde el Dashboard», seleccionada en la
  captura de onboarding. El usuario ya ha accedido al Dashboard.
- Objetivo de la demo: mostrar a Carmen un mockup funcional con imagen,
  información y producto de EPI10. Por petición del 16 de septiembre, las 12
  tareas vigentes del speedrun están reunidas en OL4: ocho Done, una In Progress
  y tres Todo,
  incluida la factura como subtarea de la réplica.
- Guías reutilizables en Markdown. Una futura guía PDF breve con marca Skilland
  se derivará de procedimientos verificados, sin incluir bitácoras internas.
- Planificación y base modular ya incorporadas y revisadas: tres documentos,
  106 tareas, seis módulos y guía/bitácora/pruebas de Stripe. Los dos subagentes
  han terminado; el agente principal mantiene ahora la documentación continua.
- Bloque Stripe remodelado en Linear: 12 tareas vigentes en OL4, todas asignadas
  a Raúl. SKI-28, SKI-26, SKI-48,
  SKI-49, SKI-37, SKI-50, SKI-51 y SKI-52 Done; SKI-53 In Progress y tres Todo.
  [Desglose verificado](../04_outputs/modulos/stripe/docs/linear_speedrun.md).
- Auditoría remota del 16 de septiembre: las 97 issues que permanecen en el
  proyecto están asignadas a Raúl y no hay ninguna cancelada. OL3 contiene 16
  tareas no Stripe; OL4 contiene 16, de las que 12 son el speedrun Stripe. Linear
  contiene una actualización de
  proyecto que resume las ocho tareas Stripe completadas el día anterior. Cada
  una de esas ocho issues contiene además su resumen de resultado y evidencia.

## Última evidencia y siguiente paso

Demo pública: https://epi10-nutriwell-demo.vercel.app. NutriWell · DEMO, 100 EUR
ficticios; marca actualizada y maquetación revisada. La web definitiva sigue a
cargo del otro proveedor.

SKI-50 terminada y releída el 15 de septiembre a las 19:50:55 UTC. Recorrido
probado: entrada → abandono → recuperación → rechazo → pago correcto →
confirmación. Sesión y PaymentIntent conservados; compra NW-D8418096, un pago
correcto de 100 EUR en el sandbox `acct_1UFzBqRrJS0VSqzs`.

Los botones de Vercel crean/recuperan Checkout Sessions desde servidor;
`/compra` consulta el pago real en Stripe. El Payment Link anterior es una
referencia independiente. Clave sandbox de aplicación en `.env.local` ignorado
por Git y variables sensibles en Vercel; no copiarla a documentación.

Diez tests, build y TypeScript correctos; lint sin errores, cinco avisos de
imágenes. DOM/geometría del resultado correctos en cuatro anchos de 320 a
1440 px. Sin capturas visuales. Evidencia E17 y
[procedimiento](../04_outputs/modulos/stripe/docs/confirmacion_recuperacion.md).

SKI-51 terminada: receptor público con firma, comprobación del pago en Stripe y
registro persistente en Upstash Redis (plan gratuito, conectado por Vercel).
Dos entregas reales de Stripe generan una única actuación de demo. Cuatro firmas
inválidas no alteran el registro. 21 tests, build/TypeScript y lint nuevo correctos.
[E18 y procedimiento](../04_outputs/modulos/stripe/docs/webhook_stripe.md).

SKI-52 completada: 3DS fallido y correcto, dos pestañas con una sesión, dos pagos
nuevos y devoluciones completas, notificaciones automáticas y capturas de móvil/
escritorio. Sin cambios de código; E19 y [validación](../04_outputs/modulos/stripe/docs/validacion_demo.md).
Móvil probado en viewport de Chromium. Observación no bloqueante: Apple Pay aparece
irregular en capturas; wallets y dispositivos físicos no certificados.

**Siguiente: SKI-53**, paquete y guion para Carmen; después, ensayo del usuario. Feedback con Carmen SKI-74 y cuenta propia EPI10 SKI-77
permanecen pendientes; la demo no acredita configuración productiva.

Ensayo técnico nuevo del 17 de septiembre: Raúl completó la compra ficticia
NW-8B1611D4. Stripe confirma sesión complete/paid, PaymentIntent succeeded,
cargo pagado de 100 EUR y modo test; webhook recibido una vez y una sola actuación
persistente. URL HTTP 200, 21/21 tests y build/TypeScript correctos. E20. El pago
no se ha devuelto. SKI-53 está In Progress: faltan guion, respaldo y ensayo oral.

Linear fue reordenado el 16 de septiembre. Relectura completa: 97 issues en el
proyecto, todas asignadas a Raúl; 11 Done, 79 Todo, 6 In Progress y 1 In Review.
Las nueve versiones antiguas se retiraron del proyecto y se eliminaron sus
relaciones; siguen existiendo fuera como canceladas hasta disponer de navegador
para borrarlas físicamente. El trabajo Stripe está registrado en SKI-26, 28, 37,
48–53, 74, 77 y 81, con ocho tareas Done y cuatro pendientes, todas en OL4.

## Continuidad

Registrar acción → resultado → evidencia → decisión → siguiente paso tras cada
avance. La bitácora conserva el detalle; este archivo solo el foco vigente.
Las tareas y fechas locales son una instantánea fechada de Linear, actualizada
tras remodelar Stripe y cerrar el acceso. Los tres documentos fuente anteriores
se conservan como línea base histórica. El discovery Healthie de la spec
010 conserva pendientes y no se ha declarado terminado.

### Configuración Stripe por fases

La configuración comercial y operativa de la cuenta EPI10 queda explícita en
SKI-77 y no bloquea terminar la demo. SKI-74 recoge decisiones de Carmen que
puedan cambiar el recorrido. Confirmación, recuperación y eventos de prueba
permanecen en el speedrun actual. [Desglose](../04_outputs/modulos/stripe/docs/configuracion_entornos.md).
