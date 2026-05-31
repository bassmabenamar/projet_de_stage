<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Conversation extends Model
{
    protected $fillable = ['uuid', 'type'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
        });
    }

    // ─── Relations ────────────────────────────────────────

    public function participants(): BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'conversation_participants',
            'conversation_id',
            'user_id'
        )->withPivot('last_read_at')->withTimestamps();
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class)->orderBy('created_at', 'asc');
    }

    // ─── Helpers ──────────────────────────────────────────

    /**
     * إرجاع المشارك الآخر في المحادثة (غير المستخدم الحالي)
     */
    public function getOtherParticipant(int $userId): ?User
    {
        return $this->participants->firstWhere('id', '!=', $userId);
    }

    /**
     * عدد الرسائل غير المقروءة للمستخدم الحالي
     */
    public function getUnreadCount(int $userId): int
    {
        return $this->hasMany(Message::class)
            ->where('sender_id', '!=', $userId)
            ->where('is_read', false)
            ->count();
    }
}