<?php

namespace App\Models;

use App\Models\Debt;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    protected $with = [
        'debts'
    ];

    protected $hidden = [
        'id',
        'created_at',
        'deleted_at',
        'pivot',
        'updated_at'
    ];

    protected $appends = ['lendTotal', 'borrowTotal'];

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

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_account');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getLendTotalAttribute()
    {
        return (int)$this->debts()->where('type', 'lend')->sum('amount');
    }
    public function getBorrowTotalAttribute()
    {
        return (int)$this->debts()->where('type', 'borrow')->sum('amount');
    }
}
