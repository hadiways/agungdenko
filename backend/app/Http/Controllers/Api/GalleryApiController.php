<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\GalleryRequest;
use App\Http\Resources\GalleryResource;
use App\Services\GalleryService;
use Illuminate\Http\Request;

class GalleryApiController extends ApiController
{
    protected GalleryService $galleryService;

    public function __construct(GalleryService $galleryService)
    {
        $this->galleryService = $galleryService;
    }

    /**
     * Display a listing of gallery items (with category filter).
     */
    public function index(Request $request)
    {
        $category = $request->query('category');

        if ($category) {
            $gallery = $this->galleryService->getByCategory($category);
        } else {
            $gallery = $this->galleryService->getAll();
        }

        return $this->successResponse(
            GalleryResource::collection($gallery),
            'Gallery retrieved successfully'
        );
    }

    /**
     * Store a newly created gallery item.
     */
    public function store(GalleryRequest $request)
    {
        $gallery = $this->galleryService->create($request->validated());

        return $this->successResponse(
            new GalleryResource($gallery),
            'Gallery item uploaded successfully',
            21
        );
    }

    /**
     * Update the specified gallery item in storage.
     */
    public function update(GalleryRequest $request, $id)
    {
        $gallery = $this->galleryService->update($id, $request->validated());

        return $this->successResponse(
            new GalleryResource($gallery),
            'Gallery item updated successfully'
        );
    }

    /**
     * Remove the specified gallery item from storage.
     */
    public function destroy($id)
    {
        $this->galleryService->delete($id);

        return $this->successResponse(null, 'Gallery item deleted successfully');
    }
}
