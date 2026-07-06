<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // Map images to full public URLs
        $imagesUrls = [];
        if ($this->images && is_array($this->images)) {
            foreach ($this->images as $path) {
                $imagesUrls[] = $path ? url(Storage::url($path)) : null;
            }
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'category' => $this->category ? [
                'id' => $this->category->id,
                'name' => $this->category->name,
                'slug' => $this->category->slug,
            ] : null,
            'short_description' => $this->short_description,
            'description' => $this->description,
            'specification' => $this->specification,
            'thumbnail' => $this->thumbnail ? url(Storage::url($this->thumbnail)) : null,
            'images' => $imagesUrls,
            'price' => (float) $this->price,
            'status' => $this->status,
            'featured' => (bool) $this->featured,
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
