@extends('layouts.admin')

@section('title', 'Add Service')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Add Service</h1>
</div>

<form action="{{ route('admin.services.store') }}" method="POST" enctype="multipart/form-data">
    @csrf
    <div class="card border-0 shadow-sm max-width-600">
        <div class="card-body">
            <div class="mb-3">
                <label for="title" class="form-label fw-bold">Service Title</label>
                <input type="text" name="title" id="title" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="icon" class="form-label fw-bold">FontAwesome Icon Class</label>
                <input type="text" name="icon" id="icon" class="form-control" placeholder="fa-forklift" defaultValue="fa-screwdriver-wrench">
            </div>
            <div class="mb-3">
                <label for="image" class="form-label fw-bold">Cover Image</label>
                <input type="file" name="image" id="image" class="form-control" accept="image/*">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label fw-bold">Description</label>
                <textarea name="description" id="description" rows="4" class="form-control"></textarea>
            </div>
            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk me-1"></i> Save Service</button>
        </div>
    </div>
</form>
@endsection
