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
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->string('nom_classe');
            $table->unsignedInteger('capacite');
            $table->foreignId('niveau_scolaire_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('filiere_id')->nullable()->constrained()->nullOnDelete();
            $table->string('annee_scolaire');
            $table->foreignId('salle_id')->unique()->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};
