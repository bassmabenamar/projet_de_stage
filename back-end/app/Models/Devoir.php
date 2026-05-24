<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Devoir extends Model {
    use HasFactory;
    protected $fillable = ['titre', 'DateDev', 'matiere_id','pdf_path',"pdf_filename"];

    public function matiere() {
        return $this->belongsTo(Matiere::class);
    }
}
