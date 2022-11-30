<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MobileSaving extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        // 'uuid',
        'description',
        'type',
        'date',
        "day",
        "month",
        'amount',
        "week",
        "year",
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
        "day" => 'integer',
        "month" => 'integer',
        "week" => 'integer',
        "year" => 'integer',
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
