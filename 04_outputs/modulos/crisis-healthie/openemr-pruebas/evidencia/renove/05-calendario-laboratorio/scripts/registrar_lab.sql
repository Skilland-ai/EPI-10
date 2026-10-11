-- Registra y activa el laboratorio del área 5 en el module manager (sin UI ni eventos).
INSERT INTO modules (mod_name, mod_directory, mod_parent, mod_type, mod_active, mod_ui_name, mod_relative_link, mod_ui_order,
                     mod_ui_active, mod_description, mod_nick_name, mod_enc_menu, directory, date, sql_run, type, sql_version, acl_version)
SELECT 'EPI10 laboratorio citas', 'epi10-lab-5', '', '', 1, 'EPI10 laboratorio citas', '', 0, 0,
       'Prototipo aislado del calendario de citas del portal (SKI2-235)', 'epi10lab5', 'no', '', NOW(), 1, 0, '0', '0'
WHERE NOT EXISTS (SELECT 1 FROM modules WHERE mod_directory = 'epi10-lab-5');
UPDATE modules SET mod_active = 1 WHERE mod_directory = 'epi10-lab-5';
