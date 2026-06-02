<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class EtudiantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $etudiants = User::with(['classe', 'filiere','niveauScolaire','transport'])->where('role', 'etudiant')->get();
        return response()->json($etudiants);
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

            "phone" => 'nullable',
            "adresse" => 'nullable',
            "genre" => 'nullable',

            "date_naissance" => 'nullable|date',
            "date_inscription" => 'nullable|date',
            
            "classe_id" => 'nullable|exists:classes,id',
            "filiere_id" => 'nullable|exists:filieres,id',
            "niveau_scolaire_id" => 'nullable|exists:niveau_scolaires,id',
            "transport_id" => 'nullable|exists:transports,id',
        ]);
        
        $user = new User();
        $user->prenom = $request->prenom;
        $user->nom = $request->nom;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->password = Hash::make($request->password);
        $user->date_naissance = $request->date_naissance;
        $user->adresse = $request->adresse;
        $user->genre = $request->genre;
        $user->niveau_scolaire_id = $request->niveau_scolaire_id;
        $user->classe_id = $request->classe_id;
        $user->filiere_id = $request->filiere_id;
        $user->transport_id = $request->transport_id;
        $user->date_inscription = $request->date_inscription;
        $user->role = 'etudiant';
        $user->status = 'actif';
        $user->save();

        return response()->json([
            'message' => 'Etudiant created successfully',
            'user'=>$user->only(['id','prenom','nom','email','phone','date_naissance','adresse','genre','niveau_scolaire_id','classe_id','filiere_id','transport_id','date_inscription','role','status'])
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $etudiant = User::with(['classe', 'filiere','niveauScolaire','transport'])->where('role', 'etudiant')->where('id',$id)->first();
        return response()->json($etudiant);
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
            "prenom"=>'required',
            "nom"=>'required',
            "email" => 'required|email|unique:users,email,' . $id,
            "password" => 'nullable|min:8',
            "profile_image"=> "nullable|image|max:2048",
            'phone' => 'nullable',
            'classe_id' => 'nullable|exists:classes,id',
            'filiere_id' => 'nullable|exists:filieres,id',
            'niveau_scolaire_id' => 'nullable|exists:niveau_scolaires,id',
            'transport_id' => 'nullable|exists:transports,id',
        ]);
        
        $user = User::where('role', 'etudiant')->findOrFail($id);
        $user->prenom = $request->prenom;
        $user->nom = $request->nom;
        $user->email = $request->email;
        $user->phone = $request->phone;
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }
        $user->date_naissance = $request->date_naissance;
        $user->adresse = $request->adresse;
        $user->genre = $request->genre;
        $user->niveau_scolaire_id = $request->niveau_scolaire_id;
        $user->classe_id = $request->classe_id;
        $user->filiere_id = $request->filiere_id;
        $user->transport_id = $request->transport_id;
        $user->date_inscription = $request->date_inscription;
        $user->role = 'etudiant';
        $user->status = 'actif';
        $user->save();

        return response()->json([
            'message' => 'Etudiant updated successfully',
            'user'=>$user->only(['id','prenom','nom','email','phone','date_naissance','adresse','genre','niveau_scolaire_id','classe_id','filiere_id','transport_id','date_inscription','role','status'])
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::where('role', 'etudiant')->findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Etudaint deleted  successfully',]);
    }
}
