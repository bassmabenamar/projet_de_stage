<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
use App\Models\User;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $teacher = User::first();

        if (!$teacher) {
            return;
        }

        Task::insert([
            [
                'teacher_id' => $teacher->id,
                'titre' => 'Corriger les devoirs de Mathématiques',
                'description' => 'Exercices sur les équations différentielles',
                'priorite' => 'haute',
                'statut' => 'en_attente',
                'categorie' => 'correction',
                'date_limite' => now()->addDays(2)->toDateString(),
                'heure_limite' => '18:00:00',
                'rappel' => true,
                'temps_rappel' => 30,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'teacher_id' => $teacher->id,
                'titre' => 'Préparer le cours de Physique',
                'description' => 'Chapitre mécanique quantique',
                'priorite' => 'moyenne',
                'statut' => 'en_cours',
                'categorie' => 'preparation',
                'date_limite' => now()->addDays(3)->toDateString(),
                'heure_limite' => '14:00:00',
                'rappel' => false,
                'temps_rappel' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'teacher_id' => $teacher->id,
                'titre' => 'Réunion des professeurs',
                'description' => 'Salle de conférence A',
                'priorite' => 'haute',
                'statut' => 'en_attente',
                'categorie' => 'reunion',
                'date_limite' => now()->addDay()->toDateString(),
                'heure_limite' => '15:00:00',
                'rappel' => true,
                'temps_rappel' => 60,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'teacher_id' => $teacher->id,
                'titre' => 'Mettre à jour les notes',
                'description' => 'Saisie des notes du dernier examen',
                'priorite' => 'basse',
                'statut' => 'terminee',
                'categorie' => 'enseignement',
                'date_limite' => now()->subDay()->toDateString(),
                'heure_limite' => '12:00:00',
                'rappel' => false,
                'temps_rappel' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}