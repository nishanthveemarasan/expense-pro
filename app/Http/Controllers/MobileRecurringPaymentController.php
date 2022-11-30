<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Models\RecurringPayment;
use Illuminate\Support\Facades\DB;
use App\Services\Mobile\RecurringPayService;
use App\Http\Requests\Mobile\CreateRecurringPaymentRequest;
use App\Http\Requests\Mobile\StopRecurringPaymentRequest;
use App\Http\Requests\Mobile\UpdateRecurringPaymentRequest;

class MobileRecurringPaymentController extends Controller
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

    public function stop(RecurringPayment $recurringPayment, StopRecurringPaymentRequest $request)
    {
        try {
            DB::beginTransaction();
            $this->result = $this->recurringPayService->stop($recurringPayment);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }
}
