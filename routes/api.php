<?php

use FontLib\Table\Type\name;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DebtController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\SavingController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\Mobile\ExpenseController as MobileExpenseController;
use App\Http\Controllers\Mobile\MobileDebtController;
use App\Http\Controllers\RecurringPaymentController;
use App\Http\Controllers\Mobile\SavingController as MobileSavingController;
use App\Http\Controllers\MobileRecurringPaymentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/auth', function (Request $request) {
    if (Auth::attempt([
        'email' => $request['email'],
        'password' => $request['password'],
    ])) {
        $user  = Auth::user();
        $token = $user->createToken('api-application')->accessToken;
        return ['token' => $token];
    } else {
        throw new Exception('Incorrect Login Details');
    }
});
Route::post('/login', [AuthController::class, 'auth'])->name('auth');
Route::post('/register', [AuthController::class, 'register'])->name('register');

Route::get('/test', [PageController::class, 'test']);
Route::middleware(['auth:api'])->name('api.')->group(function () {
    Route::get('/test', function () {
        return ['status' => true];
    })->name('test');
    Route::prefix('tasks')->name('tasks.')->group(function () {
        Route::get('/', [TaskController::class, 'index'])->name('index');
        Route::post('/store', [TaskController::class, 'store'])->name('store');
        Route::get('/{task:uuid}', [TaskController::class, 'completeTask']);
        Route::post('/{task:uuid}/add', [TaskController::class, 'addSubTaskItem']);
        Route::patch('/{task:uuid}/item/{item:uuid}', [TaskController::class, 'updateItem']);
        Route::patch('/{task:uuid}/update', [TaskController::class, 'updateItems']);
        Route::delete('/{task:uuid}/delete/{item:uuid}', [TaskController::class, 'deleteTaskItem']);
        Route::delete('/{task:uuid}/delete', [TaskController::class, 'deleteTask']);
        Route::patch('/{task:uuid}/update/{item:uuid}/content', [TaskController::class, 'updateItemContent']);
    });
    Route::prefix('savings')->group(function () {
        Route::get('/', [SavingController::class, 'index']);
        Route::post('/store', [SavingController::class, 'store']);
    });

    Route::prefix('expenses')->group(function () {
        Route::get('/', [ExpenseController::class, 'index']);
        Route::delete('/{expense:uuid}/delete', [ExpenseController::class, 'delete']);
        Route::patch('/{expense:uuid}/update', [ExpenseController::class, 'update']);
        Route::post('/store', [ExpenseController::class, 'store']);
        Route::post('/category/store', [ExpenseController::class, 'category']);
    });

    Route::prefix('debts')->group(function () {
        Route::get('/', [DebtController::class, 'index']);
        Route::post('/store', [DebtController::class, 'store']);
        Route::patch('/{debt:uuid}/update', [DebtController::class, 'update']);
    });
    Route::prefix('recurring')->group(function () {
        Route::patch('/{recurringPayment:uuid}', [RecurringPaymentController::class, 'edit']);
        Route::post('/store', [RecurringPaymentController::class, 'store']);
    });
    //mobile
    Route::prefix('mobile')->group(function () {
        Route::prefix('expenses')->group(function () {
            Route::get('/', [MobileExpenseController::class, 'index']);
            Route::delete('/{expense:uuid}/delete', [MobileExpenseController::class, 'delete']);
            Route::patch('/{expense:uuid}/update', [MobileExpenseController::class, 'update']);
            Route::post('/store', [MobileExpenseController::class, 'store']);
            Route::post('/category/store', [MobileExpenseController::class, 'category']);
        });
        Route::prefix('savings')->group(function () {
            Route::get('/', [MobileSavingController::class, 'index']);
            Route::post('/store', [MobileSavingController::class, 'store']);
            Route::patch('/{mobileSaving:uuid}/update', [MobileSavingController::class, 'update']);
            Route::delete('/{mobileSaving:uuid}/delete', [MobileSavingController::class, 'delete']);
        });

        Route::prefix('debts')->group(function () {
            Route::get('/', [MobileDebtController::class, 'index']);
            Route::post('/store', [MobileDebtController::class, 'store']);
            Route::patch('/{mobileDebt:uuid}/update', [MobileDebtController::class, 'update']);
            Route::delete('/{mobileDebt:uuid}/delete', [MobileDebtController::class, 'delete']);
        });
        Route::prefix('recurring')->group(function () {
            Route::patch('/{recurringPayment:uuid}', [MobileRecurringPaymentController::class, 'edit']);
            Route::patch('/{recurringPayment:uuid}/stop', [MobileRecurringPaymentController::class, 'stop']);
            Route::post('/store', [MobileRecurringPaymentController::class, 'store']);
        });
    });
});

Route::get('test', function () {
    return ['status' => true];
})->name('test');
