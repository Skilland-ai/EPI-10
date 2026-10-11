<?php

// Laboratorio del área 4 (back office). Mismo controlador que oe-module-epi10-ui/public/backoffice/.
use OpenEMR\Common\Session\SessionWrapperFactory;
use OpenEMR\Modules\Epi10Ui\Biblioteca\Paginas;

require_once __DIR__ . '/../../../vendor/autoload.php';
SessionWrapperFactory::getInstance()->getCoreSession(); // sesión del equipo, aunque la ruta esté bajo /portal/
$ignoreAuth = false;
require_once __DIR__ . '/../../../interface/globals.php';
require_once __DIR__ . '/../cargar.php';

Paginas::exigirEquipo(false);
$pid = Paginas::pidDePeticion();
Paginas::pdfEquipo($pid);
