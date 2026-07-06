<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\GalleryRequest;
use App\Services\GalleryService;

class GalleryController extends Controller
{
    protected GalleryService $galleryService;

    public function __construct(GalleryService $galleryService)
    {
        $this->galleryService = $galleryService;
    }

    public function index()
    {
        $gallery = $this->galleryService->paginate(12);

        return view('admin.gallery.index', compact('gallery'));
    }

    public function create()
    {
        return view('admin.gallery.create');
    }

    public function store(GalleryRequest $request)
    {
        $this->galleryService->create($request->validated());

        return redirect()->route('admin.gallery.index')->with('success', 'Gallery item uploaded successfully.');
    }

    public function edit($id)
    {
        $item = $this->galleryService->findById($id);

        return view('admin.gallery.edit', compact('item'));
    }

    public function update(GalleryRequest $request, $id)
    {
        $this->galleryService->update($id, $request->validated());

        return redirect()->route('admin.gallery.index')->with('success', 'Gallery item updated successfully.');
    }

    public function destroy($id)
    {
        $this->galleryService->delete($id);

        return redirect()->route('admin.gallery.index')->with('success', 'Gallery item deleted successfully.');
    }
}
