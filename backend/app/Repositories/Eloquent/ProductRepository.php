<?php

namespace App\Repositories\Eloquent;

use App\Models\Product;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
    public function __construct(Product $model)
    {
        parent::__construct($model);
    }

    public function searchAndPaginate(
        ?string $search = null,
        ?string $category = null,
        mixed $categoryId = null,
        mixed $featured = null,
        ?string $status = 'active',
        int $perPage = 100
    ): LengthAwarePaginator {
        $query = $this->model->newQuery()->with('category');

        // Filter search term across name, short_description, description
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('short_description', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by category_id directly
        if (!empty($categoryId)) {
            $query->where('category_id', $categoryId);
        }

        // Filter by category (supports numeric id, slug, or category name)
        if (!empty($category) && empty($categoryId)) {
            if (is_numeric($category)) {
                $query->where('category_id', (int)$category);
            } else {
                $slug = Str::slug($category);
                $query->whereHas('category', function ($q) use ($category, $slug) {
                    $q->where('slug', $category)
                      ->orWhere('slug', $slug)
                      ->orWhere('name', 'like', "%{$category}%");
                });
            }
        }

        // Filter by featured flag (1, true, yes)
        if ($featured !== null && $featured !== '') {
            $isFeatured = in_array(strtolower((string)$featured), ['1', 'true', 'yes'], true);
            $query->where('featured', $isFeatured);
        }

        // Filter by status (default 'active', pass 'all' or empty string to bypass)
        if (!empty($status) && strtolower($status) !== 'all') {
            $query->where('status', $status);
        }

        $query->orderBy('created_at', 'desc');

        return $query->paginate($perPage);
    }

    public function getFeaturedProducts(int $limit = 4)
    {
        return $this->model->newQuery()
            ->with('category')
            ->where('status', 'active')
            ->where('featured', true)
            ->limit($limit)
            ->get();
    }
}
