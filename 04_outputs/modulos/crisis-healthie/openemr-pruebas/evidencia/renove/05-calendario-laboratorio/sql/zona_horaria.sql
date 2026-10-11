-- Zona horaria de la instancia (decisión del orquestador con SKI2-210, 11 oct): España peninsular.
-- OpenEMR la aplica en globals.php a PHP y a la sesión de MariaDB. Lo guardado antes del cambio queda en UTC.
UPDATE globals SET gl_value = 'Europe/Madrid' WHERE gl_name = 'gbl_time_zone';
SELECT gl_name, gl_value FROM globals WHERE gl_name = 'gbl_time_zone';
