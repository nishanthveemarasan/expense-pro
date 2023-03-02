<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'status'
    ];
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

    public function userCompany()
    {
        return $this->hasOne(CompanyUser::class, 'company_id');
    }

    public function scratchCard()
    {
        return $this->hasOne(ScratchCard::class, 'company_id');
    }

    public function children()
    {
        return $this->belongsToMany(User::class, 'company_child', 'company_id', 'user_id');
    }

    public function dailyReports()
    {
        return $this->hasMany(DailySaleReport::class);
    }

    public function stores()
    {
        return $this->hasMany(Store::class);
    }

    public function cashAndCarries()
    {
        return $this->hasMany(CashAndCarry::class);
    }

    public function salaries()
    {
        return $this->hasMany(Salary::class);
    }

    public function otherExpenses()
    {
        return $this->hasMany(OtherExpense::class);
    }

    public function payOuts()
    {
        return $this->hasMany(PayOut::class);
    }

    public function cardPayments()
    {
        return $this->hasMany(CardPayment::class);
    }

    public function saleReports()
    {
        return $this->hasMany(SaleReport::class);
    }

    public function dailyScratchCardSales()
    {
        return $this->hasMany(DailyScratchCardSale::class);
    }
}
