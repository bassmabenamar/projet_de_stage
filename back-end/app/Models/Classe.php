<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'niveau_id',
        'filiere_id',
        'enseignant_id'
    ];

    public function niveau()
    {
        return $this->belongsTo(Niveau::class);
    }

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    public function etudiants()
    {
        return $this->hasMany(Etudiant::class);
    }
    public function devoirs()
{
    return $this->hasMany(Devoir::class);
}
}