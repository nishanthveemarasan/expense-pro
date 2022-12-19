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

        $datePeriod = [$data['from_date'], $data['to_date']];
        $dailySale = $company->dailyReports()->whereBetween('date', $datePeriod)->orderBy('date', 'DESC')->get();
        $purchase = $company->cashAndCarries()->whereBetween('date', $datePeriod)->orderBy('date', 'DESC')->get();
        $salary = $company->salaries()->whereBetween('date', $datePeriod)->orderBy('date', 'DESC')->get();
        $extraExpense = $company->otherExpenses()->whereBetween('date', $datePeriod)->orderBy('date', 'DESC')->get();

        $totalDailySale = $company->dailyReports()->whereBetween('date', $datePeriod)->sum('total_daily_sale');
        $totalPurchase = $company->cashAndCarries()->whereBetween('date', $datePeriod)->sum('amount');
        $totalSalary = $company->salaries()->whereBetween('date', $datePeriod)->sum('amount');
        $totalExtraExpense = $company->otherExpenses()->whereBetween('date', $datePeriod)->sum('amount');

        $totalSpending = $totalPurchase + $totalSalary + $totalExtraExpense;
        $balance = $totalDailySale - $totalSpending;

        $pdfData = [
            'name' => $company->name,
            'period' => [
                'from' => $data['from_date'],
                'to' => $data['to_date']
            ],
            'summary' => [
                'total_earning' => $this->formatAmount($totalDailySale),
                'total_spending' => $this->formatAmount($totalSpending),
                'balance' => $this->formatAmount($balance)
            ],
            'categoryWise' => [
                'total_daily_sale' => $this->formatAmount($totalDailySale),
                'total_purchase' => $this->formatAmount($totalPurchase),
                'total_salary' => $this->formatAmount($totalSalary),
                'total_other_expense' => $this->formatAmount($totalExtraExpense),
            ],
            'tableData' => [
                'daily_sale' => $dailySale->toArray(),
                'purchase' => $purchase->toArray(),
                'salary' => $salary->toArray(),
                'extra_expense' => $extraExpense->toArray(),
            ]
        ];

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
