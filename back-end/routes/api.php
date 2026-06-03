<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\TransportController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\NiveauScolaireController;
use App\Http\Controllers\FiliereController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\FormateurController;
use App\Http\Controllers\EmploiController;
use App\Http\Controllers\MatiereController;

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

Route::middleware('auth:api')->resource('/etudiants', EtudiantController::class);
Route::middleware('auth:api')->resource('/formateurs', FormateurController::class);
Route::middleware('auth:api')->resource('/transports', TransportController::class);
Route::middleware('auth:api')->resource('/classes', ClasseController::class);
Route::middleware('auth:api')->get('/classes/{id}/etudiants',[ClasseController::class, 'etudiants']);
Route::middleware('auth:api')->get('/classes/{id}/formateurs',[ClasseController::class, 'formateurs']);
Route::middleware('auth:api')->resource('/niveauscolaires', NiveauScolaireController::class);
Route::middleware('auth:api')->resource('/filieres', FiliereController::class);
Route::middleware('auth:api')->resource('/salles', SalleController::class);
Route::middleware('auth:api')->resource('/emplois', EmploiController::class);
Route::middleware('auth:api')->resource('/matieres', MatiereController::class);
Route::middleware('auth:api')->get('/emplois/classe/{id}',[EmploiController::class, 'index']);
Route::middleware('auth:api')->get('/stats/classes-by-niveau',[ClasseController::class, 'classesByNiveau']);