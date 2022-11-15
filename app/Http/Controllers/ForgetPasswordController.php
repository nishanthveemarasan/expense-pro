<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\CreateForgetPasswordRequest;
use Illuminate\Support\Arr;

class ForgetPasswordController extends Controller
{
    public $result;
    public function store(CreateForgetPasswordRequest $request)
    {
        try {
            $data = $request->validated();
            $numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1];
            $codeArray = Arr::random($numbers, 6);
            $code = implode("", $codeArray);
           
        } catch (Exception $e) {
            $this->result['error'] = $e->getMessage();
        }
    }
}
