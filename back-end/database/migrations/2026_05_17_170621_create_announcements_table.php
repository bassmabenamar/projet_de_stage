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
    Schema::create('announcements', function (Blueprint $table) {

        $table->id();

        $table->string('titre');

        $table->text('contenu');

        $table->foreignId('enseignant_id')
              ->constrained()
              ->cascadeOnDelete();
              Schema::table('annonces', function (Blueprint $table) {

    // Type de notification
    $table->string('type')->default('Annonce');

    // Niveau de priorité
    $table->string('priorite')->default('Normale');

    // Type de destinataire
    $table->string('type_destinataire')->default('tous');

    // Ciblage
    $table->foreignId('niveau_id')
        ->nullable()
        ->constrained('niveaux')
        ->nullOnDelete();

    $table->foreignId('classe_id')
        ->nullable()
        ->constrained('classes')
        ->nullOnDelete();

    $table->unsignedBigInteger('etudiant_id')
        ->nullable();

    // Informations pédagogiques
    $table->string('matiere')->nullable();

    // Devoir
    $table->date('date_limite')->nullable();

    // Examen
    $table->date('date_examen')->nullable();

    $table->time('heure_debut')->nullable();

    $table->time('heure_fin')->nullable();

    $table->string('salle')->nullable();

    $table->integer('coefficient')->nullable();

    $table->integer('note_maximale')->nullable();

    // Pièce jointe
    $table->string('piece_jointe')->nullable();

    // Statut de lecture
    $table->boolean('est_lu')->default(false);
});

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
