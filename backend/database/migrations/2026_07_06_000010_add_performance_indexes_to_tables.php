<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->index('status', 'products_status_index');
            $table->index('featured', 'products_featured_index');
        });

        Schema::table('contact_messages', function (Blueprint $table) {
            $table->index('is_read', 'contact_messages_is_read_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex('products_status_index');
            $table->dropIndex('products_featured_index');
        });

        Schema::table('contact_messages', function (Blueprint $table) {
            $table->dropIndex('contact_messages_is_read_index');
        });
    }
};
