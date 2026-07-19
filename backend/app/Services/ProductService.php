<?php

namespace App\Services;

use App\Models\Product;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class ProductService
{
    protected ProductRepositoryInterface $productRepository;
    protected ImageUploadService $imageUpload;
    protected ActivityLogService $activityLog;

    public function __construct(
        ProductRepositoryInterface $productRepository,
        ImageUploadService $imageUpload,
        ActivityLogService $activityLog
    ) {
        $this->productRepository = $productRepository;
        $this->imageUpload = $imageUpload;
        $this->activityLog = $activityLog;
    }

    public function getAll(array $relations = [])
    {
        return $this->productRepository->all(['*'], $relations);
    }

    public function paginate(int $perPage = 15, array $relations = [])
    {
        return $this->productRepository->paginate($perPage, ['*'], $relations);
    }

    public function searchAndPaginate(
        ?string $search = null,
        ?string $category = null,
        mixed $categoryId = null,
        mixed $featured = null,
        ?string $status = 'active',
        int $perPage = 100
    ): LengthAwarePaginator {
        return $this->productRepository->searchAndPaginate(
            search: $search,
            category: $category,
            categoryId: $categoryId,
            featured: $featured,
            status: $status,
            perPage: $perPage
        );
    }

    public function getFeatured(int $limit = 4)
    {
        return $this->productRepository->getFeaturedProducts($limit);
    }

    public function findById(int|string $id, array $relations = []): Product
    {
        return $this->productRepository->findOrFail($id, ['*'], $relations);
    }

    public function findBySlug(string $slug, array $relations = []): ?Product
    {
        return $this->productRepository->findBySlug($slug, ['*'], $relations);
    }

    public function create(array $data): Product
    {
        // Auto-generate slug
        $data['slug'] = Str::slug($data['name']);

        // Ensure slug is unique
        $originalSlug = $data['slug'];
        $count = 1;
        while ($this->productRepository->findBySlug($data['slug'])) {
            $data['slug'] = $originalSlug . '-' . $count++;
        }

        // Handle single thumbnail
        if (isset($data['thumbnail']) && $data['thumbnail'] instanceof UploadedFile) {
            $data['thumbnail'] = $this->imageUpload->upload($data['thumbnail'], 'products', 400, 400);
        }

        // Handle multiple images
        if (isset($data['images']) && is_array($data['images'])) {
            $uploadedImages = [];
            foreach ($data['images'] as $imageFile) {
                if ($imageFile instanceof UploadedFile) {
                    $uploadedImages[] = $this->imageUpload->upload($imageFile, 'products', 800, null);
                }
            }
            $data['images'] = $uploadedImages;
        }

        $product = $this->productRepository->create($data);

        $this->activityLog->log('CREATE_PRODUCT', "Created product: {$product->name} (ID: {$product->id})");

        return $product;
    }

    public function update(int|string $id, array $data): Product
    {
        $product = $this->productRepository->findOrFail($id);

        if (isset($data['name']) && $data['name'] !== $product->name) {
            $data['slug'] = Str::slug($data['name']);
            $originalSlug = $data['slug'];
            $count = 1;
            while (($found = $this->productRepository->findBySlug($data['slug'])) && $found->id != $product->id) {
                $data['slug'] = $originalSlug . '-' . $count++;
            }
        }

        // Handle thumbnail update
        if (isset($data['thumbnail']) && $data['thumbnail'] instanceof UploadedFile) {
            // Delete old thumbnail
            $this->imageUpload->delete($product->thumbnail);
            // Upload new thumbnail
            $data['thumbnail'] = $this->imageUpload->upload($data['thumbnail'], 'products', 400, 400);
        }

        // Handle multiple images update
        if (isset($data['images']) && is_array($data['images'])) {
            // Delete old images
            if ($product->images && is_array($product->images)) {
                foreach ($product->images as $oldImage) {
                    $this->imageUpload->delete($oldImage);
                }
            }

            // Upload new images
            $uploadedImages = [];
            foreach ($data['images'] as $imageFile) {
                if ($imageFile instanceof UploadedFile) {
                    $uploadedImages[] = $this->imageUpload->upload($imageFile, 'products', 800, null);
                }
            }
            $data['images'] = $uploadedImages;
        }

        $this->productRepository->update($id, $data);
        $updatedProduct = $product->fresh();

        $this->activityLog->log('UPDATE_PRODUCT', "Updated product: {$updatedProduct->name} (ID: {$updatedProduct->id})");

        return $updatedProduct;
    }

    public function delete(int|string $id): bool
    {
        $product = $this->productRepository->findOrFail($id);

        // Soft delete the product (keep assets intact in case of restore, or delete if desired)
        $deleted = $this->productRepository->delete($id);

        if ($deleted) {
            $this->activityLog->log('DELETE_PRODUCT', "Soft-deleted product: {$product->name} (ID: {$product->id})");
        }

        return $deleted;
    }
}
