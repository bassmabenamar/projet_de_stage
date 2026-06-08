<?php

namespace App\Http\Controllers;

use App\Models\Remarque;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class RemarqueController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Remarque::query();
        
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }
        
        if ($request->has('statut') && $request->statut) {
            $query->byStatut($request->statut);
        }
        
        if ($request->has('type') && $request->type) {
            $query->byType($request->type);
        }
        
        $remarques = $query->orderBy('created_at', 'desc')->get();
        
        return response()->json($remarques);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'etudiant' => 'required|string|max:255',
            'classe' => 'required|string|max:255',
            'enseignant' => 'required|string|max:255',
            'type' => 'required|in:Comportement,Académique,Assiduité,Tenue,Retard,Violence,Félicitation,Autre',
            'priorite' => 'required|in:faible,normale,haute,urgente',
            'date' => 'required|date',
            'description' => 'required|string',
            'suivi' => 'nullable|string',
            'statut' => 'required|in:ouverte,en_cours,resolue,archivee',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $remarque = Remarque::create($request->all());

        return response()->json([
            'message' => 'Remarque créée avec succès',
            'remarque' => $remarque
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $remarque = Remarque::find($id);
        
        if (!$remarque) {
            return response()->json([
                'message' => 'Remarque non trouvée'
            ], 404);
        }

        return response()->json($remarque);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $remarque = Remarque::find($id);
        
        if (!$remarque) {
            return response()->json([
                'message' => 'Remarque non trouvée'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'etudiant' => 'required|string|max:255',
            'classe' => 'required|string|max:255',
            'enseignant' => 'required|string|max:255',
            'type' => 'required|in:Comportement,Académique,Assiduité,Tenue,Retard,Violence,Félicitation,Autre',
            'priorite' => 'required|in:faible,normale,haute,urgente',
            'date' => 'required|date',
            'description' => 'required|string',
            'suivi' => 'nullable|string',
            'statut' => 'required|in:ouverte,en_cours,resolue,archivee',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $remarque->update($request->all());

        return response()->json([
            'message' => 'Remarque mise à jour avec succès',
            'remarque' => $remarque
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $remarque = Remarque::find($id);
        
        if (!$remarque) {
            return response()->json([
                'message' => 'Remarque non trouvée'
            ], 404);
        }

        $remarque->delete();

        return response()->json([
            'message' => 'Remarque supprimée avec succès'
        ]);
    }

    public function stats(): JsonResponse
    {
        $stats = [
            'total' => Remarque::count(),
            'ouvertes' => Remarque::byStatut('ouverte')->count(),
            'en_cours' => Remarque::byStatut('en_cours')->count(),
            'resolues' => Remarque::byStatut('resolue')->count(),
            'archivees' => Remarque::byStatut('archivee')->count(),
            'par_type' => Remarque::select('type', \DB::raw('count(*) as count'))
                ->groupBy('type')
                ->get(),
        ];

        return response()->json($stats);
    }
}