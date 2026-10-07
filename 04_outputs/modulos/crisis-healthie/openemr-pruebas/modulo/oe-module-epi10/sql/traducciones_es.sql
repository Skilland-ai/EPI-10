-- Traducciones personalizadas al español (España) del portal EPI10.
-- Se guardan como definiciones propias (lang_definitions) y en lang_custom, que es lo que OpenEMR
-- vuelve a aplicar tras actualizar sus tablas de idioma (Administración > Idioma > Sincronizar).
SET @lang := (SELECT lang_id FROM lang_languages WHERE lang_description = 'Spanish (Spain)' LIMIT 1);
DROP TEMPORARY TABLE IF EXISTS epi10_tr;
CREATE TEMPORARY TABLE epi10_tr (c VARCHAR(255) COLLATE utf8mb4_general_ci, d VARCHAR(255) COLLATE utf8mb4_general_ci);
INSERT INTO epi10_tr VALUES
 ('Dashboard','Tu espacio EPI10'), ('Clinical Documents','Mis documentos'), ('Secure Messaging','Mensajes'),
 ('Medical Reports','Mi informe'), ('Health Snapshot','Resumen'), ('Profile','Mi perfil'), ('Billing Summary','Pagos'),
 ('Settings','Ajustes'), ('Help','Ayuda'), ('Logout','Cerrar sesión'), ('Appointments','Citas'),
 ('Compose Message','Escribir mensaje'), ('Select Form','Elegir documento'), ('Save as Draft','Guardar borrador'),
 ('Submit Completed','Enviar a EPI10'), ('Activities','Historial'), ('Exit to Dashboard','Volver a mi espacio'),
 ('Documents and Forms','Documentos y cuestionarios'), ('Reload','Recargar'), ('Dismiss Form','Cerrar'),
 ('Sign','Firmar'), ('E-Mail Address','Correo electrónico'), ('Portal Login','· Mi espacio'),
 ('Patient Portal Login','Acceso a Mi espacio EPI10'), ('Yes','Sí'), ('Download','Descargar'), ('Editing','Editando'),
 ('Form Name','Documento'), ('Sent','Enviados'), ('Inbox','Recibidos'), ('Archive','Archivados'), ('All','Todos'),
 ('Actions','Acciones'), ('Customized Medical History Report','Resumen de mi historial'), ('Download Medical Record Documents','Descargar mis documentos'), ('Select Documents to Download','Elige los documentos que quieres descargar'), ('Select All Documents','Seleccionar todos'), ('Download Selected Documents','Descargar seleccionados'), ('Delete Document','Borrar documento'), ('In Review','En revisión'), ('Chart History','Historial'), ('Send','Enviar'), ('Reply','Responder'), ('Forward','Reenviar');
INSERT INTO lang_constants (constant_name)
  SELECT t.c FROM epi10_tr t WHERE NOT EXISTS (SELECT 1 FROM lang_constants lc WHERE lc.constant_name = t.c);
DELETE d FROM lang_definitions d JOIN lang_constants lc ON lc.cons_id = d.cons_id JOIN epi10_tr t ON t.c = lc.constant_name WHERE d.lang_id = @lang;
INSERT INTO lang_definitions (cons_id, lang_id, definition)
  SELECT MIN(lc.cons_id), @lang, t.d FROM epi10_tr t JOIN lang_constants lc ON lc.constant_name = t.c GROUP BY t.c, t.d;
DELETE lcu FROM lang_custom lcu JOIN epi10_tr t ON t.c = lcu.constant_name WHERE lcu.lang_description = 'Spanish (Spain)';
INSERT INTO lang_custom (lang_description, lang_code, constant_name, definition)
  SELECT 'Spanish (Spain)', 'es', t.c, t.d FROM epi10_tr t;
UPDATE globals SET gl_value = 'EPI10 Salud' WHERE gl_name = 'openemr_name';
UPDATE globals SET gl_value = 'Back office de EPI10 Salud' WHERE gl_name = 'login_tagline_text';
DROP TEMPORARY TABLE epi10_tr;
