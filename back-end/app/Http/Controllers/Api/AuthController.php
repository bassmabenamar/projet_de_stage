<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Login - retourne JWT token
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
            ], 422);
        }

        $credentials = $request->only('email', 'password');

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Email ou mot de passe incorrect.',
            ], 401);
        }

        $user = auth('api')->user();

        return response()->json([
            'success' => true,
            'token'   => $token,
            'user'    => [
                'id'     => $user->id,
                'nom'    => $user->nom,
                'prenom' => $user->prenom,
                'email'  => $user->email,
                'role'   => $user->role,
                'photo'  => $user->photo,
            ],
        ]);
    }

    /**
     * Logout - invalide le token JWT
     */
    public function logout()
    {
        auth('api')->logout();

        return response()->json([
            'success' => true,
            'message' => 'Déconnecté avec succès.',
        ]);
    }

    /**
     * Me - retourne l'utilisateur connecté
     */
    public function me()
    {
        $user = auth('api')->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non trouvé.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'user'    => [
                'id'        => $user->id,
                'nom'       => $user->nom,
                'prenom'    => $user->prenom,
                'email'     => $user->email,
                'role'      => $user->role,
                'photo'     => $user->photo,
                'telephone' => $user->telephone,
                'adresse'   => $user->adresse,
            ],
        ]);
    }
}
