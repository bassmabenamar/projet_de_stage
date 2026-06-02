<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AbsenceJustification extends Model
{
    protected $table = 'absence_justifications';

    protected $fillable = [
        'presence_id', 'etudiant_id', 'reason', 'file_path', 'status', 'submitted_at'
    ];

    public function presence()
    {
        return $this->belongsTo(Presence::class, 'presence_id');
    }

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }
}
