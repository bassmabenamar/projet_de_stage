<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tutorial extends Model
{
    protected $table = 'tutorials';

    protected $fillable = [
        'title',
        'instructor',
        'duration',
        'views',
        'likes',
        'level',
        'category',
        'year',
        'video_url',
        'thumbnail',
        'description'
    ];

    protected $casts = [
        'views' => 'integer',
        'likes' => 'integer'
    ];
}
