<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['message' => 'Email or password incorrect'], 401);
        }

        $user = auth('api')->user();

        if ($user->status === 'inactif') {
            return response()->json(['message' => 'Your account is inactive'], 403);
        }

        return response()->json([
            'user' => [
                'id' => $user->id,
                'nom' => $user->nom,
                'prenom' => $user->prenom,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status,
            ],

            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60

        ], 200);
    }

    public function me()
    {
        return response()->json(auth('api')->user());
    }
}
