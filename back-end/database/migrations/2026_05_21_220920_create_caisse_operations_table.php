<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('caisse_operations', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['entree', 'charge']);
            $table->string('description');
            $table->decimal('montant', 10, 2);
            $table->string('categorie')->nullable();
            $table->date('date_operation');
            $table->string('source')->default('manuel'); // manuel | paiement | charge_manuelle
            $table->unsignedBigInteger('source_id')->nullable(); // paiement_id si source=paiement
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('caisse_operations');
    }
};