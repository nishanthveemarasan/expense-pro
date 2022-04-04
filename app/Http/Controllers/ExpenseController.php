<?php

namespace App\Http\Controllers;

use PDF;
use Exception;
use App\Models\Expense;
use Illuminate\Http\Request;
use App\Services\ExpenseService;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\CreateExpenseRequest;
use App\Http\Requests\CreateCategoryRequest;
use App\Http\Requests\UpdateExpenseRequest;

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
        $this->authorize('viewAny', Expense::class);
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

    public function store(CreateExpenseRequest $request)
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
        $this->authorize('delete', $expense);
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
