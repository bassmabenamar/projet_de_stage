<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Etudiant;
use App\Models\Classe;
use Illuminate\Support\Facades\Hash;

class EtudiantSeeder extends Seeder
{
    public function run(): void
    {
        $classe = Classe::first();

        // Student 1
        $user1 = User::create([
            'name' => 'Student One',
            'email' => 'student1@school.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        Etudiant::create([
            'user_id' => $user1->id,
            'classe_id' => $classe?->id,
            'telephone' => '0600000001',
            'date_naissance' => '2005-01-10',
        ]);

        // Student 2
        $user2 = User::create([
            'name' => 'Student Two',
            'email' => 'student2@school.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        Etudiant::create([
            'user_id' => $user2->id,
            'classe_id' => $classe?->id,
            'telephone' => '0600000002',
            'date_naissance' => '2006-03-15',
        ]);

        // Student 3
        $user3 = User::create([
            'name' => 'Student Three',
            'email' => 'student3@school.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        Etudiant::create([
            'user_id' => $user3->id,
            'classe_id' => $classe?->id,
            'telephone' => '0600000003',
            'date_naissance' => '2005-07-22',
        ]);
    }
}