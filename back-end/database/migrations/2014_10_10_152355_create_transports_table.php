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
            $table->string('immatriculation');
            $table->integer('capacite');

            $table->string('chauffeur_nom');
            $table->time('chauffeur_telephone');
            $table->time('chauffeur_permis');

            $table->string('responsable_nom');
            $table->time('responsable_telephone');
            
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
