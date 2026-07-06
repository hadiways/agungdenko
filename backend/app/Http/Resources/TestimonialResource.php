<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TestimonialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'customer_name' => $this->customer_name,
            'company' => $this->company,
            'position' => $this->position,
            'photo' => $this->photo ? url(Storage::url($this->photo)) : null,
            'testimonial' => $this->testimonial,
            'rating' => $this->rating,
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
