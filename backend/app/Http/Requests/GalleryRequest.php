<?php

namespace App\Http\Requests;

class GalleryRequest extends BaseFormRequest
{
    public function rules(): array
    {
        $isPost = $this->isMethod('post');

        return [
            'title' => [$isPost ? 'required' : 'sometimes', 'string', 'max:255'],
            'image' => [
                $isPost ? 'required' : 'sometimes',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:10240',
            ],
            'category' => ['nullable', 'string', 'max:100'],
        ];
    }
}
