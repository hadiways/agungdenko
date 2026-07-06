<?php

namespace App\Services;

use App\Models\Partner;
use App\Repositories\Contracts\PartnerRepositoryInterface;
use Illuminate\Http\UploadedFile;

class PartnerService
{
    protected PartnerRepositoryInterface $partnerRepository;
    protected ImageUploadService $imageUpload;
    protected ActivityLogService $activityLog;

    public function __construct(
        PartnerRepositoryInterface $partnerRepository,
        ImageUploadService $imageUpload,
        ActivityLogService $activityLog
    ) {
        $this->partnerRepository = $partnerRepository;
        $this->imageUpload = $imageUpload;
        $this->activityLog = $activityLog;
    }

    public function getAll()
    {
        return $this->partnerRepository->all();
    }

    public function paginate(int $perPage = 15)
    {
        return $this->partnerRepository->paginate($perPage);
    }

    public function findById(int|string $id): Partner
    {
        return $this->partnerRepository->findOrFail($id);
    }

    public function create(array $data): Partner
    {
        if (isset($data['logo']) && $data['logo'] instanceof UploadedFile) {
            $data['logo'] = $this->imageUpload->upload($data['logo'], 'partners', 300, null);
        }

        $partner = $this->partnerRepository->create($data);

        $this->activityLog->log('CREATE_PARTNER', "Created partner: {$partner->company_name} (ID: {$partner->id})");

        return $partner;
    }

    public function update(int|string $id, array $data): Partner
    {
        $partner = $this->partnerRepository->findOrFail($id);

        if (isset($data['logo']) && $data['logo'] instanceof UploadedFile) {
            $this->imageUpload->delete($partner->logo);
            $data['logo'] = $this->imageUpload->upload($data['logo'], 'partners', 300, null);
        }

        $this->partnerRepository->update($id, $data);
        $updatedPartner = $partner->fresh();

        $this->activityLog->log('UPDATE_PARTNER', "Updated partner: {$updatedPartner->company_name} (ID: {$updatedPartner->id})");

        return $updatedPartner;
    }

    public function delete(int|string $id): bool
    {
        $partner = $this->partnerRepository->findOrFail($id);
        $deleted = $this->partnerRepository->delete($id);

        if ($deleted) {
            $this->activityLog->log('DELETE_PARTNER', "Soft-deleted partner: {$partner->company_name} (ID: {$partner->id})");
        }

        return $deleted;
    }
}
