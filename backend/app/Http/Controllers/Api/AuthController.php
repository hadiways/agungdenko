<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends ApiController
{
    /**
     * Authenticate admin user and return token.
     */
    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return $this->errorResponse(
                ['email' => ['These credentials do not match our records.']],
                'Unauthorized credentials',
                422
            );
        }

        // Generate Sanctum access token
        $token = $user->createToken('admin-api-token')->plainTextToken;

        return $this->successResponse([
            'token' => $token,
            'user' => new UserResource($user),
        ], 'Login successful');
    }

    /**
     * Log out current user and revoke token.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->successResponse(null, 'Logged out successfully');
    }

    /**
     * Get authenticated user profile.
     */
    public function user(Request $request)
    {
        return $this->successResponse(new UserResource($request->user()), 'User details retrieved');
    }
}
