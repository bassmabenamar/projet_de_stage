<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('niveaux', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('code')->unique();
            $table->string('abreviation');
            $table->enum('cycle', ['primaire', 'college', 'lycee']);
            $table->unsignedTinyInteger('ordre')->default(1);
            $table->text('description')->nullable();
            $table->enum('statut', ['Actif', 'Inactif'])->default('Actif');
            $table->decimal('frais_scolarite', 10, 2)->default(0);
            $table->decimal('frais_transport', 10, 2)->default(0);
            $table->decimal('frais_cantine', 10, 2)->default(0);
            $table->unsignedInteger('capacite_max')->default(30);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('niveaux');
    }
};