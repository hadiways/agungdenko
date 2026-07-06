<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SettingRequest;
use App\Services\SettingService;

class SettingController extends Controller
{
    protected SettingService $settingService;

    public function __construct(SettingService $settingService)
    {
        $this->settingService = $settingService;
    }

    public function edit()
    {
        $settings = $this->settingService->getSettings();

        return view('admin.settings.edit', compact('settings'));
    }

    public function update(SettingRequest $request)
    {
        $this->settingService->updateSettings($request->validated());

        return redirect()->route('admin.settings.edit')->with('success', 'Company settings updated successfully.');
    }
}
