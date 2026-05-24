<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Salle;
use App\Models\Filiere;
use App\Models\NiveauScolaire;

class Classe extends Model
{
    use HasFactory;

    public function users(){
        return $this->hasMany(User::class);
    }
    public function salle(){
        return $this->belongsTo(Salle::class);
    }
    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }
    public function niveauScolaire()
    {
        return $this->belongsTo(NiveauScolaire::class);
    }
    public function etudiants()
    {
        return $this->hasMany(User::class, 'classe_id')->where('role', 'etudiant');
    }
    public function formateurs()
    {
        return $this->belongsToMany(User::class, 'class_formateur', 'classe_id', 'formateur_id');
    }
}
