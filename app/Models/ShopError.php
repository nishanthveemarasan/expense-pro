<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopError extends Model
{
    use HasFactory;

    protected $fillable = [
        'data',
        'error'
    ];

    protected $casts = [
        'data' => 'array',
    ];
}
