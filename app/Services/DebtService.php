<?php

namespace App\Services;

use App\Models\User;
use App\Models\Saving;
use App\Models\Account;

class DebtService
{

    public function store($data)
    {
        $user = User::find(1);
        $account = Account::firstOrCreate(
            ['name' => $data['formData']['name']],
        );

        $account->debts()->updateOrCreate(
            ['uuid' => $data['formData']['uuid']],
            [
                'type' => $data['formData']['type'],
                'amount' => $data['formData']['amount'],
                'description' => $data['formData']['description'],
                'date' => $data['formData']['date'],
            ]
        );

        $account->refresh();

        $user->accounts()->syncWithoutDetaching($account->id);

        return ['data' => 'Debt created/updated successfully!!'];
    }

    public function index()
    {
        $user = User::find(1);

        $userData = $user->load('accounts', 'accounts.debts');

        $lend = collect();
        $borrow = collect();

        $userData->accounts->map(function ($account) use (&$lend, &$borrow) {
            $account->debts->map(function ($debt) use (&$lend, &$borrow, $account) {
                $array = [
                    'uuid' => $debt->uuid,
                    'name' => $account->name,
                    'amount' => $debt->amount,
                    'type' => $debt->type,
                    'description' => $debt->description,
                    'date' => $debt->date
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
                'debtData' => $userData->accounts,
                'lendData' => $lend,
                'borrowData' => $borrow,
                'names' => $userData->names
            ]
        ];
    }
}
