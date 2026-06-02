<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Examen extends Model {
    use HasFactory;
    protected $fillable = ['date', 'duree', 'type', 'matiere_id'];

    public function matiere() {
        return $this->belongsTo(Matiere::class);
    }
}
