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
        // dd($company->children()->count());
        $companyUsers = CompanyUser::where('company_id', $company->id)->whereHas('user.roles', function (Builder $query) {
            $query->where('name', 'chola_admin');
            $query->where('guard_name', 'api');
        })->get();
        $array = [];
        foreach ($companyUsers as $company) {
            array_push($array, $company->user->email);
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
        $this->storePayouts($data['payout'], $company);
        $this->storeCards($data['cards'], $company);

        $dailyTotalSale = $data['shopSale'] + $data['payPoint'] + $data['lottery'] + $data['scratch'];
        $formattedDailyTotalSale = $this->formatAmount($dailyTotalSale);

        $payouts = $this->totalPayouts($data['payout']);
        $cards = $this->totalCardPayments($data['cards']);
        $totalPayouts = $payouts + $cards + $data['cash'];
        $formattedTotalPayouts = $this->formatAmount($totalPayouts);

        $balance = $totalPayouts - $dailyTotalSale;

        $formattedBalace = $balance < 0 ? -$this->formatAmount($balance) : $this->formatAmount($balance);

        $data['totalDailySale'] = $formattedDailyTotalSale;
        $data['totalPayouts'] = $formattedTotalPayouts;
        $data['balance'] = $formattedBalace;
        $data['user'] = $user->name;

        return $data;
    }
}
