<?php

namespace OpenEMR\Modules\Epi10Ui\Citas;

use OpenEMR\Core\OEGlobalsBag;
use OpenEMR\Services\AppointmentService;

/**
 * Citas del portal sobre la agenda de OpenEMR (openemr_postcalendar_events), sin tocar el núcleo.
 *
 * La disponibilidad es la del propio OpenEMR: el equipo marca en su calendario los bloques «En consulta»
 * (categoría 2) y «Fuera de consulta» (3); cualquier otra cita, comida o festivo ocupa tiempo. Es el mismo
 * cálculo que portal/find_appt_popup_user.php, con tres cambios: por día y minutos locales (no se descuadra
 * con el cambio de hora), las citas canceladas liberan su hueco y se cruzan varios miembros del equipo.
 *
 * Requiere globals.php y library/appointments.inc.php cargados (los carga la página del portal).
 */
final class Agenda
{
    private const EN_CONSULTA = 2;
    private const FUERA_DE_CONSULTA = 3;
    /** Estados que no ocupan hueco: cancelada y cancelada con menos de 24 h. */
    private const CANCELADAS = ['x', '%'];

    private array $config;

    public function __construct(?array $config = null)
    {
        $this->config = $config ?? (require __DIR__ . '/../../config.php');
    }

    public function ajuste(string $clave, mixed $omision = null): mixed
    {
        return $this->config[$clave] ?? $omision;
    }

    /** pc_catid de la categoría configurada (por pc_constant_id, que no cambia entre instalaciones). */
    public function categoria(): int
    {
        $c = $this->ajuste('categoria', 5);
        if (is_int($c) || ctype_digit((string)$c)) {
            return (int)$c;
        }
        $row = sqlQuery('SELECT pc_catid FROM openemr_postcalendar_categories WHERE pc_constant_id = ? AND pc_active = 1', [(string)$c]);
        return (int)($row['pc_catid'] ?? 5);
    }

    /** Duración de la cita en minutos (la de la categoría de OpenEMR). */
    public function duracion(): int
    {
        $row = sqlQuery('SELECT pc_duration FROM openemr_postcalendar_categories WHERE pc_catid = ?', [$this->categoria()]);
        $segundos = (int)($row['pc_duration'] ?? 0);
        return $segundos > 0 ? intdiv($segundos, 60) : $this->intervalo();
    }

    private function intervalo(): int
    {
        return max(5, OEGlobalsBag::getInstance()->getInt('calendar_interval') ?: 15);
    }

    /** @return array<int, array{id: int, username: string, facility_id: int}> */
    public function equipo(): array
    {
        $ids = array_map('intval', $this->ajuste('equipo', []));
        $sql = 'SELECT id, username, facility_id FROM users WHERE active = 1 AND calendar = 1';
        $bind = [];
        if ($ids === []) {
            $sql .= ' AND authorized = 1';
        } else {
            $sql .= ' AND id IN (' . implode(',', array_fill(0, count($ids), '?')) . ')';
            $bind = $ids;
        }
        $res = sqlStatement($sql . ' ORDER BY id', $bind);
        $out = [];
        while ($row = sqlFetchArray($res)) {
            $out[] = ['id' => (int)$row['id'], 'username' => (string)$row['username'], 'facility_id' => (int)$row['facility_id']];
        }
        return $out;
    }

    /**
     * Huecos libres entre dos fechas (ambas incluidas), ya filtrados por antelación.
     *
     * @return array<string, array<string, int>> fecha => [hora 'HH:MM' => users.id del primer miembro libre]
     */
    public function huecosConEquipo(string $desde, string $hasta): array
    {
        $intervalo = $this->intervalo();
        $porDia = intdiv(24 * 60, $intervalo);
        $unidades = (int)ceil($this->duracion() / $intervalo);
        $paso = max(1, intdiv((int)($this->ajuste('paso_minutos') ?? $this->duracion()), $intervalo));
        $minimo = time() + (int)$this->ajuste('antelacion_reserva_horas', 24) * 3600;

        $huecos = [];
        foreach ($this->equipo() as $miembro) {
            foreach ($this->ocupacion($miembro['id'], $desde, $hasta, $intervalo, $porDia) as $fecha => $mapa) {
                for ($i = 0; $i + $unidades <= $porDia; $i += $paso) {
                    for ($k = $i; $k < $i + $unidades; $k++) {
                        if ($mapa[$k] & 4) {
                            continue 2;
                        }
                    }
                    $hora = sprintf('%02d:%02d', intdiv($i * $intervalo, 60), ($i * $intervalo) % 60);
                    if (strtotime("$fecha $hora:00") < $minimo) {
                        continue;
                    }
                    $huecos[$fecha][$hora] ??= $miembro['id'];
                }
            }
        }
        ksort($huecos);
        foreach ($huecos as &$horas) {
            ksort($horas);
        }
        return $huecos;
    }

