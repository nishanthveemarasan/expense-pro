<?php

namespace Database\Factories;

use App\Models\RecurringPayment;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class RepeatPaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'uuid' => $this->faker->uuid(),
            'recurring_payment_id' => RecurringPayment::factory(),
            'amount' => 250,
            'pay_date' => Carbon::now()->format('Y-m-d'),
        ];
    }
}
