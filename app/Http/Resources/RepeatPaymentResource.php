<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RepeatPaymentResource extends JsonResource
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
            "uuid" => $this->uuid,
            "amount" => $this->amount,
            "pay_date" => $this->pay_date->format('Y-m-d'),
            "updated_at" => $this->updated_at->format('Y-m-d'),
        ];
    }
}
