<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Remarque extends Model
{
    use HasFactory;

    protected $table = 'remarques';

    protected $fillable = [
        'etudiant',
        'classe',
        'enseignant',
        'type',
        'priorite',
        'date',
        'description',
        'suivi',
        'statut',
    ];

    protected $casts = [
        'date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function scopeSearch($query, $term)
    {
        return $query->where('etudiant', 'like', "%{$term}%")
                     ->orWhere('classe', 'like', "%{$term}%")
                     ->orWhere('enseignant', 'like', "%{$term}%")
                     ->orWhere('type', 'like', "%{$term}%");
    }

    public function scopeByStatut($query, $statut)
    {
        return $query->where('statut', $statut);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }
}