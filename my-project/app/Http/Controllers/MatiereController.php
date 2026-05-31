<?php

namespace App\Http\Controllers;

use App\Models\Matiere;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class MatiereController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Matiere::query();
        
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }
        
        $matieres = $query->orderBy('nom')->get();
        
        return response()->json($matieres);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'code' => 'required|string|unique:matieres,code|max:50',
            'enseignant' => 'required|string|max:255',
            'heures' => 'required|integer|min:1|max:40',
            'couleur' => 'nullable|string|max:7',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $matiere = Matiere::create($request->all());

        return response()->json([
            'message' => 'Matière créée avec succès',
            'matiere' => $matiere
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $matiere = Matiere::find($id);
        
        if (!$matiere) {
            return response()->json([
                'message' => 'Matière non trouvée'
            ], 404);
        }

        return response()->json($matiere);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $matiere = Matiere::find($id);
        
        if (!$matiere) {
            return response()->json([
                'message' => 'Matière non trouvée'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('matieres', 'code')->ignore($matiere->id)
            ],
            'enseignant' => 'required|string|max:255',
            'heures' => 'required|integer|min:1|max:40',
            'couleur' => 'nullable|string|max:7',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $matiere->update($request->all());

        return response()->json([
            'message' => 'Matière mise à jour avec succès',
            'matiere' => $matiere
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $matiere = Matiere::find($id);
        
        if (!$matiere) {
            return response()->json([
                'message' => 'Matière non trouvée'
            ], 404);
        }

        $matiere->delete();

        return response()->json([
            'message' => 'Matière supprimée avec succès'
        ]);
    }

    public function stats(): JsonResponse
    {
        $stats = [
            'total' => Matiere::count(),
            'total_heures' => Matiere::sum('heures'),
            'moyenne_heures' => Matiere::avg('heures'),
        ];

        return response()->json($stats);
    }
}