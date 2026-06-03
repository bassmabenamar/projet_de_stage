<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Classe;
use App\Models\Emploi;
use App\Models\Salle;
use App\Models\Matiere;

class Emploi extends Model
{
    use HasFactory;

    protected $fillable = [
        'classe_id',
        'salle_id',
        'user_id',
        'matiere_id',
        'jour',
        'heure_debut',
        'heure_fin'
    ];

    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }

    public function salle()
    {
        return $this->belongsTo(Salle::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function matiere()
    {
        return $this->belongsTo(Matiere::class);
    }
}
