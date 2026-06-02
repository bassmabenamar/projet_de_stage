<?php

namespace App\Http\Controllers\Teacher;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Models\EmploiDuTemps;

class TimeTableController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->start;
        $endDate = $request->end;
        
        $schedules = EmploiDuTemps::where('teacher_id', auth()->id())
            ->whereBetween('date', [$startDate, $endDate])
            ->with('course')
            ->get();
        
        $timetable = $schedules->map(function($schedule) {
            return [
                'day' => $schedule->date->format('D'),
                'start_time' => $schedule->start_time,
                'end_time' => $schedule->end_time,
                'title' => $schedule->course->name,
                'code' => $schedule->course->code,
                'room' => $schedule->room,
                'type' => $schedule->course->type,
                'students' => $schedule->course->students_count,
                'is_active' => $schedule->date->toDateString() === now()->toDateString() 
                    && $schedule->start_time <= now()->format('H:i') 
                    && $schedule->end_time >= now()->format('H:i')
            ];
        });
        
        return response()->json(['timetable' => $timetable]);
    }

}