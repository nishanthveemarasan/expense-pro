<?php

namespace Database\Factories;

use App\Models\Account;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class DebtFactory extends Factory
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
            'type' => 'lend',
            'amount' => 200,
            'date' => Carbon::now()->format('Y-m-d'),
            'account_id' => Account::factory()
        ];
    }

    private function type()
    {
        return ['lend', 'borrow'][random_int(0, 1)];
    }
}
