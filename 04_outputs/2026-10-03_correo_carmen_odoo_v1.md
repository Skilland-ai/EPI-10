# Correo a Carmen — para reenviar al mantenedor de Odoo

Fecha: 2026-10-03 · Linear: SKI2-103 → SKI2-104 · Estado: borrador para enviar

---

**Asunto:** EPI10 · Acceso técnico a Odoo para el MVP

Hola Carmen,

Para conectar Odoo con Healthie y con la compra en la web necesito hablar con quien os mantiene el Odoo. ¿Puedes reenviarle este correo poniéndome en copia? A partir de ahí lo coordino yo directamente.

Gracias,

Raúl

---

Hola,

Soy Raúl Artiles, de Skilland. Estamos construyendo para EPI10 Salud un MVP que conecta su Odoo con Healthie (el portal del cliente) y con los pagos de la web (Stripe). La idea es que Odoo lleve el seguimiento operativo de cada cliente: estado del caso, tareas del equipo y próximos pasos.

No vamos a tocar nada en producción. Para planificarlo bien, nos ayudaría que nos contaras:

1. **Versión y edición** de Odoo (Community o Enterprise).
2. **Alojamiento:** Odoo Online, Odoo.sh o servidor propio (y en qué proveedor y país).
3. **Módulos instalados** y si hay desarrollos a medida (y dónde está su código).
4. **Acceso por API** (XML-RPC / JSON-RPC): si está disponible y cómo preferís darnos un usuario técnico con permisos limitados.
5. **Entorno de pruebas:** si existe staging o si podemos trabajar sobre una copia sin datos reales de clientes.
6. **Copias de seguridad y despliegues:** quién publica los cambios y con qué proceso.
7. **Reglas de automatización con webhook:** si vuestra versión permite que una regla de Odoo avise a un servicio externo cuando cambia un registro (desde Odoo 17).
8. **Desplegar un servicio pequeño en vuestro servidor:** la integración será un servicio propio (Docker, con su propia base de datos PostgreSQL), separado de Odoo y sin tocar su código ni su base de datos. Necesitaríamos saber si es posible alojarlo en el mismo servidor, qué recursos libres hay, cómo sería el acceso para desplegar y quién gestiona el dominio y los certificados HTTPS.
9. Cualquier **restricción o forma de trabajar** que debamos respetar.

Con esto, nos vendría muy bien una llamada de 30 minutos para acordar cómo colaborar. ¿Qué días te vienen bien la semana que viene?

Muchas gracias,

Raúl Artiles
Skilland
