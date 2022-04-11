<?php

namespace Database\Factories;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class SavingFactory extends Factory
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
            'description' => $this->faker->word(10),
            'type' => 'add',
            'date' => Carbon::now()->format('Y-m-d'),
            'amount' => 250,
            'user_id' => User::factory(),
        ];
    }
}
