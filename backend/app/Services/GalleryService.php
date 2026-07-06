<?php

namespace App\Services;

use App\Models\Gallery;
use App\Repositories\Contracts\GalleryRepositoryInterface;
use Illuminate\Http\UploadedFile;

class GalleryService
{
    protected GalleryRepositoryInterface $galleryRepository;
    protected ImageUploadService $imageUpload;
    protected ActivityLogService $activityLog;

    public function __construct(
        GalleryRepositoryInterface $galleryRepository,
        ImageUploadService $imageUpload,
        ActivityLogService $activityLog
    ) {
        $this->galleryRepository = $galleryRepository;
        $this->imageUpload = $imageUpload;
        $this->activityLog = $activityLog;
    }

    public function getAll()
    {
        return $this->galleryRepository->all();
    }

    public function paginate(int $perPage = 15)
    {
        return $this->galleryRepository->paginate($perPage);
    }

    public function getByCategory(string $category)
    {
        return $this->galleryRepository->getByCategory($category);
    }

    public function findById(int|string $id): Gallery
    {
        return $this->galleryRepository->findOrFail($id);
    }

    public function create(array $data): Gallery
    {
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            $data['image'] = $this->imageUpload->upload($data['image'], 'gallery', 1000, null);
        }

        $gallery = $this->galleryRepository->create($data);

        $this->activityLog->log('CREATE_GALLERY', "Created gallery item: {$gallery->title} (ID: {$gallery->id})");

        return $gallery;
    }

    public function update(int|string $id, array $data): Gallery
    {
        $gallery = $this->galleryRepository->findOrFail($id);

        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            $this->imageUpload->delete($gallery->image);
            $data['image'] = $this->imageUpload->upload($data['image'], 'gallery', 1000, null);
        }

        $this->galleryRepository->update($id, $data);
        $updatedGallery = $gallery->fresh();

        $this->activityLog->log('UPDATE_GALLERY', "Updated gallery item: {$updatedGallery->title} (ID: {$updatedGallery->id})");

        return $updatedGallery;
    }

    public function delete(int|string $id): bool
    {
        $gallery = $this->galleryRepository->findOrFail($id);
        $deleted = $this->galleryRepository->delete($id);

        if ($deleted) {
            $this->activityLog->log('DELETE_GALLERY', "Soft-deleted gallery item: {$gallery->title} (ID: {$gallery->id})");
        }

        return $deleted;
    }
}
