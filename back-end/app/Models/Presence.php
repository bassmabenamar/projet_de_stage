<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Presence extends Model
{
    protected $fillable = [
        'etudiant_id',
        'classe_id',
        'date',
        'present',
        'remark',
        'status'
    ];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }
}