<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    // GET /api/user
    public function getCurrentUser(Request $request)
    {
        
        $user = $request->user();
        return response()->json([
            'user' => [
                'id'     => $user->id,
                'prenom' => $user->prenom,
                'nom'    => $user->nom,
                'name'   => trim("{$user->prenom} {$user->nom}"),
                'email'  => $user->email,
                'role'   => $user->role,
            ]
        ]);
    }

    // GET /api/users?role=etudiant
    public function getUsers(Request $request)
    {
        $users = User::when($request->role, fn($q, $role) => $q->where('role', $role))
            ->where('id', '!=', $request->user()->id)
            ->select('id', 'prenom', 'nom', 'email', 'role')
            ->get()
            ->map(fn($u) => [
                'id'     => $u->id,
                'prenom' => $u->prenom,
                'nom'    => $u->nom,
                'name'   => trim("{$u->prenom} {$u->nom}"),
                'email'  => $u->email,
                'role'   => $u->role,
            ]);

        return response()->json(['users' => $users]);
    }

    // GET /api/conversations
    public function getConversations(Request $request)
    {
        $user = $request->user();

        $conversations = $user->conversations()
            ->with(['participants' => fn($q) =>
                $q->select('users.id', 'users.prenom', 'users.nom', 'users.email', 'users.role')
            ])
            ->with(['messages' => fn($q) => $q->latest()->limit(1)])
            ->latest('updated_at')
            ->get()
            ->map(function ($conv) use ($user) {
                $other   = $conv->participants->firstWhere('id', '!=', $user->id);
                $lastMsg = $conv->messages->first();

                $unread = Message::where('conversation_id', $conv->id)
                    ->where('sender_id', '!=', $user->id)
                    ->where('is_read', false)
                    ->count();

                return [
                    'id'      => $conv->id,
                    'uuid'    => $conv->uuid,
                    'others'  => $other ? [[
                        'id'     => $other->id,
                        'prenom' => $other->prenom,
                        'nom'    => $other->nom,
                        'name'   => trim("{$other->prenom} {$other->nom}"),
                        'role'   => $other->role,
                    ]] : [],
                    'lastMsg' => $lastMsg ? [
                        'text'      => $lastMsg->text,
                        'timestamp' => $lastMsg->created_at,
                    ] : null,
                    'unread'  => $unread,
                ];
            });

        return response()->json(['conversations' => $conversations]);
    }

    // GET /api/conversations/{id}
    public function getConversation(Request $request, $id)
    {
        $user         = $request->user();
        $conversation = Conversation::with('participants')->findOrFail($id);

        if (!$conversation->participants->contains('id', $user->id)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json([
            'conversation' => [
                'id'           => $conversation->id,
                'participants' => $conversation->participants->map(fn($p) => [
                    'id'     => $p->id,
                    'prenom' => $p->prenom,
                    'nom'    => $p->nom,
                    'name'   => trim("{$p->prenom} {$p->nom}"),
                    'role'   => $p->role,
                ]),
            ]
        ]);
    }

    // GET /api/conversations/{id}/messages
    public function getMessages(Request $request, $conversationId)
    {
        $user         = $request->user();
        $conversation = Conversation::with('participants')->findOrFail($conversationId);

        if (!$conversation->participants->contains('id', $user->id)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $messages = $conversation->messages()
            ->with('sender')
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(fn($msg) => [
                'id'         => $msg->id,
                'text'       => $msg->text,
                'senderId'   => $msg->sender_id,
                'sender_id'  => $msg->sender_id,
                'senderName' => trim("{$msg->sender->prenom} {$msg->sender->nom}"),
                'created_at' => $msg->created_at,
                'is_read'    => $msg->is_read,
            ]);

        $conversation->messages()
            ->where('sender_id', '!=', $user->id)
            ->where('is_read', false)
            ->update(['is_read' => true, 'read_at' => now()]);

        return response()->json([
            'messages'     => $messages,
            'conversation' => [
                'id'           => $conversation->id,
                'participants' => $conversation->participants->map(fn($p) => [
                    'id'     => $p->id,
                    'prenom' => $p->prenom,
                    'nom'    => $p->nom,
                    'name'   => trim("{$p->prenom} {$p->nom}"),
                    'role'   => $p->role,
                ]),
            ]
        ]);
    }

    // POST /api/conversations
    public function createConversation(Request $request)
    {
        $request->validate(['target_user_id' => 'required|exists:users,id']);

        $user       = $request->user();
        $targetUser = User::findOrFail($request->target_user_id);

        if ($user->id === $targetUser->id) {
            return response()->json(['error' => 'Cannot create conversation with yourself'], 422);
        }

        $existingConv = Conversation::where('type', 'direct')
            ->whereHas('participants', fn($q) => $q->where('user_id', $user->id))
            ->whereHas('participants', fn($q) => $q->where('user_id', $targetUser->id))
            ->first();

        $conversation = $existingConv ?? DB::transaction(function () use ($user, $targetUser) {
            $conv = Conversation::create(['type' => 'direct']);
            $conv->participants()->attach([$user->id, $targetUser->id]);
            return $conv;
        });

        // Load participants with prenom/nom explicitly
        $conversation->load('participants');

        $other = $conversation->participants->firstWhere('id', '!=', $user->id);

        $statusCode = $existingConv ? 200 : 201;

        return response()->json([
            'conversation' => [
                'id'           => $conversation->id,
                'others'       => $other ? [[
                    'id'     => $other->id,
                    'prenom' => $other->prenom ?? '',
                    'nom'    => $other->nom    ?? '',
                    'name'   => trim(($other->prenom ?? '') . ' ' . ($other->nom ?? '')),
                    'role'   => $other->role,
                ]] : [],
                'participants' => $conversation->participants->map(fn($p) => [
                    'id'     => $p->id,
                    'prenom' => $p->prenom ?? '',
                    'nom'    => $p->nom    ?? '',
                    'name'   => trim(($p->prenom ?? '') . ' ' . ($p->nom ?? '')),
                    'role'   => $p->role,
                ]),
                'lastMsg' => null,
                'unread'  => 0,
            ]
        ], $statusCode);
    }

    // POST /api/messages
    public function sendMessage(Request $request)
    {
        $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'text'            => 'required|string|max:1000',
        ]);

        $user         = $request->user();
        $conversation = Conversation::findOrFail($request->conversation_id);

        if (!$conversation->participants()->where('user_id', $user->id)->exists()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id'       => $user->id,
            'text'            => $request->text,
            'is_read'         => false,
        ]);

        $message->load('sender');
        $conversation->touch();

        return response()->json([
            'message' => [
                'id'         => $message->id,
                'text'       => $message->text,
                'senderId'   => $message->sender_id,
                'sender_id'  => $message->sender_id,
                'senderName' => trim("{$message->sender->prenom} {$message->sender->nom}"),
                'created_at' => $message->created_at,
                'is_read'    => $message->is_read,
            ]
        ], 201);
    }

    // POST /api/conversations/{id}/mark-read
    public function markAsRead(Request $request, $conversationId)
    {
        $user         = $request->user();
        $conversation = Conversation::findOrFail($conversationId);

        if (!$conversation->participants()->where('user_id', $user->id)->exists()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $updated = $conversation->messages()
            ->where('sender_id', '!=', $user->id)
            ->where('is_read', false)
            ->update(['is_read' => true, 'read_at' => now()]);

        return response()->json(['success' => true, 'updated' => $updated]);
    }
}