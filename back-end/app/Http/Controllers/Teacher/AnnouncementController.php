<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Announcement::latest()->get()
        ]);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'type' => 'required|string',
        'titre' => 'required|string',
        'contenu' => 'required|string',

        'priority' => 'nullable|string',
        'recipient_type' => 'nullable|string',
        'niveau_id' => 'nullable|integer',
        'class_id' => 'nullable|integer',
        'student_id' => 'nullable|integer',

        'subject' => 'nullable|string',
        'due_date' => 'nullable|date',
        'exam_date' => 'nullable|date',
        'start_time' => 'nullable',
        'end_time' => 'nullable',
        'room' => 'nullable|string',
        'coefficient' => 'nullable|integer',
        'max_grade' => 'nullable|integer',
    ]);

    $announcement = Announcement::create($validated);

    return response()->json([
        'success' => true,
        'data' => $announcement
    ]);
}
    public function destroy($id)
    {
        $announcement = Announcement::findOrFail($id);

        $announcement->delete();

        return response()->json([
            'message' => 'Annonce supprimée avec succès'
        ]);
    }

    public function markAsRead($id)
    {
        $announcement = Announcement::findOrFail($id);

        $announcement->update([
            'est_lu' => true
        ]);

        return response()->json([
            'message' => 'Annonce marquée comme lue'
        ]);
    }

    public function markAllAsRead()
    {
        Announcement::query()->update([
            'est_lu' => true
        ]);

        return response()->json([
            'message' => 'Toutes les annonces ont été marquées comme lues'
        ]);
    }
}