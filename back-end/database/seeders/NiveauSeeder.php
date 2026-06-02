<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Niveau;

class NiveauSeeder extends Seeder
{
    public function run(): void
    {
        Niveau::create([
            'nom' => 'Primaire'
        ]);

        Niveau::create([
            'nom' => 'Collège'
        ]);

        Niveau::create([
            'nom' => 'Lycée'
        ]);

       
    }
}