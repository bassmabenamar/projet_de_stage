<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enseignant extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'specialite',
        'telephone'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function classes()
    {
        return $this->hasMany(Classe::class);
    }

    public function matieres()
    {
        return $this->hasMany(Matiere::class);
    }
    public function devoirs()
{
    return $this->hasMany(Devoir::class);
}
}