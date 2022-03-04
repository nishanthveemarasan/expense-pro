<?php

namespace App\Http\Controllers;

use Exception;
// use PDF;
use Illuminate\Http\Request;
use App\Services\DebtService;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\CreateDebtgRequest;

class DebtController extends Controller
{
    protected $debtService;
    protected $result;

    public function __construct(DebtService $debtService)
    {
        $this->debtService = $debtService;
    }

    public function index()
    {

        try {
            DB::beginTransaction();
            $this->result = $this->debtService->index();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }

    public function store(CreateDebtgRequest $request)
    {
        try {
            DB::beginTransaction();
            $this->result = $this->debtService->store($request->validated());
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }

    /*

 $data = [
            'title' => 'Welcome to ItSolutionStuff.com',
            'date' => date('m/d/Y')
        ];

        $pdf = PDF::loadView('myPDF', $data);

        return $pdf->download('itsolutionstuff.pdf');
    */
}
