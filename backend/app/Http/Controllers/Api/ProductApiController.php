<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductApiController extends ApiController
{
    protected ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    /**
     * @OA\Get(
     *      path="/products",
     *      operationId="getProductsList",
     *      tags={"Products"},
     *      summary="Get list of products",
     *      description="Returns paginated list of material handling equipment products. Supports filtering by search terms and category slugs.",
     *      @OA\Parameter(
     *          name="search",
     *          in="query",
     *          description="Filter by name, short description, or description",
     *          required=false,
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Parameter(
     *          name="category",
     *          in="query",
     *          description="Filter by category slug",
     *          required=false,
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Parameter(
     *          name="per_page",
     *          in="query",
     *          description="Number of items per page",
     *          required=false,
     *          @OA\Schema(type="integer", default=12)
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="message", type="string", example="Products retrieved successfully"),
     *              @OA\Property(property="data", type="array", @OA\Items(type="object"))
     *          )
     *      )
     * )
     */
    public function index(Request $request)
    {
        $search = $request->query('search');
        $category = $request->query('category');
        $perPage = $request->query('per_page', 12);

        $products = $this->productService->searchAndPaginate($search, $category, $perPage);

        return ProductResource::collection($products)->additional([
            'success' => true,
            'message' => 'Products retrieved successfully',
        ]);
    }

    /**
     * Store a newly created product.
     */
    public function store(ProductRequest $request)
    {
        $product = $this->productService->create($request->validated());

        return $this->successResponse(
            new ProductResource($product),
            'Product created successfully',
            21
        );
    }

    /**
     * Display the specified product by slug.
     */
    public function show(string $slug)
    {
        $product = $this->productService->findBySlug($slug);

        if (! $product) {
            return $this->errorResponse([], 'Product not found', 404);
        }

        return $this->successResponse(
            new ProductResource($product),
            'Product retrieved successfully'
        );
    }

    /**
     * Update the specified product in storage.
     */
    public function update(ProductRequest $request, $id)
    {
        $product = $this->productService->update($id, $request->validated());

        return $this->successResponse(
            new ProductResource($product),
            'Product updated successfully'
        );
    }

    /**
     * Remove the specified product from storage (soft delete).
     */
    public function destroy($id)
    {
        $this->productService->delete($id);

        return $this->successResponse(null, 'Product deleted successfully');
    }
}
