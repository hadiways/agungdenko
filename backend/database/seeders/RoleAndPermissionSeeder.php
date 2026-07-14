<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Permissions
        $permissions = [
            // User Management
            'manage-users',
            'manage-roles',
            'manage-permissions',

            // Products
            'view-products',
            'create-products',
            'edit-products',
            'delete-products',

            // Services
            'view-services',
            'create-services',
            'edit-services',
            'delete-services',

            // Gallery
            'view-gallery',
            'create-gallery',
            'edit-gallery',
            'delete-gallery',

            // Partners
            'view-partners',
            'create-partners',
            'edit-partners',
            'delete-partners',

            // Testimonials
            'view-testimonials',
            'create-testimonials',
            'edit-testimonials',
            'delete-testimonials',

            // Settings
            'view-settings',
            'edit-settings',

            // Messages
            'view-messages',
            'delete-messages',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create Roles and Assign Permissions
        $superAdminRole = Role::firstOrCreate(['name' => 'Super Admin']);
        // Super Admin gets all permissions implicitly via Gate::before in AuthServiceProvider

        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $adminRole->givePermissionTo([
            'view-products', 'create-products', 'edit-products', 'delete-products',
            'view-services', 'create-services', 'edit-services', 'delete-services',
            'view-gallery', 'create-gallery', 'edit-gallery', 'delete-gallery',
            'view-partners', 'create-partners', 'edit-partners', 'delete-partners',
            'view-testimonials', 'create-testimonials', 'edit-testimonials', 'delete-testimonials',
            'view-settings', 'edit-settings',
            'view-messages', 'delete-messages',
        ]);

        $editorRole = Role::firstOrCreate(['name' => 'Editor']);
        $editorRole->givePermissionTo([
            'view-products', 'create-products', 'edit-products',
            'view-services', 'create-services', 'edit-services',
            'view-gallery', 'create-gallery', 'edit-gallery',
            'view-testimonials', 'create-testimonials', 'edit-testimonials',
        ]);

        // Create Default Super Admin User
        $adminUser = User::firstOrCreate(
            ['email' => 'agung@denko.co.id'],
            [
                'name' => 'Agung Denko Admin',
                'email_verified_at' => now(),
                'password' => bcrypt('agung123'),
            ]
        );

        $adminUser->assignRole($superAdminRole);
    }
}
