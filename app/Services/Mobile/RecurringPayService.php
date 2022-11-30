<?php

namespace App\Services\Mobile;

use App\Models\User;
use App\Models\Saving;
use App\Models\Account;
use App\Models\RecurringPayment;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ExepenseResource;
use SebastianBergmann\Environment\Console;
use App\Http\Resources\RecurringPaymentResource;
use Exception;

class RecurringPayService
{
    public function store($data)
    {
        $today = date('Y-m-d');
        $payMethod = $data['pay_method'];
        $lastPayDate = null;
        $nextPayDate = null;
        $payNumber = null;
        $expense = null;
        if ($today > $data['start_date']) {
            throw new Exception('start date should be in future!!');
        }
        if ($data['start_date'] == $today) { //if start date === today
            $lastPayDate = $today;
            $nextPayDate = $this->getNextPayDate($payMethod, $today);
            $payNumber = 1;
            $expenseData = $this->prepareExpenseData($data, $today);

            $expense = Auth::user()->expenses()->create($expenseData);
        } else {
            $lastPayDate = $data['start_date'];
            $nextPayDate = $data['start_date'];
            $payNumber = 0;
        }
        $rpData = [
            'uuid' => $data['uuid'],
            'type' => $data['type'],
            'name' => $data['name'],
            'pay_method' => $data['pay_method'],
            'amount' => $data['amount'],
            'start_date' => $data['start_date'],
            'last_pay_date' => $lastPayDate,
            'next_pay_date' => $nextPayDate,
            'category' => $data['category'],
            'susbscription_type' => $data['susbscription_type'],
            'num_of_pay' => $data['num_of_pay'],
            'current_pay_num' => $payNumber,
            'status' => $data['status']
        ];

        $recurringPayment = Auth::user()->recurringPayments()->create($rpData);
        if ($payNumber == 1) {
            $recurringPayment->repeatPayments()->create([
                'amount' => $data['amount'],
                'pay_date' => $data['start_date']
            ]);
            return ['data' => [
                'recurring_payment' => new RecurringPaymentResource($recurringPayment->load('repeatPayments')),
                'expense_data' => new ExepenseResource($expense)
            ]];
        } else {
            return ['data' => [
                'recurring_payment' => new RecurringPaymentResource($recurringPayment->load('repeatPayments')),
                'expense_data' => null
            ]];
        }
    }

    public function edit(RecurringPayment $recurringPayment, $data)
    {
        $recurringPayment->update($data);
        $recurringPayment->refresh();
        return ['data' => new RecurringPaymentResource($recurringPayment->load('repeatPayments'))];
    }

    public function stop(RecurringPayment $recurringPayment)
    {
        $recurringPayment->update(['status' => 'completed', 'num_of_pay' => $recurringPayment->current_pay_num]);
        $recurringPayment->refresh();
        return ['data' => 'stopped successfully!!'];
    }

    private function getNextPayDate($payMethod, $today)
    {
        $nextPaymentDate = null;
        if ($payMethod == 'weekly') {
            $nextPaymentDate = date('Y-m-d', strtotime($today . '+7 days'));
        } else if ($payMethod == 'monthly') {
            $nextPaymentDate = date('Y-m-d', strtotime($today . '+1 months'));
        }
        return $nextPaymentDate;
    }

    private function prepareExpenseData($data, $today)
    {
        $category = explode(':', $data['category']);
        $day = (int)date('d', strtotime($today));
        $weekNumber = (int)floor($day / 7);
        $expenseData = [
            "uuid" => $data['uuid'],
            "type" => $data['type'],
            "date" => $today,
            "day" => $day,
            "month" => (int)date('m', strtotime($today)),
            "selectedCategory" => $data['category'],
            "week" => $weekNumber,
            "year" => (int)date('Y', strtotime($today)),
            "category" => $data['type'] == 'income' ? 'income' : $category[0],
            "subCategory" => $data['type'] == 'income' ? 'income' : $category[1],
            "amount" => $data['type'] == 'expense' ? -$data['amount'] : $data['amount']
        ];

        return $expenseData;
    }
}
