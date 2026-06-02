<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function enseignant()
    {
        return $this->hasOne(Enseignant::class);
    }

    public function etudiant()
    {
        return $this->hasOne(Etudiant::class);
    }
    public function tasks()
{
    return $this->hasMany(Task::class, 'teacher_id');
}
}