<?php

use App\Http\Controllers\ForgetPasswordController;
use App\Http\Controllers\Mobile\ExpenseController;
use App\Http\Controllers\Mobile\SavingController;
use App\Http\Controllers\Varman\Chola\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    dd('Welcome to admin user routes.');
});

// Route::middleware('client')->group(function () {
Route::get('hello', function () {
    dd('welcome');
});
Route::prefix('forget-password')->group(function () {
    Route::post('store/email', [ForgetPasswordController::class, 'store'])->name('store.email');
    Route::post('reset/password/check', [ForgetPasswordController::class, 'resetPasswordCheck'])->name('resetPassword.check');
    Route::post('reset/password/update', [ForgetPasswordController::class, 'updatePassword'])->name('resetPassword.update');
});

Route::middleware('client')->group(function () {
    Route::prefix('auth')->name('auth.')->controller(UserController::class)->group(function () {
        Route::post('company/register', 'registration');
    });
});
