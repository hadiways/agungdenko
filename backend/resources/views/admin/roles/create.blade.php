@extends('layouts.admin')

@section('title', 'Add Role')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Add Role</h1>
</div>

<form action="{{ route('admin.roles.store') }}" method="POST">
    @csrf
    <div class="card border-0 shadow-sm">
        <div class="card-body">
            <div class="mb-3">
                <label for="name" class="form-label fw-bold">Role Name</label>
                <input type="text" name="name" id="name" class="form-control" placeholder="e.g. Content Writer" required>
            </div>
            
            <div class="mb-3">
                <label class="form-label fw-bold d-block">Permissions Checklist</label>
                <div class="row">
                    @foreach($permissions as $perm)
                        <div class="col-md-3 col-sm-6 mb-2">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="permissions[]" value="{{ $perm->name }}" id="perm_{{ $perm->id }}">
                                <label class="form-check-label" for="perm_{{ $perm->id }}">{{ $perm->name }}</label>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
            
            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk me-1"></i> Save Role</button>
        </div>
    </div>
</form>
@endsection
