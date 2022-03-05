<?php

namespace App\Models;

use App\Models\Task;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaskItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'task_id',
        'name',
        'completed',
    ];

    protected $hidden = [
        'id',
        'created_at',
        'updated_at',
        'deleted_at',
        'task_id'
    ];

    protected $casts = [
        'completed' => 'boolean',
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

    protected function task()
    {
        return $this->belongsTo(Task::class);
    }
}
