<?php

namespace App\Http\Controllers;
use App\Models\Niveau;
use App\Models\NiveauScolaire;
use Illuminate\Http\Request;

class NiveauController extends Controller
{
    // GET /api/niveaux
    public function index(Request $request)
    {
        $query = Niveau::orderBy('ordre');

        if ($request->statut) {
            $query->where('statut', $request->statut);
        }
        if ($request->cycle) {
            $query->where('cycle', $request->cycle);
        }
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('nom_niveau', 'like', "%{$request->search}%")
                  ->orWhere('code', 'like', "%{$request->search}%")
                  ->orWhere('abreviation', 'like', "%{$request->search}%");
            });
        }

        $niveaux = $query->get()->map(fn ($n) => $this->formatNiveau($n));

        return response()->json([
            'niveaux' => $niveaux,
            'stats'   => [
                'total'    => Niveau::count(),
                'actifs'   => Niveau::where('statut', 'Actif')->count(),
                'inactifs' => Niveau::where('statut', 'Inactif')->count(),
                'primaire' => Niveau::where('cycle', 'primaire')->count(),
                'college'  => Niveau::where('cycle', 'college')->count(),
                'lycee'    => Niveau::where('cycle', 'lycee')->count(),
            ],
        ]);
    }

    // GET /api/niveaux/{id}
    public function show($id)
    {
        $niveau = Niveau::findOrFail($id);
        return response()->json($this->formatNiveau($niveau));
    }

    // POST /api/niveaux
    public function store(Request $request)
    {
        $request->validate([
            'nom_niveau'      => 'required|string|max:100',
            'code'            => 'required|string|max:20|unique:niveau_scolaires,code',
            'abreviation'     => 'required|string|max:20',
            'cycle'           => 'required|in:primaire,college,lycee',
            'ordre'           => 'nullable|integer|min:1',
            'capacite'        => 'nullable|integer|min:1',
            'description'     => 'nullable|string',
            'statut'          => 'nullable|in:Actif,Inactif',
            'frais_scolarite' => 'nullable|numeric|min:0',
            'frais_transport' => 'nullable|numeric|min:0',
            'frais_cantine'   => 'nullable|numeric|min:0',
        ]);

        $niveau = Niveau::create([
            'nom_niveau'      => $request->nom_niveau,
            'code'            => strtoupper($request->code),
            'abreviation'     => strtoupper($request->abreviation),
            'cycle'           => $request->cycle,
            'ordre'           => $request->ordre ?? (Niveau::max('ordre') + 1),
            'capacite'        => $request->capacite,
            'description'     => $request->description,
            'statut'          => $request->statut ?? 'Actif',
            'frais_scolarite' => $request->frais_scolarite ?? 0,
            'frais_transport' => $request->frais_transport ?? 0,
            'frais_cantine'   => $request->frais_cantine ?? 0,
            'nombre_etudiants'=> 0,
        ]);

        return response()->json($this->formatNiveau($niveau), 201);
    }

    // PUT /api/niveaux/{id}
    public function update(Request $request, $id)
    {
        $niveau = Niveau::findOrFail($id);

        $request->validate([
            'nom_niveau'      => 'sometimes|string|max:100',
            'code'            => 'sometimes|string|max:20|unique:niveau_scolaires,code,' . $id,
            'abreviation'     => 'sometimes|string|max:20',
            'cycle'           => 'sometimes|in:primaire,college,lycee',
            'ordre'           => 'nullable|integer|min:1',
            'capacite'        => 'nullable|integer|min:1',
            'description'     => 'nullable|string',
            'statut'          => 'nullable|in:Actif,Inactif',
            'frais_scolarite' => 'nullable|numeric|min:0',
            'frais_transport' => 'nullable|numeric|min:0',
            'frais_cantine'   => 'nullable|numeric|min:0',
        ]);

        $niveau->update($request->only([
            'nom_niveau', 'code', 'abreviation', 'cycle', 'ordre',
            'capacite', 'description', 'statut',
            'frais_scolarite', 'frais_transport', 'frais_cantine',
        ]));

        return response()->json($this->formatNiveau($niveau));
    }

    // DELETE /api/niveaux/{id}
    public function destroy($id)
    {
        $niveau = Niveau::findOrFail($id);
        $niveau->delete();
        return response()->json(['message' => 'Niveau supprimé avec succès']);
    }

    private function formatNiveau(Niveau $n): array
    {
        return [
            'id'               => $n->id,
            'nom'              => $n->nom_niveau,
            'code'             => $n->code,
            'abreviation'      => $n->abreviation,
            'cycle'            => $n->cycle,
            'ordre'            => (int) $n->ordre,
            'description'      => $n->description,
            'statut'           => $n->statut ?? 'Actif',
            'frais_scolarite'  => (float) ($n->frais_scolarite ?? 0),
            'frais_transport'  => (float) ($n->frais_transport ?? 0),
            'frais_cantine'    => (float) ($n->frais_cantine ?? 0),
            'capacite_max'     => (int) ($n->capacite ?? 0),
            'nombre_etudiants' => (int) ($n->nombre_etudiants ?? 0),
        ];
    }
}