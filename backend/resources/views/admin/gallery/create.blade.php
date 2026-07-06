@extends('layouts.admin')

@section('title', 'Upload Gallery Image')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Upload Gallery Image</h1>
</div>

<form action="{{ route('admin.gallery.store') }}" method="POST" enctype="multipart/form-data">
    @csrf
    <div class="card border-0 shadow-sm max-width-600">
        <div class="card-body">
            <div class="mb-3">
                <label for="title" class="form-label fw-bold">Title</label>
                <input type="text" name="title" id="title" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="category" class="form-label fw-bold">Category</label>
                <input type="text" name="category" id="category" class="form-control" placeholder="Forklift, Stacker, etc." required>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label fw-bold">Image File</label>
                <input type="file" name="image" id="image" class="form-control" accept="image/*" required>
            </div>
            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-cloud-arrow-up me-1"></i> Upload Image</button>
        </div>
    </div>
</form>
@endsection
