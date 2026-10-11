<?php

/**
 * Laboratorio del área 4 (SKI2-234) en /portal/epi10-lab-4/: el MISMO código del módulo
 * (oe-module-epi10-ui/src/Biblioteca, sus plantillas e islas), copiado aquí por scripts/desplegar-lab-4.sh,
 * sin instalar nada en el módulo ni tocar vistas existentes.
 *
 * Diferencias con el módulo: las rutas apuntan a las páginas del laboratorio y las plantillas se pintan con
 * `epi10.ui` apuntando a ./ui (copia de public/ui con epi10-biblioteca.css, las islas nuevas y PDF.js).
 * Requiere instalados oe-module-epi10 (contrato 1.0.0, PR #1) y oe-module-epi10-ui (área 0).
 */

use OpenEMR\Common\Csrf\CsrfUtils;
use OpenEMR\Common\Session\SessionWrapperFactory;
use OpenEMR\Common\Twig\TwigContainer;
use OpenEMR\Core\OEGlobalsBag;
use OpenEMR\Events\Core\TwigEnvironmentEvent;
use OpenEMR\Modules\Epi10Ui\Biblioteca\Paginas;
use OpenEMR\Modules\Epi10Ui\Bootstrap;
use OpenEMR\Modules\Epi10Ui\Vista;
use Twig\Loader\FilesystemLoader;

foreach (['Esquema', 'Fecha', 'Biblioteca', 'Pdf', 'FichaDocumentos', 'Paginas'] as $clase) {
    require_once __DIR__ . '/src/Biblioteca/' . $clase . '.php';
}

$labWeb = OEGlobalsBag::getInstance()->getString('webroot') . '/portal/epi10-lab-4';
Paginas::$rutas = [
    'biblioteca' => $labWeb . '/index.php',
    'documento' => $labWeb . '/documento.php',
    'pdf' => $labWeb . '/pdf.php',
    'novedades' => $labWeb . '/novedades.php',
    'ver' => $labWeb . '/equipo/ver-documento.php',
    'pdf_equipo' => $labWeb . '/equipo/pdf.php',
    'accion' => $labWeb . '/equipo/accion.php',
    'ficha' => $labWeb . '/equipo/documentos.php',
];

Paginas::$pintar = static function (string $cara, string $plantilla, array $vars) use ($labWeb): string {
    $session = SessionWrapperFactory::getInstance()->getActiveSession();
    $web = OEGlobalsBag::getInstance()->getString('webroot');
    $kernel = OEGlobalsBag::getInstance()->getKernel();
    // Las plantillas del laboratorio ganan a las del módulo instalado.
    $kernel->getEventDispatcher()->addListener(TwigEnvironmentEvent::EVENT_CREATED, static function (TwigEnvironmentEvent $e): void {
        $loader = $e->getTwigEnvironment()->getLoader();
        if ($loader instanceof FilesystemLoader) {
            $loader->prependPath(__DIR__ . '/templates/epi10', 'epi10');
        }
    }, -200);
    if ($cara === 'portal') {
        $base = [
            'cara' => 'portal',
            'usuario' => Vista::usuario((string)($session->get('ptName') ?? '')),
            'inicio_url' => $web . '/portal/home.php',
            'menu_usuario' => [
                ['texto' => 'Cerrar sesión', 'icono' => 'log-out', 'url' => $web . '/portal/logout.php', 'id' => 'salir', 'peligro' => true],
            ],
        ];
    } else {
        $u = sqlQuery('SELECT fname, lname FROM users WHERE username = ?', [(string)$session->get('authUser', '')]) ?: [];
        $base = [
            'cara' => 'backoffice',
            'usuario' => Vista::usuario(trim(($u['fname'] ?? '') . ' ' . ($u['lname'] ?? ''))),
            'inicio_url' => $web . '/interface/main/tabs/main.php',
            'menu_usuario' => [],
        ];
    }
    $vars = array_replace($base, $vars);
    $vars['csrf'] ??= CsrfUtils::collectCsrfToken(session: $session);
    $twig = (new TwigContainer(null, $kernel))->getTwig();
    $vars['epi10'] = array_replace(Bootstrap::contextoGlobal(), ['ui' => $labWeb . '/ui', 'v' => 'lab4-' . filemtime(__DIR__ . '/cargar.php')]);
    return $twig->render($plantilla, $vars);
};
