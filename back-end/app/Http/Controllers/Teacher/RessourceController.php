<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Ressource;
use Illuminate\Http\Request;

class RessourceController extends Controller
{
    public function index()
    {
        return Ressource::latest()->get();
    }

    public function store(Request $request)
    {
        $ressource = Ressource::create($request->all());

        return response()->json($ressource);
    }
}