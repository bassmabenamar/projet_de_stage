<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $fillable = [
        'user_one_id',
        'user_two_id',
        'last_message',
        'last_message_time',
        'user_one_unread',
        'user_two_unread'
    ];

    protected $casts = [
        'last_message_time' => 'datetime',
    ];

    // Relation avec l'utilisateur 1
    public function userOne()
    {
        return $this->belongsTo(User::class, 'user_one_id');
    }

    // Relation avec l'utilisateur 2
    public function userTwo()
    {
        return $this->belongsTo(User::class, 'user_two_id');
    }

    // Messages de la conversation
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    // Récupérer l'autre utilisateur
    public function getOtherUser($userId)
    {
        return $this->user_one_id == $userId ? $this->userTwo : $this->userOne;
    }
}
