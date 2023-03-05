<?php

namespace App\Http\Controllers\Varman\Chola;

use Exception;
use Illuminate\Http\Request;
use App\Models\CompanyInformation;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Services\APIResponseService;
use App\Services\Varman\Chola\CompanyService;
use App\Http\Requests\Varman\Chola\SetCompanyNameRequest;
use App\Http\Requests\Varman\Chola\UpdateBankDetailsRequest;
use App\Http\Requests\Varman\Chola\CalculateDailySaleRequest;
use App\Http\Requests\Varman\Chola\CreateCashAndCarryRequest;
use App\Http\Requests\Varman\Chola\CreateExpenseRequest;
use App\Http\Requests\Varman\Chola\CreateSalaryRequest;
use App\Http\Requests\Varman\Chola\DeleteDailyReportRequest;
use App\Http\Requests\Varman\Chola\GetScratchSaleForDateRequest;
use App\Http\Requests\Varman\Chola\manageExpenseRequest;
use App\Http\Requests\Varman\Chola\ManageSalaryRequest;
use App\Http\Requests\Varman\Chola\StoreDailySaleRequest;
use App\Http\Requests\Varman\Chola\UpdateBillingDetailsRequest;
use App\Http\Requests\Varman\Chola\UpdateCashAndCarryRequest;
use App\Http\Requests\Varman\Chola\UpdateCompanyAddressRequest;
use App\Http\Requests\Varman\Chola\UpdateCompanyContactInfoRequest;
use App\Http\Requests\Varman\Chola\UpdateDailySaleRequest;
use App\Http\Requests\Varman\Chola\UpdateExpenseRequest;
use App\Http\Requests\Varman\Chola\UpdateSalaryRequest;
use App\Http\Requests\Varman\Chola\ViewCashAndCarryRequest;
use App\Http\Requests\Varman\Chola\ViewDailyReportListRequest;
use App\Http\Requests\Varman\Chola\ViewDailySaleItemRequest;
use App\Http\Requests\Varman\Chola\ViewInitialInfoRequest;
use App\Models\CashAndCarry;
use App\Models\DailySaleReport;
use App\Models\OtherExpense;
use App\Models\Salary;
use App\Traits\ErrorHelper;

class CompanyController extends Controller
{
    use ErrorHelper;

    public $service;
    public $apiResponseService;
    public function __construct(CompanyService $service, APIResponseService $apiResponseService)
    {
        $this->service = $service;
        $this->apiResponseService = $apiResponseService;
    }

    public function setCompanyName(SetCompanyNameRequest $request)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->setCompanyName($request->validated());
            DB::commit();
            $response = $this->apiResponseService->success(200, $result);
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }
    public function updateCompanyName(SetCompanyNameRequest $request, CompanyInformation $companyInformation)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->updateCompanyName($request->validated(), $companyInformation);
            DB::commit();
            $response = $this->apiResponseService->success(200, $result);
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function updateCompanyAddress(UpdateCompanyAddressRequest $request, CompanyInformation $companyInformation)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->updateCompanyAddress($request->validated(), $companyInformation);
            DB::commit();
            $response = $this->apiResponseService->success(200, $result);
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function updateCompanyInfo(UpdateCompanyContactInfoRequest $request, CompanyInformation $companyInformation)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->updateCompanyInfo($request->validated(), $companyInformation);
            DB::commit();
            $response = $this->apiResponseService->success(200, $result);
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function updateBillingDetails(UpdateBillingDetailsRequest $request,  CompanyInformation $companyInformation)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->updateBillingDetails($request->validated(), $companyInformation);
            DB::commit();
            $response = $this->apiResponseService->success(200, $result);
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function updateBankDetails(UpdateBankDetailsRequest $request, CompanyInformation $companyInformation)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->updateBankDetails($request->validated(), $companyInformation);
            DB::commit();
            $response = $this->apiResponseService->success(200, $result);
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }
    /**
     * OMIT ABOUE
     *
     * 
     */
    public function info(ViewInitialInfoRequest $request)
    {
        try {
            $result = $this->service->info();
            $response = $this->apiResponseService->success(200, $result);
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function calculateDailySale(CalculateDailySaleRequest $request)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->calculateDailySale($request->validated());
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }
    public function storeDailySale(StoreDailySaleRequest $request)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->storeDailySale($request->validated());
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function getDailySale(ViewDailySaleItemRequest $request, DailySaleReport $dailySaleReport)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->getDailySale($dailySaleReport);
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function confirmDailySale(ViewDailySaleItemRequest $request, DailySaleReport $dailySaleReport)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->confirmDailySale($dailySaleReport);
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function dailySaleList(ViewDailyReportListRequest $request)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->dailySaleList();
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }
    public function updateDailySale(UpdateDailySaleRequest $request, DailySaleReport $dailySaleReport)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->updateDailySale($request->validated(), $dailySaleReport);
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function deleteDailySale(DeleteDailyReportRequest $request, DailySaleReport $dailySaleReport)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->deleteDailySale($dailySaleReport);
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function storeCashAndCarry(CreateCashAndCarryRequest $request)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->storeCashAndCarry($request->validated());
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function cashAndCarryList(ViewCashAndCarryRequest $request)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->cashAndCarryList();
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function getCashAndCarry(ViewCashAndCarryRequest $request, CashAndCarry $cashAndCarry)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->getCashAndCarry($cashAndCarry);
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function updateCashAndCarry(UpdateCashAndCarryRequest $request, CashAndCarry $cashAndCarry)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->updateCashAndCarry($request->validated(), $cashAndCarry);
            DB::commit();
            $response = $this->apiResponseService->success(200, $result);
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function deleteCashAndCarry(ViewCashAndCarryRequest $request, CashAndCarry $cashAndCarry)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->deleteCashAndCarry($cashAndCarry);
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }
    /**
     * SALARY
     */
    public function createSalary(CreateSalaryRequest $request)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->createSalary($request->validated());
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }
    public function getSalary(ManageSalaryRequest $request, Salary $salary)
    {
        try {
            $result = $this->service->getSalary($salary);
            $response = $this->apiResponseService->success(200, $result);
            return $response;
        } catch (Exception $e) {
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function listSalary(ManageSalaryRequest $request)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->listSalary();
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function updateSalary(UpdateSalaryRequest $request, Salary $salary)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->updateSalary($request->validated(), $salary);
            DB::commit();
            $response = $this->apiResponseService->success(200, $result);
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function deleteSalary(ManageSalaryRequest $request, Salary $salary)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->deleteSalary($salary);
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    /**
     * EXPENSE
     */
    public function createExpense(CreateExpenseRequest $request)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->createExpense($request->validated());
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function getExpense(manageExpenseRequest $request, OtherExpense $otherExpense)
    {
        try {
            $result = $this->service->getExpense($otherExpense);
            $response = $this->apiResponseService->success(200, $result);

            return $response;
        } catch (Exception $e) {
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function listExpense(manageExpenseRequest $request)
    {
        try {
            $result = $this->service->listExpense();
            $response = $this->apiResponseService->success(200, $result);

            return $response;
        } catch (Exception $e) {
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function updateExpense(UpdateExpenseRequest $request, OtherExpense $otherExpense)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->updateExpense($request->validated(), $otherExpense);
            DB::commit();
            $response = $this->apiResponseService->success(200, $result);
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function deleteExpense(manageExpenseRequest $request, OtherExpense $otherExpense)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->deleteExpense($otherExpense);
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function scratchCardSaleSpecificDate(GetScratchSaleForDateRequest $request)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->scratchCardSaleSpecificDate($request->validated());
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
            $this->storeError([], $error);
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }
}
