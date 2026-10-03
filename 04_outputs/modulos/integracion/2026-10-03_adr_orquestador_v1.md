# ADR — Dónde vive el orquestador de EPI10 (D2)

Fecha: 2026-10-03 · Linear: SKI2-159 · Estado: **aceptado por Raúl** · Journey: [v2](../journey/2026-10-03_customer_journey_mvp_v2.md)

## Decisión

La integración entre web + Stripe, Healthie y Odoo vive en **un monolito propio**: un solo repositorio, mantenido por nosotros, desplegado **en el mismo servidor donde EPI10 tiene Odoo**.

1. **Un monolito con cinco módulos:** núcleo, Stripe, Healthie, Odoo e informes (generador de borradores).
2. **Odoo solo por API.** No instalamos módulos en el Odoo de EPI10 ni mantenemos su repositorio. Solo necesitamos un usuario técnico de API con permisos limitados.
3. **Los cambios de Odoo llegan por webhook** (regla de automatización de Odoo que avisa al monolito). Si la versión de Odoo no lo permite, alternativa: el monolito consulta los casos modificados cada 1–2 minutos.
4. **AWS queda descartado.** Raúl indica que el cliente lo ha confirmado.
5. **Regla de datos del módulo de informes** (ver [Datos](#datos)): el entregable de TellmeGen entra, se usa y se borra.
6. **Informes con pantalla propia** dentro del monolito, en TypeScript. El borrador se genera de forma autónoma; publicar exige la validación de Aitor.

El servidor es el de EPI10, donde tienen su Odoo (confirmado por Raúl). No se contempla otro alojamiento.

## Motivos

- **Un solo repositorio que mantener.** Desarrolla Raúl solo, con revisión semanal de Fer.
- **No tocar el Odoo del cliente.** Los módulos instalados en Odoo hay que mantenerlos en cada actualización de versión y obligan a coordinarse con su mantenedor (criterio de Fer).
- **Todo lo que el journey pide a Odoo se puede hacer desde fuera:** crear contacto y caso, mover etapas, crear actividades y leer cambios.
- **Se aprovecha lo construido:** la lógica del webhook de Stripe (firma, validación contra la API, idempotencia, orden de eventos, 21 pruebas) pasa al monolito.
- **Datos en la UE,** en el servidor del cliente.

Opciones descartadas:

| Opción | Por qué no |
|---|---|
| Capa NestJS en AWS España (la de la propuesta de junio) | AWS descartado por el cliente. |
| Módulos dentro de Odoo (`epi10_intake`, journey de junio) | Mantenimiento ligado a su Odoo y a su mantenedor. No viable si es Odoo Online. |
| Evolucionar la app de Stripe en Vercel | Infraestructura hoy en EE. UU., estado repartido entre varios proveedores y sin sitio natural para el módulo de informes. |

Esta decisión cambia la propuesta firmada (sección 5, 6 y 11, bloque B6). Raúl ha indicado dejar fuera de esta decisión las horas y lo firmado; cómo se comunica a Carmen queda en su mano.

## Componentes

Stack: **TypeScript / NestJS + PostgreSQL**. Un contenedor para la aplicación.

```text
Monolito EPI10
├─ core      casos, estados, eventos, trabajos pendientes y reintentos, mapa de IDs
├─ stripe    receptor del webhook de pago
├─ healthie  cliente de la API + receptor de webhooks
├─ odoo      cliente de la API + receptor de webhooks
└─ informes  subida del entregable, seudonimización, borrador, validación, publicación
```

| Módulo | Qué hace | Detalle |
|---|---|---|
| **core** | Es el dueño del caso. Guarda `case_id`, estado, IDs externos (Stripe, Healthie, Odoo) y el registro de eventos. | Trabajos pendientes en una tabla de PostgreSQL (patrón outbox) con reintentos y espera creciente. Sin colas externas. Si un trabajo agota los reintentos, crea una actividad en Odoo para que una persona lo resuelva. Idempotencia por ID de evento. |
| **stripe** | `POST /webhooks/stripe` | Se porta desde `04_outputs/modulos/stripe/app/lib/` (`stripe-webhook.ts`, `stripe-ledger.ts`, `order.ts`). El registro pasa de Redis a PostgreSQL. Mismos eventos: pago completado, fallido, caducado y devolución. |
| **healthie** | Crear o vincular cliente, asignar grupo, enviar mensaje, publicar PDF. `POST /webhooks/healthie` para onboarding completado y citas. | API GraphQL de Healthie. **Bloqueado por SKI2-101** (add-on de API sin activar). Formato y firma de los webhooks: a verificar con la documentación al activar. |
| **odoo** | Crear contacto y caso, mover etapa, marcar checks, crear actividades. `POST /webhooks/odoo` para los hitos que marca Aitor. | Solo API externa con usuario técnico. Modelos estándar y campos `x_` creados como configuración desde un script de nuestro repo. Modelo del caso, versión y tipo de API: **Unknown hasta SKI2-104**. El adaptador aísla la versión de la API. |
| **informes** | Aitor sube el entregable; el módulo seudonimiza, genera el borrador y gestiona la validación y la publicación. | Alcance vendido (D7): checklist de inputs, seudonimizador, borrador, revisión humana, exportación. Detalle en [Módulo de informes](#módulo-de-informes). |

### Módulo de informes

Parte de la propuesta de Fer (`arquitectura_agente_odoo_v2.pdf`, junio de 2026) y la adapta a las decisiones de este ADR.

Se mantiene de la propuesta de Fer:

- Skills en Markdown y flujo en YAML, editables sin tocar el código.
- Ejecutor propio y pequeño, sin frameworks de agentes.
- Llamada directa al modelo de lenguaje.
- Plantilla Word que se rellena con el resultado.

Cambia respecto a la propuesta de Fer:

| Punto | Propuesta de Fer | Decisión |
|---|---|---|
| Lenguaje | Python + FastAPI, servicio aparte | TypeScript, dentro del monolito |
| Interfaz | Botón en Odoo; PDF y Word como adjuntos de Odoo | Pantalla propia del monolito; Odoo solo enlaza a ella |
| Publicación | Flujo autónomo completo | Autónomo hasta el borrador; publicar exige validación de Aitor |

Pantalla «Informes» (acceso con usuario y contraseña, enlace desde el caso de Odoo):

1. Lista de casos listos para informe.
2. Subida del entregable de TellmeGen.
3. Descarga del borrador en Word. Aitor lo corrige en su Word.
4. Subida del PDF final y botón «Validar y publicar».

Modelo de lenguaje: se decide al construir el módulo. Opciones: API de Anthropic, o acceso por suscripción con OAuth (por ejemplo Codex) para reducir coste. El ejecutor aísla al proveedor detrás de una interfaz para poder cambiarlo. Al elegir, comprobar que las condiciones de uso del proveedor permiten este uso desde un servidor.

El contenido seudonimizado del entregable se envía al proveedor del modelo para generar el borrador. Raúl indica que está decidido con Carmen seguir adelante.

## Orden de construcción

Decidido por Raúl:

1. Esqueleto + `core` + `stripe`. Corre en infraestructura nuestra, con un Odoo simulado.
2. `odoo` e `informes`, en paralelo.
3. `healthie` (requiere SKI2-101).
4. Despliegue en el servidor de EPI10.
5. Prueba de extremo a extremo.

Hasta el paso 4 el monolito se levanta por nuestra cuenta (hermes-node o similar) y solo con datos ficticios.

## Despliegue

- **Dónde:** servidor de EPI10 donde está su Odoo.
- **Cómo:** Docker Compose con tres servicios: aplicación, PostgreSQL propia y proxy HTTPS.
- **Entrada desde Internet:** un subdominio con HTTPS que exponga solo las tres rutas de webhooks y la interfaz de informes. Subdominio: Unknown.
- **Separación con Odoo:** usuario de sistema, carpeta y contenedores propios. No usamos la base de datos de Odoo ni su código. En una misma máquina la separación es de acuerdo y de proceso, no técnica: se pacta con el mantenedor.
- **Secretos:** en un archivo de entorno en el servidor, fuera del repositorio.
- **Copias:** volcado diario de la PostgreSQL del monolito. Destino y retención: Unknown.
- **Logs:** sin datos personales ni sanitarios; solo IDs, tipos de evento y resultados.
- **Publicación de versiones:** Unknown (depende del acceso que nos dé el mantenedor).

A confirmar en SKI2-104:

1. Acceso al servidor para desplegar (usuario, Docker, puertos).
2. Versión de Odoo y que la API externa está disponible.
3. Que la versión permite reglas de automatización con webhook (existe desde Odoo 17).
4. Usuario técnico de API y sus permisos.
5. Recursos libres del servidor y quién gestiona dominio y certificados.

## Flujo de eventos

### 1. Pago → caso

1. El cliente paga en el checkout de Stripe.
2. Stripe llama a `POST /webhooks/stripe`. El módulo comprueba la firma, valida el pago contra la API de Stripe y descarta duplicados.
3. `core` crea el caso en estado `pago_confirmado` y guarda los IDs de Stripe.
4. `core` deja dos trabajos pendientes: crear el caso en Odoo y dar de alta al cliente en Healthie.
5. Se responde 200 a Stripe solo después de guardar. Si algo falla, 503 y Stripe reintenta.

El nombre y el email del cliente se guardan en Odoo (contacto) y en Healthie (perfil). El monolito no guarda una copia: cada trabajo los lee de Stripe cuando los necesita.

### 2. Caso → Odoo

1. `odoo` crea o vincula el contacto y crea el caso con la etapa «Nuevo caso · pago confirmado».
2. `core` guarda los IDs de Odoo.
3. El equipo ve el caso nuevo en Odoo.

### 3. Caso → Healthie

1. `healthie` busca al cliente por email. Si existe, lo vincula; si no, lo crea.
2. Asigna el grupo «EPI10 · nuevo cliente». Healthie envía la invitación y lanza el onboarding (D3).
3. `core` guarda el ID de Healthie y `odoo` lo anota en el caso.

**Si la API de Healthie no está activa o falla:** `odoo` crea la actividad «Alta manual en Healthie» para Aitor y el caso no se pierde.

### 4. Hitos

| Origen | Señal | Qué hace el monolito |
|---|---|---|
| Healthie | Onboarding completado | Marca los checks del caso en Odoo. Al cumplirse D3, crea la actividad «Pedir test» para Aitor. |
| Odoo | Aitor marca «test pedido» | Envía en Healthie el mensaje «tu caso está en marcha». |
| Odoo | Aitor marca «test recibido» | Cambia el grupo en Healthie y envía «tu test está listo, agenda tu cita». |
| Healthie | Cita creada, cambiada o cancelada | Actualiza la fecha en el caso de Odoo y avisa al equipo. Si se cancela: «pendiente de reagendar». |
| Odoo | Aitor marca «test realizado» | Comprueba que hay código de barras (D8). Si falta, crea una actividad para completarlo. |
| Odoo | Aitor marca «muestra enviada» | Envía en Healthie el mensaje «muestra enviada». |
| Odoo | Aitor marca «entregable disponible» | Deja el caso listo para el módulo de informes. No avisa al cliente. |

Cada señal entra por su webhook, se registra como evento, se deduplica y se ejecuta como trabajo con reintentos.

### 5. Informe

1. Aitor sube el entregable de TellmeGen al módulo `informes`.
2. El módulo comprueba el checklist de inputs y seudonimiza: sustituye los datos identificativos por el `case_id`.
3. Genera el borrador y borra el archivo original.
4. Aitor revisa, corrige y valida. Sin validación humana no se publica nada.
5. `healthie` publica el PDF final, cambia el grupo a «informe entregado» y envía «tu informe está disponible».
6. `odoo` marca el caso como entregado y crea la actividad «Revisar cierre» (D10).
7. El borrador se borra del monolito. Queda solo el rastro: quién validó y cuándo se publicó.

## Datos

| Sistema | Qué guarda |
|---|---|
| Healthie | Datos del cliente e informe final. |
| Odoo | Contacto, hitos y tareas. Nunca datos genéticos. |
| Monolito | IDs, estados y eventos. Además, de forma temporal, el borrador seudonimizado. |

Regla del módulo de informes:

1. El archivo de TellmeGen entra, se usa y se borra. No queda en la base de datos, en disco ni en los logs.
2. Solo se conserva el borrador, identificado por código de caso y sin datos de la persona, mientras dura la revisión.
3. Al validar, el informe se publica en Healthie y el borrador se borra.
4. Después solo queda el rastro: caso, quién validó y fechas.

Consecuencia: para rehacer un borrador ya borrado, Aitor vuelve a subir el archivo.

## Consecuencias

- La app de Vercel deja de ser el receptor del webhook. Sigue como demo y página de compra hasta que exista la web definitiva.
- El endpoint de Stripe se registra de nuevo apuntando al monolito, con secreto de firma nuevo.
- El coste de AWS de la propuesta (44 USD/mes) desaparece.
- La disponibilidad del monolito depende del servidor del cliente y de su mantenedor.

## Unknown

- Odoo: versión, mantenedor, acceso al servidor, modelo para el caso (SKI2-104).
- Healthie: fecha de activación de la API, formato de webhooks, ubicación de sus datos (SKI2-101).
- Cómo crea la sesión de pago la web definitiva (enlace de pago o sesión creada por el monolito).
- Proveedor del modelo de lenguaje para los borradores (se decide al construir `informes`).
- Plantilla Word del informe y formato exacto del entregable de TellmeGen.
- Subdominio, copias de seguridad y forma de publicar versiones.

## Issues de implementación sugeridas

Para el orquestador; no creadas en Linear. Agrupadas según el orden de construcción.

Paso 1:
1. Esqueleto del monolito: NestJS, PostgreSQL, Docker Compose, pruebas y CI.
2. `core`: modelo de caso, estados, registro de eventos, outbox con reintentos.
3. `stripe`: portar webhook y registro a PostgreSQL con sus pruebas.
4. Porción vertical: pago → caso, con un Odoo simulado.

Paso 2, en paralelo:
5. `odoo`: cliente de API, script de campos `x_`, crear contacto, caso y actividades (tras SKI2-104).
6. `odoo`: receptor de webhooks y reglas de automatización de los hitos de Aitor.
7. `informes`: acceso y pantalla (lista de casos, subida, descarga, validar).
8. `informes`: seudonimización y borrado del original.
9. `informes`: ejecutor, skills, plantilla Word y generación del borrador.
10. `informes`: validación, publicación y borrado del borrador (publicación manual hasta tener Healthie).

Paso 3:
11. `healthie`: cliente GraphQL, crear o vincular, grupos, mensajes, publicar PDF (tras SKI2-101).
12. `healthie`: receptor de webhooks de onboarding y citas.
13. Alternativa manual si falta la API de Healthie.

Pasos 4 y 5:
14. Despliegue en el servidor de EPI10: proxy HTTPS, secretos, copias, logs.
15. Prueba de extremo a extremo de los cinco tramos del journey.
