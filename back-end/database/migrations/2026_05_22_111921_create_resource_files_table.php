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
        Schema::create('resource_files', function (Blueprint $table) {
    $table->id();
    $table->string('titre');
    $table->string('type'); // pdf, video, link
    $table->string('file_path')->nullable();
    $table->text('lien')->nullable();
    $table->string('taille')->nullable();

    $table->foreignId('folder_id')->nullable()->constrained('folders')->onDelete('cascade');
    $table->foreignId('filiere_id')->nullable()->constrained()->onDelete('set null');
    $table->foreignId('classe_id')->nullable()->constrained()->onDelete('set null');
    $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resource_files');
    }
};
