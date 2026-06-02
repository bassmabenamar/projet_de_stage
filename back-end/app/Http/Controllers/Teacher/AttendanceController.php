<?php

namespace App\Http\Controllers\Teacher;

use App\Models\Etudiant;
use App\Models\Presence;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AttendanceController extends Controller
{
    public function index()
    {
        return Presence::with('etudiant')->latest()->get();
    }

    public function store(Request $request)
    {
        return Presence::create($request->all());
    }

    public function getClassAttendance($classId, $date)
    {
        $students = Etudiant::where('classe_id', $classId)
            ->with('user')
            ->get();

        $data = $students->map(function ($student) use ($date) {

            $presence = Presence::where('etudiant_id', $student->id)
                ->where('date', $date)
                ->first();

            $last5 = Presence::where('etudiant_id', $student->id)
                ->orderBy('date', 'desc')
                ->limit(5)
                ->pluck('status')
                ->toArray();

            return [
                'id' => $student->id,
                'name' => $student->user->name ?? 'Unknown',
                'student_id' => $student->id,
                'attendance_status' => $presence?->status,
                'remark' => $presence->remark ?? null,
                'last5_attendance' => $last5,
            ];
        });

        $total = $students->count();

        $present = Presence::where('classe_id', $classId)
            ->where('date', $date)
            ->where('present', true)
            ->count();

        return response()->json([
            'students' => $data,
            'stats' => [
                'total' => $total,
                'present' => $present,
                'absent' => $total - $present,
                'late' => 0,
            ]
        ]);
    }

    public function update(Request $request)
{
    $request->validate([
        'student_id' => 'required',
        'class_id' => 'required',
        'date' => 'required',
        'status' => 'required'
    ]);

    $presence = Presence::updateOrCreate(
        [
            'etudiant_id' => $request->student_id,
            'classe_id' => $request->class_id,
            'date' => $request->date,
        ],
        [
            'status' => $request->status,
            'present' => $request->status !== 'absent'
        ]
    );

    return response()->json([
        'message' => 'updated',
        'data' => $presence
    ]);
}

    public function saveRemark(Request $request)
    {
        $request->validate([
            'student_id' => 'required',
            'class_id' => 'required',
            'date' => 'required',
            'remark' => 'nullable'
        ]);

        $presence = Presence::updateOrCreate(
            [
                'etudiant_id' => $request->student_id,
                'classe_id' => $request->class_id,
                'date' => $request->date,
            ],
            []
        );

        $presence->remark = $request->remark;
        $presence->save();

        return response()->json(['message' => 'Remark saved']);
    }

    // ✅ ADD THIS (MISSING)
    public function summary($classId)
    {
        $week = collect(range(0, 6))->map(function ($i) use ($classId) {
            $date = Carbon::now()->subDays(6 - $i)->toDateString();

            $total = Presence::where('classe_id', $classId)
                ->where('date', $date)
                ->count();

            $present = Presence::where('classe_id', $classId)
                ->where('date', $date)
                ->where('present', true)
                ->count();

            return [
                'date' => $date,
                'total' => $total,
                'present' => $present
            ];
        });

        return response()->json([
            'weekly_data' => $week
        ]);
    }
}