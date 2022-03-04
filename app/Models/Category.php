<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $tableName = 'categories';

    protected $fillable = [
        'category',
        'items',
        'color'
    ];

    protected $hidden = [
        'id',
        'created_at',
        'deleted_at',
        'updated_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'items' => 'array',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_category');
    }
}
