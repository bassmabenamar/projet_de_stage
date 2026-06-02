<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'parent_id',
        'filiere_id',
        'classe_id',
        'user_id',
        'is_private'
    ];

    /*
    |------------------------------------
    | Relationships
    |------------------------------------
    */

    // Folder → Files
    public function files()
    {
        return $this->hasMany(ResourceFile::class, 'folder_id');
    }

    // Folder → Subfolders
    public function children()
    {
        return $this->hasMany(Folder::class, 'parent_id');
    }

    // Folder → Parent folder
    public function parent()
    {
        return $this->belongsTo(Folder::class, 'parent_id');
    }

    // Folder → Filiere
    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    // Folder → Classe
    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }

    // Folder → User (teacher)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}