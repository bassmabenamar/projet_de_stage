<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    // GET NOTES BY CLASS
   public function index($classId)
{
    $students = \App\Models\Etudiant::where('classe_id', $classId)
        ->with('user') // important if you use student.user.name in React
        ->get();

    $notes = Note::whereHas('etudiant', function ($q) use ($classId) {
        $q->where('classe_id', $classId);
    })->get()->map(function ($n) {
        return [
            'student_id' => $n->etudiant_id,
            'note_type' => $n->type,
            'value' => $n->valeur,
        ];
    });

    return response()->json([
        'students' => $students,
        'notes' => $notes,
    ]);
}

    // CREATE / UPDATE NOTE
    public function store(Request $request)
    {
        $request->validate([
            'etudiant_id' => 'required',
            'matiere_id' => 'required',
            'enseignant_id' => 'required',
            'type' => 'required|string',
            'value' => 'required|numeric',
        ]);

        $note = Note::updateOrCreate(
            [
                'etudiant_id' => $request->etudiant_id,
                'matiere_id' => $request->matiere_id,
                'type' => $request->type,
            ],
            [
                'enseignant_id' => $request->enseignant_id,
                'valeur' => $request->value,
            ]
        );

        return response()->json([
            'message' => 'Note saved successfully',
            'note' => $note
        ]);
    }

    // UPDATE SINGLE CELL
    public function update(Request $request)
{
    $request->validate([
        'student_id' => 'required',
        'note_type' => 'required',
        'value' => 'nullable|numeric',
    ]);

    $note = Note::updateOrCreate(
        [
            'etudiant_id' => $request->student_id,
            'type' => $request->note_type,
        ],
        [
            'valeur' => $request->value,
        ]
    );

    return response()->json([
        'message' => 'Grade updated',
        'note' => $note
    ]);
}

    // IMPORT EXCEL
    public function import(Request $request, $classId)
    {
        foreach ($request->grades as $g) {
            Note::updateOrCreate(
                [
                    'etudiant_id' => $g['student_id'],
                    'type' => $g['note_type'],
                ],
                [
                    'valeur' => $g['value'],
                ]
            );
        }

        return response()->json([
            'message' => 'Grades imported successfully',
            'imported' => count($request->grades)
        ]);
    }
}