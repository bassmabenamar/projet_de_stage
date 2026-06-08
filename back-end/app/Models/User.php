<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'role',
        'phone',
        'adresse',
        'photo',
        'genre',
        'date_naissance',
        'date_inscription',
        'status',
        'classe_id',
        'filiere_id',
        'niveau_scolaire_id',
        'transport_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    // ── Relationships ─────────────────────────────────────────────────────────

    public function classe()
    {
        return $this->belongsTo(Classe::class, 'classe_id');
    }

    public function filiere()
    {
        return $this->belongsTo(Filiere::class, 'filiere_id');
    }

    public function niveauScolaire()
    {
        return $this->belongsTo(NiveauScolaire::class, 'niveau_scolaire_id');
    }

    public function transport()
    {
        return $this->belongsTo(Transport::class, 'transport_id');
    }

    // For formateurs: classes they teach (many-to-many)
    public function classesFormateur()
    {
        return $this->belongsToMany(Classe::class, 'classe_formateur', 'formateur_id', 'classe_id');
    }

    // ── Chat ──────────────────────────────────────────────────────────────────

    public function conversationsAsUserOne()
    {
        return $this->hasMany(Conversation::class, 'user_one_id');
    }

    public function conversationsAsUserTwo()
    {
        return $this->hasMany(Conversation::class, 'user_two_id');
    }

    public function conversations()
    {
        return $this->conversationsAsUserOne->merge($this->conversationsAsUserTwo);
    }

    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }
}