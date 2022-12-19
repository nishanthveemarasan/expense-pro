<?php

namespace App\Models;

use App\Models\Company;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Salary extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'date',
        'employee',
        'amount',
        'company_id',
        'created_by',
        'updated_by'
    ];

    protected $casts = [
        'amount' => 'double',
        'date' => 'date:Y-m-d'
    ];

    protected $hidden = ['id', 'company_id'];

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
