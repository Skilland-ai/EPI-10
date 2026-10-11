<?php

// Calendario de citas del portal (área 5, SKI2-235). Sin secretos; en producción, por instalación.
return [
    // Miembros del equipo (users.id) cuya agenda se ofrece. Vacío = todos los usuarios con calendario activo.
    // La clienta no elige facultativo: se asigna el primero libre en esa hora.
    'equipo' => [],
    // Categoría de cita de OpenEMR que se crea: pc_constant_id (o pc_catid). Su duración manda (Cita EPI10 = 30 min).
    'categoria' => 'epi10_cita',
    // Título de la cita en el calendario del equipo.
    'titulo' => 'Cita EPI10',
    // Estado con el que nace la cita. '-' = reservada (los huecos solo salen donde el equipo está «En consulta»);
    // '^' = pendiente de confirmar por el equipo, como hace el portal de OpenEMR.
    'estado_inicial' => '-',
    // Cada cuántos minutos empieza un hueco. null = la duración de la categoría.
    'paso_minutos' => null,
    // Antelación mínima para reservar y para cancelar desde el portal. Iguales: lo que se reserva se puede cancelar.
    'antelacion_reserva_horas' => 24,
    'antelacion_cancelacion_horas' => 24,
    // Días hacia delante que se pueden reservar.
    'dias_reservables' => 60,
    // Citas futuras activas por clienta (el test mixto tiene una cita presencial opcional).
    'maximo_citas_futuras' => 1,
    // Lugar que se enseña en la confirmación (texto libre; null = el nombre del centro de OpenEMR).
    'lugar' => null,
];
