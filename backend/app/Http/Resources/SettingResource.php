<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class SettingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'company_name' => $this->company_name,
            'address' => $this->address,
            'phone' => $this->phone,
            'email' => $this->email,
            'whatsapp' => $this->whatsapp,
            'social_media' => [
                'facebook' => $this->facebook,
                'instagram' => $this->instagram,
                'linkedin' => $this->linkedin,
                'youtube' => $this->youtube,
            ],
            'logo' => $this->logo ? url(Storage::url($this->logo)) : null,
            'favicon' => $this->favicon ? url(Storage::url($this->favicon)) : null,
            'hero_image' => $this->hero_image ? url(Storage::url($this->hero_image)) : null,
        ];
    }
}
