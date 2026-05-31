<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activite extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'activites';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'code',
        'date_debut',
        'date_fin',
        'prix',
        'lieu',
        'description',
        'responsable',
        'heures_hebdomadaires',
        'statut',
        'image',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_debut' => 'date',
        'date_fin' => 'date',
        'prix' => 'decimal:2',
        'heures_hebdomadaires' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the formatted price.
     */
    public function getFormattedPriceAttribute()
    {
        if ($this->prix <= 0) {
            return 'Gratuit';
        }
        return number_format($this->prix, 2) . ' DH';
    }

    /**
     * Get the activity duration in days.
     */
    public function getDurationAttribute()
    {
        if (!$this->date_debut || !$this->date_fin) {
            return null;
        }
        return $this->date_debut->diffInDays($this->date_fin);
    }

    /**
     * Scope a query to only include active activities.
     */
    public function scopeActive($query)
    {
        return $query->where('statut', 'Actif');
    }

    /**
     * Scope a query to only include inactive activities.
     */
    public function scopeInactive($query)
    {
        return $query->where('statut', 'Inactif');
    }

    /**
     * Scope a query to search activities.
     */
    public function scopeSearch($query, $term)
    {
        return $query->where('nom', 'like', "%{$term}%")
                     ->orWhere('code', 'like', "%{$term}%")
                     ->orWhere('lieu', 'like', "%{$term}%")
                     ->orWhere('responsable', 'like', "%{$term}%");
    }

    /**
     * Check if activity is currently active based on dates.
     */
    public function isCurrentlyActive()
    {
        if ($this->statut !== 'Actif') {
            return false;
        }

        $today = now()->startOfDay();
        
        if ($this->date_debut && $this->date_debut > $today) {
            return false;
        }
        
        if ($this->date_fin && $this->date_fin < $today) {
            return false;
        }
        
        return true;
    }
}