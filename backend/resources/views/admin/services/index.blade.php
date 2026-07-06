@extends('layouts.admin')

@section('title', 'Services')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Services Management</h1>
    <a href="{{ route('admin.services.create') }}" class="btn btn-sm btn-primary"><i class="fa-solid fa-plus me-1"></i> Add Service</a>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th style="width: 100px;">Icon</th>
                        <th>Service Title</th>
                        <th>Description</th>
                        <th style="width: 150px;" class="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($services as $serv)
                        <tr>
                            <td class="text-center">
                                <span class="fs-4 text-primary"><i class="fa-solid {{ $serv->icon ?? 'fa-screwdriver-wrench' }}"></i></span>
                            </td>
                            <td class="fw-bold">{{ $serv->title }}</td>
                            <td>{{ Str::limit($serv->description, 100) }}</td>
                            <td class="text-center">
                                <div class="d-flex justify-content-center gap-2">
                                    <a href="{{ route('admin.services.edit', $serv->id) }}" class="btn btn-sm btn-outline-primary"><i class="fa-solid fa-pen-to-square"></i></a>
                                    <form action="{{ route('admin.services.destroy', $serv->id) }}" method="POST" onsubmit="return confirm('Delete this service?')" class="d-inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-outline-danger"><i class="fa-solid fa-trash"></i></button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" class="text-center py-5 text-muted">No services found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
