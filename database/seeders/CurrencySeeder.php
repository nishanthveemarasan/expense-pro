<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $file = Storage::get('CurrencyJson/currencyJson.json');
        $fileJson = json_decode($file, true);
        foreach ($fileJson as $currency) {
            Currency::create([
                'name' => $currency['name'],
                'code' => $currency['code'],
                'symbol_native' => $currency['symbol_native'],
                'symbol' => $currency['symbol']
            ]);
        }
    }
}
