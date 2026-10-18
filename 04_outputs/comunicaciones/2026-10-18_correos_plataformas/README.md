# Correos a Practice Better, Pabau e IntakeQ / PracticeQ (v1)

Fecha: 2026-10-18 · Linear: SKI2-300 · Los envía Raúl · No nombran a EPI10 · Misma estructura que el de Plutio (SKI2-299), adaptada a lo que ya sabemos de cada API. Pregunta central nueva: el español en todas partes, y si no, poder cambiar todos los textos.

## Practice Better

**Para:** (no hay correo público: chat o ticket desde help.practicebetter.io, o el formulario de demo de practicebetter.io)

**Asunto:** Demo + API pricing, developer access and full API coverage for a client-portal integration (health & wellness, Spain)

```
Hi Practice Better team,

I'm Raúl Artiles from Skilland, a technology integrator. We're evaluating Practice Better as the client portal for a health & wellness client in Spain. The portal would be driven via your API by our own system, which already handles Stripe payments, Odoo and report generation.

We've been burnt before by a platform that started charging for its API mid-project. Before committing, we'd like a short demo call and written answers to the points below. Sorry for the length: we prefer to ask everything at once.

1. Pricing and commitment
- 2–3 practitioners/admins, unlimited clients, custom branding and custom URL. Is Plus or Team the right plan?
- Your API is a free public beta and "pricing will apply after it ends". What will the API cost, and from when? Will beta participants keep their price? Can you commit in writing to the total price (plan + API) for 24–36 months, with a minimum notice period?
- API rate limits, and whether they can be raised.

2. Developer access
- Can we get a sandbox/developer account (longer trial, no real data) with the API Access (Beta) add-on approved, to build and test the integration?
- Where is the full API reference? Is there an API versioning and deprecation policy?

3. Building our client flow on your API. This is our flow. For each step, could you confirm it is possible via API and point us to the endpoint?
1) Create access after payment: create the client right after a Stripe payment in our system and give them portal access. Ideally we get the invitation link and send it in our own branded email, without your system sending its own.
2) Assign forms: a consent form with e-signature, a habits questionnaire, and a form where the client chooses "test at home" (with shipping address) or "test at the clinic" (with an appointment).
3) Form status: know when each form is completed and read the answers (webhook preferred).
4) Send messages: post milestone messages into the client's inbox in their portal, with an email notification.
5) Read new messages: list new messages written by the client (webhook, or polling "since a timestamp").
6) Publish the report: upload a PDF and share it with that client only, visible and downloadable in their portal, with a notification.
7) Case status: set tags, statuses or custom fields on the client (e.g. case phase, kit code) via API, visible to our staff.
8) Appointments (optional): can clients book an in-person appointment from the portal, and can we read or create bookings via API?
Also: are webhook deliveries signed (HMAC or similar)? Is there an idempotency key or an external-ID field so retries don't create duplicate clients? Could we build our own client-facing front-end on top of your API, with client-level authentication (e.g. magic link)?

What we already saw: the API Access (Beta) add-on, Zapier "Add Client", and a third-party guide describing webhooks with HMAC signatures. Please confirm the official webhook events (form completed, message received, document viewed, package purchased) and how to read new client messages.

4. Language: Spanish everywhere (very important)
Our clients are in Spain and the whole experience must be in Spanish (Spain), with no English strings left.
- Is there a Spanish interface for the client portal, the mobile app, the login and invitation screens, and the automatic emails and SMS? If not, is it on your roadmap, and when?
- If not, can we override EVERY client-facing text ourselves: menus, buttons, labels, system messages, form "Next/Submit" texts, invoices, notification and email templates? Through settings, a translation file, custom CSS/JS, or the API?
- If parts can't be translated, which ones would remain in English?

Your help center says client-facing content can be written in another language, but the interface itself stays in English. That is the key blocker for us, so the answers to section 4 matter most.

5. Data protection. Our client processes health and genetic data (GDPR Article 9).
- Will you sign an EU GDPR Data Processing Agreement (not only UK GDPR or HIPAA BAA) that explicitly covers special-category health data, with Standard Contractual Clauses for any transfer outside the EU?
- Your Data Residency article says data is now hosted on AWS in the United States. Can our workspace be hosted in the EU (or Canada), contractually?
- List of sub-processors and their locations. Can AI features be disabled so no client data is sent to third-party AI providers?
- Certifications (ISO 27001, SOC 2), MFA for staff and clients, audit logs.
- Can we fully export all data (clients, forms, messages, files) and permanently delete a client via API, for the right to erasure and to avoid lock-in?

6. Company and service
- Uptime SLA, backup and restore policy, and how much notice you give before price or API changes.

Thanks a lot. Happy to jump on a call this week.

Best regards,
Raúl Artiles
Skilland · direccion@skilland.ai
```

