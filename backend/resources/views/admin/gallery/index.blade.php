@extends('layouts.admin')

@section('title', 'Gallery')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Gallery Management</h1>
    <a href="{{ route('admin.gallery.create') }}" class="btn btn-sm btn-primary"><i class="fa-solid fa-plus me-1"></i> Upload Image</a>
</div>

<div class="row g-3">
    @forelse($gallery as $item)
        <div class="col-md-3 col-sm-6">
            <div class="card border-0 shadow-sm h-100">
                <img src="{{ url(\Illuminate\Support\Facades\Storage::url($item->image)) }}" class="card-img-top" style="height: 180px; object-fit: cover;">
                <div class="card-body">
                    <h6 class="card-title fw-bold text-truncate">{{ $item->title }}</h6>
                    <span class="badge bg-light text-dark border">{{ $item->category }}</span>
                </div>
                <div class="card-footer bg-white border-top-0 d-flex justify-content-between">
                    <a href="{{ route('admin.gallery.edit', $item->id) }}" class="btn btn-sm btn-outline-primary"><i class="fa-solid fa-pen-to-square"></i></a>
                    <form action="{{ route('admin.gallery.destroy', $item->id) }}" method="POST" onsubmit="return confirm('Delete this image?')" class="d-inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-sm btn-outline-danger"><i class="fa-solid fa-trash"></i></button>
                    </form>
                </div>
            </div>
        </div>
    @empty
        <div class="col-12 py-5 text-center text-muted">No gallery items found.</div>
    @endforelse
</div>
@endsection
