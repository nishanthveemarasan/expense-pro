<?php

namespace Database\Factories;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
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
            'title' => $this->faker->word(30),
            'type' => 'work',
            'completed' => 0,
            'date' => Carbon::now()->format('Y-m-d'),
            'user_id' => User::factory(),
        ];
    }
}
