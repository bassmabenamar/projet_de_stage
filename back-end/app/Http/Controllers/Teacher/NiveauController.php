<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Niveau;
use App\Models\Classe;

class NiveauController extends Controller
{
    // GET /teacher/niveaux
    public function index()
    {
        $niveaux = Niveau::with('filieres')->get();

        return response()->json([
            'data' => $niveaux
        ]);
    }

    // GET /teacher/niveaux/{id}/classes
    public function classes($id)
    {
        $classes = Classe::where('niveau_id', $id)->get();

        return response()->json([
            'data' => $classes
        ]);
    }
}