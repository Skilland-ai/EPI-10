-- Curación de datos aplicada a la copia del VPS (11 nov 2026) antes de la instantánea.
-- Todo ficticio. Las contraseñas no están aquí: Marta usa la misma que Lucía (se copia el hash).
UPDATE patient_data SET street='Calle Ficticia 22, 1.º A', postal_code='35001', city='Las Palmas de Gran Canaria', phone_cell='600000002', phone_home='' WHERE pid=9102;
UPDATE epi10_onboarding SET envio_direccion='Calle Ficticia 22, 1.º A', envio_cp='35001', envio_ciudad='Las Palmas de Gran Canaria', envio_telefono='600000002', envio_observaciones='Dato ficticio.' WHERE pid=9102;
UPDATE patient_data SET fname='Marta', lname='Ruiz Gómez (ficticia)', email='marta.ruiz@correo-ficticio.test', DOB=NULL WHERE pid=9103;
UPDATE patient_data SET fname='Ana', lname='Lozano Vidal (ficticia)', email='ana.lozano@correo-ficticio.test' WHERE pid=9104;
UPDATE epi10_onboarding SET envio_nombre='Ana Lozano Vidal', envio_direccion='Calle Ficticia 1' WHERE pid=9104;
UPDATE patient_data SET fname='Nuria' WHERE pid=9001;
UPDATE patient_access_onsite a JOIN patient_access_onsite l ON l.pid=1 SET a.portal_username='marta', a.portal_login_username='marta', a.portal_pwd=l.portal_pwd, a.portal_pwd_status=1 WHERE a.pid=9103;
UPDATE patient_access_onsite SET portal_login_username='ana.lozano@correo-ficticio.test' WHERE pid=9104;
UPDATE epi10_caso SET odoo_url='https://odoo.aporta-epi10.com/__entrar', informes_url='https://panel.aporta-epi10.com/__entrar?volver=/informes';
UPDATE globals SET gl_value='https://portal-propio.aporta-epi10.com/portal' WHERE gl_name='portal_onsite_two_address';
UPDATE globals SET gl_value='https://portal-propio.aporta-epi10.com' WHERE gl_name='site_addr_oath';
-- Mensajes: se borran los duplicados de las pruebas automáticas y el texto basura.
DELETE FROM onsite_mail WHERE id IN (24,25) OR id BETWEEN 30 AND 105 OR id IN (118,119);
UPDATE onsite_mail SET body='<p>Hola, ¿cuándo me llega el kit a casa?</p>' WHERE id IN (26,27);
UPDATE onsite_mail SET body='<p>Hola, Lucía. Te llega en 3–5 días laborables por mensajería. Te adjunto la guía del kit.</p><p><a href="adjunto.php?id=17" data-epi10-adjunto="17">Guia-kit-ficticia.pdf</a></p>' WHERE id IN (28,29);
UPDATE onsite_mail SET body='<p>Hola, Lucía. Ya tienes tu informe publicado en tu espacio. Si te surge cualquier duda al leerlo, escríbenos por aquí.</p>', date='2026-10-11 21:30:00' WHERE id IN (116,117);
UPDATE onsite_mail SET body='<p>Hola, me acabo de registrar. Solo quería saludaros.</p>' WHERE id IN (140,141);
UPDATE onsite_mail SET body='<p>Hola, Sofía. Encantados. Aquí nos tienes para lo que necesites.</p>' WHERE id IN (142,143);
UPDATE onsite_mail SET sender_name='Ana Lozano Vidal (ficticia)' WHERE sender_name='Marta Spot Ficticia';
UPDATE onsite_mail SET recipient_name='Ana Lozano Vidal (ficticia)' WHERE recipient_name='Marta Spot Ficticia';
UPDATE onsite_mail SET body=REPLACE(body,'Hola, Marta.','Hola, Ana.') WHERE id IN (154,155);
