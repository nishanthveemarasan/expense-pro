<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MobileAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    protected $with = [
        'mobileDebts'
    ];

    // protected $hidden = [
    //     'id',
    //     'created_at',
    //     'deleted_at',
    //     'pivot',
    //     'updated_at'
    // ];

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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function mobileDebts()
    {
        return $this->hasMany(MobileDebt::class);
    }

    public function getLendTotalAttribute()
    {
        return (int)$this->mobileDebts()->where('type', 'lend')->sum('amount');
    }
    public function getBorrowTotalAttribute()
    {
        return (int)$this->mobileDebts()->where('type', 'borrow')->sum('amount');
    }
}
