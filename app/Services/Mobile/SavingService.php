<?php

namespace App\Services\Mobile;

use App\Http\Resources\SavingsResource;
use App\Models\User;
use App\Models\Saving;
use Illuminate\Support\Facades\Auth;

class SavingService
{
    protected $user;
    public function __construct()
    {
        $this->user = User::find(1);
    }

    public function store($data)
    {
        $saving = $this->user->savings()->create($data);
        return ['data' =>  new SavingsResource($saving)];
    }

    public function index()
    {
        $savings = $this->user->savings()->orderBy('date', 'desc')->get();
        return ['data' => SavingsResource::collection($savings)];
    }
}
