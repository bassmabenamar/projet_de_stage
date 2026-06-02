<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Matiere extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'enseignant_id',
        'classe_id',
    ];

    // relation: Matiere belongs to Enseignant
    public function enseignant()
    {
        return $this->belongsTo(Enseignant::class);
    }

    // relation: Matiere belongs to Classe
    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }
}