#!/bin/sh
# Ejecuta un script PHP (por stdin) dentro del contenedor de OpenEMR como el usuario del servidor web (apache),
# con el bootstrap de OpenEMR cargado ($ignoreAuth, sitio default). Uso: ./oe-php.sh < script.php
C=epi10-openemr-prueba-openemr-1
docker exec -i -u apache "$C" sh -c 'mkdir -p /tmp/oe_cli && cat > /tmp/oe_cli/body.php'
docker exec -u apache "$C" sh -c 'cat > /tmp/oe_cli/run.php <<"PHP"
<?php
$_GET["site"] = "default"; $ignoreAuth = true; $sessionAllowWrite = true;
require_once "/var/www/localhost/htdocs/openemr/interface/globals.php";
require "/tmp/oe_cli/body.php";
PHP
cd /var/www/localhost/htdocs/openemr && php /tmp/oe_cli/run.php'
