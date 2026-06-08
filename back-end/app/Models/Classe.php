<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'capacite',
        'anneeScolaire',
        'niveau_scolaire_id',
        'filiere_id',
        'salle_id',
    ];

    public function niveauScolaire()
    {
        return $this->belongsTo(NiveauScolaire::class, 'niveau_scolaire_id');
    }

    public function filiere()
    {
        return $this->belongsTo(Filiere::class, 'filiere_id');
    }

    public function salle()
    {
        return $this->belongsTo(Salle::class, 'salle_id');
    }

    public function etudiants()
    {
        return $this->hasMany(User::class, 'classe_id')->where('role', 'etudiant');
    }

    public function formateurs()
    {
        return $this->belongsToMany(User::class, 'classe_formateur', 'classe_id', 'formateur_id');
    }
}