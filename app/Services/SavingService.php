<?php

namespace App\Services;

use App\Http\Resources\SavingsResource;
use App\Models\User;
use App\Models\Saving;
use Illuminate\Support\Facades\Auth;

class SavingService
{

    public function store($data)
    {
        $user = Auth::user();
        $saving = $user->savings()->create($data);
        return ['data' =>  new SavingsResource($saving)];
    }

    public function index()
    {
        $user = Auth::user();
        $savings = $user->savings()->orderBy('date', 'desc')->get();
        return ['data' => SavingsResource::collection($savings)];
    }
}
