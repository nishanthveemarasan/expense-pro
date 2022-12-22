<?php

namespace App\Services\Varman\Chola;

use PDF;
use Carbon\Carbon;
use App\Models\User;
use App\Models\SaleReport;
use App\Models\CompanyUser;
use Illuminate\Support\Str;
use App\Traits\CompanyHelper;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class SummaryService
{
    use CompanyHelper;

    private function company(User $user)
    {
        $companyUser = CompanyUser::where('user_id', $user->id)->first();
        $company = $companyUser->company;
        return $company;
    }

    public function summaryReport($data)
    {
        $user = Auth::user();
        $company = $this->company($user);

        $pdfData = $this->calculateSummary($data, $company);

        $timeStamp = Carbon::now()->timestamp;
        $fileName = "sale_report_{$timeStamp}_{$data['from_date']}_{$data['to_date']}";

        $pdf = PDF::loadView('sale-summary', $pdfData);
        $pdf->setPaper('A4', 'portrait');


        $pdf->save(public_path("/z/b/d/reports/{$fileName}.pdf"));

        $company->saleReports()->create([
            'from_date' => $data['from_date'],
            'to_date' => $data['to_date'],
            'total_sale' => $pdfData['summary']['total_earning'],
            'total_expemse' => $pdfData['summary']['total_spending'],
            'total_balance' => $pdfData['summary']['balance'],
            'user_id' => $user->id,
            'file_url' => '/z/b/d/reports',
            'file_name' => $fileName
        ]);

        return $pdf->download($fileName);
    }

    public function downloadReport(SaleReport $saleReport)
    {
        $fileName = "{$saleReport->file_name}.pdf";
        $filePath = public_path("{$saleReport->file_url}/{$fileName}");
        return response()->download($filePath, $fileName);
    }

    public function reportList()
    {
        $user = Auth::user();
        $company = $this->company($user);

        return $company->saleReports()->orderBy('id', 'DESC')->paginate(20);
    }
}
