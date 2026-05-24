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
        $table->string('nom');
        $table->integer('capacite');
        $table->string('anneeScolaire');
        $table->foreignId('niveau_scolaire_id')->constrained('niveaux_scolaires');
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
