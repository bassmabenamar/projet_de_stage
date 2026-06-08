<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Niveau extends Model
{
    protected $table = 'niveau_scolaires';

    protected $fillable = [
        'nom_niveau',
        'code',
        'abreviation',
        'cycle',
        'ordre',
        'capacite',
        'nombre_etudiants',
        'description',
        'statut',
        'frais_scolarite',
        'frais_transport',
        'frais_cantine',
    ];

    protected $casts = [
        'frais_scolarite'  => 'float',
        'frais_transport'  => 'float',
        'frais_cantine'    => 'float',
        'capacite'         => 'integer',
        'nombre_etudiants' => 'integer',
        'ordre'            => 'integer',
    ];
}