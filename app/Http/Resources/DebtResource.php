<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DebtResource extends JsonResource
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
            "type" =>  $this->type,
            "amount" =>  $this->amount,
            "description" =>  $this->description,
            "date" =>  $this->date,
        ];
    }
}
