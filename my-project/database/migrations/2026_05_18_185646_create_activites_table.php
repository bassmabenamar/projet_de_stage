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
        Schema::create('activites', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('code')->unique();
            $table->date('date_debut')->nullable();
            $table->date('date_fin')->nullable();
            $table->decimal('prix', 10, 2)->nullable()->default(0);
            $table->string('lieu');
            $table->text('description')->nullable();
            $table->string('responsable')->nullable();
            $table->integer('heures_hebdomadaires')->default(2);
            $table->enum('statut', ['Actif', 'Inactif'])->default('Actif');
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activites');
    }
};