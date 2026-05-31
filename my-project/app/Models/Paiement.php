<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'montant',
        'montant_paye',
        'statut',
        'methode',
        'reference',
        'date_paiement',
        'date_echeance',
        'notes',
    ];

    protected $casts = [
        'date_paiement' => 'date',
        'date_echeance' => 'date',
        'montant'       => 'decimal:2',
        'montant_paye'  => 'decimal:2',
    ];

    // Relation: paiement -> etudiant
    public function etudiant()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}