<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // Map images safely to full public URLs
        $imagesUrls = [];
        if (!empty($this->images) && is_array($this->images)) {
            foreach ($this->images as $path) {
                if ($path) {
                    try {
                        $imagesUrls[] = url(Storage::url($path));
                    } catch (\Throwable $e) {
                        $imagesUrls[] = (string) $path;
                    }
                }
            }
        }

        $thumbnailUrl = null;
        if (!empty($this->thumbnail)) {
            try {
                $thumbnailUrl = url(Storage::url($this->thumbnail));
            } catch (\Throwable $e) {
                $thumbnailUrl = (string) $this->thumbnail;
            }
        }

        return [
            'id' => $this->id,
            'name' => $this->name ?? '',
            'slug' => $this->slug ?? '',
            'category' => $this->category ? [
                'id' => $this->category->id,
                'name' => $this->category->name ?? '',
                'slug' => $this->category->slug ?? '',
            ] : null,
            'short_description' => $this->short_description ?? '',
            'description' => $this->description ?? '',
            'specification' => $this->specification ?? '',
            'thumbnail' => $thumbnailUrl,
            'images' => $imagesUrls,
            'price' => (float) ($this->price ?? 0),
            'status' => $this->status ?? 'active',
            'featured' => (bool) ($this->featured ?? false),
            'created_at' => $this->created_at ? $this->created_at->toIso8601String() : null,
        ];
    }
}
