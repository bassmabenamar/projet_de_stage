<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devoir extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'classe_id',
        'enseignant_id',
        'date_limite',
        'attachment',
        'status',
    ];

    protected $casts = [
        'date_limite' => 'datetime',
    ];

    // RELATION : classe
    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }

    // RELATION : enseignant
    public function enseignant()
    {
        return $this->belongsTo(Enseignant::class);
    }
}