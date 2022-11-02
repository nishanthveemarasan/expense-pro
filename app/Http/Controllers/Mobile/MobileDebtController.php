<?php

namespace App\Http\Controllers\Mobile;

use Exception;
use App\Models\MobileDebt;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Services\Mobile\DebtService;
use App\Http\Requests\CreateDebtgRequest;
use App\Http\Requests\Mobile\DeleteDebtRequest;

class MobileDebtController extends Controller
{
    protected $debtService;
    protected $result;

    public function __construct(DebtService $debtService)
    {
        $this->debtService = $debtService;
    }

    public function index()
    {
        // $this->authorize('viewAny', Debt::class);
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
    public function update(CreateDebtgRequest $request, MobileDebt $mobileDebt)
    {
        // $this->authorize('update', $debt);
        try {
            DB::beginTransaction();
            $this->result = $this->debtService->update($request->validated(), $mobileDebt);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }
    public function delete(DeleteDebtRequest $request, MobileDebt $mobileDebt)
    {
        // $this->authorize('update', $debt);
        try {
            DB::beginTransaction();
            $this->result = $this->debtService->delete($mobileDebt);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }
}
