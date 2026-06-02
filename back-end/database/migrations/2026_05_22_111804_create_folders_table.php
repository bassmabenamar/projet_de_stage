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
       
           Schema::create('folders', function (Blueprint $table) {
    $table->id();
    $table->string('nom');
    $table->foreignId('parent_id')->nullable()->constrained('folders')->onDelete('cascade');
    $table->foreignId('filiere_id')->nullable()->constrained()->onDelete('set null');
    $table->foreignId('classe_id')->nullable()->constrained()->onDelete('set null');
    $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
    $table->boolean('is_private')->default(false);
    $table->timestamps();
});
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('folders');
    }
};
