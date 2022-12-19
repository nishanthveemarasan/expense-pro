<?php

namespace App\Services;

class APIResponseService
{

    public function success($code, $data = [], $msg = 'Completed', $error = [])
    {
        $response = [
            'success' => true,
            'http_status' => $code,
            'data' => $data,
            'msg' => $msg,
            'error' => $error
        ];

        return response()->json($response, $code);
    }

    public function failed($exception, $code, $line = null, $error = [])
    {

        $msg = 'failed';
        $response = [
            'success' => false,
            'http_status' => $code,
            'data' => [],
            'lineNumber' => $line,
            'msg' => $msg,
            'error' => $exception
        ];

        return response()->json($response, $code);
    }

    public function httpStatus($code)
    {
        $httpStatus = config('httpStatus');
        return $httpStatus[$code];
    }
}
