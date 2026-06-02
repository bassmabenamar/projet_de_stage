<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('matieres', function (Blueprint $table) {
            $table->id();

            $table->string('nom');

            $table->foreignId('enseignant_id')
                ->nullable()
                ->constrained('enseignants')
                ->onDelete('set null');

            $table->foreignId('classe_id')
                ->nullable()
                ->constrained('classes')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('matieres');
    }
};