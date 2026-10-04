# Correo a Carmen: para reenviar al mantenedor de Odoo (versión final)

Fecha: 2026-10-04 · Linear: SKI2-103 → SKI2-104 · Estado: **programado por Raúl para el 5 oct a las 8:00**
Versión final, redactada por Raúl a partir de la v2. Lo que no entra aquí (alojar el servicio en su servidor, webhooks, usuario técnico de API, caducidad de claves, staging y despliegues) queda para la sesión técnica de SKI2-104.

---

**Asunto:** EPI10 · Acceso técnico a Odoo para el MVP

Hola Carmen,

Para avanzar con la integración de Odoo en el MVP necesito hablar directamente con la persona o empresa que os mantiene actualmente Odoo.

¿Puedes reenviarle este correo y ponerme en copia? A partir de ahí lo coordino yo con ellos.

Gracias,

Raúl

---

Hola,

Soy Raúl Artiles, de Skilland. Estamos trabajando con EPI10 Salud en la integración de su Odoo con el resto del MVP.

Para trabajar con seguridad, nuestra intención es montar una réplica del Odoo actual de EPI10 en nuestro propio entorno de desarrollo, trabajar y probar allí, y no tocar producción durante esta fase.

Para poder hacerlo necesitaríamos simplemente:

- Versión exacta y edición de Odoo que utiliza EPI10.
- Backup completo y anonimizado de la instancia actual, incluyendo el filestore si no viene incluido en el propio backup.
- Documentación técnica disponible sobre la instalación y configuración.
- Si existen módulos o desarrollos a medida, acceso a su código o repositorio para poder reproducir correctamente el entorno.

Con eso deberíamos poder levantar nosotros mismos el entorno de desarrollo y avanzar sin necesitar acceso directo al servidor de producción.

Si os parece, cuando nos pongamos en contacto hacemos una llamada corta y lo coordinamos.

Muchas gracias,

Raúl Artiles
