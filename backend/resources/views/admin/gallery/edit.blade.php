@extends('layouts.admin')

@section('title', 'Edit Gallery Image')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Edit Gallery Item</h1>
</div>

<form action="{{ route('admin.gallery.update', $item->id) }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')
    <div class="card border-0 shadow-sm">
        <div class="card-body">
            <div class="mb-3">
                <label for="title" class="form-label fw-bold">Title</label>
                <input type="text" name="title" id="title" class="form-control" value="{{ $item->title }}" required>
            </div>
            <div class="mb-3">
                <label for="category" class="form-label fw-bold">Category</label>
                <input type="text" name="category" id="category" class="form-control" value="{{ $item->category }}" required>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label fw-bold">Image File</label>
                @if($item->image)
                    <div class="mb-2">
                        <img src="{{ url(\Illuminate\Support\Facades\Storage::url($item->image)) }}" class="img-thumbnail" style="max-height: 120px;">
                    </div>
                @endif
                <input type="file" name="image" id="image" class="form-control" accept="image/*">
            </div>
            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk me-1"></i> Update Item</button>
        </div>
    </div>
</form>
@endsection
