<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PartnerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'company_name' => $this->company_name,
            'logo' => $this->logo ? url(Storage::url($this->logo)) : null,
            'website' => $this->website,
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
