<?php
// Configuración del módulo EPI10 (sin secretos). En producción, por instalación.
return [
    // Venta adicional: Payment Link o página de Checkout de Stripe (modo prueba en esta instancia).
    'tienda_url' => 'https://epi10-nutriwell-demo.vercel.app/',
    'tienda_titulo' => 'Tienda EPI10',
    'tienda_texto' => 'Suplementación y planes recomendados para ti.',
    // Usuarios que ven el menú completo del back office.
    'menu_completo_para' => ['admin'],
    // Menú del rol de operaciones (Aitor): etiqueta original => etiqueta nueva o ['label' => …, 'hijos' => [...]].
    'menu_operaciones' => [
        'Calendar' => 'Citas',
        'Finder' => 'Clientes',
        'Messages' => 'Mensajes',
        'Patient' => ['label' => 'Cliente', 'hijos' => ['New/Search', 'Dashboard{{patient file}}']],
        'Miscellaneous' => ['label' => 'Portal', 'hijos' => ['Portal Dashboard']],
    ],
];
