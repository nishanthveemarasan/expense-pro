<?php

namespace App\Services;

use App\Models\User;
use App\Models\Saving;

class SavingService
{

    public function store($data)
    {
        $user = User::find(1);
        $saving = $user->savings()->create($data);
        return ['data' => $saving];
    }

    public function index()
    {
        $user = User::find(1);
        return $user->savings()->orderBy('date', 'desc')->get();
    }
}
