<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Gallery>
 */
class GalleryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'image' => 'gallery/placeholder.jpg',
            'category' => fake()->randomElement(['Forklift', 'Stacker', 'Hand Truck', 'Scissor Lift']),
        ];
    }
}
