#!/bin/sh
# Ejecuta SQL en la base openemr con root (contraseña desde el entorno del contenedor).
# Uso: ./oe-sql.sh "SELECT 1"   o   echo "SELECT 1" | ./oe-sql.sh
if [ -n "$1" ]; then
  printf '%s\n' "$1" | docker exec -i epi10-openemr-prueba-mysql-1 sh -c 'mariadb -uroot -p"$MYSQL_ROOT_PASSWORD" openemr'
else
  docker exec -i epi10-openemr-prueba-mysql-1 sh -c 'mariadb -uroot -p"$MYSQL_ROOT_PASSWORD" openemr'
fi
