<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Testimonial>
 */
class TestimonialFactory extends Factory
{
    public function definition(): array
    {
        return [
            'customer_name' => fake()->name(),
            'company' => fake()->company(),
            'position' => fake()->jobTitle(),
            'photo' => 'testimonials/placeholder_avatar.jpg',
            'testimonial' => fake()->paragraph(),
            'rating' => fake()->numberBetween(4, 5),
        ];
    }
}
