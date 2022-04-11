<?php

namespace App\Policies;

use App\Models\Debt;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DebtPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        return $user->can('view-debt');
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Debt  $debt
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Debt $debt)
    {
        //
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Debt  $debt
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Debt $debt)
    {
        $debtAccountId = $debt->account->id;
        $userAccount = $user->accounts()->where('id', $debtAccountId)->first();
        if ($userAccount) {
            return $user->can('update-debt') && $userAccount->id == $debtAccountId;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Debt  $debt
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Debt $debt)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Debt  $debt
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Debt $debt)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Debt  $debt
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Debt $debt)
    {
        //
    }
}
