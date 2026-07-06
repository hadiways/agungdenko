@extends('layouts.admin')

@section('title', 'Partners')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Partners Management</h1>
    <a href="{{ route('admin.partners.create') }}" class="btn btn-sm btn-primary"><i class="fa-solid fa-plus me-1"></i> Add Partner</a>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th style="width: 100px;">Logo</th>
                        <th>Company Name</th>
                        <th>Website</th>
                        <th style="width: 150px;" class="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($partners as $partner)
                        <tr>
                            <td>
                                <img src="{{ url(\Illuminate\Support\Facades\Storage::url($partner->logo)) }}" alt="{{ $partner->company_name }}" class="img-thumbnail" style="width: 60px; height: 60px; object-fit: contain;">
                            </td>
                            <td class="fw-bold">{{ $partner->company_name }}</td>
                            <td>
                                @if($partner->website)
                                    <a href="{{ $partner->website }}" target="_blank" class="small">{{ $partner->website }}</a>
                                @else
                                    <span class="text-muted small">None</span>
                                @endif
                            </td>
                            <td class="text-center">
                                <div class="d-flex justify-content-center gap-2">
                                    <a href="{{ route('admin.partners.edit', $partner->id) }}" class="btn btn-sm btn-outline-primary"><i class="fa-solid fa-pen-to-square"></i></a>
                                    <form action="{{ route('admin.partners.destroy', $partner->id) }}" method="POST" onsubmit="return confirm('Remove partner?')" class="d-inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-outline-danger"><i class="fa-solid fa-trash"></i></button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" class="text-center py-5 text-muted">No partners found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
