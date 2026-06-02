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
    return response()->json([
        "teacherName" => auth()->user()->name ?? "Teacher",

        "performance" => [
            "averageGrade" => 14.8,
            "attendanceRate" => 94,
            "homeworkCompletion" => 87,
            "studentSatisfaction" => 4.6
        ],

        "upcomingEvents" => [],
        "recentSubmissions" => [],
        "topPerformers" => [],
        "pendingReviews" => [],
        "classStats" => []
    ]);
}
}