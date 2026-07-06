<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\ContactMessage;
use App\Models\Gallery;
use App\Models\Partner;
use App\Models\Product;
use App\Models\Service;
use App\Models\Testimonial;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'products_count' => Product::count(),
            'services_count' => Service::count(),
            'gallery_count' => Gallery::count(),
            'partners_count' => Partner::count(),
            'testimonials_count' => Testimonial::count(),
            'messages_unread_count' => ContactMessage::where('is_read', false)->count(),
        ];

        // Fetch recent contact messages (last 5)
        $recentMessages = ContactMessage::orderBy('created_at', 'desc')->limit(5)->get();

        // Fetch recent activities (last 10)
        $recentActivities = ActivityLog::with('user')->orderBy('created_at', 'desc')->limit(10)->get();

        return view('admin.dashboard', compact('stats', 'recentMessages', 'recentActivities'));
    }
}
