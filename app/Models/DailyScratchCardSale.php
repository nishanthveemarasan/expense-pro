<?php

namespace App\Models;

use App\Models\Company;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DailyScratchCardSale extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'date',
        'company_id',
        'sale_data',
        'total_sale',
        'open_sale_updated_by',
        'close_sale_updated_by',
        'price_updated_by',
        'status',
    ];

    protected $casts = [
        'total_sale' => 'double',
        'date' => 'date:Y-m-d',
        'sale_data' => 'array',
    ];

    protected $hidden = ['id', 'company_id'];

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
}
