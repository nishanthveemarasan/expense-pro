<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Mobile\CurrencyController;
use App\Http\Controllers\Mobile\ExpenseController as MobileExpenseController;
use App\Http\Controllers\Mobile\MobileDebtController;
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

Route::middleware(['auth:api'])->name('api.')->group(function () {
    //mobile
    Route::get('logout', function (Request $request) {
        $token = $request->user()->token();
        $token->revoke();
        return ['message' => 'You have been successfully logged out!'];
    });
    Route::get('settings/get', [CurrencyController::class, 'getCurrencies']);
    Route::post('settings/store', [CurrencyController::class, 'store']);
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