    /** @return array<string, string[]> fecha => horas libres; lo que ve el portal (sin quién atiende). */
    public function huecos(string $desde, string $hasta): array
    {
        return array_map('array_keys', $this->huecosConEquipo($desde, $hasta));
    }

    /**
     * Mapa de ocupación de un miembro del equipo, por día y unidad de calendario.
     * Bits como en el núcleo: 1 = empieza «En consulta», 2 = empieza «Fuera de consulta», 4 = ocupado.
     *
     * @return array<string, int[]>
     */
    private function ocupacion(int $aid, string $desde, string $hasta, int $intervalo, int $porDia): array
    {
        $mapas = [];
        for ($t = strtotime($desde); $t <= strtotime($hasta); $t = strtotime('+1 day', $t)) {
            $mapas[date('Y-m-d', $t)] = array_fill(0, $porDia, 0);
        }
        $query = 'SELECT pc_eid, pc_eventDate, pc_endDate, pc_startTime, pc_endTime, pc_duration, pc_recurrtype, pc_recurrspec,'
            . ' pc_recurrfreq, pc_alldayevent, pc_catid, pc_prefcatid, pc_apptstatus, pc_title'
            . ' FROM openemr_postcalendar_events'
            . ' WHERE pc_aid = ? AND ((pc_endDate >= ? AND pc_eventDate <= ? AND pc_recurrtype > \'0\')'
            . ' OR (pc_eventDate >= ? AND pc_eventDate <= ?))';
        $eventos = fetchEvents($desde, $hasta, null, null, false, 0, [$aid, $desde, $hasta, $desde, $hasta], $query);
        foreach ($eventos as $e) {
            $fecha = (string)$e['pc_eventDate'];
            if (!isset($mapas[$fecha]) || in_array((string)$e['pc_apptstatus'], self::CANCELADAS, true)) {
                continue;
            }
            [$h, $m] = array_map('intval', explode(':', (string)$e['pc_startTime']) + [0, 0]);
            $i = intdiv($h * 60 + $m, $intervalo);
            if ($i >= $porDia) {
                continue;
            }
            $catid = (int)$e['pc_catid'];
            if ($catid === self::EN_CONSULTA) {
                $mapas[$fecha][$i] |= 1;
            } elseif ($catid === self::FUERA_DE_CONSULTA) {
                $mapas[$fecha][$i] |= 2;
            } else {
                $duracion = !empty($e['pc_alldayevent']) ? 24 * 3600 : (int)$e['pc_duration'];
                $fin = min($porDia, $i + max(1, (int)ceil($duracion / 60 / $intervalo)));
                for ($k = $i; $k < $fin; $k++) {
                    $mapas[$fecha][$k] |= 4;
                }
            }
        }
        // Fuera de los bloques «En consulta», todo está ocupado.
        foreach ($mapas as &$mapa) {
            $enConsulta = false;
            for ($i = 0; $i < $porDia; $i++) {
                if ($mapa[$i] & 1) {
                    $enConsulta = true;
                }
                if ($mapa[$i] & 2) {
                    $enConsulta = false;
                }
                if (!$enConsulta) {
                    $mapa[$i] |= 4;
                }
            }
        }
        return $mapas;
    }

    /** Citas futuras y activas de la clienta, como las ve el portal. */
    public function misCitas(int $pid): array
    {
        $ahora = time();
        $citas = [];
        foreach (fetchAppointments(date('Y-m-d'), date('Y-m-d', strtotime('+1 year')), $pid) as $c) {
            $inicio = strtotime($c['pc_eventDate'] . ' ' . $c['pc_startTime']);
            if ($inicio < $ahora || in_array((string)$c['pc_apptstatus'], self::CANCELADAS, true)) {
                continue;
            }
            $citas[] = [
                'id' => (int)$c['pc_eid'],
                'fecha' => (string)$c['pc_eventDate'],
                'hora' => substr((string)$c['pc_startTime'], 0, 5),
                'fin' => substr((string)$c['pc_endTime'], 0, 5),
                'pendiente' => (string)$c['pc_apptstatus'] === '^',
                'cancelable' => (int)$c['pc_recurrtype'] === 0
                    && $inicio - $ahora >= (int)$this->ajuste('antelacion_cancelacion_horas', 24) * 3600,
            ];
        }
        usort($citas, fn($a, $b) => strcmp($a['fecha'] . $a['hora'], $b['fecha'] . $b['hora']));
        return $citas;
    }

