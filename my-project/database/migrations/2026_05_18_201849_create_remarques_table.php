<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('remarques', function (Blueprint $table) {
            $table->id();
            $table->string('etudiant');
            $table->string('classe');
            $table->string('enseignant');
            $table->enum('type', ['Comportement', 'Académique', 'Assiduité', 'Tenue', 'Retard', 'Violence', 'Félicitation', 'Autre']);
            $table->enum('priorite', ['faible', 'normale', 'haute', 'urgente'])->default('normale');
            $table->date('date');
            $table->text('description');
            $table->text('suivi')->nullable();
            $table->enum('statut', ['ouverte', 'en_cours', 'resolue', 'archivee'])->default('ouverte');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('remarques');
    }
};