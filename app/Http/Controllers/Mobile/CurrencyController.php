<?php

namespace App\Http\Controllers\Mobile;

use Exception;
use App\Models\Currency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CurrencyResource;
use App\Http\Requests\CreateGeneralSettingRequest;
use App\Models\GeneralSetting;

class CurrencyController extends Controller
{
    protected $result;
    public function getCurrencies()
    {
        $savedData = Auth::user()->generalSetting;
        return ['data' => [
            "currencyList" => CurrencyResource::collection(Currency::all()),
            'savedData' => $savedData
        ]];
    }

    public function store(CreateGeneralSettingRequest $request)
    {
        try {
            $data = $request->validated();

            $currency = Currency::where('code', $data['currency_code'])->first();
            GeneralSetting::updateOrCreate(
                ['user_id' => Auth::user()->id],
                ['currency_code' => $currency->code, 'currency_symbol' => $currency->symbol_native]
            );
            $this->result['data']['currency'] = [
                'code' => $currency->code,
                'symbol' => $currency->symbol_native
            ];
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }
        return $this->result;
    }
}
