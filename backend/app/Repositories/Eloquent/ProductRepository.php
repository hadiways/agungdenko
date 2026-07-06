<?php

namespace App\Repositories\Eloquent;

use App\Models\Product;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
    public function __construct(Product $model)
    {
        parent::__construct($model);
    }

    public function searchAndPaginate(string $search = null, string $category = null, int $perPage = 12): LengthAwarePaginator
    {
        $query = $this->model->newQuery()->with('category');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('short_description', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($category) {
            $query->whereHas('category', function ($q) use ($category) {
                $q->where('slug', $category)->orWhere('name', 'like', "%{$category}%");
            });
        }

        // Only show active products on public site
        $query->where('status', 'active');

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
