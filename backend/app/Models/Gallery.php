<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Gallery extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'gallery'; // Override singular to match database table 'gallery'

    protected $fillable = [
        'title',
        'image',
        'category',
    ];
}
