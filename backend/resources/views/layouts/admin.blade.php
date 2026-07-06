<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Admin Dashboard') - PT Denko Wahana Sakti</title>
    <!-- Bootstrap 5 CSS via CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome for icons -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" rel="stylesheet">
    <!-- Custom Theme styles (Industrial Blue theme) -->
    <style>
        :root {
            --primary-blue: #084C8F;
            --secondary-blue: #86A8BD;
            --dark-navy: #0B1B2B;
            --accent-blue: #2F80ED;
            --light-bg: #F4F6F9;
        }
        body {
            background-color: var(--light-bg);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .sidebar {
            background-color: var(--dark-navy);
            min-height: 100vh;
            color: #fff;
            box-shadow: 2px 0 5px rgba(0,0,0,0.1);
        }
        .sidebar .nav-link {
            color: rgba(255,255,255,0.7);
            font-weight: 500;
            padding: 12px 20px;
            border-left: 4px solid transparent;
            transition: all 0.2s ease;
        }
        .sidebar .nav-link:hover, .sidebar .nav-link.active {
            color: #fff;
            background-color: rgba(255,255,255,0.05);
            border-left-color: var(--accent-blue);
        }
        .sidebar-brand {
            padding: 20px;
            font-size: 1.2rem;
            font-weight: 700;
            background-color: rgba(0,0,0,0.2);
            color: #fff;
            text-decoration: none;
            display: block;
        }
        .top-navbar {
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .card-stats {
            border: none;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            transition: transform 0.2s ease;
        }
        .card-stats:hover {
            transform: translateY(-3px);
        }
        .btn-primary {
            background-color: var(--primary-blue);
            border-color: var(--primary-blue);
        }
        .btn-primary:hover {
            background-color: #063d73;
            border-color: #063d73;
        }
    </style>
    @yield('styles')
</head>
<body>

<div class="container-fluid">
    <div class="row">
        <!-- Sidebar Navigation -->
        <nav class="col-md-3 col-lg-2 d-md-block sidebar collapse px-0">
            <a href="{{ route('admin.dashboard') }}" class="sidebar-brand text-center">
                <i class="fa-solid fa-truck-ramp-box me-2"></i>DWS ADMIN
            </a>
            <div class="position-sticky pt-3">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}" href="{{ route('admin.dashboard') }}">
                            <i class="fa-solid fa-gauge me-2"></i> Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('admin.products.*') ? 'active' : '' }}" href="{{ route('admin.products.index') }}">
                            <i class="fa-solid fa-box-open me-2"></i> Products
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('admin.services.*') ? 'active' : '' }}" href="{{ route('admin.services.index') }}">
                            <i class="fa-solid fa-screwdriver-wrench me-2"></i> Services
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('admin.gallery.*') ? 'active' : '' }}" href="{{ route('admin.gallery.index') }}">
                            <i class="fa-solid fa-images me-2"></i> Gallery
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('admin.partners.*') ? 'active' : '' }}" href="{{ route('admin.partners.index') }}">
                            <i class="fa-solid fa-handshake me-2"></i> Partners
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('admin.testimonials.*') ? 'active' : '' }}" href="{{ route('admin.testimonials.index') }}">
                            <i class="fa-solid fa-comment-dots me-2"></i> Testimonials
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('admin.messages.*') ? 'active' : '' }}" href="{{ route('admin.messages.index') }}">
                            <i class="fa-solid fa-envelope me-2"></i> Messages
                            @php
                                $unread = \App\Models\ContactMessage::where('is_read', false)->count();
                            @endphp
                            @if($unread > 0)
                                <span class="badge rounded-pill bg-danger float-end">{{ $unread }}</span>
                            @endif
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('admin.settings.*') ? 'active' : '' }}" href="{{ route('admin.settings.edit') }}">
                            <i class="fa-solid fa-sliders me-2"></i> Settings
                        </a>
                    </li>
                    
                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase" style="font-size: 0.75rem;">
                        <span>System Access</span>
                    </h6>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('admin.users.*') ? 'active' : '' }}" href="{{ route('admin.users.index') }}">
                            <i class="fa-solid fa-users me-2"></i> Users
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('admin.roles.*') ? 'active' : '' }}" href="{{ route('admin.roles.index') }}">
                            <i class="fa-solid fa-shield-halved me-2"></i> Roles
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('admin.permissions.*') ? 'active' : '' }}" href="{{ route('admin.permissions.index') }}">
                            <i class="fa-solid fa-key me-2"></i> Permissions
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Main Body -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 px-0">
            <!-- Top navbar -->
            <header class="navbar navbar-light sticky-top top-navbar flex-md-nowrap p-0 px-3 py-2 mb-4 border-bottom">
                <span class="navbar-brand col-md-3 col-lg-2 me-0 px-0 fs-6">PT Denko Wahana Sakti</span>
                <div class="dropdown ms-auto">
                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-user me-1"></i> {{ auth()->user()->name ?? 'Administrator' }}
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <form action="{{ route('admin.logout') }}" method="POST" class="d-inline">
                                @csrf
                                <button type="submit" class="dropdown-item text-danger"><i class="fa-solid fa-right-from-bracket me-2"></i>Logout</button>
                            </form>
                        </li>
                    </ul>
                </div>
            </header>

            <!-- Alerts / Notifications -->
            <div class="container-fluid px-0">
                @if(session('success'))
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <i class="fa-solid fa-circle-check me-2"></i> {{ session('success') }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                @endif
                @if(session('error'))
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <i class="fa-solid fa-triangle-exclamation me-2"></i> {{ session('error') }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                @endif
                @if($errors->any())
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <ul class="mb-0">
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                @endif
            </div>

            <!-- Page Content -->
            <div class="py-2">
                @yield('content')
            </div>

            <!-- Footer -->
            <footer class="text-center py-4 text-muted border-top mt-5">
                <small>&copy; {{ date('Y') }} PT Denko Wahana Sakti. All Rights Reserved.</small>
            </footer>
        </main>
    </div>
</div>

<!-- Bootstrap Bundle with Popper via CDN -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
@yield('scripts')
</body>
</html>
