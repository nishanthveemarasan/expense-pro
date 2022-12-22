<?php

namespace App\Traits;

use App\Models\User;
use App\Models\PayOut;
use App\Models\Company;
use App\Models\CardPayment;
use App\Models\CompanyUser;
use Illuminate\Database\Eloquent\Builder;

trait CompanyHelper
{
    public function getAdmins(Company $company)
    {
        $companyUsers = CompanyUser::where('company_id', $company->id)->whereHas('user.roles', function (Builder $query) {
            $query->where('name', 'chola_admin');
            $query->where('guard_name', 'api');
        })->get();
        $array = [];
        foreach ($companyUsers as $company) {
            if ($company->user->status == 1 && $company->user->email) {
                array_push($array, $company->user->email);
            }
        }
        return $array;
    }
    public function makeSelectArray($data)
    {
        $array = [];
        foreach ($data as $item) {
            $arrayItem = ['value' => $item, 'label' => $item];
            array_push($array, $arrayItem);
        }
        return $array;
    }

    public function totalPayouts($payouts)
    {
        $total = 0;
        foreach ($payouts as $payout) {
            $total += $payout['amount'];
        }
        return $total;
    }

    public function totalCardPayments($cards)
    {
        $total = 0;
        foreach ($cards as $card) {
            $total += $card['amount'];
        }
        return $total;
    }

    public function storePayouts($payouts, Company $company)
    {
        foreach ($payouts as $payout) {
            $company->payOuts()->firstOrCreate(['name' => $payout['type']]);
        }
    }

    public function storeCards($cards, Company $company)
    {
        foreach ($cards as $card) {
            $company->cardPayments()->firstOrCreate(['name' => $card['type']]);
        }
    }

    public function formatAmount($amount)
    {
        return $amount >= 0 ? abs(round($amount, 2)) : -abs(round($amount, 2));
    }

    public function createStore($data, Company $company)
    {
        foreach ($data as $item) {
            $store = $item['store'];
            $company->stores()->firstOrCreate(['name' => $store]);
        }
    }

    public function calculate($data, Company $company, User $user)
    {
        $this->calculatteShopSale($data['shopSale']);
        $this->storePayouts($data['payout'], $company);
        $this->storeCards($data['cards'], $company);

        $dailyTotalSale = $data['shopSale']['net_sale'] + $data['payPoint'] + $data['lottery'] + $data['scratch'];
        $formattedDailyTotalSale = $this->formatAmount($dailyTotalSale);

        $payouts = $this->totalPayouts($data['payout']);

        $cards = $this->totalCardPayments($data['cards']);
        $totalPayouts = $payouts + $cards + $data['cash'];
        $formattedTotalPayouts = $this->formatAmount($totalPayouts);

        $balance = $totalPayouts - $dailyTotalSale;
        $formattedBalace = $this->formatAmount($balance);

        $data['totalDailySale'] = $formattedDailyTotalSale;
        $data['onlyPayoutTotal'] = $payouts;
        $data['totalPayouts'] = $formattedTotalPayouts;
        $data['balance'] = $formattedBalace;
        $data['user'] = $user->name;

        return $data;
    }

    private function calculatteShopSale(&$shopShale)
    {
        $netSale = $shopShale['shop_sales'] - $shopShale['p_discounts'] - $shopShale['g_discounts'];
        $shopShale['net_sale'] = $this->formatAmount($netSale);
    }

    public function calculateSummary($data, Company $company)
    {
        $datePeriod = [$data['from_date'], $data['to_date']];
        $dailySale = $company->dailyReports()->whereBetween('date', $datePeriod)->orderBy('date', 'DESC')->get();
        $purchase = $company->cashAndCarries()->whereBetween('date', $datePeriod)->orderBy('date', 'DESC')->get();
        $salary = $company->salaries()->whereBetween('date', $datePeriod)->orderBy('date', 'DESC')->get();
        $extraExpense = $company->otherExpenses()->whereBetween('date', $datePeriod)->orderBy('date', 'DESC')->get();

        $totalDailySale = $company->dailyReports()->whereBetween('date', $datePeriod)->sum('total_daily_sale');
        $totalPurchase = $company->cashAndCarries()->whereBetween('date', $datePeriod)->sum('amount');
        $totalSalary = $company->salaries()->whereBetween('date', $datePeriod)->sum('amount');
        $totalExtraExpense = $company->otherExpenses()->whereBetween('date', $datePeriod)->sum('amount');

        $totalSpending = $company->dailyReports()->whereBetween('date', $datePeriod)->sum('only_payout_total');
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

        return $pdfData;
    }
}
