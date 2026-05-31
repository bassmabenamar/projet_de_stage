<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $fillable = [
        'prenom', 'nom', 'email', 'password', 'phone', 'adresse', 'genre',
        'profile_image', 'role', 'classe_id', 'filiere_id', 'niveau_scolaire_id',
        'transport_id', 'date_naissance', 'date_inscription', 'specialite',
        'salaire', 'date_embauche', 'biographie', 'status'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'date_naissance' => 'date',
        'date_inscription' => 'date',
        'date_embauche' => 'date',
        'salaire' => 'decimal:2',
    ];

    // JWT Methods
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    // Relationships
    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    public function niveauScolaire()
    {
        return $this->belongsTo(Level::class, 'niveau_scolaire_id');
    }

    public function transport()
    {
        return $this->belongsTo(Transport::class);
    }

    // Accessors
    public function getFullNameAttribute()
    {
        return "{$this->prenom} {$this->nom}";
    }

    public function getFullNameReverseAttribute()
    {
        return "{$this->nom} {$this->prenom}";
    }

    // Helper methods
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isFormateur()
    {
        return $this->role === 'formateur';
    }

    public function isEtudiant()
    {
        return $this->role === 'etudiant';
    }

    public function isActive()
    {
        return $this->status === 'actif';
    }
    public function paiements()
{
    return $this->hasMany(Paiement::class);
}
    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'actif');
    }

    public function scopeByRole($query, $role)
    {
        return $query->where('role', $role);
    }

    public function scopeByNiveau($query, $niveauId)
    {
        return $query->where('niveau_scolaire_id', $niveauId);
    }
        public function conversations(): BelongsToMany
    {
        return $this->belongsToMany(
            Conversation::class,
            'conversation_participants',
            'user_id',
            'conversation_id'
        )->withPivot('last_read_at')->withTimestamps();
    }
 
    /**
     * الرسائل التي أرسلها المستخدم
     */
    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'sender_id');
    }
}