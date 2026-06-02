<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
    'titre',
    'description',
    'priorite',
    'categorie',
    'statut',
    'date_limite',
    'heure_limite',
    'rappel',
    'temps_rappel',
    'teacher_id',
];
    

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}