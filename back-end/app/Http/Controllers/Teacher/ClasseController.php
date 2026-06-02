<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Classe;

class ClasseController extends Controller
{
    public function index()
    {
        $classes = Classe::withCount('etudiants')->get();

        return response()->json(
            $classes->map(function ($classe) {
                return [
                    'id' => $classe->id,
                    'name' => $classe->nom,
                    'subject' => $classe->filiere->nom ?? 'Non définie',
                    'students_count' => $classe->etudiants_count,
                    'schedule' => 'Non défini',
                    'room' => 'Salle non définie',
                    'image' => null,
                    'is_active' => true,
                ];
            })
        );
    }
    public function stats()
{
    $classes = Classe::withCount('etudiants')->get();

    return response()->json([
        'totalClasses' => $classes->count(),
        'totalStudents' => $classes->sum('etudiants_count'),
        'pendingTasks' => 8,
        'ranking' => '#4'
    ]);
}

    public function byFiliere($id)
    {
        return response()->json(
            Classe::where('filiere_id', $id)->get()
        );
    }
}