## Pabau

**Para:** danny@pabau.com

**Asunto:** Ahead of Friday's demo: pricing, API coverage, Spanish and EU data (health & wellness client, Spain)

```
Hi Danny,

I'm Raúl Artiles from Skilland, a technology integrator. We're evaluating Pabau as the client portal for a health & wellness client in Spain. The portal would be driven via your API by our own system, which already handles Stripe payments, Odoo and report generation.

We've been burnt before by a platform that started charging for its API mid-project. We have our demo with you on Friday 23 October at 9:15. To make the most of it, here is everything we need to clarify. Written answers would be ideal, before or after the call. Sorry for the length: we prefer to ask everything at once.

1. Pricing and commitment
- Team plan (2–3 users), one site, in Spain: monthly and yearly price. Is there a per-site surcharge?
- Removing the Pabau branding from the client portal, app and emails: which add-on (Marketing Plus?) and at what cost?
- Are API keys and webhooks included in Team with no extra cost, permanently? Can you commit in writing to the total price for 24–36 months, with a minimum notice period?
- API limits (we read 110 requests/min and 25,000/day): per account? Can they be raised?

2. Developer access
- Can we get a sandbox or test account with API access, with no real data, to build and test the integration?
- Your public Postman collection is called "Pabau Legacy". Is there a newer API we should build on? What is your versioning and deprecation policy?

3. Building our client flow on your API. This is our flow. For each step, could you confirm it is possible via API and point us to the endpoint?
1) Create access after payment: create the client right after a Stripe payment in our system and give them portal access. Ideally we get the invitation link and send it in our own branded email, without your system sending its own.
2) Assign forms: a consent form with e-signature, a habits questionnaire, and a form where the client chooses "test at home" (with shipping address) or "test at the clinic" (with an appointment).
3) Form status: know when each form is completed and read the answers (webhook preferred).
4) Send messages: post milestone messages into the client's inbox in their portal, with an email notification.
5) Read new messages: list new messages written by the client (webhook, or polling "since a timestamp").
6) Publish the report: upload a PDF and share it with that client only, visible and downloadable in their portal, with a notification.
7) Case status: set tags, statuses or custom fields on the client (e.g. case phase, kit code) via API, visible to our staff.
8) Appointments (optional): can clients book an in-person appointment from the portal, and can we read or create bookings via API?
Also: are webhook deliveries signed (HMAC or similar)? Is there an idempotency key or an external-ID field so retries don't create duplicate clients? Could we build our own client-facing front-end on top of your API, with client-level authentication (e.g. magic link)?

What we already saw in the Postman collection: clients/create, medical-forms/create, complete-forms, send/email, send/sms, clients/{id}/communications and documents/upload. We did NOT find a route to send the client portal invitation, nor a route to post a message into the client's portal inbox. Please confirm whether they exist, and whether documents uploaded via API appear in the client portal.

4. Language: Spanish everywhere (very important)
Our clients are in Spain and the whole experience must be in Spanish (Spain), with no English strings left.
- Is there a Spanish interface for the client portal, the mobile app, the login and invitation screens, and the automatic emails and SMS? If not, is it on your roadmap, and when?
- If not, can we override EVERY client-facing text ourselves: menus, buttons, labels, system messages, form "Next/Submit" texts, invoices, notification and email templates? Through settings, a translation file, custom CSS/JS, or the API?
- If parts can't be translated, which ones would remain in English?

Your website and support are in Spanish, but we could not confirm that the client portal, the Pabau Go app and the automatic emails are fully in Spanish.

5. Data protection. Our client processes health and genetic data (GDPR Article 9).
- Will you sign an EU GDPR Data Processing Agreement (not only UK GDPR or HIPAA BAA) that explicitly covers special-category health data, with Standard Contractual Clauses for any transfer outside the EU?
- Your Trust Centre mentions EU and US regions. Can our data be hosted in the EU, contractually? Your DPA is under UK GDPR: do you also offer an EU GDPR DPA with SCCs, given sub-processors in the US?
- List of sub-processors and their locations. Can AI features be disabled so no client data is sent to third-party AI providers?
- Certifications (ISO 27001, SOC 2), MFA for staff and clients, audit logs.
- Can we fully export all data (clients, forms, messages, files) and permanently delete a client via API, for the right to erasure and to avoid lock-in?

6. Company and service
- Uptime SLA, backup and restore policy, and how much notice you give before price or API changes.

Thanks a lot, and see you on Friday.

Best regards,
Raúl Artiles
Skilland · direccion@skilland.ai
```

