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
use App\Http\Resources\LocaleResource;
use App\Models\GeneralSetting;
use App\Models\LocaleLanguage;

class CurrencyController extends Controller
{
    protected $result;
    public function getCurrencies()
    {
        $savedData = Auth::user()->generalSetting;
        return ['data' => [
            "currencyList" => CurrencyResource::collection(Currency::all()),
            "localeList" => LocaleResource::collection(LocaleLanguage::all()),
            'savedData' => $savedData
        ]];
    }

    public function store(CreateGeneralSettingRequest $request)
    {
        try {
            $data = $request->validated();

            $currency = Currency::where('code', $data['currency_code'])->first();
            $locale = LocaleLanguage::where('code', $data['locale_code'])->first();
            GeneralSetting::updateOrCreate(
                ['user_id' => Auth::user()->id],
                ['currency_code' => $currency->code, 'currency_symbol' => $currency->symbol_native, 'locale_code' => $locale->code]
            );
            $this->result['data']['currency'] = [
                'code' => $currency->code,
                'symbol' => $currency->symbol_native,
                'locale_code' => $locale->code
            ];
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }
        return $this->result;
    }
}
