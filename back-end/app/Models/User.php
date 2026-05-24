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
     // ✅ Conversations où l'utilisateur est user_one
    public function conversationsAsUserOne()
    {
        return $this->hasMany(Conversation::class, 'user_one_id');
    }

    // ✅ Conversations où l'utilisateur est user_two
    public function conversationsAsUserTwo()
    {
        return $this->hasMany(Conversation::class, 'user_two_id');
    }

    // ✅ Toutes les conversations de l'utilisateur
    public function conversations()
    {
        return $this->conversationsAsUserOne->merge($this->conversationsAsUserTwo);
    }

    // ✅ Messages envoyés par l'utilisateur
    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }
}

