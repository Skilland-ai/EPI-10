<?php

namespace OpenEMR\Modules\Epi10;

use OpenEMR\Common\Auth\OneTimeAuth;
use OpenEMR\Common\Http\HttpRestRequest;
use OpenEMR\Events\RestApiExtend\RestApiCreateEvent;
use OpenEMR\RestControllers\Config\RestConfig;
use OpenEMR\Services\DocumentTemplates\DocumentTemplateService;
use OpenEMR\Services\PatientAccessOnsiteService;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * API propia del monolito EPI10 para lo que la API estándar de OpenEMR 8.4 no cubre.
 * Rutas bajo /apis/default/api, con OAuth2 de usuario (rol users) y scopes user/epi10_*.
 * No guarda nada fuera de las tablas de OpenEMR: reutiliza sus servicios.
 */
class PortalApi
{
    public function register(RestApiCreateEvent $event): void
    {
        $event->addToRouteMap('POST /api/patient/:pid/epi10_portal_access', fn($pid, HttpRestRequest $r) => $this->portalAccess($pid, $r));
        $event->addToRouteMap('POST /api/patient/:pid/epi10_portal_message', fn($pid, HttpRestRequest $r) => $this->sendMessage($pid, $r));
        $event->addToRouteMap('GET /api/epi10_portal_message', fn(HttpRestRequest $r) => $this->listMessages($r));
        $event->addToRouteMap('POST /api/patient/:pid/epi10_portal_template', fn($pid, HttpRestRequest $r) => $this->assignTemplate($pid, $r));
        $event->addToRouteMap('GET /api/epi10_changes', fn(HttpRestRequest $r) => $this->changes($r));
    }

    private static function body(): array
    {
        $data = json_decode((string)file_get_contents('php://input'), true);
        return is_array($data) ? $data : [];
    }

    private static function patient(int $pid): ?array
    {
        $row = sqlQuery('SELECT pid, fname, lname, email FROM patient_data WHERE pid = ?', [$pid]);
        return $row ?: null;
    }

    private static function since(HttpRestRequest $r): string
    {
        $since = (string)$r->query->get('since', '1970-01-01T00:00:00Z');
        $ts = strtotime($since);
        if ($ts === false) {
            $ts = 0;
        }
        // OpenEMR guarda fechas locales del servidor (sin zona); se convierte a la zona del servidor.
        return date('Y-m-d H:i:s', $ts);
    }

    /**
     * Alta en el portal: crea (o regenera) las credenciales y devuelve un enlace mágico de un solo uso
     * para que el monolito lo envíe en su propio correo en español. La contraseña aleatoria no sale de OpenEMR.
     */
    public function portalAccess($pid, HttpRestRequest $request): JsonResponse
    {
        RestConfig::request_authorization_check($request, 'patients', 'demo', ['write', 'addonly']);
        $pid = (int)$pid;
        $p = self::patient($pid);
        if (!$p) {
            return new JsonResponse(['error' => 'paciente no encontrado'], 404);
        }
        $data = self::body();
        $username = trim((string)($data['username'] ?? ''));
        if ($username === '') {
            $username = 'epi10-' . $pid;
        }
        $svc = new PatientAccessOnsiteService();
        $svc->saveCredentials($pid, $svc->getRandomPortalPassword(), $username, $username, true);
        $horas = max(1, min(168, (int)($data['expires_hours'] ?? 48)));
        $oneTime = new OneTimeAuth('portal', 'redirect');
        $link = $oneTime->createPortalOneTime([
            'pid' => $pid,
            'redirect_link' => \OpenEMR\Core\OEGlobalsBag::getInstance()->getString('web_root') . '/portal/home.php',
            'expiry_interval' => 'PT' . $horas . 'H',
            'actions' => ['enforce_onetime_use' => true, 'extend_portal_visit' => true, 'max_access_count' => 1],
        ]);
        return new JsonResponse([
            'pid' => $pid,
            'portal_username' => $username,
            'magic_link' => html_entity_decode((string)($link['encoded_link'] ?? '')),
            'expires_hours' => $horas,
        ], 201);
    }

