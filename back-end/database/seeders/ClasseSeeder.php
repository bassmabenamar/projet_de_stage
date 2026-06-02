<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Classe;
use App\Models\Filiere;
use App\Models\Niveau;

class ClasseSeeder extends Seeder
{
    public function run(): void
    {
        $lycee = Niveau::where('nom', 'Lycée')->first();
        
        $sm = Filiere::where('nom', 'Sciences Math')->first();
        $sp = Filiere::where('nom', 'Sciences Physiques')->first();
        $svt = Filiere::where('nom', 'SVT')->first();
        $eco = Filiere::where('nom', 'Économie')->first();
        $info = Filiere::where('nom', 'Informatique')->first();
        $gestion = Filiere::where('nom', 'Gestion')->first();

        Classe::create([
            'nom' => 'SM A 1',
            'niveau_id' => $lycee->id,
            'filiere_id' => $sm->id
        ]);

        Classe::create([
            'nom' => 'SM A 2',
            'niveau_id' => $lycee->id,
            'filiere_id' => $sm->id
        ]);

        Classe::create([
            'nom' => 'SP 1',
            'niveau_id' => $lycee->id,
            'filiere_id' => $sp->id
        ]);

        Classe::create([
            'nom' => 'SVT 1',
            'niveau_id' => $lycee->id,
            'filiere_id' => $svt->id
        ]);

        Classe::create([
            'nom' => 'Eco 1',
            'niveau_id' => $lycee->id,
            'filiere_id' => $eco->id
        ]);

        
    }
}