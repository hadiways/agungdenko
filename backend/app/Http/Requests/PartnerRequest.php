<?php

namespace App\Http\Requests;

class PartnerRequest extends BaseFormRequest
{
    public function rules(): array
    {
        $isPost = $this->isMethod('post');

        return [
            'company_name' => [$isPost ? 'required' : 'sometimes', 'string', 'max:255'],
            'logo' => [
                $isPost ? 'required' : 'sometimes',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:3072',
            ],
            'website' => ['nullable', 'url', 'max:255'],
        ];
    }
}
