<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CaisseOperation extends Model
{
    protected $fillable = [
        'type',
        'description',
        'montant',
        'categorie',
        'date_operation',
        'source',
        'source_id',
    ];

    protected $casts = [
        'date_operation' => 'date',
        'montant'        => 'float',
    ];
}