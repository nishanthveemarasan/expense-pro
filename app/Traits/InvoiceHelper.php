<?php

namespace App\Traits;

use Carbon\CarbonImmutable;

trait InvoiceHelper
{
    public function getDate($date)
    {
        return CarbonImmutable::create($date)->format('d/m/Y');
    }
    public function getFileDate($date)
    {
        return CarbonImmutable::create($date)->format('d_m_Y');
    }

    public function getAmountFormat($amount)
    {
        return number_format($amount, 2);
    }
}
