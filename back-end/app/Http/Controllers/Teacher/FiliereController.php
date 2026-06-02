<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Classe;
use App\Models\Filiere;

class FiliereController extends Controller
{
    public function index()
    {
        return response()->json(
            Filiere::all()
        );
    }

    // GET /teacher/filieres/{id}/classes
    public function classes($id)
    {
        $classes = Classe::where('filiere_id', $id)->get();

        return response()->json([
            'data' => $classes
        ]);
    }
}