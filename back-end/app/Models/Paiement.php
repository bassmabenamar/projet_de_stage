<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',          // ✅ était 'etudiant_id'
        'type',
        'montant',
        'montant_paye',     // ✅ était absent
        'statut',
        'methode',          // ✅ était 'ModePaiement'
        'reference',        // ✅ était absent
        'date_paiement',    // ✅ était 'datePaiement'
        'date_echeance',    // ✅ était absent
        'notes',            // ✅ était absent
    ];

    // ✅ Cast automatique → plus besoin de Carbon::parse()
    protected $casts = [
        'date_paiement' => 'date',
        'date_echeance' => 'date',
        'montant'       => 'float',
        'montant_paye'  => 'float',
    ];

    // ✅ Relation vers User (les étudiants sont dans la table users)
    public function etudiant()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}