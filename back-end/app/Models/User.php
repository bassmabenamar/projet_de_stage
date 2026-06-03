<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\Classe;
use App\Models\Transport;
use App\Models\Filiere;
use App\Models\NiveauScolaire;
use App\Models\Emploi;


class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'role',
        'phone',
        'adresse',
        'genre',
        'status',
        'profile_image',
        'biographie',

        // Etudiant
        'classe_id',
        'transport_id',
        'filiere_id',
        'niveau_scolaire_id',
        'date_naissance',
        'date_inscription',


        // Formateur
        'specialite',
        'salaire',
        'date_embauche',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

     protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function classe()
    {
        return $this->belongsTo(Classe::class, 'classe_id');
    }

    public function transport()
    {
        return $this->belongsTo(Transport::class, 'transport_id');
    }

    public function filiere()
    {
        return $this->belongsTo(Filiere::class, 'filiere_id');
    }

    public function niveauScolaire()
    {
        return $this->belongsTo(NiveauScolaire::class, 'niveau_scolaire_id');
    }
    public function classesFormateur()
    {
        return $this->belongsToMany(Classe::class, 'class_formateur', 'formateur_id', 'classe_id');
    }
    public function emplois()
    {
        return $this->hasMany(Emploi::class);
    }
}
