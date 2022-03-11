<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRecurringPaymentRequest;
use App\Http\Requests\UpdateRecurringPaymentRequest;
use App\Models\RecurringPayment;
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
    public function edit(RecurringPayment $recurringPayment, UpdateRecurringPaymentRequest $request)
    {
        try {
            DB::beginTransaction();
            $this->result = $this->recurringPayService->edit($recurringPayment, $request->validated());
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }
}
