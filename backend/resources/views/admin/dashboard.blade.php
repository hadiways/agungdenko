@extends('layouts.admin')

@section('title', 'Dashboard')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Dashboard Overview</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.products.create') }}" class="btn btn-sm btn-primary">
            <i class="fa-solid fa-plus me-1"></i> Add Product
        </a>
    </div>
</div>

<!-- Stats Grid -->
<div class="row g-3 mb-4">
    <div class="col-6 col-lg-2">
        <div class="card card-stats bg-white p-3 border-start border-primary border-4">
            <div class="text-muted small text-uppercase fw-bold">Products</div>
            <div class="fs-3 fw-bold my-1 text-dark">{{ $stats['products_count'] }}</div>
            <a href="{{ route('admin.products.index') }}" class="small text-decoration-none">View all <i class="fa-solid fa-arrow-right"></i></a>
        </div>
    </div>
    <div class="col-6 col-lg-2">
        <div class="card card-stats bg-white p-3 border-start border-success border-4">
            <div class="text-muted small text-uppercase fw-bold">Services</div>
            <div class="fs-3 fw-bold my-1 text-dark">{{ $stats['services_count'] }}</div>
            <a href="{{ route('admin.services.index') }}" class="small text-decoration-none">View all <i class="fa-solid fa-arrow-right"></i></a>
        </div>
    </div>
    <div class="col-6 col-lg-2">
        <div class="card card-stats bg-white p-3 border-start border-info border-4">
            <div class="text-muted small text-uppercase fw-bold">Gallery</div>
            <div class="fs-3 fw-bold my-1 text-dark">{{ $stats['gallery_count'] }}</div>
            <a href="{{ route('admin.gallery.index') }}" class="small text-decoration-none">View all <i class="fa-solid fa-arrow-right"></i></a>
        </div>
    </div>
    <div class="col-6 col-lg-2">
        <div class="card card-stats bg-white p-3 border-start border-warning border-4">
            <div class="text-muted small text-uppercase fw-bold">Partners</div>
            <div class="fs-3 fw-bold my-1 text-dark">{{ $stats['partners_count'] }}</div>
            <a href="{{ route('admin.partners.index') }}" class="small text-decoration-none">View all <i class="fa-solid fa-arrow-right"></i></a>
        </div>
    </div>
    <div class="col-6 col-lg-2">
        <div class="card card-stats bg-white p-3 border-start border-secondary border-4">
            <div class="text-muted small text-uppercase fw-bold">Reviews</div>
            <div class="fs-3 fw-bold my-1 text-dark">{{ $stats['testimonials_count'] }}</div>
            <a href="{{ route('admin.testimonials.index') }}" class="small text-decoration-none">View all <i class="fa-solid fa-arrow-right"></i></a>
        </div>
    </div>
    <div class="col-6 col-lg-2">
        <div class="card card-stats bg-white p-3 border-start border-danger border-4">
            <div class="text-muted small text-uppercase fw-bold">Unread</div>
            <div class="fs-3 fw-bold my-1 text-danger">{{ $stats['messages_unread_count'] }}</div>
            <a href="{{ route('admin.messages.index') }}" class="small text-decoration-none text-danger">Inbox <i class="fa-solid fa-arrow-right"></i></a>
        </div>
    </div>
</div>

<div class="row g-4">
    <!-- Recent Messages -->
    <div class="col-lg-6">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
                <h5 class="card-title mb-0 fw-bold"><i class="fa-solid fa-inbox text-primary me-2"></i>Recent Messages</h5>
                <a href="{{ route('admin.messages.index') }}" class="btn btn-sm btn-link text-decoration-none">View all</a>
            </div>
            <div class="card-body p-0">
                <div class="list-group list-group-flush">
                    @forelse($recentMessages as $msg)
                        <a href="{{ route('admin.messages.show', $msg->id) }}" class="list-group-item list-group-item-action py-3 border-bottom {{ !$msg->is_read ? 'bg-light' : '' }}">
                            <div class="d-flex w-100 justify-content-between">
                                <h6 class="mb-1 fw-bold {{ !$msg->is_read ? 'text-primary' : 'text-dark' }}">{{ $msg->name }}</h6>
                                <small class="text-muted">{{ $msg->created_at->diffForHumans() }}</small>
                            </div>
                            <p class="mb-1 text-muted small text-truncate">{{ $msg->subject }} - {{ $msg->message }}</p>
                            <small class="text-muted-50">{{ $msg->company ?? 'No Company' }}</small>
                        </a>
                    @empty
                        <div class="p-4 text-center text-muted">No messages received yet.</div>
                    @endforelse
                </div>
            </div>
        </div>
    </div>

    <!-- Activity Log -->
    <div class="col-lg-6">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white py-3 border-bottom">
                <h5 class="card-title mb-0 fw-bold"><i class="fa-solid fa-clock-rotate-left text-success me-2"></i>Activity Log</h5>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0 small">
                        <thead class="table-light">
                            <tr>
                                <th>User</th>
                                <th>Action</th>
                                <th>Description</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($recentActivities as $log)
                                <tr>
                                    <td>{{ $log->user->name ?? 'System' }}</td>
                                    <td><span class="badge bg-secondary">{{ $log->action }}</span></td>
                                    <td>{{ $log->description }}</td>
                                    <td>{{ $log->created_at->diffForHumans() }}</td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="4" class="text-center text-muted py-4">No recent activity logs.</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
