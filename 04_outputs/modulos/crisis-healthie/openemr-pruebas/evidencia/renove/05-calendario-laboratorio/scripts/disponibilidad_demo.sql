-- Disponibilidad ficticia para la demo: el equipo (users.id = 1) «En consulta» de lunes a viernes,
-- 09:00–14:00 y 16:00–19:00, durante un año. Es configuración de agenda de OpenEMR (datos), no núcleo.
-- Se reconoce por pc_title = 'Disponibilidad EPI10 (demo)' y se quita con disponibilidad_demo_quitar.sql.
SET @spec = 'a:5:{s:17:"event_repeat_freq";s:1:"1";s:22:"event_repeat_freq_type";s:1:"4";s:19:"event_repeat_on_num";s:1:"1";s:19:"event_repeat_on_day";s:1:"0";s:20:"event_repeat_on_freq";s:1:"0";}';
SET @lunes = CURDATE() - INTERVAL WEEKDAY(CURDATE()) DAY; -- lunes de esta semana: la primera aparición no cae en fin de semana
SET @loc = 'a:6:{s:14:"event_location";s:0:"";s:13:"event_street1";s:0:"";s:13:"event_street2";s:0:"";s:10:"event_city";s:0:"";s:11:"event_state";s:0:"";s:12:"event_postal";s:0:"";}';
DELETE FROM openemr_postcalendar_events WHERE pc_title = 'Disponibilidad EPI10 (demo)';
INSERT INTO openemr_postcalendar_events
  (pc_catid, pc_multiple, pc_aid, pc_pid, pc_title, pc_time, pc_hometext, pc_informant, pc_eventDate, pc_endDate, pc_duration,
   pc_recurrtype, pc_recurrspec, pc_recurrfreq, pc_startTime, pc_endTime, pc_alldayevent, pc_location,
   pc_eventstatus, pc_sharing, pc_apptstatus, pc_facility, pc_billing_location)
VALUES
  (2, 0, 1, '', 'Disponibilidad EPI10 (demo)', NOW(), '', 1, @lunes, DATE_ADD(@lunes, INTERVAL 1 YEAR), 0, 1, @spec, 0, '09:00:00', '09:00:00', 0, @loc, 1, 1, '-', 3, 3),
  (3, 0, 1, '', 'Disponibilidad EPI10 (demo)', NOW(), '', 1, @lunes, DATE_ADD(@lunes, INTERVAL 1 YEAR), 0, 1, @spec, 0, '14:00:00', '14:00:00', 0, @loc, 1, 1, '-', 3, 3),
  (2, 0, 1, '', 'Disponibilidad EPI10 (demo)', NOW(), '', 1, @lunes, DATE_ADD(@lunes, INTERVAL 1 YEAR), 0, 1, @spec, 0, '16:00:00', '16:00:00', 0, @loc, 1, 1, '-', 3, 3),
  (3, 0, 1, '', 'Disponibilidad EPI10 (demo)', NOW(), '', 1, @lunes, DATE_ADD(@lunes, INTERVAL 1 YEAR), 0, 1, @spec, 0, '19:00:00', '19:00:00', 0, @loc, 1, 1, '-', 3, 3);
SELECT pc_eid, pc_catid, pc_startTime, pc_eventDate, pc_endDate FROM openemr_postcalendar_events WHERE pc_title = 'Disponibilidad EPI10 (demo)';
