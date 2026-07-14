<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponseTrait
{
    /**
     * Return a success JSON response.
     *
     * @param mixed $data
     * @param string $message
     * @param int $code
     * @return JsonResponse
     */
    protected function successResponse(mixed $data = null, string $message = 'Success', int $code = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    /**
     * Return a validation/general error JSON response.
     *
     * @param mixed $errors
     * @param string $message
     * @param int $code
     * @return JsonResponse
     */
    protected function errorResponse(mixed $errors = [], string $message = 'Error occurred', int $code = 400): JsonResponse
    {
        // If it's a validation error response, match request format: {"success": false, "message": "...", "errors": {}}
        if ($code === 422) {
            return response()->json([
                'success' => false,
                'message' => $message === 'Error occurred' ? 'Data tidak valid.' : $message,
                'errors' => $errors,
            ], $code);
        }

        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], $code);
    }
}
