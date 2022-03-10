<?php

namespace App\Console\Commands;

use App\Models\RecurringPayment;
use App\Models\User;
use Exception;
use Illuminate\Support\Str;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SendRecurringPayment extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'recurring:payment';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('command started');
        $today = date('Y-m-d');
        $activeRecurringPayments = RecurringPayment::isActive()
            ->without(['repeatPayments'])->get();
        if (count($activeRecurringPayments) > 0) {

            foreach ($activeRecurringPayments as $payment) {

                $currentPayment = $payment->makeVisible('user_id')->toArray();

                if ($currentPayment['next_pay_date'] == $today) {
                    try {
                        DB::beginTransaction();
                        $lastPayDate = $today;
                        $currentPayNumber = $currentPayment['current_pay_num'] + 1;
                        $status = 'active';
                        $nextPayDate = $this->getNextPayDate($currentPayment['pay_method'], $today);
                        if ($currentPayment['num_of_pay'] == $currentPayNumber) {
                            $status = 'completed';
                            $nextPayDate = $today;
                        }
                        $debtData = $this->prepareExpenseData($currentPayment, $today);

                        $payment->user->expenses()->create($debtData);

                        $payment->update([
                            "last_pay_date" => $lastPayDate,
                            "next_pay_date" => $nextPayDate,
                            "status" => $status,
                            "current_pay_num" => $currentPayNumber
                        ]);

                        $payment->repeatPayments()->create([
                            'amount' => $currentPayment['amount'],
                            'pay_date' => $today
                        ]);
                        DB::commit();
                        Log::info($payment->id . ' is successful!!');
                    } catch (Exception $error) {
                        DB::rollBack();
                        Log::info($error->getMessage() . 'something wrong with payment ' . $payment->id);
                    }
                }
            }
        }
        Log::info('recurring payment completed for today');
        $this->info('completed');
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
/*
if ($data['next_pay_date'] == $today) {
    $lastPayDate = $today;
    $currentPayNumber += 1;
    if ($totalNumber == $currentPayNumber) {
        $status = 'completed';
    } else {
        $nextPayDate = self::getNextPayDate($payMethod, $today);
    }
    dd($payMethod, $lastPayDate, $nextPayDate, $totalNumber, $currentPayNumber, $status);
    //create repeat payment
    //create entry in debt table
}
"uuid" => "94619557-7fdd-4376-b2de-7801cca85eb3"
  "type" => "expense"
  "name" => "Mobile Payment"
  "pay_method" => "weekly"
  "amount" => 250.0
  "start_date" => "2022-03-09T00:00:00.000000Z"
  "last_pay_date" => "2022-03-09T00:00:00.000000Z"
  "next_pay_date" => "2022-03-16T00:00:00.000000Z"
  "category" => "Health:Prescription"
  "susbscription_type" => "limited"
  "num_of_pay" => 12
  "current_pay_num" => 1
  "status" => "active"

  */
