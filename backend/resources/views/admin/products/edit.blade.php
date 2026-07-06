@extends('layouts.admin')

@section('title', 'Edit Product')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Edit Product: {{ $product->name }}</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.products.index') }}" class="btn btn-sm btn-outline-secondary">
            <i class="fa-solid fa-arrow-left me-1"></i> Back to list
        </a>
    </div>
</div>

<form action="{{ route('admin.products.update', $product->id) }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')
    <div class="row g-4">
        <!-- Main Form Fields -->
        <div class="col-lg-8">
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-body">
                    <div class="mb-3">
                        <label for="name" class="form-label fw-bold">Product Name <span class="text-danger">*</span></label>
                        <input type="text" name="name" id="name" class="form-control" value="{{ old('name', $product->name) }}" required>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="category_id" class="form-label fw-bold">Category</label>
                            <select name="category_id" id="category_id" class="form-select">
                                <option value="">Select Category</option>
                                @foreach($categories as $cat)
                                    <option value="{{ $cat->id }}" {{ old('category_id', $product->category_id) == $cat->id ? 'selected' : '' }}>{{ $cat->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="price" class="form-label fw-bold">Price ($)</label>
                            <input type="number" step="0.01" name="price" id="price" class="form-control" value="{{ old('price', $product->price) }}">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="short_description" class="form-label fw-bold">Short Description</label>
                        <textarea name="short_description" id="short_description" rows="2" class="form-control">{{ old('short_description', $product->short_description) }}</textarea>
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label fw-bold">Detailed Description</label>
                        <textarea name="description" id="description" rows="6" class="form-control">{{ old('description', $product->description) }}</textarea>
                    </div>

                    <div class="mb-3">
                        <label for="specification" class="form-label fw-bold">Specifications</label>
                        <textarea name="specification" id="specification" rows="4" class="form-control">{{ old('specification', $product->specification) }}</textarea>
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
                            <option value="active" {{ old('status', $product->status) === 'active' ? 'selected' : '' }}>Active (Visible on API)</option>
                            <option value="draft" {{ old('status', $product->status) === 'draft' ? 'selected' : '' }}>Draft</option>
                            <option value="inactive" {{ old('status', $product->status) === 'inactive' ? 'selected' : '' }}>Inactive</option>
                        </select>
                    </div>

                    <div class="mb-3 form-check form-switch">
                        <input class="form-check-input" type="checkbox" name="featured" id="featured" value="1" {{ old('featured', $product->featured) ? 'checked' : '' }}>
                        <label class="form-check-label fw-bold" for="featured">Featured Product</label>
                    </div>
                </div>
            </div>

            <!-- Media files -->
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-white py-3 border-bottom">
                    <h5 class="card-title mb-0 fw-bold">Product Media</h5>
                </div>
                <div class="card-body">
                    <!-- Thumbnail preview & upload -->
                    <div class="mb-3">
                        <label class="form-label fw-bold">Thumbnail Image</label>
                        @if($product->thumbnail)
                            <div class="mb-2">
                                <img src="{{ url(\Illuminate\Support\Facades\Storage::url($product->thumbnail)) }}" class="img-thumbnail" style="max-height: 120px;">
                            </div>
                        @endif
                        <input class="form-control" type="file" id="thumbnail" name="thumbnail" accept="image/*">
                        <div class="form-text small">Select to overwrite existing thumbnail. Max: 5MB.</div>
                    </div>

                    <!-- Gallery preview & upload -->
                    <div class="mb-3">
                        <label class="form-label fw-bold">Gallery Images</label>
                        @if($product->images && is_array($product->images))
                            <div class="row g-2 mb-2">
                                @foreach($product->images as $path)
                                    <div class="col-4">
                                        <img src="{{ url(\Illuminate\Support\Facades\Storage::url($path)) }}" class="img-thumbnail w-100" style="height: 60px; object-fit: cover;">
                                    </div>
                                @endforeach
                            </div>
                        @endif
                        <input class="form-control" type="file" id="images" name="images[]" accept="image/*" multiple>
                        <div class="form-text small">Select files to replace all existing gallery images. Max: 10MB each.</div>
                    </div>
                </div>
            </div>

            <button type="submit" class="btn btn-primary w-100 py-2"><i class="fa-solid fa-floppy-disk me-1"></i> Update Product</button>
        </div>
    </div>
</form>
@endsection
