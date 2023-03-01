<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckSaleReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'date'
    ];

    protected $casts = [
        'date' => 'date:Y-m-d',
    ];
}
