<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\PartnerRequest;
use App\Http\Resources\PartnerResource;
use App\Services\PartnerService;

class PartnerApiController extends ApiController
{
    protected PartnerService $partnerService;

    public function __construct(PartnerService $partnerService)
    {
        $this->partnerService = $partnerService;
    }

    /**
     * Display a listing of partners.
     */
    public function index()
    {
        $partners = $this->partnerService->getAll();

        return $this->successResponse(
            PartnerResource::collection($partners),
            'Partners retrieved successfully'
        );
    }

    /**
     * Store a newly created partner.
     */
    public function store(PartnerRequest $request)
    {
        $partner = $this->partnerService->create($request->validated());

        return $this->successResponse(
            new PartnerResource($partner),
            'Partner created successfully',
            21
        );
    }

    /**
     * Update the specified partner in storage.
     */
    public function update(PartnerRequest $request, $id)
    {
        $partner = $this->partnerService->update($id, $request->validated());

        return $this->successResponse(
            new PartnerResource($partner),
            'Partner updated successfully'
        );
    }

    /**
     * Remove the specified partner from storage.
     */
    public function destroy($id)
    {
        $this->partnerService->delete($id);

        return $this->successResponse(null, 'Partner deleted successfully');
    }
}
