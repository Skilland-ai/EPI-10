# Correo a Carmen: Healthie (API y white label) y Stripe

Fecha: 2026-10-04 · Linear: SKI2-101, SKI2-20 · Estado: **programado por Raúl para el 5 oct a las 8:00** (versión final)
Cambios respecto a la v1 (3 oct): Healthie ya está configurado por la interfaz; las funciones de desarrollador salen bloqueadas hasta que se active la API; se menciona el correo del fallo de las plantillas; el texto para Healthie se ajusta a lo visto.

---

**Para:** Carmen
**Asunto:** EPI10 · Activar la API de Healthie, presupuesto de white label y Stripe

Hola Carmen,

Te cuento cómo vamos con Healthie y lo que necesito que pidas tú, como titular de la cuenta.

**Lo que ya está hecho**

Ya hemos dejado configurada la cuenta de Healthie de EPI10 desde su web: seguridad con doble factor, logo y nombre de EPI10 Salud, los grupos de clientes y el recorrido de bienvenida con dos formularios provisionales. Esta mañana también te ha llegado en copia un aviso a Healthie: hay un fallo suyo que no nos deja traducir al español el correo de invitación.

**1. Activar la API de Healthie**

Es lo único que nos falta para conectar Healthie con Odoo y con la compra en la web. La API es un complemento de pago del plan Group y hay que pedírselo a Healthie. Desde la cuenta ya se ve: la sección de desarrollador (claves de API y webhooks) aparece bloqueada. Te pediría que les solicites:

- Activar el complemento de API en vuestra cuenta, con acceso a Sandbox (pruebas) y a Producción, y que os indiquen su coste.
- Que, una vez activo, se desbloquee la sección de desarrollador en la cuenta. Así genero yo las claves directamente y no tienen que viajar por correo.

**2. Pedir presupuesto de white label**

Ahora mismo el cliente ve la marca Healthie en invitaciones, correos y notificaciones, y algunas frases salen en inglés. Para que la experiencia sea 100 % EPI10 hace falta white label, que Healthie solo ofrece como complemento del plan Enterprise. Pídeles una cotización de:

- Plan Enterprise con Semi White Label y con Full White Label, para comparar.
- Mobile White Label (app propia de EPI10), por separado.
- Condiciones del cambio desde Group: permanencia mínima, coste de alta y si se conserva lo ya configurado.

Y, de paso, que confirmen dónde se alojan los datos y os envíen su DPA (el acuerdo de tratamiento de datos del RGPD), que lo necesitaremos en cualquier caso.

No hace falta decidir nada todavía: con la cotización valoramos juntos si el white label entra en esta fase o en la siguiente.

Te dejo abajo un texto en inglés listo para enviar a Healthie. Si me pones en copia, voy siguiendo yo el hilo.

**3. Stripe: pasar la demo a vuestra cuenta**

- ¿Tenéis ya cuenta de Stripe a nombre de EPI10? Si es así, invítame como Administrador (*Ajustes > Equipo*). Si no, la creamos juntos en un rato: tiene que ir a vuestro nombre, porque pide los datos fiscales y la cuenta bancaria donde recibiréis los cobros.
- Confírmame el producto y el precio definitivos (en la demo usamos NutriWell a 100 € como ejemplo).

Te mando aparte el mensaje para quien os lleva el Odoo, para que se lo reenvíes.

Un abrazo,

Raúl

---

**Texto para Healthie (en inglés, copiar y pegar):**

> **Subject:** API add-on and Enterprise / White Label quote — EPI10 Salud
>
> Hi Healthie team,
>
> We are on the Group plan and our account is already set up (branding, client groups and onboarding). We would now like to:
>
> 1. Enable the **API add-on** for our account, with access to both the **Sandbox** and **Production** environments. Please let us know the pricing.
> 2. Unlock the **developer features** (API keys and webhooks), which currently appear disabled even for our organization owner. We assume they depend on the API add-on; please confirm.
> 3. Confirm whether the API add-on includes **webhooks** and the **Sandbox** environment, or whether those require Enterprise.
> 4. Receive a quote for the **Enterprise plan** with **Semi White Label** and with **Full White Label** (to compare), and separately for **Mobile White Label**. Please include minimum term, setup fees and whether our current configuration is preserved when upgrading.
> 5. Confirm where our data is hosted and share your **DPA** (GDPR Data Processing Agreement). We operate in Spain/EU.
> 6. We found no language setting. Is there any way to show the client portal, the emails and the mobile app in **Spanish**?
> 7. Is there a cost for an additional provider/admin account that we would use as a **system account** for the API key?
>
> Our technical partner, Raúl Artiles (Skilland), is in copy and will handle the implementation.
>
> Thank you,
> Carmen
