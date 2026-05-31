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
        Schema::create('transports', function (Blueprint $table) {
            $table->id();
            $table->string('nom_transport');
            $table->string('code')->unique();
            $table->string('type');
            $table->string('immatriculation')->unique();
            $table->integer('capacite');

            $table->string('chauffeur_nom');
            $table->string('chauffeur_telephone');  // ← CORRIGÉ: string au lieu de time
            $table->string('chauffeur_permis')->nullable();  // ← CORRIGÉ: string au lieu de time

            $table->string('responsable_nom');
            $table->string('responsable_telephone');  // ← CORRIGÉ: string au lieu de time
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transports');
    }
};