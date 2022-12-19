<?php

namespace App\Models;

use App\Models\Task;
use App\Models\Saving;
use App\Models\Account;
use App\Models\Expense;
use App\Models\Category;
use App\Models\RecurringPayment;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'status',
        'name',
        'password',
        'username',
        'remember_token'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = ['created_date'];


    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function accounts()
    {
        return $this->hasMany(Account::class);
    }

    public function mobileAccounts()
    {
        return $this->hasMany(MobileAccount::class);
    }

    public function savings()
    {
        return $this->hasMany(Saving::class);
    }
    public function mobileSavings()
    {
        return $this->hasMany(MobileSaving::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
    public function getNamesAttribute()
    {
        return $this->accounts()->select('name as value', 'name as label')->get();
    }
    public function getMobileNamesAttribute()
    {
        return $this->mobileAccounts()->select('name as value', 'name as label')->get();
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'user_category');
    }

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }

    public function recurringPayments()
    {
        return $this->hasMany(RecurringPayment::class);
    }

    public function generalSetting()
    {
        return $this->hasOne(GeneralSetting::class);
    }

    public function CholaInvoices()
    {
        return $this->hasMany(CholaInvoice::class);
    }

    public function CompanyInformation()
    {
        return $this->hasOne(CompanyInformation::class);
    }

    public function parents()
    {
        return $this->belongsToMany(User::class, 'company_child', 'user_id', 'company_id');
    }
    public function getCreatedDateAttribute()
    {
        return $this->created_at->format('Y-m-d');
    }

    public function companyParents()
    {
        return $this->hasMany(CompanyUser::class, 'user_id');
    }

    public function companyChilds()
    {
        return $this->hasMany(CompanyChild::class, 'user_id');
    }

    public function dailyReports()
    {
        return $this->hasMany(DailySaleReport::class);
    }

    public function saleReports()
    {
        return $this->hasMany(SaleReport::class);
    }
}
