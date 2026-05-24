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
        Schema::create('niveau_scolaires', function (Blueprint $table) {
            $table->id();
            $table->string('nom_niveau');
            $table->string('code')->unique();
            $table->string('abreviation');
            $table->enum('cycle', ['primaire','college','lycee']);
            $table->integer('ordre')->default(1);
            $table->integer('capacite')->nullable();
            $table->integer('nombre_etudiants')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('niveau_scolaires');
    }
};
