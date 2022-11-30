<?php

namespace Database\Seeders;

use App\Models\LocaleLanguage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class LocaleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $file = Storage::get('CurrencyJson/localeJson.json');
        $fileJson = json_decode($file, true);
        foreach ($fileJson as $locale => $json) {
            LocaleLanguage::create([
                'code' => $locale,
                'name' => $json[1],
            ]);
        }
    }
}
