<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LocaleLanguage extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'code'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (!$model->uuid) {
                $model->uuid = (string)Str::orderedUuid();
            }
        });
    }

    protected $appends = ['locale_name'];

    public function getLocaleNameAttribute()
    {
        return "{$this->code} - {$this->name}";
    }
}
