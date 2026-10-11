<?php

/**
 * «Tus citas» del portal: calendario interactivo (isla Preact + Cally) sobre la agenda de OpenEMR.
 * Prototipo aislado del área 5 (SKI2-235). En la fase B se monta sobre el layout común del área 0.
 */

use OpenEMR\Common\Csrf\CsrfUtils;
use OpenEMR\Modules\Epi10Ui\Citas\Agenda;

$landingpage = '../../../../../../portal/index.php?site=' . urlencode((string)($_GET['site'] ?? 'default'));
require_once __DIR__ . '/../../../../../../portal/verify_session.php';
/** @var \OpenEMR\Common\Session\SessionInterface $session */
require_once __DIR__ . '/../../src/Citas/ErrorCita.php';
require_once __DIR__ . '/../../src/Citas/Agenda.php';

$agenda = new Agenda();
$centro = sqlQuery('SELECT name, street, city FROM facility ORDER BY id LIMIT 1') ?: [];
$lugar = $agenda->ajuste('lugar') ?? trim(implode(', ', array_filter([$centro['name'] ?? '', $centro['street'] ?? '', $centro['city'] ?? ''])));
$raiz = $GLOBALS['webroot'];
$props = [
    'api' => 'citas_api.php',
    'csrf' => CsrfUtils::collectCsrfToken($session, 'epi10-citas'),
    'lugar' => $lugar,
    'mensajes' => $raiz . '/portal/home.php#secure-msgs-card',
];
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Tus citas · EPI10</title>
    <link rel="stylesheet" href="<?php echo attr($raiz); ?>/interface/modules/custom_modules/oe-module-epi10/public/css/epi10-tokens.css">
    <link rel="stylesheet" href="../ui/css/epi10-citas.css">
    <script type="module" src="../ui/vendor/cally-0.9.2.js"></script>
    <script type="module" src="../ui/islas/calendario.mjs"></script>
</head>
<body class="epi-cal-pagina">
<header class="epi-cal-barra">
    <a class="epi-cal-volver" href="<?php echo attr($raiz); ?>/portal/home.php" data-epi10-citas="volver">
        <span aria-hidden="true">←</span> Tu espacio
    </a>
    <img class="epi-cal-logo" src="<?php echo attr($raiz); ?>/interface/modules/custom_modules/oe-module-epi10/public/img/epi10-azul.png" alt="EPI10">
</header>
<main class="epi-cal-main">
    <h1 class="epi-cal-titulo">Tus citas</h1>
    <p class="epi-cal-intro">Elige el día y la hora que mejor te vengan. Si te surge algo, puedes cancelarla aquí mismo.</p>
    <div data-epi10-isla="calendario" data-props="<?php echo attr(json_encode($props, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)); ?>">
        <p class="epi-cal-cargando">Cargando el calendario…</p>
    </div>
</main>
</body>
</html>
