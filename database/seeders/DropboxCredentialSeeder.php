<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DropboxCredential;

class DropboxCredentialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->dropboxAppCredentials() as $appCredential) {
            DropboxCredential::withTrashed()->firstOrCreate(
                [
                    'code'   => $appCredential['code'],
                ],
                [
                    'client_id' => $appCredential['client_id'],
                    'client_secret' => $appCredential['client_secret'],
                    'app_redirect_url' => $appCredential['app_redirect_url'],
                ]
            );
        }
    }

    private function dropboxAppCredentials()
    {
        return [
            [
                'code'           => 'store_reports',
                'client_id'           => config('admin.dropbox.store_invoice.client_id'),
                'client_secret' => config('admin.dropbox.store_invoice.client_secret'),
                'app_redirect_url' => config('admin.dropbox.store_invoice.app_redirect_url'),
            ],

        ];
    }
}
