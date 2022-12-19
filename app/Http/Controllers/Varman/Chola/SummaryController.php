<?php

namespace App\Http\Controllers\Varman\Chola;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Services\APIResponseService;
use App\Services\Varman\Chola\SummaryService;
use App\Http\Requests\Varman\Chola\GenerateSummaryReportRequest;
use App\Http\Requests\Varman\Chola\ManageSaleReportRequest;
use App\Models\SaleReport;

class SummaryController extends Controller
{
    public $service;
    public $apiResponseService;
    public function __construct(SummaryService $service, APIResponseService $apiResponseService)
    {
        $this->service = $service;
        $this->apiResponseService = $apiResponseService;
    }

    public function reportList(ManageSaleReportRequest $request)
    {
        try {
            $result = $this->service->reportList();
            $response = $this->apiResponseService->success(200, $result);
            return $response;
        } catch (Exception $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function summaryReport(GenerateSummaryReportRequest $request)
    {
        try {
            DB::beginTransaction();
            $response = $this->service->summaryReport($request->validated());
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function downloadReport(ManageSaleReportRequest $request, SaleReport $saleReport)
    {
        try {
            $response = $this->service->downloadReport($saleReport);
            return $response;
        } catch (Exception $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }
}
