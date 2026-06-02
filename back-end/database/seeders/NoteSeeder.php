<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Note;

class NoteSeeder extends Seeder
{
    public function run(): void
    {
        Note::create([
            'etudiant_id' => 1,
            'matiere_id' => 1,
            'enseignant_id' => 2,
            'valeur' => 15,
            'type' => 'quiz'
        ]);

        Note::create([
            'etudiant_id' => 2,
            'matiere_id' => 1,
            'enseignant_id' => 2,
            'valeur' => 18,
            'type' => 'exam'
        ]);
    }
}