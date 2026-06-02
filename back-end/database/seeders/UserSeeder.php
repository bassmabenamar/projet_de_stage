<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'name' => 'Admin School',
            'email' => 'admin@school.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Teacher
        User::create([
            'name' => 'Teacher One',
            'email' => 'teacher@school.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
        ]);

        // Student
        User::create([
            'name' => 'Student One',
            'email' => 'student@school.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        // Parent
        User::create([
            'name' => 'Parent One',
            'email' => 'parent@school.com',
            'password' => Hash::make('password'),
            'role' => 'parent',
        ]);
    }
}