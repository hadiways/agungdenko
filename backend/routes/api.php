<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactApiController;
use App\Http\Controllers\Api\GalleryApiController;
use App\Http\Controllers\Api\PartnerApiController;
use App\Http\Controllers\Api\ProductApiController;
use App\Http\Controllers\Api\ServiceApiController;
use App\Http\Controllers\Api\SettingApiController;
use App\Http\Controllers\Api\TestimonialApiController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public Routes (Frontend Integration with Rate Limiting)
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');

Route::middleware('throttle:60,1')->group(function () {
    Route::get('/products', [ProductApiController::class, 'index']);
    Route::get('/products/{slug}', [ProductApiController::class, 'show']);
    Route::get('/services', [ServiceApiController::class, 'index']);
    Route::get('/gallery', [GalleryApiController::class, 'index']);
    Route::get('/partners', [PartnerApiController::class, 'index']);
    Route::get('/testimonials', [TestimonialApiController::class, 'index']);
    Route::get('/settings', [SettingApiController::class, 'index']);
});

Route::post('/contact', [ContactApiController::class, 'store'])->middleware('throttle:3,1');

// Protected Admin API Routes (Sanctum Authenticated)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Admin CRUD endpoints (also mapped to REST actions)
    Route::post('/products', [ProductApiController::class, 'store'])->middleware('role_or_permission:Super Admin|create-products');
    Route::put('/products/{id}', [ProductApiController::class, 'update'])->middleware('role_or_permission:Super Admin|edit-products');
    Route::delete('/products/{id}', [ProductApiController::class, 'destroy'])->middleware('role_or_permission:Super Admin|delete-products');

    Route::post('/services', [ServiceApiController::class, 'store'])->middleware('role_or_permission:Super Admin|create-services');
    Route::put('/services/{id}', [ServiceApiController::class, 'update'])->middleware('role_or_permission:Super Admin|edit-services');
    Route::delete('/services/{id}', [ServiceApiController::class, 'destroy'])->middleware('role_or_permission:Super Admin|delete-services');

    Route::post('/gallery', [GalleryApiController::class, 'store'])->middleware('role_or_permission:Super Admin|create-gallery');
    Route::put('/gallery/{id}', [GalleryApiController::class, 'update'])->middleware('role_or_permission:Super Admin|edit-gallery');
    Route::delete('/gallery/{id}', [GalleryApiController::class, 'destroy'])->middleware('role_or_permission:Super Admin|delete-gallery');

    Route::post('/partners', [PartnerApiController::class, 'store'])->middleware('role_or_permission:Super Admin|create-partners');
    Route::put('/partners/{id}', [PartnerApiController::class, 'update'])->middleware('role_or_permission:Super Admin|edit-partners');
    Route::delete('/partners/{id}', [PartnerApiController::class, 'destroy'])->middleware('role_or_permission:Super Admin|delete-partners');

    Route::post('/testimonials', [TestimonialApiController::class, 'store'])->middleware('role_or_permission:Super Admin|create-testimonials');
    Route::put('/testimonials/{id}', [TestimonialApiController::class, 'update'])->middleware('role_or_permission:Super Admin|edit-testimonials');
    Route::delete('/testimonials/{id}', [TestimonialApiController::class, 'destroy'])->middleware('role_or_permission:Super Admin|delete-testimonials');

    Route::put('/settings', [SettingApiController::class, 'update'])->middleware('role_or_permission:Super Admin|edit-settings');

    Route::get('/contact-messages', [ContactApiController::class, 'index'])->middleware('role_or_permission:Super Admin|view-messages');
    Route::put('/contact-messages/{id}/read', [ContactApiController::class, 'read'])->middleware('role_or_permission:Super Admin|view-messages');
    Route::delete('/contact-messages/{id}', [ContactApiController::class, 'destroy'])->middleware('role_or_permission:Super Admin|delete-messages');
});
