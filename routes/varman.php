<?php

use App\Models\User;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Varman\Chola\UserController;
use App\Http\Controllers\Varman\Chola\CompanyController;
use App\Http\Controllers\Varman\Chola\InvoiceController;
use App\Http\Controllers\Varman\Chola\ScratchCardController;
use App\Http\Controllers\Varman\Chola\SummaryController;
use App\Mail\ActivationConfirmationEmail;
use Illuminate\Support\Facades\Mail;

Route::get('get', function () {
    dd('hello');
});

Route::get('activate/company/{companyId}/user/{userId}', function ($companyId, $userId) {
    $company = Company::find($companyId);
    $company->status = 2;
    $company->save();

    $user = User::find($userId);
    Mail::to($user->email)
        ->send(new ActivationConfirmationEmail(['name' => $user->name, 'company' => $company->name]));
});

Route::prefix('user')->name('auth.')->controller(UserController::class)->group(function () {
    Route::post('company/login', 'login');
});
Route::middleware(['auth:api', 'allowed'])->name('api.')->group(function () {
    Route::prefix('chola')->name('chola.')->group(function () {
        Route::prefix('scratch-card')->controller(ScratchCardController::class)->group(function () {
            Route::post('store', 'storeScratchCard');
            Route::get('info', 'getInfo');
            Route::prefix('daily-sales')->group(function () {
                Route::get('list', 'list');
                Route::get('todayInfo', 'getTodayInfo');
                Route::get('{dailyScratchCardSale:uuid}/get', 'getDailyReportData');
                Route::post('{dailyScratchCardSale:uuid}/update-price', 'updateCardPrice');
                Route::post('{dailyScratchCardSale:uuid}/update-open-stock', 'updateDailySaleOpenStock');
                Route::post('{dailyScratchCardSale:uuid}/update-close-stock', 'updateDailySaleCloseStock');
                Route::get('{dailyScratchCardSale:uuid}/approve', 'approveDailySale');
                Route::delete('{dailyScratchCardSale:uuid}/delete', 'deleteDailySale');
            });
        });
        Route::prefix('company')->name('company.')->controller(CompanyController::class)->group(function () {
            Route::prefix('dailySale')->group(function () {
                Route::post('calculate', 'calculateDailySale'); //done
                Route::get('{dailySaleReport:uuid}/get', 'getDailySale'); //done
                Route::get('{dailySaleReport:uuid}/confirm', 'confirmDailySale'); //done
                Route::patch('{dailySaleReport:uuid}/update', 'updateDailySale'); //done
                Route::delete('{dailySaleReport:uuid}/delete', 'deleteDailySale'); //done
                Route::post('store', 'storeDailySale'); //done
                Route::get('list', 'dailySaleList'); //done
            });
            Route::prefix('cash-and-carry')->group(function () {
                Route::post('create', 'storeCashAndCarry'); //done
                Route::get('list', 'cashAndCarryList'); //done
                Route::get('{cashAndCarry:uuid}/get', 'getCashAndCarry'); //done
                Route::patch('{cashAndCarry:uuid}/update', 'updateCashAndCarry'); //done
                Route::delete('{cashAndCarry:uuid}/delete', 'deleteCashAndCarry'); //done
            });
            Route::prefix('salary')->group(function () {
                Route::post('create', 'createSalary'); //done
                Route::get('list', 'listSalary'); //done
                Route::get('{salary:uuid}/get', 'getSalary'); //done
                Route::patch('{salary:uuid}/update', 'updateSalary'); //done
                Route::delete('{salary:uuid}/delete', 'deleteSalary'); //done
            });
            Route::prefix('expense')->group(function () {
                Route::post('create', 'createExpense');
                Route::get('list', 'listExpense');
                Route::get('{otherExpense:uuid}/get', 'getExpense');
                Route::patch('{otherExpense:uuid}/update', 'updateExpense');
                Route::delete('{otherExpense:uuid}/delete', 'deleteExpense');
            });
            Route::get('info', 'info')->name('info'); //done
            Route::post('name', 'setCompanyName')->name('name');
            Route::prefix('{companyInformation:uuid}')->group(function () {
                Route::patch('name', 'updateCompanyName');
                Route::patch('address', 'updateCompanyAddress')->name('address');
                Route::patch('contact', 'updateCompanyInfo')->name('contact');
                Route::patch('billing-info', 'updateBillingDetails')->name('billing.info');
                Route::patch('bank-details', 'updateBankDetails')->name('billing.details');
            });
        });
        Route::prefix('summary')->controller(SummaryController::class)->group(function () {
            Route::get('company/list', 'reportList');
            Route::post('company/generate', 'summaryReport');
            Route::get('company/{saleReport:uuid}/download', 'downloadReport');
        });
        Route::prefix('users')->name('users.')->controller(UserController::class)->group(function () {
            Route::post('create', 'createChild')->name('create.child');
            Route::get('list', 'childList')->name('child.list');
            Route::get('roles', 'roleList')->name('roles.list');
            Route::get('{user:id}/get', 'getUser')->name('get.user');
            Route::patch('{user:id}/user-role', 'userRole')->name('child.list');
            Route::patch('{user:id}/user-status', 'userStatus')->name('child.list');
            Route::patch('{user:id}/user-password', 'userPassword')->name('child.list');
        });
        Route::prefix('invoice')->name('invoice.')->controller(InvoiceController::class)->group(function () {
            Route::prefix('company/{companyInformation:uuid}')->group(function () {
                Route::post('create', 'generatePdf');
                Route::get('{cholaInvoice:uuid}/download', 'downloadPdf');
            });
            Route::get('list', 'list')->name('list');
        });
    });
});
