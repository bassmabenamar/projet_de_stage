<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Models\Note;
use App\Models\Presence;
use App\Models\Devoir;
use App\Models\Activite;
use App\Models\ActivityRegistration;
use App\Models\DevoirSoumission;
use App\Models\Notification;
use App\Models\Message;
use App\Models\Conversation;
use App\Models\Paiement;
use App\Models\TimetableSession;
use App\Models\Etudiant;
use App\Models\AbsenceJustification;
use App\Models\ContactMessage;
use Barryvdh\DomPDF\Facade\Pdf;
class StudentController extends Controller
{
    private function getEtudiant()
    {
        return Etudiant::where('user_id', auth('api')->id())->first();
    }

    /**
     * 1. Dashboard
     */
    public function getDashboard()
    {
        $user     = auth('api')->user();
        $etudiant = $this->getEtudiant();

        if (!$etudiant) {
            return response()->json([
                'success' => false,
                'message' => 'Profil étudiant non trouvé.',
            ], 404);
        }

        return response()->json([
            'success'   => true,
            'user'      => [
                'id'     => $user->id,
                'nom'    => $user->nom,
                'prenom' => $user->prenom,
                'email'  => $user->email,
                'photo'  => $user->photo ?? null,
            ],
            'classe'    => optional($etudiant->classe)->nom ?? 'Non assignée',
            'stats'     => [
                'moyenne'        => round(Note::where('etudiant_id', $etudiant->id)->avg('valeur') ?? 0, 2),
                'absences'       => Presence::where('etudiant_id', $etudiant->id)->where('statut', 'Absent')->count(),
                'presence_total' => Presence::where('etudiant_id', $etudiant->id)->where('statut', 'Présent')->count(),
            ],
            'homeworks' => Devoir::with('matiere')
                                ->orderBy('DateDev', 'asc')
                                ->limit(3)
                                ->get(),
            'annonces'  => Activite::orderBy('date', 'desc')->limit(2)->get(),
        ]);
    }

