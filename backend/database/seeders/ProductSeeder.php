<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();

        $productTemplates = [];

        foreach ($productTemplates as $catName => $products) {
            $category = $categories->where('name', $catName)->first();
            if ($category) {
                foreach ($products as $prod) {
                    Product::create([
                        'name' => $prod['name'],
                        'slug' => Str::slug($prod['name']),
                        'category_id' => $category->id,
                        'short_description' => $prod['short_description'],
                        'description' => $prod['description'],
                        'specification' => "Capacity: " . substr($prod['short_description'], 0, 7) . "\nEngine/Motor: AC Electric\nWheels: Polyurethane\nWarranty: 1 Year",
                        'thumbnail' => 'products/' . Str::slug($prod['name']) . '-thumb.jpg',
                        'images' => [
                            'products/' . Str::slug($prod['name']) . '-1.jpg',
                            'products/' . Str::slug($prod['name']) . '-2.jpg',
                        ],
                        'price' => $prod['price'],
                        'status' => 'active',
                        'featured' => true,
                    ]);
                }
            }
        }
    }
}
