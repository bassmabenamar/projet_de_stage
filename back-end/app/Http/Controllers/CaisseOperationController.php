<?php

namespace App\Http\Controllers;

use App\Models\CaisseOperation;
use Illuminate\Http\Request;

class CaisseOperationController extends Controller
{
    // GET /api/caisse
    public function index(Request $request)
    {
        $query = CaisseOperation::orderBy('date_operation', 'desc')
                                ->orderBy('created_at', 'desc');

        if ($request->type) {
            $query->where('type', $request->type);
        }

        if ($request->mois) {
            $query->whereRaw("DATE_FORMAT(date_operation, '%Y-%m') = ?", [$request->mois]);
        }

        $operations = $query->get();

        $totalEntrees = CaisseOperation::where('type', 'entree')->sum('montant');
        $totalCharges = CaisseOperation::where('type', 'charge')->sum('montant');

        return response()->json([
            'operations'    => $operations,
            'total_entrees' => (float) $totalEntrees,
            'total_charges' => (float) $totalCharges,
            'solde'         => (float) ($totalEntrees - $totalCharges),
        ]);
    }

    // POST /api/caisse — Ajout manuel
    public function store(Request $request)
    {
        $request->validate([
            'type'           => 'required|in:entree,charge',
            'description'    => 'required|string|max:255',
            'montant'        => 'required|numeric|min:0.01',
            'categorie'      => 'nullable|string|max:100',
            'date_operation' => 'required|date',
        ]);

        $operation = CaisseOperation::create([
            'type'           => $request->type,
            'description'    => $request->description,
            'montant'        => $request->montant,
            'categorie'      => $request->categorie,
            'date_operation' => $request->date_operation,
            'source'         => 'manuel',
        ]);

        return response()->json($operation, 201);
    }

    // DELETE /api/caisse/{id}
    public function destroy($id)
    {
        $op = CaisseOperation::findOrFail($id);

        // Empêcher la suppression des opérations liées à un paiement
        if ($op->source === 'paiement') {
            return response()->json([
                'message' => 'Impossible de supprimer une opération liée à un paiement. Supprimez le paiement à la place.'
            ], 403);
        }

        $op->delete();
        return response()->json(['message' => 'Opération supprimée']);
    }
}