    /** Equipo → bandeja del portal (onsite_mail), con las dos copias que hace el propio portal. */
    public function sendMessage($pid, HttpRestRequest $request): JsonResponse
    {
        RestConfig::request_authorization_check($request, 'patients', 'notes');
        require_once $GLOBALS['fileroot'] . '/portal/lib/portal_mail.inc.php';
        $pid = (int)$pid;
        $acc = sqlQuery('SELECT pao.portal_username, pd.fname, pd.lname FROM patient_access_onsite pao JOIN patient_data pd ON pd.pid = pao.pid WHERE pao.pid = ?', [$pid]);
        if (!$acc) {
            return new JsonResponse(['error' => 'la paciente no tiene acceso al portal'], 409);
        }
        $data = self::body();
        $title = trim((string)($data['title'] ?? 'Mensaje de EPI10 Salud'));
        $body = trim((string)($data['body'] ?? ''));
        if ($body === '') {
            return new JsonResponse(['error' => 'body vacío'], 400);
        }
        $staff = (string)$request->getSession()->get('authUser');
        $u = sqlQuery('SELECT CONCAT(fname, " ", lname) AS name FROM users WHERE username = ?', [$staff]);
        $staffName = trim((string)($u['name'] ?? $staff)) ?: $staff;
        $rid = $acc['portal_username'];
        $rn = trim($acc['fname'] . ' ' . $acc['lname']);
        // Igual que portal/messaging/handle_note.php (task=add): una copia para cada buzón.
        sendMail($staff, $body, $title, '', 0, $staff, $staffName, $rid, $rn, 'New');
        sendMail($rid, $body, $title, '', 0, $staff, $staffName, $rid, $rn, 'New');
        $row = sqlQuery('SELECT id, date, owner, sender_id, recipient_id, title, message_status FROM onsite_mail WHERE owner = ? ORDER BY id DESC LIMIT 1', [$rid]);
        return new JsonResponse(['message' => $row], 201);
    }

    /** Mensajes escritos por pacientes en el portal desde una fecha (copia del destinatario del equipo). */
    public function listMessages(HttpRestRequest $request): JsonResponse
    {
        RestConfig::request_authorization_check($request, 'patients', 'notes');
        $since = self::since($request);
        $res = sqlStatement(
            'SELECT om.id, om.date, pao.pid, om.sender_id, om.sender_name, om.recipient_id, om.title, om.body, om.message_status, om.mail_chain
               FROM onsite_mail om JOIN patient_access_onsite pao ON pao.portal_username = om.sender_id
              WHERE om.date > ? AND om.owner = om.recipient_id AND om.deleted = 0 ORDER BY om.date',
            [$since]
        );
        $out = [];
        while ($row = sqlFetchArray($res)) {
            $out[] = $row;
        }
        return new JsonResponse(['since' => $since, 'count' => count($out), 'data' => $out]);
    }

    /** Asigna una plantilla del repositorio (consentimiento o cuestionario) a la paciente para que la vea en el portal. */
    public function assignTemplate($pid, HttpRestRequest $request): JsonResponse
    {
        RestConfig::request_authorization_check($request, 'patients', 'docs', ['write', 'addonly']);
        $pid = (int)$pid;
        if (!self::patient($pid)) {
            return new JsonResponse(['error' => 'paciente no encontrado'], 404);
        }
        $name = trim((string)(self::body()['template'] ?? ''));
        $tpl = sqlQuery('SELECT id, category, template_name, template_content, mime FROM document_templates WHERE template_name = ? AND pid IN (0, -1) ORDER BY pid DESC LIMIT 1', [$name]);
        if (!$tpl) {
            return new JsonResponse(['error' => 'plantilla no encontrada en el repositorio'], 404);
        }
        $id = (new DocumentTemplateService())->insertTemplate($pid, $tpl['category'], $tpl['template_name'], $tpl['template_content'], $tpl['mime']);
        return new JsonResponse(['pid' => $pid, 'template_id' => $id, 'template_name' => $tpl['template_name'], 'category' => $tpl['category']], 201);
    }

    /**
     * Fuente única para la consulta periódica del monolito (sustituye a los webhooks):
     * todo lo que ha cambiado desde `since`, solo con IDs, estados y fechas (sin contenido clínico).
     */
    public function changes(HttpRestRequest $request): JsonResponse
    {
        RestConfig::request_authorization_check($request, 'patients', 'demo');
        $since = self::since($request);
        $q = function (string $sql, array $bind): array {
            $res = sqlStatement($sql, $bind);
            $out = [];
            while ($row = sqlFetchArray($res)) {
                $out[] = $row;
            }
            return $out;
        };
        return new JsonResponse([
            'since' => $since,
            'now' => date('Y-m-d H:i:s'),
            'portal_documents' => $q('SELECT id, pid, doc_type, denial_reason AS status, patient_signed_status, patient_signed_time, create_date, review_date FROM onsite_documents WHERE create_date > ? OR patient_signed_time > ? OR review_date > ? ORDER BY id', [$since, $since, $since]),
            'questionnaire_responses' => $q('SELECT id, patient_id AS pid, questionnaire_name, status, create_time, last_updated FROM questionnaire_response WHERE last_updated > ? OR create_time > ? ORDER BY id', [$since, $since]),
            'portal_messages_from_patients' => $q('SELECT om.id, pao.pid, om.date, om.title FROM onsite_mail om JOIN patient_access_onsite pao ON pao.portal_username = om.sender_id WHERE om.date > ? AND om.owner = om.recipient_id AND om.deleted = 0 ORDER BY om.id', [$since]),
            'documents' => $q('SELECT d.id, d.foreign_id AS pid, d.name, d.mimetype, d.date FROM documents d WHERE d.date > ? AND d.deleted = 0 ORDER BY d.id', [$since]),
            'portal_activity' => $q('SELECT id, date, patient_id AS pid, activity, status, pending_action FROM onsite_portal_activity WHERE date > ? ORDER BY id', [$since]),
        ]);
    }
}
