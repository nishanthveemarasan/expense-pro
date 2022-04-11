<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'category' => $this->faker->text(6),
            'items' => array('a', 'd', 'e'),
            'color' => $this->faker->hexColor()
        ];
    }
}
