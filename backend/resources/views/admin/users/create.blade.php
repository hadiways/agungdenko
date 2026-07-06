@extends('layouts.admin')

@section('title', 'Add User')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Add Admin User</h1>
</div>

<form action="{{ route('admin.users.store') }}" method="POST">
    @csrf
    <div class="card border-0 shadow-sm max-width-600">
        <div class="card-body">
            <div class="mb-3">
                <label for="name" class="form-label fw-bold">Full Name</label>
                <input type="text" name="name" id="name" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label fw-bold">Email Address</label>
                <input type="email" name="email" id="email" class="form-control" required>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="password" class="form-label fw-bold">Password</label>
                    <input type="password" name="password" id="password" class="form-control" required>
                </div>
                <div class="col-md-6">
                    <label for="password_confirmation" class="form-label fw-bold">Confirm Password</label>
                    <input type="password" name="password_confirmation" id="password_confirmation" class="form-control" required>
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label fw-bold">Assign Roles</label>
                <div class="row g-2">
                    @foreach($roles as $role)
                        <div class="col-md-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="roles[]" value="{{ $role->name }}" id="role_{{ $role->id }}">
                                <label class="form-check-label" for="role_{{ $role->id }}">{{ $role->name }}</label>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-user-plus me-1"></i> Save User</button>
        </div>
    </div>
</form>
@endsection
