<?php

namespace App\Http\Controllers\Mobile;

use Exception;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Services\Mobile\ExpenseService;
use App\Http\Requests\Mobile\UpdateExpenseRequest;
use App\Http\Requests\Mobile\CreateCategoryRequest;
use App\Http\Requests\Mobile\CreateMobileExpenseRequest;

class ExpenseController extends Controller
{
    protected $expenseService;
    protected $result;

    public function __construct(ExpenseService $expenseService)
    {
        $this->expenseService = $expenseService;
    }

    public function index()
    {
        try {
            DB::beginTransaction();
            $this->result = $this->expenseService->index();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }

    public function store(CreateMobileExpenseRequest $request)
    {
        try {
            DB::beginTransaction();
            $this->result = $this->expenseService->store($request->validated());
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }
    public function category(CreateCategoryRequest $request)
    {
        try {
            DB::beginTransaction();
            $this->result = $this->expenseService->category($request->validated());
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }
    public function delete(Expense $expense)
    {
        // $this->authorize('delete', $expense);
        try {
            DB::beginTransaction();
            $this->result = $this->expenseService->delete($expense);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }

    public function update(UpdateExpenseRequest $request, Expense $expense)
    {
        try {
            DB::beginTransaction();
            $this->result = $this->expenseService->update($request->validated(), $expense);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }
}
