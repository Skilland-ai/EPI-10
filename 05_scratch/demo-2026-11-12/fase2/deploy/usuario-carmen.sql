-- Usuario «carmen» del back office, clon de operaciones.prueba (id 5). @hash lo pone el script.
START TRANSACTION;
SET @uid := (SELECT MAX(id) + 1 FROM users);
CREATE TEMPORARY TABLE tmp_u SELECT * FROM users WHERE id = 5;
UPDATE tmp_u SET id = @uid, uuid = UNHEX(REPLACE(UUID(), '-', '')), username = 'carmen', fname = 'Carmen', lname = '', mname = '', email = NULL, info = 'Usuario de la demo de la fase 2 (EPI10).';
INSERT INTO users SELECT * FROM tmp_u;
DROP TEMPORARY TABLE tmp_u;
INSERT INTO users_secure (id, username, password, last_update_password, login_fail_counter, total_login_fail_counter, auto_block_emailed)
  VALUES (@uid, 'carmen', @hash, NOW(), 0, 0, 0);
INSERT INTO `groups` (name, user) VALUES ('Default', 'carmen');
UPDATE gacl_aro_seq SET id = id + 1;
SET @aro := (SELECT id FROM gacl_aro_seq);
INSERT INTO gacl_aro (id, section_value, value, order_value, name, hidden) VALUES (@aro, 'users', 'carmen', 10, 'Carmen', 0);
INSERT INTO gacl_groups_aro_map (group_id, aro_id) SELECT group_id, @aro FROM gacl_groups_aro_map WHERE aro_id = 12;
INSERT INTO user_settings (setting_user, setting_label, setting_value) SELECT @uid, setting_label, setting_value FROM user_settings WHERE setting_user = 5;
COMMIT;
SELECT u.id, u.username, u.fname, u.main_menu_role, u.facility_id, u.active, s.last_update_password, a.id aro, m.group_id
  FROM users u JOIN users_secure s ON s.id = u.id JOIN gacl_aro a ON a.value = u.username JOIN gacl_groups_aro_map m ON m.aro_id = a.id WHERE u.username = 'carmen';
