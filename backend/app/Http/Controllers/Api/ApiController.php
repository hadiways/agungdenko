<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponseTrait;

/**
 * @OA\Info(
 *      version="1.0.0",
 *      title="PT Denko Wahana Sakti B2B REST API Documentation",
 *      description="Production-ready REST API endpoints serving material handling solutions data for Next.js frontend.",
 *      @OA\Contact(
 *          email="info@dws.co.id"
 *      )
 * )
 *
 * @OA\Server(
 *      url="/api",
 *      description="API Endpoint Server"
 * )
 *
 * @OA\SecurityScheme(
 *      securityScheme="bearerAuth",
 *      type="http",
 *      scheme="bearer",
 *      bearerFormat="JWT",
 *      description="Enter Sanctum bearer token to access protected admin resources."
 * )
 */
abstract class ApiController extends Controller
{
    use ApiResponseTrait;
}
