<?php

namespace App\Models;

use App\Models\Company;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ScratchCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'cards', 'company_id'
    ];

    protected $casts = [
        'cards' => 'array',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
