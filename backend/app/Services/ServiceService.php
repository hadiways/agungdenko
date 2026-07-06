<?php

namespace App\Services;

use App\Models\Service;
use App\Repositories\Contracts\ServiceRepositoryInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class ServiceService
{
    protected ServiceRepositoryInterface $serviceRepository;
    protected ImageUploadService $imageUpload;
    protected ActivityLogService $activityLog;

    public function __construct(
        ServiceRepositoryInterface $serviceRepository,
        ImageUploadService $imageUpload,
        ActivityLogService $activityLog
    ) {
        $this->serviceRepository = $serviceRepository;
        $this->imageUpload = $imageUpload;
        $this->activityLog = $activityLog;
    }

    public function getAll()
    {
        return $this->serviceRepository->all();
    }

    public function paginate(int $perPage = 15)
    {
        return $this->serviceRepository->paginate($perPage);
    }

    public function findById(int|string $id): Service
    {
        return $this->serviceRepository->findOrFail($id);
    }

    public function create(array $data): Service
    {
        $data['slug'] = Str::slug($data['title']);

        $originalSlug = $data['slug'];
        $count = 1;
        while ($this->serviceRepository->findBySlug($data['slug'])) {
            $data['slug'] = $originalSlug . '-' . $count++;
        }

        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            $data['image'] = $this->imageUpload->upload($data['image'], 'services', 800, null);
        }

        $service = $this->serviceRepository->create($data);

        $this->activityLog->log('CREATE_SERVICE', "Created service: {$service->title} (ID: {$service->id})");

        return $service;
    }

    public function update(int|string $id, array $data): Service
    {
        $service = $this->serviceRepository->findOrFail($id);

        if (isset($data['title']) && $data['title'] !== $service->title) {
            $data['slug'] = Str::slug($data['title']);
            $originalSlug = $data['slug'];
            $count = 1;
            while (($found = $this->serviceRepository->findBySlug($data['slug'])) && $found->id != $service->id) {
                $data['slug'] = $originalSlug . '-' . $count++;
            }
        }

        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            $this->imageUpload->delete($service->image);
            $data['image'] = $this->imageUpload->upload($data['image'], 'services', 800, null);
        }

        $this->serviceRepository->update($id, $data);
        $updatedService = $service->fresh();

        $this->activityLog->log('UPDATE_SERVICE', "Updated service: {$updatedService->title} (ID: {$updatedService->id})");

        return $updatedService;
    }

    public function delete(int|string $id): bool
    {
        $service = $this->serviceRepository->findOrFail($id);
        $deleted = $this->serviceRepository->delete($id);

        if ($deleted) {
            $this->activityLog->log('DELETE_SERVICE', "Soft-deleted service: {$service->title} (ID: {$service->id})");
        }

        return $deleted;
    }
}
