<?php

namespace App\Services;

use App\Models\Testimonial;
use App\Repositories\Contracts\TestimonialRepositoryInterface;
use Illuminate\Http\UploadedFile;

class TestimonialService
{
    protected TestimonialRepositoryInterface $testimonialRepository;
    protected ImageUploadService $imageUpload;
    protected ActivityLogService $activityLog;

    public function __construct(
        TestimonialRepositoryInterface $testimonialRepository,
        ImageUploadService $imageUpload,
        ActivityLogService $activityLog
    ) {
        $this->testimonialRepository = $testimonialRepository;
        $this->imageUpload = $imageUpload;
        $this->activityLog = $activityLog;
    }

    public function getAll()
    {
        return $this->testimonialRepository->all();
    }

    public function getRecent(int $limit = 5)
    {
        return $this->testimonialRepository->getRecentTestimonials($limit);
    }

    public function paginate(int $perPage = 15)
    {
        return $this->testimonialRepository->paginate($perPage);
    }

    public function findById(int|string $id): Testimonial
    {
        return $this->testimonialRepository->findOrFail($id);
    }

    public function create(array $data): Testimonial
    {
        if (isset($data['photo']) && $data['photo'] instanceof UploadedFile) {
            $data['photo'] = $this->imageUpload->upload($data['photo'], 'testimonials', 200, 200);
        }

        $testimonial = $this->testimonialRepository->create($data);

        $this->activityLog->log('CREATE_TESTIMONIAL', "Created testimonial for customer: {$testimonial->customer_name} (ID: {$testimonial->id})");

        return $testimonial;
    }

    public function update(int|string $id, array $data): Testimonial
    {
        $testimonial = $this->testimonialRepository->findOrFail($id);

        if (isset($data['photo']) && $data['photo'] instanceof UploadedFile) {
            $this->imageUpload->delete($testimonial->photo);
            $data['photo'] = $this->imageUpload->upload($data['photo'], 'testimonials', 200, 200);
        }

        $this->testimonialRepository->update($id, $data);
        $updatedTestimonial = $testimonial->fresh();

        $this->activityLog->log('UPDATE_TESTIMONIAL', "Updated testimonial for customer: {$updatedTestimonial->customer_name} (ID: {$updatedTestimonial->id})");

        return $updatedTestimonial;
    }

    public function delete(int|string $id): bool
    {
        $testimonial = $this->testimonialRepository->findOrFail($id);
        $deleted = $this->testimonialRepository->delete($id);

        if ($deleted) {
            $this->activityLog->log('DELETE_TESTIMONIAL', "Soft-deleted testimonial for customer: {$testimonial->customer_name} (ID: {$testimonial->id})");
        }

        return $deleted;
    }
}
