<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    public function index()
    {
        return Announcement::latest()->get();
    }

    public function store(Request $request)
    {
        $announcement = Announcement::create($request->all());

        return response()->json($announcement);
    }
}