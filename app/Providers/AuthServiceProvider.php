<?php

namespace App\Providers;

use App\Models\Debt;
use App\Models\User;
use App\Models\Expense;
use App\Models\Saving;
use App\Models\Task;
use App\Policies\DebtPolicy;
use Laravel\Passport\Passport;
use App\Policies\ExpensePolicy;
use App\Policies\SavingPolicy;
use App\Policies\TaskPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        Expense::class => ExpensePolicy::class,
        Debt::class => DebtPolicy::class,
        Saving::class => SavingPolicy::class,
        Task::class => TaskPolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();

        Gate::before(function (User $user) {
            if ($user->hasRole('admin')) {
                return true;
            }
        });
    }
}
