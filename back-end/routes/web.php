<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
// routes/web.php (pas api.php)
Route::get('/storage/pdfs/{filename}', function ($filename) {
    $path = storage_path('app/public/pdfs/' . $filename);

    if (!file_exists($path)) {
        abort(404);
    }

    return response()->file($path, [
        'Content-Type' => 'application/pdf',
        'Content-Disposition' => 'inline; filename="' . $filename . '"'
    ]);
})->where('filename', '.*\.pdf$');
// routes/api.php
Route::get('/homework/{id}/view-pdf', function ($id) {
    $homework = App\Models\Devoir::find($id);

    // Utiliser ton fichier PDF existant
    $filePath = 'C:/Users/ElecBL/Downloads/Emploi_du_Temps_20_05_2026.pdf';

    if (file_exists($filePath)) {
        return response()->file($filePath, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="devoir_' . $id . '.pdf"'
        ]);
    }

    return response()->json(['error' => 'Fichier non trouvé'], 404);
});
