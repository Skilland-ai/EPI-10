-- Borra las citas de prueba que deja prueba_citas.mjs (canceladas por la propia prueba) en la ficha de Lucía (pid 1).
DELETE FROM openemr_postcalendar_events WHERE pc_pid = '1' AND pc_title = 'Cita EPI10' AND pc_apptstatus = 'x';
DELETE FROM pnotes WHERE pid = 1 AND (body LIKE '%Reserva desde el portal:%' OR body LIKE '%Cancelación desde el portal:%');
