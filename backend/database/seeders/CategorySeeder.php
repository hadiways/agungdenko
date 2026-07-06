<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Forklifts',
                'description' => 'Heavy duty industrial forklifts including electric, diesel, and LPG models.',
            ],
            [
                'name' => 'Electric Stackers',
                'description' => 'Compact and powerful pedestrian and rider-on electric stackers for warehouse lifting.',
            ],
            [
                'name' => 'Hand Pallet Trucks',
                'description' => 'High-quality manual and semi-electric hand pallet jacks for horizontal cargo transport.',
            ],
            [
                'name' => 'Scissor Lifts & Aerial Work Platforms',
                'description' => 'Vertical lifting solutions for maintenance and high-altitude warehouse work.',
            ],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => $category['description'],
            ]);
        }
    }
}
