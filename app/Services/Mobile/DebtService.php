<?php

namespace App\Services\Mobile;

use App\Http\Resources\AccountNameResource;
use App\Http\Resources\MobileAccountResource;
use App\Models\User;
use App\Models\Saving;
use App\Models\Account;
use App\Models\Debt;
use App\Models\MobileDebt;
use Illuminate\Support\Facades\Auth;

class DebtService
{
    public function store($data)
    {
        $account = Auth::user()->mobileAccounts()->firstOrCreate(
            ['name' => $data['formData']['name']],
        );

        $debt = $account->mobileDebts()->create(
            [
                'uuid' => $data['formData']['uuid'],
                'type' => $data['formData']['type'],
                'amount' => $data['formData']['amount'],
                'description' => $data['formData']['description'],
                'date' => $data['formData']['date'],
            ]
        );

        $account->refresh();

        return ['data' => $debt->uuid];
    }

    public function index()
    {
        // dd($this->user->mobileAccounts->toArray());
        $userData = Auth::user()->load('mobileAccounts', 'mobileAccounts.mobileDebts');

        $lend = collect();
        $borrow = collect();

        $userData->mobileAccounts->map(function ($account) use (&$lend, &$borrow) {
            $account->mobileDebts->map(function ($debt) use (&$lend, &$borrow, $account) {
                $array = [
                    'uuid' => $debt->uuid,
                    'name' => $account->name,
                    'amount' => $debt->amount,
                    'type' => $debt->type,
                    'description' => $debt->description,
                    'date' => $debt->date->format('Y-m-d')
                ];
                if ($debt->type == 'lend') {
                    $lend->push($array);
                } else {
                    $borrow->push($array);
                }
            });
        });

        return [
            'data' => [
                'debtData' => MobileAccountResource::collection($userData->mobileAccounts),
                'lendData' => $lend,
                'borrowData' => $borrow,
                'names' => AccountNameResource::collection($userData->mobileNames)
            ]
        ];
    }

    public function update($data, MobileDebt $mobileDebt)
    {
        $mobileDebt->update([
            'type' => $data['formData']['type'],
            'amount' => $data['formData']['amount'],
            'description' => $data['formData']['description'],
            'date' => $data['formData']['date'],
        ]);

        return ['data' => 'Debt created/updated successfully!!'];
    }

    public function delete(MobileDebt $mobileDebt)
    {
        $mobileDebt->delete();

        return ['data' => 'Debt deleted successfully!!'];
    }
}
