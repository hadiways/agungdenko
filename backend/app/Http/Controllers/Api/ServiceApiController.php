<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Services\ServiceService;

class ServiceApiController extends ApiController
{
    protected ServiceService $serviceService;

    public function __construct(ServiceService $serviceService)
    {
        $this->serviceService = $serviceService;
    }

    /**
     * Display a listing of services.
     */
    public function index()
    {
        $services = $this->serviceService->getAll();

        return $this->successResponse(
            ServiceResource::collection($services),
            'Services retrieved successfully'
        );
    }

    /**
     * Store a newly created service.
     */
    public function store(ServiceRequest $request)
    {
        $service = $this->serviceService->create($request->validated());

        return $this->successResponse(
            new ServiceResource($service),
            'Service created successfully',
            21
        );
    }

    /**
     * Update the specified service in storage.
     */
    public function update(ServiceRequest $request, $id)
    {
        $service = $this->serviceService->update($id, $request->validated());

        return $this->successResponse(
            new ServiceResource($service),
            'Service updated successfully'
        );
    }

    /**
     * Remove the specified service from storage.
     */
    public function destroy($id)
    {
        $this->serviceService->delete($id);

        return $this->successResponse(null, 'Service deleted successfully');
    }
}