    /**
     * Reserva un hueco para la clienta. Bloqueo con nombre para que dos reservas simultáneas no se pisen.
     *
     * @return array{id: int, fecha: string, hora: string}
     * @throws ErrorCita
     */
    public function reservar(int $pid, string $fecha, string $hora): array
    {
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha) || !preg_match('/^\d{2}:\d{2}$/', $hora)) {
            throw new ErrorCita('datos_invalidos', 'Elige un día y una hora del calendario.');
        }
        $limite = date('Y-m-d', strtotime('+' . (int)$this->ajuste('dias_reservables', 60) . ' days'));
        if ($fecha > $limite) {
            throw new ErrorCita('fuera_de_plazo', 'Todavía no se puede reservar en esa fecha.');
        }
        $candado = sqlQuery("SELECT GET_LOCK('epi10_citas', 10) AS ok");
        if (empty($candado['ok'])) {
            throw new ErrorCita('ocupado', 'Hay mucha gente reservando ahora mismo. Inténtalo de nuevo en unos segundos.');
        }
        try {
            if (count($this->misCitas($pid)) >= (int)$this->ajuste('maximo_citas_futuras', 1)) {
                throw new ErrorCita('ya_tienes_cita', 'Ya tienes una cita. Si quieres otra fecha, cancela la que tienes y elige un hueco nuevo.');
            }
            $aid = $this->huecosConEquipo($fecha, $fecha)[$fecha][$hora] ?? null;
            if ($aid === null) {
                throw new ErrorCita('hueco_ocupado', 'Ese hueco acaba de ocuparse. Elige otro, por favor.');
            }
            $miembro = current(array_filter($this->equipo(), fn($m) => $m['id'] === $aid));
            $centro = (int)($miembro['facility_id'] ?? 0) ?: (int)(sqlQuery('SELECT MIN(id) AS id FROM facility')['id'] ?? 0);
            $id = (new AppointmentService())->insert($pid, [
                'pc_catid' => $this->categoria(),
                'pc_title' => (string)$this->ajuste('titulo', 'Cita EPI10'),
                'pc_duration' => $this->duracion() * 60,
                'pc_hometext' => 'Reservada por la clienta desde el portal.',
                'pc_eventDate' => $fecha,
                'pc_apptstatus' => (string)$this->ajuste('estado_inicial', '-'),
                'pc_startTime' => $hora,
                'pc_facility' => $centro,
                'pc_billing_location' => $centro,
                'pc_aid' => $aid,
            ]);
            $this->avisarEquipo($pid, $aid, 'Reserva desde el portal', 'ha reservado una cita', $fecha, $hora);
            return ['id' => (int)$id, 'fecha' => $fecha, 'hora' => $hora];
        } finally {
            sqlQuery("SELECT RELEASE_LOCK('epi10_citas')");
        }
    }

    /**
     * Cancela una cita de la clienta: estado «x Cancelada», como el portal de OpenEMR (no se borra).
     *
     * @throws ErrorCita
     */
    public function cancelar(int $pid, int $eid): void
    {
        $cita = current(array_filter($this->misCitas($pid), fn($c) => $c['id'] === $eid));
        if ($cita === false) {
            throw new ErrorCita('no_encontrada', 'No encontramos esa cita. Recarga la página.');
        }
        if (!$cita['cancelable']) {
            throw new ErrorCita('fuera_de_plazo', 'Queda muy poco para tu cita. Escríbenos por Mensajes y lo vemos.');
        }
        sqlStatement("UPDATE openemr_postcalendar_events SET pc_apptstatus = 'x' WHERE pc_eid = ? AND pc_pid = ?", [$eid, $pid]);
        $aid = (int)(sqlQuery('SELECT pc_aid FROM openemr_postcalendar_events WHERE pc_eid = ?', [$eid])['pc_aid'] ?? 0);
        $this->avisarEquipo($pid, $aid, 'Cancelación desde el portal', 'ha cancelado su cita', $cita['fecha'], $cita['hora']);
    }

    /** Nota para el equipo en la ficha (Mensajes del back office), como hace el portal de OpenEMR. */
    private function avisarEquipo(int $pid, int $aid, string $titulo, string $accion, string $fecha, string $hora): void
    {
        $p = sqlQuery('SELECT fname, lname FROM patient_data WHERE pid = ?', [$pid]);
        $u = sqlQuery('SELECT username FROM users WHERE id = ?', [$aid]);
        $nombre = trim(($p['fname'] ?? '') . ' ' . ($p['lname'] ?? ''));
        $texto = sprintf('%s: %s %s el %s a las %s.', $titulo, $nombre, $accion, date('d/m/Y', strtotime($fecha)), $hora);
        addPnote($pid, $texto, 1, 1, 'Patient Reminders', (string)($u['username'] ?? ''), '', 'New');
    }
}
