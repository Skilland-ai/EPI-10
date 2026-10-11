<?php

/**
 * API JSON del calendario de citas del portal, con la sesión de la clienta (no OAuth ni contrato v1).
 *
 *   GET  ?accion=resumen                 huecos libres y mis citas
 *   POST {accion: 'reservar', fecha, hora}
 *   POST {accion: 'cancelar', id}
 * Las escrituras exigen la cabecera X-CSRF-Token (asunto 'epi10-citas').
 */

use OpenEMR\Common\Csrf\CsrfUtils;
use OpenEMR\Modules\Epi10Ui\Citas\Agenda;
use OpenEMR\Modules\Epi10Ui\Citas\ErrorCita;

// Sin sesión válida, verify_session.php redirige al login: el JS lo trata como «sesión caducada».
$landingpage = '../../../../../../portal/index.php?site=' . urlencode((string)($_GET['site'] ?? 'default'));
require_once __DIR__ . '/../../../../../../portal/verify_session.php';
/** @var int|string $pid lo fija verify_session.php */
/** @var \OpenEMR\Common\Session\SessionInterface $session */
require_once $GLOBALS['srcdir'] . '/appointments.inc.php';
require_once $GLOBALS['srcdir'] . '/pnotes.inc.php';
require_once __DIR__ . '/../../src/Citas/ErrorCita.php';
require_once __DIR__ . '/../../src/Citas/Agenda.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function responder(array $datos, int $estado = 200): never
{
    http_response_code($estado);
    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
    exit;
}

$agenda = new Agenda();
$pid = (int)$pid;

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $desde = date('Y-m-d');
        $hasta = date('Y-m-d', strtotime('+' . (int)$agenda->ajuste('dias_reservables', 60) . ' days'));
        responder([
            'hoy' => $desde,
            'hasta' => $hasta,
            'duracion' => $agenda->duracion(),
            'maximo' => (int)$agenda->ajuste('maximo_citas_futuras', 1),
            'huecos' => (object)$agenda->huecos($desde, $hasta),
            'citas' => $agenda->misCitas($pid),
        ]);
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        responder(['error' => 'metodo', 'mensaje' => 'Método no permitido.'], 405);
    }
    if (!CsrfUtils::verifyCsrfToken((string)($_SERVER['HTTP_X_CSRF_TOKEN'] ?? ''), $session, 'epi10-citas')) {
        responder(['error' => 'csrf', 'mensaje' => 'Tu sesión ha cambiado. Recarga la página.'], 403);
    }
    $datos = json_decode((string)file_get_contents('php://input'), true);
    $datos = is_array($datos) ? $datos : [];

    switch ($datos['accion'] ?? '') {
        case 'reservar':
            $cita = $agenda->reservar($pid, (string)($datos['fecha'] ?? ''), (string)($datos['hora'] ?? ''));
            responder(['cita' => $cita, 'citas' => $agenda->misCitas($pid)], 201);
        case 'cancelar':
            $agenda->cancelar($pid, (int)($datos['id'] ?? 0));
            responder(['ok' => true, 'citas' => $agenda->misCitas($pid)]);
        default:
            responder(['error' => 'accion', 'mensaje' => 'Acción desconocida.'], 400);
    }
} catch (ErrorCita $e) {
    responder(['error' => $e->codigo, 'mensaje' => $e->getMessage()], 409);
} catch (\Throwable $e) {
    error_log('epi10 citas: ' . $e->getMessage());
    responder(['error' => 'interno', 'mensaje' => 'No hemos podido completar la operación. Inténtalo de nuevo.'], 500);
}
