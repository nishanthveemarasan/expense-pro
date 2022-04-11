<?php

namespace Database\Factories;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $index = random_int(0, 1);
        $date = Carbon::now();

        return [
            'uuid' => $this->faker->uuid(),
            'type' => $this->type($index),
            'amount' => $this->amount($index),
            'date' => $date->format('Y-m-d'),
            'day' => $date->day,
            'month' => $date->month,
            'year' => $date->year,
            'week' => 1,
            'selectedCategory' => $this->faker->word(6),
            'category' => $this->faker->word(6),
            'subCategory' => $this->faker->word(6),
            'amount' => $this->amount($index),
            'user_id' => User::factory()
        ];
    }

    private function type($index)
    {
        return ['income', 'expense'][$index];
    }

    private function amount($index)
    {
        return [200, -200][$index];
    }
}
