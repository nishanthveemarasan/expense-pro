<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SaleReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'from_date',
        'to_date',
        'total_sale',
        'total_expemse',
        'total_balance',
        'company_id',
        'user_id',
        'file_url',
        'file_name'
    ];

    protected $casts = [
        'from_date' => 'date:Y-m-d',
        'to_date' => 'date:Y-m-d',
        'total_sale' => 'double',
        'total_expemse' => 'double',
        'total_balance' => 'double',
    ];

    protected $hidden = ['id', 'company_id', 'user_id', 'file_url', 'file_name'];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (!$model->uuid) {
                $model->uuid = (string)Str::orderedUuid();
            }
        });
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