    /**
     * 2. Activités
     */
    // StudentController.php - getActivites()
public function getActivites()
{
    try {
        $activites = Activite::orderBy('date', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $activites
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}

    /**
     * 3. Notifications
     */
   public function getNotifications()
{
    $user = auth('api')->user();
    $notifications = Notification::where('user_id', $user->id)
        ->orderBy('created_at', 'desc')
        ->get();
    return response()->json(['success' => true, 'data' => $notifications]);
}

public function markNotificationAsRead($id)
{
    $user = auth('api')->user();
    $notif = Notification::where('id', $id)->where('user_id', $user->id)->first();
    if ($notif) {
        $notif->update(['dateLu' => 'Oui', 'updated_at' => now()]);
    }
    return response()->json(['success' => true]);
}

public function markAllNotificationsAsRead()
{
    $user = auth('api')->user();
    Notification::where('user_id', $user->id)->where('dateLu', 'Non')->update(['dateLu' => 'Oui']);
    return response()->json(['success' => true]);
}

public function deleteNotification($id)
{
    $user = auth('api')->user();
    Notification::where('id', $id)->where('user_id', $user->id)->delete();
    return response()->json(['success' => true]);
}

public function createNotification(Request $request)
{
    $user = auth('api')->user();
    $notification = Notification::create([
        'user_id' => $user->id,
        'type' => $request->type,
        'titre' => $request->titre,
        'contenu' => $request->contenu,
        'dateCreation' => now(),
        'dateLu' => 'Non'
    ]);
    return response()->json(['success' => true, 'data' => $notification]);
}

    /**
     * 5. Profile
     */
    public function getProfile()
    {
        $etudiant = Etudiant::with(['user', 'classe.niveauScolaire'])
                    ->where('user_id', auth('api')->id())
                    ->first();

        if (!$etudiant) {
            return response()->json([
                'success' => false,
                'message' => 'Profil étudiant non trouvé.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $etudiant,
        ]);
    }



/**
 * 6. Homeworks
 */
public function getHomeworks()
{
    try {
        // Récupérer tous les devoirs avec leur matière
        $homeworks = Devoir::with('matiere')
            ->orderBy('DateDev', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $homeworks
        ]);
    } catch (\Exception $e) {
        \Log::error('Erreur getHomeworks: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}
    /**
     * 7. Grades
     */
   public function getGrades()
{
    $etudiant = $this->getEtudiant();

    if (!$etudiant) {
        return response()->json([
            'success' => true,
            'subjects' => [],
            'assessments' => [],
        ]);
    }

    // Récupérer les notes avec les relations
    $notes = Note::with('matiere')
        ->where('etudiant_id', $etudiant->id)
        ->get();

    // Grouper par matière
    $subjects = $notes->groupBy('matiere_id')->map(function ($notesGroup) {
        $matiere = $notesGroup->first()->matiere;
        $avg = round($notesGroup->avg('valeur'), 2);

        // Chercher les notes midterm et final si elles existent
        $midterm = $notesGroup->where('type', 'midterm')->first();
        $final = $notesGroup->where('type', 'final')->first();

        return [
            'id'       => $matiere->id,
            'name'     => $matiere->nom,
            'prof'     => $matiere->professeur ? $matiere->professeur->nom : 'Enseignant',
            'grade'    => $avg . '/20',
            'average'  => $avg,
            'progress' => round(($avg / 20) * 100, 1),
            'midterm'  => $midterm ? $midterm->valeur . '/20' : '--',
            'final'    => $final ? $final->valeur . '/20' : '--',
            'credits'  => $matiere->credits . ' ECTS',
        ];
    })->values();

    // Dernières évaluations
    $assessments = $notes->sortByDesc('dateSaisit')->take(5)->map(function ($note) {
        return [
            'date'        => \Carbon\Carbon::parse($note->dateSaisit)->format('d M, Y'),
            'subject'     => $note->matiere->nom,
            'type'        => $note->type ?? 'Évaluation',
            'score'       => $note->valeur . '/20',
            'status'      => $note->valeur >= 10 ? 'Validé' : 'Rattrapage',
            'statusColor' => $note->valeur >= 10 ? 'emerald' : 'red',
        ];
    })->values();

    return response()->json([
        'success'     => true,
        'subjects'    => $subjects,
        'assessments' => $assessments,
    ]);
}
    /**
     * 8. Attendance
     */
   public function getAttendance()
{
    $etudiant = $this->getEtudiant();

    if (!$etudiant) {
        return response()->json([
            'success' => false,
            'message' => 'Profil étudiant non trouvé.',
        ], 404);
    }

    // Ajoute les valeurs par défaut pour heure_entree et heure_sortie
    $attendances = Presence::where('etudiant_id', $etudiant->id)
        ->orderBy('date', 'desc')
        ->get()
        ->map(function ($presence) {
            return [
                'id' => $presence->id,
                'date' => $presence->date,
                'statut' => $presence->statut,
                'remarque' => $presence->remarque,
                'heure_entree' => $presence->heure_entree ?? '08:00',
                'heure_sortie' => $presence->heure_sortie ?? '16:00',
            ];
        });

    return response()->json([
        'success' => true,
        'data' => $attendances,
    ]);
}
    /**
     * 9. Timetable
     */
   /**
 * 9. Timetable
 */
public function getTimetable()
{
    try {
        // Debug étape 1
        \Log::info('=== DEBUT TIMETABLE ===');

        // Vérifier l'authentification
        $user = auth('api')->user();
        \Log::info('User ID: ' . ($user ? $user->id : 'Non authentifié'));

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Non authentifié',
            ], 401);
        }

        // Récupérer l'étudiant
        $etudiant = $this->getEtudiant();
        \Log::info('Etudiant trouvé: ' . ($etudiant ? 'Oui' : 'Non'));

        if (!$etudiant) {
            return response()->json([
                'success' => false,
                'message' => 'Profil étudiant non trouvé.',
            ], 404);
        }

        \Log::info('Classe ID: ' . ($etudiant->classe_id ?? 'NULL'));

        // Si pas de classe, retourner tableau vide
        if (!$etudiant->classe_id) {
            return response()->json([
                'success' => true,
                'data' => [],
                'message' => 'Aucune classe assignée'
            ]);
        }

        // Récupérer les sessions
        $sessions = TimetableSession::where('classe_id', $etudiant->classe_id)->get();
        \Log::info('Nombre de sessions trouvées: ' . $sessions->count());

        if ($sessions->count() > 0) {
            \Log::info('Première session: ' . json_encode($sessions->first()->toArray()));
        }

        return response()->json([
            'success' => true,
            'data' => $sessions,
        ]);

    } catch (\Exception $e) {
        \Log::error('TIMETABLE ERROR: ' . $e->getMessage());
        \Log::error('File: ' . $e->getFile());
        \Log::error('Line: ' . $e->getLine());
        \Log::error('Trace: ' . $e->getTraceAsString());

        return response()->json([
            'success' => false,
            'message' => 'Erreur: ' . $e->getMessage(),
            'file' => basename($e->getFile()),
            'line' => $e->getLine()
        ], 500);
    }
}
    /**
     * 10. Update Settings
     */
    public function updateSettings(Request $request)
    {
        $user = auth('api')->user();

        $user->update($request->only([
            'nom',
            'prenom',
            'email',
            'phone',
            'adresse',
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Profil mis à jour avec succès.',
            'user'    => [
                'id'      => $user->id,
                'nom'     => $user->nom,
                'prenom'  => $user->prenom,
                'email'   => $user->email,
                'phone'   => $user->phone,
                'adresse' => $user->adresse,
            ],
        ]);
    }

    /**
     * 11. Payments
     */
    public function getPayments()
    {
        $etudiant = $this->getEtudiant();

        if (!$etudiant) {
            return response()->json([
                'success' => false,
                'message' => 'Profil étudiant non trouvé.',
            ], 404);
        }

        $data = Paiement::where('etudiant_id', $etudiant->id)
            ->orderBy('datePaiement', 'desc')
            ->get()
            ->map(function ($pay) {
                return [
                    'id'     => $pay->id,
                    'amount' => $pay->montant,
                    'date'   => \Carbon\Carbon::parse($pay->datePaiement)->format('d M, Y'),
                    'method' => $pay->ModePaiement,
                    'status' => $pay->statut,
                    'type'   => $pay->type,
                ];
            });

        return response()->json([
            'success' => true,
            'data'    => $data,
        ]);
    }
     /**
 * 12. Check current password
 */
public function checkPassword(Request $request)
{
    $user = auth('api')->user();

    $request->validate([
        'current_password' => 'required|string'
    ]);

    if (Hash::check($request->current_password, $user->password)) {
        return response()->json([
            'success' => true,
            'message' => 'Mot de passe correct'
        ]);
    }

    return response()->json([
        'success' => false,
        'message' => 'Mot de passe incorrect'
    ], 400);
}

/**
 * 13. Update password
 */
public function updatePassword(Request $request)
{
    $user = auth('api')->user();

    $request->validate([
        'current_password' => 'required|string',
        'password' => 'required|string|min:6|confirmed',
    ]);

    // Vérifier l'ancien mot de passe
    if (!Hash::check($request->current_password, $user->password)) {
        return response()->json([
            'success' => false,
            'message' => 'Le mot de passe actuel est incorrect'
        ], 400);
    }

    // Vérifier que le nouveau mot de passe est différent de l'ancien
    if (Hash::check($request->password, $user->password)) {
        return response()->json([
            'success' => false,
            'message' => 'Le nouveau mot de passe doit être différent de l\'ancien'
        ], 400);
    }

    // Mettre à jour le mot de passe
    $user->password = Hash::make($request->password);
    $user->save();

    return response()->json([
        'success' => true,
        'message' => 'Mot de passe mis à jour avec succès'
    ]);
}
/**
 * Téléverser un devoir
 */
public function uploadHomework(Request $request)
{
    try {
        $request->validate([
            'devoir_id' => 'required|exists:devoirs,id',
            'file' => 'required|file|mimes:pdf,doc,docx,zip,jpg,png|max:10240'
        ]);

        $etudiant = $this->getEtudiant();

        if (!$etudiant) {
            return response()->json([
                'success' => false,
                'message' => 'Étudiant non trouvé'
            ], 404);
        }

        // Créer le dossier si nécessaire
        $folder = storage_path('app/public/homeworks/' . $etudiant->id);
        if (!file_exists($folder)) {
            mkdir($folder, 0777, true);
        }

        $path = $request->file('file')->store('homeworks/' . $etudiant->id, 'public');

        $submission = \App\Models\DevoirSoumission::create([
            'devoir_id' => $request->devoir_id,
            'etudiant_id' => $etudiant->id,
            'fichier' => $path,
            'statut' => 'en_attente'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Devoir téléversé avec succès',
            'data' => $submission
        ], 200);

    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur de validation',
            'errors' => $e->errors()
        ], 422);
    } catch (\Exception $e) {
        \Log::error('Upload error: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}
/**
 * Voir mes soumissions
 */
public function getMySubmissions(Request $request)
{
    $etudiant = $this->getEtudiant();

    $submissions = DevoirSoumission::with('devoir')
        ->where('etudiant_id', $etudiant->id)
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json([
        'success' => true,
        'data' => $submissions
    ]);
}

/**
 * Supprimer une soumission
 */
public function deleteSubmission($id)
{
    $etudiant = $this->getEtudiant();

    $submission = DevoirSoumission::where('id', $id)
        ->where('etudiant_id', $etudiant->id)
        ->first();

    if (!$submission) {
        return response()->json([
            'success' => false,
            'message' => 'Soumission non trouvée'
        ], 404);
    }

    // Supprimer le fichier
    Storage::disk('public')->delete($submission->fichier);

    // Supprimer la base
    $submission->delete();

    return response()->json([
        'success' => true,
        'message' => 'Soumission supprimée'
    ]);
}


public function getActivityRegistrations()
{
    $etudiant = $this->getEtudiant();

    if (!$etudiant) {
        return response()->json([
            'success' => false,
            'message' => 'Étudiant non trouvé'
        ], 404);
    }

    $registrations = ActivityRegistration::where('etudiant_id', $etudiant->id)
        ->with('activity')
        ->get();

    return response()->json([
        'success' => true,
        'data' => $registrations
    ]);
}

/**
 * S'inscrire à une activité
 */
public function registerActivity(Request $request)
{
    try {
        $request->validate([
            'activity_id' => 'required|exists:activites,id'
        ]);

        $etudiant = $this->getEtudiant();

        if (!$etudiant) {
            return response()->json([
                'success' => false,
                'message' => 'Étudiant non trouvé'
            ], 404);
        }

        // Vérifier si déjà inscrit
        $exists = ActivityRegistration::where('etudiant_id', $etudiant->id)
            ->where('activity_id', $request->activity_id)
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Vous êtes déjà inscrit à cette activité'
            ], 400);
        }

        // Créer l'inscription
        $registration = ActivityRegistration::create([
            'etudiant_id' => $etudiant->id,
            'activity_id' => $request->activity_id,
            'date_inscription' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Inscription réussie !',
            'data' => $registration
        ], 200);

    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur de validation',
            'errors' => $e->errors()
        ], 422);
    } catch (\Exception $e) {
        \Log::error('Erreur registerActivity: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => 'Erreur lors de l\'inscription: ' . $e->getMessage()
        ], 500);
    }
}

