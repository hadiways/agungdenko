<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryApiController extends ApiController
{
    /**
     * Display a listing of product categories.
     */
    public function index(Request $request)
    {
        $categories = Category::withCount('products')->orderBy('name', 'asc')->get();

        return response()->json([
            'success' => true,
            'message' => 'Categories retrieved successfully',
            'data' => $categories
        ]);
    }
}
