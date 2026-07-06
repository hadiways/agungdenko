<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PartnerRequest;
use App\Services\PartnerService;

class PartnerController extends Controller
{
    protected PartnerService $partnerService;

    public function __construct(PartnerService $partnerService)
    {
        $this->partnerService = $partnerService;
    }

    public function index()
    {
        $partners = $this->partnerService->paginate(10);

        return view('admin.partners.index', compact('partners'));
    }

    public function create()
    {
        return view('admin.partners.create');
    }

    public function store(PartnerRequest $request)
    {
        $this->partnerService->create($request->validated());

        return redirect()->route('admin.partners.index')->with('success', 'Partner company added successfully.');
    }

    public function edit($id)
    {
        $partner = $this->partnerService->findById($id);

        return view('admin.partners.edit', compact('partner'));
    }

    public function update(PartnerRequest $request, $id)
    {
        $this->partnerService->update($id, $request->validated());

        return redirect()->route('admin.partners.index')->with('success', 'Partner company updated successfully.');
    }

    public function destroy($id)
    {
        $this->partnerService->delete($id);

        return redirect()->route('admin.partners.index')->with('success', 'Partner company removed successfully.');
    }
}
