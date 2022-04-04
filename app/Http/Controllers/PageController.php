<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Services\DebtService;
use App\Services\TaskService;
use App\Services\SavingService;
use App\Services\ExpenseService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
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
        return view('admin.todo');
    }
    public function saving()
    {
        return view('admin.saving');
    }
    public function expense()
    {
        return view('admin.expense');
    }
    public function debt()
    {
        return view('admin.debt');
    }

    public function login()
    {

        return view('Layout.auth');
    }

    public function register()
    {

        return view('Layout.register');
    }

    public function test()
    {
        $user = User::find(1);
        $token = $user->createToken('api-application')->accessToken;
        return ['token' => $token];
    }
}
