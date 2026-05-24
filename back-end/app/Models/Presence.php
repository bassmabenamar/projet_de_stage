<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presence extends Model
{
    use HasFactory;

    protected $fillable = [
        'etudiant_id',
        'date',
        'statut',
        'remarque',
        'heure_entree',  // ✅ AJOUTE CETTE LIGNE
        'heure_sortie' ,
          'is_leave',
        'leave_type',
        'leave_reason',
        'leave_file',
        'leave_status'
    ];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }
}
