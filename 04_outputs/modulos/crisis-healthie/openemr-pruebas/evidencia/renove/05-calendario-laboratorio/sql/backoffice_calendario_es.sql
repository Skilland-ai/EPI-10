-- Área 5 (SKI2-235) · limpieza del calendario del back office (2.6). Datos y traducciones, sin núcleo.
-- 1) Nombre del centro: lo enseña la leyenda del calendario y el lugar de la cita en el portal.
UPDATE facility SET name = 'EPI10 Salud' WHERE name = 'Your Clinic Name Here';

-- 2) Traducciones propias al español (España). Mismo patrón que oe-module-epi10/sql/traducciones_es.sql:
--    lang_definitions + lang_custom (OpenEMR las reaplica al sincronizar idiomas). Solo estas constantes.
--    Son globales: «Facultativos» pasa a «Equipo» en toda la app. El área 0 las consolida en i18n/openemr_es.tsv.
SET @lang := (SELECT lang_id FROM lang_languages WHERE lang_description = 'Spanish (Spain)' LIMIT 1);
DROP TEMPORARY TABLE IF EXISTS epi10_tr5;
CREATE TEMPORARY TABLE epi10_tr5 (c VARCHAR(255) COLLATE utf8mb4_general_ci, d VARCHAR(255) COLLATE utf8mb4_general_ci);
INSERT INTO epi10_tr5 VALUES
 ('Providers', 'Equipo'), ('Provider', 'Profesional'), ('All Users', 'Todo el equipo'),
 ('In Office', 'En consulta'), ('Out Of Office', 'Fuera de consulta'), ('IN', 'En consulta'), ('OUT', 'Fuera de consulta');
INSERT INTO lang_constants (constant_name)
  SELECT t.c FROM epi10_tr5 t WHERE NOT EXISTS (SELECT 1 FROM lang_constants lc WHERE lc.constant_name = t.c);
DELETE d FROM lang_definitions d JOIN lang_constants lc ON lc.cons_id = d.cons_id JOIN epi10_tr5 t ON t.c = lc.constant_name WHERE d.lang_id = @lang;
INSERT INTO lang_definitions (cons_id, lang_id, definition)
  SELECT MIN(lc.cons_id), @lang, t.d FROM epi10_tr5 t JOIN lang_constants lc ON lc.constant_name = t.c GROUP BY t.c, t.d;
DELETE lcu FROM lang_custom lcu JOIN epi10_tr5 t ON t.c = lcu.constant_name WHERE lcu.lang_description = 'Spanish (Spain)';
INSERT INTO lang_custom (lang_description, lang_code, constant_name, definition)
  SELECT 'Spanish (Spain)', 'es', t.c, t.d FROM epi10_tr5 t;
DROP TEMPORARY TABLE epi10_tr5;
