<?php

namespace App\Http\Controllers;

use App\Models\Transport;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class TransportController extends Controller
{
    /**
     * Display a listing of the transports.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Transport::query();
        
        // Search functionality
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }
        
        // Pagination (optional)
        $perPage = $request->get('per_page', 100);
        $transports = $query->orderBy('created_at', 'desc')->paginate($perPage);
        
        return response()->json($transports);
    }

    /**
     * Store a newly created transport in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nom_transport' => 'required|string|max:255',
            'code' => 'required|string|unique:transports,code|max:50',
            'type' => 'required|string|in:Bus,Minibus,Voiture,Van,Camionnette',
            'immatriculation' => 'required|string|unique:transports,immatriculation|max:50',
            'capacite' => 'required|integer|min:1|max:100',
            'chauffeur_nom' => 'required|string|max:255',
            'chauffeur_telephone' => 'required|string|max:20',
            'chauffeur_permis' => 'nullable|string|max:50',
            'responsable_nom' => 'required|string|max:255',
            'responsable_telephone' => 'required|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $transport = Transport::create($request->all());

        return response()->json([
            'message' => 'Transport créé avec succès',
            'transport' => $transport
        ], 201);
    }

    /**
     * Display the specified transport.
     */
    public function show($id): JsonResponse
    {
        $transport = Transport::find($id);
        
        if (!$transport) {
            return response()->json([
                'message' => 'Transport non trouvé'
            ], 404);
        }

        return response()->json($transport);
    }

    /**
     * Update the specified transport in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $transport = Transport::find($id);
        
        if (!$transport) {
            return response()->json([
                'message' => 'Transport non trouvé'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom_transport' => 'required|string|max:255',
            'code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('transports', 'code')->ignore($transport->id)
            ],
            'type' => 'required|string|in:Bus,Minibus,Voiture,Van,Camionnette',
            'immatriculation' => [
                'required',
                'string',
                'max:50',
                Rule::unique('transports', 'immatriculation')->ignore($transport->id)
            ],
            'capacite' => 'required|integer|min:1|max:100',
            'chauffeur_nom' => 'required|string|max:255',
            'chauffeur_telephone' => 'required|string|max:20',
            'chauffeur_permis' => 'nullable|string|max:50',
            'responsable_nom' => 'required|string|max:255',
            'responsable_telephone' => 'required|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $transport->update($request->all());

        return response()->json([
            'message' => 'Transport mis à jour avec succès',
            'transport' => $transport
        ]);
    }

    /**
     * Remove the specified transport from storage.
     */
    public function destroy($id): JsonResponse
    {
        $transport = Transport::find($id);
        
        if (!$transport) {
            return response()->json([
                'message' => 'Transport non trouvé'
            ], 404);
        }

        $transport->delete();

        return response()->json([
            'message' => 'Transport supprimé avec succès'
        ]);
    }

    /**
     * Get transport statistics.
     */
    public function stats(): JsonResponse
    {
        $stats = [
            'total' => Transport::count(),
            'total_capacite' => Transport::sum('capacite'),
            'par_type' => Transport::select('type', \DB::raw('count(*) as count'))
                ->groupBy('type')
                ->get(),
        ];

        return response()->json($stats);
    }

    /**
     * Bulk delete transports.
     */
    public function bulkDelete(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'ids' => 'required|array',
            'ids.*' => 'exists:transports,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        Transport::whereIn('id', $request->ids)->delete();

        return response()->json([
            'message' => 'Transports supprimés avec succès',
            'deleted_count' => count($request->ids)
        ]);
    }
}