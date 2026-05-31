<?php

namespace App\Http\Controllers;

use App\Models\Paiement;
use App\Models\CaisseOperation;
use App\Models\User;
use Illuminate\Http\Request;

class PaiementController extends Controller
{
    // GET /api/paiements
    public function index(Request $request)
    {
        $query = Paiement::with('etudiant:id,prenom,nom,classe_id')
            ->orderBy('created_at', 'desc');

        if ($request->statut) {
            $query->where('statut', $request->statut);
        }

        if ($request->search) {
            $query->whereHas('etudiant', function ($q) use ($request) {
                $q->where('prenom', 'like', "%{$request->search}%")
                  ->orWhere('nom', 'like', "%{$request->search}%");
            })->orWhere('reference', 'like', "%{$request->search}%")
              ->orWhere('type', 'like', "%{$request->search}%");
        }

        $paiements = $query->get()->map(fn ($p) => $this->formatPaiement($p));

        return response()->json([
            'paiements'      => $paiements,
            'total_collecte' => Paiement::sum('montant_paye'),
            'total_attendu'  => Paiement::sum('montant'),
            'total_retard'   => Paiement::where('statut', 'retard')->sum('montant'),
        ]);
    }

    // GET /api/paiements/{id}
    public function show($id)
    {
        $paiement = Paiement::with('etudiant:id,prenom,nom,classe_id')->findOrFail($id);
        return response()->json($this->formatPaiement($paiement));
    }

    // POST /api/paiements
    public function store(Request $request)
    {
        $request->validate([
            'user_id'       => 'required|exists:users,id',
            'type'          => 'required|in:Scolarité,Transport,Cantine,Activité,Matériel,Autre',
            'montant'       => 'required|numeric|min:0',
            'montant_paye'  => 'nullable|numeric|min:0',
            'statut'        => 'required|in:paye,partiel,en_attente,retard',
            'methode'       => 'required|in:Espèces,Virement,Chèque,Carte bancaire',
            'date_paiement' => 'nullable|date',
            'date_echeance' => 'nullable|date',
            'notes'         => 'nullable|string',
        ]);

        $paiement = Paiement::create([
            ...$request->all(),
            'reference'    => 'REF-' . date('Y') . '-' . str_pad(Paiement::count() + 1, 3, '0', STR_PAD_LEFT),
            'montant_paye' => $request->montant_paye ?? 0,
        ]);

        $paiement->load('etudiant');

        // ✅ Ajouter à la caisse si montant_paye > 0
        $montantPaye = (float) ($request->montant_paye ?? 0);
        if ($montantPaye > 0) {
            $this->ajouterEntreeCaisse($paiement, $montantPaye);
        }

        return response()->json($this->formatPaiement($paiement), 201);
    }

    // PUT /api/paiements/{id}
    public function update(Request $request, $id)
    {
        $paiement = Paiement::findOrFail($id);

        $ancienMontantPaye = (float) $paiement->montant_paye;

        $request->validate([
            'type'          => 'sometimes|in:Scolarité,Transport,Cantine,Activité,Matériel,Autre',
            'montant'       => 'sometimes|numeric|min:0',
            'montant_paye'  => 'sometimes|numeric|min:0',
            'statut'        => 'sometimes|in:paye,partiel,en_attente,retard',
            'methode'       => 'sometimes|in:Espèces,Virement,Chèque,Carte bancaire',
            'date_paiement' => 'nullable|date',
            'date_echeance' => 'nullable|date',
            'notes'         => 'nullable|string',
        ]);

        $paiement->update($request->all());
        $paiement->load('etudiant');

        // ✅ Mettre à jour la caisse si montant_paye a changé
        $nouveauMontantPaye = (float) ($request->montant_paye ?? $ancienMontantPaye);
        $difference = $nouveauMontantPaye - $ancienMontantPaye;

        if ($difference > 0) {
            // Nouveau paiement partiel → ajouter la différence
            $this->ajouterEntreeCaisse($paiement, $difference);
        } elseif ($difference < 0) {
            // Correction à la baisse → supprimer l'ancienne entrée et recréer
            CaisseOperation::where('source', 'paiement')
                           ->where('source_id', $paiement->id)
                           ->delete();
            if ($nouveauMontantPaye > 0) {
                $this->ajouterEntreeCaisse($paiement, $nouveauMontantPaye);
            }
        }

        return response()->json($this->formatPaiement($paiement));
    }

    // PATCH /api/paiements/{id}/marquer-paye
    public function marquerPaye($id)
    {
        $paiement = Paiement::findOrFail($id);

        $ancienMontantPaye = (float) $paiement->montant_paye;
        $difference = (float) $paiement->montant - $ancienMontantPaye;

        $paiement->update([
            'statut'        => 'paye',
            'montant_paye'  => $paiement->montant,
            'date_paiement' => now()->toDateString(),
        ]);

        $paiement->load('etudiant');

        // ✅ Ajouter uniquement la différence restante à la caisse
        if ($difference > 0) {
            $this->ajouterEntreeCaisse($paiement, $difference);
        }

        return response()->json($this->formatPaiement($paiement));
    }

    // DELETE /api/paiements/{id}
    public function destroy($id)
    {
        $paiement = Paiement::findOrFail($id);

        // ✅ Supprimer les opérations caisse liées
        CaisseOperation::where('source', 'paiement')
                       ->where('source_id', $paiement->id)
                       ->delete();

        $paiement->delete();

        return response()->json(['message' => 'Paiement supprimé avec succès']);
    }

    // ====== Helper: Ajouter entrée caisse ======
    private function ajouterEntreeCaisse(Paiement $paiement, float $montant): void
    {
        $nomEtudiant = $paiement->etudiant->prenom . ' ' . $paiement->etudiant->nom;

        CaisseOperation::create([
            'type'           => 'entree',
            'description'    => "{$paiement->type} — {$nomEtudiant}",
            'montant'        => $montant,
            'categorie'      => $paiement->type,
            'date_operation' => $paiement->date_paiement ?? now()->toDateString(),
            'source'         => 'paiement',
            'source_id'      => $paiement->id,
        ]);
    }

    // ====== Format response ======
    private function formatPaiement($p)
    {
        return [
            'id'           => $p->id,
            'etudiant'     => $p->etudiant->prenom . ' ' . $p->etudiant->nom,
            'user_id'      => $p->user_id,
            'classe'       => $p->etudiant->classe_id ?? '',
            'type'         => $p->type,
            'montant'      => (float) $p->montant,
            'montantPaye'  => (float) $p->montant_paye,
            'statut'       => $p->statut,
            'methode'      => $p->methode,
            'reference'    => $p->reference,
            'datePaiement' => $p->date_paiement?->toDateString(),
            'dateEcheance' => $p->date_echeance?->toDateString(),
            'notes'        => $p->notes,
        ];
    }
}