<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;

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

Route::get('/pdf', function () {
});


Route::get('/', [PageController::class, 'expense']);
Route::get('/debt', [PageController::class, 'debt']);
Route::get('/todo', [PageController::class, 'todo']);
Route::get('/saving', [PageController::class, 'saving']);
