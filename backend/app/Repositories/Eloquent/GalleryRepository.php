<?php

namespace App\Repositories\Eloquent;

use App\Models\Gallery;
use App\Repositories\Contracts\GalleryRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class GalleryRepository extends BaseRepository implements GalleryRepositoryInterface
{
    public function __construct(Gallery $model)
    {
        parent::__construct($model);
    }

    public function getByCategory(string $category): Collection
    {
        return $this->model->newQuery()
            ->where('category', $category)
            ->get();
    }
}
