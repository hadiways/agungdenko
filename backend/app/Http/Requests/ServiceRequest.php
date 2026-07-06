<?php

namespace App\Http\Requests;

class ServiceRequest extends BaseFormRequest
{
    public function rules(): array
    {
        $isPost = $this->isMethod('post');

        return [
            'title' => [$isPost ? 'required' : 'sometimes', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:100'],
            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],
            'description' => ['nullable', 'string'],
        ];
    }
}
