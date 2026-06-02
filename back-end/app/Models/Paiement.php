<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Paiement extends Model {
    use HasFactory;
    protected $fillable = ['etudiant_id', 'montant', 'datePaiement', 'mois', 'ModePaiement', 'statut', 'type'];

    public function etudiant() {
        return $this->belongsTo(Etudiant::class);
    }
}
