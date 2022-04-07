<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SavingsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return  [
            "uuid" =>  $this->uuid,
            "description" =>  $this->description,
            "type" =>  $this->type,
            "date" =>  $this->date->format('Y-m-d'),
            "amount" =>  $this->amount,
        ];
    }
}
