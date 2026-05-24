<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Classe;

class NiveauScolaire extends Model
{
    use HasFactory;

    public function users(){
        return $this->hasMany(User::class);
    }
    public function classes(){
        return $this->hasMany(Classe::class);
    }
}
