<?php

namespace App\Services\Varman\Chola;

use App\Services\Varman\Chola\DropboxAccessTokenService;
use App\Traits\ErrorHelper;
use Carbon\Carbon;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Storage;
use PDF;

class DropboxService
{
    use ErrorHelper;

    public $http;
    public $dropbboxService;
    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->http = new Client(['verify' => false]);
        $this->dropbboxService = new DropboxAccessTokenService();
    }

    public function storePDFintoDropbox($pdfData, $filePath, $fileName, $dropboxFilePath)
    {
        try {
            $this->dropbboxService->connectDropbox('store_reports');

            //check if the folder already exists in dropbox
            if (!Storage::disk('dropbox')->exists($filePath)) {

                Storage::disk('dropbox')->makeDirectory($filePath);
            }

            $pdf = PDF::loadView('sale-summary', $pdfData);
            $pdf->setPaper('A4', 'portrait');

            Storage::disk('dropbox')->put($dropboxFilePath, $pdf->output());
        } catch (Exception $e) {
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
        }
    }
}
