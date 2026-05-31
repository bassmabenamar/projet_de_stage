<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matiere extends Model
{
    use HasFactory;

    protected $table = 'matieres';

    protected $fillable = [
        'nom',
        'code',
        'enseignant',
        'heures',
        'couleur',
        'description',
    ];

    protected $casts = [
        'heures' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function scopeSearch($query, $term)
    {
        return $query->where('nom', 'like', "%{$term}%")
                     ->orWhere('code', 'like', "%{$term}%")
                     ->orWhere('enseignant', 'like', "%{$term}%");
    }
}