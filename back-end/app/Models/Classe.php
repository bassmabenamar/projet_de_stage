<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Classe extends Model {
    use HasFactory;
    protected $fillable = ['nom', 'capacite', 'anneeScolaire', 'niveau_scolaire_id'];

    public function niveauScolaire() { return $this->belongsTo(NiveauScolaire::class); }
    public function etudiants() { return $this->hasMany(Etudiant::class); }
}
