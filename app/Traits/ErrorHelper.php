<?php

namespace App\Traits;

use App\Models\ShopError;
use Carbon\CarbonImmutable;

trait ErrorHelper
{
    public function storeError($data, $error)
    {
        ShopError::create([
            'data' => $data,
            'error' => $error
        ]);
    }
}
