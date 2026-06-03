<?php

namespace App\Http\Controllers;

use App\Models\Emploi;
use Illuminate\Http\Request;

class EmploiController extends Controller
{
    /**
     * Afficher emploi du temps d'une classe
     */
    public function index($id)
    {
        $user = auth()->user();

        $query = Emploi::with(['matiere','salle','user'])->where('classe_id', $id);
        if ($user->role === 'formateur') {
            $query->where('user_id', $user->id);
        }

        $emplois = $query->orderBy('jour')->orderBy('heure_debut')->get();
        return response()->json($emplois);
    }

    /**
     * Ajouter une séance
     */
    public function store(Request $request)
    {
        $request->validate([
            'classe_id'    => 'required|exists:classes,id',
            'salle_id'     => 'required|exists:salles,id',
            'matiere_id'   => 'required|exists:matieres,id',
            'user_id'      => 'required|exists:users,id', // ✅ مهم
            'jour'         => 'required|string',
            'heure_debut'  => 'required',
            'heure_fin'    => 'required',
        ]);

        $authUser = auth()->user();

        if (!in_array($authUser->role, ['admin', 'formateur'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $emploi = Emploi::create([
            'classe_id'   => $request->classe_id,
            'salle_id'    => $request->salle_id,
            'matiere_id'  => $request->matiere_id,
            'user_id'     => $request->user_id,
            'jour'        => $request->jour,
            'heure_debut' => $request->heure_debut,
            'heure_fin'   => $request->heure_fin,
        ]);

        return response()->json([
            'message' => 'Séance ajoutée avec succès',
            'emploi' => $emploi
        ], 201);
    }

    /**
     * Modifier une séance
     */
    public function update(Request $request, $id)
    {
        $emploi = Emploi::findOrFail($id);

        $request->validate([
            'classe_id'    => 'required|exists:classes,id',
            'salle_id'     => 'required|exists:salles,id',
            'matiere_id'   => 'required|exists:matieres,id',
            'user_id'      => 'required|exists:users,id',
            'jour'         => 'required|string',
            'heure_debut'  => 'required',
            'heure_fin'    => 'required',
        ]);

        $authUser = auth()->user();

        if (!in_array($authUser->role, ['admin', 'formateur'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($authUser->role === 'formateur') {
            $request->merge(['user_id' => $authUser->id]);
        }

        $emploi->update([
            'classe_id'   => $request->classe_id,
            'salle_id'    => $request->salle_id,
            'matiere_id'  => $request->matiere_id,
            'user_id'     => $request->user_id,
            'jour'        => $request->jour,
            'heure_debut' => $request->heure_debut,
            'heure_fin'   => $request->heure_fin,
        ]);

        return response()->json([
            'message' => 'Séance modifiée avec succès',
            'emploi'  => $emploi
        ]);
    }

    /**
     * Supprimer une séance
     */
    public function destroy($id)
    {
        $emploi = Emploi::findOrFail($id);
        $emploi->delete();
        return response()->json(['message' => 'Séance supprimée avec succès']);
    }

    /**
     * Afficher une seule séance
     */
    public function show($id)
    {
        $emploi = Emploi::with(['matiere','salle','user','classe'])->findOrFail($id);
        return response()->json($emploi);
    }
}