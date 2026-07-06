<?php

namespace App\Services;

use App\Models\Setting;
use App\Repositories\Contracts\SettingRepositoryInterface;
use Illuminate\Http\UploadedFile;

class SettingService
{
    protected SettingRepositoryInterface $settingRepository;
    protected ImageUploadService $imageUpload;
    protected ActivityLogService $activityLog;

    public function __construct(
        SettingRepositoryInterface $settingRepository,
        ImageUploadService $imageUpload,
        ActivityLogService $activityLog
    ) {
        $this->settingRepository = $settingRepository;
        $this->imageUpload = $imageUpload;
        $this->activityLog = $activityLog;
    }

    public function getSettings(): Setting
    {
        return $this->settingRepository->getSettings();
    }

    public function updateSettings(array $data): Setting
    {
        $settings = $this->settingRepository->getSettings();

        // Handle logo upload
        if (isset($data['logo']) && $data['logo'] instanceof UploadedFile) {
            $this->imageUpload->delete($settings->logo);
            $data['logo'] = $this->imageUpload->upload($data['logo'], 'company', 300, null);
        }

        // Handle favicon upload
        if (isset($data['favicon']) && $data['favicon'] instanceof UploadedFile) {
            $this->imageUpload->delete($settings->favicon);
            $data['favicon'] = $this->imageUpload->upload($data['favicon'], 'company', 64, 64);
        }

        // Handle hero_image upload
        if (isset($data['hero_image']) && $data['hero_image'] instanceof UploadedFile) {
            $this->imageUpload->delete($settings->hero_image);
            $data['hero_image'] = $this->imageUpload->upload($data['hero_image'], 'company', 1920, null);
        }

        $this->settingRepository->update($settings->id, $data);
        $updatedSettings = $settings->fresh();

        $this->activityLog->log('UPDATE_SETTINGS', "Updated company settings");

        return $updatedSettings;
    }
}
