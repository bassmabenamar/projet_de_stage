<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $table = 'announcements';

    protected $fillable = [
        'titre',
        'contenu',
        'enseignant_id',

        // Communication
        'type',
        'priorite',
        'type_destinataire',

        // Destinataires
        'niveau_id',
        'classe_id',
        'etudiant_id',

        // Informations pédagogiques
        'matiere',

        // Devoir
        'date_limite',

        // Examen
        'date_examen',
        'heure_debut',
        'heure_fin',
        'salle',
        'coefficient',

        // Évaluation
        'note_maximale',

        // Fichier joint
        'piece_jointe',

        // Lecture
        'est_lu',
    ];

    protected $casts = [
        'date_limite' => 'date',
        'date_examen' => 'date',
        'heure_debut' => 'datetime:H:i',
        'heure_fin' => 'datetime:H:i',
        'est_lu' => 'boolean',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relations
    |--------------------------------------------------------------------------
    */

    public function enseignant()
    {
        return $this->belongsTo(Enseignant::class);
    }

    public function niveau()
    {
        return $this->belongsTo(Niveau::class);
    }

    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }
}