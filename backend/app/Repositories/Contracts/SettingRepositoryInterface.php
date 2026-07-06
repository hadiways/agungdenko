<?php

namespace App\Repositories\Contracts;

use App\Models\Setting;

interface SettingRepositoryInterface extends BaseRepositoryInterface
{
    public function getSettings(): Setting;
}
