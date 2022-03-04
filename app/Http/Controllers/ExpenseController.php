<?php

namespace App\Http\Controllers;

use PDF;
use App\Http\Requests\CreateCategoryRequest;
use App\Http\Requests\CreateExpenseRequest;
use Exception;
use Illuminate\Http\Request;
use App\Services\ExpenseService;
use Illuminate\Support\Facades\DB;

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
}
