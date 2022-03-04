<?php

namespace App\Http\Controllers;

use App\Services\DebtService;
use Illuminate\Http\Request;
use App\Services\TaskService;
use App\Services\SavingService;
use App\Services\ExpenseService;
use SebastianBergmann\Environment\Console;

class PageController extends Controller
{
    protected $todoService;
    protected $savingService;
    protected $expenseService;
    protected $debtService;

    public function __construct(TaskService $todoService, SavingService $savingService, ExpenseService $expenseService, DebtService $debtService)
    {
        $this->todoService = $todoService;
        $this->savingService = $savingService;
        $this->expenseService = $expenseService;
        $this->debtService = $debtService;
    }
    public function todo()
    {
        $data = $this->todoService->index();
        return view('admin.todo')->with('data', $data);
    }
    public function saving()
    {
        $data = $this->savingService->index();
        return view('admin.saving')->with('data', $data);
    }
    public function expense()
    {
        $data = $this->expenseService->index();
        return view('admin.expense')->with('data', $data);
    }
    public function debt()
    {
        $data = $this->debtService->index();
        return view('admin.debt')->with('data', $data);
    }

    public function login()
    {

        return view('Layout.auth');
    }
}
