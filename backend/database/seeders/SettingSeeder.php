<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        Setting::create([
            'company_name' => 'PT Denko Wahana Sakti',
            'address' => 'Kawasan Industri Jababeka, Cikarang, Bekasi, Jawa Barat, Indonesia',
            'phone' => '+62 21 8984 0000',
            'email' => 'info@dws.co.id',
            'whatsapp' => '+62 812 3456 7890',
            'facebook' => 'https://facebook.com/denkowahanasakti',
            'instagram' => 'https://instagram.com/denkowahanasakti',
            'linkedin' => 'https://linkedin.com/company/pt-denko-wahana-sakti',
            'youtube' => 'https://youtube.com/@denkowahanasakti',
            'logo' => 'company/logo.png',
            'favicon' => 'company/favicon.png',
            'hero_image' => 'company/hero_bg.jpg',
        ]);
    }
}
