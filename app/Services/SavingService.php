<?php

namespace App\Services;

use App\Models\User;
use App\Models\Saving;
use Illuminate\Support\Facades\Auth;

class SavingService
{

    public function store($data)
    {
        $user = Auth::user();
        $saving = $user->savings()->create($data);
        return ['data' => $saving];
    }

    public function index()
    {
        $user = Auth::user();
        return $user->savings()->orderBy('date', 'desc')->get();
    }
}
