<?php

namespace App\Repositories\Contracts;

use Illuminate\Database\Eloquent\Collection;

interface TestimonialRepositoryInterface extends BaseRepositoryInterface
{
    public function getRecentTestimonials(int $limit = 5): Collection;
}
