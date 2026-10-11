-- Categoría de cita «Cita EPI10» (30 min) en la agenda de OpenEMR: la que crea el portal y la que ve el equipo.
INSERT INTO openemr_postcalendar_categories
  (pc_constant_id, pc_catname, pc_catcolor, pc_catdesc, pc_recurrtype, pc_recurrspec, pc_recurrfreq, pc_duration,
   pc_end_date_flag, pc_end_date_type, pc_end_date_freq, pc_end_all_day, pc_dailylimit, pc_cattype, pc_active, pc_seq, aco_spec)
SELECT 'epi10_cita', 'Cita EPI10', '#80dff1', 'Cita reservada desde el portal de EPI10', 0,
       'a:5:{s:17:"event_repeat_freq";s:1:"0";s:22:"event_repeat_freq_type";s:1:"0";s:19:"event_repeat_on_num";s:1:"1";s:19:"event_repeat_on_day";s:1:"0";s:20:"event_repeat_on_freq";s:1:"0";}',
       0, 1800, 0, 0, 0, 0, 0, 0, 1, 1, 'encounters|notes'
WHERE NOT EXISTS (SELECT 1 FROM openemr_postcalendar_categories WHERE pc_constant_id = 'epi10_cita');
SELECT pc_catid, pc_catname, pc_duration FROM openemr_postcalendar_categories WHERE pc_constant_id = 'epi10_cita';
