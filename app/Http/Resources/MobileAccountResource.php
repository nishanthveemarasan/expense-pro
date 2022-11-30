<?php

namespace App\Http\Resources;

use App\Http\Resources\DebtResource;
use Illuminate\Http\Resources\Json\JsonResource;

class MobileAccountResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        return [
            "uuid" =>  $this->uuid,
            "name" =>  $this->name,
            "lendTotal" =>  $this->lendTotal,
            "borrowTotal" =>  $this->borrowTotal,
            "debts" => DebtResource::collection($this->mobileDebts)
        ];
    }
}
