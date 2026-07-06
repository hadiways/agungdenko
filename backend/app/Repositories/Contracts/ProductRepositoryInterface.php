<?php

namespace App\Repositories\Contracts;

use Illuminate\Pagination\LengthAwarePaginator;

interface ProductRepositoryInterface extends BaseRepositoryInterface
{
    public function searchAndPaginate(string $search = null, string $category = null, int $perPage = 12): LengthAwarePaginator;
    public function getFeaturedProducts(int $limit = 4);
}
