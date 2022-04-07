<?php

namespace App\Models;

use Illuminate\Support\Str;
use App\Models\RecurringPayment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RepeatPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'recurring_payment_id',
        'amount',
        'pay_date',
    ];

    // protected $hidden = [
    //     'id',
    //     'created_at',
    //     'deleted_at',
    //     'recurring_payment_id'
    // ];
    protected $casts = [
        'amount' => 'double',
        'pay_date' => 'date:Y-m-d',
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

    public function recurringPayment()
    {
        return $this->belongsTo(RecurringPayment::class);
    }
}
