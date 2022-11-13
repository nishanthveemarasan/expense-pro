<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use App\Http\Resources\CurrencyResource;
use App\Models\Currency;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    public function getCurrencies()
    {
        return ['data' => [
            "currencyList" => CurrencyResource::collection(Currency::all())
        ]];
    }

    public function store()
    {
    }
}
