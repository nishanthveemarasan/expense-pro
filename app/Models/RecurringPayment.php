<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class RecurringPayment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'uuid',
        'type',
        'user_id',
        'name',
        'pay_method',
        'amount',
        'start_date',
        'last_pay_date',
        'next_pay_date',
        'category',
        'num_of_pay',
        'current_pay_num',
        'status',
        'susbscription_type'
    ];
    protected $casts = [
        'amount' => 'double',
        'start_date' => 'date:Y-m-d',
        'last_pay_date' => 'date:Y-m-d',
        'next_pay_date' => 'date:Y-m-d',
        "num_of_pay" => 'integer',
        "current_pay_num" => 'integer',
        "week" => 'integer',
        "year" => 'integer',
    ];

    protected $with = [
        'repeatPayments'
    ];
    // protected $hidden = [
    //     'id',
    //     'created_at',
    //     'deleted_at',
    //     'updated_at',
    //     'user_id'
    // ];


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

    public function repeatPayments()
    {
        return $this->hasMany(RepeatPayment::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeIsActive($query)
    {
        return $query->where('status', 'active');
    }
}
