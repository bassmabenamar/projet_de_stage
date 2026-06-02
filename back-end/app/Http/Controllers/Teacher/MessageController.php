<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        return Message::latest()->get();
    }

    public function store(Request $request)
    {
        $message = Message::create($request->all());

        return response()->json($message);
    }
}