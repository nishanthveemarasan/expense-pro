<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DropboxCredential extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'code',
        'client_id',
        'client_secret',
        'app_redirect_url',
        'refresh_token',
        'access_token'
    ];
}
