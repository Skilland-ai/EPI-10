<?php

namespace OpenEMR\Modules\Epi10Ui\Citas;

/** Error que se enseña a la clienta tal cual: código para el JS y texto en español. */
final class ErrorCita extends \RuntimeException
{
    public function __construct(public readonly string $codigo, string $mensaje)
    {
        parent::__construct($mensaje);
    }
}
