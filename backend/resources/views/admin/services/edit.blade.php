@extends('layouts.admin')

@section('title', 'Edit Service')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Edit Service</h1>
</div>

<form action="{{ route('admin.services.update', $service->id) }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')
    <div class="card border-0 shadow-sm">
        <div class="card-body">
            <div class="mb-3">
                <label for="title" class="form-label fw-bold">Service Title</label>
                <input type="text" name="title" id="title" class="form-control" value="{{ $service->title }}" required>
            </div>
            <div class="mb-3">
                <label for="icon" class="form-label fw-bold">FontAwesome Icon Class</label>
                <input type="text" name="icon" id="icon" class="form-control" value="{{ $service->icon }}">
            </div>
            <div class="mb-3">
                <label for="image" class="form-label fw-bold">Cover Image</label>
                @if($service->image)
                    <div class="mb-2">
                        <img src="{{ url(\Illuminate\Support\Facades\Storage::url($service->image)) }}" class="img-thumbnail" style="max-height: 100px;">
                    </div>
                @endif
                <input type="file" name="image" id="image" class="form-control" accept="image/*">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label fw-bold">Description</label>
                <textarea name="description" id="description" rows="4" class="form-control">{{ $service->description }}</textarea>
            </div>
            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk me-1"></i> Update Service</button>
        </div>
    </div>
</form>
@endsection
