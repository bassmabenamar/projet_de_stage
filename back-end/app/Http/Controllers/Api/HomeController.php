<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Etudiant;
use App\Models\Actualite;
use App\Models\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class HomeController extends Controller
{
    /**
     * Statistiques de l'école
     */
    public function getStats()
    {
        $stats = [
            'etudiants' => Etudiant::count(),
            'professeurs' => User::where('role', 'professeur')->count(),
            'annees_experience' => 25,
            'programmes' => 8,
            'satisfaction' => 98,
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    /**
     * Dernières actualités
     */
    public function getActualites()
    {
        $actualites = Actualite::orderBy('created_at', 'desc')
            ->limit(3)
            ->get()
            ->map(function($actu) {
                return [
                    'id' => $actu->id,
                    'titre' => $actu->titre,
                    'contenu' => $actu->contenu,
                    'image' => $actu->image,
                    'date' => $actu->created_at->format('d M, Y'),
                    'categorie' => $actu->categorie,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $actualites
        ]);
    }

    /**
     * Inscription à la newsletter
     */
    public function subscribeNewsletter(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:newsletters,email'
        ]);

        $newsletter = Newsletter::create([
            'email' => $request->email,
            'subscribed_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Inscription à la newsletter réussie !'
        ], 201);
    }

    /**
     * Formulaire de contact
     */
    public function contact(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|min:2',
            'email' => 'required|email',
            'message' => 'required|string|min:10'
        ]);

        // Envoyer email à l'administration
        // Mail::to('admin@amity.com')->send(new ContactMail($request->all()));

        return response()->json([
            'success' => true,
            'message' => 'Votre message a été envoyé avec succès !'
        ]);
    }

    /**
     * Témoignages des étudiants
     */
    public function getTemoignages()
    {
        $temoignages = [
            ['id' => 1, 'nom' => 'Sarah M.', 'role' => 'Étudiante', 'message' => 'Amity School a changé ma vie ! Les professeurs sont incroyables.', 'note' => 5, 'avatar' => null],
            ['id' => 2, 'nom' => 'Karim B.', 'role' => 'Étudiant', 'message' => 'Une école d\'exception avec des infrastructures modernes.', 'note' => 5, 'avatar' => null],
            ['id' => 3, 'nom' => 'Leila O.', 'role' => 'Parent', 'message' => 'Je recommande vivement Amity School pour la qualité de l\'enseignement.', 'note' => 5, 'avatar' => null],
        ];

        return response()->json([
            'success' => true,
            'data' => $temoignages
        ]);
    }
}
