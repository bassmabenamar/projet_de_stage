<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $table = 'books';

    protected $fillable = [
        'title',
        'author',
        'file_path',
        'file_name',
        'type',
        'pages',
        'year',
        'description',
        'rating',
        'downloads',
        'views',
        'category',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'id' => 'integer',
        'pages' => 'integer',
        'downloads' => 'integer',
        'views' => 'integer',
        'rating' => 'decimal:1',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    // Accesseur pour obtenir l'URL complète du fichier
    public function getFileUrlAttribute()
    {
        if ($this->file_path) {
            return asset($this->file_path);
        }
        return null;
    }

    // Accesseur pour obtenir l'extension du fichier
    public function getFileExtensionAttribute()
    {
        return pathinfo($this->file_name, PATHINFO_EXTENSION);
    }

    // Scope pour les livres populaires
    public function scopePopular($query)
    {
        return $query->orderBy('downloads', 'desc');
    }

    // Scope pour les nouveautés
    public function scopeNewest($query)
    {
        return $query->orderBy('year', 'desc');
    }

    // Scope par catégorie
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}
