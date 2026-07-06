<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Testimonial extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'customer_name',
        'company',
        'position',
        'photo',
        'testimonial',
        'rating',
    ];

    protected $casts = [
        'rating' => 'integer',
    ];
}
