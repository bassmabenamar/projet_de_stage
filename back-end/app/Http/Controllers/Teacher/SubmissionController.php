<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Submission;

class SubmissionController extends Controller
{
    public function index()
    {
        return Submission::with('etudiant')->latest()->get();
    }
}