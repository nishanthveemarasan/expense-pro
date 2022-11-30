<?php

namespace App\Models;

use App\Models\Account;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MobileDebt extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'type',
        'amount',
        'description',
        'date'
    ];


    // protected $hidden = [
    //     'id',
    //     'created_at',
    //     'deleted_at',
    //     'updated_at',
    //     'account_id'
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

    public function mobileAccount()
    {
        return $this->belongsTo(MobileAccount::class);
    }
}
