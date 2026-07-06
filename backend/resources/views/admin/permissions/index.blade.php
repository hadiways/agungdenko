@extends('layouts.admin')

@section('title', 'Permissions')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">System Permissions</h1>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th>Permission Name</th>
                        <th>Guard Name</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($permissions as $perm)
                        <tr>
                            <td class="font-monospace fw-bold">{{ $perm->name }}</td>
                            <td><span class="badge bg-light text-dark border">{{ $perm->guard_name }}</span></td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="2" class="text-center py-5 text-muted">No permissions found. Try running RoleAndPermissionSeeder.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
    @if($permissions->hasPages())
        <div class="card-footer bg-white border-top py-3">
            {{ $permissions->links() }}
        </div>
    @endif
</div>
@endsection
