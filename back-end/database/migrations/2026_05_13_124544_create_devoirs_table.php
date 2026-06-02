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
        Schema::create('devoirs', function (Blueprint $table) {
        $table->id();
        $table->string('titre');
        $table->date('DateDev'); // DateDevoir
        $table->foreignId('matiere_id')->constrained();
        $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devoirs');
    }
};
