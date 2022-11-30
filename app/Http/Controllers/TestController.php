<?php

namespace App\Http\Controllers;

use App\Exports\SampleExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class TestController extends Controller
{
    public function test()
    {
        $data = [
            'name' => 'nishanth',
            'country' => 'australia'
        ];
        return Excel::download(new SampleExport($data), 'sample_excel.xlsx');
    }
}
