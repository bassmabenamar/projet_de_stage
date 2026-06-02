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
       
    Schema::create('tasks', function (Blueprint $table) {
    $table->id();

    $table->foreignId('teacher_id')
        ->constrained('users')
        ->onDelete('cascade');

    $table->string('titre');
    $table->text('description')->nullable();

    $table->enum('priorite', ['basse', 'moyenne', 'haute'])
        ->default('moyenne');

    $table->enum('statut', [
        'en_attente',
        'en_cours',
        'terminee'
    ])->default('en_attente');

    $table->enum('categorie', [
        'enseignement',
        'correction',
        'preparation',
        'reunion'
    ])->default('enseignement');

    $table->date('date_limite')->nullable();
    $table->time('heure_limite')->nullable();

    $table->boolean('rappel')->default(false);
    $table->integer('temps_rappel')->nullable();

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
