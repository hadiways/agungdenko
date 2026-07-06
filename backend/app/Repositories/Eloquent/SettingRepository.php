<?php

namespace App\Repositories\Eloquent;

use App\Models\Setting;
use App\Repositories\Contracts\SettingRepositoryInterface;

class SettingRepository extends BaseRepository implements SettingRepositoryInterface
{
    public function __construct(Setting $model)
    {
        parent::__construct($model);
    }

    public function getSettings(): Setting
    {
        $settings = $this->model->newQuery()->first();

        if (! $settings) {
            // Return empty fallback setting record so frontend/admin dashboard doesn't crash
            return $this->model->newQuery()->create([
                'company_name' => 'PT Denko Wahana Sakti',
                'email' => 'info@dws.co.id',
            ]);
        }

        return $settings;
    }
}
