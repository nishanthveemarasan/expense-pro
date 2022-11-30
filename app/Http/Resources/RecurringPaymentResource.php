<?php

namespace App\Http\Resources;

use App\Http\Resources\RepeatPaymentResource;
use Illuminate\Http\Resources\Json\JsonResource;

class RecurringPaymentResource extends JsonResource
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
            "type" => $this->type,
            "name" => $this->name,
            "pay_method" => $this->pay_method,
            "amount" => $this->amount,
            "start_date" => $this->start_date->format('Y-m-d'),
            "last_pay_date" => $this->last_pay_date->format('Y-m-d'),
            "next_pay_date" => $this->next_pay_date->format('Y-m-d'),
            "category" => $this->category,
            "susbscription_type" => $this->susbscription_type,
            "num_of_pay" => $this->num_of_pay,
            "current_pay_num" => $this->current_pay_num,
            "status" => $this->status,
            "repeat_payments" => RepeatPaymentResource::collection($this->repeatPayments)
        ];
    }
}
