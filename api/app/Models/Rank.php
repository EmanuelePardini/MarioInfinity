<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rank extends Model
{
    protected $table = 'ranks';

    protected $fillable = [
        'id_user', 'score'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
    public $timestamps = false;
}
