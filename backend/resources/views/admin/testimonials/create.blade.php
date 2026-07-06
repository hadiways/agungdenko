@extends('layouts.admin')

@section('title', 'Add Testimonial')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Add Testimonial</h1>
</div>

<form action="{{ route('admin.testimonials.store') }}" method="POST" enctype="multipart/form-data">
    @csrf
    <div class="card border-0 shadow-sm max-width-600">
        <div class="card-body">
            <div class="mb-3">
                <label for="customer_name" class="form-label fw-bold">Customer Name</label>
                <input type="text" name="customer_name" id="customer_name" class="form-control" required>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="company" class="form-label fw-bold">Company</label>
                    <input type="text" name="company" id="company" class="form-control" required>
                </div>
                <div class="col-md-6">
                    <label for="position" class="form-label fw-bold">Position</label>
                    <input type="text" name="position" id="position" class="form-control">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="rating" class="form-label fw-bold">Rating</label>
                    <select name="rating" id="rating" class="form-select">
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="photo" class="form-label fw-bold">Customer Photo</label>
                    <input type="file" name="photo" id="photo" class="form-control" accept="image/*">
                </div>
            </div>
            <div class="mb-3">
                <label for="testimonial" class="form-label fw-bold">Testimonial Content</label>
                <textarea name="testimonial" id="testimonial" rows="4" class="form-control" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk me-1"></i> Save Testimonial</button>
        </div>
    </div>
</form>
@endsection
