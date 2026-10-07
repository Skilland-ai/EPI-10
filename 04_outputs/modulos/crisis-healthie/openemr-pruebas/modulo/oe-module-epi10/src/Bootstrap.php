<?php

namespace OpenEMR\Modules\Epi10;

use OpenEMR\Core\OEGlobalsBag;
use OpenEMR\Events\Core\StyleFilterEvent;
use OpenEMR\Events\Core\TwigEnvironmentEvent;
use OpenEMR\Events\PatientPortal\RenderEvent;
use OpenEMR\Events\RestApiExtend\RestApiCreateEvent;
use OpenEMR\Events\RestApiExtend\RestApiScopeEvent;
use OpenEMR\Events\Services\LogoFilterEvent;
use OpenEMR\Menu\MenuEvent;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Twig\Loader\FilesystemLoader;

class Bootstrap
{
    public const MODULE_DIR = 'oe-module-epi10';

    /** Recursos de la API propia: cada uno da un scope user/<recurso>.(read|write). */
    public const API_RESOURCES = ['epi10_portal_access', 'epi10_portal_message', 'epi10_portal_template', 'epi10_changes'];

    public function __construct(private readonly EventDispatcherInterface $dispatcher)
    {
    }

    public function subscribeToEvents(): void
    {
        $this->dispatcher->addListener(StyleFilterEvent::EVENT_NAME, $this->addStyles(...));
        $this->dispatcher->addListener(LogoFilterEvent::EVENT_NAME, $this->replaceLogo(...));
        $this->dispatcher->addListener(TwigEnvironmentEvent::EVENT_CREATED, $this->addTemplateOverrides(...));
        $this->dispatcher->addListener(RenderEvent::EVENT_DASHBOARD_INJECT_CARD, $this->injectShopCard(...));
        $this->dispatcher->addListener(MenuEvent::MENU_UPDATE, $this->simplifyMenu(...));
        $this->dispatcher->addListener(RestApiCreateEvent::EVENT_HANDLE, $this->addRoutes(...));
        $this->dispatcher->addListener(RestApiScopeEvent::EVENT_TYPE_GET_SUPPORTED_SCOPES, $this->addScopes(...));
    }

    public static function webPath(string $relative): string
    {
        return OEGlobalsBag::getInstance()->getString('webroot') . '/interface/modules/custom_modules/'
            . self::MODULE_DIR . '/' . ltrim($relative, '/');
    }

    public static function config(): array
    {
        static $config = null;
        if ($config === null) {
            $file = __DIR__ . '/../config.php';
            $config = is_file($file) ? (require $file) : [];
        }
        return $config;
    }

    /** CSS de marca: portal (incluido el cuestionario incrustado) o back office. */
    public function addStyles(StyleFilterEvent $event): void
    {
        $script = (string)$event->getContextArgument(StyleFilterEvent::CONTEXT_ARGUMENT_SCRIPT_NAME);
        $styles = $event->getStyles();
        $styles[] = self::webPath('public/css/epi10-tokens.css');
        $session = \OpenEMR\Common\Session\SessionWrapperFactory::getInstance()->getActiveSession();
        $enPortal = str_contains($script, '/portal/')
            || (str_contains($script, 'questionnaire_assessments') && $session->get('patient_portal_onsite_two'));
        if ($enPortal) {
            $styles[] = self::webPath('public/css/epi10-portal.css');
            self::forceSpanishPortalSession();
        } else {
            $styles[] = self::webPath('public/css/epi10-backoffice.css');
        }
        $event->setStyles($styles);
    }

    /**
     * Las sesiones abiertas con enlace mágico (OneTimeAuth) no fijan idioma y OpenEMR cae en inglés (lang_id 1).
     * Se fija el idioma por defecto del sitio (Spanish (Spain)) en la sesión del portal.
     */
    private static function forceSpanishPortalSession(): void
    {
        $session = \OpenEMR\Common\Session\SessionWrapperFactory::getInstance()->getActiveSession();
        if ($session->get('patient_portal_onsite_two') && empty($session->get('language_choice'))) {
            $def = OEGlobalsBag::getInstance()->getString('language_default') ?: 'Spanish (Spain)';
            $row = sqlQuery('SELECT lang_id FROM lang_languages WHERE lang_description = ?', [$def]);
            if (!empty($row['lang_id'])) {
                $session->set('language_choice', (int)$row['lang_id']);
            }
        }
    }

