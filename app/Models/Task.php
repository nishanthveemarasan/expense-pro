<?php

namespace App\Models;

use App\Models\User;
use App\Models\TaskItem;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'uuid',
        'title',
        'completed',
        'date',
        'type'
    ];

    protected $with = [
        'items'
    ];

    // protected $hidden = [
    //     'id',
    //     'created_at',
    //     'deleted_at',
    //     'user_id'
    // ];

    protected $casts = [
        'completed' => 'boolean',
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

    public function items()
    {
        return $this->hasMany(TaskItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
