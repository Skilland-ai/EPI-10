# Correo a Carmen: para reenviar al mantenedor de Odoo

Fecha: 2026-10-04 · Linear: SKI2-103 → SKI2-104 · Estado: borrador v2, pendiente del OK de Raúl
Cambios respecto a la v1 (3 oct): se cuenta que tenemos un Odoo 17 de pruebas que imita al suyo; se pide un backup anonimizado, junto con la versión exacta y la lista de módulos; se ordenan las preguntas.

---

**Para:** Carmen
**Asunto:** EPI10 · Acceso técnico a Odoo para el MVP

Hola Carmen,

Para conectar Odoo con Healthie y con la compra en la web necesito hablar con quien os mantiene el Odoo. ¿Puedes reenviarle este correo y ponerme en copia? A partir de ahí lo coordino yo directamente.

Gracias,

Raúl

---

Hola:

Soy Raúl Artiles, de Skilland. Estamos construyendo para EPI10 Salud un MVP que conecta su Odoo con Healthie (el portal del cliente) y con los pagos de la web (Stripe). Odoo llevará el seguimiento operativo de cada cliente: el estado del caso, las tareas del equipo y los próximos pasos.

No vamos a tocar nada en producción. En nuestro entorno ya tenemos un **Odoo 17 Community de pruebas que imita al de EPI10**, con datos ficticios, y la integración funciona contra él de principio a fin. Para que se parezca del todo al vuestro, os pedimos:

1. **Versión exacta y edición** de Odoo (Community o Enterprise).
2. **Módulos instalados** y si hay desarrollos a medida (y dónde está su código).
3. **Un backup anonimizado de la base de datos.** Lo usaremos para montar una réplica en nuestro entorno de pruebas. Es importante que llegue **anonimizado**: los nombres, contactos y datos de salud de los clientes deben estar borrados o sustituidos por datos inventados antes de que salga de vuestro servidor. Si no os resulta posible, lo hablamos en la llamada antes de enviar nada.
4. **Alojamiento:** Odoo Online, Odoo.sh o servidor propio (y en qué proveedor y país).
5. **Acceso por API** (XML-RPC / JSON-RPC): si está disponible y cómo preferís darnos un usuario técnico con permisos limitados.
6. **Entorno de pruebas:** si existe un staging donde podamos validar antes de producción.
7. **Copias de seguridad y despliegues:** quién publica los cambios y con qué proceso.
8. **Reglas de automatización con webhook:** si vuestra versión permite que una regla de Odoo avise a un servicio externo cuando cambia un registro (desde Odoo 17).
9. **Apps instaladas**, en especial Proyecto y Reglas de automatización, y si aceptáis activar Proyecto si no está.
10. **Configuración sin módulos:** si nos permitís que un script nuestro cree por API algunos campos, etapas, una vista y una regla de automatización, sin instalar ningún módulo.
11. **Desplegar un servicio pequeño en vuestro servidor:** la integración es un servicio propio (Docker, con su propia base de datos PostgreSQL), separado de Odoo y sin tocar su código ni su base de datos. Necesitaríamos saber si se puede alojar en el mismo servidor, qué recursos libres hay, cómo sería el acceso para desplegar y quién gestiona el dominio y los certificados HTTPS.
12. **Claves de API:** desde Odoo 18 caducan como máximo a los 90 días; cómo preferís que las renovemos.
13. Cualquier **restricción o forma de trabajar** que debamos respetar.

Con esto, nos vendría muy bien una llamada de 30 minutos para acordar cómo colaborar. ¿Qué días te vienen bien esta semana?

Muchas gracias,

Raúl Artiles
Skilland