    public function replaceLogo(LogoFilterEvent $event): void
    {
        $tipo = $event->getLogoType();
        if (str_starts_with($tipo, 'portal/') || str_starts_with($tipo, 'core/login/primary') || str_starts_with($tipo, 'core/menu')) {
            $event->setWebPath(self::webPath('public/img/epi10-azul.png'));
        }
    }

    /** Las plantillas de templates/ del módulo tienen prioridad sobre las del núcleo con la misma ruta. */
    public function addTemplateOverrides(TwigEnvironmentEvent $event): void
    {
        $loader = $event->getTwigEnvironment()->getLoader();
        if ($loader instanceof FilesystemLoader) {
            $loader->prependPath(\dirname(__DIR__) . DIRECTORY_SEPARATOR . 'templates');
        }
    }

    /** Venta adicional: tarjeta en el panel del portal que abre un Stripe Checkout / Payment Link. */
    public function injectShopCard(): void
    {
        $url = self::config()['tienda_url'] ?? '';
        if ($url === '') {
            return;
        }
        $titulo = self::config()['tienda_titulo'] ?? 'Tienda EPI10';
        echo '<a id="epi10-shop-go" class="epi10-card epi10-card--shop col-lg-4 col-md-6 col-12" href="'
            . attr($url) . '" target="_blank" rel="noopener">'
            . '<span class="epi10-card__icon"><i class="fa fa-2x fa-bag-shopping"></i></span>'
            . '<span class="epi10-card__title">' . text($titulo) . '</span>'
            . '<span class="epi10-card__text">' . text(self::config()['tienda_texto'] ?? '') . '</span>'
            . '<span class="epi10-card__cta">' . text('Ver productos') . ' →</span></a>';
    }

    /** Menú del back office: solo lo que usa Aitor (operaciones). El administrador conserva el menú completo. */
    public function simplifyMenu(MenuEvent $event): MenuEvent
    {
        $session = \OpenEMR\Common\Session\SessionWrapperFactory::getInstance()->getActiveSession();
        $user = (string)$session->get('authUser', '');
        $completos = self::config()['menu_completo_para'] ?? ['admin'];
        if ($user === '' || in_array($user, $completos, true)) {
            return $event;
        }
        $mantener = self::config()['menu_operaciones'] ?? [];
        $menu = [];
        foreach ($event->getMenu() as $item) {
            $label = $item->label ?? '';
            if (!array_key_exists($label, $mantener)) {
                continue;
            }
            $regla = $mantener[$label];
            if (is_array($regla) && !empty($item->children)) {
                $item->children = array_values(array_filter($item->children, fn($c) => in_array($c->label ?? '', $regla['hijos'] ?? [], true)));
            }
            $item->label = is_array($regla) ? ($regla['label'] ?? $label) : $regla;
            $menu[] = $item;
        }
        $event->setMenu($menu);
        return $event;
    }

    public function addRoutes(RestApiCreateEvent $event): RestApiCreateEvent
    {
        (new PortalApi())->register($event);
        return $event;
    }

    public function addScopes(RestApiScopeEvent $event): RestApiScopeEvent
    {
        if ($event->getApiType() !== RestApiScopeEvent::API_TYPE_STANDARD) {
            return $event;
        }
        $scopes = $event->getScopes();
        foreach (self::API_RESOURCES as $r) {
            foreach (['read', 'write', 'c', 'r', 's', 'u', 'crus', 'rs', 'cruds'] as $p) {
                $scopes[] = "user/$r.$p";
            }
        }
        $event->setScopes(array_values(array_unique($scopes)));
        return $event;
    }
}
