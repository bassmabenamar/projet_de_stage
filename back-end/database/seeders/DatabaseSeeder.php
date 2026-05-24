<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\NiveauScolaire;
use App\Models\Classe;
use App\Models\Matiere;
use App\Models\Etudiant;
use App\Models\Enseignant;
use App\Models\Administrateur;
use App\Models\Salle;
use App\Models\Transport;
use App\Models\Paiement;
use App\Models\Activite;
use App\Models\Note;
use App\Models\Presence;
use App\Models\Examen;
use App\Models\Devoir;
use App\Models\Notification;
use App\Models\Message;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Structure (Niveaux & Salles & Transport)
        $niveaux = [
            ['nom' => 'Primaire', 'description' => 'Cycle Primaire'],
            ['nom' => 'Collège', 'description' => 'Cycle Collège']
        ];
        foreach ($niveaux as $n) {
            NiveauScolaire::create($n);
        }

        Salle::create(['nom' => 'Salle A1', 'capacite' => '30', 'type' => 'Cours']);

        Transport::create([
            'matricule' => 'BUS-2026',
            'chauffeur' => 'Omar',
            'enseignant' => 'Non',
            'telephone' => '0600112233',
            'capacite' => '20'
        ]);

        // 2. Classes
        $classe = Classe::create([
            'nom' => '6ème Année A',
            'capacite' => 25,
            'anneeScolaire' => '2025/2026',
            'niveau_scolaire_id' => 1
        ]);

        // 3. Utilisateurs (Admin, Profs, Etudiants)

        // Admin Amal
        $adminU = User::create([
            'nom' => 'Ettaliqi',
            'prenom' => 'Amal',
            'email' => 'admin@amity.com',
            'role' => 'admin',
            'password' => Hash::make('password123')
        ]);
        Administrateur::create(['user_id' => $adminU->id]);

        // Enseignants (5 profs)
        for ($i = 1; $i <= 5; $i++) {
            $u = User::create([
                'nom' => "Prof_Nom$i",
                'prenom' => "Prof_Pre$i",
                'email' => "prof$i@amity.com",
                'role' => 'enseignant',
                'password' => Hash::make('password123')
            ]);
            Enseignant::create([
                'user_id' => $u->id,
                'code' => "P$i",
                'specialite' => 'Matière '.$i,
                'salaire' => '9000',
                'statut' => 'Actif'
            ]);
        }

        // Étudiants (20 étudiants)
        for ($i = 1; $i <= 20; $i++) {
            $u = User::create([
                'nom' => "Eleve_Nom$i",
                'prenom' => "Eleve_Pre$i",
                'email' => "etudiant$i@amity.com",
                'role' => 'etudiant',
                'password' => Hash::make('password123')
            ]);

            // Zid motDePasse hit 3andek f migration dyal Etudiant
            $etudiant = Etudiant::create([
                'user_id' => $u->id,
                'dateNaissance' => '2014-01-01',
                'genre' => ($i % 2 == 0 ? 'F' : 'M'),
                'dateInscription' => now(),
                'statut' => 'Inscrit',
                'classe_id' => $classe->id,
                'motDePasse' => Hash::make('password123')
            ]);

            // 4. Data liés (Paiements & Présences)
            Paiement::create([
                'etudiant_id' => $etudiant->id,
                'montant' => '1500',
                'datePaiement' => now(),
                'mois' => 'Mai',
                'ModePaiement' => 'Virement',
                'statut' => 'Payé',
                'type' => 'Scolarité'
            ]);

            Presence::create([
                'etudiant_id' => $etudiant->id,
                'date' => now(),
                'statut' => 'Présent',
                'remarque' => 'Rien'
            ]);
        }

        // 5. Académique (Matières, Notes, Examens)
        $matieres = ['Maths', 'Français', 'Arabe'];
        foreach ($matieres as $m) {
            $mat = Matiere::create([
                'nom' => $m,
                'coefficient' => '4' // Smya sahiha li 3ndek f migration
            ]);

            foreach (Etudiant::all() as $etud) {
                Note::create([
                    'etudiant_id' => $etud->id,
                    'matiere_id' => $mat->id,
                    'valeur' => rand(12, 19),
                    'semestre' => '1',
                    'dateSaisit' => now()
                ]);
            }

            Examen::create([
                'date' => now()->addDays(7),
                'duree' => '2h',
                'type' => 'Contrôle',
                'matiere_id' => $mat->id
            ]);

            Devoir::create([
                'titre' => "Devoir Maison $m",
                'DateDev' => now()->addDays(2),
                'matiere_id' => $mat->id
            ]);
        }

        // 6. Communication
        Activite::create([
            'titre' => 'Fête Fin d\'année',
            'description' => 'Cérémonie',
            'date' => now(),
            'lieu' => 'Amity School'
        ]);

        Notification::create([
            'titre' => 'Bienvenue',
            'contenu' => 'Bienvenue sur Amity App',
            'dateCreation' => now(),
            'dateLu' => 'Non',
            'user_id' => $adminU->id
        ]);

        Message::create([
            'user_id' => $adminU->id,
            'contenu' => 'Test message',
            'dateEnvoit' => now(),
            'lu' => 'Non'
        ]);
    }
}
