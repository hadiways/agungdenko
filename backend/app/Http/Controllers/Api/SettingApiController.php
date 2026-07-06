<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\SettingRequest;
use App\Http\Resources\SettingResource;
use App\Services\SettingService;

class SettingApiController extends ApiController
{
    protected SettingService $settingService;

    public function __construct(SettingService $settingService)
    {
        $this->settingService = $settingService;
    }

    /**
     * Display the company settings.
     */
    public function index()
    {
        $settings = $this->settingService->getSettings();

        return $this->successResponse(
            new SettingResource($settings),
            'Company settings retrieved successfully'
        );
    }

    /**
     * Update the company settings.
     */
    public function update(SettingRequest $request)
    {
        $settings = $this->settingService->updateSettings($request->validated());

        return $this->successResponse(
            new SettingResource($settings),
            'Company settings updated successfully'
        );
    }
}
