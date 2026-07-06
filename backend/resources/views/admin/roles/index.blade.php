@extends('layouts.admin')

@section('title', 'Roles')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Role Access Control</h1>
    <a href="{{ route('admin.roles.create') }}" class="btn btn-sm btn-primary"><i class="fa-solid fa-plus me-1"></i> Add Role</a>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th>Role Name</th>
                        <th>Permissions Granted</th>
                        <th style="width: 150px;" class="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($roles as $role)
                        <tr>
                            <td class="fw-bold">{{ $role->name }}</td>
                            <td>
                                @if($role->name === 'Super Admin')
                                    <span class="badge bg-danger">All System Permissions (*)</span>
                                @else
                                    @foreach($role->permissions as $perm)
                                        <span class="badge bg-secondary mb-1">{{ $perm->name }}</span>
                                    @endforeach
                                @endif
                            </td>
                            <td class="text-center">
                                <div class="d-flex justify-content-center gap-2">
                                    <a href="{{ route('admin.roles.edit', $role->id) }}" class="btn btn-sm btn-outline-primary {{ $role->name === 'Super Admin' ? 'disabled' : '' }}"><i class="fa-solid fa-pen-to-square"></i></a>
                                    <form action="{{ route('admin.roles.destroy', $role->id) }}" method="POST" onsubmit="return confirm('Delete this role?')" class="d-inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-outline-danger" {{ $role->name === 'Super Admin' ? 'disabled' : '' }}><i class="fa-solid fa-trash"></i></button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="3" class="text-center py-5 text-muted">No roles found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
