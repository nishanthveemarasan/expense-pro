<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'code', 'symbol_native', 'symbol'
    ];

    protected $appends = ['currency_name'];

    public function getCurrencyNameAttribute()
    {
        return "{$this->name}-{$this->code}-{$this->symbol}";
    }
}
