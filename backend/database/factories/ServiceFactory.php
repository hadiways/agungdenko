<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->unique()->words(2, true);

        return [
            'title' => ucwords($title),
            'slug' => Str::slug($title),
            'icon' => fake()->randomElement(['fa-forklift', 'fa-cogs', 'fa-wrench', 'fa-truck-loading']),
            'image' => 'services/placeholder.jpg',
            'description' => fake()->paragraph(),
        ];
    }
}
