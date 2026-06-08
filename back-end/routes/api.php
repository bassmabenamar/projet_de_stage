<?php

use Illuminate\Support\Facades\Route;

// ─── Controllers ─────────────────────────────────────────────────────────────
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TransportController;
use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\MatiereController;
use App\Http\Controllers\RemarqueController;
use App\Http\Controllers\CaisseOperationController;
use App\Http\Controllers\NiveauController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\FiliereController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\FormateurController;
use App\Http\Controllers\TimetableSessionController;

// ─── Test ─────────────────────────────────────────────────────────────────────
Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

// ─── Public ───────────────────────────────────────────────────────────────────
Route::post('/login', [AuthController::class, 'login']);
Route::post('/contact-support', [StudentController::class, 'contactSupport']);

Route::prefix('home')->group(function () {
    Route::get('/stats',       [HomeController::class, 'getStats']);
    Route::get('/actualites',  [HomeController::class, 'getActualites']);
    Route::get('/temoignages', [HomeController::class, 'getTemoignages']);
    Route::post('/newsletter', [HomeController::class, 'subscribeNewsletter']);
    Route::post('/contact',    [HomeController::class, 'contact']);
});

// ─── Protected ────────────────────────────────────────────────────────────────
Route::middleware('auth:api')->group(function () {

    // Auth
    Route::post('/logout',       [AuthController::class, 'logout']);
    Route::get('/me',            [AuthController::class, 'me']);
    Route::post('/auth/refresh', [AuthController::class, 'refresh']);

    // Profile
    Route::put('/profile',                 [ProfileController::class, 'updateProfile']);
    Route::put('/profile/change-password', [ProfileController::class, 'changePassword']);

    // Users
    Route::get('/user',  [ChatController::class, 'getCurrentUser']);
    Route::get('/users', [UserController::class, 'index']);

    // ── Student ───────────────────────────────────────────────────────────────
    Route::prefix('student')->group(function () {
        Route::get('/dashboard',                   [StudentController::class, 'getDashboard']);
        Route::get('/activites',                   [StudentController::class, 'getActivites']);
        Route::get('/notifications',               [StudentController::class, 'getNotifications']);
        Route::post('/notifications/{id}/read',    [StudentController::class, 'markNotificationAsRead']);
        Route::post('/notifications/read-all',     [StudentController::class, 'markAllNotificationsAsRead']);
        Route::delete('/notifications/{id}',       [StudentController::class, 'deleteNotification']);
        Route::post('/notifications',              [StudentController::class, 'createNotification']);
        Route::get('/messages',                    [StudentController::class, 'getMessages']);
        Route::get('/profile',                     [StudentController::class, 'getProfile']);
        Route::get('/homeworks',                   [StudentController::class, 'getHomeworks']);
        Route::get('/grades',                      [StudentController::class, 'getGrades']);
        Route::get('/timetable',                   [StudentController::class, 'getTimetable']);
        Route::post('/settings/update',            [StudentController::class, 'updateSettings']);
        Route::get('/payments',                    [StudentController::class, 'getPayments']);
        Route::post('/check-password',             [StudentController::class, 'checkPassword']);
        Route::post('/update-password',            [StudentController::class, 'updatePassword']);
        Route::post('/homework/upload',            [StudentController::class, 'uploadHomework']);
        Route::get('/homework/submissions',        [StudentController::class, 'getMySubmissions']);
        Route::delete('/homework/submission/{id}', [StudentController::class, 'deleteSubmission']);
        Route::get('/activity-registrations',      [StudentController::class, 'getActivityRegistrations']);
        Route::post('/activity-register',          [StudentController::class, 'registerActivity']);
        Route::get('/attendance',                  [StudentController::class, 'getAttendance']);
        Route::post('/attendance/{id}/justify',    [StudentController::class, 'justifyAbsence']);
        Route::post('/upload-medical-certificate', [StudentController::class, 'uploadMedicalCertificate']);
        Route::post('/leave-request',              [StudentController::class, 'requestLeave']);
        Route::get('/my-leave-requests',           [StudentController::class, 'getMyLeaveRequests']);

        // Tutorials
        Route::get('/tutorials',              [StudentController::class, 'getTutorials']);
        Route::get('/tutorials/{id}',         [StudentController::class, 'getTutorial']);
        Route::post('/tutorials/{id}/view',   [StudentController::class, 'incrementTutorialView']);

        // Conversations
        Route::get('/conversations',                       [StudentController::class, 'getConversations']);
        Route::get('/conversations/{id}/messages',         [StudentController::class, 'getMessages']);
        Route::post('/conversations/{id}/messages',        [StudentController::class, 'sendMessage']);
        Route::put('/messages/{id}',                       [StudentController::class, 'updateMessage']);
        Route::delete('/messages/{id}',                    [StudentController::class, 'deleteMessage']);

        // Homework PDF
        Route::get('/homework/{id}/download-pdf',  [StudentController::class, 'downloadPDF']);
        Route::post('/homework/{id}/generate-pdf', [StudentController::class, 'generateHomeworkPDF']);

        // Books
        Route::get('/books',                       [StudentController::class, 'getBooks']);
        Route::get('/books/featured',              [StudentController::class, 'getFeaturedBooks']);
        Route::get('/books/category/{category}',   [StudentController::class, 'getBooksByCategory']);
        Route::get('/books/search',                [StudentController::class, 'searchBooks']);
        Route::get('/books/{id}',                  [StudentController::class, 'getBook']);
        Route::get('/books/{id}/download',         [StudentController::class, 'downloadBook']);
        Route::post('/books/{id}/view',            [StudentController::class, 'incrementBookView']);
    });

    // ── Etudiants ─────────────────────────────────────────────────────────────
    Route::get('/etudiants',          [EtudiantController::class, 'index']);
    Route::get('/etudiants/{id}',     [EtudiantController::class, 'show']);
    Route::post('/etudiants',         [EtudiantController::class, 'store']);
    Route::put('/etudiants/{id}',     [EtudiantController::class, 'update']);
    Route::delete('/etudiants/{id}',  [EtudiantController::class, 'destroy']);

    // ── Formateurs ────────────────────────────────────────────────────────────
    Route::get('/formateurs',         [FormateurController::class, 'index']);
    Route::get('/formateurs/{id}',    [FormateurController::class, 'show']);
    Route::post('/formateurs',        [FormateurController::class, 'store']);
    Route::put('/formateurs/{id}',    [FormateurController::class, 'update']);
    Route::delete('/formateurs/{id}', [FormateurController::class, 'destroy']);

    // ── Classes ───────────────────────────────────────────────────────────────
    Route::get('/classes',                    [ClasseController::class, 'index']);
    Route::get('/classes/{id}',               [ClasseController::class, 'show']);
    Route::post('/classes',                   [ClasseController::class, 'store']);
    Route::put('/classes/{id}',               [ClasseController::class, 'update']);
    Route::delete('/classes/{id}',            [ClasseController::class, 'destroy']);
    Route::get('/classes/{id}/etudiants',     [ClasseController::class, 'etudiants']);
    Route::get('/classes/{id}/formateurs',    [ClasseController::class, 'formateurs']);

    // ── Stats ─────────────────────────────────────────────────────────────────
    Route::get('/stats/classes-by-niveau', [ClasseController::class, 'classesByNiveau']);

    // ── Niveaux Scolaires ─────────────────────────────────────────────────────

    // ── Niveaux ───────────────────────────────────────────────────────────────
    Route::get('/niveaux',          [NiveauController::class, 'index']);
    Route::get('/niveaux/{id}',     [NiveauController::class, 'show']);
    Route::post('/niveaux',         [NiveauController::class, 'store']);
    Route::put('/niveaux/{id}',     [NiveauController::class, 'update']);
    Route::delete('/niveaux/{id}',  [NiveauController::class, 'destroy']);

    // ── Filieres ──────────────────────────────────────────────────────────────
    Route::get('/filieres',         [FiliereController::class, 'index']);
    Route::get('/filieres/{id}',    [FiliereController::class, 'show']);
    Route::post('/filieres',        [FiliereController::class, 'store']);
    Route::put('/filieres/{id}',    [FiliereController::class, 'update']);
    Route::delete('/filieres/{id}', [FiliereController::class, 'destroy']);

    // ── Salles ────────────────────────────────────────────────────────────────
    Route::get('/salles',           [SalleController::class, 'index']);
    Route::get('/salles/{id}',      [SalleController::class, 'show']);
    Route::post('/salles',          [SalleController::class, 'store']);
    Route::put('/salles/{id}',      [SalleController::class, 'update']);
    Route::delete('/salles/{id}',   [SalleController::class, 'destroy']);

    // ── Timetable ─────────────────────────────────────────────────────────────
    Route::get('/timetable',        [TimetableSessionController::class, 'index']);
    Route::post('/timetable',       [TimetableSessionController::class, 'store']);
    Route::put('/timetable/{id}',   [TimetableSessionController::class, 'update']);
    Route::delete('/timetable/{id}', [TimetableSessionController::class, 'destroy']);

    // ── Matieres ──────────────────────────────────────────────────────────────
    Route::prefix('matieres')->group(function () {
        Route::get('/',        [MatiereController::class, 'index']);
        Route::post('/',       [MatiereController::class, 'store']);
        Route::get('/stats',   [MatiereController::class, 'stats']);
        Route::get('/{id}',    [MatiereController::class, 'show']);
        Route::put('/{id}',    [MatiereController::class, 'update']);
        Route::delete('/{id}', [MatiereController::class, 'destroy']);
    });

    // ── Activites ─────────────────────────────────────────────────────────────
    Route::prefix('activites')->group(function () {
        Route::get('/',                   [ActiviteController::class, 'index']);
        Route::post('/',                  [ActiviteController::class, 'store']);
        Route::get('/stats',              [ActiviteController::class, 'stats']);
        Route::get('/upcoming',           [ActiviteController::class, 'upcoming']);
        Route::get('/current',            [ActiviteController::class, 'current']);
        Route::post('/bulk-delete',       [ActiviteController::class, 'bulkDelete']);
        Route::get('/{id}',               [ActiviteController::class, 'show']);
        Route::put('/{id}',               [ActiviteController::class, 'update']);
        Route::delete('/{id}',            [ActiviteController::class, 'destroy']);
        Route::post('/{id}/upload-image', [ActiviteController::class, 'uploadImage']);
    });

    // ── Transports ────────────────────────────────────────────────────────────
    Route::prefix('transports')->group(function () {
        Route::get('/',             [TransportController::class, 'index']);
        Route::post('/',            [TransportController::class, 'store']);
        Route::get('/stats',        [TransportController::class, 'stats']);
        Route::post('/bulk-delete', [TransportController::class, 'bulkDelete']);
        Route::get('/{id}',         [TransportController::class, 'show']);
        Route::put('/{id}',         [TransportController::class, 'update']);
        Route::delete('/{id}',      [TransportController::class, 'destroy']);
    });

    // ── Paiements ─────────────────────────────────────────────────────────────
    Route::get('/paiements',                     [PaiementController::class, 'index']);
    Route::get('/paiements/{id}',                [PaiementController::class, 'show']);
    Route::post('/paiements',                    [PaiementController::class, 'store']);
    Route::put('/paiements/{id}',                [PaiementController::class, 'update']);
    Route::patch('/paiements/{id}/marquer-paye', [PaiementController::class, 'marquerPaye']);
    Route::delete('/paiements/{id}',             [PaiementController::class, 'destroy']);

    // ── Remarques ─────────────────────────────────────────────────────────────
    Route::prefix('remarques')->group(function () {
        Route::get('/',        [RemarqueController::class, 'index']);
        Route::post('/',       [RemarqueController::class, 'store']);
        Route::get('/stats',   [RemarqueController::class, 'stats']);
        Route::get('/{id}',    [RemarqueController::class, 'show']);
        Route::put('/{id}',    [RemarqueController::class, 'update']);
        Route::delete('/{id}', [RemarqueController::class, 'destroy']);
    });

    // ── Caisse ────────────────────────────────────────────────────────────────
    Route::get('/caisse',          [CaisseOperationController::class, 'index']);
    Route::post('/caisse',         [CaisseOperationController::class, 'store']);
    Route::delete('/caisse/{id}',  [CaisseOperationController::class, 'destroy']);

    // ── Chat ──────────────────────────────────────────────────────────────────
    Route::get('/conversations',                           [ChatController::class, 'getConversations']);
    Route::post('/conversations',                          [ChatController::class, 'createConversation']);
    Route::get('/conversations/{id}',                      [ChatController::class, 'getConversation']);
    Route::get('/conversations/{conversationId}/messages', [ChatController::class, 'getMessages']);
    Route::post('/conversations/{conversationId}/mark-read', [ChatController::class, 'markAsRead']);
    Route::post('/messages',                               [ChatController::class, 'sendMessage']);

});