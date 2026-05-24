<?php

namespace App\Http\Controllers;

use App\Models\NiveauScolaire;
use Illuminate\Http\Request;

class NiveauScolaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $niveauScolaires = NiveauScolaire::all();
        return response()->json($niveauScolaires);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(NiveauScolaire $niveauScolaire)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(NiveauScolaire $niveauScolaire)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, NiveauScolaire $niveauScolaire)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NiveauScolaire $niveauScolaire)
    {
        //
    }
}
