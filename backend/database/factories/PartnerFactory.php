<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Partner>
 */
class PartnerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'company_name' => fake()->company(),
            'logo' => 'partners/placeholder_logo.png',
            'website' => fake()->url(),
        ];
    }
}
