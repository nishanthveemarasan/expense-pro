<?php

namespace Database\Factories;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class RecurringPaymentFactory extends Factory
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
            'type' => 'expense',
            'user_id' => User::factory(),
            'name' => $this->faker->word(10),
            'pay_method' => 'monthly',
            'amount' => 250,
            'start_date' => Carbon::now()->format('Y-m-d'),
            'last_pay_date' => Carbon::now()->format('Y-m-d'),
            'next_pay_date' => Carbon::now()->format('Y-m-d'),
            'category' => $this->faker->word(6),
            'susbscription_type' => 'limited',
            'num_of_pay' => 12,
            'current_pay_num' => 1,
            'status' => 'active'
        ];
    }
}
