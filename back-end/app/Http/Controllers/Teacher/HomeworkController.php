<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Devoir;
use App\Models\Classe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HomeworkController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | GET ALL HOMEWORKS
    |--------------------------------------------------------------------------
    */
    public function index()
    {
        $homeworks = Devoir::with('classe')
            ->latest()
            ->get();

        return response()->json(
            $homeworks->map(function ($devoir) {

                return [
                    'id' => $devoir->id,
                    'title' => $devoir->titre,
                    'description' => $devoir->description,
                    'due_date' => $devoir->date_limite,
                    'status' => $devoir->status,
                    'attachment' => $devoir->attachment
                        ? asset('storage/' . $devoir->attachment)
                        : null,

                    'class_id' => $devoir->classe_id,
                    'class_name' => optional($devoir->classe)->nom,
                ];
            })
        );
    }

    /*
    |--------------------------------------------------------------------------
    | GET ONE HOMEWORK
    |--------------------------------------------------------------------------
    */
    public function show($id)
{
    $devoir = Devoir::with([
    'classe',
    'classe.niveau',
    'classe.filiere'
])->findOrFail($id);

    return response()->json([
        'id' => $devoir->id,

        'title' => $devoir->titre,

        'description' => $devoir->description,

        'due_date' => $devoir->date_limite,

        'status' => $devoir->status,

        'attachment' => $devoir->attachment,

        'file_path' => $devoir->attachment
            ? asset('storage/' . $devoir->attachment)
            : null,

        'file_name' => $devoir->attachment
            ? basename($devoir->attachment)
            : null,

        'class_id' => $devoir->classe_id,

        'class_name' => optional($devoir->classe)->nom,

        'classe' => $devoir->classe,
        
        'created_at' => $devoir->created_at,
    ]);
}
    /*
    |--------------------------------------------------------------------------
    | GET CLASSES WITH FILTERS
    |--------------------------------------------------------------------------
    */
    public function classes(Request $request)
    {
        $query = Classe::query();

        if ($request->niveau_id) {
            $query->where('niveau_id', $request->niveau_id);
        }

        if ($request->filiere_id) {
            $query->where('filiere_id', $request->filiere_id);
        }

        return response()->json(
            $query->select('id', 'nom as name')->get()
        );
    }

    /*
    |--------------------------------------------------------------------------
    | STORE HOMEWORK
    |--------------------------------------------------------------------------
    */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'class_id' => 'required|exists:classes,id',
            'due_date' => 'required|date',
            'description' => 'nullable|string',
            'status' => 'required|string',

            'attachment' => 'nullable|file|max:10240',
        ]);

        $path = null;

        if ($request->hasFile('attachment')) {

            $path = $request
                ->file('attachment')
                ->store('homeworks', 'public');
        }

        $homework = Devoir::create([

            'titre' => $request->title,

            'description' => $request->description,

            'classe_id' => $request->class_id,

            'enseignant_id' => auth()->id(),

            'date_limite' => $request->due_date,

            'attachment' => $path,

            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Homework created successfully',
            'data' => $homework
        ], 201);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE HOMEWORK
    |--------------------------------------------------------------------------
    */
    public function update(Request $request, $id)
    {
        $homework = Devoir::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'class_id' => 'required|exists:classes,id',
            'due_date' => 'required|date',
            'description' => 'nullable|string',
            'status' => 'required|string',

            'attachment' => 'nullable|file|max:10240',
        ]);

        $path = $homework->attachment;

        // NEW FILE
        if ($request->hasFile('attachment')) {

            // DELETE OLD FILE
            if ($homework->attachment) {

                Storage::disk('public')
                    ->delete($homework->attachment);
            }

            $path = $request
                ->file('attachment')
                ->store('homeworks', 'public');
        }
        if ($request->remove_file === 'true') {

    if ($homework->attachment) {

        Storage::disk('public')
            ->delete($homework->attachment);
    }

    $path = null;
}

        $homework->update([

            'titre' => $request->title,

            'description' => $request->description,

            'classe_id' => $request->class_id,

            'date_limite' => $request->due_date,

            'attachment' => $path,

            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Homework updated successfully',
            'data' => $homework
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE HOMEWORK
    |--------------------------------------------------------------------------
    */
    public function destroy($id)
    {
        $homework = Devoir::findOrFail($id);

        if ($homework->attachment) {

            Storage::disk('public')
                ->delete($homework->attachment);
        }

        $homework->delete();

        return response()->json([
            'message' => 'Homework deleted successfully'
        ]);
    }
}