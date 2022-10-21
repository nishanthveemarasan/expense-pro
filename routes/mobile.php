<?php

use App\Http\Controllers\Mobile\ExpenseController;
use App\Http\Controllers\Mobile\SavingController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    dd('Welcome to admin user routes.');
});

Route::prefix('expenses')->group(function () {
    Route::get('/', [ExpenseController::class, 'index']);
    Route::delete('/{expense:uuid}/delete', [ExpenseController::class, 'delete']);
    Route::patch('/{expense:uuid}/update', [ExpenseController::class, 'update']);
    Route::post('/store', [ExpenseController::class, 'store']);
    Route::post('/category/store', [ExpenseController::class, 'category']);
});

Route::prefix('savings')->group(function () {
    Route::get('/', [SavingController::class, 'index']);
    Route::post('/store', [SavingController::class, 'store']);
});
