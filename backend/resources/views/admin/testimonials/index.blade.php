@extends('layouts.admin')

@section('title', 'Testimonials')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Testimonials Management</h1>
    <a href="{{ route('admin.testimonials.create') }}" class="btn btn-sm btn-primary"><i class="fa-solid fa-plus me-1"></i> Add Testimonial</a>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th style="width: 80px;">Photo</th>
                        <th>Client Details</th>
                        <th>Testimonial</th>
                        <th>Rating</th>
                        <th style="width: 150px;" class="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($testimonials as $test)
                        <tr>
                            <td>
                                @if($test->photo)
                                    <img src="{{ url(\Illuminate\Support\Facades\Storage::url($test->photo)) }}" alt="{{ $test->customer_name }}" class="img-thumbnail rounded-circle" style="width: 50px; height: 50px; object-fit: cover;">
                                @else
                                    <span class="badge bg-light text-muted p-2 rounded-circle"><i class="fa-solid fa-user fs-4"></i></span>
                                @endif
                            </td>
                            <td>
                                <div class="fw-bold">{{ $test->customer_name }}</div>
                                <small class="text-muted">{{ $test->position }}, {{ $test->company }}</small>
                            </td>
                            <td>{{ Str::limit($test->testimonial, 120) }}</td>
                            <td>
                                @for($i=1; $i<=5; $i++)
                                    <i class="fa-solid fa-star {{ $i <= $test->rating ? 'text-warning' : 'text-light-50' }}"></i>
                                @endfor
                            </td>
                            <td class="text-center">
                                <div class="d-flex justify-content-center gap-2">
                                    <a href="{{ route('admin.testimonials.edit', $test->id) }}" class="btn btn-sm btn-outline-primary"><i class="fa-solid fa-pen-to-square"></i></a>
                                    <form action="{{ route('admin.testimonials.destroy', $test->id) }}" method="POST" onsubmit="return confirm('Delete testimonial?')" class="d-inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-outline-danger"><i class="fa-solid fa-trash"></i></button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="text-center py-5 text-muted">No testimonials found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
