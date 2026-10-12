#!/bin/sh
# Limpia de la instancia de hermes-node las pacientes de PRUEBA creadas por los agentes (7 y 11 oct), para que el
# back office de la demo no enseñe 30 «Marta … Ficticia». Reversible: cada fila se copia antes a epi10_limpieza_bak_<tabla>.
# Conserva SIEMPRE a Lucía (pid 1) con su informe, mensajes y documentos. No toca el registro de auditoría (log),
# ni los archivos de los documentos en disco, ni reinicia OpenEMR.
#
#   ./limpiar_pacientes_prueba.sh contar      → cuántas filas se tocarían, por tabla (no cambia nada)
#   ./limpiar_pacientes_prueba.sh limpiar     → respalda y borra
#   ./limpiar_pacientes_prueba.sh restaurar   → devuelve todo lo respaldado (INSERT IGNORE) y deja los respaldos
#   ./limpiar_pacientes_prueba.sh soltar      → borra las tablas de respaldo (solo cuando ya no haga falta volver atrás)
set -eu
MODO=${1:?contar | limpiar | restaurar | soltar}
DB=${DB:-epi10-openemr-prueba-mysql-1}
# Lista EXPLÍCITA de pids de prueba (patient_data del 11 oct, 20:57). Nunca el 1.
PIDS=${PIDS:-"2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35"}  # se puede pasar PIDS="9102 9103" por entorno

# tabla:columna con pid (o usuario del portal, «u:»)
TABLAS="patient_data:pid patient_access_onsite:pid onetime_auth:pid onsite_documents:pid onsite_signatures:pid
onsite_portal_activity:patient_id document_templates:pid forms:pid form_questionnaire_assessments:pid
questionnaire_response:patient_id pnotes:pid openemr_postcalendar_events:pc_pid documents:foreign_id
epi10_referencias:pid epi10_mensajes_enviados:pid epi10_informes_publicados:pid epi10_informes_validados:pid
epi10_documentos_vistos:pid"

sql() { ssh hermes-node "docker exec -i $DB sh -c 'mariadb -uroot -p\"\$MYSQL_ROOT_PASSWORD\" openemr'"; }
existe() { echo "SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='$1';" | sql | tail -1; }

preparar() {
  echo "CREATE TEMPORARY TABLE IF NOT EXISTS epi10_limpieza_pids (pid BIGINT NOT NULL PRIMARY KEY, usuario VARCHAR(255) NULL);"
  for p in $PIDS; do echo "INSERT IGNORE INTO epi10_limpieza_pids (pid) VALUES ($p);"; done
  echo "DELETE FROM epi10_limpieza_pids WHERE pid = 1;"
  echo "UPDATE epi10_limpieza_pids l JOIN patient_access_onsite a ON a.pid = l.pid SET l.usuario = a.portal_username WHERE l.usuario IS NULL;"
  # Ningún usuario del portal de la lista puede ser el de Lucía.
  echo "UPDATE epi10_limpieza_pids SET usuario = NULL WHERE usuario IN (SELECT portal_username FROM patient_access_onsite WHERE pid = 1);"
}

donde() { # $1 tabla, $2 columna → condición WHERE
  echo "\`$2\` IN (SELECT pid FROM epi10_limpieza_pids)"
}

case "$MODO" in
contar)
  { preparar
    for tc in $TABLAS; do t=${tc%%:*}; c=${tc#*:}
      echo "SELECT '$t' tabla, COUNT(*) filas FROM \`$t\` WHERE $(donde $t $c);"; done
    echo "SELECT 'categories_to_documents' tabla, COUNT(*) filas FROM categories_to_documents WHERE document_id IN (SELECT id FROM documents WHERE foreign_id IN (SELECT pid FROM epi10_limpieza_pids));"
    echo "SELECT 'onsite_mail' tabla, COUNT(*) filas FROM onsite_mail WHERE recipient_id IN (SELECT usuario FROM epi10_limpieza_pids WHERE usuario IS NOT NULL) OR sender_id IN (SELECT usuario FROM epi10_limpieza_pids WHERE usuario IS NOT NULL);"
    echo "SELECT 'Lucía (pid 1) intacta' comprobacion, (SELECT COUNT(*) FROM patient_data WHERE pid=1) paciente, (SELECT COUNT(*) FROM documents WHERE foreign_id=1) documentos, (SELECT COUNT(*) FROM onsite_documents WHERE pid=1) onsite;"
  } | sql ;;
limpiar)
  { preparar
    echo "START TRANSACTION;"
    echo "CREATE TABLE IF NOT EXISTS epi10_limpieza_bak_categories_to_documents LIKE categories_to_documents;"
    echo "INSERT IGNORE INTO epi10_limpieza_bak_categories_to_documents SELECT * FROM categories_to_documents WHERE document_id IN (SELECT id FROM documents WHERE foreign_id IN (SELECT pid FROM epi10_limpieza_pids));"
    echo "CREATE TABLE IF NOT EXISTS epi10_limpieza_bak_onsite_mail LIKE onsite_mail;"
    echo "INSERT IGNORE INTO epi10_limpieza_bak_onsite_mail SELECT * FROM onsite_mail WHERE recipient_id IN (SELECT usuario FROM epi10_limpieza_pids WHERE usuario IS NOT NULL) OR sender_id IN (SELECT usuario FROM epi10_limpieza_pids WHERE usuario IS NOT NULL);"
    for tc in $TABLAS; do t=${tc%%:*}; c=${tc#*:}
      echo "CREATE TABLE IF NOT EXISTS epi10_limpieza_bak_$t LIKE \`$t\`;"
      echo "INSERT IGNORE INTO epi10_limpieza_bak_$t SELECT * FROM \`$t\` WHERE $(donde $t $c);"; done
    echo "DELETE FROM categories_to_documents WHERE document_id IN (SELECT id FROM epi10_limpieza_bak_documents);"
    echo "DELETE m FROM onsite_mail m JOIN epi10_limpieza_bak_onsite_mail b ON b.id = m.id;"
    for tc in $TABLAS; do t=${tc%%:*}; c=${tc#*:}
      echo "DELETE FROM \`$t\` WHERE $(donde $t $c);"; done
    echo "COMMIT;"
    echo "SELECT 'quedan pacientes' estado, COUNT(*) n FROM patient_data;"
  } | sql ;;
restaurar)
  { echo "START TRANSACTION;"
    for t in $(echo "$TABLAS" | tr ' ' '\n' | sed 's/:.*//') categories_to_documents onsite_mail; do
      echo "INSERT IGNORE INTO \`$t\` SELECT * FROM epi10_limpieza_bak_$t;"; done
    echo "COMMIT;"
    echo "SELECT 'pacientes tras restaurar' estado, COUNT(*) n FROM patient_data;"
  } | sql ;;
soltar)
  { for t in $(echo "$TABLAS" | tr ' ' '\n' | sed 's/:.*//') categories_to_documents onsite_mail; do
      echo "DROP TABLE IF EXISTS epi10_limpieza_bak_$t;"; done
    true; } | sql ;;
*) echo "modo desconocido: $MODO" >&2; exit 2 ;;
esac
