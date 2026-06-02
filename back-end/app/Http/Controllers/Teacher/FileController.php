<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ResourceFile;

class FileController extends Controller
{
    public function store(Request $request)
    {
        $filePath = null;

        if ($request->hasFile('fichier')) {
            $filePath = $request->file('fichier')->store('resources', 'public');
        }

        $file = ResourceFile::create([
            'titre' => $request->titre,
            'type' => $request->type,
            'file_path' => $filePath,
            'lien' => $request->lien,
            'folder_id' => $request->dossier_id,
            'filiere_id' => $request->filiere_id,
            'classe_id' => $request->classe_id,
            'user_id' => auth()->id(),
        ]);

        return response()->json($file);
    }

    public function destroy($id)
    {
        ResourceFile::destroy($id);
        return response()->json(['message' => 'deleted']);
    }

    public function root(Request $request)
    {
        return ResourceFile::whereNull('folder_id')->get();
    }
}