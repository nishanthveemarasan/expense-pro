<?php

namespace App\Services\Mobile;

use App\Models\User;
use App\Models\MobileSaving;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\MobileSavingResource;

class SavingService
{
    public function store($data)
    {
        $saving = Auth::user()->mobileSavings()->create($data);
        return ['data' =>  new MobileSavingResource($saving)];
    }

    public function index()
    {
        $savings = Auth::user()->mobileSavings()->orderBy('date', 'desc')->get();
        return ['data' => MobileSavingResource::collection($savings)];
    }

    public function update($data, MobileSaving $mobileSaving)
    {
        // dd($mobileSaving->toArray());
        $mobileSaving->update($data);
        return ['data' => 'updated Successfully'];
    }

    public function delete(MobileSaving $mobileSaving)
    {
        // dd($mobileSaving->toArray());
        $mobileSaving->delete();
        return ['data' => 'deleted Successfully'];
    }
}
