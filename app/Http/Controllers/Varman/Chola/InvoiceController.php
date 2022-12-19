<?php

namespace App\Http\Controllers\Varman\Chola;

use Exception;
use Illuminate\Http\Request;
use App\Models\CompanyInformation;
use App\Http\Controllers\Controller;
use App\Services\APIResponseService;
use App\Services\Varman\Chola\InvoiceService;
use App\Http\Requests\Varman\Chola\GenerateInvoicePdfRequest;
use App\Http\Requests\Varman\Chola\ViewInvoiceListRequest;
use App\Models\CholaInvoice;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    public $invoiceService;
    public $apiResponseService;
    public function __construct(InvoiceService $invoiceService, APIResponseService $apiResponseService)
    {
        $this->invoiceService = $invoiceService;
        $this->apiResponseService = $apiResponseService;
    }

    public function generatePdf(GenerateInvoicePdfRequest $request, CompanyInformation $companyInformation)
    {
        try {
            DB::beginTransaction();
            $response =  $this->invoiceService->generateInvoicePdf($request->validated(), $companyInformation);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            return $this->apiResponseService->failed($e->getMessage(), 500, $e->getLine());
        }
    }

    public function downloadPdf(CompanyInformation $companyInformation, CholaInvoice $cholaInvoice)
    {
        try {
            $response =  $this->invoiceService->downloadPdf($companyInformation, $cholaInvoice);
            return $response;
        } catch (Exception $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500, $e->getLine());
        }
    }

    public function list(ViewInvoiceListRequest $request)
    {
        try {
            $response =  $this->invoiceService->list();
            return $this->apiResponseService->success(200, $response);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->apiResponseService->failed($e->getMessage(), 500, $e->getLine());
        }
    }
}
