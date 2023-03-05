<?php

namespace App\Http\Controllers\Varman\Chola;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Varman\Chola\DropboxAccessTokenService;

class DropboxAccessTokenController extends Controller
{
    public $dropboxService;

    public function __construct(DropboxAccessTokenService $dropboxService)
    {
        $this->dropboxService = $dropboxService;
    }

    public function authorizeDropboxApp($event)
    {
        try {
            return $this->dropboxService->authorizeDropboxApp($event);
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    public function dropboxAuthorizeCode(Request $request, $event)
    {
        try {
            return $this->dropboxService->dropboxAuthorizeCode($request, $event);
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}
