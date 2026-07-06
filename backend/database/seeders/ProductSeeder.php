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

        $productTemplates = [
            'Forklifts' => [
                [
                    'name' => 'Noblelift Electric Forklift FE4P30Q',
                    'short_description' => '3.0 Ton high efficiency electric forklift with AC drive motor.',
                    'description' => 'Designed for heavy-duty applications, the Noblelift FE4P30Q electric forklift offers outstanding energy efficiency and operator comfort. Featuring advanced AC control systems, low noise, and zero emissions, it is ideal for indoor warehouse operations.',
                    'price' => 18500.00,
                ],
                [
                    'name' => 'Diesel Forklift FD30 Standard',
                    'short_description' => '3.0 Ton diesel-powered forklift designed for heavy outdoor lifting.',
                    'description' => 'The FD30 diesel forklift is engineered for rugged outdoor environments. Equipped with a reliable Isuzu engine, high torque, and excellent visibility, it handles container loading and pallet handling tasks with ease.',
                    'price' => 16200.00,
                ],
            ],
            'Electric Stackers' => [
                [
                    'name' => 'Noblelift Full Electric Stacker PS16N',
                    'short_description' => '1.6 Ton capacity walkie electric stacker with 3.3m lifting height.',
                    'description' => 'The Noblelift PS16N walkie stacker is perfect for light to medium duty stacking operations in narrow aisles. Features electric steering, proportional lifting controls, and a robust German-designed mast.',
                    'price' => 4500.00,
                ],
                [
                    'name' => 'Semi-Electric Stacker SPM15',
                    'short_description' => '1.5 Ton capacity manual push, electric lift warehouse stacker.',
                    'description' => 'The SPM15 provides an economical solution for occasional stacking and truck loading. It features manual horizontal movement with electric vertical lift to optimize warehouse productivity at a fraction of the cost.',
                    'price' => 2200.00,
                ],
            ],
            'Hand Pallet Trucks' => [
                [
                    'name' => 'Manual Hand Pallet AC25',
                    'short_description' => '2.5 Ton capacity standard industrial hand pallet jack.',
                    'description' => 'The AC25 is the workhorse of warehouse horizontal transport. Built with high-strength steel, an integrated leak-proof hydraulic pump, and polyurethane wheels for smooth operation.',
                    'price' => 350.00,
                ],
            ],
            'Scissor Lifts & Aerial Work Platforms' => [
                [
                    'name' => 'Self-propelled Scissor Lift SC10H',
                    'short_description' => '10 meter working height electric scissor lift for indoor maintenance.',
                    'description' => 'The SC10H scissor lift provides a safe and stable platform for aerial maintenance and installation. Features proportional controls, pothole protection, and extends up to 10 meters working height.',
                    'price' => 9500.00,
                ],
            ],
        ];

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
