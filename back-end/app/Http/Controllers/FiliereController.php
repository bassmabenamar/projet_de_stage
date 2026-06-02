<?php

namespace App\Http\Controllers;

use App\Models\Filiere;
use Illuminate\Http\Request;


class FiliereController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $filieres = Filiere::all();
        return response()->json($filieres);
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
            "code" => 'required|unique:filieres,code',
            "nom_filiere" => 'required',
            "description" => 'nullable',
        ]);
        
        $filiere = new Filiere();
        $filiere->code = $request->code;
        $filiere->nom_filiere = $request->nom_filiere;
        $filiere->description = $request->description;
        $filiere->save();

        return response()->json([
            'message' => 'Filiere created successfully',
            'filiere'=>$filiere->only(['id','code','nom_filiere','description'])
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $filiere = Filiere::findOrFail($id);
        return response()->json($filiere);
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
            "code" => 'required|unique:filieres,code,' . $id,
            "nom_filiere" => 'required',
            "description" => 'nullable',
        ]);
        
        $filiere = Filiere::findOrFail($id);
        $filiere->code = $request->code;
        $filiere->nom_filiere = $request->nom_filiere;
        $filiere->description = $request->description;
        $filiere->save();

        return response()->json([
            'message' => 'Filiere updated successfully',
            'filiere'=>$filiere->only(['id','code','nom_filiere','description'])
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $filiere = Filiere::findOrFail($id);
        $filiere->delete();
        return response()->json(['message' => 'Filiere deleted  successfully',]);
    }
}
