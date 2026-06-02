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
        Schema::create('notes', function (Blueprint $table) {
        $table->id();
        $table->foreignId('etudiant_id')->constrained();
        $table->foreignId('matiere_id')->constrained();
        $table->string('valeur');
        $table->string('semestre');
        $table->string('dateSaisit');
        $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
