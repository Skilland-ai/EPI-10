# Correo a Plutio: demo, condiciones, entorno de desarrollo y cobertura de la API (v1)

Fecha: 2026-10-18 · Linear: SKI2-299 · Para: help@plutio.com (no publican correo de ventas) · Lo envía: Raúl · Estado: borrador

**Contexto.** Plutio pasa a naranja por decisión de Raúl (18 oct): no es software de salud y hay riesgo con los datos. Antes de seguir, este correo pide por escrito todo lo que hace falta para decidir. No nombra a EPI10. Las preguntas siguen el contrato del portal del monolito (`contrato.ts` v1.2.0, operaciones 1–7) y lo aprendido con Healthie.

---

**Subject:** Demo + pricing, developer access and full API coverage for a client-portal integration (health & wellness, Spain)

Hi Plutio team,

I'm Raúl Artiles from Skilland, a technology integrator. We're evaluating Plutio as the client portal for a health & wellness client in Spain. The portal would be driven via your API by our own system, which already handles Stripe payments, Odoo and report generation.

We've been burnt before by a platform that started charging for its API mid-project. Before committing, we'd like a short demo call and written answers to the points below. Sorry for the length: we prefer to ask everything at once.

**1. Pricing and commitment**
- 2–3 staff users, unlimited clients, white-label add-on. Is Pro the right plan?
- Are API access and webhooks included in every plan permanently? Are there plans to charge for them, now or later?
- Can you commit in writing to the price (plan + white-label + API) for 24–36 months, with a minimum notice period for any change?
- Is the API rate limit (1,500 requests/hour) per workspace? Can it be raised, and at what cost? Is there a daily limit?

**2. Developer access**
- Can we get a developer/sandbox workspace for longer than the 7-day trial, and above the 300 requests/hour trial limit, to build and test the integration with no real data?
- What is your API versioning and deprecation policy (we see v1.11)? How much notice do you give before breaking changes?

**3. Building our client flow on your API.** This is our flow. For each step, could you confirm it is possible via API and point us to the endpoint?
1. **Create access after payment.** Create the client (POST /people) right after a Stripe payment in our system, and get their portal invitation URL (GET /people/invitation-code?) so we can send it in our own branded email. Is the invitation endpoint documented? Can we create the client without Plutio sending its own email?
2. **Assign forms.** Assign specific forms to a specific client inside their portal: a consent form with signature, a habits questionnaire, and a form where they choose "test at home" (with shipping address) or "test at the clinic" (with an appointment).
3. **Form status.** Know when each form has been completed and read the answers. We see `forms` webhooks for submissions. Does the payload identify the client? Is there a webhook when a contract is signed?
4. **Send messages.** Post milestone messages into the client's conversation in their portal via API, with an email notification to the client.
5. **Read new messages.** List new messages written by the client via API. Is there a webhook for new client messages, or should we poll? If we poll, what is the recommended way to get only new messages since a timestamp?
6. **Publish the report.** Upload a PDF and share it with that client only (POST /files/share). It must be visible and downloadable in their portal, with a notification. Could we instead share a link to a file hosted on our side?
7. **Case status.** Set a status and custom fields on the client (e.g. case phase, kit code) via API, visible to our staff.
8. **Appointments (optional).** Can clients book an in-person appointment from the portal, and can we read or create bookings via API?

Also:
- Custom portal on top of the API: could we build our own client-facing front-end on top of your API instead of your portal? Is there client-level authentication (e.g. magic link or SSO) for that?
- Webhook security: are deliveries signed (HMAC or similar), and can we filter events per entity?
- Idempotency: is there an idempotency key or an external-ID field so retries don't create duplicate clients?

**4. Language and branding**
- Can the client portal, the login and invitation screens and all automatic emails be shown in Spanish (Spain) per client, with no English strings left?
- Can we edit every email template?
- With white-label, does the client ever see "Plutio"? That includes the mobile app, emails, PDFs and URLs.

**5. Data protection.** Our client processes health and genetic data (GDPR Article 9).
- Your DPA says Plutio is not designed for special-category data unless the customer has a lawful basis. Will you accept this use under your DPA?
- Can the database (MongoDB Atlas) and file storage (today AWS S3 in the US) be pinned to the EU for our workspace?
- Can AI features (OpenAI) be fully disabled so no client data is sent to them?
- Do you hold ISO 27001 or SOC 2? Do you offer MFA for staff and for clients, and audit logs?
- Can we fully export all data (clients, forms, messages, files) and permanently delete a client via API, for the right to erasure and to avoid lock-in?

**6. Company and service**
- Roughly how large is the team, and how long has Plutio been operating?
- Is there an uptime SLA? What is your backup and restore policy?

Thanks a lot. Happy to jump on a call this week.

Best regards,
Raúl Artiles
Skilland · direccion@skilland.ai
