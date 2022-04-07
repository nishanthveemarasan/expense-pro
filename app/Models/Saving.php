<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Saving extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'uuid',
        'description',
        'type',
        'date',
        'amount',
        'user_id'
    ];

    // protected $hidden = [
    //     'id',
    //     'created_at',
    //     'deleted_at',
    //     'updated_at',
    //     'user_id'
    // ];

    protected $casts = [
        'amount' => 'double',
        'date' => 'date:Y-m-d',
    ];

    /**
     * Boot function from Laravel.
     */
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (!$model->uuid) {
                $model->uuid = (string)Str::orderedUuid();
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
