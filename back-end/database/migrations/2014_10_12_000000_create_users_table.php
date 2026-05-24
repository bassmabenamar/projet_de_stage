<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            // basic info
            $table->string('prenom');
            $table->string('nom');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('phone')->nullable();
            $table->string('adresse')->nullable();
            $table->string('genre')->nullable();
            $table->string('profile_image')->nullable();

            // role system
            $table->enum('role', ['admin', 'formateur', 'etudiant']);

            // eudiant  (nullable)
            $table->foreignId('classe_id')->nullable()->constrained('classes')->nullOnDelete();
            $table->foreignId('filiere_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('niveau_scolaire_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('transport_id')->nullable()->constrained()->nullOnDelete();
            $table->date('date_naissance')->nullable();
            $table->date('date_inscription')->nullable();

            // formateur (nullable)
            $table->string('specialite')->nullable();
            $table->integer('salaire')->nullable();
            $table->date('date_embauche')->nullable();
            $table->text('biographie')->nullable();

            // status
            $table->enum('status', ['actif', 'inactif'])->default('actif');

            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
