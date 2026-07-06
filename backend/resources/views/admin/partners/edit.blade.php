@extends('layouts.admin')

@section('title', 'Edit Partner')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Edit Partner</h1>
</div>

<form action="{{ route('admin.partners.update', $partner->id) }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')
    <div class="card border-0 shadow-sm">
        <div class="card-body">
            <div class="mb-3">
                <label for="company_name" class="form-label fw-bold">Company Name</label>
                <input type="text" name="company_name" id="company_name" class="form-control" value="{{ $partner->company_name }}" required>
            </div>
            <div class="mb-3">
                <label for="logo" class="form-label fw-bold">Company Logo</label>
                @if($partner->logo)
                    <div class="mb-2">
                        <img src="{{ url(\Illuminate\Support\Facades\Storage::url($partner->logo)) }}" class="img-thumbnail" style="max-height: 80px;">
                    </div>
                @endif
                <input type="file" name="logo" id="logo" class="form-control" accept="image/*">
            </div>
            <div class="mb-3">
                <label for="website" class="form-label fw-bold">Website URL</label>
                <input type="url" name="website" id="website" class="form-control" value="{{ $partner->website }}">
            </div>
            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk me-1"></i> Update Partner</button>
        </div>
    </div>
</form>
@endsection
