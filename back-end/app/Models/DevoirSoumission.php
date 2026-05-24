<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DevoirSoumission extends Model
{
    protected $fillable = ['devoir_id', 'etudiant_id', 'fichier', 'statut'];

    public function devoir()
    {
        return $this->belongsTo(Devoir::class);
    }

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }
}
