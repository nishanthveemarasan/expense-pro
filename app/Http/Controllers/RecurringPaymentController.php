<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRecurringPaymentRequest;
use Exception;
use Illuminate\Support\Facades\DB;
use App\Services\RecurringPayService;

class RecurringPaymentController extends Controller
{
    protected $recurringPayService;

    public function __construct(RecurringPayService $recurringPayService)
    {
        $this->recurringPayService = $recurringPayService;
    }

    public function store(CreateRecurringPaymentRequest $request)
    {
        try {
            DB::beginTransaction();
            $this->result = $this->recurringPayService->store($request->validated());
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }
}
