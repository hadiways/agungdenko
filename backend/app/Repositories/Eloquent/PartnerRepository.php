<?php

namespace App\Repositories\Eloquent;

use App\Models\Partner;
use App\Repositories\Contracts\PartnerRepositoryInterface;

class PartnerRepository extends BaseRepository implements PartnerRepositoryInterface
{
    public function __construct(Partner $model)
    {
        parent::__construct($model);
    }
}
