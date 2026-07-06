@extends('layouts.admin')

@section('title', 'Add Product')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Add New Product</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.products.index') }}" class="btn btn-sm btn-outline-secondary">
            <i class="fa-solid fa-arrow-left me-1"></i> Back to list
        </a>
    </div>
</div>

<form action="{{ route('admin.products.store') }}" method="POST" enctype="multipart/form-data">
    @csrf
    <div class="row g-4">
        <!-- Main Form Fields -->
        <div class="col-lg-8">
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-body">
                    <div class="mb-3">
                        <label for="name" class="form-label fw-bold">Product Name <span class="text-danger">*</span></label>
                        <input type="text" name="name" id="name" class="form-control" placeholder="e.g. Noblelift Electric Forklift FE4P30Q" value="{{ old('name') }}" required>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="category_id" class="form-label fw-bold">Category</label>
                            <select name="category_id" id="category_id" class="form-select">
                                <option value="">Select Category</option>
                                @foreach($categories as $cat)
                                    <option value="{{ $cat->id }}" {{ old('category_id') == $cat->id ? 'selected' : '' }}>{{ $cat->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="price" class="form-label fw-bold">Price ($)</label>
                            <input type="number" step="0.01" name="price" id="price" class="form-control" placeholder="0.00" value="{{ old('price', '0.00') }}">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="short_description" class="form-label fw-bold">Short Description</label>
                        <textarea name="short_description" id="short_description" rows="2" class="form-control" placeholder="Brief summary of the product (appears in catalog lists)...">{{ old('short_description') }}</textarea>
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label fw-bold">Detailed Description</label>
                        <textarea name="description" id="description" rows="6" class="form-control" placeholder="Complete product features, details, and applications...">{{ old('description') }}</textarea>
                    </div>

                    <div class="mb-3">
                        <label for="specification" class="form-label fw-bold">Specifications</label>
                        <textarea name="specification" id="specification" rows="4" class="form-control" placeholder="Capacity: 3.0 Ton&#10;Power Source: Battery&#10;Lifting Height: 3.0m">{{ old('specification') }}</textarea>
                    </div>
                </div>
            </div>
        </div>

        <!-- Meta and Files Sidebar -->
        <div class="col-lg-4">
            <!-- Publishing settings -->
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-white py-3 border-bottom">
                    <h5 class="card-title mb-0 fw-bold">Status & Visibility</h5>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="status" class="form-label fw-bold">Status</label>
                        <select name="status" id="status" class="form-select">
                            <option value="active" {{ old('status', 'active') === 'active' ? 'selected' : '' }}>Active (Visible on API)</option>
                            <option value="draft" {{ old('status') === 'draft' ? 'selected' : '' }}>Draft</option>
                            <option value="inactive" {{ old('status') === 'inactive' ? 'selected' : '' }}>Inactive</option>
                        </select>
                    </div>

                    <div class="mb-3 form-check form-switch">
                        <input class="form-check-input" type="checkbox" name="featured" id="featured" value="1" {{ old('featured') ? 'checked' : '' }}>
                        <label class="form-check-label fw-bold" for="featured">Featured Product</label>
                        <div class="form-text small">Featured products appear on the homepage of the portal.</div>
                    </div>
                </div>
            </div>

            <!-- Media files -->
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-white py-3 border-bottom">
                    <h5 class="card-title mb-0 fw-bold">Product Media</h5>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="thumbnail" class="form-label fw-bold">Thumbnail Image</label>
                        <input class="form-control" type="file" id="thumbnail" name="thumbnail" accept="image/*">
                        <div class="form-text small">Recommended size: 400x400px square, Max: 5MB.</div>
                    </div>

                    <div class="mb-3">
                        <label for="images" class="form-label fw-bold">Gallery Images</label>
                        <input class="form-control" type="file" id="images" name="images[]" accept="image/*" multiple>
                        <div class="form-text small">Select one or more images. Max: 10MB per file.</div>
                    </div>
                </div>
            </div>

            <button type="submit" class="btn btn-primary w-100 py-2"><i class="fa-solid fa-floppy-disk me-1"></i> Save Product</button>
        </div>
    </div>
</form>
@endsection