/**
 * Annuler une inscription
 */
public function cancelActivityRegistration($id)
{
    $etudiant = $this->getEtudiant();

    $registration = ActivityRegistration::where('id', $id)
        ->where('etudiant_id', $etudiant->id)
        ->first();

    if (!$registration) {
        return response()->json([
            'success' => false,
            'message' => 'Inscription non trouvée'
        ], 404);
    }

    $registration->delete();

    return response()->json([
        'success' => true,
        'message' => 'Inscription annulée avec succès'
    ]);
}


/**
 * Justifier une absence (avec ou sans fichier)
 */
public function justifyAbsence(Request $request, $id)
{
    try {
        $request->validate([
            'reason' => 'required|string|min:5',
            'file' => 'nullable|file|mimes:pdf,jpg,png|max:5120'
        ]);

        $etudiant = $this->getEtudiant();

        if (!$etudiant) {
            return response()->json([
                'success' => false,
                'message' => 'Étudiant non trouvé'
            ], 404);
        }

        // Vérifier que la présence existe et appartient à l'étudiant
        $presence = Presence::where('id', $id)
            ->where('etudiant_id', $etudiant->id)
            ->first();

        if (!$presence) {
            return response()->json([
                'success' => false,
                'message' => 'Enregistrement de présence non trouvé'
            ], 404);
        }

        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('justifications/' . $etudiant->id, 'public');
        }

        // Créer la justification
        $justification = AbsenceJustification::create([
            'presence_id' => $presence->id,
            'etudiant_id' => $etudiant->id,
            'reason' => $request->reason,
            'file_path' => $filePath,
            'status' => 'en_attente',
            'submitted_at' => now()
        ]);

        // Mettre à jour la remarque dans la table presences
        $presence->update([
            'remarque' => $request->reason . ' (Justifié le ' . now()->format('d/m/Y') . ')'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Absence justifiée avec succès',
            'data' => $justification
        ], 200);

    } catch (\Exception $e) {
        \Log::error('Erreur justifyAbsence: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}

/**
 * Upload certificat médical pour une absence
 */
public function uploadMedicalCertificate(Request $request)
{
    try {
        // Accepter les deux noms: attendance_id ou presence_id
        $presenceId = $request->attendance_id ?? $request->presence_id;

        $request->validate([
            'file' => 'required|file|mimes:pdf,jpg,png|max:5120'
        ]);

        if (!$presenceId) {
            return response()->json([
                'success' => false,
                'message' => 'ID de présence requis'
            ], 400);
        }

        $etudiant = $this->getEtudiant();

        if (!$etudiant) {
            return response()->json([
                'success' => false,
                'message' => 'Étudiant non trouvé'
            ], 404);
        }

        // Vérifier que la présence existe et appartient à l'étudiant
        $presence = Presence::where('id', $presenceId)
            ->where('etudiant_id', $etudiant->id)
            ->first();

        if (!$presence) {
            return response()->json([
                'success' => false,
                'message' => 'Enregistrement de présence non trouvé'
            ], 404);
        }

        $filePath = $request->file('file')->store('medical_certificates/' . $etudiant->id, 'public');

        // Mettre à jour la remarque
        $presence->update([
            'remarque' => 'Certificat médical fourni le ' . now()->format('d/m/Y')
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Certificat médical téléchargé avec succès',
            'file_path' => $filePath
        ], 200);

    } catch (\Exception $e) {
        \Log::error('Erreur uploadMedicalCertificate: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}


public function requestLeave(Request $request)
{
    try {
        $request->validate([
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
            'reason' => 'required|string|min:5',
            'type' => 'required|string',
            'file' => 'nullable|file|mimes:pdf,jpg,png|max:5120'
        ]);

        $etudiant = $this->getEtudiant();

        if (!$etudiant) {
            return response()->json([
                'success' => false,
                'message' => 'Étudiant non trouvé'
            ], 404);
        }

        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('leaves/' . $etudiant->id, 'public');
        }

        // Convertir les dates en objets Carbon
        $startDate = \Carbon\Carbon::parse($request->start_date);
        $endDate = \Carbon\Carbon::parse($request->end_date);

        // Créer une entrée pour chaque jour entre start_date et end_date
        $currentDate = clone $startDate;
        $createdEntries = [];

        while ($currentDate <= $endDate) {
            // Vérifier si une entrée existe déjà pour cette date
            $existingPresence = Presence::where('etudiant_id', $etudiant->id)
                ->where('date', $currentDate->format('Y-m-d'))
                ->first();

            if (!$existingPresence) {
                // Créer une nouvelle entrée
                $presence = Presence::create([
                    'etudiant_id' => $etudiant->id,
                    'date' => $currentDate->format('Y-m-d'),
                    'statut' => 'Absent',
                    'remarque' => 'Congé demandé',
                    'is_leave' => true,
                    'leave_type' => $request->type,
                    'leave_reason' => $request->reason,
                    'leave_file' => $filePath,
                    'leave_status' => 'en_attente',
                    'heure_entree' => null,
                    'heure_sortie' => null
                ]);
                $createdEntries[] = $presence;
            } else {
                // Mettre à jour l'entrée existante
                $existingPresence->update([
                    'is_leave' => true,
                    'leave_type' => $request->type,
                    'leave_reason' => $request->reason,
                    'leave_file' => $filePath,
                    'leave_status' => 'en_attente',
                    'statut' => 'Absent'
                ]);
                $createdEntries[] = $existingPresence;
            }

            $currentDate->addDay();
        }

        return response()->json([
            'success' => true,
            'message' => 'Demande de congé envoyée avec succès pour ' . count($createdEntries) . ' jour(s)',
            'data' => $createdEntries
        ], 200);

    } catch (\Exception $e) {
        \Log::error('Erreur requestLeave: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}
/**
 * Récupérer les demandes de congé de l'étudiant
 */
public function getMyLeaveRequests()
{
    $etudiant = $this->getEtudiant();

    if (!$etudiant) {
        return response()->json([
            'success' => false,
            'message' => 'Étudiant non trouvé'
        ], 404);
    }

    // Récupérer toutes les demandes de congé (entrées avec is_leave = true)
    $leaveRequests = Presence::where('etudiant_id', $etudiant->id)
        ->where('is_leave', true)
        ->orderBy('date', 'desc')
        ->get()
        ->map(function ($presence) {
            return [
                'id' => $presence->id,
                'date' => $presence->date,
                'leave_type' => $presence->leave_type,
                'reason' => $presence->leave_reason,
                'status' => $presence->leave_status ?? 'en_attente',
                'file' => $presence->leave_file,
                'created_at' => $presence->created_at,
            ];
        });

    return response()->json([
        'success' => true,
        'data' => $leaveRequests
    ]);
}


public function getBooks()
{
    try {
        $books = \App\Models\Book::all();
        return response()->json([
            'success' => true,
            'data' => $books
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}

/**
 * Increment book download count
 */
public function incrementBookDownload($id)
{
    try {
        $book = \App\Models\Book::findOrFail($id);
        $book->increment('downloads');
        return response()->json([
            'success' => true,
            'downloads' => $book->downloads
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}

/**
 * Get all tutorials
 */
public function getTutorials()
{
    try {
        $tutorials = \App\Models\Tutorial::all();
        return response()->json([
            'success' => true,
            'data' => $tutorials
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}

/**
 * Get single tutorial
 */
public function getTutorial($id)
{
    try {
        $tutorial = \App\Models\Tutorial::findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $tutorial
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Tutorial not found'
        ], 404);
    }
}

/**
 * Increment tutorial view count
 */
public function incrementTutorialView($id)
{
    try {
        $tutorial = \App\Models\Tutorial::findOrFail($id);
        $tutorial->increment('views');
        return response()->json([
            'success' => true,
            'views' => $tutorial->views
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}

/**
 * Récupérer les conversations de l'étudiant
 */
public function getConversations()
{
    $user = auth('api')->user();

    $conversations = Conversation::where('user_one_id', $user->id)
        ->orWhere('user_two_id', $user->id)
        ->with(['userOne', 'userTwo'])
        ->orderBy('updated_at', 'desc')
        ->get()
        ->map(function($conv) use ($user) {
            $otherUser = $conv->user_one_id == $user->id ? $conv->userTwo : $conv->userOne;
            $unread = $conv->user_one_id == $user->id ? $conv->user_one_unread : $conv->user_two_unread;

            return [
                'id' => $conv->id,
                'name' => $otherUser->prenom . ' ' . $otherUser->nom,
                'role' => $otherUser->role === 'admin' ? 'Administrateur' : ($otherUser->role === 'professeur' ? 'Formateur' : 'Étudiant'),
                'avatar' => substr($otherUser->prenom, 0, 1) . substr($otherUser->nom, 0, 1),
                'lastMessage' => $conv->last_message ?? 'Nouvelle conversation',
                'time' => $conv->last_message_time ? \Carbon\Carbon::parse($conv->last_message_time)->diffForHumans() : 'Nouveau',
                'unread' => $unread,
                'online' => false,
            ];
        });

    return response()->json(['success' => true, 'data' => $conversations]);
}

/**
 * Récupérer les messages d'une conversation
 */
public function getMessages($id)
{
    $user = auth('api')->user();

    $conversation = Conversation::findOrFail($id);

    // Marquer les messages comme lus
    if ($conversation->user_one_id == $user->id) {
        $conversation->update(['user_one_unread' => 0]);
    } else {
        $conversation->update(['user_two_unread' => 0]);
    }

    $messages = Message::where('conversation_id', $id)
        ->orderBy('created_at', 'asc')
        ->get()
        ->map(function($msg) use ($user) {
            return [
                'id' => $msg->id,
                'text' => $msg->message,
                'sender' => $msg->sender_id == $user->id ? 'me' : 'other',
                'time' => \Carbon\Carbon::parse($msg->created_at)->format('H:i'),
                'isMe' => $msg->sender_id == $user->id,
            ];
        });

    return response()->json(['success' => true, 'data' => $messages]);
}

/**
 * Envoyer un message
 */
public function sendMessage(Request $request, $id)
{
    $request->validate([
        'message' => 'required|string|min:1|max:1000'
    ]);

    $user = auth('api')->user();
    $conversation = Conversation::findOrFail($id);

    $message = Message::create([
        'conversation_id' => $id,
        'sender_id' => $user->id,
        'message' => $request->message,
        'is_read' => false,
    ]);

    // Mettre à jour la conversation
    $conversation->update([
        'last_message' => $request->message,
        'last_message_time' => now(),
    ]);

    // Incrémenter le compteur non lu pour l'autre utilisateur
    if ($conversation->user_one_id == $user->id) {
        $conversation->increment('user_two_unread');
    } else {
        $conversation->increment('user_one_unread');
    }

    return response()->json([
        'success' => true,
        'data' => [
            'id' => $message->id,
            'text' => $message->message,
            'sender' => 'me',
            'time' => now()->format('H:i'),
            'isMe' => true,
        ]
    ], 201);
}
/**
 * Modifier un message
 */
public function updateMessage(Request $request, $id)
{
    try {
        $request->validate([
            'message' => 'required|string|min:1|max:1000'
        ]);

        $user = auth('api')->user();
        $message = Message::where('id', $id)->where('sender_id', $user->id)->first();

        if (!$message) {
            return response()->json([
                'success' => false,
                'message' => 'Message non trouvé ou non autorisé'
            ], 404);
        }

        $message->update([
            'message' => $request->message
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $message->id,
                'text' => $message->message,
                'time' => \Carbon\Carbon::parse($message->created_at)->format('H:i'),
                'isMe' => true,
            ]
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}

/**
 * Supprimer un message
 */
public function deleteMessage($id)
{
    try {
        $user = auth('api')->user();
        $message = Message::where('id', $id)->where('sender_id', $user->id)->first();

        if (!$message) {
            return response()->json([
                'success' => false,
                'message' => 'Message non trouvé ou non autorisé'
            ], 404);
        }

        $message->delete();

        return response()->json([
            'success' => true,
            'message' => 'Message supprimé avec succès'
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}
/**
 * Formulaire de contact support
 */

public function contactSupport(Request $request)
{
    try {
        $request->validate([
            'name' => 'required|string|min:2|max:100',
            'email' => 'required|email|max:100',
            'subject' => 'required|string|min:3|max:200',
            'message' => 'required|string|min:10|max:5000'
        ]);

        // Sauvegarder dans la base de données
        $contact = ContactMessage::create([
            'name' => $request->name,
            'email' => $request->email,
            'subject' => $request->subject,
            'message' => $request->message,
            'user_id' => auth('api')->id(),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'is_read' => false,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.',
            'data' => $contact
        ], 200);

    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur de validation',
            'errors' => $e->errors()
        ], 422);
    } catch (\Exception $e) {
        \Log::error('Erreur contact support: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => 'Une erreur est survenue. Veuillez réessayer plus tard.'
        ], 500);
    }
}


public function downloadPDF($id)
{
    try {
        $homework = Devoir::find($id);

        if (!$homework) {
            return response()->json(['success' => false, 'message' => 'Devoir non trouvé'], 404);
        }

        if (empty($homework->pdf_path) || $homework->pdf_path === 'NULL') {
            return response()->json(['success' => false, 'message' => 'Aucun PDF pour ce devoir'], 404);
        }

        // ✅ FIX: chercher dans storage/app/public/
        $relativePath = str_replace('storage/', '', $homework->pdf_path);
        $fullPath = storage_path('app/public/' . $relativePath);

        if (!file_exists($fullPath)) {
            return response()->json(['success' => false, 'message' => 'Fichier introuvable: ' . $fullPath], 404);
        }

        return response()->file($fullPath, [
            'Content-Type'        => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . $homework->pdf_filename . '"',
            'Access-Control-Allow-Origin' => '*',
        ]);

    } catch (\Exception $e) {
        return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
    }
}
 public function generateHomeworkPDF(Request $request, $id)
{
    try {
        $homework = Devoir::find($id);

        if (!$homework) {
            return response()->json([
                'success' => false,
                'message' => 'Devoir non trouvé'
            ], 404);
        }

        // ✅ التحقق الصحيح من وجود PDF
        if (!empty($homework->pdf_path) && $homework->pdf_path !== 'NULL') {

            // بناء الرابط الصحيح
            $pdfUrl = asset($homework->pdf_path);

            return response()->json([
                'success' => true,
                'pdf_url' => $pdfUrl,
                'message' => 'PDF trouvé'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Aucun PDF trouvé pour ce devoir'
        ], 404);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}
/**
 * Download book PDF
 */
public function downloadBook($id)
{
    try {
        $book = \App\Models\Book::findOrFail($id);

        if (empty($book->file_path)) {
            return response()->json([
                'success' => false,
                'message' => 'Fichier non trouvé pour ce livre'
            ], 404);
        }

        // Incrémenter le compteur de téléchargements
        $book->increment('downloads');

        // Déterminer le chemin complet
        $fullPath = public_path($book->file_path);

        // Si le fichier n'existe pas dans public, chercher dans storage
        if (!file_exists($fullPath)) {
            $fullPath = storage_path('app/public/' . str_replace('storage/', '', $book->file_path));
        }

        if (!file_exists($fullPath)) {
            return response()->json([
                'success' => false,
                'message' => 'Fichier PDF introuvable sur le serveur'
            ], 404);
        }

        return response()->file($fullPath, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . ($book->file_name ?? $book->title . '.pdf') . '"',
            'Access-Control-Allow-Origin' => '*',
        ]);

    } catch (\Exception $e) {
        \Log::error('Erreur downloadBook: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}

/**
 * Get books by category
 */
public function getBooksByCategory($category)
{
    try {
        $books = \App\Models\Book::where('category', $category)->get();
        return response()->json([
            'success' => true,
            'data' => $books
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}

/**
 * Search books
 */
public function searchBooks(Request $request)
{
    try {
        $query = $request->get('q', '');
        $books = \App\Models\Book::where('title', 'like', "%{$query}%")
            ->orWhere('author', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->get();

        return response()->json([
            'success' => true,
            'data' => $books
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}

/**
 * Get featured books
 */
public function getFeaturedBooks()
{
    try {
        $books = \App\Models\Book::orderBy('downloads', 'desc')
            ->orderBy('views', 'desc')
            ->limit(6)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $books
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}

/**
 * Increment book view count
 */
public function incrementBookView($id)
{
    try {
        $book = \App\Models\Book::findOrFail($id);
        $book->increment('views');

        return response()->json([
            'success' => true,
            'views' => $book->views
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}



}
