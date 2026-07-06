<?php

namespace App\Services;

use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class ActivityLogService
{
    /**
     * Log user activity.
     *
     * @param string $action Action name (e.g., 'CREATE_PRODUCT')
     * @param string|null $description Detailed description
     * @return ActivityLog
     */
    public function log(string $action, string $description = null): ActivityLog
    {
        return ActivityLog::create([
            'user_id' => Auth::id(),
            'action' => strtoupper($action),
            'description' => $description,
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent(),
        ]);
    }
}
