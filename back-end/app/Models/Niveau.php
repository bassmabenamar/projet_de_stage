<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Niveau extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom'
    ];

    public function filieres()
    {
        return $this->hasMany(Filiere::class);
    }

    public function classes()
    {
        return $this->hasMany(Classe::class);
    }
}