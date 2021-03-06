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
        $index = random_int(0, 1);
        return [
            'uuid' => $this->faker->uuid(),
            'type' => $this->type($index),
            'amount' => $this->amount($index),
            'date' => Carbon::now()->format('Y-m-d'),
            'account_id' => Account::factory()
        ];
    }

    private function type($index)
    {
        return ['lend', 'borrow'][$index];
    }

    private function amount($index)
    {
        return [200, -200][$index];
    }
}
