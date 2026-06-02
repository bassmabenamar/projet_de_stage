<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\HomeController;

// Test
Route::get('/test', function() {
    return response()->json(['message' => 'API is working']);
});

// Public
Route::post('/login', [AuthController::class, 'login']);
Route::post('/contact-support', [StudentController::class, 'contactSupport']);
// Protected
Route::middleware('auth:api')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // Student
   Route::prefix('student')->group(function () {
    Route::get('/dashboard',        [StudentController::class, 'getDashboard']);
    Route::get('/activites',        [StudentController::class, 'getActivites']);
    Route::get('/notifications', [StudentController::class, 'getNotifications']);
    Route::post('/notifications/{id}/read', [StudentController::class, 'markNotificationAsRead']);
    Route::post('/notifications/read-all', [StudentController::class, 'markAllNotificationsAsRead']);
    Route::delete('/notifications/{id}', [StudentController::class, 'deleteNotification']);
    Route::post('/notifications', [StudentController::class, 'createNotification']);
    Route::get('/messages',         [StudentController::class, 'getMessages']);
    Route::get('/profile',          [StudentController::class, 'getProfile']);
    Route::get('/homeworks',        [StudentController::class, 'getHomeworks']);
    Route::get('/grades',           [StudentController::class, 'getGrades']);
    Route::get('/timetable',        [StudentController::class, 'getTimetable']);
    Route::post('/settings/update', [StudentController::class, 'updateSettings']);
    Route::get('/payments',         [StudentController::class, 'getPayments']);
    Route::post('/check-password',  [StudentController::class, 'checkPassword']);
    Route::post('/update-password', [StudentController::class, 'updatePassword']);
    Route::post('/homework/upload', [StudentController::class, 'uploadHomework']);
    Route::get('/homework/submissions', [StudentController::class, 'getMySubmissions']);
    Route::delete('/homework/submission/{id}', [StudentController::class, 'deleteSubmission']);
    Route::get('/activity-registrations', [StudentController::class, 'getActivityRegistrations']);
    Route::post('/activity-register', [StudentController::class, 'registerActivity']);
    Route::get('/attendance', [StudentController::class, 'getAttendance']);
    Route::post('/attendance/{id}/justify', [StudentController::class, 'justifyAbsence']);
    Route::post('/upload-medical-certificate', [StudentController::class, 'uploadMedicalCertificate']);
    Route::post('/leave-request', [StudentController::class, 'requestLeave']);
    Route::get('/my-leave-requests', [StudentController::class, 'getMyLeaveRequests']);


        // Tutorials
    Route::get('/tutorials', [StudentController::class, 'getTutorials']);
    Route::get('/tutorials/{id}', [StudentController::class, 'getTutorial']);
    Route::post('/tutorials/{id}/view', [StudentController::class, 'incrementTutorialView']);
         // ✅ MESSAGES ROUTES - AJOUTE CES 3 LIGNES
    Route::get('/conversations',    [StudentController::class, 'getConversations']);
    Route::get('/conversations/{id}/messages', [StudentController::class, 'getMessages']);
    Route::post('/conversations/{id}/messages', [StudentController::class, 'sendMessage']);
    Route::put('/messages/{id}', [StudentController::class, 'updateMessage']);      // ← sans /student
    Route::delete('/messages/{id}', [StudentController::class, 'deleteMessage']);

    Route::get('/student/homework/{id}/download-pdf', [StudentController::class, 'downloadPDF']);
    Route::post('/student/homework/{id}/generate-pdf', [StudentController::class, 'generateHomeworkPDF']);
            // Books routes
    Route::get('/books', [StudentController::class, 'getBooks']);
    Route::get('/books/featured', [StudentController::class, 'getFeaturedBooks']);
    Route::get('/books/category/{category}', [StudentController::class, 'getBooksByCategory']);
    Route::get('/books/search', [StudentController::class, 'searchBooks']);
    Route::get('/books/{id}', [StudentController::class, 'getBook']);
    Route::get('/books/{id}/download', [StudentController::class, 'downloadBook']);
    Route::post('/books/{id}/view', [StudentController::class, 'incrementBookView']);

});

});

Route::prefix('home')->group(function () {
    Route::get('/stats', [HomeController::class, 'getStats']);
    Route::get('/actualites', [HomeController::class, 'getActualites']);
    Route::get('/temoignages', [HomeController::class, 'getTemoignages']);
    Route::post('/newsletter', [HomeController::class, 'subscribeNewsletter']);
    Route::post('/contact', [HomeController::class, 'contact']);

});
