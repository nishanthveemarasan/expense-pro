<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DailySaleReport extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'dialy_reports';

    protected $fillable = [
        'date',
        'name',
        'sale_summary',
        'total_daily_sale',
        'total_payouts',
        'balance',
        'company_id',
        'user_id',
        'status',
        'user_name',
        'updated_by'
    ];

    protected $casts = [
        'total_daily_sale' => 'double',
        'total_payouts' => 'double',
        'balance' => 'double',
        'date' => 'date:Y-m-d',
        'sale_summary' => 'array',
    ];

    protected $hidden = ['id', 'user_id', 'company_id'];

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

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
