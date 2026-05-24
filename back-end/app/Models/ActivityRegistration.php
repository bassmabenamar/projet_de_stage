<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityRegistration extends Model
{
    protected $fillable = ['etudiant_id', 'activity_id', 'date_inscription'];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    public function activity()
    {
        return $this->belongsTo(Activite::class, 'activity_id');
    }
}
