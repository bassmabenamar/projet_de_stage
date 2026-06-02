<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Enseignant;
use Illuminate\Support\Facades\Hash;

class EnseignantSeeder extends Seeder
{
    public function run(): void
    {
        // Teacher 1
        $user1 = User::create([
            'name' => 'Professeur Math',
            'email' => 'math@school.com',
            'password' => Hash::make('password'),
        ]);

        Enseignant::create([
            'user_id' => $user1->id,
            'specialite' => 'Mathématiques',
            'telephone' => '0600000001',
        ]);

        // Teacher 2
        $user2 = User::create([
            'name' => 'Professeur Physique',
            'email' => 'physics@school.com',
            'password' => Hash::make('password'),
        ]);

        Enseignant::create([
            'user_id' => $user2->id,
            'specialite' => 'Physique',
            'telephone' => '0600000002',
        ]);

        // Teacher 3
        $user3 = User::create([
            'name' => 'Professeur Informatique',
            'email' => 'info@school.com',
            'password' => Hash::make('password'),
        ]);

        Enseignant::create([
            'user_id' => $user3->id,
            'specialite' => 'Informatique',
            'telephone' => '0600000003',
        ]);
    }
}