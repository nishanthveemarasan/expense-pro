<?php

namespace Database\Factories;

use Carbon\Carbon;
use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskItemFactory extends Factory
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
            'task_id' => Task::factory(),
            'name' => $this->faker->word(30),
            'completed' => 0,
            'order' => 1,
        ];
    }
}
