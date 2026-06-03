<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Classe;
use App\Models\Etudiant;
use App\Models\Devoir;
use App\Models\Announcement;

class DashboardController extends Controller
{
    public function getOverview()
{
    return response()->json([
        "teacherName" => auth()->user()->name ?? "Teacher",

        "stats" => [
            "totalCourses" => 0,
            "totalStudents" => 0,
            "pendingAssignments" => 0,
            "dailyCourses" => 0
        ],

        "schedule" => [],
        "activities" => [],
        "announcements" => [],
        "tasks" => []
    ]);
}

    public function createClass(Request $request)
    {
        $request->validate([
            "nom" => "required|string"
        ]);

        $classe = Classe::create([
            "nom" => $request->nom,
            "enseignant_id" => auth('sanctum')->user()->id
        ]);

        return response()->json($classe);
    }

    public function postAnnouncement(Request $request)
    {
        $request->validate([
            "text" => "required|string"
        ]);

        $announcement = Announcement::create([
            "text" => $request->text,
            "category" => "TEACHER"
        ]);

        return response()->json($announcement);
    }
   public function index()
{
    $teacher = auth()->user();

    $classes = Classe::where(
        'enseignant_id',
        $teacher->id
    )->get();

    $students = Etudiant::whereIn(
        'classe_id',
        $classes->pluck('id')
    )->count();

    $homeworks = Devoir::where(
        'enseignant_id',
        $teacher->id
    )->count();

    return response()->json([
        'teacher' => [
            'id' => $teacher->id,
            'firstName' => $teacher->name
        ],

        'stats' => [
            'courses' => $classes->count(),
            'students' => $students,
            'pending_homeworks' => $homeworks,
            'today_courses' => $classes->count()
        ],

        'schedule' => [
            [
                'time' => '09:00 AM',
                'title' => 'Mathématiques',
                'location' => 'Salle 101',
                'active' => true,
                'comingSoon' => false
            ]
        ],

        'activities' => [
            [
                'id' => 'C1',
                'name' => 'Math 1A',
                'type' => 'Quiz',
                'status' => 'EN COURS',
                'date' => now()->format('d M Y'),
                'progress' => 75
            ]
        ],

        'announcements' => [
            [
                'category' => 'ADMINISTRATION',
                'text' => 'Réunion pédagogique vendredi.',
                'time' => 'Il y a 2 heures'
            ]
        ],

        'tasks' => [
            [
                'id' => 1,
                'label' => 'Corriger les examens'
            ]
        ]
    ]);
}
}