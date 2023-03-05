<?php

return [
    'dropbox' => [
        'store_invoice' => [
            'client_id' => env('DROPBOX_APP_KEY', ''),
            'client_secret' => env('DROPBOX_APP_SECRET', ''),
            'app_redirect_url' => env('DROPBOX_APP_REDIRECT_URL', ''),
            'mode' => env('APP_ENV', ''),
        ]
    ]
];
