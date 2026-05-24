<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Classe;

class Salle extends Model
{
    use HasFactory;

    public function classe(){
        return $this->hasOne(Classe::class);
    }
}
