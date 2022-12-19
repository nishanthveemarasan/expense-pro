<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CholaInvoice extends Model
{
    use HasFactory;
    protected $fillable = ['company_information_id', 'invoice_number', 'invoiceData'];

    protected $casts = [
        'invoiceData' => 'array',
    ];

    protected $hidden = ['id', 'company_information_id', 'invoiceData'];

    protected $appends = ['created_date', 'invoice_total', 'invoice_date'];

    public static function boot()
    {
        parent::boot();

        self::creating(function ($model) {
            if (!$model->uuid) {
                $model->uuid = (string)Str::orderedUuid();
            }
        });
    }

    public function getCreatedDateAttribute()
    {
        return $this->created_at->format('Y-m-d');
    }

    public function getInvoiceDateAttribute()
    {
        return $this->invoiceData['invoiceDate'];
    }


    public function getInvoiceTotalAttribute()
    {
        return $this->invoiceData['total'];
    }

    public function companyInformation()
    {
        return $this->belongsTo(CompanyInformation::class, 'company_information_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
