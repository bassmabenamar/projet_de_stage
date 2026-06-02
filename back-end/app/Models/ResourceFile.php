<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Folder;

class ResourceFile extends Model
{
    use HasFactory;
   
    protected $fillable = [
        'titre',
        'type',
        'file_path',
        'lien',
        'taille',
        'folder_id',
        'filiere_id',
        'classe_id',
        'user_id'
    ];

    public function folder()
    {
        return $this->belongsTo(Folder::class);
    }

}
