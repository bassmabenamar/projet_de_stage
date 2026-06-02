<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Filiere;

class FiliereSeeder extends Seeder
{
    public function run(): void
    {
        // Lycée
        Filiere::create([
            'nom' => 'Sciences Math',
            'description' => 'Filière Sciences Mathématiques',
            'niveau_id' => 3
        ]);

        Filiere::create([
            'nom' => 'Sciences Physiques',
            'description' => 'Filière Sciences Physiques',
            'niveau_id' => 3
        ]);

        Filiere::create([
            'nom' => 'SVT',
            'description' => 'Sciences de la Vie et de la Terre',
            'niveau_id' => 3
        ]);

        Filiere::create([
            'nom' => 'Économie',
            'description' => 'Sciences Économiques',
            'niveau_id' => 3
        ]);

        
    }
}