@extends('layouts.admin')

@section('title', 'Products')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Manage Products</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.products.create') }}" class="btn btn-sm btn-primary">
            <i class="fa-solid fa-plus me-1"></i> Add Product
        </a>
    </div>
</div>

<!-- Search & Filters -->
<div class="card border-0 shadow-sm mb-4">
    <div class="card-body">
        <form action="{{ route('admin.products.index') }}" method="GET" class="row g-3">
            <div class="col-md-5">
                <input type="text" name="search" class="form-control" placeholder="Search by name, description..." value="{{ request('search') }}">
            </div>
            <div class="col-md-4">
                <select name="category" class="form-select">
                    <option value="">All Categories</option>
                    @foreach(\App\Models\Category::all() as $cat)
                        <option value="{{ $cat->slug }}" {{ request('category') === $cat->slug ? 'selected' : '' }}>{{ $cat->name }}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-md-3 d-flex gap-2">
                <button type="submit" class="btn btn-secondary w-100"><i class="fa-solid fa-magnifying-glass me-1"></i> Filter</button>
                <a href="{{ route('admin.products.index') }}" class="btn btn-outline-secondary w-100">Reset</a>
            </div>
        </form>
    </div>
</div>

<!-- Products Table -->
<div class="card border-0 shadow-sm">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th style="width: 80px;">Thumbnail</th>
                        <th>Product Details</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Featured</th>
                        <th style="width: 150px;" class="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($products as $prod)
                        <tr>
                            <td>
                                @if($prod->thumbnail)
                                    <img src="{{ url(\Illuminate\Support\Facades\Storage::url($prod->thumbnail)) }}" alt="{{ $prod->name }}" class="img-thumbnail" style="width: 60px; height: 60px; object-fit: cover;">
                                @else
                                    <span class="badge bg-light text-muted p-3"><i class="fa-solid fa-image"></i></span>
                                @endif
                            </td>
                            <td>
                                <div class="fw-bold">{{ $prod->name }}</div>
                                <div class="text-muted small text-truncate" style="max-width: 350px;">{{ $prod->short_description }}</div>
                            </td>
                            <td>
                                <span class="badge bg-light text-dark border">{{ $prod->category->name ?? 'None' }}</span>
                            </td>
                            <td>${{ number_format($prod->price, 2) }}</td>
                            <td>
                                @if($prod->status === 'active')
                                    <span class="badge bg-success-subtle text-success border border-success-subtle">Active</span>
                                @elseif($prod->status === 'draft')
                                    <span class="badge bg-warning-subtle text-warning border border-warning-subtle">Draft</span>
                                @else
                                    <span class="badge bg-danger-subtle text-danger border border-danger-subtle">Inactive</span>
                                @endif
                            </td>
                            <td>
                                @if($prod->featured)
                                    <span class="text-warning"><i class="fa-solid fa-star"></i> Featured</span>
                                @else
                                    <span class="text-muted"><i class="fa-regular fa-star"></i> Regular</span>
                                @endif
                            </td>
                            <td>
                                <div class="d-flex justify-content-center gap-2">
                                    <a href="{{ route('admin.products.edit', $prod->id) }}" class="btn btn-sm btn-outline-primary" title="Edit">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a>
                                    <form action="{{ route('admin.products.destroy', $prod->id) }}" method="POST" onsubmit="return confirm('Are you sure you want to delete this product?')" class="d-inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-outline-danger" title="Delete">
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="text-center py-5 text-muted">
                                <i class="fa-solid fa-box-open fs-2 mb-3"></i>
                                <p class="mb-0">No products found matching filters.</p>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
    @if($products->hasPages())
        <div class="card-footer bg-white border-top py-3">
            {{ $products->links() }}
        </div>
    @endif
</div>
@endsection
