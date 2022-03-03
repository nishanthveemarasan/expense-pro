<?php

use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::prefix('tasks')->group(function () {
    Route::get('/', [TaskController::class, 'index']);
    Route::post('/store', [TaskController::class, 'store']);
    Route::get('/{task:uuid}', [TaskController::class, 'completeTask']);
    Route::patch('/{task:uuid}/item/{item:uuid}', [TaskController::class, 'updateItem']);
});
