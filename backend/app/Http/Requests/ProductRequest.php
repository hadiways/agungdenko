<?php

namespace App\Http\Requests;

class ProductRequest extends BaseFormRequest
{
    public function rules(): array
    {
        $isPost = $this->isMethod('post');

        return [
            'name' => [$isPost ? 'required' : 'sometimes', 'string', 'max:255'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'short_description' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'specification' => ['nullable', 'string'],
            'thumbnail' => [
                $isPost ? 'nullable' : 'sometimes',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120', // 5MB limit
            ],
            'images' => ['nullable', 'array'],
            'images.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:10240'], // 10MB limit per image
            'price' => ['nullable', 'numeric', 'min:0'],
            'status' => ['nullable', 'string', 'in:active,inactive,draft'],
            'featured' => ['nullable', 'boolean'],
        ];
    }
}
