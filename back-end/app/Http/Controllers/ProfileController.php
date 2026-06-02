<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function updateProfile(Request $request)
    {
        $user = auth()->user();
        $request->validate([
                'prenom'=>'required',
                'nom'=>'required',
                'email'=>'required|email|unique:users,email,' . $user->id,
                'phone' => 'nullable|unique:users,phone,' . $user->id,
                'biographie'=>'nullable|string',
                'profile_image'=>'nullable|image|max:2048'
        ]);
        $user->prenom = $request->prenom;
        $user->nom = $request->nom;
        $user->email = $request->email;
        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('profile_images', 'public');
            $user->profile_image = $path;
        }
        $user->phone = $request->phone;
        $user->biographie = $request->biographie;
        $user->save();

        return response()->json([
            'message' => 'Profile modified  successfully',
            'user'=>$user->only(['id','prenom','nom','email','role','biographie','profile_image'])
        ]);
    }

    public function changePassword(Request $request){
        $user = auth()->user();
        $request->validate([
            'current_password' => 'required',
            'new_password'=>'required|min:8',
        ]);
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect'
            ], 422);
        }
        $user->password = Hash::make($request->new_password);
        $user->save();
        return response()->json([
            'message' => 'password modified  successfully',
        ]);

    }
}
