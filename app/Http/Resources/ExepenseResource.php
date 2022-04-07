<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExepenseResource extends JsonResource
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
            "date" => $this->date->format('Y-m-d'),
            "day" => $this->day,
            "month" => $this->month,
            "year" => $this->year,
            "week" => $this->week,
            "selectedCategory" => $this->selectedCategory,
            "category" => $this->category,
            "subCategory" => $this->subCategory,
            "amount" => $this->amount,
        ];
    }
}
