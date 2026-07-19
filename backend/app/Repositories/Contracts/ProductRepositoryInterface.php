<?php

namespace App\Repositories\Contracts;

use Illuminate\Pagination\LengthAwarePaginator;

interface ProductRepositoryInterface extends BaseRepositoryInterface
{
    public function searchAndPaginate(
        ?string $search = null,
        ?string $category = null,
        mixed $categoryId = null,
        mixed $featured = null,
        ?string $status = 'active',
        int $perPage = 100
    ): LengthAwarePaginator;
    public function getFeaturedProducts(int $limit = 4);
}
