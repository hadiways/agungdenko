<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->unique()->words(3, true);

        return [
            'name' => ucwords($name),
            'slug' => Str::slug($name),
            'category_id' => Category::factory(),
            'short_description' => fake()->paragraph(1),
            'description' => fake()->paragraphs(3, true),
            'specification' => fake()->text(),
            'thumbnail' => 'products/placeholder_thumbnail.jpg',
            'images' => [
                'products/placeholder_image_1.jpg',
                'products/placeholder_image_2.jpg',
            ],
            'price' => fake()->randomFloat(2, 500, 10000),
            'status' => fake()->randomElement(['active', 'inactive', 'draft']),
            'featured' => fake()->boolean(20), // 20% chance to be featured
        ];
    }
}
