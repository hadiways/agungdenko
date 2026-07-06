<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\TestimonialRequest;
use App\Http\Resources\TestimonialResource;
use App\Services\TestimonialService;
use Illuminate\Http\Request;

class TestimonialApiController extends ApiController
{
    protected TestimonialService $testimonialService;

    public function __construct(TestimonialService $testimonialService)
    {
        $this->testimonialService = $testimonialService;
    }

    /**
     * Display a listing of testimonials.
     */
    public function index(Request $request)
    {
        $limit = $request->query('limit');

        if ($limit) {
            $testimonials = $this->testimonialService->getRecent((int)$limit);
        } else {
            $testimonials = $this->testimonialService->getAll();
        }

        return $this->successResponse(
            TestimonialResource::collection($testimonials),
            'Testimonials retrieved successfully'
        );
    }

    /**
     * Store a newly created testimonial.
     */
    public function store(TestimonialRequest $request)
    {
        $testimonial = $this->testimonialService->create($request->validated());

        return $this->successResponse(
            new TestimonialResource($testimonial),
            'Testimonial created successfully',
            21
        );
    }

    /**
     * Update the specified testimonial in storage.
     */
    public function update(TestimonialRequest $request, $id)
    {
        $testimonial = $this->testimonialService->update($id, $request->validated());

        return $this->successResponse(
            new TestimonialResource($testimonial),
            'Testimonial updated successfully'
        );
    }

    /**
     * Remove the specified testimonial from storage.
     */
    public function destroy($id)
    {
        $this->testimonialService->delete($id);

        return $this->successResponse(null, 'Testimonial deleted successfully');
    }
}
