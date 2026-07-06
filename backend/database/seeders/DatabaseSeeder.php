<?php

namespace Database\Seeders;

use App\Models\ContactMessage;
use App\Models\Gallery;
use App\Models\Partner;
use App\Models\Service;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Call structured seeders
        $this->call([
            RoleAndPermissionSeeder::class,
            SettingSeeder::class,
            CategorySeeder::class,
            ProductSeeder::class,
        ]);

        // Seed Services
        Service::factory()->count(5)->create();

        // Seed Gallery
        Gallery::factory()->count(8)->create();

        // Seed Partners
        Partner::factory()->count(6)->create();

        // Seed Testimonials
        Testimonial::factory()->count(5)->create();

        // Seed Contact Messages
        ContactMessage::factory()->count(12)->create();
    }
}
