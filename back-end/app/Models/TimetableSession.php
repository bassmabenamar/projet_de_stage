<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TimetableSession extends Model
{
    
    protected $table = 'timetable_sessions';

  protected $fillable = [
        'classe_id', 'jour', 'cours', 'professeur_nom',
        'salle_nom', 'color_code', 'heure_debut', 'heure_fin'
    ];
     public function classe()
    {
        return $this->belongsTo(Classe::class, 'classe_id');
    }
}