## IntakeQ / PracticeQ

**Para:** (no hay correo público: «Schedule a demo» o el centro de soporte support.intakeq.com)

**Asunto:** Demo + API coverage, Spanish and EU data for a client-portal integration (health & wellness, Spain)

```
Hi IntakeQ team,

I'm Raúl Artiles from Skilland, a technology integrator. We're evaluating IntakeQ / PracticeQ as the client portal for a health & wellness client in Spain. The portal would be driven via your API by our own system, which already handles Stripe payments, Odoo and report generation.

We've been burnt before by a platform that started charging for its API mid-project. Before committing, we'd like a short demo call and written answers to the points below. Sorry for the length: we prefer to ask everything at once.

1. Pricing and commitment
- 2–3 practitioners, client portal, e-signature and custom branding. Is PracticeQ (or IntakeQ) the right plan, and at what price?
- Is the Developer API included in that plan at no extra cost, permanently? Can you commit in writing to the total price for 24–36 months, with a minimum notice period?
- The standard limit is 10 requests/minute and 500/day. What does it cost to raise it?

2. Developer access
- Can we get a sandbox or test account with the Developer API enabled, with no real data, to build and test the integration?
- Is there an API versioning and deprecation policy?

3. Building our client flow on your API. This is our flow. For each step, could you confirm it is possible via API and point us to the endpoint?
1) Create access after payment: create the client right after a Stripe payment in our system and give them portal access. Ideally we get the invitation link and send it in our own branded email, without your system sending its own.
2) Assign forms: a consent form with e-signature, a habits questionnaire, and a form where the client chooses "test at home" (with shipping address) or "test at the clinic" (with an appointment).
3) Form status: know when each form is completed and read the answers (webhook preferred).
4) Send messages: post milestone messages into the client's inbox in their portal, with an email notification.
5) Read new messages: list new messages written by the client (webhook, or polling "since a timestamp").
6) Publish the report: upload a PDF and share it with that client only, visible and downloadable in their portal, with a notification.
7) Case status: set tags, statuses or custom fields on the client (e.g. case phase, kit code) via API, visible to our staff.
8) Appointments (optional): can clients book an in-person appointment from the portal, and can we read or create bookings via API?
Also: are webhook deliveries signed (HMAC or similar)? Is there an idempotency key or an external-ID field so retries don't create duplicate clients? Could we build our own client-facing front-end on top of your API, with client-level authentication (e.g. magic link)?

What we already saw: the Client API, POST /intakes/send, GET /intakes/[id] and its PDFs, the Appointments and Files articles, and a webhook for "Intake Submitted". We did NOT find API endpoints to send or read portal messages, to upload a document to a client's portal, or to invite a client to the portal. Please confirm whether they exist, and which other webhook events are available.

4. Language: Spanish everywhere (very important)
Our clients are in Spain and the whole experience must be in Spanish (Spain), with no English strings left.
- Is there a Spanish interface for the client portal, the mobile app, the login and invitation screens, and the automatic emails and SMS? If not, is it on your roadmap, and when?
- If not, can we override EVERY client-facing text ourselves: menus, buttons, labels, system messages, form "Next/Submit" texts, invoices, notification and email templates? Through settings, a translation file, custom CSS/JS, or the API?
- If parts can't be translated, which ones would remain in English?

Your help center says forms can be set to Spanish, but the content must be translated manually, and it is unclear whether the portal interface and the automatic emails can be shown in Spanish.

5. Data protection. Our client processes health and genetic data (GDPR Article 9).
- Will you sign an EU GDPR Data Processing Agreement (not only UK GDPR or HIPAA BAA) that explicitly covers special-category health data, with Standard Contractual Clauses for any transfer outside the EU?
- Where is our data hosted (Canada?), and can that be fixed contractually? Canada has an EU adequacy decision for commercial organisations: please confirm your data stays in Canada, including backups and sub-processors.
- List of sub-processors and their locations. Can AI features be disabled so no client data is sent to third-party AI providers?
- Certifications (ISO 27001, SOC 2), MFA for staff and clients, audit logs.
- Can we fully export all data (clients, forms, messages, files) and permanently delete a client via API, for the right to erasure and to avoid lock-in?

6. Company and service
- Uptime SLA, backup and restore policy, and how much notice you give before price or API changes.

Thanks a lot. Happy to jump on a call this week.

Best regards,
Raúl Artiles
Skilland · direccion@skilland.ai
```
