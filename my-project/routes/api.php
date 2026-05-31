<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\UserController;
    use App\Http\Controllers\TransportController;
use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\MatiereController;
    use App\Http\Controllers\RemarqueController;
    use App\Http\Controllers\CaisseOperationController;
    use App\Http\Controllers\NiveauController;
    use App\Http\Controllers\ChatController;



;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middl
eware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);

Route::get('/me', [AuthController::class, 'me']);

Route::put('/profile', [ProfileController::class, 'updateProfile']);

Route::put('/profile/change-password', [ProfileController::class, 'changePassword']);

   Route::get('/paiements',                      [PaiementController::class, 'index']);
    Route::get('/paiements/{id}',                 [PaiementController::class, 'show']);
    Route::post('/paiements',                     [PaiementController::class, 'store']);
    Route::put('/paiements/{id}',                 [PaiementController::class, 'update']);
    Route::patch('/paiements/{id}/marquer-paye',  [PaiementController::class, 'marquerPaye']);
    Route::delete('/paiements/{id}',              [PaiementController::class, 'destroy']);


// في ملف routes/api.php — أضف هذه المسارات


Route::middleware('jwt.auth')->group(function () {

    // المستخدم الحالي
    Route::get('/user',    [ChatController::class, 'getCurrentUser']);

    // قائمة المستخدمين (مع فلتر role)
    Route::get('/users',   [ChatController::class, 'getUsers']);

    // المحادثات
    Route::get('/conversations',                               [ChatController::class, 'getConversations']);
    Route::post('/conversations',                              [ChatController::class, 'createConversation']);
    Route::get('/conversations/{id}',                          [ChatController::class, 'getConversation']);
    Route::get('/conversations/{conversationId}/messages',     [ChatController::class, 'getMessages']);
    Route::post('/conversations/{conversationId}/mark-read',   [ChatController::class, 'markAsRead']);

    // إرسال رسالة
    Route::post('/messages',                                   [ChatController::class, 'sendMessage']);
});

// Caisse (nouveau)
Route::get('/caisse',                       [CaisseOperationController::class, 'index']);
Route::post('/caisse',                      [CaisseOperationController::class, 'store']);
Route::delete('/caisse/{id}',               [CaisseOperationController::class, 'destroy']);
    Route::get('/users', [UserController::class, 'index']);



// Remarques routes
Route::prefix('remarques')->group(function () {
    Route::get('/', [RemarqueController::class, 'index']);
    Route::post('/', [RemarqueController::class, 'store']);
    Route::get('/stats', [RemarqueController::class, 'stats']);
    Route::get('/{id}', [RemarqueController::class, 'show']);
    Route::put('/{id}', [RemarqueController::class, 'update']);
    Route::delete('/{id}', [RemarqueController::class, 'destroy']);
});
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/
Route::get('/niveaux',         [NiveauController::class, 'index']);
Route::get('/niveaux/{id}',    [NiveauController::class, 'show']);
Route::post('/niveaux',        [NiveauController::class, 'store']);
Route::put('/niveaux/{id}',    [NiveauController::class, 'update']);
Route::delete('/niveaux/{id}', [NiveauController::class, 'destroy']);


// Matieres routes
Route::prefix('matieres')->group(function () {
    Route::get('/', [MatiereController::class, 'index']);
    Route::post('/', [MatiereController::class, 'store']);
    Route::get('/stats', [MatiereController::class, 'stats']);
    Route::get('/{id}', [MatiereController::class, 'show']);
    Route::put('/{id}', [MatiereController::class, 'update']);
    Route::delete('/{id}', [MatiereController::class, 'destroy']);
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Activity routes
Route::prefix('activites')->group(function () {
    Route::get('/', [ActiviteController::class, 'index']);              // GET /api/activites
    Route::post('/', [ActiviteController::class, 'store']);             // POST /api/activites
    Route::get('/stats', [ActiviteController::class, 'stats']);         // GET /api/activites/stats
    Route::get('/upcoming', [ActiviteController::class, 'upcoming']);   // GET /api/activites/upcoming
    Route::get('/current', [ActiviteController::class, 'current']);     // GET /api/activites/current
    Route::post('/bulk-delete', [ActiviteController::class, 'bulkDelete']); // POST /api/activites/bulk-delete
    Route::get('/{id}', [ActiviteController::class, 'show']);           // GET /api/activites/{id}
    Route::put('/{id}', [ActiviteController::class, 'update']);         // PUT /api/activites/{id}
    Route::delete('/{id}', [ActiviteController::class, 'destroy']);     // DELETE /api/activites/{id}
    Route::post('/{id}/upload-image', [ActiviteController::class, 'uploadImage']); // POST /api/activites/{id}/upload-image
});

// Transport routes
Route::prefix('transports')->group(function () {
    Route::get('/', [TransportController::class, 'index']);           // GET /api/transports
    Route::post('/', [TransportController::class, 'store']);          // POST /api/transports
    Route::get('/stats', [TransportController::class, 'stats']);      // GET /api/transports/stats
    Route::post('/bulk-delete', [TransportController::class, 'bulkDelete']); // POST /api/transports/bulk-delete
    Route::get('/{id}', [TransportController::class, 'show']);        // GET /api/transports/{id}
    Route::put('/{id}', [TransportController::class, 'update']);      // PUT /api/transports/{id}
    Route::delete('/{id}', [TransportController::class, 'destroy']);  // DELETE /api/transports/{id}
});
Route::middleware('jwt.auth')->group(function () {
 
    
});