<?php

// Laboratorio del área 4 (portal). Mismo controlador que oe-module-epi10-ui/public/portal/. El pid sale de la sesión.
use OpenEMR\Modules\Epi10Ui\Biblioteca\Paginas;

$landingpage = '../index.php?site=default';
require_once __DIR__ . '/../verify_session.php';
require_once __DIR__ . '/cargar.php';

Paginas::pdf((int)$pid, (int)($_GET['id'] ?? 0), !empty($_GET['descargar']));
