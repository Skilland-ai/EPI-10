-- Registro del módulo en el module manager (equivale a Módulos > Gestionar módulos > Registrar + Instalar + Activar).
INSERT INTO modules (mod_name, mod_directory, mod_parent, mod_type, mod_active, mod_ui_name, mod_relative_link, mod_ui_order,
                     mod_ui_active, mod_description, mod_nick_name, mod_enc_menu, directory, date, sql_run, type, sql_version, acl_version)
SELECT 'EPI10 Salud', 'oe-module-epi10', '', '', 1, 'EPI10 Salud', '', 0, 0, 'Tema EPI10 del portal y back office, y API propia del monolito',
       'epi10', 'no', '', NOW(), 1, 0, '0', '0'
WHERE NOT EXISTS (SELECT 1 FROM modules WHERE mod_directory = 'oe-module-epi10');
UPDATE modules SET mod_active = 1 WHERE mod_directory = 'oe-module-epi10';
