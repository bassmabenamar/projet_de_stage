<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // GET TASKS
    public function index(Request $request)
    {
        $tasks = Task::where('teacher_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($tasks);
    }

    // CREATE TASK
    public function store(Request $request)
    {
       $data = $request->validate([
    'titre' => 'required|string|max:255',
    'description' => 'nullable|string',

    'priorite' => 'required|in:basse,moyenne,haute',

    'categorie' => 'required|in:enseignement,correction,preparation,reunion',

    'statut' => 'required|in:en_attente,en_cours,terminee',

    'date_limite' => 'nullable|date',
    'heure_limite' => 'nullable',

    'rappel' => 'nullable|boolean',
    'temps_rappel' => 'nullable|integer',
]);

        $data['teacher_id'] = $request->user()->id;

        $task = Task::create($data);

        return response()->json($task, 201);
    }

    // UPDATE TASK
    public function update(Request $request, $id)
{
    $task = Task::where('teacher_id', $request->user()->id)
        ->findOrFail($id);

    $data = $request->validate([
        'titre' => 'required|string|max:255',
        'description' => 'nullable|string',

        'priorite' => 'required|in:basse,moyenne,haute',

        'categorie' => 'required|in:enseignement,correction,preparation,reunion',

        'statut' => 'required|in:en_attente,en_cours,terminee',

        'date_limite' => 'nullable|date',
        'heure_limite' => 'nullable',

        'rappel' => 'nullable|boolean',
        'temps_rappel' => 'nullable|integer',
    ]);

    $task->update($data);

    return response()->json($task);
}

    // DELETE TASK
    public function destroy(Request $request, $id)
    {
        $task = Task::where('teacher_id', $request->user()->id)
            ->findOrFail($id);

        $task->delete();

        return response()->json([
            'message' => 'Tâche supprimée avec succès'
        ]);
    }

    // SHOW TASK
    public function show(Request $request, $id)
    {
        $task = Task::where('teacher_id', $request->user()->id)
            ->findOrFail($id);

        return response()->json($task);
    }
}