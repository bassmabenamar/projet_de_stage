<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class FormateurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $formateurs = User::with('classesFormateur')->where('role', 'formateur')->get();
        return response()->json($formateurs);
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
            "prenom" => 'required',
            "nom" => 'required',
            "email" => 'required|email|unique:users',
            "password" => 'required|min:8',
            "profile_image" => "nullable|image|max:2048",
            "specialite" => 'required',
            "salaire" => 'required|integer',
            "date_embauche" => 'required',
            "status" => 'required|in:actif,inactif',

            "phone" => 'nullable',
            "adresse" => 'nullable',
            "genre" => 'nullable',
            
            "classe_id" => 'nullable|array',
            "classe_id.*" => 'exists:classes,id',
        ]);
        
        $user = new User();
        $user->prenom = $request->prenom;
        $user->nom = $request->nom;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->password = Hash::make($request->password);
        $user->specialite = $request->specialite;
        $user->adresse = $request->adresse;
        $user->genre = $request->genre;
        $user->salaire = $request->salaire;
        $user->date_embauche = $request->date_embauche;
        $user->role = 'formateur';
        $user->status = $request->status;
        $user->save();

        $user->classesFormateur()->sync($request->classe_id ?? []);
        $user->load('classesFormateur');

        return response()->json([
            'message' => 'Formateur created successfully',
            'user'=>$user
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $formateur = User::with('classesFormateur')->where('role', 'formateur')->where('id', $id)->firstOrFail();
        return response()->json($formateur);
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
            "prenom" => 'required',
            "nom" => 'required',
            "email" => 'required|email|unique:users,email,' . $id,
            "password" => 'nullable|min:8',
            "profile_image" => "nullable|image|max:2048",
            "specialite" => 'required',
            "salaire" => 'required|integer',
            "date_embauche" => 'required',
            "status" => 'required|in:actif,inactif',

            "phone" => 'nullable',
            "adresse" => 'nullable',
            "genre" => 'nullable',

            "classe_id" => 'nullable|array',
            "classe_id.*" => 'exists:classes,id',
        ]);

        $user = User::where('role', 'formateur')->findOrFail($id);

        $user->prenom = $request->prenom;
        $user->nom = $request->nom;
        $user->email = $request->email;
        $user->phone = $request->phone;
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }
        $user->specialite = $request->specialite;
        $user->adresse = $request->adresse;
        $user->genre = $request->genre;
        $user->salaire = $request->salaire;
        $user->date_embauche = $request->date_embauche;
        $user->status = $request->status;
        $user->save();

        $user->classesFormateur()->sync($request->classe_id ?? []);
        $user->load('classesFormateur');

        return response()->json([
            'message' => 'Formateur updated successfully',
            'user' => $user
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $formateur = User::where('role', 'formateur')->findOrFail($id);
        $formateur->delete();
        return response()->json(['message' => 'Formateur deleted  successfully',]);
    }
}
