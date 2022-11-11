<?php

use App\Mail\sendStatementMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\Mobile\SavingController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/email', function () {
    Mail::to('iamnishanthveema@gmail.com')
        ->send(new sendStatementMail());
    dd('email sent');
});


Route::get('/auth', [PageController::class, 'login'])->name('login');
Route::get('/auth-register', [PageController::class, 'register'])->name('auth.register');
// Route::post('/login', [AuthController::class, 'auth'])->name('auth');
// Route::post('/register', [AuthController::class, 'register'])->name('register');
// Route::middleware('auth')->group(function () {

Route::get('/', [PageController::class, 'expense']);
Route::get('/debt', [PageController::class, 'debt']);
Route::get('/todo', [PageController::class, 'todo']);
Route::get('/saving', [PageController::class, 'saving']);
// });

Route::get('/test', function () {
    return view('test');
});

Route::prefix('savings')->group(function () {
    Route::get('/', [SavingController::class, 'index']);
    Route::post('/store', [SavingController::class, 'store']);
    Route::patch('/{mobileSaving:uuid}/update', [SavingController::class, 'update']);
    Route::delete('/{mobileSaving:uuid}/delete', [SavingController::class, 'delete']);
});
