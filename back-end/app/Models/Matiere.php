<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Emploi;

class Matiere extends Model
{
    use HasFactory;
    public function emplois()
    {
        return $this->hasMany(Emploi::class);
    }
}
