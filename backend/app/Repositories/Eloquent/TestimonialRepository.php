<?php

namespace App\Repositories\Eloquent;

use App\Models\Testimonial;
use App\Repositories\Contracts\TestimonialRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class TestimonialRepository extends BaseRepository implements TestimonialRepositoryInterface
{
    public function __construct(Testimonial $model)
    {
        parent::__construct($model);
    }

    public function getRecentTestimonials(int $limit = 5): Collection
    {
        return $this->model->newQuery()
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }
}
