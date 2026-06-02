<?php

namespace App\Http\Controllers;

use App\Models\Salle;
use Illuminate\Http\Request;

class SalleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $salles = Salle::all();
        return response()->json($salles);
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
            "nom_salle" => 'required|string|max:255',
            "type_salle" => 'nullable|string|max:255',
            "capacite" => 'nullable|integer',
            "etage" => 'nullable|string|max:255',
            "statut" => 'required|string|max:255',
            "description" => 'nullable|string',
        ]);
        
        $salle = new Salle();
        $salle->nom_salle = $request->nom_salle;
        $salle->type_salle = $request->type_salle;
        $salle->capacite = $request->capacite;
        $salle->etage = $request->etage;
        $salle->statut = $request->statut;
        $salle->description = $request->description;
        $salle->save();

        return response()->json([
            'message' => 'salle created successfully',
            'salle'=>$salle->only(['id','nom_salle','type_salle','capacite','etage','statut','description'])
        ]); 
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $salle = Salle::with('classe.filiere')->find($id);
        return response()->json($salle);
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
            "nom_salle" => 'required|string|max:255',
            "type_salle" => 'nullable|string|max:255',
            "capacite" => 'nullable|integer',
            "etage" => 'nullable|string|max:255',
            "statut" => 'required|string|max:255',
            "description" => 'nullable|string',
        ]);
        
        $salle = Salle::findOrFail($id);
        $salle->nom_salle = $request->nom_salle;
        $salle->type_salle = $request->type_salle;
        $salle->capacite = $request->capacite;
        $salle->etage = $request->etage;
        $salle->statut = $request->statut;
        $salle->description = $request->description;
        $salle->save();

        return response()->json([
            'message' => 'salle updated successfully',
            'salle'=>$salle->only(['id','nom_salle','type_salle','capacite','etage','statut','description'])
        ]); 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $salle = Salle::findOrFail($id);
        $salle->delete();
        return response()->json(['message' => 'salle deleted  successfully',]);
    }
}
