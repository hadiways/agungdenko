@extends('layouts.admin')

@section('title', 'Edit Testimonial')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Edit Testimonial</h1>
</div>

<form action="{{ route('admin.testimonials.update', $testimonial->id) }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')
    <div class="card border-0 shadow-sm">
        <div class="card-body">
            <div class="mb-3">
                <label for="customer_name" class="form-label fw-bold">Customer Name</label>
                <input type="text" name="customer_name" id="customer_name" class="form-control" value="{{ $testimonial->customer_name }}" required>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="company" class="form-label fw-bold">Company</label>
                    <input type="text" name="company" id="company" class="form-control" value="{{ $testimonial->company }}" required>
                </div>
                <div class="col-md-6">
                    <label for="position" class="form-label fw-bold">Position</label>
                    <input type="text" name="position" id="position" class="form-control" value="{{ $testimonial->position }}">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="rating" class="form-label fw-bold">Rating</label>
                    <select name="rating" id="rating" class="form-select">
                        <option value="5" {{ $testimonial->rating == 5 ? 'selected' : '' }}>5 Stars</option>
                        <option value="4" {{ $testimonial->rating == 4 ? 'selected' : '' }}>4 Stars</option>
                        <option value="3" {{ $testimonial->rating == 3 ? 'selected' : '' }}>3 Stars</option>
                        <option value="2" {{ $testimonial->rating == 2 ? 'selected' : '' }}>2 Stars</option>
                        <option value="1" {{ $testimonial->rating == 1 ? 'selected' : '' }}>1 Star</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="photo" class="form-label fw-bold">Customer Photo</label>
                    @if($testimonial->photo)
                        <div class="mb-2">
                            <img src="{{ url(\Illuminate\Support\Facades\Storage::url($testimonial->photo)) }}" class="img-thumbnail rounded-circle" style="max-height: 80px;">
                        </div>
                    @endif
                    <input type="file" name="photo" id="photo" class="form-control" accept="image/*">
                </div>
            </div>
            <div class="mb-3">
                <label for="testimonial" class="form-label fw-bold">Testimonial Content</label>
                <textarea name="testimonial" id="testimonial" rows="4" class="form-control" required>{{ $testimonial->testimonial }}</textarea>
            </div>
            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk me-1"></i> Update Testimonial</button>
        </div>
    </div>
</form>
@endsection
