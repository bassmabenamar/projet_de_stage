<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    public function index()
    {
        return response()->json([
            'totalSize' => '12.4 GB',
            'totalFiles' => ResourceFile::count(),
            'totalVideos' => ResourceFile::where('type', 'video')->count(),
            'totalLinks' => ResourceFile::where('type', 'link')->count(),
        ]);
    }
}
