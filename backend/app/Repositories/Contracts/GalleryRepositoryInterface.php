<?php

namespace App\Repositories\Contracts;

use Illuminate\Database\Eloquent\Collection;

interface GalleryRepositoryInterface extends BaseRepositoryInterface
{
    public function getByCategory(string $category): Collection;
}
