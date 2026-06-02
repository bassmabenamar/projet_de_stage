<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Etudiant extends Model {
    use HasFactory;
    protected $fillable = ['user_id', 'dateNaissance', 'genre', 'dateInscription', 'statut', 'classe_id'];

    public function user() { return $this->belongsTo(User::class); }
    public function classe() { return $this->belongsTo(Classe::class); }
    public function notes() { return $this->hasMany(Note::class); }
    public function presences() { return $this->hasMany(Presence::class); }
    public function paiements() { return $this->hasMany(Paiement::class); }
}
