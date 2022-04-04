<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Expense extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "type",
        "date",
        "day",
        "month",
        "selectedCategory",
        "week",
        "year",
        "category",
        "subCategory",
        "amount"
    ];

    protected $hidden = [
        'id',
        'created_at',
        'deleted_at',
        'updated_at'
    ];
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
