<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use Illuminate\Http\Request;

class ClasseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $classes = Classe::with(['salle','filiere','niveauScolaire'])->get();
        return response()->json($classes);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "nom_classe" => 'required|string|max:255',
            "capacite" => 'nullable|integer',
            "annee_scolaire" => 'required|string',
            'filiere_id' => 'nullable|exists:filieres,id',
            'niveau_scolaire_id' => 'nullable|exists:niveau_scolaires,id',
            'salle_id' => 'nullable|exists:salles,id',
        ]);
        
        $classe = new Classe();
        $classe->nom_classe = $request->nom_classe;
        $classe->capacite = $request->capacite;
        $classe->annee_scolaire = $request->annee_scolaire;
        $classe->niveau_scolaire_id = $request->niveau_scolaire_id;
        $classe->filiere_id = $request->filiere_id;
        $classe->salle_id = $request->salle_id;
        $classe->save();

        return response()->json([
            'message' => 'classe created successfully',
            'classe'=>$classe->only(['id','nom_classe','capacite','annee_scolaire','niveau_scolaire_id','filiere_id','salle_id'])
        ]); 
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $classe = Classe::with(['salle', 'filiere','niveauScolaire'])->find($id);
        return response()->json($classe);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            "nom_classe" => 'required|string|max:255',
            "capacite" => 'nullable|integer',
            "annee_scolaire" => 'required|string',
            'filiere_id' => 'nullable|exists:filieres,id',
            'niveau_scolaire_id' => 'nullable|exists:niveau_scolaires,id',
            'salle_id' => 'nullable|exists:salles,id',
        ]);
        
        $classe = Classe::findOrFail($id);
        $classe->nom_classe = $request->nom_classe;
        $classe->capacite = $request->capacite;
        $classe->annee_scolaire = $request->annee_scolaire;
        $classe->niveau_scolaire_id = $request->niveau_scolaire_id;
        $classe->filiere_id = $request->filiere_id;
        $classe->salle_id = $request->salle_id;
        $classe->save();

        return response()->json([
            'message' => 'classe updated successfully',
            'classe'=>$classe->only(['id','nom_classe','capacite','annee_scolaire','niveau_scolaire_id','filiere_id','salle_id'])
        ]); 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $classe = Classe::findOrFail($id);
        $classe->delete();
        return response()->json(['message' => 'classe deleted  successfully',]);
    }

    public function etudiants($id)
    {
        $classe = Classe::with('etudiants')->findOrFail($id);

        return response()->json($classe->etudiants);
    }

    public function classesByNiveau()
    {
        $classes = Classe::with('niveauScolaire')->get();

        $grouped = $classes->groupBy(function ($classe) {
            return $classe->niveau_scolaire_id;
        });

        $result = [];

        foreach ($grouped as $niveau_id => $items) {
            $firstItem = $items->first();
            $result[] = [
                'niveau_scolaire' => $firstItem->niveauScolaire,
                'count' => $items->count()
            ];
        }

        return response()->json($result);
    }

    public function formateurs($id)
    {
        $classe = Classe::with('formateurs')->findOrFail($id);

        return response()->json($classe->formateurs);
    }
}
