<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transport extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'transports';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom_transport',
        'code',
        'type',
        'immatriculation',
        'capacite',
        'chauffeur_nom',
        'chauffeur_telephone',
        'chauffeur_permis',
        'responsable_nom',
        'responsable_telephone',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'capacite' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the formatted created at date.
     */
    public function getCreatedAtFormattedAttribute()
    {
        return $this->created_at->format('d/m/Y H:i');
    }

    /**
     * Scope a query to only include available transports.
     */
    public function scopeSearch($query, $term)
    {
        return $query->where('nom_transport', 'like', "%{$term}%")
                     ->orWhere('code', 'like', "%{$term}%")
                     ->orWhere('type', 'like', "%{$term}%")
                     ->orWhere('immatriculation', 'like', "%{$term}%")
                     ->orWhere('chauffeur_nom', 'like', "%{$term}%")
                     ->orWhere('responsable_nom', 'like', "%{$term}%");
    }
}