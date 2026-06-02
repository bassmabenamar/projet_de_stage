<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            EnseignantSeeder::class,

            NiveauSeeder::class,
            FiliereSeeder::class,
            ClasseSeeder::class,

            MatiereSeeder::class,
            EtudiantSeeder::class,
            NoteSeeder::class,
            TaskSeeder::class,
        ]);
    }
}