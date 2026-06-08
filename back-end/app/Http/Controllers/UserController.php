<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->role) {
            $query->where('role', $request->role);
        }

        $users = $query->select('id', 'prenom', 'nom', 'email', 'role', 'status')
                       ->get();

        return response()->json(['users' => $users]);
    }
}