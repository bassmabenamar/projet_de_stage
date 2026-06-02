<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
use App\Http\Controllers\Teacher\AnnouncementController;
use App\Http\Controllers\Teacher\DashboardController;
use App\Http\Controllers\Teacher\AttendanceController;
use App\Http\Controllers\Teacher\NoteController;
use App\Http\Controllers\Teacher\HomeworkController;
use App\Http\Controllers\Teacher\MessageController;
use App\Http\Controllers\Teacher\ProfileController;
use App\Http\Controllers\Teacher\ClasseController;
use App\Http\Controllers\Teacher\RessourceController;
use App\Http\Controllers\Teacher\SubmissionController;
use App\Http\Controllers\Teacher\TimeTableController;
use App\Http\Controllers\Teacher\TaskController;
use App\Http\Controllers\Teacher\FiliereController;
use App\Http\Controllers\Teacher\FileController;
use App\Http\Controllers\Teacher\NiveauController;
use App\Http\Controllers\Teacher\FolderController;
use App\Http\Controllers\Teacher\StatsController;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', 'teacher'])
    ->prefix('teacher')
    ->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'index']);

        Route::post('/dashboard/classes', [DashboardController::class, 'createClass']);
        Route::post('/dashboard/announcements', [DashboardController::class, 'postAnnouncement']);
        
        Route::get('/attendance', [AttendanceController::class, 'index']);
Route::post('/attendance', [AttendanceController::class, 'store']);

Route::get('/attendance/class/{classId}/date/{date}', [AttendanceController::class, 'getClassAttendance']);

Route::post('/attendance/update', [AttendanceController::class, 'update']);

Route::post('/attendance/remark', [AttendanceController::class, 'saveRemark']);

Route::get('/attendance/summary/{classId}', [AttendanceController::class, 'summary']); // optionnel
    

 // GRADES (Notes)
Route::get('/grades/{classId}', [NoteController::class, 'index']);
Route::post('/grades/update', [NoteController::class, 'update']);
Route::post('/grades/import/{classId}', [NoteController::class, 'import']);
Route::post('/grades/publish/{classId}', [NoteController::class, 'publish']);

   // Niveaux
    Route::get('/niveaux', [NiveauController::class, 'index']);
    Route::get('/niveaux/{id}/classes', [NiveauController::class, 'classes']);

    // Filières
    Route::get('/filieres', [FiliereController::class, 'index']);
    Route::get('/filieres/{id}/classes', [FiliereController::class, 'classes']);

    // Classes
    Route::get('/classes', [ClasseController::class, 'index']);
    Route::get('/classes/stats', [ClasseController::class, 'stats']);

Route::get('/homeworks', [HomeworkController::class, 'index']);

Route::get('/homeworks/{id}', [HomeworkController::class, 'show']);

Route::post('/homeworks', [HomeworkController::class, 'store']);

Route::put('/homeworks/{id}', [HomeworkController::class, 'update']);

Route::delete('/homeworks/{id}', [HomeworkController::class, 'destroy']);
Route::get('/classes', [HomeworkController::class, 'classes']);

        Route::get('/messages', [MessageController::class, 'index']);
        Route::post('/messages', [MessageController::class, 'store']);

        Route::get('/profile', [ProfileController::class, 'index']);
        Route::put('/profile', [ProfileController::class, 'update']);

        Route::get('/resources', [RessourceController::class, 'index']);
        Route::post('/resources', [RessourceController::class, 'store']);

        Route::get('/submissions', [SubmissionController::class, 'index']);

        Route::get('/timetable', [TimeTableController::class, 'index']);
      
        Route::get('/announcements', [AnnouncementController::class, 'index']);


        Route::get('/tasks', [TaskController::class, 'index']);

        Route::post('/tasks', [TaskController::class, 'store']);

        Route::put('/tasks/{id}', [TaskController::class, 'update']);

        Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);

        Route::get('/tasks/{id}', [TaskController::class, 'show']);


        Route::get('/folders', [FolderController::class, 'index']);
Route::post('/folders', [FolderController::class, 'store']);
Route::delete('/folders/{id}', [FolderController::class, 'destroy']);
Route::get('/folders/{id}/files', [FolderController::class, 'files']);

Route::get('/files/root', [FileController::class, 'root']);
Route::post('/files', [FileController::class, 'store']);
Route::delete('/files/{id}', [FileController::class, 'destroy']);

Route::get('/resources/stats', [StatsController::class, 'index']);
Route::get('/dashboard/advanced', [DashboardController::class, 'index']);
});