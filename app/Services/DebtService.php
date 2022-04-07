<?php

namespace App\Services;

use App\Http\Resources\AccountNameResource;
use App\Http\Resources\AccountResource;
use App\Models\User;
use App\Models\Saving;
use App\Models\Account;
use App\Models\Debt;
use Illuminate\Support\Facades\Auth;

class DebtService
{

    public function store($data)
    {
        $user = Auth::user();
        $account = Account::firstOrCreate(
            ['name' => $data['formData']['name']],
        );

        $debt = $account->debts()->create(
            [
                'uuid' => $data['formData']['uuid'],
                'type' => $data['formData']['type'],
                'amount' => $data['formData']['amount'],
                'description' => $data['formData']['description'],
                'date' => $data['formData']['date'],
            ]
        );

        $account->refresh();

        $user->accounts()->syncWithoutDetaching($account->id);

        return ['data' => $debt->uuid];
    }

    public function index()
    {
        $user = Auth::user();

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
                'debtData' => AccountResource::collection($userData->accounts),
                'lendData' => $lend,
                'borrowData' => $borrow,
                'names' => AccountNameResource::collection($userData->names)
            ]
        ];
    }

    public function update($data, Debt $debt)
    {

        $debt->update([
            'type' => $data['formData']['type'],
            'amount' => $data['formData']['amount'],
            'description' => $data['formData']['description'],
            'date' => $data['formData']['date'],
        ]);

        return ['data' => 'Debt created/updated successfully!!'];
    }
}
