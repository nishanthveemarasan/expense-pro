<?php

namespace App\Http\Controllers\Varman\Chola;

use Exception;
use App\Traits\ErrorHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\Varman\Chola\ApproveDailyScratchCardRequest;
use App\Http\Requests\Varman\Chola\DeleteDailyScratchCardRequest;
use App\Http\Requests\Varman\Chola\GetScratchCardSaleInfoRequest;
use App\Services\APIResponseService;
use App\Http\Requests\Varman\Chola\StoreScratchCardRequest;
use App\Http\Requests\Varman\Chola\UpdateDailyScratchCardPriceRequest;
use App\Http\Requests\Varman\Chola\UpdateScratchCardSaleInfoRequest;
use App\Http\Requests\Varman\Chola\ViewScratchCardRequest;
use App\Models\DailyScratchCardSale;
use App\Services\Varman\Chola\ScratchCardService;

class ScratchCardController extends Controller
{
    use ErrorHelper;

    public $service;
    public $apiResponseService;
    public function __construct(APIResponseService $apiResponseService, ScratchCardService $service)
    {
        $this->service = $service;
        $this->apiResponseService = $apiResponseService;
    }
    public function storeScratchCard(StoreScratchCardRequest $request)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->storeScratchCard($request->validated());
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

    public function getInfo(ViewScratchCardRequest $request)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->getInfo();
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
     * SCRATCH CARD DAILY SALES
     */
    public function getTodayInfo(GetScratchCardSaleInfoRequest $request)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->getTodayInfo();
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

    public function updateDailySaleOpenStock(UpdateScratchCardSaleInfoRequest $request, DailyScratchCardSale $dailyScratchCardSale)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->updateDailySaleOpenStock($request->validated(), $dailyScratchCardSale);
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

    public function updateDailySaleCloseStock(UpdateScratchCardSaleInfoRequest $request, DailyScratchCardSale $dailyScratchCardSale)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->updateDailySaleCloseStock($request->validated(), $dailyScratchCardSale);
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

    public function approveDailySale(ApproveDailyScratchCardRequest $request, DailyScratchCardSale $dailyScratchCardSale)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->approveDailySale($dailyScratchCardSale);
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

    public function deleteDailySale(DeleteDailyScratchCardRequest $request, DailyScratchCardSale $dailyScratchCardSale)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->deleteDailySale($dailyScratchCardSale);
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

    public function getDailyReportData(GetScratchCardSaleInfoRequest $request, DailyScratchCardSale $dailyScratchCardSale)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->getDailyReportData($dailyScratchCardSale);
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

    public function list(ViewScratchCardRequest $request)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->list();
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

    public function updateCardPrice(UpdateDailyScratchCardPriceRequest $request, DailyScratchCardSale $dailyScratchCardSale)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->updateCardPrice($request->validated(), $dailyScratchCardSale);
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
