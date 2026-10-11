-- Deshace backoffice_calendario_es.sql (vuelve a las traducciones de serie de OpenEMR tras «Sincronizar idiomas»).
UPDATE facility SET name = 'Your Clinic Name Here' WHERE name = 'EPI10 Salud';
DELETE FROM lang_custom WHERE lang_description = 'Spanish (Spain)' AND constant_name IN ('Providers','Provider','All Users','In Office','Out Of Office','IN','OUT');
