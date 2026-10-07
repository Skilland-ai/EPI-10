<?php

/**
 * Módulo EPI10 para OpenEMR (prototipo SKI2-207).
 *
 * Todo se engancha por eventos del module manager; no se toca el núcleo:
 *  - tema EPI10 del portal y del back office (StyleFilterEvent, LogoFilterEvent, plantillas Twig sobrescritas);
 *  - tarjeta de venta adicional en el panel del portal (RenderEvent);
 *  - menú simplificado del back office para el rol de operaciones (MenuEvent);
 *  - API propia para lo que la API estándar no cubre (RestApiCreateEvent + RestApiScopeEvent).
 */

use OpenEMR\Core\ModulesClassLoader;
use OpenEMR\Core\OEGlobalsBag;
use OpenEMR\Modules\Epi10\Bootstrap;

$classLoader = new ModulesClassLoader(OEGlobalsBag::getInstance()->getProjectDir());
$classLoader->registerNamespaceIfNotExists('OpenEMR\\Modules\\Epi10\\', __DIR__ . DIRECTORY_SEPARATOR . 'src');

(new Bootstrap(OEGlobalsBag::getInstance()->getKernel()->getEventDispatcher()))->subscribeToEvents();
