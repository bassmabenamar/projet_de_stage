<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Folder;
use App\Models\ResourceFile;

class FolderController extends Controller
{
  
    public function index()
    {
        return Folder::with('files')->get();
    }

    public function store(Request $request)
    {
        $folder = Folder::create($request->all());
        return response()->json($folder);
    }

    public function destroy($id)
    {
        Folder::destroy($id);
        return response()->json(['message' => 'deleted']);
    }

    public function files($id)
    {
        return ResourceFile::where('folder_id', $id)->get();
    }
}

