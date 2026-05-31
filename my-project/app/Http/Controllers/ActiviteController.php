<?php

namespace App\Http\Controllers;

use App\Models\Activite;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ActiviteController extends Controller
{
    /**
     * Display a listing of the activities.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Activite::query();
        
        // Search functionality
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }
        
        // Filter by status
        if ($request->has('statut') && $request->statut) {
            $query->where('statut', $request->statut);
        }
        
        // Order by
        $orderBy = $request->get('order_by', 'created_at');
        $orderDir = $request->get('order_dir', 'desc');
        $query->orderBy($orderBy, $orderDir);
        
        // Pagination or get all
        if ($request->has('per_page')) {
            $perPage = $request->get('per_page', 15);
            $activites = $query->paginate($perPage);
        } else {
            $activites = $query->get();
        }
        
        return response()->json($activites);
    }

    /**
     * Store a newly created activity in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'code' => 'required|string|unique:activites,code|max:50',
            'date_debut' => 'nullable|date',
            'date_fin' => 'nullable|date|after_or_equal:date_debut',
            'prix' => 'nullable|numeric|min:0|max:999999.99',
            'lieu' => 'required|string|max:255',
            'description' => 'nullable|string',
            'responsable' => 'nullable|string|max:255',
            'heures_hebdomadaires' => 'required|integer|min:1|max:40',
            'statut' => 'required|in:Actif,Inactif',
            'image' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $activite = Activite::create($request->all());

        return response()->json([
            'message' => 'Activité créée avec succès',
            'activity' => $activite
        ], 201);
    }

    /**
     * Display the specified activity.
     */
    public function show($id): JsonResponse
    {
        $activite = Activite::find($id);
        
        if (!$activite) {
            return response()->json([
                'message' => 'Activité non trouvée'
            ], 404);
        }

        return response()->json($activite);
    }

    /**
     * Update the specified activity in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $activite = Activite::find($id);
        
        if (!$activite) {
            return response()->json([
                'message' => 'Activité non trouvée'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('activites', 'code')->ignore($activite->id)
            ],
            'date_debut' => 'nullable|date',
            'date_fin' => 'nullable|date|after_or_equal:date_debut',
            'prix' => 'nullable|numeric|min:0|max:999999.99',
            'lieu' => 'required|string|max:255',
            'description' => 'nullable|string',
            'responsable' => 'nullable|string|max:255',
            'heures_hebdomadaires' => 'required|integer|min:1|max:40',
            'statut' => 'required|in:Actif,Inactif',
            'image' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $activite->update($request->all());

        return response()->json([
            'message' => 'Activité mise à jour avec succès',
            'activity' => $activite
        ]);
    }

    /**
     * Remove the specified activity from storage.
     */
    public function destroy($id): JsonResponse
    {
        $activite = Activite::find($id);
        
        if (!$activite) {
            return response()->json([
                'message' => 'Activité non trouvée'
            ], 404);
        }

        // Delete image if exists
        if ($activite->image && Storage::exists($activite->image)) {
            Storage::delete($activite->image);
        }

        $activite->delete();

        return response()->json([
            'message' => 'Activité supprimée avec succès'
        ]);
    }

    /**
     * Get activity statistics.
     */
    public function stats(): JsonResponse
    {
        $stats = [
            'total' => Activite::count(),
            'actif' => Activite::active()->count(),
            'inactif' => Activite::inactive()->count(),
            'total_heures_semaine' => Activite::sum('heures_hebdomadaires'),
            'prix_moyen' => Activite::avg('prix'),
            'par_statut' => [
                'Actif' => Activite::active()->count(),
                'Inactif' => Activite::inactive()->count(),
            ],
        ];

        return response()->json($stats);
    }

    /**
     * Upload image for activity.
     */
    public function uploadImage(Request $request, $id): JsonResponse
    {
        $activite = Activite::find($id);
        
        if (!$activite) {
            return response()->json([
                'message' => 'Activité non trouvée'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        // Delete old image if exists
        if ($activite->image && Storage::exists($activite->image)) {
            Storage::delete($activite->image);
        }

        // Store new image
        $path = $request->file('image')->store('activites', 'public');
        $activite->update(['image' => $path]);

        return response()->json([
            'message' => 'Image téléchargée avec succès',
            'image_url' => Storage::url($path)
        ]);
    }

    /**
     * Bulk delete activities.
     */
    public function bulkDelete(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'ids' => 'required|array',
            'ids.*' => 'exists:activites,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        // Delete images
        $activites = Activite::whereIn('id', $request->ids)->get();
        foreach ($activites as $activite) {
            if ($activite->image && Storage::exists($activite->image)) {
                Storage::delete($activite->image);
            }
        }

        Activite::whereIn('id', $request->ids)->delete();

        return response()->json([
            'message' => 'Activités supprimées avec succès',
            'deleted_count' => count($request->ids)
        ]);
    }

    /**
     * Get upcoming activities (based on date_debut).
     */
    public function upcoming(): JsonResponse
    {
        $activites = Activite::where('statut', 'Actif')
            ->where('date_debut', '>=', now())
            ->orderBy('date_debut', 'asc')
            ->limit(10)
            ->get();

        return response()->json($activites);
    }

    /**
     * Get current activities (based on dates).
     */
    public function current(): JsonResponse
    {
        $activites = Activite::where('statut', 'Actif')
            ->where('date_debut', '<=', now())
            ->where('date_fin', '>=', now())
            ->orderBy('date_debut', 'asc')
            ->get();

        return response()->json($activites);
    }
}