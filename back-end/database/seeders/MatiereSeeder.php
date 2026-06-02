<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Matiere;
use App\Models\Enseignant;
use App\Models\Classe;

class MatiereSeeder extends Seeder
{
    public function run(): void
    {
        $enseignant = Enseignant::first();
        $classe = Classe::first();

        Matiere::create([
            'nom' => 'Mathématiques',
            'enseignant_id' => $enseignant?->id,
            'classe_id' => $classe?->id,
        ]);

        Matiere::create([
            'nom' => 'Physique',
            'enseignant_id' => $enseignant?->id,
            'classe_id' => $classe?->id,
        ]);

        Matiere::create([
            'nom' => 'Informatique',
            'enseignant_id' => $enseignant?->id,
            'classe_id' => $classe?->id,
        ]);
    }
}