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
        Schema::create('paiements', function (Blueprint $table) {
        $table->id();
        $table->foreignId('etudiant_id')->constrained();
        $table->string('montant');
        $table->string('datePaiement');
        $table->string('mois');
        $table->string('ModePaiement');
        $table->string('statut');
        $table->string('type');
        $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};
