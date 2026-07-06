<?php

namespace App\Http\Requests;

class TestimonialRequest extends BaseFormRequest
{
    public function rules(): array
    {
        $isPost = $this->isMethod('post');

        return [
            'customer_name' => [$isPost ? 'required' : 'sometimes', 'string', 'max:255'],
            'company' => [$isPost ? 'required' : 'sometimes', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:100'],
            'photo' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:3072',
            ],
            'testimonial' => [$isPost ? 'required' : 'sometimes', 'string'],
            'rating' => [$isPost ? 'required' : 'sometimes', 'integer', 'min:1', 'max:5'],
        ];
    }
}
