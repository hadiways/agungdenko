@extends('layouts.admin')

@section('title', 'Add Partner')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Add Partner Company</h1>
</div>

<form action="{{ route('admin.partners.store') }}" method="POST" enctype="multipart/form-data">
    @csrf
    <div class="card border-0 shadow-sm max-width-600">
        <div class="card-body">
            <div class="mb-3">
                <label for="company_name" class="form-label fw-bold">Company Name</label>
                <input type="text" name="company_name" id="company_name" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="logo" class="form-label fw-bold">Company Logo</label>
                <input type="file" name="logo" id="logo" class="form-control" accept="image/*" required>
            </div>
            <div class="mb-3">
                <label for="website" class="form-label fw-bold">Website URL</label>
                <input type="url" name="website" id="website" class="form-control" placeholder="https://partner-company.com">
            </div>
            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk me-1"></i> Save Partner</button>
        </div>
    </div>
</form>
@endsection
